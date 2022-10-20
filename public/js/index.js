// "use strict";
// !function () {

// 		window.Element.prototype.removeClass = function () {
// 				let className = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
// 						selectors = this;
// 				if (!(selectors instanceof HTMLElement) && selectors !== null) {
// 						selectors = document.querySelector(selectors);
// 				}
// 				if (this.isVariableDefined(selectors) && className) {
// 						selectors.classList.remove(className);
// 				}
// 				return this;
// 		}, window.Element.prototype.addClass = function () {
// 				let className = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
// 						selectors = this;
// 				if (!(selectors instanceof HTMLElement) && selectors !== null) {
// 						selectors = document.querySelector(selectors);
// 				}
// 				if (this.isVariableDefined(selectors) && className) {
// 						selectors.classList.add(className);
// 				}
// 				return this;
// 		}, window.Element.prototype.toggleClass = function () {
// 				let className = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
// 						selectors = this;
// 				if (!(selectors instanceof HTMLElement) && selectors !== null) {
// 						selectors = document.querySelector(selectors);
// 				}
// 				if (this.isVariableDefined(selectors) && className) {
// 						selectors.classList.toggle(className);
// 				}
// 				return this;
// 		}, window.Element.prototype.isVariableDefined = function () {
// 				return !!this && typeof (this) != 'undefined' && this != null;
// 		}
// }();


// var e = {
// 		init: function () {
// 				e.preLoader(),
// 				e.navbarDropdownHover()
				
				
// 		},
// 		isVariableDefined: function (el) {
// 				return typeof !!el && (el) != 'undefined' && el != null;
// 		},
// 		getParents: function (el, selector, filter) {
// 				const result = [];
// 				const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

// 				// match start from parent
// 				el = el.parentElement;
// 				while (el && !matchesSelector.call(el, selector)) {
// 						if (!filter) {
// 								if (selector) {
// 										if (matchesSelector.call(el, selector)) {
// 												return result.push(el);
// 										}
// 								} else {
// 										result.push(el);
// 								}
// 						} else {
// 								if (matchesSelector.call(el, filter)) {
// 										result.push(el);
// 								}
// 						}
// 						el = el.parentElement;
// 						if (e.isVariableDefined(el)) {
// 								if (matchesSelector.call(el, selector)) {
// 										return el;
// 								}
// 						}

// 				}
// 				return result;
// 		},
// 		getNextSiblings: function (el, selector, filter) {
// 				let sibs = [];
// 				let nextElem = el.parentNode.firstChild;
// 				const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
// 				do {
// 						if (nextElem.nodeType === 3) continue; // ignore text nodes
// 						if (nextElem === el) continue; // ignore elem of target
// 						if (nextElem === el.nextElementSibling) {
// 								if ((!filter || filter(el))) {
// 										if (selector) {
// 												if (matchesSelector.call(nextElem, selector)) {
// 														return nextElem;
// 												}
// 										} else {
// 												sibs.push(nextElem);
// 										}
// 										el = nextElem;

// 								}
// 						}
// 				} while (nextElem = nextElem.nextSibling)
// 				return sibs;
// 		},
// 		on: function (selectors, type, listener) {
// 				document.addEventListener("DOMContentLoaded", () => {
// 						if (!(selectors instanceof HTMLElement) && selectors !== null) {
// 								selectors = document.querySelector(selectors);
// 						}
// 						selectors.addEventListener(type, listener);
// 				});
// 		},
// 		onAll: function (selectors, type, listener) {
// 				document.addEventListener("DOMContentLoaded", () => {
// 						document.querySelectorAll(selectors).forEach((element) => {
// 								if (type.indexOf(',') > -1) {
// 										let types = type.split(',');
// 										types.forEach((type) => {
// 												element.addEventListener(type, listener);
// 										});
// 								} else {
// 										element.addEventListener(type, listener);
// 								}


// 						});
// 				});
// 		},
// 		removeClass: function (selectors, className) {
// 				if (!(selectors instanceof HTMLElement) && selectors !== null) {
// 						selectors = document.querySelector(selectors);
// 				}
// 				if (e.isVariableDefined(selectors)) {
// 						selectors.removeClass(className);
// 				}
// 		},
// 		removeAllClass: function (selectors, className) {
// 				if (e.isVariableDefined(selectors) && (selectors instanceof HTMLElement)) {
// 						document.querySelectorAll(selectors).forEach((element) => {
// 								element.removeClass(className);
// 						});
// 				}

// 		},
// 		toggleClass: function (selectors, className) {
// 				if (!(selectors instanceof HTMLElement) && selectors !== null) {
// 						selectors = document.querySelector(selectors);
// 				}
// 				if (e.isVariableDefined(selectors)) {
// 						selectors.toggleClass(className);
// 				}
// 		},
// 		toggleAllClass: function (selectors, className) {
// 				if (e.isVariableDefined(selectors)  && (selectors instanceof HTMLElement)) {
// 						document.querySelectorAll(selectors).forEach((element) => {
// 								element.toggleClass(className);
// 						});
// 				}
// 		},
// 		addClass: function (selectors, className) {
// 				if (!(selectors instanceof HTMLElement) && selectors !== null) {
// 						selectors = document.querySelector(selectors);
// 				}
// 				if (e.isVariableDefined(selectors)) {
// 						selectors.addClass(className);
// 				}
// 		},
// 		select: function (selectors) {
// 				return document.querySelector(selectors);
// 		},
// 		selectAll: function (selectors) {
// 				return document.querySelectorAll(selectors);
// 		},

// 		// START: 01 Preloader
// 		preLoader: function () {
// 				window.onload = function () {
// 						var preloader = e.select('.preloader');
// 						if (e.isVariableDefined(preloader)) {
// 								preloader.className += ' animate__animated animate__fadeOut';
// 								setTimeout(function(){
// 										preloader.style.display = 'none';
// 								}, 200);
// 						}
// 				};
// 		},
// 		// END: Preloader

// 		// START: 02 Navbar dropdown hover
// 		navbarDropdownHover: function () {
// 				e.onAll('.dropdown-menu a.dropdown-item.dropdown-toggle', 'click', function (event) {
// 						var element = this;
// 						event.preventDefault();
// 						event.stopImmediatePropagation();
// 						if (e.isVariableDefined(element.nextElementSibling) && !element.nextElementSibling.classList.contains("show")) {
// 								const parents = e.getParents(element, '.dropdown-menu');
// 								e.removeClass(parents.querySelector('.show'), "show");
// 								if(e.isVariableDefined(parents.querySelector('.dropdown-opened'))){
// 										e.removeClass(parents.querySelector('.dropdown-opened'), "dropdown-opened");
// 								}
// 						}
// 						var $subMenu = e.getNextSiblings(element, ".dropdown-menu");
// 						e.toggleClass($subMenu, "show");
// 						$subMenu.previousElementSibling.toggleClass('dropdown-opened');
// 						var parents = e.getParents(element, 'li.nav-item.dropdown.show');
// 						if (e.isVariableDefined(parents) && parents.length > 0) {
// 								e.on(parents, 'hidden.bs.dropdown', function (event) {
// 										e.removeAllClass('.dropdown-submenu .show');
// 								});
// 						}
// 				});
// 		},
// 		// END: Navbar dropdown hover

  	
// };
// e.init();


// function handleClick(event) {
//     const main = event.target;
//     const className = "show"; 
//     let myContent = null; 
//     exampleModal.forEach( elem => {
//         console.log(main.parentNode)
//       if ( main.parentNode.contains(elem)) {
//         myContent = elem;
//       } else {
//         elem.classList.remove(className);
//       }
//     });
//     if (myContent) myContent.classList.toggle(className);
//   }
  
//   dropDownButtons.forEach( elem => elem.addEventListener("click",  handleClick));