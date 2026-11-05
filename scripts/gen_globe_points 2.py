"""Turn a world-atlas land TopoJSON file into evenly spaced [lat, lon] land points for the globe."""
import json, math, sys

src, out = sys.argv[1], sys.argv[2]
CANDIDATES = 11000

topo = json.load(open(src, encoding="utf-8"))
sx, sy = topo["transform"]["scale"]
tx, ty = topo["transform"]["translate"]

arcs = []
for arc in topo["arcs"]:
    x = y = 0
    points = []
    for dx, dy in arc:
        x += dx
        y += dy
        points.append((x * sx + tx, y * sy + ty))
    arcs.append(points)


def ring(indices):
    points = []
    for i in indices:
        arc = arcs[i] if i >= 0 else arcs[~i][::-1]
        points.extend(arc[1:] if points else arc)
    return points


rings = []
for geometry in topo["objects"]["land"]["geometries"]:
    polygons = geometry["arcs"] if geometry["type"] == "MultiPolygon" else [geometry["arcs"]]
    for polygon in polygons:
        rings.extend(ring(r) for r in polygon)

boxes = [(min(p[0] for p in r), max(p[0] for p in r), min(p[1] for p in r), max(p[1] for p in r)) for r in rings]


def is_land(lon, lat):
    inside = False
    for r, (x0, x1, y0, y1) in zip(rings, boxes):
        if not (x0 <= lon <= x1 and y0 <= lat <= y1):
            continue
        for (ax, ay), (bx, by) in zip(r, r[1:] + r[:1]):
            if (ay > lat) != (by > lat) and lon < (bx - ax) * (lat - ay) / (by - ay) + ax:
                inside = not inside
    return inside


land = []
golden = math.pi * (3 - math.sqrt(5))
for i in range(CANDIDATES):
    lat = math.degrees(math.asin(1 - 2 * (i + 0.5) / CANDIDATES))
    lon = (math.degrees(golden * i) + 180) % 360 - 180
    if is_land(lon, lat):
        land += [round(lat, 1), round(lon, 1)]

json.dump(land, open(out, "w"), separators=(",", ":"))
print("land points:", len(land) // 2, "of", CANDIDATES)
