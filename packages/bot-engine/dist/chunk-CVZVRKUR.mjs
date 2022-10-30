var g=t=>new Promise(a=>{let n=document.getElementById("gtag");if(!n){let e=document.createElement("script");e.src=`https://www.googletagmanager.com/gtag/js?id=${t}`,e.id="gtag";let o=document.createElement("script");o.innerHTML=`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', '${t}');
      `,document.body.appendChild(e),document.body.appendChild(o),e.onload=()=>{a()}}n&&a()}),c=t=>{!t||gtag("event",t.action,{event_category:t.category,event_label:t.label,value:t.value})},i=g;export{c as a,i as b};
//# sourceMappingURL=chunk-CVZVRKUR.mjs.map