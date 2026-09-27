/**
 * Runs before first paint (inlined in <head>): plays the intro on every full
 * page load ("play"), or nothing with reduced motion ("seen").
 * Any click or key press skips it — handled here, so it works before hydration.
 * Preview: add ?gate to any URL to force it to play (even with reduced motion);
 * ?gate=debug also logs the landing measurements to the console.
 */
export const introGateScript = `try{var d=document.documentElement,f=/[?&]gate(=|&|$)/.test(location.search);if(f)d.dataset.gateForce="";if(!f&&matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.gate="seen"}else{d.dataset.gate="play";var s=function(){if(d.dataset.gate==="play")d.dataset.gate="skip"};addEventListener("pointerdown",s,{once:true});addEventListener("keydown",s,{once:true})}}catch(e){}`;

/**
 * Runs right after the intro markup. Measures where the header logo is and
 * writes the flight onto the intro element itself (--fly-x/y/s +
 * data-measured, used by app/globals.css) — on parse, load, resize and again
 * just before the flight, when layout is surely final (e.g. CSS arriving late
 * in dev). Without a measurement the logo shrinks away in place instead of
 * flying anywhere.
 */
export const introMeasureScript = `(function(){var d=document.documentElement;if(d.dataset.gate!=="play")return;var g=document.querySelector(".intro-gate"),k=document.querySelector(".intro-gate-mark");if(!g||!k)return;var dbg=/[?&]gate=debug/.test(location.search);
var m=function(why){var t=document.querySelector("[data-intro-target]");if(!t)return;var r=t.getBoundingClientRect(),w=k.offsetWidth,vw=g.clientWidth,vh=g.clientHeight;if(!w||!r.width||!vw)return;
var x=r.left+r.width/2-vw/2,y=r.top+r.height/2-vh/2,sc=r.width/w;g.style.setProperty("--fly-x",x+"px");g.style.setProperty("--fly-y",y+"px");g.style.setProperty("--fly-s",String(sc));g.dataset.measured="";
if(dbg)console.log("[intro] "+why+" "+JSON.stringify({target:[Math.round(r.left),Math.round(r.top),Math.round(r.width)],viewport:[vw,vh,innerWidth,innerHeight,devicePixelRatio],mark:w,fly:[Math.round(x),Math.round(y),+sc.toFixed(3)],ua:navigator.userAgent.slice(-40)}))};
document.addEventListener("DOMContentLoaded",function(){m("DOMContentLoaded")},{once:true});addEventListener("load",function(){m("load")},{once:true});addEventListener("resize",function(){m("resize")});
g.addEventListener("animationstart",function(e){if(e.animationName==="gate-push"||e.animationName==="gate-fly-x")m(e.animationName)});
})()`;
