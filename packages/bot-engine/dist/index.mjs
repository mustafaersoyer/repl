import{a as $e}from"./chunk-CVZVRKUR.mjs";import j,{useMemo as dn}from"react";import Kt,{createContext as Rt,useContext as eo,useEffect as to,useState as pe}from"react";import{isDefined as Yt,isNotDefined as qt}from"utils";var y=(e,t={fieldToParse:"value",escapeForJson:!1})=>o=>!o||o===""?"":o.replace(/\{\{(.*?)\}\}/g,(r,n)=>{let i=n.replace(/{{|}}/g,""),s=e.find(p=>i===p.name&&Yt(p.value));if(!s)return"";if(t.fieldToParse==="id")return s.id;let{value:d}=s;if(t.escapeForJson)return Jt(d);let u=re(d);return u||""}),re=e=>{if(qt(e))return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return console.warn("Failed to safely stringify variable value",e),null}},Se=e=>{if(e===null)return null;if(e===void 0)return;let t=e.startsWith("0")&&!e.startsWith("0.")&&e.length>1;if(typeof e=="string"&&t||typeof e=="number")return e;if(e==="true")return!0;if(e==="false")return!1;if(e==="null")return null;if(e!=="undefined")return isNaN(e)?e:Number(e)},Jt=e=>e.replace(/\n/g,"\\n").replace(/"/g,'\\"').replace(/\\[^n"]/g,"\\\\ "),We=(e,t)=>Object.keys(e).reduce((o,r)=>{let n=e[r];return{...o,[r]:typeof n=="string"?y(t)(n):n}},{});var je=Rt({}),_e=({children:e,typebot:t,apiHost:o,isPreview:r,isLoading:n,onNewLog:i})=>{let[s,d]=pe(t),[u,p]=pe([]),[a,l]=pe(t.typebotId),[m,g]=pe([]);to(()=>{d(f=>({...f,theme:t.theme,settings:t.settings}))},[t.theme,t.settings]);let h=(f,c)=>{let S=re(c);d(v=>({...v,variables:v.variables.map(x=>x.id===f?{...x,value:S}:x)}))},w=f=>{d(c=>({...c,edges:[...c.edges,f]}))},P=f=>{let c={id:"typebotId"in f?f.typebotId:f.id,groups:f.groups,edges:f.edges,variables:f.variables};p(v=>[...v,c]);let S={...s,groups:[...s.groups,...c.groups],variables:[...s.variables,...c.variables],edges:[...s.edges,...c.edges]};return d(S),c},C=f=>g(c=>[...c,f]),T=()=>{g(f=>f.slice(1)),l(m[0].typebotId)};return Kt.createElement(je.Provider,{value:{typebot:s,linkedTypebots:u,apiHost:o,isPreview:r,updateVariableValue:h,createEdge:w,injectLinkedTypebot:P,onNewLog:i,linkedBotQueue:m,isLoading:n,pushEdgeIdInLinkedTypebotQueue:C,popEdgeIdFromLinkedTypebotQueue:T,currentTypebotId:a,setCurrentTypebotId:l}},e)},N=()=>eo(je);import un from"react-frame-component";var Qe=`/*
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
`;var Xe=`.lite-badge {\r
  display: block !important;\r
}\r
`;var Ze=`/* CSS variables. */\r
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
`;import ke,{useEffect as Wt,useRef as jt,useState as _t}from"react";import A,{useEffect as De,useRef as zr,useState as Oe}from"react";import{TransitionGroup as Mr,CSSTransition as Gt}from"react-transition-group";import me,{forwardRef as ao,useEffect as lo,useImperativeHandle as uo,useRef as qe,useState as Je}from"react";import ne,{useState as io}from"react";import{isDefined as so}from"utils";import _ from"react";var Ye=()=>_.createElement("figure",{className:"flex justify-center items-center rounded-full text-white w-6 h-6 text-sm relative xs:w-10 xs:h-10 xs:text-xl","data-testid":"default-avatar"},_.createElement("svg",{width:"75",height:"75",viewBox:"0 0 75 75",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"absolute top-0 left-0 w-6 h-6 xs:w-full xs:h-full xs:text-xl"},_.createElement("mask",{id:"mask0",x:"0",y:"0","mask-type":"alpha"},_.createElement("circle",{cx:"37.5",cy:"37.5",r:"37.5",fill:"#0042DA"})),_.createElement("g",{mask:"url(#mask0)"},_.createElement("rect",{x:"-30",y:"-43",width:"131",height:"154",fill:"#0042DA"}),_.createElement("rect",{x:"2.50413",y:"120.333",width:"81.5597",height:"86.4577",rx:"2.5",transform:"rotate(-52.6423 2.50413 120.333)",stroke:"#FED23D",strokeWidth:"5"}),_.createElement("circle",{cx:"76.5",cy:"-1.5",r:"29",stroke:"#FF8E20",strokeWidth:"5"}),_.createElement("path",{d:"M-49.8224 22L-15.5 -40.7879L18.8224 22H-49.8224Z",stroke:"#F7F8FF",strokeWidth:"5"}))));var ce=({avatarSrc:e})=>{let[t]=io(e);return t===""?ne.createElement(ne.Fragment,null):so(t)?ne.createElement("figure",{className:"flex justify-center items-center rounded-full text-white w-6 h-6 text-sm relative xs:w-10 xs:h-10 xs:text-xl"},ne.createElement("img",{src:t,alt:"Bot avatar",className:"rounded-full object-cover w-full h-full"})):ne.createElement(Ye,null)};import{useFrame as po}from"react-frame-component";import{CSSTransition as co}from"react-transition-group";import{ResizeObserver as mo}from"resize-observer";var Ke=ao(({hostAvatarSrc:e,keepShowing:t},o)=>{let{document:r}=po(),[n,i]=Je(!1),[s,d]=Je(0),u=()=>{if(!p.current||!a.current)return;let{height:l}=p.current.getBoundingClientRect(),{height:m}=a.current.getBoundingClientRect();d(l-m)},p=qe(null),a=qe(null);return uo(o,()=>({refreshTopOffset:u})),lo(()=>{if(!r)return;i(!0);let l=new mo(u);return l.observe(r.body),()=>{l.disconnect()}},[]),me.createElement("div",{className:"flex w-6 xs:w-10 mr-2 mb-2 flex-shrink-0 items-center relative typebot-avatar-container ",ref:p},me.createElement(co,{classNames:"bubble",timeout:500,in:n&&t,unmountOnExit:!0},me.createElement("div",{className:"absolute w-6 xs:w-10 h-6 xs:h-10 mb-4 xs:mb-2 flex items-center top-0",ref:a,style:{top:`${s}px`,transition:"top 350ms ease-out, opacity 500ms"}},me.createElement(ce,{avatarSrc:e}))))});import{isBubbleBlock as Gr,isBubbleBlockType as Hr,isChoiceInput as Ur,isDefined as ze,isInputBlock as Ht,isIntegrationBlock as $r,isLogicBlock as Wr,byId as jr}from"utils";import{LogicBlockType as ie,LogicalOperator as bo,ComparisonOperators as oe}from"models";import{byId as ot,isDefined as go,isNotDefined as fo,sendRequest as et}from"utils";var Re=e=>e.startsWith("http")||e.startsWith("mailto:")||e.startsWith("tel:")||e.startsWith("sms:")?e:`https://${e}`,be=typeof window<"u"&&window.matchMedia("only screen and (max-width: 760px)").matches;var rt=async(e,t)=>{switch(e.type){case ie.SET_VARIABLE:return{nextEdgeId:ho(e,t)};case ie.CONDITION:return{nextEdgeId:wo(e,t)};case ie.REDIRECT:return{nextEdgeId:vo(e,t)};case ie.CODE:return{nextEdgeId:await xo(e,t)};case ie.TYPEBOT_LINK:return await Io(e,t)}},ho=(e,{typebot:{variables:t},updateVariableValue:o,updateVariables:r})=>{var s;if(!((s=e.options)!=null&&s.variableId))return e.outgoingEdgeId;let n=e.options.expressionToEvaluate?yo(t)(e.options.expressionToEvaluate):void 0,i=t.find(ot(e.options.variableId));return i&&(o(i.id,n),r([{...i,value:n}])),e.outgoingEdgeId},yo=e=>t=>{let o=y(e,{fieldToParse:"id"})(t.includes("return ")?t:`return ${t}`);try{return Function(...e.map(n=>n.id),o)(...e.map(n=>Se(n.value)))}catch(r){return console.log(`Evaluating: ${o}`,r),t}},wo=(e,{typebot:{variables:t}})=>{let{content:o}=e.items[0];return(o.logicalOperator===bo.AND?o.comparisons.every(tt(t)):o.comparisons.some(tt(t)))?e.items[0].outgoingEdgeId:e.outgoingEdgeId},tt=e=>t=>{var n;if(!(t!=null&&t.variableId))return!1;let o=(((n=e.find(i=>i.id===t.variableId))==null?void 0:n.value)??"").trim(),r=y(e)(t.value).trim();if(fo(r))return!1;switch(t.comparisonOperator){case oe.CONTAINS:return o.toLowerCase().includes(r.toLowerCase());case oe.EQUAL:return o===r;case oe.NOT_EQUAL:return o!==r;case oe.GREATER:return parseFloat(o)>parseFloat(r);case oe.LESS:return parseFloat(o)<parseFloat(r);case oe.IS_SET:return go(o)&&o.length>0}},vo=(e,{typebot:{variables:t}})=>{var n,i,s;if(!((n=e.options)!=null&&n.url))return e.outgoingEdgeId;let o=Re(y(t)(e.options.url));if(window.parent&&window.location!==((i=window.top)==null?void 0:i.location)){if(!e.options.isNewTab)return window.top.location.href=o;try{window.open(o)}catch{(s=window.top)==null||s.postMessage({from:"typebot",redirectUrl:o},"*")}}else window.open(o,e.options.isNewTab?"_blank":"_self");return e.outgoingEdgeId},xo=async(e,{typebot:{variables:t}})=>{if(!e.options.content)return;let o=Function(...t.map(r=>r.id),y(t,{fieldToParse:"id"})(e.options.content));try{await o(...t.map(r=>Se(r.value)))}catch(r){console.error(r)}return e.outgoingEdgeId},Io=async(e,t)=>{var m;let{typebot:o,linkedTypebots:r,onNewLog:n,createEdge:i,setCurrentTypebotId:s,pushEdgeIdInLinkedTypebotQueue:d,currentTypebotId:u}=t,p=e.options.typebotId==="current"?o:[o,...r].find(ot(e.options.typebotId))??await Co(e,t);if(!p)return n({status:"error",description:"Failed to link typebot",details:""}),{nextEdgeId:e.outgoingEdgeId};e.outgoingEdgeId&&d({edgeId:e.outgoingEdgeId,typebotId:u}),s("typebotId"in p?p.typebotId:p.id);let a=e.options.groupId??((m=p.groups.find(g=>g.blocks.some(h=>h.type==="start")))==null?void 0:m.id);if(!a)return{nextEdgeId:e.outgoingEdgeId};let l={id:(Math.random()*1e3).toString(),from:{blockId:"",groupId:""},to:{groupId:a}};return i(l),{nextEdgeId:l.id,linkedTypebot:{...p,edges:[...p.edges,l]}}},Co=async(e,{apiHost:t,injectLinkedTypebot:o,isPreview:r})=>{let{data:n,error:i}=r?await et(`/api/typebots/${e.options.typebotId}`):await et(`${t}/api/publicTypebots/${e.options.typebotId}`);if(!(!n||i))return o(n.typebot)};import{IntegrationBlockType as K,GoogleSheetsAction as Ee}from"models";import{stringify as ge}from"qs";import{byId as Pe,sendRequest as se}from"utils";var nt=({block:e,context:t})=>{switch(e.type){case K.GOOGLE_SHEETS:return To(e,t);case K.GOOGLE_ANALYTICS:return ko(e,t);case K.ZAPIER:case K.MAKE_COM:case K.PABBLY_CONNECT:case K.WEBHOOK:return Bo(e,t);case K.EMAIL:return No(e,t)}},ko=async(e,{variables:t})=>{var r;if(!((r=e.options)!=null&&r.trackingId))return e.outgoingEdgeId;let{default:o}=await import("./gtag-UUBNPYED.mjs");return await o(e.options.trackingId),$e(We(e.options,t)),e.outgoingEdgeId},To=async(e,t)=>{if(!("action"in e.options))return e.outgoingEdgeId;switch(e.options.action){case Ee.INSERT_ROW:await So(e.options,t);break;case Ee.UPDATE_ROW:await Eo(e.options,t);break;case Ee.GET:await Po(e.options,t);break}return e.outgoingEdgeId},So=async(e,{variables:t,apiHost:o,onNewLog:r,resultId:n})=>{if(!e.cellsToInsert){r({status:"warning",description:"Cells to insert are undefined",details:null});return}let i=ge({resultId:n}),{error:s}=await se({url:`${o}/api/integrations/google-sheets/spreadsheets/${e.spreadsheetId}/sheets/${e.sheetId}?${i}`,method:"POST",body:{credentialsId:e.credentialsId,values:it(e.cellsToInsert,t)}});r(fe(s,"Succesfully inserted a row in the sheet","Failed to insert a row in the sheet"))},Eo=async(e,{variables:t,apiHost:o,onNewLog:r,resultId:n})=>{if(!e.cellsToUpsert||!e.referenceCell)return;let i=ge({resultId:n}),{error:s}=await se({url:`${o}/api/integrations/google-sheets/spreadsheets/${e.spreadsheetId}/sheets/${e.sheetId}?${i}`,method:"PATCH",body:{credentialsId:e.credentialsId,values:it(e.cellsToUpsert,t),referenceCell:{column:e.referenceCell.column,value:y(t)(e.referenceCell.value??"")}}});r(fe(s,"Succesfully updated a row in the sheet","Failed to update a row in the sheet"))},Po=async(e,{variables:t,updateVariableValue:o,updateVariables:r,apiHost:n,onNewLog:i,resultId:s})=>{if(!e.referenceCell||!e.cellsToExtract)return;let d=ge({credentialsId:e.credentialsId,referenceCell:{column:e.referenceCell.column,value:y(t)(e.referenceCell.value??"")},columns:e.cellsToExtract.map(l=>l.column),resultId:s},{indices:!1}),{data:u,error:p}=await se({url:`${n}/api/integrations/google-sheets/spreadsheets/${e.spreadsheetId}/sheets/${e.sheetId}?${d}`,method:"GET"});if(i(fe(p,"Succesfully fetched data from sheet","Failed to fetch data from sheet")),!u)return;let a=e.cellsToExtract.reduce((l,m)=>{let g=t.find(Pe(m.variableId)),h=u[m.column??""];return!g||!h?l:(o(g.id,h),[...l,{...g,value:h}])},[]);r(a)},it=(e,t)=>e.reduce((o,r)=>!r.column||!r.value?o:{...o,[r.column]:y(t)(r.value)},{}),Bo=async(e,{blockId:t,variables:o,updateVariableValue:r,updateVariables:n,typebotId:i,apiHost:s,resultValues:d,onNewLog:u,resultId:p})=>{let a=ge({resultId:p}),{data:l,error:m}=await se({url:`${s}/api/typebots/${i}/blocks/${t}/executeWebhook?${a}`,method:"POST",body:{variables:o,resultValues:d}}),g=l==null?void 0:l.statusCode.toString(),h=g?(g==null?void 0:g.startsWith("4"))||(g==null?void 0:g.startsWith("5")):!0;u({status:m?"error":h?"warning":"success",description:h?"Webhook returned an error":"Webhook successfuly executed",details:JSON.stringify(m??l,null,2).substring(0,1e3)});let w=e.options.responseVariableMapping.reduce((P,C)=>{if(!(C!=null&&C.bodyPath)||!C.variableId)return P;let T=o.find(Pe(C.variableId));if(!T)return P;let f=Function("data",`return data.${y(o)(C==null?void 0:C.bodyPath)}`);try{let c=f(l);return r(T==null?void 0:T.id,c),[...P,{...T,value:c}]}catch{return P}},[]);return n(w),e.outgoingEdgeId},No=async(e,{variables:t,apiHost:o,isPreview:r,onNewLog:n,resultId:i,typebotId:s,resultValues:d})=>{var a;if(r)return n({status:"info",description:"Emails are not sent in preview mode",details:null}),e.outgoingEdgeId;let{options:u}=e,{error:p}=await se({url:`${o}/api/typebots/${s}/integrations/email?resultId=${i}`,method:"POST",body:{credentialsId:u.credentialsId,recipients:u.recipients.map(y(t)),subject:y(t)(u.subject??""),body:y(t)(u.body??""),cc:(u.cc??[]).map(y(t)),bcc:(u.bcc??[]).map(y(t)),replyTo:u.replyTo?y(t)(u.replyTo):void 0,fileUrls:(a=t.find(Pe(u.attachmentsVariableId)))==null?void 0:a.value,isCustomBody:u.isCustomBody,isBodyCode:u.isBodyCode,resultValues:d}});return n(fe(p,"Succesfully sent an email","Failed to send an email")),e.outgoingEdgeId},fe=(e,t,o)=>({status:e?"error":"success",description:e?o:t,details:(e&&JSON.stringify(e,null,2).substring(0,1e3))??null});import{BubbleBlockType as Lo,InputBlockType as Be}from"models";import{isPossiblePhoneNumber as Vo}from"react-phone-number-input";import{isInputBlock as Ao}from"utils";var Fo=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,Do=/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/,st=(e,t)=>{switch(t){case Be.EMAIL:return Fo.test(e);case Be.PHONE:return Vo(e);case Be.URL:return Do.test(e)}return!0},at=e=>Ao(e)&&"retryMessageContent"in e.options,lt=(e,t,o)=>{let r=y(t)(e.options.retryMessageContent),n=e.id+Math.random()*1e3,i={id:(Math.random()*1e3).toString(),from:{blockId:n,groupId:e.groupId},to:{groupId:e.groupId,blockId:e.id}};return o(i),{groupId:e.groupId,id:n,type:Lo.TEXT,content:{html:`<div>${r}</div>`,richText:[],plainText:r},outgoingEdgeId:i.id}},dt=({from:e,to:t,hasTime:o,isRange:r})=>{let n=window.navigator.language,i={day:"2-digit",month:"2-digit",year:"numeric",hour:o?"2-digit":void 0,minute:o?"2-digit":void 0},s=new Date(e).toLocaleString(n,i),d=new Date(t).toLocaleString(n,i);return`${s}${r?` to ${d}`:""}`};import Oo,{createContext as zo,useContext as Mo,useState as Go}from"react";var ut=zo({}),pt=({children:e,resultId:t,onNewAnswer:o,onVariablesUpdated:r})=>{let[n,i]=Go({answers:[],variables:[],createdAt:new Date().toISOString()}),s=u=>(i(p=>({...p,answers:[...p.answers,u]})),o&&o(u)),d=u=>{let p=u.map(a=>({...a,value:re(a.value)}));i(a=>{let l=[...a.variables.filter(m=>p.every(g=>g.id!==m.id)),...p];return r&&r(l),{...a,variables:l}})};return Oo.createElement(ut.Provider,{value:{resultId:t,resultValues:n,addAnswer:s,updateVariables:d}},e)},U=()=>Mo(ut);import{LogicBlockType as _r}from"models";import Ho,{createContext as Uo,useContext as $o}from"react";var ct=Uo({}),mt=({children:e,onScroll:t})=>{let o=t;return Ho.createElement(ct.Provider,{value:{scroll:o}},e)},he=()=>$o(ct);import{isBubbleBlock as Wo,isInputBlock as jo}from"utils";var bt=(e,t)=>{var i;let o=((i=e.match(/(\w+)/g))==null?void 0:i.length)??0;o===0&&(o=e.length);let r=t.speed,n=t.enabled?o/r*6e4:0;return n>t.maxDelay*1e3&&(n=t.maxDelay*1e3),n},gt=e=>{var o;return(o=e.filter(r=>Wo(r)||jo(r)).pop())==null?void 0:o.type};import{BubbleBlockType as ve}from"models";import xe from"react";import Y,{useEffect as _o,useMemo as Qo,useRef as Xo,useState as Zo}from"react";import ye from"react";var Z=()=>ye.createElement("div",{className:"flex items-center"},ye.createElement("div",{className:"w-2 h-2 mr-1 rounded-full bubble1"}),ye.createElement("div",{className:"w-2 h-2 mr-1 rounded-full bubble2"}),ye.createElement("div",{className:"w-2 h-2 rounded-full bubble3"}));var Yo=400,ft=({block:e,onTransitionEnd:t})=>{var a;let{typebot:o,isLoading:r}=N(),n=Xo(null),[i,s]=Zo(!0),d=Qo(()=>{var l;return y(o.variables)((l=e.content)==null?void 0:l.url)},[(a=e.content)==null?void 0:a.url,o.variables]);_o(()=>{!i||r||u()},[r]);let u=()=>{setTimeout(()=>{s(!1),p()},1e3)},p=()=>{s(!1),setTimeout(()=>{t()},Yo)};return Y.createElement("div",{className:"flex flex-col w-full",ref:n},Y.createElement("div",{className:"flex mb-2 w-full lg:w-11/12 items-center"},Y.createElement("div",{className:"flex relative z-10 items-start typebot-host-bubble w-full"},Y.createElement("div",{className:"flex items-center absolute px-4 py-2 rounded-lg bubble-typing z-10 ",style:{width:i?"4rem":"100%",height:i?"2rem":"100%"}},i?Y.createElement(Z,null):Y.createElement(Y.Fragment,null)),Y.createElement("iframe",{id:"embed-bubble-content",src:d,className:"w-full z-20 p-4 content-opacity "+(i?"opacity-0":"opacity-100"),style:{height:i?"2rem":e.content.height,borderRadius:"15px"}}))))};import q,{useEffect as qo,useMemo as Jo,useRef as ht,useState as Ko}from"react";var Ro=400,er=5e3,yt=({block:e,onTransitionEnd:t})=>{var l;let{typebot:o,isLoading:r}=N(),n=ht(null),i=ht(null),[s,d]=Ko(!0),u=Jo(()=>{var m;return y(o.variables)((m=e.content)==null?void 0:m.url)},[(l=e.content)==null?void 0:l.url,o.variables]);qo(()=>{!s||r||p()},[r]);let p=()=>{if(!i.current)return;let m=setTimeout(()=>{d(!1),a()},er);i.current.onload=()=>{clearTimeout(m),d(!1),a()}},a=()=>{d(!1),setTimeout(()=>{t()},Ro)};return q.createElement("div",{className:"flex flex-col",ref:n},q.createElement("div",{className:"flex mb-2 w-full lg:w-11/12 items-center"},q.createElement("div",{className:"flex relative z-10 items-start typebot-host-bubble"},q.createElement("div",{className:"flex items-center absolute px-4 py-2 rounded-lg bubble-typing z-10 ",style:{width:s?"4rem":"100%",height:s?"2rem":"100%"}},s?q.createElement(Z,null):q.createElement(q.Fragment,null)),q.createElement("img",{ref:i,src:u,className:"p-4 content-opacity z-10 w-auto rounded-lg "+(s?"opacity-0":"opacity-100"),style:{maxHeight:"32rem",height:s?"2rem":"auto",maxWidth:"100%"},alt:"Bubble image"}))))};import J,{useEffect as tr,useRef as or,useState as wt}from"react";import{BubbleBlockType as rr}from"models";var nr=400,ir={enabled:!0,speed:300,maxDelay:1.5},vt=({block:e,onTransitionEnd:t})=>{let{typebot:o,isLoading:r}=N(),n=or(null),[i,s]=wt(!0),[d]=wt(y(o.variables)(e.content.html));tr(()=>{var a;if(!i||r)return;let p=bt(e.content.plainText,((a=o.settings)==null?void 0:a.typingEmulation)??ir);setTimeout(()=>{u()},p)},[r]);let u=()=>{s(!1),setTimeout(()=>{t()},nr)};return J.createElement("div",{className:"flex flex-col",ref:n},J.createElement("div",{className:"flex mb-2 w-full items-center"},J.createElement("div",{className:"flex relative items-start typebot-host-bubble"},J.createElement("div",{className:"flex items-center absolute px-4 py-2 rounded-lg bubble-typing ",style:{width:i?"4rem":"100%",height:i?"2rem":"100%"},"data-testid":"host-bubble"},i?J.createElement(Z,null):J.createElement(J.Fragment,null)),e.type===rr.TEXT&&J.createElement("p",{style:{textOverflow:"ellipsis"},className:"overflow-hidden content-opacity mx-4 my-2 whitespace-pre-wrap slate-html-container relative "+(i?"opacity-0 h-6":"opacity-100 h-full"),dangerouslySetInnerHTML:{__html:d}}))))};import V,{useEffect as sr,useMemo as ar,useRef as lr,useState as dr}from"react";import{VideoBubbleContentType as we}from"models";var ur=400;var xt=({block:e,onTransitionEnd:t})=>{let{typebot:o,isLoading:r}=N(),n=lr(null),[i,s]=dr(!0);sr(()=>{!i||r||d()},[r]);let d=()=>{setTimeout(()=>{s(!1),u()},1e3)},u=()=>{s(!1),setTimeout(()=>{t()},ur)};return V.createElement("div",{className:"flex flex-col",ref:n},V.createElement("div",{className:"flex mb-2 w-full lg:w-11/12 items-center"},V.createElement("div",{className:"flex relative z-10 items-start typebot-host-bubble"},V.createElement("div",{className:"flex items-center absolute px-4 py-2 rounded-lg bubble-typing z-10 ",style:{width:i?"4rem":"100%",height:i?"2rem":"100%"}},i?V.createElement(Z,null):V.createElement(V.Fragment,null)),V.createElement(pr,{content:e.content,isTyping:i,variables:o.variables}))))},pr=({content:e,isTyping:t,variables:o})=>{let r=ar(()=>y(o)(e==null?void 0:e.url),[o]);if(!(e!=null&&e.type))return V.createElement(V.Fragment,null);switch(e.type){case we.URL:let n=window.navigator.vendor.match(/apple/i);return V.createElement("video",{controls:!0,className:"p-4 focus:outline-none w-full z-10 content-opacity rounded-md "+(t?"opacity-0":"opacity-100"),style:{height:t?"2rem":"auto",maxHeight:n?"40vh":""},autoPlay:!0},V.createElement("source",{src:r,type:"video/mp4"}),"Sorry, your browser doesn't support embedded videos.");case we.VIMEO:case we.YOUTUBE:{let i=e.type===we.VIMEO?"https://player.vimeo.com/video":"https://www.youtube.com/embed";return V.createElement("iframe",{src:`${i}/${e.id}`,className:"w-full p-4 content-opacity z-10 rounded-md "+(t?"opacity-0":"opacity-100"),height:t?"2rem":"200px",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})}}};var It=({block:e,onTransitionEnd:t})=>{switch(e.type){case ve.TEXT:return xe.createElement(vt,{block:e,onTransitionEnd:t});case ve.IMAGE:return xe.createElement(yt,{block:e,onTransitionEnd:t});case ve.VIDEO:return xe.createElement(xt,{block:e,onTransitionEnd:t});case ve.EMBED:return xe.createElement(ft,{block:e,onTransitionEnd:t})}};import W,{useState as zt}from"react";import{InputBlockType as M}from"models";import Ie,{useState as Ct}from"react";import{CSSTransition as cr}from"react-transition-group";var kt=({message:e,showAvatar:t,avatarSrc:o,onClick:r})=>{let[n]=Ct(e),[i,s]=Ct(!1);return Ie.createElement(cr,{classNames:"bubble",timeout:1e3},Ie.createElement("div",{className:"flex justify-end mb-2 items-end",onMouseDown:()=>s(!1),onMouseMove:()=>s(!0),onMouseUp:()=>{s(!1),!i&&r()},style:{marginLeft:"50px"}},Ie.createElement("span",{className:"px-4 py-2 rounded-lg mr-2 whitespace-pre-wrap max-w-full typebot-guest-bubble cursor-pointer","data-testid":"guest-bubble"},n),t&&Ie.createElement(ce,{avatarSrc:o})))};import{InputBlockType as Ne}from"models";import Le,{useRef as gr,useState as fr}from"react";import R from"react";import Tt from"react";var St=e=>Tt.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",width:"19px",color:"white",...e},Tt.createElement("path",{d:"M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z"}));var D=({label:e,isDisabled:t,isLoading:o,disableIcon:r,...n})=>R.createElement("button",{type:"submit",disabled:t||o,...n,className:"py-2 px-4 justify-center font-semibold rounded-md text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 typebot-button "+n.className},o&&R.createElement(ae,{className:"text-white"}),R.createElement("span",{className:"xs:flex "+(r?"":"hidden")},e),R.createElement(St,{className:"send-icon flex "+(r?"hidden":"xs:hidden")})),ae=e=>R.createElement("svg",{...e,className:"animate-spin -ml-1 mr-3 h-5 w-5 "+e.className,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","data-testid":"loading-spinner"},R.createElement("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),R.createElement("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"}));import{InputBlockType as le}from"models";import $ from"react";import mr from"react-phone-number-input";var Et=({inputRef:e,block:t,value:o,onChange:r})=>{var s,d,u,p,a,l,m,g,h,w,P,C,T,f;let n=c=>r(c.target.value),i=c=>{r(c)};switch(t.type){case le.TEXT:return(s=t.options)!=null&&s.isLong?$.createElement(br,{ref:e,value:o,placeholder:((u=(d=t.options)==null?void 0:d.labels)==null?void 0:u.placeholder)??"Type your answer...",onChange:n}):$.createElement(Ce,{ref:e,value:o,placeholder:((a=(p=t.options)==null?void 0:p.labels)==null?void 0:a.placeholder)??"Type your answer...",onChange:n,name:"no-name"});case le.EMAIL:return $.createElement(Ce,{ref:e,value:o,placeholder:((m=(l=t.options)==null?void 0:l.labels)==null?void 0:m.placeholder)??"Type your email...",onChange:n,type:"email",autoComplete:"email"});case le.NUMBER:return $.createElement(Ce,{ref:e,value:o,placeholder:((h=(g=t.options)==null?void 0:g.labels)==null?void 0:h.placeholder)??"Type your answer...",onChange:n,type:"number",style:{appearance:"auto"},min:(w=t.options)==null?void 0:w.min,max:(P=t.options)==null?void 0:P.max,step:((C=t.options)==null?void 0:C.step)??"any"});case le.URL:return $.createElement(Ce,{ref:e,value:o,placeholder:((f=(T=t.options)==null?void 0:T.labels)==null?void 0:f.placeholder)??"Type your URL...",onChange:n,type:"url",autoComplete:"url"});case le.PHONE:return $.createElement(mr,{ref:e,value:o,onChange:i,placeholder:t.options.labels.placeholder??"Your phone number...",defaultCountry:t.options.defaultCountryCode,autoFocus:!be})}},Ce=$.forwardRef((e,t)=>$.createElement("input",{ref:t,className:"focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input",type:"text",style:{fontSize:"16px"},autoFocus:!be,...e})),br=$.forwardRef((e,t)=>$.createElement("textarea",{ref:t,className:"focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input",rows:6,"data-testid":"textarea",required:!0,style:{fontSize:"16px"},autoFocus:!be,...e}));var Ve=({block:e,onSubmit:t,defaultValue:o,hasGuestAvatar:r})=>{var m,g,h;let[n,i]=fr(o??""),s=gr(null),d=e.type===Ne.TEXT&&((m=e.options)==null?void 0:m.isLong),u=w=>{if(e.type===Ne.URL&&!w.startsWith("https://"))return w==="https:/"?void 0:i(`https://${w}`);i(w)},p=()=>{var w;return n!==""&&((w=s.current)==null?void 0:w.reportValidity())},a=()=>{p()&&t({value:n})};return Le.createElement("div",{className:"flex items-end justify-between rounded-lg pr-2 typebot-input w-full","data-testid":"input",style:{marginRight:r?"50px":"0.5rem",maxWidth:d?void 0:"350px"},onKeyDown:w=>{e.type===Ne.TEXT&&e.options.isLong||w.key==="Enter"&&a()}},Le.createElement(Et,{inputRef:s,block:e,onChange:u,value:n}),Le.createElement(D,{type:"button",label:((h=(g=e.options)==null?void 0:g.labels)==null?void 0:h.button)??"Send",isDisabled:n==="",className:"my-2 ml-2",onClick:a}))};import{byId as Dr}from"utils";import z,{useState as hr}from"react";var Pt=({onSubmit:e,options:t})=>{let{hasTime:o,isRange:r,labels:n}=t??{},[i,s]=hr({from:"",to:""});return z.createElement("div",{className:"flex flex-col w-full lg:w-4/6"},z.createElement("div",{className:"flex items-center"},z.createElement("form",{className:"flex justify-between rounded-lg typebot-input pr-2 items-end",onSubmit:d=>{i.from===""&&i.to===""||(d.preventDefault(),e({value:`${i.from}${r?` to ${i.to}`:""}`,label:dt({...i,hasTime:o,isRange:r})}))}},z.createElement("div",{className:"flex flex-col"},z.createElement("div",{className:"flex items-center p-4 "+(r?"pb-0":"")},r&&z.createElement("p",{className:"font-semibold mr-2"},(n==null?void 0:n.from)??"From:"),z.createElement("input",{className:"focus:outline-none flex-1 w-full text-input",style:{minHeight:"2rem",minWidth:"100px",fontSize:"16px"},type:o?"datetime-local":"date",onChange:d=>s({...i,from:d.target.value}),"data-testid":"from-date"})),r&&z.createElement("div",{className:"flex items-center p-4"},r&&z.createElement("p",{className:"font-semibold"},(n==null?void 0:n.to)??"To:"),z.createElement("input",{className:"focus:outline-none flex-1 w-full text-input ml-2",style:{minHeight:"2rem",minWidth:"100px",fontSize:"16px"},type:o?"datetime-local":"date",onChange:d=>s({...i,to:d.target.value}),"data-testid":"to-date"}))),z.createElement(D,{label:(n==null?void 0:n.button)??"Send",isDisabled:i.to===""&&i.from==="",className:"my-2 ml-2"}))))};import Q,{useState as yr}from"react";var Bt=({block:e,onSubmit:t})=>{var a;let{typebot:{variables:o}}=N(),{resultValues:r}=U(),[n,i]=yr([]),s=l=>m=>{var g;m.preventDefault(),(g=e.options)!=null&&g.isMultipleChoice?d(l):t({value:y(o)(e.items[l].content),itemId:e.items[l].id})},d=l=>{let m=n.indexOf(l);m!==-1?(n.splice(m,1),i([...n])):i([...n,l])},u=()=>t({value:n.map(l=>y(o)(e.items[l].content)).join(", ")}),p=r&&r.answers.length===0&&e.items.length===1;return Q.createElement("form",{className:"flex flex-col items-end",onSubmit:u},Q.createElement("div",{className:"flex flex-wrap justify-end"},e.items.map((l,m)=>{var g,h;return Q.createElement("span",{key:l.id,className:"relative inline-flex ml-2 mb-2"},Q.createElement("button",{role:(g=e.options)!=null&&g.isMultipleChoice?"checkbox":"button",onClick:s(m),className:"py-2 px-4 text-left font-semibold rounded-md transition-all filter hover:brightness-90 active:brightness-75 duration-100 focus:outline-none typebot-button "+(n.includes(m)||!((h=e.options)!=null&&h.isMultipleChoice)?"":"selectable"),"data-testid":"button","data-itemid":l.id},y(o)(l.content)),p&&Q.createElement("span",{className:"flex h-3 w-3 absolute top-0 right-0 -mt-1 -mr-1 ping"},Q.createElement("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full brightness-225 opacity-75"}),Q.createElement("span",{className:"relative inline-flex rounded-full h-3 w-3 brightness-200"})))})),Q.createElement("div",{className:"flex"},n.length>0&&Q.createElement(D,{label:((a=e.options)==null?void 0:a.buttonLabel)??"Send",disableIcon:!0})))};import{PaymentProvider as Sr}from"models";import Er from"react";import ee,{useEffect as Vt,useState as te}from"react";import{useStripe as vr,useElements as xr,PaymentElement as Ir}from"@stripe/react-stripe-js";import{Elements as Cr}from"@stripe/react-stripe-js";import{sendRequest as wr}from"utils";var Nt=({apiHost:e,isPreview:t,inputOptions:o,variables:r})=>wr({url:`${e}/api/integrations/stripe/createPaymentIntent`,method:"POST",body:{inputOptions:o,isPreview:t,variables:r}});import{useFrame as kr}from"react-frame-component";var Lt=e=>new Promise(t=>{if(e.getElementById("stripe-script"))return t();let r=e.createElement("script");r.src="https://js.stripe.com/v3",r.id="stripe-script",e.body.appendChild(r),r.onload=()=>{t()}});var At=({options:e,onSuccess:t})=>{let{apiHost:o,isPreview:r,typebot:{variables:n},onNewLog:i}=N(),{window:s,document:d}=kr(),[u,p]=te(null),[a,l]=te(""),[m,g]=te("");return Vt(()=>{(async()=>{let{data:h,error:w}=await Nt({apiHost:o,isPreview:r,variables:n,inputOptions:e});if(w)return i({status:"error",description:w.name+" "+w.message,details:w.message});!h||!d||(await Lt(d),s!=null&&s.Stripe&&(p(s.Stripe(h.publicKey)),l(h.clientSecret),g(h.amountLabel)))})()},[]),!u||!a?ee.createElement(ae,{className:"text-blue-500"}):ee.createElement(Cr,{stripe:u,options:{clientSecret:a}},ee.createElement(Tr,{onSuccess:t,clientSecret:a,amountLabel:m,options:e,variables:n,viewerHost:o}))},Tr=({onSuccess:e,clientSecret:t,amountLabel:o,options:r,variables:n,viewerHost:i})=>{let{scroll:s}=he(),[d,u]=te(!0),p=vr(),a=xr(),[l,m]=te(),[g,h]=te(!1),[w,P]=te(!1);return Vt(()=>{if(!(!p||!t)){if(d)return u(!1);p.retrievePaymentIntent(t).then(({paymentIntent:f})=>{switch(f==null?void 0:f.status){case"succeeded":m("Payment succeeded!");break;case"processing":m("Your payment is processing.");break;case"requires_payment_method":m("Your payment was not successful, please try again.");break;default:m("Something went wrong.");break}})}},[p,t]),ee.createElement("form",{id:"payment-form",onSubmit:async f=>{var v,x,B,L,G,F;if(f.preventDefault(),!p||!a)return;h(!0);let{error:c,paymentIntent:S}=await p.confirmPayment({elements:a,confirmParams:{return_url:i,payment_method_data:{billing_details:{name:(v=r.additionalInformation)!=null&&v.name?y(n)((x=r.additionalInformation)==null?void 0:x.name):void 0,email:(B=r.additionalInformation)!=null&&B.email?y(n)((L=r.additionalInformation)==null?void 0:L.email):void 0,phone:(G=r.additionalInformation)!=null&&G.phoneNumber?y(n)((F=r.additionalInformation)==null?void 0:F.phoneNumber):void 0}}},redirect:"if_required"});if(h(!1),(c==null?void 0:c.type)!=="validation_error"){if((c==null?void 0:c.type)==="card_error")return m(c.message);if(!c&&S.status==="succeeded")return e()}},className:"flex flex-col rounded-lg p-4 typebot-input w-full items-center"},ee.createElement(Ir,{id:"payment-element",className:"w-full",onReady:()=>{P(!0),s()}}),w&&ee.createElement(D,{label:`${r.labels.button} ${o}`,isDisabled:g||!p||!a,isLoading:g,className:"mt-4 w-full max-w-lg",disableIcon:!0}),l&&ee.createElement("div",{id:"payment-message",className:"typebot-input-error-message mt-4 text-center"},l))};var Ae=({onSuccess:e,options:t})=>{switch(t.provider){case Sr.STRIPE:return Er.createElement(At,{onSuccess:e,options:t})}};import X,{useState as Pr}from"react";import{isDefined as Fe,isEmpty as Br,isNotDefined as Nr}from"utils";var Ft=({block:e,onSubmit:t})=>{var s;let[o,r]=Pr(),n=d=>{d.preventDefault(),!Nr(o)&&t({value:o.toString()})},i=d=>r(d);return X.createElement("form",{className:"flex flex-col",onSubmit:n},e.options.labels.left&&X.createElement("span",{className:"text-sm w-full mb-2 rating-label"},e.options.labels.left),X.createElement("div",{className:"flex flex-wrap justify-center"},Array.from(Array(e.options.length+(e.options.buttonType==="Numbers"?1:0))).map((d,u)=>X.createElement(Lr,{...e.options,key:u,rating:o,idx:u+(e.options.buttonType==="Numbers"?0:1),onClick:i}))),e.options.labels.right&&X.createElement("span",{className:"text-sm w-full text-right mb-2 pr-2 rating-label"},e.options.labels.right),X.createElement("div",{className:"flex justify-end mr-2"},Fe(o)&&X.createElement(D,{label:((s=e.options)==null?void 0:s.labels.button)??"Send",disableIcon:!0})))},Lr=({rating:e,idx:t,buttonType:o,customIcon:r,onClick:n})=>o==="Numbers"?X.createElement("button",{onClick:i=>{i.preventDefault(),n(t)},className:"py-2 px-4 mr-2 mb-2 text-left font-semibold rounded-md transition-all filter hover:brightness-90 active:brightness-75 duration-100 focus:outline-none typebot-button "+(Fe(e)&&t<=e?"":"selectable")},t):X.createElement("div",{className:"flex justify-center items-center rating-icon-container cursor-pointer mr-2 mb-2 "+(Fe(e)&&t<=e?"selected":""),onClick:()=>n(t),dangerouslySetInnerHTML:{__html:r.isEnabled&&!Br(r.svg)?r.svg:Vr}}),Vr='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';import I,{useState as de}from"react";import{uploadFiles as Dt}from"utils";var Ot=({block:{id:e,options:{isMultipleAllowed:t,labels:o,sizeLimit:r,isRequired:n}},onSubmit:i,onSkip:s})=>{let{isPreview:d,currentTypebotId:u}=N(),{resultId:p}=U(),[a,l]=de([]),[m,g]=de(!1),[h,w]=de(0),[P,C]=de(!1),[T,f]=de(),c=async b=>{!b.target.files||S(b.target.files)},S=b=>{f(void 0);let E=Array.from(b);if(E.some(k=>k.size>(r??10)*1024*1024))return f(`A file is larger than ${r??10}MB`);if(!t&&b)return x(E[0]);l([...a,...E])},v=async b=>{b.preventDefault(),a.length!==0&&B(a)},x=async b=>{if(d)return i({label:"File uploaded",value:"http://fake-upload-url.com"});g(!0);let E=await Dt({basePath:`/api/typebots/${u}/blocks/${e}`,files:[{file:b,path:`public/results/${p}/${e}/${b.name}`}]});if(g(!1),E.length)return i({label:"File uploaded",value:E[0]??""});f("An error occured while uploading the file")},B=async b=>{if(d)return i({label:`${b.length} file${b.length>1?"s":""} uploaded`,value:b.map((k,H)=>`http://fake-upload-url.com/${H}`).join(", ")});g(!0);let E=await Dt({basePath:`/api/typebots/${u}/blocks/${e}`,files:b.map(k=>({file:k,path:`public/results/${p}/${e}/${k.name}`})),onUploadProgress:w});if(g(!1),w(0),E.length!==b.length)return f("An error occured while uploading the files");i({label:`${E.length} file${E.length>1?"s":""} uploaded`,value:E.join(", ")})},L=b=>{b.preventDefault(),C(!0)},G=()=>C(!1),F=b=>{b.preventDefault(),b.stopPropagation(),b.dataTransfer.files&&S(b.dataTransfer.files)},ue=()=>l([]);return I.createElement("form",{className:"flex flex-col w-full",onSubmit:v},I.createElement("label",{htmlFor:"dropzone-file",className:"typebot-upload-input py-6 flex flex-col justify-center items-center w-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 px-8 mb-2 "+(P?"dragging-over":""),onDragOver:L,onDragLeave:G,onDrop:F},m?I.createElement(I.Fragment,null,a.length===1?I.createElement(ae,null):I.createElement("div",{className:"w-full bg-gray-200 rounded-full h-2.5"},I.createElement("div",{className:"upload-progress-bar h-2.5 rounded-full",style:{width:`${h>0?h:10}%`,transition:"width 150ms cubic-bezier(0.4, 0, 0.2, 1)"}}))):I.createElement(I.Fragment,null,I.createElement("div",{className:"flex flex-col justify-center items-center"},a.length?I.createElement("span",{className:"relative"},I.createElement(Fr,null),I.createElement("div",{className:"total-files-indicator flex items-center justify-center absolute -right-1 rounded-full px-1 h-4",style:{bottom:"5px"}},a.length)):I.createElement(Ar,null),I.createElement("p",{className:"text-sm text-gray-500 text-center",dangerouslySetInnerHTML:{__html:o.placeholder}})),I.createElement("input",{id:"dropzone-file",type:"file",className:"hidden",multiple:t,onChange:c}))),a.length===0&&n===!1&&I.createElement("div",{className:"flex justify-end"},I.createElement("button",{className:"py-2 px-4 justify-center font-semibold rounded-md text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 typebot-button ",onClick:s},"Skip")),t&&a.length>0&&!m&&I.createElement("div",{className:"flex justify-end"},I.createElement("div",{className:"flex"},a.length&&I.createElement("button",{className:"secondary-button py-2 px-4 justify-center font-semibold rounded-md text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 mr-2",onClick:ue},"Clear"),I.createElement(D,{type:"submit",label:o.button?`${o.button} ${a.length} file${a.length>1?"s":""}`:"Upload",disableIcon:!0}))),T&&I.createElement("p",{className:"text-red-500 text-sm"},T))},Ar=()=>I.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"mb-3"},I.createElement("polyline",{points:"16 16 12 12 8 16"}),I.createElement("line",{x1:"12",y1:"12",x2:"12",y2:"21"}),I.createElement("path",{d:"M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"}),I.createElement("polyline",{points:"16 16 12 12 8 16"})),Fr=()=>I.createElement("svg",{className:"mb-3",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},I.createElement("path",{d:"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"}),I.createElement("polyline",{points:"13 2 13 9 20 9"}));var Mt=({block:e,hasAvatar:t,hasGuestAvatar:o,onTransitionEnd:r,onSkip:n})=>{var w,P,C;let{typebot:i}=N(),{addAnswer:s}=U(),[d,u]=zt(),[p,a]=zt(!1),{variableId:l}=e.options,m=i.settings.general.isInputPrefillEnabled??!0?l&&((w=i.variables.find(Dr(l)))==null?void 0:w.value):void 0,g=async({label:T,value:f,itemId:c})=>{u(T??f);let S=!st(f,e.type);!S&&s&&await s({blockId:e.id,groupId:e.groupId,content:f,variableId:l??null,uploadedFiles:e.type===M.FILE}),p||r({label:T,value:f,itemId:c},S),a(!1)},h=()=>{u(void 0),a(!0)};if(d){let T=(P=i.theme.chat.guestAvatar)==null?void 0:P.url;return W.createElement(kt,{message:d,showAvatar:((C=i.theme.chat.guestAvatar)==null?void 0:C.isEnabled)??!1,avatarSrc:T&&y(i.variables)(T),onClick:h})}return W.createElement("div",{className:"flex justify-end"},t&&W.createElement("div",{className:"flex w-6 xs:w-10 h-6 xs:h-10 mr-2 mb-2 mt-1 flex-shrink-0 items-center"}),W.createElement(Or,{block:e,onSubmit:g,onSkip:n,defaultValue:m==null?void 0:m.toString(),hasGuestAvatar:o}))},Or=({block:e,onSubmit:t,onSkip:o,defaultValue:r,hasGuestAvatar:n})=>{switch(e.type){case M.TEXT:case M.NUMBER:case M.EMAIL:case M.URL:case M.PHONE:return W.createElement(Ve,{block:e,onSubmit:t,defaultValue:r,hasGuestAvatar:n});case M.DATE:return W.createElement(Pt,{options:e.options,onSubmit:t});case M.CHOICE:return W.createElement(Bt,{block:e,onSubmit:t});case M.PAYMENT:return W.createElement(Ae,{options:e.options,onSuccess:()=>t({value:e.options.labels.success??"Success"})});case M.RATING:return W.createElement(Ft,{block:e,onSubmit:t});case M.FILE:return W.createElement(Ot,{block:e,onSubmit:t,onSkip:o})}};var Me=({blocks:e,startBlockIndex:t,groupTitle:o,onGroupEnd:r,keepShowingHostAvatar:n})=>{var ue;let{currentTypebotId:i,typebot:s,updateVariableValue:d,createEdge:u,apiHost:p,isPreview:a,onNewLog:l,injectLinkedTypebot:m,linkedTypebots:g,setCurrentTypebotId:h,pushEdgeIdInLinkedTypebotQueue:w}=N(),{resultValues:P,updateVariables:C,resultId:T}=U(),{scroll:f}=he(),[c,S]=Oe([]),[v,x]=Oe([]),B=b=>{if(S([...c,b]),Gr(b)){let E=gt(c);E&&Hr(E)?x(v.map((k,H)=>H===v.length-1?{bubbles:[...k.bubbles,b]}:k)):x([...v,{bubbles:[b]}])}Ht(b)&&(v.length===0||ze(v[v.length-1].input)?x([...v,{bubbles:[],input:b}]):x(v.map((E,k)=>k===v.length-1?{...E,input:b}:E)))};De(()=>{let b=e[t];b&&B(b)},[]),De(()=>{f(),L()},[c]);let L=async()=>{let b=[...c].pop();if(!!b){if(Wr(b)){let{nextEdgeId:E,linkedTypebot:k}=await rt(b,{isPreview:a,apiHost:p,typebot:s,linkedTypebots:g,updateVariableValue:d,updateVariables:C,injectLinkedTypebot:m,onNewLog:l,createEdge:u,setCurrentTypebotId:h,pushEdgeIdInLinkedTypebotQueue:w,currentTypebotId:i});if(b.type===_r.REDIRECT&&b.options.isNewTab===!1)return;E?r({edgeId:E,updatedTypebot:k}):G()}if($r(b)){let E=await nt({block:b,context:{apiHost:p,typebotId:i,groupId:b.groupId,blockId:b.id,variables:s.variables,isPreview:a,updateVariableValue:d,updateVariables:C,resultValues:P,groups:s.groups,onNewLog:l,resultId:T}});E?r({edgeId:E}):G()}b.type==="start"&&r({edgeId:b.outgoingEdgeId})}},G=(b,E)=>{var Ge,He;f();let k=[...c].pop();if(k){if(E&&at(k))return B(lt(k,s.variables,u));if(Ht(k)&&((Ge=k.options)==null?void 0:Ge.variableId)&&b&&d(k.options.variableId,b.value),Ur(k)&&!k.options.isMultipleChoice){let Ue=(He=k.items.find(jr(b==null?void 0:b.itemId)))==null?void 0:He.outgoingEdgeId;if(Ue)return r({edgeId:Ue})}if((k==null?void 0:k.outgoingEdgeId)||c.length===e.length)return r({edgeId:k.outgoingEdgeId})}let H=e[c.length+t];H?B(H):r({})},F=(ue=s.theme.chat.hostAvatar)==null?void 0:ue.url;return A.createElement("div",{className:"flex w-full","data-group-name":o},A.createElement("div",{className:"flex flex-col w-full min-w-0"},v.map((b,E)=>{var k,H;return A.createElement(Qr,{key:E,displayChunk:b,hostAvatar:{isEnabled:((k=s.theme.chat.hostAvatar)==null?void 0:k.isEnabled)??!0,src:F&&y(s.variables)(F)},hasGuestAvatar:((H=s.theme.chat.guestAvatar)==null?void 0:H.isEnabled)??!1,onDisplayNextBlock:G,keepShowingHostAvatar:n})})))},Qr=({displayChunk:{bubbles:e,input:t},hostAvatar:o,hasGuestAvatar:r,keepShowingHostAvatar:n,onDisplayNextBlock:i})=>{let[s,d]=Oe(!1),u=zr();De(()=>{a()});let p=()=>{i(),d(!0)},a=()=>{var l;return(l=u.current)==null?void 0:l.refreshTopOffset()};return A.createElement(A.Fragment,null,A.createElement("div",{className:"flex"},o.isEnabled&&e.length>0&&A.createElement(Ke,{ref:u,hostAvatarSrc:o.src,keepShowing:(n||ze(t))&&!s}),A.createElement("div",{className:"flex-1",style:{marginRight:r?"50px":"0.5rem"}},A.createElement(Mr,null,e.map(l=>A.createElement(Gt,{key:l.id,classNames:"bubble",timeout:500,unmountOnExit:!0},A.createElement(It,{block:l,onTransitionEnd:()=>{i(),a()}})))))),!s&&A.createElement(Gt,{classNames:"bubble",timeout:500,unmountOnExit:!0,in:ze(t)},t&&A.createElement(Mt,{block:t,onTransitionEnd:i,onSkip:p,hasAvatar:o.isEnabled,hasGuestAvatar:r})))};import{useFrame as en}from"react-frame-component";import{BackgroundType as Ut}from"models";var O={general:{bgImage:"--typebot-container-bg-image",bgColor:"--typebot-container-bg-color",fontFamily:"--typebot-container-font-family"},chat:{hostBubbles:{bgColor:"--typebot-host-bubble-bg-color",color:"--typebot-host-bubble-color"},guestBubbles:{bgColor:"--typebot-guest-bubble-bg-color",color:"--typebot-guest-bubble-color"},inputs:{bgColor:"--typebot-input-bg-color",color:"--typebot-input-color",placeholderColor:"--typebot-input-placeholder-color"},buttons:{bgColor:"--typebot-button-bg-color",color:"--typebot-button-color"}}},$t=(e,t)=>{!e||(e.general&&Xr(e.general,t),e.chat&&Zr(e.chat,t))},Xr=(e,t)=>{let{background:o,font:r}=e;r&&t.setProperty(O.general.fontFamily,r)},Zr=(e,t)=>{let{hostBubbles:o,guestBubbles:r,buttons:n,inputs:i}=e;o&&Yr(o,t),r&&qr(r,t),n&&Jr(n,t),i&&Kr(i,t)},Yr=(e,t)=>{e.backgroundColor&&t.setProperty(O.chat.hostBubbles.bgColor,e.backgroundColor),e.color&&t.setProperty(O.chat.hostBubbles.color,e.color)},qr=(e,t)=>{e.backgroundColor&&t.setProperty(O.chat.guestBubbles.bgColor,e.backgroundColor),e.color&&t.setProperty(O.chat.guestBubbles.color,e.color)},Jr=(e,t)=>{e.backgroundColor&&t.setProperty(O.chat.buttons.bgColor,e.backgroundColor),e.color&&t.setProperty(O.chat.buttons.color,e.color)},Kr=(e,t)=>{e.backgroundColor&&t.setProperty(O.chat.inputs.bgColor,e.backgroundColor),e.color&&t.setProperty(O.chat.inputs.color,e.color),e.placeholderColor&&t.setProperty(O.chat.inputs.placeholderColor,e.placeholderColor)},Rr=(e,t)=>{t.setProperty((e==null?void 0:e.type)===Ut.IMAGE?O.general.bgImage:O.general.bgColor,e.type===Ut.NONE?"transparent":e.content??"#ffffff")};import{byId as Te,isDefined as tn,isInputBlock as on,isNotDefined as rn}from"utils";import{animateScroll as nn}from"react-scroll";var Qt=({theme:e,predefinedVariables:t,startGroupId:o,onNewGroupVisible:r,onCompleted:n})=>{let{typebot:i,updateVariableValue:s,linkedBotQueue:d,popEdgeIdFromLinkedTypebotQueue:u}=N(),{document:p}=en(),[a,l]=_t([]),{updateVariables:m}=U(),g=jt(null),h=jt(null),[w,P]=_t(!1),C=({edgeId:c,updatedTypebot:S,groupId:v})=>{let x=S??i;if(v){let F=x.groups.find(Te(v));return F?(r({id:"edgeId",from:{groupId:"block",blockId:"block"},to:{groupId:v}}),l([...a,{group:F,startBlockIndex:0}])):void 0}let B=x.edges.find(Te(c));if(!B){if(d.length>0){let F=d[0].edgeId;u(),C({edgeId:F})}return n()}let L=x.groups.find(Te(B.to.groupId));if(!L)return n();let G=B.to.blockId?L.blocks.findIndex(Te(B.to.blockId)):0;r(B),l([...a,{group:L,startBlockIndex:G}])};Wt(()=>{if(w)return;if(tn(t)&&Object.keys(t).length>0){let S=T(t);m(S)}P(!0);let c=i.groups[0].blocks[0].outgoingEdgeId;!c&&!o||C({edgeId:o?void 0:c,groupId:o})},[t]);let T=c=>{let S=[];return Object.keys(c).forEach(v=>{let x=i.variables.find(L=>L.name.toLowerCase()===v.toLowerCase());if(!c||rn(x))return;let B=c[v];!B||(s(x==null?void 0:x.id,B),S.push({...x,value:B}))}),S};return Wt(()=>{!p||$t(e,p.body.style)},[e,p]),ke.createElement("div",{ref:h,className:"overflow-y-scroll w-full lg:w-3/4 min-h-full rounded lg:px-5 px-3 pt-10 relative scrollable-container typebot-chat-view"},ke.createElement(mt,{onScroll:()=>{!h.current||setTimeout(()=>{nn.scrollToBottom({duration:500,container:h.current})},1)}},a.map((c,S)=>{let v=a[S+1],x=v&&on(v.group.blocks[v.startBlockIndex]);return ke.createElement(Me,{key:c.group.id+S,blocks:c.group.blocks,startBlockIndex:c.startBlockIndex,onGroupEnd:C,groupTitle:c.group.title,keepShowingHostAvatar:S===a.length-1||x})})),ke.createElement("div",{className:"w-full h-32",ref:g}))};import{BackgroundType as pn}from"models";import Xt,{useEffect as sn,useRef as an}from"react";import{useFrame as ln}from"react-frame-component";var Zt=()=>{let{document:e}=ln(),t=an(null);return sn(()=>{if(!e)return;let o=e.querySelector('[data-testid="container"]'),r=new MutationObserver(function(n){n.forEach(function(i){i.removedNodes.forEach(function(s){s.id=="lite-badge"&&o.append(t.current)})})});return r.observe(o,{subtree:!1,childList:!0}),()=>{r.disconnect()}},[]),Xt.createElement("a",{ref:t,href:"https://www.typebot.io/?utm_source=litebadge",target:"_blank",rel:"noopener noreferrer",className:"fixed py-1 px-2 bg-white z-50 rounded shadow-md lite-badge",style:{bottom:"20px"},id:"lite-badge"},"Made with ",Xt.createElement("span",{className:"text-blue-500"},"Typebot"),".")};import{getViewerUrl as cn,isEmpty as mn}from"utils";var Sd=({typebot:e,apiHost:t=cn(),isPreview:o=!1,isLoading:r=!1,style:n,resultId:i,startGroupId:s,predefinedVariables:d,onNewLog:u,onNewGroupVisible:p,onNewAnswer:a,onCompleted:l,onVariablesUpdated:m})=>{var T,f,c,S,v;let g=dn(()=>{var x,B,L;return((L=(B=(x=e==null?void 0:e.theme)==null?void 0:x.general)==null?void 0:B.background)==null?void 0:L.type)===pn.COLOR?e.theme.general.background.content:"transparent"},[(f=(T=e==null?void 0:e.theme)==null?void 0:T.general)==null?void 0:f.background]),h=x=>p&&p(x),w=x=>a&&a(x),P=x=>u&&u(x),C=()=>l&&l();return mn(t)?j.createElement("p",null,"process.env.NEXT_PUBLIC_VIEWER_URL is missing in env"):j.createElement(un,{id:"typebot-iframe",head:j.createElement("style",null,Ze,Qe,(c=e.theme)==null?void 0:c.customCss,Xe),name:"Typebot viewer",style:{width:"100%",height:"100%",border:"none",...n}},j.createElement("style",{dangerouslySetInnerHTML:{__html:`@import url('https://fonts.googleapis.com/css2?family=${((v=(S=e==null?void 0:e.theme)==null?void 0:S.general)==null?void 0:v.font)??"Open Sans"}:wght@300;400;600&display=swap');`}}),j.createElement(_e,{typebot:e,apiHost:t,isPreview:o,onNewLog:P,isLoading:r},j.createElement(pt,{resultId:i,onNewAnswer:w,onVariablesUpdated:m},j.createElement("div",{className:"flex text-base overflow-hidden bg-cover h-screen w-screen flex-col items-center typebot-container",style:{backgroundColor:g??"transparent"},"data-testid":"container"},j.createElement("div",{className:"flex w-full h-full justify-center"},j.createElement(Qt,{theme:e.theme,onNewGroupVisible:h,onCompleted:C,predefinedVariables:d,startGroupId:s})),e.settings.general.isBrandingEnabled&&j.createElement(Zt,null)))))};export*from"util";export{Sd as TypebotViewer,y as parseVariables};
//# sourceMappingURL=index.mjs.map