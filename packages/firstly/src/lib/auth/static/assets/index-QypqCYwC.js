const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Page-Cfysx_UV.js","assets/Page-BGTO8LC5.css"])))=>i.map(i=>d[i]);
var me=Object.defineProperty;var ye=(e,t,n)=>t in e?me(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var v=(e,t,n)=>ye(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const ge="modulepreload",be=function(e){return"/api/static/"+e},X={},R=function(t,n,o){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),c=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));s=Promise.all(n.map(u=>{if(u=be(u),u in X)return;X[u]=!0;const l=u.endsWith(".css"),i=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${i}`))return;const a=document.createElement("link");if(a.rel=l?"stylesheet":ge,l||(a.as="script",a.crossOrigin=""),a.href=u,c&&a.setAttribute("nonce",c),document.head.appendChild(a),l)return new Promise((f,d)=>{a.addEventListener("load",f),a.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${u}`)))})}))}return s.then(()=>t()).catch(r=>{const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=r,window.dispatchEvent(c),!c.defaultPrevented)throw r})};function _(){}function ve(e,t){for(const n in t)e[n]=t[n];return e}function we(e){return!!e&&(typeof e=="object"||typeof e=="function")&&typeof e.then=="function"}function N(e,t,n,o,s){e.__svelte_meta={loc:{file:t,line:n,column:o,char:s}}}function te(e){return e()}function z(){return Object.create(null)}function S(e){e.forEach(te)}function T(e){return typeof e=="function"}function $e(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function Ye(e,t){return e!=e?t==t:e!==t}function ke(e){return Object.keys(e).length===0}function Ze(e,t){if(e!=null&&typeof e.subscribe!="function")throw new Error(`'${t}' is not a store with a 'subscribe' method`)}function ne(e,...t){if(e==null){for(const o of t)o(void 0);return _}const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function et(e){let t;return ne(e,n=>t=n)(),t}function tt(e,t,n){e.$$.on_destroy.push(ne(t,n))}function nt(e,t,n,o){if(e){const s=oe(e,t,n,o);return e[0](s)}}function oe(e,t,n,o){return e[1]&&o?ve(n.ctx.slice(),e[1](o(t))):n.ctx}function ot(e,t,n,o){if(e[2]&&o){const s=e[2](o(n));if(t.dirty===void 0)return s;if(typeof s=="object"){const r=[],c=Math.max(t.dirty.length,s.length);for(let u=0;u<c;u+=1)r[u]=t.dirty[u]|s[u];return r}return t.dirty|s}return t.dirty}function rt(e,t,n,o,s,r){if(s){const c=oe(t,n,o,r);e.p(c,s)}}function st(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let o=0;o<n;o++)t[o]=-1;return t}return-1}function ct(e){const t={};for(const n in e)n[0]!=="$"&&(t[n]=e[n]);return t}function it(e,t){const n={};t=new Set(t);for(const o in e)!t.has(o)&&o[0]!=="$"&&(n[o]=e[o]);return n}function ut(e,t,n){return e.set(n),t}function lt(e){return e&&T(e.destroy)?e.destroy:_}const Ee=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function De(e,t){e.appendChild(t)}function Oe(e,t,n){e.insertBefore(t,n||null)}function re(e){e.parentNode&&e.parentNode.removeChild(e)}function Se(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function q(e){return document.createElement(e)}function V(e){return document.createTextNode(e)}function se(){return V(" ")}function ce(){return V("")}function Ae(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function ft(e){return function(t){return t.preventDefault(),e.call(this,t)}}function ie(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}const Re=["width","height"];function at(e,t){const n=Object.getOwnPropertyDescriptors(e.__proto__);for(const o in t)t[o]==null?e.removeAttribute(o):o==="style"?e.style.cssText=t[o]:o==="__value"?e.value=e[o]=t[o]:n[o]&&n[o].set&&Re.indexOf(o)===-1?e[o]=t[o]:ie(e,o,t[o])}function xe(e){return Array.from(e.childNodes)}function dt(e,t){e.value=t??""}function _t(e,t,n){e.classList.toggle(t,!!n)}function Pe(e,t,{bubbles:n=!1,cancelable:o=!1}={}){return new CustomEvent(e,{detail:t,bubbles:n,cancelable:o})}let D;function p(e){D=e}function E(){if(!D)throw new Error("Function called outside component initialization");return D}function G(e){E().$$.on_mount.push(e)}function ht(e){E().$$.on_destroy.push(e)}function pt(e,t){return E().$$.context.set(e,t),t}function mt(e){return E().$$.context.get(e)}function yt(e){return E().$$.context.has(e)}function gt(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach(o=>o.call(this,t))}const $=[],H=[];let k=[];const P=[],je=Promise.resolve();let j=!1;function Ce(){j||(j=!0,je.then(F))}function C(e){k.push(e)}function bt(e){P.push(e)}const x=new Set;let w=0;function F(){if(w!==0)return;const e=D;do{try{for(;w<$.length;){const t=$[w];w++,p(t),Le(t.$$)}}catch(t){throw $.length=0,w=0,t}for(p(null),$.length=0,w=0;H.length;)H.pop()();for(let t=0;t<k.length;t+=1){const n=k[t];x.has(n)||(x.add(n),n())}k.length=0}while($.length);for(;P.length;)P.pop()();j=!1,x.clear(),p(e)}function Le(e){if(e.fragment!==null){e.update(),S(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(C)}}function Me(e){const t=[],n=[];k.forEach(o=>e.indexOf(o)===-1?t.push(o):n.push(o)),n.forEach(o=>o()),k=t}const A=new Set;let g;function ue(){g={r:0,c:[],p:g}}function le(){g.r||S(g.c),g=g.p}function b(e,t){e&&e.i&&(A.delete(e),e.i(t))}function O(e,t,n,o){if(e&&e.o){if(A.has(e))return;A.add(e),g.c.push(()=>{A.delete(e),o&&(n&&e.d(1),o())}),e.o(t)}else o&&o()}function J(e,t){const n=t.token={};function o(s,r,c,u){if(t.token!==n)return;t.resolved=u;let l=t.ctx;c!==void 0&&(l=l.slice(),l[c]=u);const i=s&&(t.current=s)(l);let a=!1;t.block&&(t.blocks?t.blocks.forEach((f,d)=>{d!==r&&f&&(ue(),O(f,1,1,()=>{t.blocks[d]===f&&(t.blocks[d]=null)}),le())}):t.block.d(1),i.c(),b(i,1),i.m(t.mount(),t.anchor),a=!0),t.block=i,t.blocks&&(t.blocks[r]=i),a&&F()}if(we(e)){const s=E();if(e.then(r=>{p(s),o(t.then,1,t.value,r),p(null)},r=>{if(p(s),o(t.catch,2,t.error,r),p(null),!t.hasCatch)throw r}),t.current!==t.pending)return o(t.pending,0),!0}else{if(t.current!==t.then)return o(t.then,1,t.value,e),!0;t.resolved=e}}function Be(e,t,n){const o=t.slice(),{resolved:s}=e;e.current===e.then&&(o[e.value]=s),e.current===e.catch&&(o[e.error]=s),e.block.p(o,n)}function Ie(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function vt(e,t,n){const o=e.$$.props[t];o!==void 0&&(e.$$.bound[o]=n,n(e.$$.ctx[o]))}function Ne(e){e&&e.c()}function fe(e,t,n){const{fragment:o,after_update:s}=e.$$;o&&o.m(t,n),C(()=>{const r=e.$$.on_mount.map(te).filter(T);e.$$.on_destroy?e.$$.on_destroy.push(...r):S(r),e.$$.on_mount=[]}),s.forEach(C)}function ae(e,t){const n=e.$$;n.fragment!==null&&(Me(n.after_update),S(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Te(e,t){e.$$.dirty[0]===-1&&($.push(e),Ce(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function qe(e,t,n,o,s,r,c=null,u=[-1]){const l=D;p(e);const i=e.$$={fragment:null,ctx:[],props:r,update:_,not_equal:s,bound:z(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(l?l.$$.context:[])),callbacks:z(),dirty:u,skip_bound:!1,root:t.target||l.$$.root};c&&c(i.root);let a=!1;if(i.ctx=n?n(e,t.props||{},(f,d,...K)=>{const W=K.length?K[0]:d;return i.ctx&&s(i.ctx[f],i.ctx[f]=W)&&(!i.skip_bound&&i.bound[f]&&i.bound[f](W),a&&Te(e,f)),d}):[],i.update(),a=!0,S(i.before_update),i.fragment=o?o(i.ctx):!1,t.target){if(t.hydrate){const f=xe(t.target);i.fragment&&i.fragment.l(f),f.forEach(re)}else i.fragment&&i.fragment.c();t.intro&&b(e.$$.fragment),fe(e,t.target,t.anchor),F()}p(l)}class Ve{constructor(){v(this,"$$");v(this,"$$set")}$destroy(){ae(this,1),this.$destroy=_}$on(t,n){if(!T(n))return _;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const s=o.indexOf(n);s!==-1&&o.splice(s,1)}}$set(t){this.$$set&&!ke(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Fe="4.2.18",Ue="4";function h(e,t){document.dispatchEvent(Pe(e,{version:Fe,...t},{bubbles:!0}))}function wt(e,t){h("SvelteDOMInsert",{target:e,node:t}),De(e,t)}function m(e,t,n){h("SvelteDOMInsert",{target:e,node:t,anchor:n}),Oe(e,t,n)}function y(e){h("SvelteDOMRemove",{node:e}),re(e)}function Ke(e,t,n,o,s,r,c){const u=o===!0?["capture"]:o?Array.from(Object.keys(o)):[];s&&u.push("preventDefault"),r&&u.push("stopPropagation"),c&&u.push("stopImmediatePropagation"),h("SvelteDOMAddEventListener",{node:e,event:t,handler:n,modifiers:u});const l=Ae(e,t,n,o);return()=>{h("SvelteDOMRemoveEventListener",{node:e,event:t,handler:n,modifiers:u}),l()}}function de(e,t,n){ie(e,t,n),n==null?h("SvelteDOMRemoveAttribute",{node:e,attribute:t}):h("SvelteDOMSetAttribute",{node:e,attribute:t,value:n})}function We(e,t){t=""+t,e.data!==t&&(h("SvelteDOMSetData",{node:e,data:t}),e.data=t)}function Q(e){if(typeof e!="string"&&!(e&&typeof e=="object"&&"length"in e)&&!(typeof Symbol=="function"&&e&&Symbol.iterator in e))throw new Error("{#each} only works with iterable values.");return Ie(e)}function Xe(e,t,n){for(const o of Object.keys(t))~n.indexOf(o)||console.warn(`<${e}> received an unexpected slot "${o}".`)}class ze extends Ve{constructor(n){if(!n||!n.target&&!n.$$inline)throw new Error("'target' is a required option");super();v(this,"$$prop_def");v(this,"$$events_def");v(this,"$$slot_def")}$destroy(){super.$destroy(),this.$destroy=()=>{console.warn("Component was already destroyed")}}$capture_state(){}$inject_state(){}}typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Ue);const{Object:Ge,console:Y}=Ee,U="src/App.svelte";function Z(e,t,n){const o=e.slice();return o[6]=t[n],o}function ee(e){e[9]=e[10].default}function L(e){let t,n,o,s={ctx:e,current:null,token:null,hasCatch:!1,pending:pe,then:he,catch:_e,value:10,blocks:[,,,]};J(n=e[1],s);const r={c:function(){t=ce(),s.block.c()},m:function(u,l){m(u,t,l),s.block.m(u,s.anchor=l),s.mount=()=>t.parentNode,s.anchor=t,o=!0},p:function(u,l){e=u,s.ctx=e,l&2&&n!==(n=e[1])&&J(n,s)||Be(s,e,l)},i:function(u){o||(b(s.block),o=!0)},o:function(u){for(let l=0;l<3;l+=1){const i=s.blocks[l];O(i)}o=!1},d:function(u){u&&y(t),s.block.d(u),s.token=null,s=null}};return h("SvelteRegisterBlock",{block:r,id:L.name,type:"if",source:"(19:2) {#if activeModuleRef}",ctx:e}),r}function _e(e){const t={c:_,m:_,p:_,i:_,o:_,d:_};return h("SvelteRegisterBlock",{block:t,id:_e.name,type:"catch",source:'(1:0) <script lang=\\"ts\\">import { onMount }',ctx:e}),t}function he(e){ee(e);let t,n;t=new e[9]({props:{firstlyData:e[0]},$$inline:!0});const o={c:function(){Ne(t.$$.fragment)},m:function(r,c){fe(t,r,c),n=!0},p:function(r,c){ee(r);const u={};c&1&&(u.firstlyData=r[0]),t.$set(u)},i:function(r){n||(b(t.$$.fragment,r),n=!0)},o:function(r){O(t.$$.fragment,r),n=!1},d:function(r){ae(t,r)}};return h("SvelteRegisterBlock",{block:o,id:he.name,type:"then",source:"(20:62)        <ModuleComponent {firstlyData}",ctx:e}),o}function pe(e){const t={c:_,m:_,p:_,i:_,o:_,d:_};return h("SvelteRegisterBlock",{block:t,id:pe.name,type:"pending",source:'(1:0) <script lang=\\"ts\\">import { onMount }',ctx:e}),t}function M(e){let t=console.info(e[0])+"",n,o,s,r=Q(e[3]()),c=[];for(let l=0;l<r.length;l+=1)c[l]=B(Z(e,r,l));const u={c:function(){n=V(t),o=se(),s=q("div");for(let i=0;i<c.length;i+=1)c[i].c();de(s,"class","debug s-XsEmFtvddWTw"),N(s,U,38,2,681)},m:function(i,a){m(i,n,a),m(i,o,a),m(i,s,a);for(let f=0;f<c.length;f+=1)c[f]&&c[f].m(s,null)},p:function(i,a){if(a&1&&t!==(t=console.info(i[0])+"")&&We(n,t),a&12){r=Q(i[3]());let f;for(f=0;f<r.length;f+=1){const d=Z(i,r,f);c[f]?c[f].p(d,a):(c[f]=B(d),c[f].c(),c[f].m(s,null))}for(;f<c.length;f+=1)c[f].d(1);c.length=r.length}},d:function(i){i&&(y(n),y(o),y(s)),Se(c,i)}};return h("SvelteRegisterBlock",{block:u,id:M.name,type:"if",source:"(26:0) {#if firstlyData.debug}",ctx:e}),u}function B(e){let t,n,o;function s(){return e[4](e[6])}const r={c:function(){t=q("button"),t.textContent=`Load ${e[6]}`,de(t,"class","s-XsEmFtvddWTw"),N(t,U,40,6,739)},m:function(u,l){m(u,t,l),n||(o=Ke(t,"click",s,!1,!1,!1,!1),n=!0)},p:function(u,l){e=u},d:function(u){u&&y(t),n=!1,o()}};return h("SvelteRegisterBlock",{block:r,id:B.name,type:"each",source:"(29:4) {#each getKeys() as module}",ctx:e}),r}function I(e){let t,n,o,s,r=e[1]&&L(e),c=e[0].debug&&M(e);const u={c:function(){t=q("main"),r&&r.c(),n=se(),c&&c.c(),o=ce(),N(t,U,28,0,461)},l:function(i){throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option")},m:function(i,a){m(i,t,a),r&&r.m(t,null),m(i,n,a),c&&c.m(i,a),m(i,o,a),s=!0},p:function(i,[a]){i[1]?r?(r.p(i,a),a&2&&b(r,1)):(r=L(i),r.c(),b(r,1),r.m(t,null)):r&&(ue(),O(r,1,1,()=>{r=null}),le()),i[0].debug?c?c.p(i,a):(c=M(i),c.c(),c.m(o.parentNode,o)):c&&(c.d(1),c=null)},i:function(i){s||(b(r),s=!0)},o:function(i){O(r),s=!1},d:function(i){i&&(y(t),y(n),y(o)),r&&r.d(),c&&c.d(i)}};return h("SvelteRegisterBlock",{block:u,id:I.name,type:"component",source:"",ctx:e}),u}function He(e,t,n){let{$$slots:o={},$$scope:s}=t;Xe("App",o,[]);let{firstlyData:r}=t;const c={auth:R(()=>import("./Page-Cfysx_UV.js"),__vite__mapDeps([0,1])),admin:R(()=>import("./Page-BEFYPjis.js"),[]),storage:R(()=>import("./Page-DtgkOCJs.js"),[])};let u;function l(d){n(1,u=c[d])}const i=()=>Object.keys(c);G(()=>{l(r.module)}),e.$$.on_mount.push(function(){r===void 0&&!("firstlyData"in t||e.$$.bound[e.$$.props.firstlyData])&&Y.warn("<App> was created without expected prop 'firstlyData'")});const a=["firstlyData"];Ge.keys(t).forEach(d=>{!~a.indexOf(d)&&d.slice(0,2)!=="$$"&&d!=="slot"&&Y.warn(`<App> was created with unknown prop '${d}'`)});const f=d=>l(d);return e.$$set=d=>{"firstlyData"in d&&n(0,r=d.firstlyData)},e.$capture_state=()=>({onMount:G,firstlyData:r,modules:c,activeModuleRef:u,loadModule:l,getKeys:i}),e.$inject_state=d=>{"firstlyData"in d&&n(0,r=d.firstlyData),"activeModuleRef"in d&&n(1,u=d.activeModuleRef)},t&&"$$inject"in t&&e.$inject_state(t.$$inject),[r,u,l,i,f]}class Je extends ze{constructor(t){super(t),qe(this,t,He,I,$e,{firstlyData:0}),h("SvelteRegisterComponent",{component:this,tagName:"App",options:t,id:I.name})}get firstlyData(){throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set firstlyData(t){throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}}new Je({target:document.getElementById("app"),props:{firstlyData}});export{rt as A,st as B,ot as C,ve as D,it as E,ct as F,q as G,at as H,N as I,lt as J,Ke as K,gt as L,V as M,se as N,de as O,_t as P,wt as Q,dt as R,ze as S,ft as T,We as U,Ne as V,fe as W,ae as X,H as Y,vt as Z,bt as _,$e as a,qe as b,Ye as c,h as d,Ee as e,tt as f,et as g,Xe as h,T as i,yt as j,mt as k,pt as l,ut as m,_ as n,ht as o,nt as p,ce as q,S as r,ne as s,m as t,b as u,Ze as v,ue as w,O as x,le as y,y as z};