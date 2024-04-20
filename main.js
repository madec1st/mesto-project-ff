(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){return e.ok?e.json():Promise.reject("Произошла ошибка: ".concat(e.status))}e.d({},{J:()=>D});var n={url:"https://mesto.nomoreparties.co/v1/wff-cohort-11",headers:{authorization:"8eef8a7b-16fa-42a1-80e9-e1a5157a1c81","Content-Type":"application/json"}},r=document.querySelector("#card-template").content,o=function(e,t,n,o){var a=r.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__image"),c=e._id,u=a.querySelector(".card__delete-button"),s=a.querySelector(".card__like-button"),l=a.querySelector(".quantity_likes");a.querySelector(".card__title").textContent=e.name,i.src=e.link,i.alt=e.name,i.addEventListener("click",(function(){return t(e)})),D!==e.owner._id&&(u.disabled=!0,u.classList.add("card__delete-button_disabled")),u.addEventListener("click",(function(){return o(c,a)}));var d=e.likes?e.likes.length:0;l.textContent=d;var p=!!e.likes&&e.likes.some((function(e){return e._id===D}));return p?s.classList.add("card__like-button_is-active"):s.classList.remove("card__like-button_is-active"),s.addEventListener("click",(function(){n(p,c,s,l),p=!p})),a};function a(e,r,o,a){var i;e?(i=r,fetch("".concat(n.url,"/cards/likes/").concat(i),{method:"DELETE",headers:n.headers}).then(t)).then((function(e){var t=e.likes.length;a.textContent=t,o.classList.remove("card__like-button_is-active")})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(n.url,"/cards/likes/").concat(e),{method:"PUT",headers:n.headers}).then(t)}(r).then((function(e){var t=e.likes.length;a.textContent=t,o.classList.add("card__like-button_is-active")})).catch((function(e){console.log(e)}))}function i(e,r){(function(e){return fetch("".concat(n.url,"/cards/").concat(e),{method:"DELETE",headers:n.headers}).then(t)})(e).then((function(){r.remove()})).catch((function(e){console.log(e)}))}function c(e){setTimeout((function(){e.classList.add("popup_is-opened")}),100),e.classList.add("popup_is-animated"),document.addEventListener("click",s),document.addEventListener("keydown",l)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("click",s),document.removeEventListener("keydown",l)}function s(e){e.target.classList.contains("popup_is-opened")&&u(e.target)}function l(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}var d={formClass:".popup__form",inputClass:".popup__input",submitButtonClass:".popup__button",inactiveButtonClass:"popup__button-inactive",inputErrorClass:"popup__input-invalid",errorSpanClass:"popup__input-error",errorClass:"popup__input-error_active"};function p(e,t){var n=e.querySelector(t.submitButtonClass);n.classList.add(t.inactiveButtonClass),n.setAttribute("disabled","disabled")}function f(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));r.classList.remove(n.errorClass),r.textContent="",t.classList.remove(n.inputErrorClass)}function m(e,t){var n=e.querySelector(t.formClass),r=Array.from(n.querySelectorAll(t.inputClass));n&&n.reset(),r.forEach((function(e){f(n,e,t)}))}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var v=document.querySelector(".popup__input_type_name"),y=document.querySelector(".popup__input_type_description"),h=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),S=document.querySelector(".profile__image"),C=document.querySelector(".places__list"),k=document.querySelector(".profile__edit-button"),q=document.querySelector(".popup_type_edit"),L=document.forms["edit-profile"],E=document.querySelector(".profile__add-button"),g=document.querySelector(".popup_type_new-card"),x=document.forms["new-place"],A=document.querySelector(".avatar_container"),w=document.querySelector(".popup_type_change-avatar"),O=document.forms["change-avatar"],T=document.querySelector(".popup_type_image"),j=document.querySelectorAll(".popup__close"),M=g.querySelector(".popup__input_type_card-name"),P=g.querySelector(".popup__input_type_url"),B=w.querySelector(".popup__input_type_url"),D=null;function J(e){T.querySelector(".popup__image").src=e.link,T.querySelector(".popup__image").alt=e.name,T.querySelector(".popup__caption").textContent=e.name,c(T)}Promise.all([fetch("".concat(n.url,"/users/me"),{method:"GET",headers:n.headers}).then(t),fetch("".concat(n.url,"/cards"),{method:"GET",headers:n.headers}).then(t)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,i,c=[],u=!0,s=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=a.call(n)).done)&&(c.push(r.value),c.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(s)throw o}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=r[0],u=r[1];return D=c._id,h.textContent=c.name,b.textContent=c.about,S.src=c.avatar,u.forEach((function(e){var t=o(e,J,a,i);C.append(t)})),D})).catch((function(e){console.log(e)})),k.addEventListener("click",(function(){var e,t;c(q),m(q,d),e=h.textContent,t=b.textContent,v.value=e,y.value=t,p(L,d)})),E.addEventListener("click",(function(){c(g),m(g,d),p(x,d)})),A.addEventListener("click",(function(){c(w),m(w,d),p(O,d)})),j.forEach((function(e){e.addEventListener("click",(function(){return u(e.closest(".popup"))}))})),function(e){Array.from(document.querySelectorAll(e.formClass)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){Array.from(e.querySelectorAll(t.inputClass)).forEach((function(n){n.addEventListener("input",(function(){return function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.validity.valueMissing?t.setCustomValidity(t.dataset.skipMessage):t.validity.typeMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?f(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));o.textContent=n,o.classList.add(r.errorClass),t.classList.add(r.inputErrorClass)}(e,t,t.validationMessage,n),function(e,t){Array.from(e.querySelectorAll(t.inputClass)).every((function(e){return e.validity.valid}))?function(e,t){var n=e.querySelector(t.submitButtonClass);n.classList.remove(t.inactiveButtonClass),n.removeAttribute("disabled")}(e,t):p(e,t)}(e,n)}(e,n,t)}))}))}(t,e)}))}(d),L.addEventListener("submit",(function(e){e.preventDefault(),e.submitter.textContent="Сохранение...",e.submitter.disabled=!0,function(e,r){return fetch("".concat(n.url,"/users/me"),{method:"PATCH",headers:n.headers,body:JSON.stringify({name:e.value,about:r.value})}).then(t)}(v,y).then((function(e){h.textContent=e.name,b.textContent=e.about,u(q)})).catch((function(t){e.submitter.disabled=!1,console.log(t)})).finally((function(){e.submitter.textContent="Сохранить"}))})),x.addEventListener("submit",(function(e){e.preventDefault(),e.submitter.textContent="Создаём...",e.submitter.disabled=!0;var r,c,s=M.value,l=P.value;(r=M,c=P,fetch("".concat(n.url,"/cards"),{method:"POST",headers:n.headers,body:JSON.stringify({name:r.value,link:c.value})}).then(t)).then((function(e){var t={name:s,link:l};t.createdAt=e.createdAt,t.likes=e.likes,t.owner=e.owner,t._id=e._id,function(e){var t=o(e,J,a,i),n=t.querySelector(".card__delete-button"),r=t.querySelector(".card__like-button"),c=t.querySelector(".quantity_likes"),u=e.likes?e.likes.length:0,s=!!e.likes&&e.likes.some((function(e){return e._id===D}));s?r.classList.add("card__like-button_is-active"):r.classList.remove("card__like-button_is-active"),c.textContent=u,n.addEventListener("click",(function(){return i(e._id,t)})),r.addEventListener("click",(function(){a(s,e._id,r,c),s=!s})),C.prepend(t)}(t),u(g)})).catch((function(t){e.submitter.disabled=!1,console.log(t)})).finally((function(){e.submitter.textContent="Создать"}))})),O.addEventListener("submit",(function(e){var r;e.preventDefault(),e.submitter.textContent="Сохранение...",e.submitter.disabled=!0,(r=B,fetch("".concat(n.url,"/users/me/avatar"),{method:"PATCH",headers:n.headers,body:JSON.stringify({avatar:r.value})}).then(t)).then((function(e){S.src=e.avatar,u(w)})).catch((function(t){e.submitter.disabled=!1,console.log(t)})).finally((function(){e.submitter.textContent="Сохранить"}))}))})();