var V=Object.defineProperty;var W=(e,t,n)=>t in e?V(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var N=(e,t,n)=>W(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerPolicy&&(o.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?o.credentials="include":l.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}})();const C=()=>{const e=new Set;return{subscribe:s=>e.add(s),notify:()=>e.forEach(s=>s())}},B=(e,t)=>{const{subscribe:n,notify:s}=C();let l={...e};const o=f=>{l={...l,...f},s()},a=()=>({...l}),c=Object.fromEntries(Object.entries(t).map(([f,F])=>[f,(...G)=>o(F(a(),...G))]));return{getState:a,setState:o,subscribe:n,actions:c}},T=(e,t=window.localStorage)=>({get:()=>JSON.parse(t.getItem(e)),set:o=>t.setItem(e,JSON.stringify(o)),reset:()=>t.removeItem(e)}),H=e=>{const{subscribe:t,notify:n}=C(),s=()=>window.location.pathname,l=()=>e[s()],o=a=>{window.history.pushState(null,null,a),n()};return window.addEventListener("popstate",()=>n()),{get path(){return s()},push:o,subscribe:t,getTarget:l}};function r(e,t,...n){return{type:e,props:t,children:n.flat(1/0).filter(s=>s===0||!!s)}}const u=new WeakMap;function J(e){for(const t in u)e.removeEventListener(t,D),e.addEventListener(t,D)}function E(e,t,n){!e||typeof n!="function"||(u[t]=u[t]||new WeakMap,u[t].set(e,n))}function K(e,t,n){u[t].get(e)===n&&u[t].delete(e)}function D(e){u[e.type].has(e.target)&&u[e.type].get(e.target)(e)}function d(e){if(typeof e=="boolean"||typeof e>"u"||e===null)return document.createTextNode("");if(typeof e=="string"||typeof e=="number")return document.createTextNode(e);if(Array.isArray(e)){const n=document.createDocumentFragment();return n.append(...e.map(d)),n}const t=R(document.createElement(e.type),e.props);return e.children.map(d).forEach(n=>t.appendChild(n)),t}function R(e,t){return Object.entries(t||{}).forEach(([n,s])=>{n.startsWith("on")?E(e,n.slice(2).toLowerCase(),s):(n==="className"&&(n="class"),e.setAttribute(n,s))}),e}function p(e){const t=typeof e;if(t==="boolean"||t==="undefined"||e===null)return"";if(t==="string"||t==="number")return e.toString();if(Array.isArray(e))return e.map(p).filter(n=>n!=null&&n!=="");if(e&&typeof e=="object"&&(e.children&&(e.children=p(e.children)),typeof e.type=="function")){const n=e.type({...e.props,children:e.children});return n==null?"":Array.isArray(n)?n.flatMap(p):p(n)}return e}function Y(e,t,n){const s=t?Object.entries(t):[],l=n?Object.entries(n):[];for(const[o,a]of l){let c=t[o];if(v(o)&&(K(e,h(o),a),c=t[h(o)]),c===void 0){e.removeAttribute(o);continue}if(a!==c){if(I(o)){e.classList=c;continue}if(v(o)){E(e,h(o),c);continue}e.setAttribute(o,c);continue}t[o]}for(const[o,a]of s)if(l[o]===void 0){if(v(o)){E(e,h(o),a);return}if(I(o)){e.classList=a;continue}e.setAttribute(o,a)}}function M(e,t,n,s=0){if(t&&!n){e.appendChild(d(t));return}if(n&&!t){e.removeChild(e.childNodes[s]);return}if(typeof t=="string"||typeof t=="number"){n!==t&&(e.childNodes[s].textContent=t);return}if(t.type!==n.type){e.replaceChild(d(t),e.childNodes[s]);return}Y(e.childNodes[s],t.props||{},n.props||{});const l=Math.max(t.children.length,n.children.length);if(l!==0)for(let o=0;o<l;o++)M(e.childNodes[s],t.children[o],n.children[o],o)}function v(e){return/^on[A-Z]/.test(e)}function I(e){return e==="class"||e==="className"}function h(e){return e.slice(2).toLowerCase()}const O=new WeakMap;function Z(e,t){if(!e)return;const n=O.get(t),s=p(e);n&&t.firstChild?M(t,s,n):t.appendChild(d(s)),O.set(t,s),J(t)}const z=1e3,U=z*60,P=U*60,Q=P*24,X=e=>{const t=Date.now()-e;return t<U?"방금 전":t<P?`${Math.floor(t/U)}분 전`:t<Q?`${Math.floor(t/P)}시간 전`:new Date(e).toLocaleString()},g=T("user"),_=1e3,b=_*60,ee=b*60,i=B({currentUser:g.get(),loggedIn:!!g.get(),posts:[{id:1,author:"홍길동",time:Date.now()-5*b,content:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",likeUsers:[]},{id:2,author:"김철수",time:Date.now()-15*b,content:"새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",likeUsers:[]},{id:3,author:"이영희",time:Date.now()-30*b,content:"오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",likeUsers:[]},{id:4,author:"박민수",time:Date.now()-30*b,content:"주말에 등산 가실 분 계신가요? 함께 가요!",likeUsers:[]},{id:5,author:"정수연",time:Date.now()-2*ee,content:"새로 나온 영화 재미있대요. 같이 보러 갈 사람?",likeUsers:[]}],error:null},{logout(e){return g.reset(),{...e,currentUser:null,loggedIn:!1}},post(e,t){const n=e.posts,s={id:n[n.length-1]+1,author:e.currentUser.username,time:Date.now(),content:t,likeUsers:[]};return{...e,posts:[...n,s]}},postLike(e,t){const n=e.posts.map(s=>{if(s.id===t){const l=s.likeUsers.some(a=>a.username===e.currentUser.username),o=new Set(s.likeUsers);return l?o.delete(e.currentUser):o.add(e.currentUser),{...s,likeUsers:[...o]}}return s});return{...e,posts:n}}}),te=({id:e,author:t,time:n,content:s,likeUsers:l,activationLike:o=!1})=>{const{loggedIn:a}=i.getState(),{postLike:c}=i.actions;return r("div",{className:"bg-white rounded-lg shadow p-4 mb-4"},r("div",{className:"flex items-center mb-2"},r("div",null,r("div",{className:"font-bold"},t),r("div",{className:"text-gray-500 text-sm"},X(n)))),r("p",null,s),r("div",{className:"mt-2 flex justify-between text-gray-500"},r("span",{className:`like-button cursor-pointer${o?" text-blue-500":""}`,onClick:f=>{f.preventDefault(),a?c(e):alert("로그인 후 이용해주세요")}},"좋아요 ",l.length),r("span",null,"댓글"),r("span",null,"공유")))},ne=()=>{const{loggedIn:e}=i.getState(),{post:t}=i.actions;if(e)return r("div",{className:"mb-4 bg-white rounded-lg shadow p-4"},r("textarea",{id:"post-content",placeholder:"무슨 생각을 하고 계신가요?",className:"w-full p-2 border rounded"}),r("button",{id:"post-submit",className:"mt-2 bg-blue-600 text-white px-4 py-2 rounded",onClick:n=>{n.preventDefault();const s=document.querySelector("#post-content").value;t(s)}},"게시"))},j=()=>r("header",{className:"bg-blue-600 text-white p-4 sticky top-0"},r("h1",{className:"text-2xl font-bold"},"항해플러스")),$=()=>r("footer",{className:"bg-gray-200 p-4 text-center"},r("p",null,"© $",new Date().getFullYear()," 항해플러스. All rights reserved.")),m={value:null,get(){return this.value},set(e){this.value=e}},L=e=>window.location.pathname===e?"text-blue-600 font-bold":"text-gray-600";function k({onClick:e,children:t,...n}){return r("a",{onClick:l=>{l.preventDefault(),e==null||e(),m.get().push(l.target.href.replace(window.location.origin,""))},...n},t)}const q=()=>{const{loggedIn:e}=i.getState(),{logout:t}=i.actions;return r("nav",{className:"bg-white shadow-md p-2 sticky top-14"},r("ul",{className:"flex justify-around"},r("li",null,r(k,{href:"/",className:L("/")},"홈")),!e&&r("li",null,r(k,{href:"/login",className:L("/login")},"로그인")),e&&r("li",null,r(k,{href:"/profile",className:L("/profile")},"프로필")),e&&r("li",null,r("a",{href:"#",id:"logout",className:"text-gray-600",onClick:n=>{n.preventDefault(),t()}},"로그아웃"))))},re=()=>{const{posts:e,currentUser:t}=i.getState();return r("div",{className:"bg-gray-100 min-h-screen flex justify-center"},r("div",{className:"max-w-md w-full"},r(j,null),r(q,null),r("main",{className:"p-4"},r(ne,null),r("div",{id:"posts-container",className:"space-y-4"},[...e].sort((n,s)=>s.time-n.time).map(n=>{const s=n.likeUsers.some(l=>l.username===t.username);return r(te,{...n,activationLike:s})}))),r($,null)))};function se(e){const t={username:e,email:"",bio:""};i.setState({currentUser:t,loggedIn:!0}),g.set(t)}const oe=()=>r("div",{className:"bg-gray-100 flex items-center justify-center min-h-screen"},r("div",{className:"bg-white p-8 rounded-lg shadow-md w-full max-w-md"},r("h1",{className:"text-2xl font-bold text-center text-blue-600 mb-8"},"항해플러스"),r("form",{id:"login-form",onSubmit:t=>{t.preventDefault();const n=document.getElementById("username").value;se(n)}},r("input",{type:"text",id:"username",placeholder:"사용자 이름",className:"w-full p-2 mb-4 border rounded",required:!0}),r("input",{type:"password",placeholder:"비밀번호",className:"w-full p-2 mb-6 border rounded",required:!0}),r("button",{type:"submit",className:"w-full bg-blue-600 text-white p-2 rounded"},"로그인")),r("div",{className:"mt-4 text-center"},r("a",{href:"#",className:"text-blue-600 text-sm"},"비밀번호를 잊으셨나요?")),r("hr",{className:"my-6"}),r("div",{className:"text-center"},r("button",{className:"bg-green-500 text-white px-4 py-2 rounded"},"새 계정 만들기")))),le=()=>r("main",{className:"bg-gray-100 flex items-center justify-center min-h-screen"},r("div",{className:"bg-white p-8 rounded-lg shadow-md w-full text-center",style:"max-width: 480px"},r("h1",{className:"text-2xl font-bold text-blue-600 mb-4"},"항해플러스"),r("p",{className:"text-4xl font-bold text-gray-800 mb-4"},"404"),r("p",{className:"text-xl text-gray-600 mb-8"},"페이지를 찾을 수 없습니다"),r("p",{className:"text-gray-600 mb-8"},"요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다."),r("a",{href:"/","data-link":"",className:"bg-blue-600 text-white px-4 py-2 rounded font-bold"},"홈으로 돌아가기")));function ae(e){const t={...i.getState().currentUser,...e};i.setState({currentUser:t}),g.set(t),alert("프로필이 업데이트되었습니다.")}const ie=()=>{const{loggedIn:e,currentUser:t}=i.getState(),{username:n="",email:s="",bio:l=""}=t??{};return r("div",{className:"bg-gray-100 min-h-screen flex justify-center"},r("div",{className:"max-w-md w-full"},r(j,null),r(q,{loggedIn:e}),r("main",{className:"p-4"},r("div",{className:"bg-white p-8 rounded-lg shadow-md"},r("h2",{className:"text-2xl font-bold text-center text-blue-600 mb-8"},"내 프로필"),r("form",{id:"profile-form",onSubmit:a=>{a.preventDefault();const c=new FormData(a.target),f=Object.fromEntries(c);ae(f)}},r("div",{className:"mb-4"},r("label",{for:"username",className:"block text-gray-700 text-sm font-bold mb-2"},"사용자 이름"),r("input",{type:"text",id:"username",name:"username",className:"w-full p-2 border rounded",value:n,required:!0})),r("div",{className:"mb-4"},r("label",{for:"email",className:"block text-gray-700 text-sm font-bold mb-2"},"이메일"),r("input",{type:"email",id:"email",name:"email",className:"w-full p-2 border rounded",value:s,required:!0})),r("div",{className:"mb-6"},r("label",{for:"bio",className:"block text-gray-700 text-sm font-bold mb-2"},"자기소개"),r("textarea",{id:"bio",name:"bio",rows:"4",className:"w-full p-2 border rounded"},l)),r("button",{type:"submit",className:"w-full bg-blue-600 text-white p-2 rounded font-bold"},"프로필 업데이트")))),r($,null)))},w=class w extends Error{constructor(){super(w.MESSAGE)}};N(w,"MESSAGE","ForbiddenError");let y=w;const S=class S extends Error{constructor(){super(S.MESSAGE)}};N(S,"MESSAGE","UnauthorizedError");let x=S;function A(){const e=m.get().getTarget()??le,t=document.querySelector("#root");try{Z(r(e,null),t)}catch(n){if(n instanceof y){m.get().push("/");return}if(n instanceof x){m.get().push("/login");return}console.error(n)}}m.set(H({"/":re,"/login":()=>{const{loggedIn:e}=i.getState();if(e)throw new y;return r(oe,null)},"/profile":()=>{const{loggedIn:e}=i.getState();if(!e)throw new x;return r(ie,null)}}));function ce(){m.get().subscribe(A),i.subscribe(A),A()}ce();
