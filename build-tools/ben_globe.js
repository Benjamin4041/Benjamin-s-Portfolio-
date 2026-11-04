const BenGlobePoints=__POINTS__;
const BenGithubUrl="https://github.com/Benjamin4041";
const BenOrbits=[
  {radius:1.3,tiltX:.98,tiltZ:.3,speed:.26,color:"79,140,255"},
  {radius:1.5,tiltX:.42,tiltZ:-.38,speed:-.19,color:"168,85,247"},
  {radius:1.7,tiltX:.24,tiltZ:.14,speed:.14,color:"99,102,241"}
];
const BenTech=[
  {name:"React",icon:"logos:react",orbit:0,tip:"Used at Roqqu and SpencerZill",label:"Frontend expertise",text:"I rebuilt Roqqu's marketing site with React and Gatsby, and I build SpencerZill's products with React, focusing on speed, accessibility and visual polish.",cta:"See projects built with React",to:"/projects?q=React"},
  {name:"TypeScript",icon:"logos:typescript-icon",orbit:0,tip:"Typed JavaScript for maintainable code",label:"Languages",text:"Static types on top of JavaScript, for frontends that stay maintainable as they grow.",cta:"See my code on GitHub",href:BenGithubUrl},
  {name:"JavaScript",icon:"logos:javascript",orbit:0,tip:"Core language in all my projects",label:"Languages",text:"The core language behind my work at Raven Bank, Roqqu and SpencerZill.",cta:"See projects built with JavaScript",to:"/projects?q=JavaScript"},
  {name:"Node.js",icon:"logos:nodejs-icon",orbit:1,tip:"My backend runtime, with Express",label:"Backend",text:"My backend stack: Node.js and Express, with REST APIs and JWT and OAuth authentication.",cta:"See my code on GitHub",href:BenGithubUrl},
  {name:"MongoDB",icon:"logos:mongodb-icon",orbit:1,tip:"Part of my data stack, with Firebase",label:"Databases",text:"Part of my data stack alongside Firebase.",cta:"See my code on GitHub",href:BenGithubUrl},
  {name:"AWS",icon:"logos:aws",orbit:1,tip:"EC2, S3, Lambda, Rekognition and IAM",label:"Cloud",text:"The AWS services in my toolkit: EC2, S3, Lambda, Rekognition and IAM.",cta:"See my code on GitHub",href:BenGithubUrl},
  {name:"Docker",icon:"logos:docker-icon",orbit:2,tip:"Containers for consistent deployments",label:"DevOps",text:"Containers that keep builds and deployments consistent between environments.",cta:"See my code on GitHub",href:BenGithubUrl},
  {name:"GitHub",icon:"logos:github-icon",orbit:2,tip:"Where my code and activity live",label:"Tools",text:"Where my code and contribution activity live.",cta:"Visit my GitHub",href:BenGithubUrl}
];
const benQuatMul=(a,b)=>[
  a[0]*b[0]-a[1]*b[1]-a[2]*b[2]-a[3]*b[3],
  a[0]*b[1]+a[1]*b[0]+a[2]*b[3]-a[3]*b[2],
  a[0]*b[2]-a[1]*b[3]+a[2]*b[0]+a[3]*b[1],
  a[0]*b[3]+a[1]*b[2]-a[2]*b[1]+a[3]*b[0]
];
const benQuatAxis=(x,y,z,angle)=>{const s=Math.sin(angle/2);return[Math.cos(angle/2),x*s,y*s,z*s]};
const benQuatNorm=q=>{const n=Math.hypot(q[0],q[1],q[2],q[3]);return q.map(v=>v/n)};
const benQuatMatrix=([w,x,y,z])=>[
  1-2*(y*y+z*z),2*(x*y-w*z),2*(x*z+w*y),
  2*(x*y+w*z),1-2*(x*x+z*z),2*(y*z-w*x),
  2*(x*z-w*y),2*(y*z+w*x),1-2*(x*x+y*y)
];
function benGlowSprite(color){
  const c=document.createElement("canvas");c.width=c.height=16;
  const g=c.getContext("2d"),r=g.createRadialGradient(8,8,0,8,8,8);
  r.addColorStop(0,`rgba(${color},1)`);r.addColorStop(.35,`rgba(${color},.75)`);r.addColorStop(1,`rgba(${color},0)`);
  g.fillStyle=r;g.fillRect(0,0,16,16);
  return c;
}
function BenGlobe(){
  const nav=Gd(),stage=I.useRef(null),canvas=I.useRef(null),tipEl=I.useRef(null),buttons=I.useRef([]);
  const positions=I.useRef(BenTech.map(()=>({x:0,y:0})));
  const [hovered,setHovered]=I.useState(null),[active,setActive]=I.useState(null);
  const live=I.useRef({hovered:null,active:null});
  live.current.hovered=hovered;live.current.active=active;

  I.useEffect(()=>{
    const el=stage.current,cv=canvas.current,g=cv.getContext("2d");
    const still=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sprites=["79,140,255","96,120,255","139,92,246","168,85,247"].map(benGlowSprite);
    const pts=[];
    for(let i=0;i<BenGlobePoints.length;i+=2){
      const lat=BenGlobePoints[i]*Math.PI/180,lon=BenGlobePoints[i+1]*Math.PI/180;
      const mix=(Math.sin(lon*2.3+lat*3.1)+Math.sin(lat*5.2-lon*1.4)+2)/4;
      pts.push({x:Math.cos(lat)*Math.sin(lon),y:Math.sin(lat),z:Math.cos(lat)*Math.cos(lon),sprite:sprites[Math.min(3,Math.floor(mix*4))]});
    }
    const rings=BenOrbits.map(o=>{
      const cx=Math.cos(o.tiltX),sx=Math.sin(o.tiltX),cz=Math.cos(o.tiltZ),sz=Math.sin(o.tiltZ);
      return {...o,angle:0,rate:1,place:a=>{
        const px=o.radius*Math.cos(a),pz=o.radius*Math.sin(a),y=-pz*sx,z=pz*cx;
        return [px*cz-y*sz,px*sz+y*cz,z];
      }};
    });
    const seen=BenOrbits.map(()=>0);
    const nodes=BenTech.map((t,i)=>{
      const count=BenTech.filter(o=>o.orbit===t.orbit).length,slot=seen[t.orbit]++;
      return {orbit:t.orbit,offset:slot/count*Math.PI*2+t.orbit*.7,phase:i*1.7,scale:1};
    });
    let q=benQuatNorm(benQuatMul(benQuatAxis(1,0,0,.32),benQuatAxis(0,1,0,-.35)));
    let w=0,h=0,R=0,raf=0,last=performance.now(),visible=!0;
    let mx=0,my=0,tiltX=0,tiltY=0,driftX=0,driftY=0,vx=0,vy=0;
    const drag={id:null,x:0,y:0,moved:0};

    const resize=()=>{
      const box=el.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
      w=box.width;h=box.height;R=Math.min(w*.27,h*.3);
      cv.width=w*dpr;cv.height=h*dpr;cv.style.width=w+"px";cv.style.height=h+"px";
      g.setTransform(dpr,0,0,dpr,0,0);
    };
    const observer=new ResizeObserver(resize);observer.observe(el);resize();
    const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting});io.observe(el);

    const frame=now=>{
      raf=requestAnimationFrame(frame);
      const dt=Math.min((now-last)/1e3,.05);last=now;
      if(!visible||!w)return;
      const {hovered:hov,active:act}=live.current,dragging=drag.id!==null;
      const spin=q0=>benQuatNorm(benQuatMul(q0,benQuatAxis(0,1,0,dt*.14)));
      if(dragging){vx*=.8;vy*=.8}
      else{
        if(Math.abs(vx)+Math.abs(vy)>1e-4){q=benQuatNorm(benQuatMul(benQuatMul(benQuatAxis(1,0,0,vy),benQuatAxis(0,1,0,vx)),q));vx*=.94;vy*=.94}
        if(!still)q=spin(q);
      }
      tiltX+=(my*.14-tiltX)*.06;tiltY+=(mx*.2-tiltY)*.06;
      driftX+=(mx*10-driftX)*.06;driftY+=(my*7-driftY)*.06;
      const m=benQuatMatrix(q),t=benQuatMatrix(benQuatMul(benQuatAxis(1,0,0,tiltX),benQuatAxis(0,1,0,tiltY)));
      const cx=w/2+driftX,cy=h/2+driftY,f=3.4;
      const project=(x,y,z)=>{
        const X=t[0]*x+t[1]*y+t[2]*z,Y=t[3]*x+t[4]*y+t[5]*z,Z=t[6]*x+t[7]*y+t[8]*z,s=f/(f-Z);
        return [cx+X*R*s,cy-Y*R*s,Z,s];
      };

      g.clearRect(0,0,w,h);
      g.globalCompositeOperation="source-over";g.globalAlpha=1;
      const halo=g.createRadialGradient(cx,cy,R*.72,cx,cy,R*1.5);
      halo.addColorStop(0,"rgba(88,92,255,.34)");halo.addColorStop(.45,"rgba(124,70,240,.12)");halo.addColorStop(1,"rgba(124,70,240,0)");
      g.fillStyle=halo;g.fillRect(0,0,w,h);

      const strokeRing=(ring,front)=>{
        g.beginPath();let pen=!1;
        for(let i=0;i<=128;i++){
          const [a,b,c]=ring.place(i/128*Math.PI*2),[X,Y,Z]=project(a,b,c);
          if(Z>=0===front){pen?g.lineTo(X,Y):g.moveTo(X,Y);pen=!0}else pen=!1;
        }
        g.strokeStyle=`rgba(${ring.color},${front?.16:.07})`;g.lineWidth=5;g.stroke();
        g.strokeStyle=`rgba(${ring.color},${front?.75:.28})`;g.lineWidth=1;g.stroke();
      };
      g.globalCompositeOperation="lighter";
      rings.forEach(r=>strokeRing(r,!1));

      const drawn=pts.map(p=>{
        const x=m[0]*p.x+m[1]*p.y+m[2]*p.z,y=m[3]*p.x+m[4]*p.y+m[5]*p.z,z=m[6]*p.x+m[7]*p.y+m[8]*p.z;
        return [project(x,y,z),p.sprite];
      });
      const size=Math.max(2.4,R*.03);
      g.globalAlpha=.16;
      for(const [[X,Y,Z],s] of drawn)if(Z<0)g.drawImage(s,X-size/2,Y-size/2,size,size);
      g.globalCompositeOperation="source-over";g.globalAlpha=1;
      const disc=g.createRadialGradient(cx-R*.3,cy-R*.35,R*.1,cx,cy,R);
      disc.addColorStop(0,"rgba(24,24,62,.82)");disc.addColorStop(1,"rgba(8,8,26,.88)");
      g.fillStyle=disc;g.beginPath();g.arc(cx,cy,R,0,Math.PI*2);g.fill();
      g.strokeStyle="rgba(130,130,255,.35)";g.lineWidth=1;g.stroke();
      g.globalCompositeOperation="lighter";
      for(const [[X,Y,Z,sc],s] of drawn)if(Z>=0){
        g.globalAlpha=.45+.55*Z;
        const d=size*sc*1.25;g.drawImage(s,X-d/2,Y-d/2,d,d);
      }
      g.globalAlpha=1;
      rings.forEach(r=>strokeRing(r,!0));
      g.globalCompositeOperation="source-over";

      const hovRing=hov!==null?BenTech[hov].orbit:act!==null?BenTech[act].orbit:null;
      rings.forEach((r,i)=>{
        r.rate+=((hovRing===i?0:1)-r.rate)*.1;
        if(!still)r.angle+=r.speed*r.rate*dt;
      });
      const base=w<480?.84:1;
      nodes.forEach((n,i)=>{
        const r=rings[n.orbit],[a,b,c]=r.place(r.angle+n.offset),[X,Y0,Z,s]=project(a,b,c);
        const Y=Y0+(still?0:Math.sin(now/900+n.phase)*4),target=(hov===i||act===i?1.24:1)*base*(1+(s-1)*.3);
        n.scale+=(target-n.scale)*.16;
        const hidden=!still&&hov!==i&&act!==i&&Z<0&&Math.hypot(X-cx,Y-cy)<R*.98,btn=buttons.current[i];
        positions.current[i]={x:X,y:Y};
        if(btn){
          btn.style.transform=`translate3d(${X-21}px,${Y-21}px,0) scale(${n.scale})`;
          btn.style.opacity=hidden?".14":Z<0?".72":"1";
          btn.style.pointerEvents=hidden?"none":"auto";
          btn.style.zIndex=Z<0?"1":"3";
        }
      });
      if(tipEl.current&&hov!==null){
        const p=positions.current[hov],half=Math.min(tipEl.current.offsetWidth,w)/2+8,below=p.y<92;
        tipEl.current.style.left=Math.max(half,Math.min(w-half,p.x))+"px";
        tipEl.current.style.top=(below?p.y+34:p.y-34)+"px";
        tipEl.current.style.transform=`translate(-50%,${below?"0":"-100%"})`;
      }
    };
    raf=requestAnimationFrame(frame);

    const down=e=>{
      if(e.target.closest("button,a,[data-globe-card]"))return;
      drag.id=e.pointerId;drag.x=e.clientX;drag.y=e.clientY;drag.moved=0;vx=vy=0;
      el.setPointerCapture(e.pointerId);el.style.cursor="grabbing";
    };
    const move=e=>{
      if(e.pointerType==="mouse"){
        const box=el.getBoundingClientRect();
        mx=(e.clientX-box.left)/box.width*2-1;my=(e.clientY-box.top)/box.height*2-1;
      }
      if(e.pointerId!==drag.id)return;
      const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
      drag.x=e.clientX;drag.y=e.clientY;drag.moved+=Math.abs(dx)+Math.abs(dy);
      vx=dx*.006;vy=dy*.006;
      q=benQuatNorm(benQuatMul(benQuatMul(benQuatAxis(1,0,0,vy),benQuatAxis(0,1,0,vx)),q));
    };
    const up=e=>{
      if(e.pointerId!==drag.id)return;
      drag.id=null;el.style.cursor="grab";
      if(drag.moved<5)setActive(null);
    };
    const leave=()=>{mx=0;my=0};
    el.addEventListener("pointerdown",down);el.addEventListener("pointermove",move);
    el.addEventListener("pointerup",up);el.addEventListener("pointercancel",up);el.addEventListener("pointerleave",leave);
    return()=>{
      cancelAnimationFrame(raf);observer.disconnect();io.disconnect();
      el.removeEventListener("pointerdown",down);el.removeEventListener("pointermove",move);
      el.removeEventListener("pointerup",up);el.removeEventListener("pointercancel",up);el.removeEventListener("pointerleave",leave);
    };
  },[]);

  I.useEffect(()=>{
    if(active===null)return;
    const esc=e=>{
      if(e.key!=="Escape")return;
      const btn=buttons.current[active];
      setActive(null);btn&&btn.focus();
    };
    document.addEventListener("keydown",esc);
    return()=>document.removeEventListener("keydown",esc);
  },[active]);

  const card=active!==null?BenTech[active]:null,tip=hovered!==null&&active===null?BenTech[hovered]:null;
  const ctaStyle={marginTop:12,display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:600,color:"#c7d2fe",background:"none",border:0,padding:0,cursor:"pointer",textAlign:"left"};
  const ctaInner=c=>[c.cta,x.jsx(xx,{icon:"lucide:arrow-up-right",width:14,height:14},"arrow")];
  return x.jsxs("div",{
    ref:stage,
    "data-cursor-label":"drag to rotate",
    style:{position:"relative",height:"clamp(360px,52vw,460px)",overflow:"hidden",cursor:"grab",touchAction:"pan-y",userSelect:"none",background:"radial-gradient(ellipse at 50% 50%,#12123a 0%,#08081c 55%,#04040e 100%)"},
    children:[
      x.jsx("canvas",{ref:canvas,role:"img","aria-label":"Rotating globe of glowing particles, with Benjamin's technologies orbiting it",style:{position:"absolute",inset:0,display:"block"}}),
      BenTech.map((t,i)=>x.jsx("button",{
        ref:b=>{buttons.current[i]=b},
        type:"button",
        "aria-label":`${t.name}: ${t.tip}`,
        "aria-expanded":active===i,
        "data-cursor-label":"click for details",
        onPointerEnter:e=>{e.pointerType==="mouse"&&setHovered(i)},
        onPointerLeave:e=>{e.pointerType==="mouse"&&setHovered(h=>h===i?null:h)},
        onFocus:e=>{e.target.matches(":focus-visible")&&setHovered(i)},
        onBlur:()=>setHovered(h=>h===i?null:h),
        onClick:()=>setActive(a=>a===i?null:i),
        style:{position:"absolute",left:0,top:0,width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",border:"1px solid rgba(255,255,255,.75)",background:"#f4f5fb",cursor:"pointer",padding:0,boxShadow:`0 0 18px rgba(${BenOrbits[t.orbit].color},.75)`,transition:"opacity .2s",willChange:"transform"},
        children:x.jsx(xx,{icon:t.icon,width:23,height:23})
      },t.name)),
      tip&&x.jsxs("div",{
        ref:tipEl,
        role:"tooltip",
        style:{position:"absolute",zIndex:5,left:positions.current[hovered].x,top:positions.current[hovered].y-34,transform:"translate(-50%,-100%)",maxWidth:240,pointerEvents:"none",borderRadius:8,border:"1px solid rgba(255,255,255,.14)",background:"rgba(10,10,28,.94)",padding:"7px 11px",textAlign:"center"},
        children:[
          x.jsx("div",{style:{fontSize:12,fontWeight:600,color:"#fff"},children:tip.name}),
          x.jsx("div",{style:{marginTop:2,fontSize:11,lineHeight:1.35,color:"rgba(255,255,255,.68)"},children:tip.tip})
        ]
      }),
      !card&&x.jsx("div",{style:{position:"absolute",left:14,bottom:11,zIndex:2,pointerEvents:"none",fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:".06em",color:"rgba(255,255,255,.45)"},children:"Drag to rotate · Select an icon"}),
      x.jsx(Fn,{children:card&&x.jsxs(et.div,{
        key:card.name,
        "data-globe-card":"",
        "data-cursor-label":card.name,
        role:"dialog",
        "aria-label":`${card.name} details`,
        initial:{opacity:0,y:16,scale:.94,x:"-50%"},
        animate:{opacity:1,y:0,scale:1,x:"-50%"},
        exit:{opacity:0,y:10,scale:.96,x:"-50%"},
        transition:{type:"spring",stiffness:340,damping:28},
        style:{position:"absolute",zIndex:6,left:"50%",bottom:14,width:"min(340px,calc(100% - 24px))",borderRadius:14,border:"1px solid rgba(255,255,255,.14)",background:"#0a0a1c",padding:"14px 16px",color:"#fff",cursor:"default",userSelect:"text",boxShadow:"0 12px 40px rgba(0,0,0,.5)"},
        children:[
          x.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[
            x.jsx("span",{style:{display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,flex:"none",borderRadius:8,background:"#f4f5fb"},children:x.jsx(xx,{icon:card.icon,width:18,height:18})}),
            x.jsxs("div",{style:{flex:1,minWidth:0},children:[
              x.jsx("div",{style:{fontSize:14,fontWeight:600,lineHeight:1.2},children:card.name}),
              x.jsx("div",{style:{marginTop:2,fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"rgba(255,255,255,.55)"},children:card.label})
            ]}),
            x.jsx("button",{type:"button","aria-label":"Close details",onClick:()=>setActive(null),style:{display:"flex",background:"none",border:0,padding:4,color:"rgba(255,255,255,.6)",cursor:"pointer"},children:x.jsx(xx,{icon:"lucide:x",width:16,height:16})})
          ]}),
          x.jsx("p",{style:{marginTop:10,fontSize:12.5,lineHeight:1.5,color:"rgba(255,255,255,.76)"},children:card.text}),
          card.to
            ?x.jsx("button",{type:"button",onClick:()=>nav(card.to),style:ctaStyle,children:ctaInner(card)})
            :x.jsx("a",{href:card.href,target:"_blank",rel:"noopener noreferrer",style:{...ctaStyle,textDecoration:"none"},children:ctaInner(card)})
        ]
      })})
    ]
  });
}
