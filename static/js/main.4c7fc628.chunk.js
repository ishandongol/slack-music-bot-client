(this["webpackJsonpslack-music-bot-client"]=this["webpackJsonpslack-music-bot-client"]||[]).push([[0],{84:function(e,t,n){},85:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),s=n(27),r=n.n(s),i=n(6),o=n(28),l=n.n(o),d=n(0),u={socketConnected:!1,socketId:"",isSyncMode:!1,isHost:!1,setIsSyncMode:function(){throw new Error("NOt implemented")}},b=Object(c.createContext)(u),j=function(e){var t=e.children,n=function(e){var t=Object(c.useRef)(),n=Object(c.useRef)(new l.a),a=Object(c.useState)(""),s=Object(i.a)(a,2),r=s[0],o=s[1],d=Object(c.useState)(!1),u=Object(i.a)(d,2),b=u[0],j=u[1],v=Object(c.useState)(!1),f=Object(i.a)(v,2),O=f[0],g=f[1],x=Object(c.useState)(!1),h=Object(i.a)(x,2),m=h[0],p=h[1];return Object(c.useEffect)((function(){var c=new WebSocket(e);t.current=c,c&&(c.onopen=function(){j(!0)},c.onclose=function(){o(""),j(!1)},c.onmessage=function(e){var t,c=JSON.parse(e.data),a=c.message,s=c.event_type;"welcome"===s&&o(a),"host"===s&&g("true"===a),null===(t=n.current)||void 0===t||t.emit(s,a),console.log("Received: "+e.data)})}),[e]),console.log({isHost:O}),Object(c.useEffect)((function(){return function(){t.current&&t.current.close(),n.current&&n.current.removeAllListeners()}}),[]),{socketRef:t,emitterRef:n,socketConnected:b,socketId:r,isHost:O,isSyncMode:m,setIsSyncMode:p}}(e.url||"");return Object(d.jsx)(b.Provider,{value:n,children:t})},v=function(){return Object(c.useContext)(b)},f=n(2),O=n(37),g=function(e){var t=e.className,n=void 0===t?"":t,c=e.children,a=e.id,s=Object(O.a)(e,["className","children","id"]);return Object(d.jsxs)("div",{className:"form-check form-switch",children:[Object(d.jsx)("input",Object(f.a)(Object(f.a)({type:"checkbox",className:"form-check-input ".concat(n)},s),{},{id:a})),Object(d.jsx)("label",{className:"form-check-label text-light",htmlFor:a,children:c})]})},x=function(){var e=v(),t=e.socketConnected,n=e.socketId,a=e.socketRef,s=e.isSyncMode,r=e.setIsSyncMode,i=e.isHost;return Object(c.useEffect)((function(){var e=null===a||void 0===a?void 0:a.current;t&&n&&e&&(s?e.send("/join sync"):e.send("/leave sync"))}),[s,a,t,n]),Object(d.jsx)("nav",{className:"navbar fixed-top navbar-expand-lg navbar-dark bg-dark",children:Object(d.jsxs)("div",{className:"container-fluid",children:[Object(d.jsx)("a",{className:"navbar-brand",href:"/",children:"Innovate Playlist"}),Object(d.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(d.jsx)("span",{className:"navbar-toggler-icon"})}),Object(d.jsxs)("div",{className:"collapse navbar-collapse",id:"navbarText",children:[Object(d.jsx)("ul",{className:"navbar-nav ms-auto",children:Object(d.jsx)("li",{className:"nav-item",children:s?i?Object(d.jsx)("span",{className:"nav-link badge bg-success text-dark","aria-current":"page",children:"Host"}):Object(d.jsx)("span",{className:"nav-link badge bg-light text-dark","aria-current":"page",children:"Guest"}):void 0})}),Object(d.jsx)("form",{className:"d-flex ms-auto",children:Object(d.jsx)(g,{onChange:function(e){var t=e.target.checked;r(t)},checked:s,children:"Sangai Sunam (Beta)"})})]})]})})},h=n(8),m=n.n(h),p=n(12),k=n(34),N=n(29),y=n.n(N),S=n(30),w=n(31),C=n(13),E=n(32),_=n(35),I=n(36),R={baseUrl:"https://4c6836222db9.ngrok.io",webSocketUrl:"wss://4c6836222db9.ngrok.io/ws"},P=n(33),F=n.n(P),L=function(e){Object(E.a)(n,e);var t=Object(_.a)(n);function n(e,c,a,s){var r;return Object(S.a)(this,n),(r=t.call(this,c)).statusCode=void 0,r.details=void 0,r.axiosError=void 0,r.statusCode=e,r.details=a,r.axiosError=s,Object.setPrototypeOf(Object(C.a)(r),n.prototype),r}return Object(w.a)(n,[{key:"serializeErrors",value:function(){return[{message:this.message,status:this.statusCode,details:this.details}]}}]),n}(Object(I.a)(Error)),M=F.a.create({baseURL:R.baseUrl});M.interceptors.response.use((function(e){return e}),(function(e){if(e.response)throw new L(e.response.status,e.response.data.message,e.response.data,e.response);if(e.request)throw new L(500,"No Response",{},e.request);throw new L(500,e.message,{message:"Setting error"},{})}));var J=function(){var e=Object(p.a)(m.a.mark((function e(t){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.request(t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),T=function(e){var t=e.title,n=e.className,c=void 0===n?"":n;return Object(d.jsx)("span",{className:"badge mt-1 me-2 ".concat(c),children:t})},$=function(e){var t=e.song,n=e.onClick,c=e.isCurrent,a=e.playing,s=e.progress,r=e.isNextSong,i=e.duration,o=e.className;return Object(d.jsxs)("li",{onClick:n,className:"list-group-item p-0 text-white px-5 py-2 mb-2 ".concat(o||""),style:{cursor:"pointer"},children:[Object(d.jsxs)("div",{className:" d-flex",children:[Object(d.jsx)("div",{className:"flex-shrink-0 d-flex",style:{width:"20%"},children:Object(d.jsx)("div",{className:"align-self-center",children:Object(d.jsx)("img",{src:t.thumbnail_url,className:"img-fluid",alt:t.title})})}),Object(d.jsxs)("div",{className:"flex-grow-1 py-2 px-3",children:[Object(d.jsx)("p",{className:"mb-1",children:t.title||t.url}),Object(d.jsx)("p",{className:"text-muted",children:t.description}),Object(d.jsxs)("div",{className:"d-flex",children:[c&&a&&Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(T,{className:"align-self-center bg-success",title:"Playing"}),Object(d.jsx)(T,{className:"align-self-center bg-light text-dark",title:"".concat(s," %")})]}),c&&!a&&Object(d.jsx)(T,{className:"align-self-center bg-danger",title:"Paused"}),r&&Object(d.jsx)(d.Fragment,{children:Object(d.jsx)(T,{className:"align-self-center bg-warning text-dark",title:"Up Next"})})]})]})]}),c&&Object(d.jsx)("div",{className:"progress bg-dark mt-2",style:{height:"4px"},children:Object(d.jsx)("div",{className:"progress-bar bg-danger",role:"progressbar",style:{width:"".concat(s,"%")},"aria-valuenow":s,"aria-valuemin":0,"aria-valuemax":i})})]})},H=function(){return Object(d.jsx)("div",{className:"spinner-border text-light",role:"status",children:Object(d.jsx)("span",{className:"visually-hidden",children:"Loading..."})})},U=function(e){var t=e.children;return Object(d.jsx)("div",{className:"video-player",children:t})},q=function(){var e=v(),t=e.socketConnected,n=e.socketId,a=e.socketRef,s=e.emitterRef,r=e.isSyncMode,o=e.isHost,l=Object(c.useState)([]),u=Object(i.a)(l,2),b=u[0],j=u[1],O=Object(c.useState)(!1),g=Object(i.a)(O,2),x=g[0],h=g[1],N=Object(c.useState)(!1),S=Object(i.a)(N,2),w=S[0],C=S[1],E=Object(c.useState)(!1),_=Object(i.a)(E,2),I=_[0],R=_[1],P=Object(c.useRef)(null),F=Object(c.useRef)({seek:0}),L=Object(c.useState)({_id:{$oid:""},user:"",url:"",thumbnail_url:"",status:"pending",title:"",description:"",index:0}),M=Object(i.a)(L,2),T=M[0],q=M[1],B=Object(c.useCallback)((function(e){j([].concat(Object(k.a)(b),[e]))}),[b]),D=!r||!!o,z=Object(c.useCallback)((function(e){var t=JSON.parse(e),n=t.video_id,c=t.seek,a=t.video_index,s=T._id.$oid,r=parseFloat(c),i=parseInt(a,10);if(s===n&&q(Object(f.a)(Object(f.a)({},T),{},{playedSeconds:r})),s!==n&&b.length>i){var o=b[i];q(Object(f.a)(Object(f.a)({},o),{},{playedSeconds:r,index:i}))}}),[T,b]),G=function(e){var t,n=null===P||void 0===P||null===(t=P.current)||void 0===t?void 0:t.getInternalPlayer();n&&n.seekTo(e)},A=Object(c.useCallback)((function(e){var t=JSON.parse(e),n=t.video_id,c=t.video_index,a=t.seek,s=t.playing,r=T._id.$oid,i=parseFloat(a),o=parseInt(c,10);if(r===n&&q(Object(f.a)({},T)),r!==n&&b.length>o){var l=b[o];q(Object(f.a)(Object(f.a)({},l),{},{index:o}))}F.current.seek=i,G(i),h("true"===s)}),[T,b]),W=Object(c.useCallback)((function(){return null===a||void 0===a?void 0:a.current}),[a]),K=Object(c.useCallback)((function(e){var t;o&&r&&(null===(t=W())||void 0===t||t.send("/pp ".concat(T._id.$oid," ").concat(T.playedSeconds||0," ").concat(e," ").concat(T.index||0)))}),[T,r,o,W]),Q=Object(c.useCallback)((function(e){var t;o&&r&&(null===(t=W())||void 0===t||t.send("/seek ".concat(T._id.$oid," ").concat(e||0," ").concat(T.index||0)))}),[o,r,T,W]),V=Object(c.useCallback)((function(){K(x)}),[K,x]);Object(c.useEffect)((function(){var e=null===a||void 0===a?void 0:a.current,c=null===s||void 0===s?void 0:s.current;return c&&n&&t&&e&&o&&r&&c.on("syncRoomJoined",V),function(){null===c||void 0===c||c.removeListener("syncRoomJoined",V)}}),[a,s,t,n,V,x,o,r]),Object(c.useEffect)((function(){var e=null===a||void 0===a?void 0:a.current,c=null===s||void 0===s?void 0:s.current;I||r&&e&&t&&n&&c&&(R(!0),console.log("added sync mode listeners"),c.on("playPause",A),c.on("seek",z))}),[r,a,s,n,t,b,I,A,z]),Object(c.useEffect)((function(){var e=null===s||void 0===s?void 0:s.current;return function(){console.log("removed sync mode listeners"),null===e||void 0===e||e.removeListener("playPause",A),null===e||void 0===e||e.removeListener("seek",z)}}),[]),Object(c.useEffect)((function(){var e=null===a||void 0===a?void 0:a.current,c=null===s||void 0===s?void 0:s.current,r=function(e){var t=JSON.parse(e);B(t)};return t&&e&&n&&c&&(console.log("all done"),c.on("newSong",r)),function(){console.log("Clear"),null===c||void 0===c||c.removeListener("newSong",r)}}),[n,t,a,s,B]),Object(c.useEffect)((function(){(function(){var e=Object(p.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,C(!0),e.next=4,J({method:"GET",url:"/playlist"});case 4:t=e.sent,j(t),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:return e.prev=11,C(!1),e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[0,8,11,14]])})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(c.useEffect)((function(){!b.length||x||T.url||q(Object(f.a)(Object(f.a)(Object(f.a)({},T),b[0]),{},{index:0}))}),[b,x,T]);var X=T.playedSeconds,Y=T.duration,Z=X&&Y?Math.round(X/Y*100):0;return w?Object(d.jsx)("div",{className:"max-height bg-dark d-flex align-items-center justify-content-center w-full",children:Object(d.jsx)(H,{})}):Object(d.jsxs)("div",{className:"overflow-hidden d-flex bg-dark",children:[Object(d.jsxs)("div",{className:"flex-grow-1 col max-height",children:[!D&&Object(d.jsx)("div",{style:{width:"100%",height:"100%",zIndex:1,position:"absolute"}}),Object(d.jsx)(y.a,{ref:P,url:T.url,playing:x,onStart:function(){F.current.seek&&G(F.current.seek),K(!0),h(!0)},onPlay:function(){K(!0),h(!0)},onPause:function(){K(!1),h(!1)},pip:!0,onSeek:function(e){D&&Q(e)},onProgress:function(e){var t=e.playedSeconds;q(Object(f.a)(Object(f.a)({},T),{},{playedSeconds:t}))},onDuration:function(e){console.log({duration:e}),q(Object(f.a)(Object(f.a)({},T),{},{duration:e}))},onEnded:function(){if(F.current.seek=0,b.length){var e=T.index+1;e===b.length?q(Object(f.a)(Object(f.a)({},b[0]),{},{index:0})):q(Object(f.a)(Object(f.a)({},b[e]),{},{index:e}))}},width:"100%",wrapper:U})]}),Object(d.jsx)("div",{className:"flex-shrink-0 col-sm-4 overflow-auto max-height",children:Object(d.jsx)("ul",{className:"list-group list-group-flush",children:b.map((function(e,t){var n,c,a,s=(null===(n=T._id)||void 0===n?void 0:n.$oid)===(null===(c=e._id)||void 0===c?void 0:c.$oid),r=T.index+1,i=r===b.length?0:r;return Object(d.jsx)($,{className:"".concat(s?"bg-black":"bg-dark"),onClick:function(n){n.preventDefault(),!s&&D&&(q(Object(f.a)(Object(f.a)({},e),{},{index:t})),h(!0))},song:e,isCurrent:s,playing:x,isNextSong:i===t,duration:Y||0,progress:Z},null===(a=e._id)||void 0===a?void 0:a.$oid)}))})})]})};var B=function(){return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(x,{}),Object(d.jsx)(q,{})]})},D=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,86)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),s(e),r(e)}))};n(84);r.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(j,{url:R.webSocketUrl,children:Object(d.jsx)(B,{})})}),document.getElementById("root")),D()}},[[85,1,2]]]);
//# sourceMappingURL=main.4c7fc628.chunk.js.map