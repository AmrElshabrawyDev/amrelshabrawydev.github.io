/**
 * Runs before first paint (inlined in <head>): plays the intro gate on every
 * full page load ("play"), or nothing with reduced motion ("seen").
 * data-film-ok marks browsers that can play the logo film shown after the gate.
 * Any click or key press skips everything — handled here, before hydration.
 * Preview: add ?gate to any URL to force it to play (even with reduced motion).
 */
export const introGateScript = `try{var d=document.documentElement,f=/[?&]gate(=|&|$)/.test(location.search);if(f)d.dataset.gateForce="";if(!f&&matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.gate="seen"}else{d.dataset.gate="play";var v=document.createElement("video"),c=navigator.connection;if(!(c&&c.saveData)&&(v.canPlayType('video/webm; codecs="vp9"')||v.canPlayType('video/mp4; codecs="avc1.640020"')))d.dataset.filmOk="";var s=function(){if(d.dataset.gate==="play")d.dataset.gate="skip";if(d.dataset.film&&d.dataset.film!=="done"){delete d.dataset.film;var m=document.getElementById("intro-film");if(m)m.pause()}};addEventListener("pointerdown",s,{once:true});addEventListener("keydown",s,{once:true})}}catch(e){}`;

/** Where the logo sits inside the video frame (from scripts/logo-intro/render.mjs) */
const FILM_LOGO_WIDTH = 0.661;
/** The hexagon's width inside the 572-unit logo viewBox (incl. stroke) */
const ICON_LOGO_WIDTH = 530 / 572;

/**
 * Runs right after the film slot in the page. Creates the <video> itself (so
 * React never hydrates it), buffers it once the page's main content has
 * painted, starts it the moment the gate's doors begin to open, and when it
 * ends flies the logo into the header logo. If the film isn't buffered by
 * then, the gate simply finishes on its own.
 *
 * data-film: "on" (playing) → "fly" (logo flying to the header) → "done"
 */
export const introFilmScript = `(function(){var d=document.documentElement;if(d.dataset.gate!=="play"||!("filmOk" in d.dataset))return;
var slot=document.getElementById("intro-film-slot"),door=document.querySelector(".intro-gate-door-left");if(!slot||!door)return;
var v=document.createElement("video");v.id="intro-film";v.className="intro-film";v.muted=true;v.playsInline=true;v.setAttribute("playsinline","");v.setAttribute("aria-hidden","true");v.preload="none";
[["webm",'video/webm; codecs="vp9"'],["mp4","video/mp4"]].forEach(function(x){var s=document.createElement("source");s.src="/intro/logo-intro."+x[0];s.type=x[1];v.appendChild(s)});
slot.appendChild(v);
var loaded=false,load=function(){if(loaded)return;loaded=true;v.preload="auto";v.load()};
var T=window.PerformanceObserver&&PerformanceObserver.supportedEntryTypes;
if(T&&T.indexOf("largest-contentful-paint")>-1){new PerformanceObserver(function(l,o){o.disconnect();setTimeout(load,50)}).observe({type:"largest-contentful-paint",buffered:true});setTimeout(load,1200)}
else requestAnimationFrame(function(){requestAnimationFrame(load)});
door.addEventListener("animationstart",function(e){if(e.animationName!=="gate-open-left"||d.dataset.gate!=="play"||v.readyState<3)return;
d.dataset.film="on";var p=v.play();if(p&&p.catch)p.catch(function(){delete d.dataset.film})});
var done=function(){if(d.dataset.film==="fly")d.dataset.film="done"};
v.addEventListener("ended",function(){if(d.dataset.film!=="on")return;d.dataset.film="fly";
var t=document.querySelector("[data-intro-target]"),r=v.getBoundingClientRect();
if(!t||!v.animate){setTimeout(done,900);return}
var tr=t.getBoundingClientRect(),s=(tr.width*${ICON_LOGO_WIDTH.toFixed(4)})/(r.width*${FILM_LOGO_WIDTH}),
dx=tr.left+tr.width/2-(r.left+r.width/2),dy=tr.top+tr.height/2-(r.top+r.height/2);
v.animate([{transform:"none"},{transform:"translate("+dx+"px,"+dy+"px) scale("+s+")"}],{duration:900,easing:"cubic-bezier(0.65,0,0.35,1)",fill:"forwards"}).onfinish=done});
})()`;
