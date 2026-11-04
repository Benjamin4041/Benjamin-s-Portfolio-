import os, sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlsplit

ROOT, PORT = sys.argv[1], int(sys.argv[2])


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        path = unquote(urlsplit(self.path).path)
        # A dotted last segment is a real file request; anything else is an app route.
        if not os.path.isfile(self.translate_path(self.path)) and "." not in path.rsplit("/", 1)[-1]:
            self.path = "/index.html"
        return super().do_GET()


ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
