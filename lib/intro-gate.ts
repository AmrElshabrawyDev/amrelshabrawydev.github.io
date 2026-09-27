/**
 * Runs before first paint (inlined in <head>): plays the gate once per browser
 * session. Without JS, on repeat views or with reduced motion it never shows.
 * Any click or key press skips it — handled here, so it works before hydration.
 * Preview: add ?gate to any URL to force it to play (even with reduced motion).
 */
export const introGateScript = `try{var d=document.documentElement,f=/[?&]gate(=|&|$)/.test(location.search);if(f)d.dataset.gateForce="";if(!f&&(sessionStorage.getItem("gate")||matchMedia("(prefers-reduced-motion: reduce)").matches)){d.dataset.gate="seen"}else{sessionStorage.setItem("gate","1");d.dataset.gate="play";var s=function(){if(d.dataset.gate==="play")d.dataset.gate="skip"};addEventListener("pointerdown",s,{once:true});addEventListener("keydown",s,{once:true})}}catch(e){}`;
