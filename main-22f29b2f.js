var $=Object.defineProperty;var y=(s,t,e)=>t in s?$(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var c=(s,t,e)=>(y(s,typeof t!="symbol"?t+"":t,e),e);function N(){import.meta.url,import("_").catch(()=>1);async function*s(){}}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();class d{constructor(t){this.$el=typeof t=="string"?document.querySelector(t):t}html(t){return typeof t=="string"?(this.$el.innerHTML=t,this):this.$el.outerHTML.trim()}clear(){return this.html(""),this}on(t,e){this.$el.addEventListener(t,e)}off(t,e){this.$el.removeEventListener(t,e)}append(t){return t instanceof d&&(t=t.$el),Element.prototype.append?this.$el.append(t):this.$el.appendChild(t),this}get data(){return this.$el.dataset}closest(t){return r(this.$el.closest(t))}getCoords(){return this.$el.getBoundingClientRect()}findAll(t){return this.$el.querySelectorAll(t)}css(t={}){Object.keys(t).forEach(e=>this.$el.style[e]=t[e])}}function r(s){return new d(s)}r.create=(s,t="")=>{const e=document.createElement(s);return t&&e.classList.add(t),r(e)};class _{constructor(t,e){this.$el=r(t),this.components=e.components||[]}getRoot(){const t=r.create("div","excel");return this.components=this.components.map(e=>{const n=r.create("div",e.className),i=new e(n);return n.html(i.toHTML()),t.append(n),i}),t}render(){this.$el.append(this.getRoot()),this.components.forEach(t=>t.init())}}function L(s){return typeof s!="string"?"":s.charAt(0).toUpperCase()+s.slice(1)}class b{constructor(t,e=[]){if(!t)throw new Error("No $root provider for DomListener");this.$root=t,this.listeners=e}initDOMListeners(){console.log(this.listeners,this.$root),this.listeners.forEach(t=>{const e=m(t);if(!this[e]){const n=this.name||"";throw new Error(`Method ${e} is not implemented in ${n} Component`)}this[e]=this[e].bind(this),this.$root.on(t,this[e])})}removeDOMListeners(){this.listeners.forEach(t=>{const e=m(t);this.$root.off(t,this[e])})}}function m(s){return"on"+L(s)}class l extends b{constructor(t,e={}){super(t,e.listeners),this.name=e.name||""}toHTML(){return""}init(){this.initDOMListeners()}destroy(){this.removeDOMListeners()}}class h extends l{toHTML(){return`
			<input type="text" class="input" value="Новая таблица" />
	
			<div>
	
			<div class="button">
				<i class="material-icons">delete</i>
			</div>
	
			<div class="button">
				<i class="material-icons">exit_to_app</i>
			</div>
	
			</div>
	  	`}}c(h,"className","excel__header");class p extends l{constructor(t){super(t,{name:"Toolbar",listeners:["click"]})}toHTML(){return`
			<div class="button">
				<i class="material-icons">format_align_left</i>
				</div>
		
				<div class="button">
				<i class="material-icons">format_align_center</i>
				</div>
		
				<div class="button">
				<i class="material-icons">format_align_right</i>
				</div>
		
				<div class="button">
				<i class="material-icons">format_bold</i>
				</div>
		
				<div class="button">
				<i class="material-icons">format_italic</i>
				</div>
		
				<div class="button">
				<i class="material-icons">format_underlined</i>
			</div>
		`}onClick(t){console.log(t.target)}}c(p,"className","excel__toolbar");class v extends l{constructor(t){super(t,{name:"Formula",listeners:["input","click"]})}toHTML(){return`
			<div class="info">fx</div>
			<div class="input" contenteditable spellcheck="false"></div>
		`}onInput(t){console.log("Formula: onInput",t.target.textContent.trim())}onClick(){console.log("first")}}c(v,"className","excel__formula");const u={A:65,Z:90};function x(){return`
        <div class="cell" contenteditable></div>
    `}function w(s){return`
        <div class="column">${s}</div>   
    `}function f(s,t){return`
        <div class="row">
            <div class="row-info">${s||""}</div>
            <div class="row-data">${t}</div>
        </div>
    `}function C(s,t){return String.fromCharCode(u.A+t)}function M(s=34){const t=u.Z-u.A+1,e=[],n=new Array(t).fill("").map(C).map(w).join("");e.push(f(null,n));for(let i=0;i<s;i++){const o=new Array(t).fill("").map(x).join("");e.push(f(i+1,o))}return e.join("")}class g extends l{toHTML(){return M()}}c(g,"className","excel__table");const E=new _("#app",{components:[h,p,v,g]});E.render();export{N as __vite_legacy_guard};
