var _=Object.defineProperty;var w=(s,t,e)=>t in s?_(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var d=(s,t,e)=>(w(s,typeof t!="symbol"?t+"":t,e),e);function D(){import.meta.url,import("_").catch(()=>1);async function*s(){}}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function e(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=e(o);fetch(o.href,i)}})();class h{constructor(t){this.$el=typeof t=="string"?document.querySelector(t):t}html(t){return typeof t=="string"?(this.$el.innerHTML=t,this):this.$el.outerHTML.trim()}clear(){return this.html(""),this}on(t,e){this.$el.addEventListener(t,e)}off(t,e){this.$el.removeEventListener(t,e)}append(t){return t instanceof h&&(t=t.$el),Element.prototype.append?this.$el.append(t):this.$el.appendChild(t),this}get data(){return this.$el.dataset}closest(t){return c(this.$el.closest(t))}getCoords(){return this.$el.getBoundingClientRect()}findAll(t){return this.$el.querySelectorAll(t)}css(t={}){Object.keys(t).forEach(e=>this.$el.style[e]=t[e])}}function c(s){return new h(s)}c.create=(s,t="")=>{const e=document.createElement(s);return t&&e.classList.add(t),c(e)};class L{constructor(t,e){this.$el=c(t),this.components=e.components||[]}getRoot(){const t=c.create("div","excel");return this.components=this.components.map(e=>{const r=c.create("div",e.className),o=new e(r);return r.html(o.toHTML()),t.append(r),o}),t}render(){this.$el.append(this.getRoot()),this.components.forEach(t=>t.init())}}function x(s){return typeof s!="string"?"":s.charAt(0).toUpperCase()+s.slice(1)}class C{constructor(t,e=[]){if(!t)throw new Error("No $root provider for DomListener");this.$root=t,this.listeners=e}initDOMListeners(){this.listeners.forEach(t=>{const e=f(t);if(!this[e]){const r=this.name||"";throw new Error(`Method ${e} is not implemented in ${r} Component`)}this[e]=this[e].bind(this),this.$root.on(t,this[e])})}removeDOMListeners(){this.listeners.forEach(t=>{const e=f(t);this.$root.off(t,this[e])})}}function f(s){return"on"+x(s)}class u extends C{constructor(t,e={}){super(t,e.listeners),this.name=e.name||""}toHTML(){return""}init(){this.initDOMListeners()}destroy(){this.removeDOMListeners()}}class g extends u{toHTML(){return`
			<input type="text" class="input" value="Новая таблица" />
	
			<div>
	
			<div class="button">
				<i class="material-icons">delete</i>
			</div>
	
			<div class="button">
				<i class="material-icons">exit_to_app</i>
			</div>
	
			</div>
	  	`}}d(g,"className","excel__header");class $ extends u{constructor(t){super(t,{name:"Toolbar",listeners:["click"]})}toHTML(){return`
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
		`}onClick(t){console.log(t.target)}}d($,"className","excel__toolbar");class y extends u{constructor(t){super(t,{name:"Formula",listeners:["input","click"]})}toHTML(){return`
			<div class="info">fx</div>
			<div class="input" contenteditable spellcheck="false"></div>
		`}onInput(t){console.log("Formula: onInput",t.target.textContent.trim())}onClick(){console.log("first")}}d(y,"className","excel__formula");const p={A:65,Z:90};function M(s,t){return`
        <div class="cell" contenteditable data-col="${t}"></div>
    `}function z(s,t){return`
        <div class="column" data-type="resizable" data-col="${t}">
            ${s}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `}function v(s,t){return`
        <div class="row" data-type="resizable" data-row="${s}">
            <div class="row-info">
                ${s||""}
                ${s?'<div class="row-resize" data-resize="row"></div>':""}
            </div>
            <div class="row-data">${t}</div>
        </div>
    `}function E(s,t){return String.fromCharCode(p.A+t)}function O(s=34){const t=p.Z-p.A+1,e=[],r=new Array(t).fill("").map(E).map(z).join("");e.push(v(null,r));for(let o=0;o<s;o++){const i=new Array(t).fill("").map(M).join("");e.push(v(o+1,i))}return e.join("")}function A(s,t){const e=c(t.target),r=e.closest('[data-type="resizable"]'),o=r.getCoords(),i=e.data.resize,l=i==="col"?"bottom":"right";let a;e.css({opacity:1,[l]:"-5000px"}),document.onmousemove=m=>{if(i==="col"){const n=m.pageX-o.right;a=o.width+n,e.css({right:-n+"px"})}else{const n=m.pageY-o.bottom;a=o.height+n,e.css({bottom:-n+"px"})}},document.onmouseup=m=>{document.onmousemove=null,document.onmouseup=null,i==="col"?(r.css({width:a+"px"}),s.findAll(`[data-col="${r.data.col}"]`).forEach(n=>{n.style.width=a+"px"})):r.css({height:a+"px"}),e.css({opacity:0,right:0,bottom:0})}}function N(s){return s.target.dataset.resize}class b extends u{constructor(t){super(t,{listeners:["mousedown"]})}toHTML(){return O(34)}onMousedown(t){N(t)&&A(this.$root,t)}}d(b,"className","excel__table");const T=new L("#app",{components:[g,$,y,b]});T.render();export{D as __vite_legacy_guard};
