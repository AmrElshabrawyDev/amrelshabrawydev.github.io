/**
 * Runs before first paint (inlined in <head>): plays the intro on every full
 * page load ("play"), or nothing with reduced motion ("seen").
 * Once the page is parsed it measures where the header logo is, so the intro
 * logo flies exactly onto it (--fly-x/y/s, used by app/globals.css).
 * Any click or key press skips it — handled here, so it works before hydration.
 * Preview: add ?gate to any URL to force it to play (even with reduced motion).
 */
export const introGateScript = `try{var d=document.documentElement,f=/[?&]gate(=|&|$)/.test(location.search);if(f)d.dataset.gateForce="";if(!f&&matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.gate="seen"}else{d.dataset.gate="play";var s=function(){if(d.dataset.gate==="play")d.dataset.gate="skip"};addEventListener("pointerdown",s,{once:true});addEventListener("keydown",s,{once:true});document.addEventListener("DOMContentLoaded",function(){var t=document.querySelector("[data-intro-target]"),m=document.querySelector(".intro-gate-mark");if(!t||!m)return;var r=t.getBoundingClientRect(),w=m.offsetWidth;if(!w)return;d.style.setProperty("--fly-x",(r.left+r.width/2-d.clientWidth/2)+"px");d.style.setProperty("--fly-y",(r.top+r.height/2-innerHeight/2)+"px");d.style.setProperty("--fly-s",String(r.width/w))},{once:true})}}catch(e){}`;
