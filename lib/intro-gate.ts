/**
 * Runs before first paint (inlined in <head>): plays the intro on every full
 * page load ("play"), or nothing with reduced motion ("seen").
 * It measures where the header logo is — when the page is parsed, loaded,
 * resized, and again just before the flight (when layout is surely final,
 * e.g. in dev where CSS arrives late) — so the intro logo lands exactly on it
 * (--fly-x/y/s, used by app/globals.css).
 * Any click or key press skips it — handled here, so it works before hydration.
 * Preview: add ?gate to any URL to force it to play (even with reduced motion).
 */
export const introGateScript = `try{var d=document.documentElement,f=/[?&]gate(=|&|$)/.test(location.search);if(f)d.dataset.gateForce="";if(!f&&matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.gate="seen"}else{d.dataset.gate="play";var s=function(){if(d.dataset.gate==="play")d.dataset.gate="skip"};addEventListener("pointerdown",s,{once:true});addEventListener("keydown",s,{once:true});var m=function(){var t=document.querySelector("[data-intro-target]"),k=document.querySelector(".intro-gate-mark");if(!t||!k)return;var r=t.getBoundingClientRect(),w=k.offsetWidth;if(!w||!r.width)return;d.style.setProperty("--fly-x",(r.left+r.width/2-d.clientWidth/2)+"px");d.style.setProperty("--fly-y",(r.top+r.height/2-d.clientHeight/2)+"px");d.style.setProperty("--fly-s",String(r.width/w))};document.addEventListener("DOMContentLoaded",m,{once:true});addEventListener("load",m,{once:true});addEventListener("resize",m);document.addEventListener("animationstart",function(e){if(e.animationName==="gate-push"||e.animationName==="gate-fly-x")m()})}}catch(e){}`;
