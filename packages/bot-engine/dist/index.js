"use strict";var co=Object.create;var Ve=Object.defineProperty;var mo=Object.getOwnPropertyDescriptor;var bo=Object.getOwnPropertyNames;var go=Object.getPrototypeOf,fo=Object.prototype.hasOwnProperty;var ho=(e,t)=>()=>(e&&(t=e(e=0)),t);var et=(e,t)=>{for(var o in t)Ve(e,o,{get:t[o],enumerable:!0})},Le=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of bo(t))!fo.call(e,n)&&n!==o&&Ve(e,n,{get:()=>t[n],enumerable:!(r=mo(t,n))||r.enumerable});return e},xe=(e,t,o)=>(Le(e,t,"default"),o&&Le(o,t,"default")),C=(e,t,o)=>(o=e!=null?co(go(e)):{},Le(t||!e||!e.__esModule?Ve(o,"default",{value:e,enumerable:!0}):o,e)),yo=e=>Le(Ve({},"__esModule",{value:!0}),e);var ft={};et(ft,{default:()=>Lo,sendGaEvent:()=>je});var No,je,Lo,We=ho(()=>{"use strict";No=e=>new Promise(t=>{let o=document.getElementById("gtag");if(!o){let r=document.createElement("script");r.src=`https://www.googletagmanager.com/gtag/js?id=${e}`,r.id="gtag";let n=document.createElement("script");n.innerHTML=`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', '${e}');
      `,document.body.appendChild(r),document.body.appendChild(n),r.onload=()=>{t()}}o&&t()}),je=e=>{!e||gtag("event",e.action,{event_category:e.category,event_label:e.label,value:e.value})},Lo=No});var ve={};et(ve,{TypebotViewer:()=>dr,parseVariables:()=>h});module.exports=yo(ve);var Q=C(require("react"));var _=C(require("react"));var Ae=require("utils");var h=(e,t={fieldToParse:"value",escapeForJson:!1})=>o=>!o||o===""?"":o.replace(/\{\{(.*?)\}\}/g,(r,n)=>{let i=n.replace(/{{|}}/g,""),s=e.find(p=>i===p.name&&(0,Ae.isDefined)(p.value));if(!s)return"";if(t.fieldToParse==="id")return s.id;let{value:d}=s;if(t.escapeForJson)return wo(d);let u=Ie(d);return u||""}),Ie=e=>{if((0,Ae.isNotDefined)(e))return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return console.warn("Failed to safely stringify variable value",e),null}},$e=e=>{if(e===null)return null;if(e===void 0)return;let t=e.startsWith("0")&&!e.startsWith("0.")&&e.length>1;if(typeof e=="string"&&t||typeof e=="number")return e;if(e==="true")return!0;if(e==="false")return!1;if(e==="null")return null;if(e!=="undefined")return isNaN(e)?e:Number(e)},wo=e=>e.replace(/\n/g,"\\n").replace(/"/g,'\\"').replace(/\\[^n"]/g,"\\\\ "),tt=(e,t)=>Object.keys(e).reduce((o,r)=>{let n=e[r];return{...o,[r]:typeof n=="string"?h(t)(n):n}},{});var ot=(0,_.createContext)({}),rt=({children:e,typebot:t,apiHost:o,isPreview:r,isLoading:n,onNewLog:i})=>{let[s,d]=(0,_.useState)(t),[u,p]=(0,_.useState)([]),[a,l]=(0,_.useState)(t.typebotId),[m,g]=(0,_.useState)([]);(0,_.useEffect)(()=>{d(f=>({...f,theme:t.theme,settings:t.settings}))},[t.theme,t.settings]);let y=(f,c)=>{let E=Ie(c);d(x=>({...x,variables:x.variables.map(I=>I.id===f?{...I,value:E}:I)}))},v=f=>{d(c=>({...c,edges:[...c.edges,f]}))},N=f=>{let c={id:"typebotId"in f?f.typebotId:f.id,groups:f.groups,edges:f.edges,variables:f.variables};p(x=>[...x,c]);let E={...s,groups:[...s.groups,...c.groups],variables:[...s.variables,...c.variables],edges:[...s.edges,...c.edges]};return d(E),c},k=f=>g(c=>[...c,f]),S=()=>{g(f=>f.slice(1)),l(m[0].typebotId)};return _.default.createElement(ot.Provider,{value:{typebot:s,linkedTypebots:u,apiHost:o,isPreview:r,updateVariableValue:y,createEdge:v,injectLinkedTypebot:N,onNewLog:i,linkedBotQueue:m,isLoading:n,pushEdgeIdInLinkedTypebotQueue:k,popEdgeIdFromLinkedTypebotQueue:S,currentTypebotId:a,setCurrentTypebotId:l}},e)},A=()=>(0,_.useContext)(ot);var uo=C(require("react-frame-component"));var nt=`/*
! tailwindcss v3.1.8 | MIT License | https://tailwindcss.com
*//*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
*/

html {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font family by default.
2. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}\r
.container {
  width: 100%;
}\r
@media (min-width: 400px) {

  .container {
    max-width: 400px;
  }
}\r
@media (min-width: 640px) {

  .container {
    max-width: 640px;
  }
}\r
@media (min-width: 768px) {

  .container {
    max-width: 768px;
  }
}\r
@media (min-width: 1024px) {

  .container {
    max-width: 1024px;
  }
}\r
@media (min-width: 1280px) {

  .container {
    max-width: 1280px;
  }
}\r
@media (min-width: 1536px) {

  .container {
    max-width: 1536px;
  }
}\r
.fixed {
  position: fixed;
}\r
.absolute {
  position: absolute;
}\r
.relative {
  position: relative;
}\r
.top-0 {
  top: 0px;
}\r
.left-0 {
  left: 0px;
}\r
.right-0 {
  right: 0px;
}\r
.-right-1 {
  right: -0.25rem;
}\r
.z-50 {
  z-index: 50;
}\r
.z-10 {
  z-index: 10;
}\r
.z-20 {
  z-index: 20;
}\r
.mx-4 {
  margin-left: 1rem;
  margin-right: 1rem;
}\r
.my-2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}\r
.mr-2 {
  margin-right: 0.5rem;
}\r
.mb-2 {
  margin-bottom: 0.5rem;
}\r
.mb-4 {
  margin-bottom: 1rem;
}\r
.mt-1 {
  margin-top: 0.25rem;
}\r
.mr-1 {
  margin-right: 0.25rem;
}\r
.ml-2 {
  margin-left: 0.5rem;
}\r
.-mt-1 {
  margin-top: -0.25rem;
}\r
.-mr-1 {
  margin-right: -0.25rem;
}\r
.mb-3 {
  margin-bottom: 0.75rem;
}\r
.-ml-1 {
  margin-left: -0.25rem;
}\r
.mr-3 {
  margin-right: 0.75rem;
}\r
.mt-4 {
  margin-top: 1rem;
}\r
.block {
  display: block;
}\r
.\\!block {
  display: block !important;
}\r
.inline {
  display: inline;
}\r
.flex {
  display: flex;
}\r
.inline-flex {
  display: inline-flex;
}\r
.hidden {
  display: none;
}\r
.h-32 {
  height: 8rem;
}\r
.h-screen {
  height: 100vh;
}\r
.h-full {
  height: 100%;
}\r
.h-6 {
  height: 1.5rem;
}\r
.h-2 {
  height: 0.5rem;
}\r
.h-3 {
  height: 0.75rem;
}\r
.h-2\\.5 {
  height: 0.625rem;
}\r
.h-4 {
  height: 1rem;
}\r
.h-5 {
  height: 1.25rem;
}\r
.min-h-full {
  min-height: 100%;
}\r
.w-full {
  width: 100%;
}\r
.w-screen {
  width: 100vw;
}\r
.w-6 {
  width: 1.5rem;
}\r
.w-auto {
  width: auto;
}\r
.w-2 {
  width: 0.5rem;
}\r
.w-3 {
  width: 0.75rem;
}\r
.w-5 {
  width: 1.25rem;
}\r
.min-w-0 {
  min-width: 0px;
}\r
.max-w-full {
  max-width: 100%;
}\r
.max-w-lg {
  max-width: 32rem;
}\r
.flex-1 {
  flex: 1 1 0%;
}\r
.flex-shrink-0 {
  flex-shrink: 0;
}\r
.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}\r
@keyframes ping {

  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}\r
.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}\r
@keyframes spin {

  to {
    transform: rotate(360deg);
  }
}\r
.animate-spin {
  animation: spin 1s linear infinite;
}\r
.cursor-pointer {
  cursor: pointer;
}\r
.flex-col {
  flex-direction: column;
}\r
.flex-wrap {
  flex-wrap: wrap;
}\r
.items-start {
  align-items: flex-start;
}\r
.items-end {
  align-items: flex-end;
}\r
.items-center {
  align-items: center;
}\r
.justify-end {
  justify-content: flex-end;
}\r
.justify-center {
  justify-content: center;
}\r
.justify-between {
  justify-content: space-between;
}\r
.overflow-hidden {
  overflow: hidden;
}\r
.overflow-y-scroll {
  overflow-y: scroll;
}\r
.whitespace-pre-wrap {
  white-space: pre-wrap;
}\r
.rounded {
  border-radius: 0.25rem;
}\r
.rounded-full {
  border-radius: 9999px;
}\r
.rounded-lg {
  border-radius: 0.5rem;
}\r
.rounded-md {
  border-radius: 0.375rem;
}\r
.border {
  border-width: 1px;
}\r
.border-2 {
  border-width: 2px;
}\r
.border-dashed {
  border-style: dashed;
}\r
.border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
}\r
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}\r
.bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity));
}\r
.bg-gray-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}\r
.bg-transparent {
  background-color: transparent;
}\r
.bg-cover {
  background-size: cover;
}\r
.object-cover {
  -o-object-fit: cover;
     object-fit: cover;
}\r
.p-4 {
  padding: 1rem;
}\r
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}\r
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}\r
.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}\r
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}\r
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}\r
.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}\r
.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}\r
.px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}\r
.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}\r
.pt-10 {
  padding-top: 2.5rem;
}\r
.pr-2 {
  padding-right: 0.5rem;
}\r
.pb-0 {
  padding-bottom: 0px;
}\r
.text-left {
  text-align: left;
}\r
.text-center {
  text-align: center;
}\r
.text-right {
  text-align: right;
}\r
.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}\r
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}\r
.font-semibold {
  font-weight: 600;
}\r
.text-blue-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity));
}\r
.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}\r
.text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}\r
.text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity));
}\r
.opacity-0 {
  opacity: 0;
}\r
.opacity-100 {
  opacity: 1;
}\r
.opacity-75 {
  opacity: 0.75;
}\r
.opacity-25 {
  opacity: 0.25;
}\r
.shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}\r
.brightness-225 {
  --tw-brightness: brightness(2.25);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}\r
.brightness-200 {
  --tw-brightness: brightness(2);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}\r
.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}\r
.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}\r
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}\r
.duration-100 {
  transition-duration: 100ms;
}\r
\r
:root {\r
  --typebot-container-bg-image: none;\r
  --typebot-container-bg-color: transparent;\r
  --typebot-container-font-family: 'Open Sans';\r
\r
  --typebot-button-bg-color: #0042da;\r
  --typebot-button-color: #ffffff;\r
\r
  --typebot-host-bubble-bg-color: #f7f8ff;\r
  --typebot-host-bubble-color: #303235;\r
\r
  --typebot-guest-bubble-bg-color: #ff8e21;\r
  --typebot-guest-bubble-color: #ffffff;\r
\r
  --typebot-input-bg-color: #ffffff;\r
  --typebot-input-color: #303235;\r
  --typebot-input-placeholder-color: #9095a0;\r
\r
  --typebot-header-bg-color: #ffffff;\r
  --typebot-header-color: #303235;\r
\r
  /* Phone input */\r
  --PhoneInputCountryFlag-borderColor: transparent;\r
  --PhoneInput-color--focus: transparent;\r
}\r
\r
/* Hide scrollbar for Chrome, Safari and Opera */\r
.scrollable-container::-webkit-scrollbar {\r
  display: none;\r
}\r
\r
/* Hide scrollbar for IE, Edge and Firefox */\r
.scrollable-container {\r
  -ms-overflow-style: none; /* IE and Edge */\r
  scrollbar-width: none; /* Firefox */\r
}\r
\r
/* Transitions */\r
.bubble-enter {\r
  opacity: 0;\r
}\r
.bubble-enter-active {\r
  opacity: 1;\r
  transition-property: opacity;\r
  transition-duration: 500ms;\r
  transition-timing-function: ease-out;\r
}\r
.bubble-exit {\r
  opacity: 1;\r
}\r
.bubble-exit-active {\r
  opacity: 0;\r
  transition-delay: 0ms !important;\r
  transition-property: opacity;\r
  transition-duration: 400ms;\r
  transition-timing-function: ease-out;\r
}\r
\r
.bubble-typing {\r
  transition: width 400ms ease-out, height 400ms ease-out;\r
}\r
\r
.content-opacity {\r
  transition: opacity 400ms ease-in 200ms;\r
}\r
\r
.bubble1,\r
.bubble2,\r
.bubble3 {\r
  background-color: var(--typebot-host-bubble-color);\r
  opacity: 0.5;\r
}\r
\r
.bubble1 {\r
  animation: chatBubbles 1s ease-in-out infinite;\r
}\r
\r
.bubble2 {\r
  animation: chatBubbles 1s ease-in-out infinite;\r
  animation-delay: 0.3s;\r
}\r
\r
.bubble3 {\r
  animation: chatBubbles 1s ease-in-out infinite;\r
  animation-delay: 0.5s;\r
}\r
\r
@keyframes chatBubbles {\r
  0% {\r
    transform: translateY(0);\r
  }\r
  50% {\r
    transform: translateY(-5px);\r
  }\r
  100% {\r
    transform: translateY(0);\r
  }\r
}\r
\r
button,\r
input,\r
textarea {\r
  font-weight: 300;\r
}\r
\r
.slate-a {\r
  text-decoration: underline;\r
}\r
\r
.slate-html-container > div {\r
  min-height: 24px;\r
}\r
\r
.slate-bold {\r
  font-weight: bold;\r
}\r
\r
.slate-italic {\r
  font-style: oblique;\r
}\r
\r
.slate-underline {\r
  text-decoration: underline;\r
}\r
.text-input::-moz-placeholder {\r
  color: var(--typebot-input-placeholder-color) !important;\r
  opacity: 1 !important;\r
}\r
.text-input::placeholder {\r
  color: var(--typebot-input-placeholder-color) !important;\r
  opacity: 1 !important;\r
}\r
\r
.typebot-container {\r
  background-image: var(--typebot-container-bg-image);\r
  background-color: var(--typebot-container-bg-color);\r
  font-family: var(--typebot-container-font-family);\r
}\r
\r
.custom-header {\r
  color: var(--typebot-header-color);\r
  background-color: var(--typebot-header-bg-color);\r
}\r
\r
.typebot-button {\r
  color: var(--typebot-button-color);\r
  background-color: var(--typebot-button-bg-color);\r
  border: 1px solid var(--typebot-button-bg-color);\r
}\r
\r
.typebot-button.selectable {\r
  color: var(--typebot-host-bubble-color);\r
  background-color: var(--typebot-host-bubble-bg-color);\r
  border: 1px solid var(--typebot-button-bg-color);\r
}\r
\r
.typebot-host-bubble {\r
  color: var(--typebot-host-bubble-color);\r
}\r
\r
.typebot-host-bubble > .bubble-typing {\r
  background-color: var(--typebot-host-bubble-bg-color);\r
  border: var(--typebot-host-bubble-border);\r
}\r
\r
.typebot-guest-bubble {\r
  color: var(--typebot-guest-bubble-color);\r
  background-color: var(--typebot-guest-bubble-bg-color);\r
}\r
\r
.typebot-input {\r
  color: var(--typebot-input-color);\r
  background-color: var(--typebot-input-bg-color);\r
  box-shadow: 0 2px 6px -1px rgba(0, 0, 0, 0.1);\r
}\r
\r
.typebot-input-error-message {\r
  color: var(--typebot-input-color);\r
}\r
\r
.typebot-button > .send-icon {\r
  fill: var(--typebot-button-color);\r
}\r
\r
.typebot-chat-view {\r
  max-width: 800px;\r
}\r
\r
.ping span {\r
  background-color: var(--typebot-button-bg-color);\r
}\r
\r
.rating-icon-container svg {\r
  width: 42px;\r
  height: 42px;\r
  stroke: var(--typebot-button-bg-color);\r
  fill: var(--typebot-host-bubble-bg-color);\r
  transition: fill 100ms ease-out;\r
}\r
\r
.rating-icon-container.selected svg {\r
  fill: var(--typebot-button-bg-color);\r
}\r
\r
.rating-icon-container:hover svg {\r
  filter: brightness(0.9);\r
}\r
\r
.rating-icon-container:active svg {\r
  filter: brightness(0.75);\r
}\r
\r
.upload-progress-bar {\r
  background-color: var(--typebot-button-bg-color);\r
}\r
\r
.total-files-indicator {\r
  background-color: var(--typebot-button-bg-color);\r
  color: var(--typebot-button-color);\r
  font-size: 10px;\r
}\r
\r
.typebot-upload-input {\r
  transition: border-color 100ms ease-out;\r
}\r
\r
.typebot-upload-input.dragging-over {\r
  border-color: var(--typebot-button-bg-color);\r
}\r
\r
.secondary-button {\r
  background-color: var(--typebot-host-bubble-bg-color);\r
  color: var(--typebot-host-bubble-color);\r
}\r
\r
.hover\\:bg-gray-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}\r
\r
.hover\\:brightness-90:hover {
  --tw-brightness: brightness(.9);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}\r
\r
.focus\\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}\r
\r
.active\\:brightness-75:active {
  --tw-brightness: brightness(.75);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}\r
\r
.disabled\\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}\r
\r
.disabled\\:opacity-50:disabled {
  opacity: 0.5;
}\r
\r
.disabled\\:brightness-100:disabled {
  --tw-brightness: brightness(1);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}\r
\r
@media (min-width: 1024px) {

  .lg\\:w-3\\/4 {
    width: 75%;
  }

  .lg\\:w-11\\/12 {
    width: 91.666667%;
  }

  .lg\\:w-4\\/6 {
    width: 66.666667%;
  }

  .lg\\:px-5 {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
}\r
\r
@media (min-width: 400px) {

  .xs\\:mb-2 {
    margin-bottom: 0.5rem;
  }

  .xs\\:flex {
    display: flex;
  }

  .xs\\:hidden {
    display: none;
  }

  .xs\\:h-10 {
    height: 2.5rem;
  }

  .xs\\:h-full {
    height: 100%;
  }

  .xs\\:w-10 {
    width: 2.5rem;
  }

  .xs\\:w-full {
    width: 100%;
  }

  .xs\\:text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}\r
`;var it=`.lite-badge {\r
  display: block !important;\r
}\r
`;var st=`/* CSS variables. */\r
:root {\r
  --PhoneInput-color--focus: #03b2cb;\r
  --PhoneInputInternationalIconPhone-opacity: 0.8;\r
  --PhoneInputInternationalIconGlobe-opacity: 0.65;\r
  --PhoneInputCountrySelect-marginRight: 0.35em;\r
  --PhoneInputCountrySelectArrow-width: 0.3em;\r
  --PhoneInputCountrySelectArrow-marginLeft: var(\r
    --PhoneInputCountrySelect-marginRight\r
  );\r
  --PhoneInputCountrySelectArrow-borderWidth: 1px;\r
  --PhoneInputCountrySelectArrow-opacity: 0.45;\r
  --PhoneInputCountrySelectArrow-color: currentColor;\r
  --PhoneInputCountrySelectArrow-color--focus: var(--PhoneInput-color--focus);\r
  --PhoneInputCountrySelectArrow-transform: rotate(45deg);\r
  --PhoneInputCountryFlag-aspectRatio: 1.5;\r
  --PhoneInputCountryFlag-height: 1em;\r
  --PhoneInputCountryFlag-borderWidth: 1px;\r
  --PhoneInputCountryFlag-borderColor: rgba(0, 0, 0, 0.5);\r
  --PhoneInputCountryFlag-borderColor--focus: var(--PhoneInput-color--focus);\r
  --PhoneInputCountryFlag-backgroundColor--loading: rgba(0, 0, 0, 0.1);\r
}\r
\r
.PhoneInput {\r
  /* This is done to stretch the contents of this component. */\r
  display: flex;\r
  align-items: center;\r
}\r
\r
.PhoneInputInput {\r
  /* The phone number input stretches to fill all empty space */\r
  flex: 1;\r
  /* The phone number input should shrink\r
	   to make room for the extension input */\r
  min-width: 0;\r
}\r
\r
.PhoneInputCountryIcon {\r
  width: calc(\r
    var(--PhoneInputCountryFlag-height) *\r
      var(--PhoneInputCountryFlag-aspectRatio)\r
  );\r
  height: var(--PhoneInputCountryFlag-height);\r
}\r
\r
.PhoneInputCountryIcon--square {\r
  width: var(--PhoneInputCountryFlag-height);\r
}\r
\r
.PhoneInputCountryIcon--border {\r
  /* Removed \`background-color\` because when an \`<img/>\` was still loading\r
	   it would show a dark gray rectangle. */\r
  /* For some reason the \`<img/>\` is not stretched to 100% width and height\r
	   and sometime there can be seen white pixels of the background at top and bottom. */\r
  background-color: var(--PhoneInputCountryFlag-backgroundColor--loading);\r
  /* Border is added via \`box-shadow\` because \`border\` interferes with \`width\`/\`height\`. */\r
  /* For some reason the \`<img/>\` is not stretched to 100% width and height\r
	   and sometime there can be seen white pixels of the background at top and bottom,\r
	   so an additional "inset" border is added. */\r
  box-shadow: 0 0 0 var(--PhoneInputCountryFlag-borderWidth)\r
      var(--PhoneInputCountryFlag-borderColor),\r
    inset 0 0 0 var(--PhoneInputCountryFlag-borderWidth)\r
      var(--PhoneInputCountryFlag-borderColor);\r
}\r
\r
.PhoneInputCountryIconImg {\r
  /* Fixes weird vertical space above the flag icon. */\r
  /* https://gitlab.com/catamphetamine/react-phone-number-input/-/issues/7#note_348586559 */\r
  display: block;\r
  /* 3rd party <SVG/> flag icons won't stretch if they have \`width\` and \`height\`.\r
	   Also, if an <SVG/> icon's aspect ratio was different, it wouldn't fit too. */\r
  width: 100%;\r
  height: 100%;\r
}\r
\r
.PhoneInputInternationalIconPhone {\r
  opacity: var(--PhoneInputInternationalIconPhone-opacity);\r
}\r
\r
.PhoneInputInternationalIconGlobe {\r
  opacity: var(--PhoneInputInternationalIconGlobe-opacity);\r
}\r
\r
/* Styling native country \`<select/>\`. */\r
\r
.PhoneInputCountry {\r
  position: relative;\r
  align-self: stretch;\r
  display: flex;\r
  align-items: center;\r
  margin-right: var(--PhoneInputCountrySelect-marginRight);\r
}\r
\r
.PhoneInputCountrySelect {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  height: 100%;\r
  width: 100%;\r
  z-index: 1;\r
  border: 0;\r
  opacity: 0;\r
  cursor: pointer;\r
}\r
\r
.PhoneInputCountrySelect[disabled],\r
.PhoneInputCountrySelect[readonly] {\r
  cursor: default;\r
}\r
\r
.PhoneInputCountrySelectArrow {\r
  display: block;\r
  content: '';\r
  width: var(--PhoneInputCountrySelectArrow-width);\r
  height: var(--PhoneInputCountrySelectArrow-width);\r
  margin-left: var(--PhoneInputCountrySelectArrow-marginLeft);\r
  border-style: solid;\r
  border-color: var(--PhoneInputCountrySelectArrow-color);\r
  border-top-width: 0;\r
  border-bottom-width: var(--PhoneInputCountrySelectArrow-borderWidth);\r
  border-left-width: 0;\r
  border-right-width: var(--PhoneInputCountrySelectArrow-borderWidth);\r
  transform: var(--PhoneInputCountrySelectArrow-transform);\r
  opacity: var(--PhoneInputCountrySelectArrow-opacity);\r
}\r
\r
.PhoneInputCountrySelect:focus\r
  + .PhoneInputCountryIcon\r
  + .PhoneInputCountrySelectArrow {\r
  opacity: 1;\r
  color: var(--PhoneInputCountrySelectArrow-color--focus);\r
}\r
\r
.PhoneInputCountrySelect:focus + .PhoneInputCountryIcon--border {\r
  box-shadow: 0 0 0 var(--PhoneInputCountryFlag-borderWidth)\r
      var(--PhoneInputCountryFlag-borderColor--focus),\r
    inset 0 0 0 var(--PhoneInputCountryFlag-borderWidth)\r
      var(--PhoneInputCountryFlag-borderColor--focus);\r
}\r
\r
.PhoneInputCountrySelect:focus\r
  + .PhoneInputCountryIcon\r
  .PhoneInputInternationalIconGlobe {\r
  opacity: 1;\r
  color: var(--PhoneInputCountrySelectArrow-color--focus);\r
}\r
\r
.PhoneInputInput {\r
  padding: 1rem 0.5rem;\r
  outline: none !important;\r
  background: transparent;\r
  flex: 1 1 0%;\r
  width: 100%;\r
  font-size: 16px;\r
}\r
\r
.PhoneInputCountry {\r
  padding-left: 0.5rem;\r
}\r
\r
.PhoneInputCountryIcon,\r
.PhoneInputCountryIconImg {\r
  border-radius: 3px;\r
}\r
`;var W=C(require("react"));var B=C(require("react")),Be=require("react-transition-group");var z=C(require("react"));var le=C(require("react")),lt=require("utils");var ne=C(require("react")),at=()=>ne.default.createElement("figure",{className:"flex justify-center items-center rounded-full text-white w-6 h-6 text-sm relative xs:w-10 xs:h-10 xs:text-xl","data-testid":"default-avatar"},ne.default.createElement("svg",{width:"75",height:"75",viewBox:"0 0 75 75",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"absolute top-0 left-0 w-6 h-6 xs:w-full xs:h-full xs:text-xl"},ne.default.createElement("mask",{id:"mask0",x:"0",y:"0","mask-type":"alpha"},ne.default.createElement("circle",{cx:"37.5",cy:"37.5",r:"37.5",fill:"#0042DA"})),ne.default.createElement("g",{mask:"url(#mask0)"},ne.default.createElement("rect",{x:"-30",y:"-43",width:"131",height:"154",fill:"#0042DA"}),ne.default.createElement("rect",{x:"2.50413",y:"120.333",width:"81.5597",height:"86.4577",rx:"2.5",transform:"rotate(-52.6423 2.50413 120.333)",stroke:"#FED23D",strokeWidth:"5"}),ne.default.createElement("circle",{cx:"76.5",cy:"-1.5",r:"29",stroke:"#FF8E20",strokeWidth:"5"}),ne.default.createElement("path",{d:"M-49.8224 22L-15.5 -40.7879L18.8224 22H-49.8224Z",stroke:"#F7F8FF",strokeWidth:"5"}))));var Fe=({avatarSrc:e})=>{let[t]=(0,le.useState)(e);return t===""?le.default.createElement(le.default.Fragment,null):(0,lt.isDefined)(t)?le.default.createElement("figure",{className:"flex justify-center items-center rounded-full text-white w-6 h-6 text-sm relative xs:w-10 xs:h-10 xs:text-xl"},le.default.createElement("img",{src:t,alt:"Bot avatar",className:"rounded-full object-cover w-full h-full"})):le.default.createElement(at,null)};var dt=require("react-frame-component"),ut=require("react-transition-group"),pt=require("resize-observer"),ct=(0,z.forwardRef)(({hostAvatarSrc:e,keepShowing:t},o)=>{let{document:r}=(0,dt.useFrame)(),[n,i]=(0,z.useState)(!1),[s,d]=(0,z.useState)(0),u=()=>{if(!p.current||!a.current)return;let{height:l}=p.current.getBoundingClientRect(),{height:m}=a.current.getBoundingClientRect();d(l-m)},p=(0,z.useRef)(null),a=(0,z.useRef)(null);return(0,z.useImperativeHandle)(o,()=>({refreshTopOffset:u})),(0,z.useEffect)(()=>{if(!r)return;i(!0);let l=new pt.ResizeObserver(u);return l.observe(r.body),()=>{l.disconnect()}},[]),z.default.createElement("div",{className:"flex w-6 xs:w-10 mr-2 mb-2 flex-shrink-0 items-center relative typebot-avatar-container ",ref:p},z.default.createElement(ut.CSSTransition,{classNames:"bubble",timeout:500,in:n&&t,unmountOnExit:!0},z.default.createElement("div",{className:"absolute w-6 xs:w-10 h-6 xs:h-10 mb-4 xs:mb-2 flex items-center top-0",ref:a,style:{top:`${s}px`,transition:"top 350ms ease-out, opacity 500ms"}},z.default.createElement(Fe,{avatarSrc:e}))))});var D=require("utils");var U=require("models"),ie=require("utils");var mt=e=>e.startsWith("http")||e.startsWith("mailto:")||e.startsWith("tel:")||e.startsWith("sms:")?e:`https://${e}`,De=typeof window<"u"&&window.matchMedia("only screen and (max-width: 760px)").matches;var gt=async(e,t)=>{switch(e.type){case U.LogicBlockType.SET_VARIABLE:return{nextEdgeId:Co(e,t)};case U.LogicBlockType.CONDITION:return{nextEdgeId:To(e,t)};case U.LogicBlockType.REDIRECT:return{nextEdgeId:So(e,t)};case U.LogicBlockType.CODE:return{nextEdgeId:await Eo(e,t)};case U.LogicBlockType.TYPEBOT_LINK:return await Po(e,t)}},Co=(e,{typebot:{variables:t},updateVariableValue:o,updateVariables:r})=>{var s;if(!((s=e.options)!=null&&s.variableId))return e.outgoingEdgeId;let n=e.options.expressionToEvaluate?ko(t)(e.options.expressionToEvaluate):void 0,i=t.find((0,ie.byId)(e.options.variableId));return i&&(o(i.id,n),r([{...i,value:n}])),e.outgoingEdgeId},ko=e=>t=>{let o=h(e,{fieldToParse:"id"})(t.includes("return ")?t:`return ${t}`);try{return Function(...e.map(n=>n.id),o)(...e.map(n=>$e(n.value)))}catch(r){return console.log(`Evaluating: ${o}`,r),t}},To=(e,{typebot:{variables:t}})=>{let{content:o}=e.items[0];return(o.logicalOperator===U.LogicalOperator.AND?o.comparisons.every(bt(t)):o.comparisons.some(bt(t)))?e.items[0].outgoingEdgeId:e.outgoingEdgeId},bt=e=>t=>{var n;if(!(t!=null&&t.variableId))return!1;let o=(((n=e.find(i=>i.id===t.variableId))==null?void 0:n.value)??"").trim(),r=h(e)(t.value).trim();if((0,ie.isNotDefined)(r))return!1;switch(t.comparisonOperator){case U.ComparisonOperators.CONTAINS:return o.toLowerCase().includes(r.toLowerCase());case U.ComparisonOperators.EQUAL:return o===r;case U.ComparisonOperators.NOT_EQUAL:return o!==r;case U.ComparisonOperators.GREATER:return parseFloat(o)>parseFloat(r);case U.ComparisonOperators.LESS:return parseFloat(o)<parseFloat(r);case U.ComparisonOperators.IS_SET:return(0,ie.isDefined)(o)&&o.length>0}},So=(e,{typebot:{variables:t}})=>{var n,i,s;if(!((n=e.options)!=null&&n.url))return e.outgoingEdgeId;let o=mt(h(t)(e.options.url));if(window.parent&&window.location!==((i=window.top)==null?void 0:i.location)){if(!e.options.isNewTab)return window.top.location.href=o;try{window.open(o)}catch{(s=window.top)==null||s.postMessage({from:"typebot",redirectUrl:o},"*")}}else window.open(o,e.options.isNewTab?"_blank":"_self");return e.outgoingEdgeId},Eo=async(e,{typebot:{variables:t}})=>{if(!e.options.content)return;let o=Function(...t.map(r=>r.id),h(t,{fieldToParse:"id"})(e.options.content));try{await o(...t.map(r=>$e(r.value)))}catch(r){console.error(r)}return e.outgoingEdgeId},Po=async(e,t)=>{var m;let{typebot:o,linkedTypebots:r,onNewLog:n,createEdge:i,setCurrentTypebotId:s,pushEdgeIdInLinkedTypebotQueue:d,currentTypebotId:u}=t,p=e.options.typebotId==="current"?o:[o,...r].find((0,ie.byId)(e.options.typebotId))??await Bo(e,t);if(!p)return n({status:"error",description:"Failed to link typebot",details:""}),{nextEdgeId:e.outgoingEdgeId};e.outgoingEdgeId&&d({edgeId:e.outgoingEdgeId,typebotId:u}),s("typebotId"in p?p.typebotId:p.id);let a=e.options.groupId??((m=p.groups.find(g=>g.blocks.some(y=>y.type==="start")))==null?void 0:m.id);if(!a)return{nextEdgeId:e.outgoingEdgeId};let l={id:(Math.random()*1e3).toString(),from:{blockId:"",groupId:""},to:{groupId:a}};return i(l),{nextEdgeId:l.id,linkedTypebot:{...p,edges:[...p.edges,l]}}},Bo=async(e,{apiHost:t,injectLinkedTypebot:o,isPreview:r})=>{let{data:n,error:i}=r?await(0,ie.sendRequest)(`/api/typebots/${e.options.typebotId}`):await(0,ie.sendRequest)(`${t}/api/publicTypebots/${e.options.typebotId}`);if(!(!n||i))return o(n.typebot)};var Z=require("models"),Ce=require("qs"),se=require("utils");We();var ht=({block:e,context:t})=>{switch(e.type){case Z.IntegrationBlockType.GOOGLE_SHEETS:return Ao(e,t);case Z.IntegrationBlockType.GOOGLE_ANALYTICS:return Vo(e,t);case Z.IntegrationBlockType.ZAPIER:case Z.IntegrationBlockType.MAKE_COM:case Z.IntegrationBlockType.PABBLY_CONNECT:case Z.IntegrationBlockType.WEBHOOK:return zo(e,t);case Z.IntegrationBlockType.EMAIL:return Mo(e,t)}},Vo=async(e,{variables:t})=>{var r;if(!((r=e.options)!=null&&r.trackingId))return e.outgoingEdgeId;let{default:o}=await Promise.resolve().then(()=>(We(),ft));return await o(e.options.trackingId),je(tt(e.options,t)),e.outgoingEdgeId},Ao=async(e,t)=>{if(!("action"in e.options))return e.outgoingEdgeId;switch(e.options.action){case Z.GoogleSheetsAction.INSERT_ROW:await Fo(e.options,t);break;case Z.GoogleSheetsAction.UPDATE_ROW:await Do(e.options,t);break;case Z.GoogleSheetsAction.GET:await Oo(e.options,t);break}return e.outgoingEdgeId},Fo=async(e,{variables:t,apiHost:o,onNewLog:r,resultId:n})=>{if(!e.cellsToInsert){r({status:"warning",description:"Cells to insert are undefined",details:null});return}let i=(0,Ce.stringify)({resultId:n}),{error:s}=await(0,se.sendRequest)({url:`${o}/api/integrations/google-sheets/spreadsheets/${e.spreadsheetId}/sheets/${e.sheetId}?${i}`,method:"POST",body:{credentialsId:e.credentialsId,values:yt(e.cellsToInsert,t)}});r(Oe(s,"Succesfully inserted a row in the sheet","Failed to insert a row in the sheet"))},Do=async(e,{variables:t,apiHost:o,onNewLog:r,resultId:n})=>{if(!e.cellsToUpsert||!e.referenceCell)return;let i=(0,Ce.stringify)({resultId:n}),{error:s}=await(0,se.sendRequest)({url:`${o}/api/integrations/google-sheets/spreadsheets/${e.spreadsheetId}/sheets/${e.sheetId}?${i}`,method:"PATCH",body:{credentialsId:e.credentialsId,values:yt(e.cellsToUpsert,t),referenceCell:{column:e.referenceCell.column,value:h(t)(e.referenceCell.value??"")}}});r(Oe(s,"Succesfully updated a row in the sheet","Failed to update a row in the sheet"))},Oo=async(e,{variables:t,updateVariableValue:o,updateVariables:r,apiHost:n,onNewLog:i,resultId:s})=>{if(!e.referenceCell||!e.cellsToExtract)return;let d=(0,Ce.stringify)({credentialsId:e.credentialsId,referenceCell:{column:e.referenceCell.column,value:h(t)(e.referenceCell.value??"")},columns:e.cellsToExtract.map(l=>l.column),resultId:s},{indices:!1}),{data:u,error:p}=await(0,se.sendRequest)({url:`${n}/api/integrations/google-sheets/spreadsheets/${e.spreadsheetId}/sheets/${e.sheetId}?${d}`,method:"GET"});if(i(Oe(p,"Succesfully fetched data from sheet","Failed to fetch data from sheet")),!u)return;let a=e.cellsToExtract.reduce((l,m)=>{let g=t.find((0,se.byId)(m.variableId)),y=u[m.column??""];return!g||!y?l:(o(g.id,y),[...l,{...g,value:y}])},[]);r(a)},yt=(e,t)=>e.reduce((o,r)=>!r.column||!r.value?o:{...o,[r.column]:h(t)(r.value)},{}),zo=async(e,{blockId:t,variables:o,updateVariableValue:r,updateVariables:n,typebotId:i,apiHost:s,resultValues:d,onNewLog:u,resultId:p})=>{let a=(0,Ce.stringify)({resultId:p}),{data:l,error:m}=await(0,se.sendRequest)({url:`${s}/api/typebots/${i}/blocks/${t}/executeWebhook?${a}`,method:"POST",body:{variables:o,resultValues:d}}),g=l==null?void 0:l.statusCode.toString(),y=g?(g==null?void 0:g.startsWith("4"))||(g==null?void 0:g.startsWith("5")):!0;u({status:m?"error":y?"warning":"success",description:y?"Webhook returned an error":"Webhook successfuly executed",details:JSON.stringify(m??l,null,2).substring(0,1e3)});let v=e.options.responseVariableMapping.reduce((N,k)=>{if(!(k!=null&&k.bodyPath)||!k.variableId)return N;let S=o.find((0,se.byId)(k.variableId));if(!S)return N;let f=Function("data",`return data.${h(o)(k==null?void 0:k.bodyPath)}`);try{let c=f(l);return r(S==null?void 0:S.id,c),[...N,{...S,value:c}]}catch{return N}},[]);return n(v),e.outgoingEdgeId},Mo=async(e,{variables:t,apiHost:o,isPreview:r,onNewLog:n,resultId:i,typebotId:s,resultValues:d})=>{var a;if(r)return n({status:"info",description:"Emails are not sent in preview mode",details:null}),e.outgoingEdgeId;let{options:u}=e,{error:p}=await(0,se.sendRequest)({url:`${o}/api/typebots/${s}/integrations/email?resultId=${i}`,method:"POST",body:{credentialsId:u.credentialsId,recipients:u.recipients.map(h(t)),subject:h(t)(u.subject??""),body:h(t)(u.body??""),cc:(u.cc??[]).map(h(t)),bcc:(u.bcc??[]).map(h(t)),replyTo:u.replyTo?h(t)(u.replyTo):void 0,fileUrls:(a=t.find((0,se.byId)(u.attachmentsVariableId)))==null?void 0:a.value,isCustomBody:u.isCustomBody,isBodyCode:u.isBodyCode,resultValues:d}});return n(Oe(p,"Succesfully sent an email","Failed to send an email")),e.outgoingEdgeId},Oe=(e,t,o)=>({status:e?"error":"success",description:e?o:t,details:(e&&JSON.stringify(e,null,2).substring(0,1e3))??null});var fe=require("models"),wt=require("react-phone-number-input"),vt=require("utils");var Go=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,Ho=/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/,xt=(e,t)=>{switch(t){case fe.InputBlockType.EMAIL:return Go.test(e);case fe.InputBlockType.PHONE:return(0,wt.isPossiblePhoneNumber)(e);case fe.InputBlockType.URL:return Ho.test(e)}return!0},It=e=>(0,vt.isInputBlock)(e)&&"retryMessageContent"in e.options,Ct=(e,t,o)=>{let r=h(t)(e.options.retryMessageContent),n=e.id+Math.random()*1e3,i={id:(Math.random()*1e3).toString(),from:{blockId:n,groupId:e.groupId},to:{groupId:e.groupId,blockId:e.id}};return o(i),{groupId:e.groupId,id:n,type:fe.BubbleBlockType.TEXT,content:{html:`<div>${r}</div>`,richText:[],plainText:r},outgoingEdgeId:i.id}},kt=({from:e,to:t,hasTime:o,isRange:r})=>{let n=window.navigator.language,i={day:"2-digit",month:"2-digit",year:"numeric",hour:o?"2-digit":void 0,minute:o?"2-digit":void 0},s=new Date(e).toLocaleString(n,i),d=new Date(t).toLocaleString(n,i);return`${s}${r?` to ${d}`:""}`};var de=C(require("react"));var Tt=(0,de.createContext)({}),St=({children:e,resultId:t,onNewAnswer:o,onVariablesUpdated:r})=>{let[n,i]=(0,de.useState)({answers:[],variables:[],createdAt:new Date().toISOString()}),s=u=>(i(p=>({...p,answers:[...p.answers,u]})),o&&o(u)),d=u=>{let p=u.map(a=>({...a,value:Ie(a.value)}));i(a=>{let l=[...a.variables.filter(m=>p.every(g=>g.id!==m.id)),...p];return r&&r(l),{...a,variables:l}})};return de.default.createElement(Tt.Provider,{value:{resultId:t,resultValues:n,addAnswer:s,updateVariables:d}},e)},ae=()=>(0,de.useContext)(Tt);var oo=require("models");var he=C(require("react")),Et=(0,he.createContext)({}),Pt=({children:e,onScroll:t})=>{let o=t;return he.default.createElement(Et.Provider,{value:{scroll:o}},e)},ze=()=>(0,he.useContext)(Et);var Me=require("utils"),Bt=(e,t)=>{var i;let o=((i=e.match(/(\w+)/g))==null?void 0:i.length)??0;o===0&&(o=e.length);let r=t.speed,n=t.enabled?o/r*6e4:0;return n>t.maxDelay*1e3&&(n=t.maxDelay*1e3),n},Nt=e=>{var o;return(o=e.filter(r=>(0,Me.isBubbleBlock)(r)||(0,Me.isInputBlock)(r)).pop())==null?void 0:o.type};var Se=require("models"),Ee=C(require("react"));var M=C(require("react"));var ke=C(require("react")),ue=()=>ke.default.createElement("div",{className:"flex items-center"},ke.default.createElement("div",{className:"w-2 h-2 mr-1 rounded-full bubble1"}),ke.default.createElement("div",{className:"w-2 h-2 mr-1 rounded-full bubble2"}),ke.default.createElement("div",{className:"w-2 h-2 rounded-full bubble3"}));var Uo=400,Lt=({block:e,onTransitionEnd:t})=>{var a;let{typebot:o,isLoading:r}=A(),n=(0,M.useRef)(null),[i,s]=(0,M.useState)(!0),d=(0,M.useMemo)(()=>{var l;return h(o.variables)((l=e.content)==null?void 0:l.url)},[(a=e.content)==null?void 0:a.url,o.variables]);(0,M.useEffect)(()=>{!i||r||u()},[r]);let u=()=>{setTimeout(()=>{s(!1),p()},1e3)},p=()=>{s(!1),setTimeout(()=>{t()},Uo)};return M.default.createElement("div",{className:"flex flex-col w-full",ref:n},M.default.createElement("div",{className:"flex mb-2 w-full lg:w-11/12 items-center"},M.default.createElement("div",{className:"flex relative z-10 items-start typebot-host-bubble w-full"},M.default.createElement("div",{className:"flex items-center absolute px-4 py-2 rounded-lg bubble-typing z-10 ",style:{width:i?"4rem":"100%",height:i?"2rem":"100%"}},i?M.default.createElement(ue,null):M.default.createElement(M.default.Fragment,null)),M.default.createElement("iframe",{id:"embed-bubble-content",src:d,className:"w-full z-20 p-4 content-opacity "+(i?"opacity-0":"opacity-100"),style:{height:i?"2rem":e.content.height,borderRadius:"15px"}}))))};var O=C(require("react"));var $o=400,jo=5e3,Vt=({block:e,onTransitionEnd:t})=>{var l;let{typebot:o,isLoading:r}=A(),n=(0,O.useRef)(null),i=(0,O.useRef)(null),[s,d]=(0,O.useState)(!0),u=(0,O.useMemo)(()=>{var m;return h(o.variables)((m=e.content)==null?void 0:m.url)},[(l=e.content)==null?void 0:l.url,o.variables]);(0,O.useEffect)(()=>{!s||r||p()},[r]);let p=()=>{if(!i.current)return;let m=setTimeout(()=>{d(!1),a()},jo);i.current.onload=()=>{clearTimeout(m),d(!1),a()}},a=()=>{d(!1),setTimeout(()=>{t()},$o)};return O.default.createElement("div",{className:"flex flex-col",ref:n},O.default.createElement("div",{className:"flex mb-2 w-full lg:w-11/12 items-center"},O.default.createElement("div",{className:"flex relative z-10 items-start typebot-host-bubble"},O.default.createElement("div",{className:"flex items-center absolute px-4 py-2 rounded-lg bubble-typing z-10 ",style:{width:s?"4rem":"100%",height:s?"2rem":"100%"}},s?O.default.createElement(ue,null):O.default.createElement(O.default.Fragment,null)),O.default.createElement("img",{ref:i,src:u,className:"p-4 content-opacity z-10 w-auto rounded-lg "+(s?"opacity-0":"opacity-100"),style:{maxHeight:"32rem",height:s?"2rem":"auto",maxWidth:"100%"},alt:"Bubble image"}))))};var G=C(require("react"));var At=require("models");var Wo=400,_o={enabled:!0,speed:300,maxDelay:1.5},Ft=({block:e,onTransitionEnd:t})=>{let{typebot:o,isLoading:r}=A(),n=(0,G.useRef)(null),[i,s]=(0,G.useState)(!0),[d]=(0,G.useState)(h(o.variables)(e.content.html));(0,G.useEffect)(()=>{var a;if(!i||r)return;let p=Bt(e.content.plainText,((a=o.settings)==null?void 0:a.typingEmulation)??_o);setTimeout(()=>{u()},p)},[r]);let u=()=>{s(!1),setTimeout(()=>{t()},Wo)};return G.default.createElement("div",{className:"flex flex-col",ref:n},G.default.createElement("div",{className:"flex mb-2 w-full items-center"},G.default.createElement("div",{className:"flex relative items-start typebot-host-bubble"},G.default.createElement("div",{className:"flex items-center absolute px-4 py-2 rounded-lg bubble-typing ",style:{width:i?"4rem":"100%",height:i?"2rem":"100%"},"data-testid":"host-bubble"},i?G.default.createElement(ue,null):G.default.createElement(G.default.Fragment,null)),e.type===At.BubbleBlockType.TEXT&&G.default.createElement("p",{style:{textOverflow:"ellipsis"},className:"overflow-hidden content-opacity mx-4 my-2 whitespace-pre-wrap slate-html-container relative "+(i?"opacity-0 h-6":"opacity-100 h-full"),dangerouslySetInnerHTML:{__html:d}}))))};var L=C(require("react"));var Te=require("models");var Qo=400;var Dt=({block:e,onTransitionEnd:t})=>{let{typebot:o,isLoading:r}=A(),n=(0,L.useRef)(null),[i,s]=(0,L.useState)(!0);(0,L.useEffect)(()=>{!i||r||d()},[r]);let d=()=>{setTimeout(()=>{s(!1),u()},1e3)},u=()=>{s(!1),setTimeout(()=>{t()},Qo)};return L.default.createElement("div",{className:"flex flex-col",ref:n},L.default.createElement("div",{className:"flex mb-2 w-full lg:w-11/12 items-center"},L.default.createElement("div",{className:"flex relative z-10 items-start typebot-host-bubble"},L.default.createElement("div",{className:"flex items-center absolute px-4 py-2 rounded-lg bubble-typing z-10 ",style:{width:i?"4rem":"100%",height:i?"2rem":"100%"}},i?L.default.createElement(ue,null):L.default.createElement(L.default.Fragment,null)),L.default.createElement(Xo,{content:e.content,isTyping:i,variables:o.variables}))))},Xo=({content:e,isTyping:t,variables:o})=>{let r=(0,L.useMemo)(()=>h(o)(e==null?void 0:e.url),[o]);if(!(e!=null&&e.type))return L.default.createElement(L.default.Fragment,null);switch(e.type){case Te.VideoBubbleContentType.URL:let n=window.navigator.vendor.match(/apple/i);return L.default.createElement("video",{controls:!0,className:"p-4 focus:outline-none w-full z-10 content-opacity rounded-md "+(t?"opacity-0":"opacity-100"),style:{height:t?"2rem":"auto",maxHeight:n?"40vh":""},autoPlay:!0},L.default.createElement("source",{src:r,type:"video/mp4"}),"Sorry, your browser doesn't support embedded videos.");case Te.VideoBubbleContentType.VIMEO:case Te.VideoBubbleContentType.YOUTUBE:{let i=e.type===Te.VideoBubbleContentType.VIMEO?"https://player.vimeo.com/video":"https://www.youtube.com/embed";return L.default.createElement("iframe",{src:`${i}/${e.id}`,className:"w-full p-4 content-opacity z-10 rounded-md "+(t?"opacity-0":"opacity-100"),height:t?"2rem":"200px",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})}}};var Ot=({block:e,onTransitionEnd:t})=>{switch(e.type){case Se.BubbleBlockType.TEXT:return Ee.default.createElement(Ft,{block:e,onTransitionEnd:t});case Se.BubbleBlockType.IMAGE:return Ee.default.createElement(Vt,{block:e,onTransitionEnd:t});case Se.BubbleBlockType.VIDEO:return Ee.default.createElement(Dt,{block:e,onTransitionEnd:t});case Se.BubbleBlockType.EMBED:return Ee.default.createElement(Lt,{block:e,onTransitionEnd:t})}};var j=C(require("react"));var K=require("models");var pe=C(require("react")),zt=require("react-transition-group"),Mt=({message:e,showAvatar:t,avatarSrc:o,onClick:r})=>{let[n]=(0,pe.useState)(e),[i,s]=(0,pe.useState)(!1);return pe.default.createElement(zt.CSSTransition,{classNames:"bubble",timeout:1e3},pe.default.createElement("div",{className:"flex justify-end mb-2 items-end",onMouseDown:()=>s(!1),onMouseMove:()=>s(!0),onMouseUp:()=>{s(!1),!i&&r()},style:{marginLeft:"50px"}},pe.default.createElement("span",{className:"px-4 py-2 rounded-lg mr-2 whitespace-pre-wrap max-w-full typebot-guest-bubble cursor-pointer","data-testid":"guest-bubble"},n),t&&pe.default.createElement(Fe,{avatarSrc:o})))};var He=require("models"),me=C(require("react"));var ce=C(require("react"));var _e=C(require("react")),Gt=e=>_e.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",width:"19px",color:"white",...e},_e.default.createElement("path",{d:"M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z"}));var Y=({label:e,isDisabled:t,isLoading:o,disableIcon:r,...n})=>ce.default.createElement("button",{type:"submit",disabled:t||o,...n,className:"py-2 px-4 justify-center font-semibold rounded-md text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 typebot-button "+n.className},o&&ce.default.createElement(Pe,{className:"text-white"}),ce.default.createElement("span",{className:"xs:flex "+(r?"":"hidden")},e),ce.default.createElement(Gt,{className:"send-icon flex "+(r?"hidden":"xs:hidden")})),Pe=e=>ce.default.createElement("svg",{...e,className:"animate-spin -ml-1 mr-3 h-5 w-5 "+e.className,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","data-testid":"loading-spinner"},ce.default.createElement("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),ce.default.createElement("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"}));var ye=require("models"),ee=C(require("react")),Ht=C(require("react-phone-number-input"));var Ut=({inputRef:e,block:t,value:o,onChange:r})=>{var s,d,u,p,a,l,m,g,y,v,N,k,S,f;let n=c=>r(c.target.value),i=c=>{r(c)};switch(t.type){case ye.InputBlockType.TEXT:return(s=t.options)!=null&&s.isLong?ee.default.createElement(Zo,{ref:e,value:o,placeholder:((u=(d=t.options)==null?void 0:d.labels)==null?void 0:u.placeholder)??"Type your answer...",onChange:n}):ee.default.createElement(Ge,{ref:e,value:o,placeholder:((a=(p=t.options)==null?void 0:p.labels)==null?void 0:a.placeholder)??"Type your answer...",onChange:n,name:"no-name"});case ye.InputBlockType.EMAIL:return ee.default.createElement(Ge,{ref:e,value:o,placeholder:((m=(l=t.options)==null?void 0:l.labels)==null?void 0:m.placeholder)??"Type your email...",onChange:n,type:"email",autoComplete:"email"});case ye.InputBlockType.NUMBER:return ee.default.createElement(Ge,{ref:e,value:o,placeholder:((y=(g=t.options)==null?void 0:g.labels)==null?void 0:y.placeholder)??"Type your answer...",onChange:n,type:"number",style:{appearance:"auto"},min:(v=t.options)==null?void 0:v.min,max:(N=t.options)==null?void 0:N.max,step:((k=t.options)==null?void 0:k.step)??"any"});case ye.InputBlockType.URL:return ee.default.createElement(Ge,{ref:e,value:o,placeholder:((f=(S=t.options)==null?void 0:S.labels)==null?void 0:f.placeholder)??"Type your URL...",onChange:n,type:"url",autoComplete:"url"});case ye.InputBlockType.PHONE:return ee.default.createElement(Ht.default,{ref:e,value:o,onChange:i,placeholder:t.options.labels.placeholder??"Your phone number...",defaultCountry:t.options.defaultCountryCode,autoFocus:!De})}},Ge=ee.default.forwardRef((e,t)=>ee.default.createElement("input",{ref:t,className:"focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input",type:"text",style:{fontSize:"16px"},autoFocus:!De,...e})),Zo=ee.default.forwardRef((e,t)=>ee.default.createElement("textarea",{ref:t,className:"focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input",rows:6,"data-testid":"textarea",required:!0,style:{fontSize:"16px"},autoFocus:!De,...e}));var Qe=({block:e,onSubmit:t,defaultValue:o,hasGuestAvatar:r})=>{var m,g,y;let[n,i]=(0,me.useState)(o??""),s=(0,me.useRef)(null),d=e.type===He.InputBlockType.TEXT&&((m=e.options)==null?void 0:m.isLong),u=v=>{if(e.type===He.InputBlockType.URL&&!v.startsWith("https://"))return v==="https:/"?void 0:i(`https://${v}`);i(v)},p=()=>{var v;return n!==""&&((v=s.current)==null?void 0:v.reportValidity())},a=()=>{p()&&t({value:n})};return me.default.createElement("div",{className:"flex items-end justify-between rounded-lg pr-2 typebot-input w-full","data-testid":"input",style:{marginRight:r?"50px":"0.5rem",maxWidth:d?void 0:"350px"},onKeyDown:v=>{e.type===He.InputBlockType.TEXT&&e.options.isLong||v.key==="Enter"&&a()}},me.default.createElement(Ut,{inputRef:s,block:e,onChange:u,value:n}),me.default.createElement(Y,{type:"button",label:((y=(g=e.options)==null?void 0:g.labels)==null?void 0:y.button)??"Send",isDisabled:n==="",className:"my-2 ml-2",onClick:a}))};var eo=require("utils");var $=C(require("react"));var $t=({onSubmit:e,options:t})=>{let{hasTime:o,isRange:r,labels:n}=t??{},[i,s]=(0,$.useState)({from:"",to:""});return $.default.createElement("div",{className:"flex flex-col w-full lg:w-4/6"},$.default.createElement("div",{className:"flex items-center"},$.default.createElement("form",{className:"flex justify-between rounded-lg typebot-input pr-2 items-end",onSubmit:d=>{i.from===""&&i.to===""||(d.preventDefault(),e({value:`${i.from}${r?` to ${i.to}`:""}`,label:kt({...i,hasTime:o,isRange:r})}))}},$.default.createElement("div",{className:"flex flex-col"},$.default.createElement("div",{className:"flex items-center p-4 "+(r?"pb-0":"")},r&&$.default.createElement("p",{className:"font-semibold mr-2"},(n==null?void 0:n.from)??"From:"),$.default.createElement("input",{className:"focus:outline-none flex-1 w-full text-input",style:{minHeight:"2rem",minWidth:"100px",fontSize:"16px"},type:o?"datetime-local":"date",onChange:d=>s({...i,from:d.target.value}),"data-testid":"from-date"})),r&&$.default.createElement("div",{className:"flex items-center p-4"},r&&$.default.createElement("p",{className:"font-semibold"},(n==null?void 0:n.to)??"To:"),$.default.createElement("input",{className:"focus:outline-none flex-1 w-full text-input ml-2",style:{minHeight:"2rem",minWidth:"100px",fontSize:"16px"},type:o?"datetime-local":"date",onChange:d=>s({...i,to:d.target.value}),"data-testid":"to-date"}))),$.default.createElement(Y,{label:(n==null?void 0:n.button)??"Send",isDisabled:i.to===""&&i.from==="",className:"my-2 ml-2"}))))};var q=C(require("react"));var jt=({block:e,onSubmit:t})=>{var a;let{typebot:{variables:o}}=A(),{resultValues:r}=ae(),[n,i]=(0,q.useState)([]),s=l=>m=>{var g;m.preventDefault(),(g=e.options)!=null&&g.isMultipleChoice?d(l):t({value:h(o)(e.items[l].content),itemId:e.items[l].id})},d=l=>{let m=n.indexOf(l);m!==-1?(n.splice(m,1),i([...n])):i([...n,l])},u=()=>t({value:n.map(l=>h(o)(e.items[l].content)).join(", ")}),p=r&&r.answers.length===0&&e.items.length===1;return q.default.createElement("form",{className:"flex flex-col items-end",onSubmit:u},q.default.createElement("div",{className:"flex flex-wrap justify-end"},e.items.map((l,m)=>{var g,y;return q.default.createElement("span",{key:l.id,className:"relative inline-flex ml-2 mb-2"},q.default.createElement("button",{role:(g=e.options)!=null&&g.isMultipleChoice?"checkbox":"button",onClick:s(m),className:"py-2 px-4 text-left font-semibold rounded-md transition-all filter hover:brightness-90 active:brightness-75 duration-100 focus:outline-none typebot-button "+(n.includes(m)||!((y=e.options)!=null&&y.isMultipleChoice)?"":"selectable"),"data-testid":"button","data-itemid":l.id},h(o)(l.content)),p&&q.default.createElement("span",{className:"flex h-3 w-3 absolute top-0 right-0 -mt-1 -mr-1 ping"},q.default.createElement("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full brightness-225 opacity-75"}),q.default.createElement("span",{className:"relative inline-flex rounded-full h-3 w-3 brightness-200"})))})),q.default.createElement("div",{className:"flex"},n.length>0&&q.default.createElement(Y,{label:((a=e.options)==null?void 0:a.buttonLabel)??"Send",disableIcon:!0})))};var qt=require("models"),Jt=C(require("react"));var F=C(require("react")),we=require("@stripe/react-stripe-js"),Xt=require("@stripe/react-stripe-js");var Wt=require("utils"),_t=({apiHost:e,isPreview:t,inputOptions:o,variables:r})=>(0,Wt.sendRequest)({url:`${e}/api/integrations/stripe/createPaymentIntent`,method:"POST",body:{inputOptions:o,isPreview:t,variables:r}});var Zt=require("react-frame-component");var Qt=e=>new Promise(t=>{if(e.getElementById("stripe-script"))return t();let r=e.createElement("script");r.src="https://js.stripe.com/v3",r.id="stripe-script",e.body.appendChild(r),r.onload=()=>{t()}});var Yt=({options:e,onSuccess:t})=>{let{apiHost:o,isPreview:r,typebot:{variables:n},onNewLog:i}=A(),{window:s,document:d}=(0,Zt.useFrame)(),[u,p]=(0,F.useState)(null),[a,l]=(0,F.useState)(""),[m,g]=(0,F.useState)("");return(0,F.useEffect)(()=>{(async()=>{let{data:y,error:v}=await _t({apiHost:o,isPreview:r,variables:n,inputOptions:e});if(v)return i({status:"error",description:v.name+" "+v.message,details:v.message});!y||!d||(await Qt(d),s!=null&&s.Stripe&&(p(s.Stripe(y.publicKey)),l(y.clientSecret),g(y.amountLabel)))})()},[]),!u||!a?F.default.createElement(Pe,{className:"text-blue-500"}):F.default.createElement(Xt.Elements,{stripe:u,options:{clientSecret:a}},F.default.createElement(Yo,{onSuccess:t,clientSecret:a,amountLabel:m,options:e,variables:n,viewerHost:o}))},Yo=({onSuccess:e,clientSecret:t,amountLabel:o,options:r,variables:n,viewerHost:i})=>{let{scroll:s}=ze(),[d,u]=(0,F.useState)(!0),p=(0,we.useStripe)(),a=(0,we.useElements)(),[l,m]=(0,F.useState)(),[g,y]=(0,F.useState)(!1),[v,N]=(0,F.useState)(!1);return(0,F.useEffect)(()=>{if(!(!p||!t)){if(d)return u(!1);p.retrievePaymentIntent(t).then(({paymentIntent:f})=>{switch(f==null?void 0:f.status){case"succeeded":m("Payment succeeded!");break;case"processing":m("Your payment is processing.");break;case"requires_payment_method":m("Your payment was not successful, please try again.");break;default:m("Something went wrong.");break}})}},[p,t]),F.default.createElement("form",{id:"payment-form",onSubmit:async f=>{var x,I,V,H,oe,X;if(f.preventDefault(),!p||!a)return;y(!0);let{error:c,paymentIntent:E}=await p.confirmPayment({elements:a,confirmParams:{return_url:i,payment_method_data:{billing_details:{name:(x=r.additionalInformation)!=null&&x.name?h(n)((I=r.additionalInformation)==null?void 0:I.name):void 0,email:(V=r.additionalInformation)!=null&&V.email?h(n)((H=r.additionalInformation)==null?void 0:H.email):void 0,phone:(oe=r.additionalInformation)!=null&&oe.phoneNumber?h(n)((X=r.additionalInformation)==null?void 0:X.phoneNumber):void 0}}},redirect:"if_required"});if(y(!1),(c==null?void 0:c.type)!=="validation_error"){if((c==null?void 0:c.type)==="card_error")return m(c.message);if(!c&&E.status==="succeeded")return e()}},className:"flex flex-col rounded-lg p-4 typebot-input w-full items-center"},F.default.createElement(we.PaymentElement,{id:"payment-element",className:"w-full",onReady:()=>{N(!0),s()}}),v&&F.default.createElement(Y,{label:`${r.labels.button} ${o}`,isDisabled:g||!p||!a,isLoading:g,className:"mt-4 w-full max-w-lg",disableIcon:!0}),l&&F.default.createElement("div",{id:"payment-message",className:"typebot-input-error-message mt-4 text-center"},l))};var Xe=({onSuccess:e,options:t})=>{switch(t.provider){case qt.PaymentProvider.STRIPE:return Jt.default.createElement(Yt,{onSuccess:e,options:t})}};var J=C(require("react")),be=require("utils");var Kt=({block:e,onSubmit:t})=>{var s;let[o,r]=(0,J.useState)(),n=d=>{d.preventDefault(),!(0,be.isNotDefined)(o)&&t({value:o.toString()})},i=d=>r(d);return J.default.createElement("form",{className:"flex flex-col",onSubmit:n},e.options.labels.left&&J.default.createElement("span",{className:"text-sm w-full mb-2 rating-label"},e.options.labels.left),J.default.createElement("div",{className:"flex flex-wrap justify-center"},Array.from(Array(e.options.length+(e.options.buttonType==="Numbers"?1:0))).map((d,u)=>J.default.createElement(qo,{...e.options,key:u,rating:o,idx:u+(e.options.buttonType==="Numbers"?0:1),onClick:i}))),e.options.labels.right&&J.default.createElement("span",{className:"text-sm w-full text-right mb-2 pr-2 rating-label"},e.options.labels.right),J.default.createElement("div",{className:"flex justify-end mr-2"},(0,be.isDefined)(o)&&J.default.createElement(Y,{label:((s=e.options)==null?void 0:s.labels.button)??"Send",disableIcon:!0})))},qo=({rating:e,idx:t,buttonType:o,customIcon:r,onClick:n})=>o==="Numbers"?J.default.createElement("button",{onClick:i=>{i.preventDefault(),n(t)},className:"py-2 px-4 mr-2 mb-2 text-left font-semibold rounded-md transition-all filter hover:brightness-90 active:brightness-75 duration-100 focus:outline-none typebot-button "+((0,be.isDefined)(e)&&t<=e?"":"selectable")},t):J.default.createElement("div",{className:"flex justify-center items-center rating-icon-container cursor-pointer mr-2 mb-2 "+((0,be.isDefined)(e)&&t<=e?"selected":""),onClick:()=>n(t),dangerouslySetInnerHTML:{__html:r.isEnabled&&!(0,be.isEmpty)(r.svg)?r.svg:Jo}}),Jo='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';var w=C(require("react")),Ze=require("utils");var Rt=({block:{id:e,options:{isMultipleAllowed:t,labels:o,sizeLimit:r,isRequired:n}},onSubmit:i,onSkip:s})=>{let{isPreview:d,currentTypebotId:u}=A(),{resultId:p}=ae(),[a,l]=(0,w.useState)([]),[m,g]=(0,w.useState)(!1),[y,v]=(0,w.useState)(0),[N,k]=(0,w.useState)(!1),[S,f]=(0,w.useState)(),c=async b=>{!b.target.files||E(b.target.files)},E=b=>{f(void 0);let P=Array.from(b);if(P.some(T=>T.size>(r??10)*1024*1024))return f(`A file is larger than ${r??10}MB`);if(!t&&b)return I(P[0]);l([...a,...P])},x=async b=>{b.preventDefault(),a.length!==0&&V(a)},I=async b=>{if(d)return i({label:"File uploaded",value:"http://fake-upload-url.com"});g(!0);let P=await(0,Ze.uploadFiles)({basePath:`/api/typebots/${u}/blocks/${e}`,files:[{file:b,path:`public/results/${p}/${e}/${b.name}`}]});if(g(!1),P.length)return i({label:"File uploaded",value:P[0]??""});f("An error occured while uploading the file")},V=async b=>{if(d)return i({label:`${b.length} file${b.length>1?"s":""} uploaded`,value:b.map((T,re)=>`http://fake-upload-url.com/${re}`).join(", ")});g(!0);let P=await(0,Ze.uploadFiles)({basePath:`/api/typebots/${u}/blocks/${e}`,files:b.map(T=>({file:T,path:`public/results/${p}/${e}/${T.name}`})),onUploadProgress:v});if(g(!1),v(0),P.length!==b.length)return f("An error occured while uploading the files");i({label:`${P.length} file${P.length>1?"s":""} uploaded`,value:P.join(", ")})},H=b=>{b.preventDefault(),k(!0)},oe=()=>k(!1),X=b=>{b.preventDefault(),b.stopPropagation(),b.dataTransfer.files&&E(b.dataTransfer.files)},Ne=()=>l([]);return w.default.createElement("form",{className:"flex flex-col w-full",onSubmit:x},w.default.createElement("label",{htmlFor:"dropzone-file",className:"typebot-upload-input py-6 flex flex-col justify-center items-center w-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 px-8 mb-2 "+(N?"dragging-over":""),onDragOver:H,onDragLeave:oe,onDrop:X},m?w.default.createElement(w.default.Fragment,null,a.length===1?w.default.createElement(Pe,null):w.default.createElement("div",{className:"w-full bg-gray-200 rounded-full h-2.5"},w.default.createElement("div",{className:"upload-progress-bar h-2.5 rounded-full",style:{width:`${y>0?y:10}%`,transition:"width 150ms cubic-bezier(0.4, 0, 0.2, 1)"}}))):w.default.createElement(w.default.Fragment,null,w.default.createElement("div",{className:"flex flex-col justify-center items-center"},a.length?w.default.createElement("span",{className:"relative"},w.default.createElement(Ro,null),w.default.createElement("div",{className:"total-files-indicator flex items-center justify-center absolute -right-1 rounded-full px-1 h-4",style:{bottom:"5px"}},a.length)):w.default.createElement(Ko,null),w.default.createElement("p",{className:"text-sm text-gray-500 text-center",dangerouslySetInnerHTML:{__html:o.placeholder}})),w.default.createElement("input",{id:"dropzone-file",type:"file",className:"hidden",multiple:t,onChange:c}))),a.length===0&&n===!1&&w.default.createElement("div",{className:"flex justify-end"},w.default.createElement("button",{className:"py-2 px-4 justify-center font-semibold rounded-md text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 typebot-button ",onClick:s},"Skip")),t&&a.length>0&&!m&&w.default.createElement("div",{className:"flex justify-end"},w.default.createElement("div",{className:"flex"},a.length&&w.default.createElement("button",{className:"secondary-button py-2 px-4 justify-center font-semibold rounded-md text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 mr-2",onClick:Ne},"Clear"),w.default.createElement(Y,{type:"submit",label:o.button?`${o.button} ${a.length} file${a.length>1?"s":""}`:"Upload",disableIcon:!0}))),S&&w.default.createElement("p",{className:"text-red-500 text-sm"},S))},Ko=()=>w.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"mb-3"},w.default.createElement("polyline",{points:"16 16 12 12 8 16"}),w.default.createElement("line",{x1:"12",y1:"12",x2:"12",y2:"21"}),w.default.createElement("path",{d:"M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"}),w.default.createElement("polyline",{points:"16 16 12 12 8 16"})),Ro=()=>w.default.createElement("svg",{className:"mb-3",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},w.default.createElement("path",{d:"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"}),w.default.createElement("polyline",{points:"13 2 13 9 20 9"}));var to=({block:e,hasAvatar:t,hasGuestAvatar:o,onTransitionEnd:r,onSkip:n})=>{var v,N,k;let{typebot:i}=A(),{addAnswer:s}=ae(),[d,u]=(0,j.useState)(),[p,a]=(0,j.useState)(!1),{variableId:l}=e.options,m=i.settings.general.isInputPrefillEnabled??!0?l&&((v=i.variables.find((0,eo.byId)(l)))==null?void 0:v.value):void 0,g=async({label:S,value:f,itemId:c})=>{u(S??f);let E=!xt(f,e.type);!E&&s&&await s({blockId:e.id,groupId:e.groupId,content:f,variableId:l??null,uploadedFiles:e.type===K.InputBlockType.FILE}),p||r({label:S,value:f,itemId:c},E),a(!1)},y=()=>{u(void 0),a(!0)};if(d){let S=(N=i.theme.chat.guestAvatar)==null?void 0:N.url;return j.default.createElement(Mt,{message:d,showAvatar:((k=i.theme.chat.guestAvatar)==null?void 0:k.isEnabled)??!1,avatarSrc:S&&h(i.variables)(S),onClick:y})}return j.default.createElement("div",{className:"flex justify-end"},t&&j.default.createElement("div",{className:"flex w-6 xs:w-10 h-6 xs:h-10 mr-2 mb-2 mt-1 flex-shrink-0 items-center"}),j.default.createElement(er,{block:e,onSubmit:g,onSkip:n,defaultValue:m==null?void 0:m.toString(),hasGuestAvatar:o}))},er=({block:e,onSubmit:t,onSkip:o,defaultValue:r,hasGuestAvatar:n})=>{switch(e.type){case K.InputBlockType.TEXT:case K.InputBlockType.NUMBER:case K.InputBlockType.EMAIL:case K.InputBlockType.URL:case K.InputBlockType.PHONE:return j.default.createElement(Qe,{block:e,onSubmit:t,defaultValue:r,hasGuestAvatar:n});case K.InputBlockType.DATE:return j.default.createElement($t,{options:e.options,onSubmit:t});case K.InputBlockType.CHOICE:return j.default.createElement(jt,{block:e,onSubmit:t});case K.InputBlockType.PAYMENT:return j.default.createElement(Xe,{options:e.options,onSuccess:()=>t({value:e.options.labels.success??"Success"})});case K.InputBlockType.RATING:return j.default.createElement(Kt,{block:e,onSubmit:t});case K.InputBlockType.FILE:return j.default.createElement(Rt,{block:e,onSubmit:t,onSkip:o})}};var Ye=({blocks:e,startBlockIndex:t,groupTitle:o,onGroupEnd:r,keepShowingHostAvatar:n})=>{var Ne;let{currentTypebotId:i,typebot:s,updateVariableValue:d,createEdge:u,apiHost:p,isPreview:a,onNewLog:l,injectLinkedTypebot:m,linkedTypebots:g,setCurrentTypebotId:y,pushEdgeIdInLinkedTypebotQueue:v}=A(),{resultValues:N,updateVariables:k,resultId:S}=ae(),{scroll:f}=ze(),[c,E]=(0,B.useState)([]),[x,I]=(0,B.useState)([]),V=b=>{if(E([...c,b]),(0,D.isBubbleBlock)(b)){let P=Nt(c);P&&(0,D.isBubbleBlockType)(P)?I(x.map((T,re)=>re===x.length-1?{bubbles:[...T.bubbles,b]}:T)):I([...x,{bubbles:[b]}])}(0,D.isInputBlock)(b)&&(x.length===0||(0,D.isDefined)(x[x.length-1].input)?I([...x,{bubbles:[],input:b}]):I(x.map((P,T)=>T===x.length-1?{...P,input:b}:P)))};(0,B.useEffect)(()=>{let b=e[t];b&&V(b)},[]),(0,B.useEffect)(()=>{f(),H()},[c]);let H=async()=>{let b=[...c].pop();if(!!b){if((0,D.isLogicBlock)(b)){let{nextEdgeId:P,linkedTypebot:T}=await gt(b,{isPreview:a,apiHost:p,typebot:s,linkedTypebots:g,updateVariableValue:d,updateVariables:k,injectLinkedTypebot:m,onNewLog:l,createEdge:u,setCurrentTypebotId:y,pushEdgeIdInLinkedTypebotQueue:v,currentTypebotId:i});if(b.type===oo.LogicBlockType.REDIRECT&&b.options.isNewTab===!1)return;P?r({edgeId:P,updatedTypebot:T}):oe()}if((0,D.isIntegrationBlock)(b)){let P=await ht({block:b,context:{apiHost:p,typebotId:i,groupId:b.groupId,blockId:b.id,variables:s.variables,isPreview:a,updateVariableValue:d,updateVariables:k,resultValues:N,groups:s.groups,onNewLog:l,resultId:S}});P?r({edgeId:P}):oe()}b.type==="start"&&r({edgeId:b.outgoingEdgeId})}},oe=(b,P)=>{var Je,Ke;f();let T=[...c].pop();if(T){if(P&&It(T))return V(Ct(T,s.variables,u));if((0,D.isInputBlock)(T)&&((Je=T.options)==null?void 0:Je.variableId)&&b&&d(T.options.variableId,b.value),(0,D.isChoiceInput)(T)&&!T.options.isMultipleChoice){let Re=(Ke=T.items.find((0,D.byId)(b==null?void 0:b.itemId)))==null?void 0:Ke.outgoingEdgeId;if(Re)return r({edgeId:Re})}if((T==null?void 0:T.outgoingEdgeId)||c.length===e.length)return r({edgeId:T.outgoingEdgeId})}let re=e[c.length+t];re?V(re):r({})},X=(Ne=s.theme.chat.hostAvatar)==null?void 0:Ne.url;return B.default.createElement("div",{className:"flex w-full","data-group-name":o},B.default.createElement("div",{className:"flex flex-col w-full min-w-0"},x.map((b,P)=>{var T,re;return B.default.createElement(tr,{key:P,displayChunk:b,hostAvatar:{isEnabled:((T=s.theme.chat.hostAvatar)==null?void 0:T.isEnabled)??!0,src:X&&h(s.variables)(X)},hasGuestAvatar:((re=s.theme.chat.guestAvatar)==null?void 0:re.isEnabled)??!1,onDisplayNextBlock:oe,keepShowingHostAvatar:n})})))},tr=({displayChunk:{bubbles:e,input:t},hostAvatar:o,hasGuestAvatar:r,keepShowingHostAvatar:n,onDisplayNextBlock:i})=>{let[s,d]=(0,B.useState)(!1),u=(0,B.useRef)();(0,B.useEffect)(()=>{a()});let p=()=>{i(),d(!0)},a=()=>{var l;return(l=u.current)==null?void 0:l.refreshTopOffset()};return B.default.createElement(B.default.Fragment,null,B.default.createElement("div",{className:"flex"},o.isEnabled&&e.length>0&&B.default.createElement(ct,{ref:u,hostAvatarSrc:o.src,keepShowing:(n||(0,D.isDefined)(t))&&!s}),B.default.createElement("div",{className:"flex-1",style:{marginRight:r?"50px":"0.5rem"}},B.default.createElement(Be.TransitionGroup,null,e.map(l=>B.default.createElement(Be.CSSTransition,{key:l.id,classNames:"bubble",timeout:500,unmountOnExit:!0},B.default.createElement(Ot,{block:l,onTransitionEnd:()=>{i(),a()}})))))),!s&&B.default.createElement(Be.CSSTransition,{classNames:"bubble",timeout:500,unmountOnExit:!0,in:(0,D.isDefined)(t)},t&&B.default.createElement(to,{block:t,onTransitionEnd:i,onSkip:p,hasAvatar:o.isEnabled,hasGuestAvatar:r})))};var no=require("react-frame-component");var qe=require("models"),R={general:{bgImage:"--typebot-container-bg-image",bgColor:"--typebot-container-bg-color",fontFamily:"--typebot-container-font-family"},chat:{hostBubbles:{bgColor:"--typebot-host-bubble-bg-color",color:"--typebot-host-bubble-color"},guestBubbles:{bgColor:"--typebot-guest-bubble-bg-color",color:"--typebot-guest-bubble-color"},inputs:{bgColor:"--typebot-input-bg-color",color:"--typebot-input-color",placeholderColor:"--typebot-input-placeholder-color"},buttons:{bgColor:"--typebot-button-bg-color",color:"--typebot-button-color"}}},ro=(e,t)=>{!e||(e.general&&or(e.general,t),e.chat&&rr(e.chat,t))},or=(e,t)=>{let{background:o,font:r}=e;r&&t.setProperty(R.general.fontFamily,r)},rr=(e,t)=>{let{hostBubbles:o,guestBubbles:r,buttons:n,inputs:i}=e;o&&nr(o,t),r&&ir(r,t),n&&sr(n,t),i&&ar(i,t)},nr=(e,t)=>{e.backgroundColor&&t.setProperty(R.chat.hostBubbles.bgColor,e.backgroundColor),e.color&&t.setProperty(R.chat.hostBubbles.color,e.color)},ir=(e,t)=>{e.backgroundColor&&t.setProperty(R.chat.guestBubbles.bgColor,e.backgroundColor),e.color&&t.setProperty(R.chat.guestBubbles.color,e.color)},sr=(e,t)=>{e.backgroundColor&&t.setProperty(R.chat.buttons.bgColor,e.backgroundColor),e.color&&t.setProperty(R.chat.buttons.color,e.color)},ar=(e,t)=>{e.backgroundColor&&t.setProperty(R.chat.inputs.bgColor,e.backgroundColor),e.color&&t.setProperty(R.chat.inputs.color,e.color),e.placeholderColor&&t.setProperty(R.chat.inputs.placeholderColor,e.placeholderColor)},lr=(e,t)=>{t.setProperty((e==null?void 0:e.type)===qe.BackgroundType.IMAGE?R.general.bgImage:R.general.bgColor,e.type===qe.BackgroundType.NONE?"transparent":e.content??"#ffffff")};var te=require("utils"),io=require("react-scroll");var so=({theme:e,predefinedVariables:t,startGroupId:o,onNewGroupVisible:r,onCompleted:n})=>{let{typebot:i,updateVariableValue:s,linkedBotQueue:d,popEdgeIdFromLinkedTypebotQueue:u}=A(),{document:p}=(0,no.useFrame)(),[a,l]=(0,W.useState)([]),{updateVariables:m}=ae(),g=(0,W.useRef)(null),y=(0,W.useRef)(null),[v,N]=(0,W.useState)(!1),k=({edgeId:c,updatedTypebot:E,groupId:x})=>{let I=E??i;if(x){let X=I.groups.find((0,te.byId)(x));return X?(r({id:"edgeId",from:{groupId:"block",blockId:"block"},to:{groupId:x}}),l([...a,{group:X,startBlockIndex:0}])):void 0}let V=I.edges.find((0,te.byId)(c));if(!V){if(d.length>0){let X=d[0].edgeId;u(),k({edgeId:X})}return n()}let H=I.groups.find((0,te.byId)(V.to.groupId));if(!H)return n();let oe=V.to.blockId?H.blocks.findIndex((0,te.byId)(V.to.blockId)):0;r(V),l([...a,{group:H,startBlockIndex:oe}])};(0,W.useEffect)(()=>{if(v)return;if((0,te.isDefined)(t)&&Object.keys(t).length>0){let E=S(t);m(E)}N(!0);let c=i.groups[0].blocks[0].outgoingEdgeId;!c&&!o||k({edgeId:o?void 0:c,groupId:o})},[t]);let S=c=>{let E=[];return Object.keys(c).forEach(x=>{let I=i.variables.find(H=>H.name.toLowerCase()===x.toLowerCase());if(!c||(0,te.isNotDefined)(I))return;let V=c[x];!V||(s(I==null?void 0:I.id,V),E.push({...I,value:V}))}),E};return(0,W.useEffect)(()=>{!p||ro(e,p.body.style)},[e,p]),W.default.createElement("div",{ref:y,className:"overflow-y-scroll w-full lg:w-3/4 min-h-full rounded lg:px-5 px-3 pt-10 relative scrollable-container typebot-chat-view"},W.default.createElement(Pt,{onScroll:()=>{!y.current||setTimeout(()=>{io.animateScroll.scrollToBottom({duration:500,container:y.current})},1)}},a.map((c,E)=>{let x=a[E+1],I=x&&(0,te.isInputBlock)(x.group.blocks[x.startBlockIndex]);return W.default.createElement(Ye,{key:c.group.id+E,blocks:c.group.blocks,startBlockIndex:c.startBlockIndex,onGroupEnd:k,groupTitle:c.group.title,keepShowingHostAvatar:E===a.length-1||I})})),W.default.createElement("div",{className:"w-full h-32",ref:g}))};var po=require("models");var ge=C(require("react")),ao=require("react-frame-component"),lo=()=>{let{document:e}=(0,ao.useFrame)(),t=(0,ge.useRef)(null);return(0,ge.useEffect)(()=>{if(!e)return;let o=e.querySelector('[data-testid="container"]'),r=new MutationObserver(function(n){n.forEach(function(i){i.removedNodes.forEach(function(s){s.id=="lite-badge"&&o.append(t.current)})})});return r.observe(o,{subtree:!1,childList:!0}),()=>{r.disconnect()}},[]),ge.default.createElement("a",{ref:t,href:"https://www.typebot.io/?utm_source=litebadge",target:"_blank",rel:"noopener noreferrer",className:"fixed py-1 px-2 bg-white z-50 rounded shadow-md lite-badge",style:{bottom:"20px"},id:"lite-badge"},"Made with ",ge.default.createElement("span",{className:"text-blue-500"},"Typebot"),".")};var Ue=require("utils"),dr=({typebot:e,apiHost:t=(0,Ue.getViewerUrl)(),isPreview:o=!1,isLoading:r=!1,style:n,resultId:i,startGroupId:s,predefinedVariables:d,onNewLog:u,onNewGroupVisible:p,onNewAnswer:a,onCompleted:l,onVariablesUpdated:m})=>{var S,f,c,E,x;let g=(0,Q.useMemo)(()=>{var I,V,H;return((H=(V=(I=e==null?void 0:e.theme)==null?void 0:I.general)==null?void 0:V.background)==null?void 0:H.type)===po.BackgroundType.COLOR?e.theme.general.background.content:"transparent"},[(f=(S=e==null?void 0:e.theme)==null?void 0:S.general)==null?void 0:f.background]),y=I=>p&&p(I),v=I=>a&&a(I),N=I=>u&&u(I),k=()=>l&&l();return(0,Ue.isEmpty)(t)?Q.default.createElement("p",null,"process.env.NEXT_PUBLIC_VIEWER_URL is missing in env"):Q.default.createElement(uo.default,{id:"typebot-iframe",head:Q.default.createElement("style",null,st,nt,(c=e.theme)==null?void 0:c.customCss,it),name:"Typebot viewer",style:{width:"100%",height:"100%",border:"none",...n}},Q.default.createElement("style",{dangerouslySetInnerHTML:{__html:`@import url('https://fonts.googleapis.com/css2?family=${((x=(E=e==null?void 0:e.theme)==null?void 0:E.general)==null?void 0:x.font)??"Open Sans"}:wght@300;400;600&display=swap');`}}),Q.default.createElement(rt,{typebot:e,apiHost:t,isPreview:o,onNewLog:N,isLoading:r},Q.default.createElement(St,{resultId:i,onNewAnswer:v,onVariablesUpdated:m},Q.default.createElement("div",{className:"flex text-base overflow-hidden bg-cover h-screen w-screen flex-col items-center typebot-container",style:{backgroundColor:g??"transparent"},"data-testid":"container"},Q.default.createElement("div",{className:"flex w-full h-full justify-center"},Q.default.createElement(so,{theme:e.theme,onNewGroupVisible:y,onCompleted:k,predefinedVariables:d,startGroupId:s})),e.settings.general.isBrandingEnabled&&Q.default.createElement(lo,null)))))};xe(ve,require("util"),module.exports);0&&(module.exports={TypebotViewer,parseVariables});
//# sourceMappingURL=index.js.map