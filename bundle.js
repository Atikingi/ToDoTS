(()=>{"use strict";var t,e=new Uint8Array(16);function o(){if(!t&&!(t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return t(e)}const s=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,a=function(t){return"string"==typeof t&&s.test(t)};for(var r=[],n=0;n<256;++n)r.push((n+256).toString(16).substr(1));const i=function(t,e,s){var n=(t=t||{}).random||(t.rng||o)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,e){s=s||0;for(var i=0;i<16;++i)e[s+i]=n[i];return e}return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=(r[t[e+0]]+r[t[e+1]]+r[t[e+2]]+r[t[e+3]]+"-"+r[t[e+4]]+r[t[e+5]]+"-"+r[t[e+6]]+r[t[e+7]]+"-"+r[t[e+8]]+r[t[e+9]]+"-"+r[t[e+10]]+r[t[e+11]]+r[t[e+12]]+r[t[e+13]]+r[t[e+14]]+r[t[e+15]]).toLowerCase();if(!a(o))throw TypeError("Stringified UUID is invalid");return o}(n)};var d=new(function(){function t(){this.toDoArray=[],this.taskText=document.getElementById("form-text"),this.toDoForm=document.getElementById("todo-form"),this.toDoList=document.getElementById("todo-list")}return t.prototype.submitForm=function(){var t=this;this.toDoForm.addEventListener("submit",(function(e){if(e.preventDefault(),""!==t.taskText.value){var o={id:i(),text:t.taskText.value,completed:!1};t.renderTask(o),t.saveTask(o)}}))},t.prototype.saveTask=function(t){this.toDoArray.push(t),this.recordTasksList()},t.prototype.recordTasksList=function(){var t=JSON.stringify(this.toDoArray);localStorage.setItem("tasks",t)},t.prototype.loadingTasks=function(){var t=localStorage.getItem("tasks");t&&(this.toDoArray=JSON.parse(t),this.renderTasks())},t.prototype.renderTasks=function(){var t=this;this.toDoArray.map((function(e){var o=e.text,s=e.id,a=e.completed;t.createTask(o,s,a)})),this.statusTaskHandler(),this.deleteTaskHandler()},t.prototype.renderTask=function(t){var e=t.text,o=t.id,s=t.completed;this.createTask(e,o,s),this.taskText.value=""},t.prototype.createTask=function(t,e,o){var s=document.createElement("li"),a=document.createElement("label"),r=document.createElement("input"),n=document.createElement("button"),i=document.createElement("span");i.textContent=t,s.id=e,r.setAttribute("type","checkbox"),r.checked=o,n.id="delete-button",n.dataset.taskid=e,a.classList.add("todo__list-label"),i.classList.add("todo__task-text"),n.classList.add("todo__delete-button"),s.classList.add("todo__task-list-item"),r.classList.add("todo__task-input"),s.appendChild(a),a.appendChild(r),a.appendChild(i),a.appendChild(n),this.toDoList.appendChild(s)},t.prototype.deleteTaskHandler=function(){this.toDoList.addEventListener("click",this.deleteTask.bind(this))},t.prototype.deleteTask=function(t){var e,o=t.target;o.dataset.taskid&&(this.toDoArray.splice(this.toDoArray.findIndex((function(t){return t.id===o.dataset.taskid})),1),null===(e=o.closest("li"))||void 0===e||e.remove(),this.recordTasksList(),o.removeEventListener("click",this.deleteTask))},t.prototype.statusTaskHandler=function(){var t=this;this.toDoList.addEventListener("change",(function(e){var o,s=e.target,a=null===(o=s.closest("li"))||void 0===o?void 0:o.id;t.toDoArray.map((function(t){t.id===a&&(t.completed=s.checked)}));var r=JSON.stringify(t.toDoArray);localStorage.setItem("tasks",r)}))},t}());d.loadingTasks(),d.submitForm()})();