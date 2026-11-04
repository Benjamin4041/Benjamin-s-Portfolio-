"""Patch the downloaded template bundle with Benjamin's content. Every patch must match, or the build fails."""
import json, os, re, sys

src_js, out_js = sys.argv[1], sys.argv[2]
js = open(src_js, encoding="utf-8").read()


def sub(old, new, count=1):
    global js
    found = js.count(old)
    if found != count:
        sys.exit(f"expected {count} of {old[:80]!r}, found {found}")
    js = js.replace(old, new)


def rsub(pattern, new):
    global js
    js, n = re.subn(pattern, lambda _: new, js, flags=re.S)
    if n != 1:
        sys.exit(f"expected 1 match of {pattern[:80]!r}, found {n}")


EMAIL = "anoruokachi2@gmail.com"
CV = "/assets/pdf/Fullstack_cv.pdf"
CDN = "https://res.cloudinary.com/ba-foods/image/upload/"
RAVEN_HERO = CDN + "v1753693942/screenshot-20250728100552_cueeuo.png"
ROQQU_HERO = CDN + "v1753694123/screenshot-20250728100526_dk1e6w.png"
SPENCER_HERO = CDN + "v1708872646/Screenshot_2024-02-24_at_5.31.23_pm_swr1uh.png"

data = {
    "name": "Benjamin Anoruo",
    "firstName": "Benjamin",
    "url": "https://benjaminanoruo.netlify.app",
    "quote": {"text": "", "author": ""},
    "profileImages": ["/profile.webp"],
    "bannerImage": "/assets/og-image.jpg",
    "socialBannerImage": "/assets/og-image.jpg",
    "initials": "BA",
    "role": "Fullstack React Developer",
    "location": "",
    "timezone": None,
    "email": EMAIL,
    "greeting": "Hi there, I am Benjamin",
    "tagline": "A seasoned Fullstack developer crafting robust web apps, intuitive UIs, and scalable solutions.",
    "about": [
        "Hi there, I am Benjamin, a seasoned Fullstack developer crafting robust web apps, intuitive UIs, and scalable solutions.",
        "I'm dedicated to building contemporary, user-friendly web designs and cutting-edge digital solutions. Let me help you construct the brand of your dreams by creating dynamic and engaging online experiences.",
        "I offer expert website management and building services. From front-end design to back-end development, I create customized websites and web apps to suit your needs. With my comprehensive approach, your site will be optimized for performance and seamlessly maintained. Trust me to handle the technical aspects while you focus on growing your business. Let's create an engaging online presence that drives success together.",
        "I'm driven by the challenge of adapting my skills, processes, and thinking to meet the evolving needs of the world. I excel in collaborative, ambitious teams that create inclusive environments where everyone feels they belong. My skills and interests cut across product and visual design, interaction design, Webflow development, motion design, graphic design, branding, video editing and UI engineering.",
    ],
    "tldr": ["Fullstack web apps.", "Intuitive, accessible UIs.", "Scalable backend systems.", "Motion and interaction."],
    "status": {"available": True, "availableText": "", "nowLearning": "", "nowBuilding": "", "nowListening": ""},
    "socials": {
        "github": "https://github.com/Benjamin4041",
        "twitter": "https://x.com/AnoruoBenjamin",
        "linkedin": "https://www.linkedin.com/in/benjamin-anoruo-aa9b36245/",
        "instagram": "https://www.instagram.com/benjamin_fx_2/",
        "email": f"mailto:{EMAIL}",
        "resume": CV,
        "discord": "",
        "medium": "",
    },
    "experience": [
        {
            "company": "SpencerZill",
            "role": "Full-Stack Developer",
            "period": "2021 – Present",
            "blurb": "At Spencerzill Studio, I led impactful development initiatives that streamlined workflows, improved deployment efficiency, and enhanced the user experience across multiple products. My contributions directly reduced operational bottlenecks and enabled teams to ship features faster while maintaining high code quality.",
            "url": "https://spencerzill.com/",
        },
        {
            "company": "Roqqu",
            "role": "Frontend Developer",
            "period": "2023 – 2024",
            "blurb": "At Roqqu, I rebuilt and modernized the company’s marketing site while delivering polished, accessible, and performance-focused frontend applications for multiple clients. My work emphasized speed, design quality, and consistent delivery standards, improving both the product experience and development workflow.",
            "url": "https://roqqu.com/",
        },
        {
            "company": "Raven Bank",
            "role": "Frontend Developer",
            "period": "2022 – 2023",
            "blurb": "At RavenBank, I developed scalable frontend architecture and accessibility-focused components to support a modern banking platform. I implemented multilingual support, robust authentication, and optimized client-side systems, ensuring the application was secure, user-friendly, and resilient in production environments.",
            "url": "https://getravenbank.com/",
        },
    ],
    "freelanceProjects": [],
    "projects": [
        {
            "title": "Raven Bank",
            "blurb": "A digital banking platform for individuals and businesses to send, receive and save money on the web and on mobile.",
            "story": "Raven Bank is a digital banking platform for individuals and businesses, letting people send, receive and save money on the web and on mobile. I worked on the web frontend: a reusable component library, multilingual and localized experiences, and secure authentication and navigation flows, all built with accessibility and production reliability in mind.\n\nProject goals: create a scalable, maintainable frontend component library; enable multilingual and localized user experiences; build secure authentication and navigation flows; ensure production reliability through utility optimization.\n\nOutcome: a secure, accessible banking web app with multilingual support, built on a component library the team can keep extending.",
            "stack": ["JavaScript", "HTML5", "CSS3 / Sass", "Localization & Routing Systems", "Accessibility Best Practices"],
            "year": "2022 – 2023",
            "links": {"live": "https://getravenbank.com/"},
            "featured": True,
            "image": RAVEN_HERO,
            "categories": ["Frontend"],
        },
        {
            "title": "Roqqu",
            "blurb": "A crypto and payments app for trading crypto and sending and receiving money across borders. I rebuilt its marketing website.",
            "story": "Roqqu is a crypto and payments app for trading crypto and sending and receiving money across borders. I rebuilt and modernized its marketing website with React and Gatsby, focusing on speed, accessibility and visual polish, and delivered frontend work for multiple clients to the same standard.\n\nProject goals: modernize and optimize marketing website architecture; improve accessibility and visual polish in all delivered products; maintain high-quality, standardized frontend codebases; ensure timely, client-focused delivery.\n\nOutcome: a faster, more polished and accessible marketing site, delivered alongside a more consistent, standardized frontend workflow.",
            "stack": ["React", "Gatsby", "JavaScript", "HTML5", "CSS3 / Sass", "Accessibility Best Practices"],
            "year": "2023 – 2024",
            "links": {"live": "https://roqqu.com/"},
            "featured": True,
            "image": ROQQU_HERO,
            "categories": ["Frontend"],
        },
        {
            "title": "SpencerZill",
            "blurb": "A creative studio producing animation, branding, motion and VFX work for brands and agencies.",
            "story": "SpencerZill is a creative studio producing animation, branding, motion and VFX work for brands and agencies. As a full-stack developer there, I lead development initiatives across multiple products, working with the UX team on product design decisions and building cross-browser compatible frontends.\n\nProject goals: workflow optimization and productivity improvements; cross-browser compatible frontend development; collaboration with UX to guide product design decisions.\n\nOutcome: streamlined workflows and more efficient deployments, so the team ships features faster while keeping code quality high.",
            "stack": ["React", "JavaScript", "HTML5", "CSS3 / Sass", "Bootstrap", "ReactPlayer (Vimeo & YouTube)", "Cloudinary", "Vercel", "UX Collaboration", "Deployment Automation"],
            "year": "2021 – Present",
            "links": {"live": "https://spencerzill.com/"},
            "featured": True,
            "image": SPENCER_HERO,
            "categories": ["Fullstack"],
        },
    ],
    "skills": ["HTML", "CSS", "Javascript", "Python", "React.JS", "Next.JS", "React Native", "Redux", "Material UI", "R3F", "GSAP", "D3JS", "Jquery", "Bootstrap", "Node.js", "Express.js", "REST APIs", "JWT", "OAuth", "MongoDB", "AWS (EC2, S3, Lambda, Rekognition)", "Firebase", "IAM", "PAM"],
    "writing": [],
    "openSourceContributions": [],
    "github": {"username": "Benjamin4041"},
    "footerNote": "Built by Benjamin Anoruo",
}
rsub(r'const Pe=\{name:"Harshit Raghuwanshi".*?footerNote:"Built by Harshit Raghuwanshi"\};',
     "const Pe=" + json.dumps(data, ensure_ascii=False) + ";")

# Skills: tabs, categories and icons
rsub(r'fD=\{JavaScript:"logos:javascript".*?RAG:"lucide:database-zap"\}', "fD=" + json.dumps({
    "HTML": "logos:html-5", "CSS": "logos:css-3", "Javascript": "logos:javascript", "Python": "logos:python",
    "React.JS": "logos:react", "Next.JS": "logos:nextjs-icon", "React Native": "logos:react", "Redux": "logos:redux",
    "Material UI": "logos:material-ui", "R3F": "simple-icons:threedotjs", "GSAP": "simple-icons:greensock",
    "D3JS": "logos:d3", "Jquery": "logos:jquery", "Bootstrap": "logos:bootstrap", "Node.js": "logos:nodejs-icon",
    "Express.js": "logos:express", "REST APIs": "lucide:braces", "JWT": "logos:jwt-icon", "OAuth": "lucide:key-round",
    "MongoDB": "logos:mongodb-icon", "AWS (EC2, S3, Lambda, Rekognition)": "logos:aws", "Firebase": "logos:firebase",
    "IAM": "lucide:shield", "PAM": "lucide:lock",
}))
rsub(r'dD=\{Languages:\["JavaScript".*?"RAG"\]\}', "dD=" + json.dumps({
    "Languages": ["HTML", "CSS", "Javascript", "Python"],
    "Frontend": ["React.JS", "Next.JS", "React Native", "Redux", "Material UI", "R3F", "GSAP", "D3JS", "Jquery", "Bootstrap"],
    "Backend": ["Node.js", "Express.js", "REST APIs", "JWT", "OAuth"],
    "Databases": ["MongoDB", "Firebase"],
    "DevOps & Cloud": ["AWS (EC2, S3, Lambda, Rekognition)", "Firebase", "IAM", "PAM"],
}))
sub('"DevOps & Cloud","AI"];const', '"DevOps & Cloud"];const', 0) if False else None
sub('n=["All","Languages","Frontend","Backend","Databases","DevOps & Cloud","AI"]', 'n=["All","Languages","Frontend","Backend","Databases","DevOps & Cloud"]')

# Hero
sub('ax=["Full Stack Developer","Software Engineer","Creative Developer","AI & Backend Builder"]',
    'ax=["Fullstack React Developer","Frontend Developer","UI Engineer","Fullstack Developer"]')
rsub(r'x\.jsxs\("span",\{className:"flex items-center gap-1",children:\[x\.jsx\(EP,\{size:12,className:"shrink-0"\}\)," ",Pe\.location\]\}\),x\.jsx\("span",\{children:"·"\}\),', "")
sub('"data-cursor-label":"click to view memories"', '"data-cursor-label":"click to view projects"')

# Football game names (demo opponent included)
sub('"RONALDO WINS":"HARSHIT WINS":this.winner==="left"?"YOU WIN!":"HARSHIT WINS"', '"RIVAL WINS":"BENJAMIN WINS":this.winner==="left"?"YOU WIN!":"BENJAMIN WINS"')
sub('l=this.demo?"RONALDO":"YOU",u="HARSHIT"', 'l=this.demo?"RIVAL":"YOU",u="BENJAMIN"')
sub('b="HARSHITR.ME"', 'b="BENJAMIN"')
sub('"aria-label":"Play football against Harshit"', '"aria-label":"Play football against Benjamin"')
js, n = re.subn(r'children:"Harshit"', 'children:"Benjamin"', js)
if n != 3:
    sys.exit(f"expected 3 player labels, found {n}")

# Preloader note, own view counter, no Vercel analytics from the template's owner
sub('"sheet 01 · harshit · setting out"', '"sheet 01 · benjamin · setting out"')
sub('l="harshit_portfolio_views"', 'l="benjamin_anoruo_portfolio_views"')
sub('"harshit_portfolio_visited"', '"benjamin_portfolio_visited"', 2)
sub('x.jsx(GD,{}),x.jsx(HD,{}),', 'x.jsx(GD,{}),')

# GitHub graph: never show invented activity under Benjamin's name
sub('n.push(a<34?0:a<60?1:a<80?2:a<93?3:4)', 'n.push(0)')
sub('"500+ commits in the last year"', '"Contribution data unavailable"')

# Footer: visitor-local clock, no location
sub('timeZone:"Asia/Kolkata",', '')
sub('Pe.location," · ",e||"IST"', 'e')
sub('Pe.location," · ",e||"--:--:--"', 'e||"--:--:--"')
sub('Sj="https://leave-your-thumbprint.vercel.app/"', 'Sj=Pe.socials.github')
sub('"Leave your thumbprint"', '"Explore my code & projects"')
sub('"If you\'ve read this far, you might be interested in collaborating or building something great."', '"See how I can help you, get in touch today."')

# Social cards
rsub(r'\{key:"resume",href:Pe\.socials\.resume,label:"Resume",Icon:hb\}\],wD=\{.*?bannerText:"skills • projects • experience"\}\}',
     '{key:"twitter",href:Pe.socials.twitter,label:"X",Icon:({className:e})=>x.jsx("svg",{className:e,width:"18",height:"18",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":!0,children:x.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})})},'
     '{key:"instagram",href:Pe.socials.instagram,label:"Instagram",Icon:({className:e})=>x.jsxs("svg",{className:e,width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,children:[x.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"5"}),x.jsx("circle",{cx:"12",cy:"12",r:"4"}),x.jsx("circle",{cx:"17.5",cy:"6.5",r:"0.5"})]})},'
     '{key:"resume",href:Pe.socials.resume,label:"Resume",Icon:hb}],wD=' + json.dumps({
         "github": {"handle": "@Benjamin4041", "bio": "Explore my code & projects", "stats": ["Fullstack Developer"], "bannerText": "build • learn • ship"},
         "linkedin": {"handle": "in/benjamin-anoruo-aa9b36245", "bio": "Let’s connect professionally", "stats": ["Fullstack React Developer"], "bannerText": "connect • build • grow"},
         "twitter": {"handle": "@AnoruoBenjamin", "bio": "Random thoughts & dev tweets", "stats": ["Dev tweets"], "bannerText": "think • tweet • ship"},
         "instagram": {"handle": "@benjamin_fx_2", "bio": "My visual journal & life updates", "stats": ["Visual journal"], "bannerText": "visuals • life • updates"},
         "email": {"handle": EMAIL, "bio": "See how I can help you, get in touch today.", "stats": ["Direct Contact"], "bannerText": "connect • collaborate • build"},
         "resume": {"handle": "Curriculum Vitae", "bio": "Download my CV.", "stats": ["Skills", "Projects", "Experience"], "bannerText": "skills • projects • experience"},
     }, ensure_ascii=False))

# Contact form: send through Benjamin's EmailJS (same IDs as his live site), mail app on failure
rsub(r'l=c=>\{c\.preventDefault\(\),!\(!e\.name\|\|!e\.email\|\|!e\.message\)&&\(r\(!0\),setTimeout\(\(\)=>\{r\(!1\),t\(\{name:"",email:"",message:""\}\)\},4e3\)\)\}',
     'l=c=>{c.preventDefault(),!(!e.name||!e.email||!e.message)&&fetch("https://api.emailjs.com/api/v1.0/email/send",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({service_id:"service_x0dyvcm",template_id:"template_3q93usl",user_id:"s8KTW-qJ8cs16HySg",template_params:{from_name:e.name,email:e.email,message:e.message}})}).then(m=>{if(!m.ok)throw new Error(m.statusText);r(!0),setTimeout(()=>{r(!1),t({name:"",email:"",message:""})},4e3)}).catch(()=>{window.location.href=`mailto:${Pe.email}?subject=${encodeURIComponent("Message from "+e.name)}&body=${encodeURIComponent(e.message)}`})}')
sub('"Freelance · Internships · Full-Time"', '"Websites · Web Apps · Collaborations"')
sub('"Usually within 24–48 hours."', '"I\'ll reply by email."')

# Palette: drop entries with nothing behind them
rsub(r'\{id:"nav-opensource".*?a\(\)\}\},', "")
rsub(r'\{id:"nav-writing".*?a\(\)\}\},', "")
rsub(r'\{id:"action-medium".*?a\(\)\}\},', "")

# No articles yet: drop the Writing route and its drafted-topics text
sub('x.jsx(Dn,{path:"/writing",element:x.jsx(yD,{})}),', '')
sub('"/contact","/writing","/experiments"', '"/contact","/experiments"')
sub('"https://medium.com/@harshuraghu7999"', '""')

# Memory Box: Benjamin's project shots, no personal photos or music from the template's owner
photos = [
    ("Raven Bank", "/assets/images/161945144665791.62924c011add7.jpg"),
    ("Raven Bank", RAVEN_HERO),
    ("Raven Bank features", "/assets/images/projects/raven_features.jpg"),
    ("Roqqu", ROQQU_HERO),
    ("Roqqu app", "/assets/images/Group 1.png"),
    ("SpencerZill", SPENCER_HERO),
    ("SpencerZill intro", "/assets/images/projects/spencerzill_1.jpg"),
    ("SpencerZill portfolio", "/assets/images/projects/spencerzill_2.jpg"),
    ("Upcoming Works", "/assets/images/projects/spencerzill_4.jpg"),
]
rsub(r'Z=\[\{caption:"heaven".*?audio:"/assets/music/spiderMan\.mp3"\}\];',
     "Z=" + json.dumps([{"caption": c, "img": i, "audio": None} for c, i in photos], ensure_ascii=False) + ";")
rsub(r'r=\[\{image:"/assets/photos/photo4\.webp".*?date:"DEC 24"\}\]',
     "r=" + json.dumps([
         {"image": RAVEN_HERO, "title": "Raven Bank", "date": "2022"},
         {"image": ROQQU_HERO, "title": "Roqqu", "date": "2023"},
         {"image": SPENCER_HERO, "title": "SpencerZill", "date": "2021"},
     ]))
sub('"memories, on a string"', '"projects, on a string"')
sub('"drop a memory here"', '"drop a project here"')
sub('"see what it sounds like"', '"see it up close"')
sub('description:"Memories, photos and sounds on a string",category:"interactive",image:"/assets/experiments/memory-box.webp"',
    'description:"Project shots on a string",category:"interactive",image:"/assets/images/projects/spencerzill_2.jpg"')

# New home sections for content the template has no slot for
TESTIMONIALS = [
    ("Bryan", "Product Designer {Binance}", "Benjamin's prowess as a developer is unparalleled. His ability to translate abstract ideas into exceptional digital solutions is remarkable. Over the years, I've seen him craft everything from intricate web applications to seamless user experiences with finesse and professionalism."),
    ("ZARA", "Product Designer", "Working with Benjamin feels effortless. He anticipates every design nuance, delivers polished interfaces ahead of schedule, and keeps collaboration focused with clear, thoughtful communication."),
    ("Prince Kingsley", "Product Designer {Innoson}", "Benjamin combines strategic thinking with clean execution. He balances performance, accessibility, and visual craft so our products launch stronger with each iteration."),
]
WHY = [
    ("Comprehensive Skill Set", "As a full stack developer, I bring expertise across both frontend and backend technologies, ensuring seamless integration and holistic development solutions."),
    ("Problem-Solving Mindset", "I excel at analyzing complex requirements and translating them into efficient, scalable systems. I proactively identify challenges and craft robust solutions."),
    ("Focus on User Experience", "Beyond writing clean code, I prioritize intuitive interfaces and smooth interactions, delivering products that users love to engage with."),
    ("Commitment to Quality & Collaboration", "I value clear communication and thrive in team environments. I’m dedicated to writing maintainable code, following best practices, and always pushing for the highest standards."),
]
CARD = "rounded-xl border border-[var(--line)] bg-[var(--card)] p-5"
BODY = "text-[14.5px] leading-relaxed text-[var(--muted)]"
LABEL = "font-mono text-[11px] text-[var(--soft)]"
sections = (
    "const BenTestimonials=" + json.dumps(TESTIMONIALS, ensure_ascii=False) + ",BenWhy=" + json.dumps(WHY, ensure_ascii=False) + ";"
    'function BenWhySection(){return x.jsxs("div",{id:"why",children:[x.jsx(On,{title:"Why work with me"}),x.jsx(dt,{className:"px-6 py-7 sm:px-8 space-y-4",children:BenWhy.map(([e,t])=>x.jsxs("div",{className:' + json.dumps(CARD) + ',children:[x.jsx("h3",{className:"text-[15px] font-semibold text-[var(--fg)]",children:e}),x.jsx("p",{className:' + json.dumps("mt-1 " + BODY) + ',children:t})]},e))})]})}'
    'function BenTestimonialSection(){return x.jsxs("div",{id:"testimonials",children:[x.jsx(On,{title:"Testimonials"}),x.jsx(dt,{className:"px-6 py-7 sm:px-8 space-y-4",children:BenTestimonials.map(([e,t,n])=>x.jsxs("div",{className:' + json.dumps(CARD) + ',children:[x.jsx("p",{className:' + json.dumps(BODY) + ',children:n}),x.jsxs("p",{className:' + json.dumps("mt-3 " + LABEL) + ',children:[e," · ",t]})]},e))})]})}'
)
sub("function nI({onOpenPalette:e}){", sections + "function nI({onOpenPalette:e}){")
sub("x.jsx(Rb,{limit:4}),x.jsx(vD,{})", "x.jsx(BenWhySection,{}),x.jsx(BenTestimonialSection,{}),x.jsx(Rb,{limit:4}),x.jsx(vD,{})")

# Interactive globe replaces the football banner in the hero; /projects?q=X preselects the project search.
here = os.path.dirname(os.path.abspath(__file__))
globe = open(os.path.join(here, "ben_globe.js"), encoding="utf-8").read().replace("__POINTS__", open(os.path.join(here, "globe_points.json")).read())
sub("function rL({onOpenPalette:e}){", globe + "function rL({onOpenPalette:e}){")
sub('x.jsx(dt,{className:"",children:x.jsx(Xj,{})})', 'x.jsx(dt,{className:"",children:x.jsx(BenGlobe,{})})')
sub('[r,s]=I.useState("All"),[a,l]=I.useState("")', '[r,s]=I.useState("All"),[a,l]=I.useState(()=>e&&new URLSearchParams(location.search).get("q")||"")')

open(out_js, "w", encoding="utf-8").write(js)

leftovers = re.findall(r".{30}(?:[Hh]arshit|HARSHIT|harshu|RONALDO|Kolkata|Bhopal|/assets/music|/assets/photos|/project-images|hrstwt|profile2).{30}", js)
print("patched OK; leftovers:", len(leftovers))
for l in leftovers[:20]:
    print(" ", l)
