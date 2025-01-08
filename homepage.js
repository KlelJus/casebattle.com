import{f as t,A as e,r as s,a as i}from'./api-CaGmJ7Hv.js';class l{constructor(){this.events={}}_getEventListByName(t){return void 0===this.events[t]&&(this.events[t]=new Set),this.events[t]}on(t,e){this._getEventListByName(t).add(e)}once(t,e){const s=this,i=(...l)=>{s.removeListener(t,i),e.apply(s,l)};this.on(t,i)}emit(t,...e){this._getEventListByName(t).forEach(function(t){t.apply(this,e)}.bind(this))}removeListener(t,e){this._getEventListByName(t).delete(e)}}class a{constructor(){this.parentEl=document.querySelector('#filter'),this.inputEl=this.parentEl.querySelector('input[type="search"]'),this.checkboxEl=this.parentEl.querySelector('input[type="checkbox"]'),this.inputEl.addEventListener('input',this.fn.bind(this)),this.favCountEl=this.parentEl.querySelector('#favorite-count'),this.checkboxEl&&this.checkboxEl.addEventListener('change',this.fn.bind(this)),this.eventEmitter=new l,this.STATES={OFF:0,SEARCH_MODE:1,FAV_MODE:2},this.state=this.STATES.OFF,window.onload=this.fn.bind(this)}on(t,e){this.eventEmitter.on(t,e)}set query(t){this._query=t.length>0?t:null,this.state=this.STATES.SEARCH_MODE}get state(){return this._state}set state(t){switch(t){case this.STATES.SEARCH_MODE:this._state=this.query&&this.query.length>0?t:this.STATES.OFF;break;case this.STATES.FAV_MODE:default:this._state=t}}setFavoriteCounter(t){this.favCountEl.innerText=t}get query(){return this._query}fn(){this.checkboxEl&&this.checkboxEl.checked?(this.inputEl.disabled=!0,this.state=this.STATES.FAV_MODE):(this.inputEl.disabled=!1,this.query=this.inputEl.value.toUpperCase(),this.state=this.STATES.SEARCH_MODE),this.eventEmitter.emit('changed')}}class h{constructor(){this.parentEl=document.querySelector('#caseList'),this.titleEls=this.parentEl.querySelectorAll('.category-title'),this.caseEls=this.parentEl.getElementsByTagName('a'),this.favEls=this.parentEl.querySelectorAll('.favorite'),this.calloutEls=this.parentEl.querySelectorAll('.callout'),this.filterTitleEl=this.parentEl.querySelector('.filter-title'),this.eventEmitter=new l,this.STATES={ALL:0,FILTERED:1},this._state=this.STATES.ALL,this.addListeners()}on(t,e){this.eventEmitter.on(t,e)}addListeners(){t(this.favEls,((t,s)=>{s.addEventListener('click',(async t=>{t.preventDefault(),t.stopPropagation();let s=t.target;'svg'!==t.target.tagName&&(s=t.target.closest('svg')),s.closest('a').dataset.favorite=0,s.style.display='none',await e.post(s.dataset.endpoint),this.eventEmitter.emit('removedFromFavorites')}))}))}filter(t){switch(t.state){case t.STATES.SEARCH_MODE:this.state=this.STATES.FILTERED,this.filterByQuery(t.query),this.setTitle('результаты поиска');break;case t.STATES.FAV_MODE:this.state=this.STATES.FILTERED,this.filterByFavorites(),this.setTitle('избранное');break;default:this.state=this.STATES.ALL}this.toggleCallout(t.state,t.STATES)}set state(t){if(t===this.STATES.FILTERED)this.hideCategoryTitles(),i(this.parentEl,'filtered');else s(this.parentEl,'filtered'),this.showAll();this._state=t}get state(){return this._state}setTitle(t){this.filterTitleEl.getElementsByTagName('h1')[0].innerText=t}showAll(){this.showCategoryTitles();for(let t=0;t<this.caseEls.length;t++)this.caseEls[t].style.display=''}filterByQuery(t){for(let e=0;e<this.caseEls.length;e++)this.caseEls[e].dataset.title.toUpperCase().indexOf(t)>-1?this.caseEls[e].style.display='':this.caseEls[e].style.display='none'}filterByFavorites(){for(let t=0;t<this.caseEls.length;t++)1===parseInt(this.caseEls[t].dataset.favorite)?this.caseEls[t].style.display='':this.caseEls[t].style.display='none'}toggleCallout(t,e){if(this.count()<1)switch(t){case e.SEARCH_MODE:this.calloutEls[0].style.display='block',this.calloutEls[1].style.display='none';break;case e.FAV_MODE:this.calloutEls[0].style.display='none',this.calloutEls[1].style.display='block'}else this.calloutEls[0].style.display='none',this.calloutEls[1].style.display='none'}isHidden(t){return 0===t.offsetWidth||0===t.offsetHeight||!1===t.open}count(){let t=0;for(let e=0;e<this.caseEls.length;e++)this.isHidden(this.caseEls[e])||t++;return t}hideCategoryTitles(){t(this.titleEls,((t,e)=>{i(e,'hidden')}))}showCategoryTitles(){t(this.titleEls,((t,e)=>{s(e,'hidden')}))}}new class{constructor(){this.filter=new a,this.caseCollection=new h,this.initEvents()}initEvents(){this.filter.on('changed',(()=>{this.caseCollection.filter(this.filter)})),this.caseCollection.on('removedFromFavorites',(()=>{this.caseCollection.filter(this.filter),this.filter.setFavoriteCounter(this.caseCollection.count())}))}fn(){this.caseCollection.filter(this.filter)}};