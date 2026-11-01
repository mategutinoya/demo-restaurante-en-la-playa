/**
 * Builds a zero-setup static preview of the site in /preview:
 *   preview/index.html and preview/menu.html
 *
 * Each page is a single self-contained file (CSS + fonts inlined, a small
 * vanilla script for the interactions) so it can be opened from any static
 * host or link-preview service without running Next.js.
 *
 * Usage: npm run build && node scripts/build-preview.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const nextDir = path.join(root, ".next");
const outDir = path.join(root, "preview");
fs.mkdirSync(outDir, { recursive: true });

const read = (p) => fs.readFileSync(p, "utf8");

/* ---------- CSS: keep only Latin font faces, inline them as woff2 data URIs ---------- */
function buildCss(html) {
  const hrefs = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map((m) => m[1]);
  let css = hrefs.map((h) => read(path.join(nextDir, h.replace(/^\/_next\//, "")))).join("\n");
  css = css.replace(/@font-face\{[^}]*\}/g, (block) => {
    const m = block.match(/url\(\.\.\/media\/([^)]+?\.woff2)\)/);
    if (!m || !/-latin-(\d|wght)/.test(m[1])) return "";
    const data = fs.readFileSync(path.join(nextDir, "static/media", m[1])).toString("base64");
    return block.replace(/src:[^;]+;/, `src:url(data:font/woff2;base64,${data}) format("woff2");`);
  });
  return css;
}

/* ---------- Menu data (parsed from the prerendered /menu page) ---------- */
function parseMenu(menuHtml) {
  const sections = [...menuHtml.matchAll(/<section id="([^"]+)" aria-labelledby[\s\S]*?<\/section>/g)];
  return sections.map(([block, id]) => {
    const intro = (block.match(/<p class="mt-4 font-serif text-xl italic[^"]*">([\s\S]*?)<\/p>/) || [])[1] || "";
    const items = [...block.matchAll(/<h3 class="font-serif text-2xl">([\s\S]*?)<\/h3><p[^>]*>([\s\S]*?)<\/p><\/div><span[^>]*>([\s\S]*?)<\/span>/g)].map(
      (m) => ({ name: m[1], description: m[2], tags: m[3].replace(/<[^>]+>/g, "") }),
    );
    return { id, intro, items };
  });
}

/* ---------- Interactions (vanilla JS replacement for the React islands) ---------- */
const previewCss = `
header.pv-scrolled{background:rgba(248,245,239,.92)!important;padding-block:.75rem!important;box-shadow:0 1px 0 rgba(23,59,74,.08);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
header.pv-scrolled .text-ivory,header.pv-open .text-ivory{color:#173b4a!important}
header.pv-scrolled a[href$="#reservations"].border,header.pv-open a[href$="#reservations"].border{border-color:rgba(23,59,74,.3)!important;color:#173b4a!important}
header.pv-scrolled a[aria-label$="home"],header.pv-open a[aria-label$="home"]{opacity:1!important;transform:none!important;pointer-events:auto!important}
header.pv-open #mobile-menu{visibility:visible!important;opacity:1!important}
header.pv-open #mobile-menu li{opacity:1!important;transform:none!important}
header.pv-open [aria-controls="mobile-menu"] span span:first-child{transform:translateY(6px) rotate(45deg)}
header.pv-open [aria-controls="mobile-menu"] span span:last-child{width:100%;transform:translateY(-5px) rotate(-45deg)}
.pv-lightbox-open{visibility:visible!important;opacity:1!important}
`;

function previewScript(menu, isHome) {
  return `
(function(){
var MENU=${JSON.stringify(menu)};
var FALLBACK="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=75";
function $(s,c){return (c||document).querySelector(s)}
function $$(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))}
function swap(el,from,to){from.split(" ").forEach(function(c){c&&el.classList.remove(c)});to.split(" ").forEach(function(c){c&&el.classList.add(c)})}

/* Photos: fade in on load, fallback on error */
function wirePhoto(img){
  var done=function(){swap(img,"opacity-0 blur-[6px]","opacity-100 blur-0")};
  if(img.complete&&img.naturalWidth)done();
  img.addEventListener("load",done);
  img.addEventListener("error",function(){ if(img.dataset.fb){done();return} img.dataset.fb=1; img.removeAttribute("srcset"); img.src=FALLBACK; });
}
$$("img").forEach(wirePhoto);

/* Always open at the top (hero). In-page links scroll without leaving a #hash in the URL,
   so reloading or reopening the page on a phone doesn't jump halfway down. */
if("scrollRestoration" in history)history.scrollRestoration="manual";
function cleanUrl(){try{history.replaceState(history.state,"",location.pathname+location.search)}catch(e){}}
(function(){
  var h=location.hash,t=h.length>1?document.getElementById(decodeURIComponent(h.slice(1))):null;
  if(t){requestAnimationFrame(function(){t.scrollIntoView()});cleanUrl()}else{if(h)cleanUrl();window.scrollTo(0,0)}
})();
window.addEventListener("pageshow",function(e){if(e.persisted)window.scrollTo(0,0)});
document.addEventListener("click",function(e){
  if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  var a=e.target.closest&&e.target.closest("a[href^='#']");if(!a)return;
  var el=document.getElementById(decodeURIComponent(a.getAttribute("href").slice(1)));if(!el)return;
  e.preventDefault();
  el.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
  if(el.id==="main")el.focus({preventScroll:true});
},true);

/* Scroll reveal */
var els=$$(".reveal,.reveal-image");
if("IntersectionObserver" in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("is-visible");io.unobserve(e.target)}})},{rootMargin:"0px 0px -8% 0px",threshold:0.08});
  els.forEach(function(el){io.observe(el)});
}else els.forEach(function(el){el.classList.add("is-visible")});

/* Header */
var header=$("header");
if(${isHome}){var onScroll=function(){header.classList.toggle("pv-scrolled",window.scrollY>40)};onScroll();window.addEventListener("scroll",onScroll,{passive:true});}
var burger=$('[aria-controls="mobile-menu"]');
function setMenu(open){header.classList.toggle("pv-open",open);burger.setAttribute("aria-expanded",open);burger.setAttribute("aria-label",open?"Close menu":"Open menu");document.documentElement.style.overflow=open?"hidden":""}
if(burger){burger.addEventListener("click",function(){setMenu(!header.classList.contains("pv-open"))});$$("#mobile-menu a").forEach(function(a){a.addEventListener("click",function(){setMenu(false)})});}

/* Menu tabs */
var tabs=$$('[role="tab"]');
if(tabs.length){
  var frames=$$("#menu-panel .reveal-image > div");
  var panel=$("#menu-panel > div:last-child");
  var activate=function(i){
    tabs.forEach(function(t,j){
      var on=i===j;
      t.setAttribute("aria-selected",on);
      if(on)swap(t,"border-deep/20 text-deep/55 hover:text-deep","border-deep bg-deep text-ivory lg:bg-transparent lg:text-deep");
      else swap(t,"border-deep bg-deep text-ivory lg:bg-transparent lg:text-deep","border-deep/20 text-deep/55 hover:text-deep");
      var spans=t.querySelectorAll("span");
      spans[1].classList.toggle("lg:translate-x-3",on);
      swap(spans[2],on?"w-0":"w-16",on?"w-16":"w-0");
    });
    frames.forEach(function(f,j){ if(i===j)swap(f,"scale-[1.04] opacity-0","scale-100 opacity-100"); else swap(f,"scale-100 opacity-100","scale-[1.04] opacity-0"); });
    var c=MENU[i];
    panel.innerHTML='<p class="font-serif text-xl italic text-deep/70">'+c.intro+'</p><ul class="mt-8 divide-y divide-deep/10 border-y border-deep/10">'+
      c.items.map(function(it){return '<li class="flex items-baseline justify-between gap-6 py-5"><div><h4 class="font-serif text-2xl">'+it.name+'</h4><p class="mt-1 text-sm font-light leading-relaxed text-deep/70">'+it.description+'</p></div>'+(it.tags?'<span class="shrink-0 eyebrow text-olive">'+it.tags+'</span>':'')+'</li>'}).join("")+'</ul>';
    panel.classList.remove("animate-fade-up");void panel.offsetWidth;panel.classList.add("animate-fade-up");
  };
  tabs.forEach(function(t,i){t.addEventListener("click",function(){activate(i)});t.addEventListener("mouseenter",function(){activate(i)});t.addEventListener("focus",function(){activate(i)})});
}

/* Gallery lightbox */
var gBtns=$$("#gallery li button");
var dialog=$('#gallery [role="dialog"]');
if(dialog&&gBtns.length){
  var photos=gBtns.map(function(b){var im=b.querySelector("img");return {src:im.currentSrc||im.src,alt:im.alt,base:(im.getAttribute("src")||"").split("?")[0]}});
  var idx=null,last=null,touchX=null;
  var ctrls=$$("button",dialog);
  var render=function(){
    var old=dialog.querySelector("figure");if(old)old.remove();
    if(idx===null)return;
    var p=photos[idx];
    var fig=document.createElement("figure");
    fig.className="relative h-[78svh] w-[92vw] max-w-6xl animate-fade-up";
    fig.innerHTML='<img alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain"><figcaption class="absolute -bottom-10 left-0 right-0 flex justify-between text-xs font-light text-ivory/70"><span></span><span class="tabular-nums"></span></figcaption>';
    var im=fig.querySelector("img");im.alt=p.alt;im.src=p.base+"?auto=format&fit=crop&w=2000&q=85";
    im.onerror=function(){im.onerror=null;im.src=FALLBACK};
    fig.querySelector("figcaption span").textContent=p.alt;
    fig.querySelector(".tabular-nums").textContent=String(idx+1).padStart(2,"0")+" / "+String(photos.length).padStart(2,"0");
    dialog.insertBefore(fig,dialog.firstChild);
  };
  var open=function(i,btn){idx=i;last=btn;render();dialog.classList.add("pv-lightbox-open");dialog.setAttribute("aria-hidden","false");document.documentElement.style.overflow="hidden";ctrls.forEach(function(c){c.tabIndex=0});ctrls[0].focus()};
  var close=function(){idx=null;render();dialog.classList.remove("pv-lightbox-open");dialog.setAttribute("aria-hidden","true");document.documentElement.style.overflow="";ctrls.forEach(function(c){c.tabIndex=-1});if(last)last.focus()};
  var step=function(d){if(idx===null)return;idx=(idx+d+photos.length)%photos.length;render()};
  gBtns.forEach(function(b,i){b.addEventListener("click",function(){open(i,b)})});
  ctrls[0].addEventListener("click",close);ctrls[1].addEventListener("click",function(){step(-1)});ctrls[2].addEventListener("click",function(){step(1)});
  dialog.addEventListener("click",function(e){if(e.target===dialog)close()});
  dialog.addEventListener("touchstart",function(e){touchX=e.touches[0].clientX},{passive:true});
  dialog.addEventListener("touchend",function(e){if(touchX===null)return;var dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>50)step(dx<0?1:-1);touchX=null});
  window.addEventListener("keydown",function(e){if(idx===null)return;if(e.key==="Escape")close();if(e.key==="ArrowRight")step(1);if(e.key==="ArrowLeft")step(-1)});
}

/* Reservation form (preview: validates, then shows the confirmation without sending) */
var form=$("#reservations form");
if(form){
  var d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());var today=d.toISOString().slice(0,10);
  var date=$("#res-date");if(date)date.min=today;
  var times=$$("#res-time option").map(function(o){return o.value}).filter(Boolean);
  var rules={
    name:function(v){v=v.trim();return v.length<2?"Please tell us your name.":v.length>80?"Please use 80 characters or fewer.":""},
    email:function(v){return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(v.trim())?"":"Please enter a valid email address."},
    phone:function(v){return /^\\+?[\\d\\s().-]{7,20}$/.test(v.trim())&&v.replace(/\\D/g,"").length>=7?"":"Please enter a valid phone number, including country code."},
    date:function(v){return !/^\\d{4}-\\d{2}-\\d{2}$/.test(v)?"Please choose a date.":v<today?"Please choose today or a future date.":""},
    time:function(v){return times.indexOf(v)<0?"Please choose a time.":""},
    guests:function(){return ""},
    comments:function(v){return v.length>600?"Please keep comments under 600 characters.":""}
  };
  var touched={};
  var show=function(k){
    var el=$("#res-"+k),err=$("#res-"+k+"-error"),msg=touched[k]?rules[k](el.value):"";
    err.textContent=msg;err.setAttribute("role",msg?"alert":"none");
    swap(err,msg?"opacity-0":"opacity-100",msg?"opacity-100":"opacity-0");
    el.setAttribute("aria-invalid",!!msg);return msg;
  };
  Object.keys(rules).forEach(function(k){var el=$("#res-"+k);if(!el)return;
    el.addEventListener("blur",function(){touched[k]=true;show(k)});
    el.addEventListener("input",function(){if(touched[k])show(k)});
    el.addEventListener("change",function(){if(touched[k])show(k)});
  });
  form.addEventListener("submit",function(e){
    e.preventDefault();var first=null;
    Object.keys(rules).forEach(function(k){touched[k]=true;if(show(k)&&!first)first=k});
    if(first){$("#res-"+first).focus();return}
    var ref="AZ-"+Date.now().toString(36).toUpperCase().slice(-6);
    var wrap=form.parentElement;
    wrap.outerHTML='<div role="status" class="mt-14 animate-fade-up border-t border-deep/15 pt-12"><p class="eyebrow text-olive">Request received</p><p class="display mt-4 text-4xl md:text-5xl">Grazie. We&rsquo;ll be in touch shortly.</p><p class="prose-body mt-6 text-deep/75">Your reference is <strong class="font-medium">'+ref+'</strong>. A confirmation will be sent to your email once the table is secured.</p><p class="mt-6 text-xs font-light text-deep/50">Preview mode: no request was sent.</p></div>';
  });
}
})();`;
}

/* ---------- Assemble a page ---------- */
const iconSvg = read(path.join(root, "src/app/icon.svg"));
const iconHref = `data:image/svg+xml;base64,${Buffer.from(iconSvg).toString("base64")}`;

function buildPage(file, outName, isHome, menu) {
  let html = read(path.join(nextDir, "server/app", file));
  const css = buildCss(html);
  html = html
    .replace(/<script\b[\s\S]*?<\/script>/g, "")
    .replace(/<link rel="(?:preload|modulepreload)"[^>]*>/g, "")
    .replace(/<link rel="stylesheet"[^>]*>/g, "")
    .replace(/<link rel="icon"[^>]*>/g, `<link rel="icon" href="${iconHref}" type="image/svg+xml"/>`)
    .replace(/<link rel="canonical"[^>]*>/g, "")
    .replace(/href="\/#/g, isHome ? 'href="#' : 'href="index.html#')
    .replace(/href="\/menu"/g, 'href="menu.html"')
    .replace(/href="\/"/g, 'href="index.html"')
    .replace("</head>", () => `<style>${css}${previewCss}</style></head>`)
    .replace("</body>", () => `<script>${previewScript(menu, isHome)}</script></body>`);
  fs.writeFileSync(path.join(outDir, outName), html);
  console.log(`preview/${outName}  ${(html.length / 1024).toFixed(0)} KB`);
}

const menu = parseMenu(read(path.join(nextDir, "server/app/menu.html")));
if (menu.length < 6 || menu.some((c) => c.items.length === 0)) throw new Error("Could not parse menu data");
buildPage("index.html", "index.html", true, menu);
buildPage("menu.html", "menu.html", false, menu);
