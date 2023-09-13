var E=Object.defineProperty;var C=(s,t,e)=>t in s?E(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var d=(s,t,e)=>(C(s,typeof t!="symbol"?t+"":t,e),e);function P(){import.meta.url,import("_").catch(()=>1);async function*s(){}}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}})();class ${constructor(t){this.$el=typeof t=="string"?document.querySelector(t):t}html(t){return typeof t=="string"?(this.$el.innerHTML=t,this):this.$el.outerHTML.trim()}text(t){return typeof t=="string"?(this.$el.textContent=t,this):this.$el.tagName.toLowerCase()==="input"?this.$el.value.trim():this.$el.textContent.trim()}clear(){return this.html(""),this}on(t,e){this.$el.addEventListener(t,e)}off(t,e){this.$el.removeEventListener(t,e)}find(t){return n(this.$el.querySelector(t))}append(t){return t instanceof $&&(t=t.$el),Element.prototype.append?this.$el.append(t):this.$el.appendChild(t),this}get data(){return this.$el.dataset}closest(t){return n(this.$el.closest(t))}getCoords(){return this.$el.getBoundingClientRect()}findAll(t){return this.$el.querySelectorAll(t)}css(t={}){Object.keys(t).forEach(e=>this.$el.style[e]=t[e])}id(t){if(t){const e=this.id().split(":");return{row:+e[0],col:+e[1]}}return this.data.id}focus(){return this.$el.focus(),this}addClass(t){return this.$el.classList.add(t),this}removeClass(t){return this.$el.classList.remove(t),this}}function n(s){return new $(s)}n.create=(s,t="")=>{const e=document.createElement(s);return t&&e.classList.add(t),n(e)};class A{constructor(){this.listeners={}}emit(t,...e){return Array.isArray(this.listeners[t])?(this.listeners[t].forEach(i=>{i(...e)}),!0):!1}subscribe(t,e){return this.listeners[t]=this.listeners[t]||[],this.listeners[t].push(e),()=>{this.listeners[t]=this.listeners[t].filter(i=>i!==e)}}}class _{constructor(t,e){this.$el=n(t),this.components=e.components||[],this.emitter=new A}getRoot(){const t=n.create("div","excel"),e={emitter:this.emitter};return this.components=this.components.map(i=>{const r=n.create("div",i.className),o=new i(r,e);return r.html(o.toHTML()),t.append(r),o}),t}render(){this.$el.append(this.getRoot()),this.components.forEach(t=>t.init())}destroy(){this.components.forEach(t=>t.destroy())}}function N(s){return typeof s!="string"?"":s.charAt(0).toUpperCase()+s.slice(1)}function g(s,t){return s>t&&([t,s]=[s,t]),new Array(t-s+1).fill("").map((e,i)=>s+i)}function M(s,t){const e=s.id(!0),i=t.id(!0),r=g(i.col,e.col),o=g(i.row,e.row);return r.reduce((c,l)=>(o.forEach(h=>c.push(`${h}:${l}`)),c),[])}class z{constructor(t,e=[]){if(!t)throw new Error("No $root provider for DomListener");this.$root=t,this.listeners=e}initDOMListeners(){this.listeners.forEach(t=>{const e=y(t);if(!this[e]){const i=this.name||"";throw new Error(`Method ${e} is not implemented in ${i} Component`)}this[e]=this[e].bind(this),this.$root.on(t,this[e])})}removeDOMListeners(){this.listeners.forEach(t=>{const e=y(t);this.$root.off(t,this[e])})}}function y(s){return"on"+N(s)}class m extends z{constructor(t,e={}){super(t,e.listeners),this.name=e.name||"",this.emitter=e.emitter,this.unsubscribers=[],this.prepare()}prepare(){}toHTML(){return""}$emit(t,...e){this.emitter.emit(t,...e)}$on(t,e){const i=this.emitter.subscribe(t,e);this.unsubscribers.push(i)}init(){this.initDOMListeners()}destroy(){this.removeDOMListeners(),this.unsubscribers.forEach(t=>t())}}class v extends m{constructor(t,e){super(t,{name:"Header",listeners:[],...e})}toHTML(){return`
			<input type="text" class="input" value="Новая таблица" />
	
			<div>
	
			<div class="button">
				<i class="material-icons">delete</i>
			</div>
	
			<div class="button">
				<i class="material-icons">exit_to_app</i>
			</div>
	
			</div>
	  	`}}d(v,"className","excel__header");class w extends m{constructor(t,e){super(t,{name:"Toolbar",listeners:[],...e})}toHTML(){return`
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
		`}}d(w,"className","excel__toolbar");class x extends m{constructor(t,e){super(t,{name:"Formula",listeners:["input","keydown"],...e})}toHTML(){return`
			<div class="info">fx</div>
			<div id="formula" class="input" contenteditable spellcheck="false"></div>
		`}init(){super.init(),this.$formula=this.$root.find("#formula"),this.$on("table:select",t=>{this.$formula.text(t.text())}),this.$on("table:input",t=>{this.$formula.text(t.text())})}onInput(t){this.$emit("formula:input",n(t.target).text())}onKeydown(t){if(["Enter","Tab"].includes(t.key)){t.preventDefault();const i=t.target.textContent.trim();this.$emit("formula:done",i)}}}d(x,"className","excel__formula");const p={A:65,Z:90};function O(s){return function(t,e){return`
        	<div 
				class="cell" 
				contenteditable 
				data-col="${e}" 
				data-type='cell'
				data-id="${s}:${e}"
			></div>
    	`}}function D(s,t){return`
        <div class="column" data-type="resizable" data-col="${t}">
            ${s}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `}function b(s,t){return`
        <div class="row" data-type="resizable" data-row="${s}">
            <div class="row-info">
                ${s||""}
                ${s?'<div class="row-resize" data-resize="row"></div>':""}
            </div>
            <div class="row-data">${t}</div>
        </div>
    `}function T(s,t){return String.fromCharCode(p.A+t)}function H(s=34){const t=p.Z-p.A+1,e=[],i=new Array(t).fill("").map(T).map(D).join("");e.push(b(null,i));for(let r=0;r<s;r++){const o=new Array(t).fill("").map(O(r)).join("");e.push(b(r+1,o))}return e.join("")}function I(s,t){const e=n(t.target),i=e.closest('[data-type="resizable"]'),r=i.getCoords(),o=e.data.resize,c=o==="col"?"bottom":"right";let l;e.css({opacity:1,[c]:"-5000px"}),document.onmousemove=h=>{if(o==="col"){const u=h.pageX-r.right;l=r.width+u,e.css({right:-u+"px"})}else{const u=h.pageY-r.bottom;l=r.height+u,e.css({bottom:-u+"px"})}},document.onmouseup=h=>{document.onmousemove=null,document.onmouseup=null,o==="col"?(i.css({width:l+"px"}),s.findAll(`[data-col="${i.data.col}"]`).forEach(u=>{u.style.width=l+"px"})):i.css({height:l+"px"}),e.css({opacity:0,right:0,bottom:0})}}function U(s){return s.target.dataset.resize}function k(s){return s.target.dataset.type==="cell"}function R(s,{col:t,row:e}){switch(s){case"Enter":case"ArrowDown":e++;break;case"Tab":case"ArrowRight":t++;break;case"ArrowLeft":t=t-1<0?0:t-1;break;case"ArrowUp":e=e-1<0?0:e-1;break}return`[data-id="${e}:${t}"]`}const a=class a{constructor(){this.group=[],this.current=null}select(t){this.clear(),t.focus().addClass(a.className),this.group.push(t),this.current=t}clear(){this.group.forEach(t=>t.removeClass(a.className)),this.group.forEach(t=>t.removeClass(a.classNameGroup)),this.group=[]}selectGroup(t=[]){this.clear(),this.group=t,this.group.forEach(e=>e.addClass(a.classNameGroup))}};d(a,"className","selected"),d(a,"classNameGroup","selected-group");let f=a;class L extends m{constructor(t,e){super(t,{name:"Table",listeners:["mousedown","keydown","input"],...e})}toHTML(){return H(34)}prepare(){this.selection=new f}init(){super.init(),this.selectCell(this.$root.find('[data-id="0:0"]')),this.$on("formula:input",t=>{this.selection.current.text(t)}),this.$on("formula:done",t=>{this.selection.current.focus()})}selectCell(t){this.selection.select(t),this.$emit("table:select",t)}onMousedown(t){if(U(t))I(this.$root,t);else if(k(t)){const e=n(t.target);if(t.shiftKey){const i=M(e,this.selection.current).map(r=>this.$root.find(`[data-id='${r}']`));this.selection.selectGroup(i)}else this.selection.select(e)}}onKeydown(t){const e=["Enter","Tab","ArrowLeft","ArrowRight","ArrowDown","ArrowUp"],{key:i}=t;if(e.includes(i)&&!t.shiftKey){t.preventDefault();const r=this.selection.current.id(!0),o=this.$root.find(R(i,r));this.selectCell(o)}}onInput(t){this.$emit("table:input",n(t.target))}}d(L,"className","excel__table");const G=new _("#app",{components:[v,w,x,L]});G.render();export{P as __vite_legacy_guard};
