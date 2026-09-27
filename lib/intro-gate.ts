/**
 * Runs before first paint (inlined in <head>) and picks the intro mode:
 *  - "film": the cinematic logo video (public/intro), if the browser can play it
 *  - "play": the CSS-only gate (logo splits with the doors) as a fallback
 *  - "seen": nothing (reduced motion)
 * Any click or key press skips it — handled here, so it works before hydration.
 * Preview: add ?gate to any URL to force it to play (even with reduced motion).
 */
export const introGateScript = `try{var d=document.documentElement,f=/[?&]gate(=|&|$)/.test(location.search);if(f)d.dataset.gateForce="";if(!f&&matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.gate="seen"}else{var v=document.createElement("video"),c=navigator.connection;d.dataset.gate=!(c&&c.saveData)&&(v.canPlayType('video/webm; codecs="vp9"')||v.canPlayType('video/mp4; codecs="avc1.640020"'))?"film":"play";var s=function(){var g=d.dataset.gate;if(g==="play"||g==="film"||g==="open")d.dataset.gate="skip"};addEventListener("pointerdown",s,{once:true});addEventListener("keydown",s,{once:true})}}catch(e){}`;

/** Where the logo sits inside the video frame (from scripts/logo-intro/render.mjs) */
const FILM_LOGO_WIDTH = 0.661;
/** The hexagon's width inside the 572-unit logo viewBox (incl. stroke) */
const ICON_LOGO_WIDTH = 530 / 572;

/**
 * Runs right after the <video> in the page: starts the film once the page's
 * main content has painted, falls back to the
 * CSS gate if it doesn't play quickly, and when it ends opens the doors while
 * the logo flies into the header logo.
 */
export const introFilmScript = `(function(){var d=document.documentElement;if(d.dataset.gate!=="film")return;var v=document.getElementById("intro-film");if(!v)return;
var fallback=function(){if(d.dataset.gate==="film")d.dataset.gate="play"};
var timer;v.addEventListener("playing",function(){clearTimeout(timer)},{once:true});
var started=false,start=function(){if(started||d.dataset.gate!=="film")return;started=true;timer=setTimeout(fallback,900);
v.muted=true;var p=v.play();if(p&&p.catch)p.catch(fallback)};
// Start once the page's main content has painted (LCP), so the video never
// competes with it; ~0.2s in practice. Browsers without the LCP API: next frames.
var T=window.PerformanceObserver&&PerformanceObserver.supportedEntryTypes;
if(T&&T.indexOf("largest-contentful-paint")>-1){new PerformanceObserver(function(l,o){o.disconnect();setTimeout(start,50)}).observe({type:"largest-contentful-paint",buffered:true});setTimeout(start,1500)}
else requestAnimationFrame(function(){requestAnimationFrame(start)});
var done=function(){if(d.dataset.gate==="open")d.dataset.gate="done"};
v.addEventListener("ended",function(){if(d.dataset.gate!=="film")return;d.dataset.gate="open";
var t=document.querySelector("[data-intro-target]"),r=v.getBoundingClientRect();
if(!t||!v.animate){setTimeout(done,900);return}
var tr=t.getBoundingClientRect(),s=(tr.width*${ICON_LOGO_WIDTH.toFixed(4)})/(r.width*${FILM_LOGO_WIDTH}),
dx=tr.left+tr.width/2-(r.left+r.width/2),dy=tr.top+tr.height/2-(r.top+r.height/2);
v.animate([{transform:"none"},{transform:"translate("+dx+"px,"+dy+"px) scale("+s+")"}],{duration:900,easing:"cubic-bezier(0.65,0,0.35,1)",fill:"forwards"}).onfinish=done},{once:true});
})()`;
