(this["webpackJsonpslack-music-bot-client"]=this["webpackJsonpslack-music-bot-client"]||[]).push([[0],{100:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),s=n(32),r=n.n(s),i=n(2),o=n(3),l=n(33),d=n.n(l),u=n(0),b={latency:0,tolerance:.9},j={socketConnected:!1,socketId:"",isSyncMode:!1,isHost:!1,setIsSyncMode:function(){throw new Error("NOt implemented")},latencyAndTolerance:b,setLatencyAndTolerance:function(){throw new Error("NOt implemented")}},v=Object(a.createContext)(j),O=function(e){var t=e.children,n=function(e){var t=Object(a.useRef)(),n=Object(a.useRef)(new d.a),c=Object(a.useState)(""),s=Object(o.a)(c,2),r=s[0],i=s[1],l=Object(a.useState)(!1),u=Object(o.a)(l,2),j=u[0],v=u[1],O=Object(a.useState)(b),f=Object(o.a)(O,2),p=f[0],g=f[1],m=Object(a.useState)(!1),x=Object(o.a)(m,2),h=x[0],k=x[1],y=Object(a.useState)(!1),N=Object(o.a)(y,2),S=N[0],w=N[1];return Object(a.useEffect)((function(){var a=new WebSocket(e);t.current=a,a&&(a.onopen=function(){v(!0)},a.onclose=function(){i(""),v(!1)},a.onmessage=function(e){var t,a=JSON.parse(e.data),c=a.message,s=a.event_type;"welcome"===s&&i(c),"host"===s&&k("true"===c),null===(t=n.current)||void 0===t||t.emit(s,c),console.log("Received: "+e.data)})}),[e]),console.log({isHost:h}),Object(a.useEffect)((function(){return function(){t.current&&t.current.close(),n.current&&n.current.removeAllListeners()}}),[]),{socketRef:t,emitterRef:n,socketConnected:j,socketId:r,isHost:h,isSyncMode:S,latencyAndTolerance:p,setLatencyAndTolerance:g,setIsSyncMode:w}}(e.url||"");return Object(u.jsx)(v.Provider,{value:n,children:t})},f=function(){return Object(a.useContext)(v)},p=n(43),g=function(e){var t=e.className,n=void 0===t?"":t,a=e.children,c=e.id,s=Object(p.a)(e,["className","children","id"]);return Object(u.jsxs)("div",{className:"form-check form-switch ".concat(n),children:[Object(u.jsx)("input",Object(i.a)(Object(i.a)({type:"checkbox",className:"form-check-input"},s),{},{id:c})),Object(u.jsx)("label",{className:"form-check-label text-light",htmlFor:c,children:a})]})},m=function(){var e=f(),t=e.socketConnected,n=e.socketId,c=e.socketRef,s=e.isSyncMode,r=e.setIsSyncMode,l=e.isHost,d=e.latencyAndTolerance,b=e.setLatencyAndTolerance,j=Object(a.useState)(!1),v=Object(o.a)(j,2),O=v[0],p=v[1];return Object(a.useEffect)((function(){var e=null===c||void 0===c?void 0:c.current;t&&n&&e&&(s?e.send("/join sync"):e.send("/leave sync"))}),[s,c,t,n]),Object(u.jsx)("nav",{className:"navbar fixed-top navbar-expand-lg navbar-dark bg-dark",children:Object(u.jsxs)("div",{className:"container-fluid",children:[Object(u.jsx)("a",{className:"navbar-brand",href:"/",children:"Innovate Playlist"}),Object(u.jsx)("button",{className:"navbar-toggler",type:"button",onClick:function(e){e.preventDefault(),p(!O)},"aria-expanded":O,"data-bs-toggle":"collapse","data-bs-target":"#navbarText","aria-controls":"navbarText","aria-label":"Toggle navigation",children:Object(u.jsx)("span",{className:"navbar-toggler-icon"})}),Object(u.jsxs)("div",{className:"collapse navbar-collapse ".concat(O?"show":""),id:"navbarText",children:[Object(u.jsx)("ul",{className:"navbar-nav py-2 py-md-0",children:Object(u.jsx)("li",{className:"nav-item",children:s?l?Object(u.jsx)("span",{className:"nav-link badge bg-success text-dark","aria-current":"page",children:"Host"}):Object(u.jsx)("span",{className:"nav-link badge bg-warning text-dark","aria-current":"page",children:"Guest"}):void 0})}),Object(u.jsxs)("form",{className:"d-flex ms-auto",children:[s&&!l&&Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("div",{className:"input-group me-1",children:[Object(u.jsxs)("span",{className:"input-group-text bg-dark text-light border-0",children:["Latency:"," "]}),Object(u.jsx)("span",{className:"input-group-text bg-dark text-light border-0",children:d.latency.toFixed(2)}),Object(u.jsxs)("span",{className:"input-group-text bg-dark text-light border-0",children:["Tolerance:"," "]}),Object(u.jsx)("input",{type:"number",min:"0",max:"5",style:{width:"75px"},className:"form-control bg-dark text-light border-0",step:"0.1",value:d.tolerance,onChange:function(e){var t=e.target.value;b(Object(i.a)(Object(i.a)({},d),{},{tolerance:parseFloat(t||"0")}))},"aria-label":"Dollar amount (with dot and two decimal places)"})]})}),Object(u.jsx)(g,{className:"flex-shrink-0 align-self-center",onChange:function(e){var t=e.target.checked;r(t)},checked:s,children:"Sangai Sunam"})]})]})]})})},x=n(9),h=n.n(x),k=n(13),y=n(7),N=n(40),S=n(34),w=n.n(S),C=n(35),E=n(36),_=n(14),T=n(37),R=n(41),L=n(42),P={baseUrl:"https://slack-music-bot-rs.herokuapp.com",webSocketUrl:"wss://slack-music-bot-rs.herokuapp.com/ws"},F=n(38),I=n.n(F),M=function(e){Object(T.a)(n,e);var t=Object(R.a)(n);function n(e,a,c,s){var r;return Object(C.a)(this,n),(r=t.call(this,a)).statusCode=void 0,r.details=void 0,r.axiosError=void 0,r.statusCode=e,r.details=c,r.axiosError=s,Object.setPrototypeOf(Object(_.a)(r),n.prototype),r}return Object(E.a)(n,[{key:"serializeErrors",value:function(){return[{message:this.message,status:this.statusCode,details:this.details}]}}]),n}(Object(L.a)(Error)),$=I.a.create({baseURL:P.baseUrl});$.interceptors.response.use((function(e){return e}),(function(e){if(e.response)throw new M(e.response.status,e.response.data.message,e.response.data,e.response);if(e.request)throw new M(500,"No Response",{},e.request);throw new M(500,e.message,{message:"Setting error"},{})}));var A=function(){var e=Object(k.a)(h.a.mark((function e(t){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,$.request(t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),J=function(e){var t=e.title,n=e.className,a=void 0===n?"":n;return Object(u.jsx)("span",{className:"badge mt-1 me-2 ".concat(a),children:t})},H=function(e){var t=e.song,n=e.onClick,a=e.isCurrent,c=e.playing,s=e.progress,r=e.isNextSong,i=e.duration,o=e.className;return Object(u.jsxs)("li",{onClick:n,className:"list-group-item p-0 text-white px-5 py-2 mb-2 ".concat(o||""),style:{cursor:"pointer"},children:[Object(u.jsxs)("div",{className:" d-flex",children:[Object(u.jsx)("div",{className:"flex-shrink-0 d-flex",style:{width:"20%"},children:Object(u.jsx)("div",{className:"align-self-center",children:Object(u.jsx)("img",{src:t.thumbnail_url,className:"img-fluid",alt:t.title})})}),Object(u.jsxs)("div",{className:"flex-grow-1 py-2 px-3",children:[Object(u.jsx)("p",{className:"mb-1",children:t.title||t.url}),Object(u.jsx)("p",{className:"text-muted",children:t.description}),Object(u.jsxs)("div",{className:"d-flex",children:[a&&c&&Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(J,{className:"align-self-center bg-success",title:"Playing"}),Object(u.jsx)(J,{className:"align-self-center bg-light text-dark",title:"".concat(s," %")})]}),a&&!c&&Object(u.jsx)(J,{className:"align-self-center bg-danger",title:"Paused"}),r&&Object(u.jsx)(u.Fragment,{children:Object(u.jsx)(J,{className:"align-self-center bg-warning text-dark",title:"Up Next"})})]})]})]}),a&&Object(u.jsx)("div",{className:"progress bg-dark mt-2",style:{height:"4px"},children:Object(u.jsx)("div",{className:"progress-bar bg-danger",role:"progressbar",style:{width:"".concat(s,"%")},"aria-valuenow":s,"aria-valuemin":0,"aria-valuemax":i})})]})},U=function(){return Object(u.jsx)("div",{className:"spinner-border text-light",role:"status",children:Object(u.jsx)("span",{className:"visually-hidden",children:"Loading..."})})},D=function(e){var t=e.children;return Object(u.jsx)("div",{className:"video-player",children:t})},q=n(39),z=n.n(q),B=function(){var e=f(),t=e.socketConnected,n=e.socketId,c=e.socketRef,s=e.emitterRef,r=e.isSyncMode,l=e.isHost,d=e.latencyAndTolerance,b=e.setLatencyAndTolerance,j=Object(a.useState)([]),v=Object(o.a)(j,2),O=v[0],p=v[1],g=Object(a.useState)(!1),m=Object(o.a)(g,2),x=m[0],S=m[1],C=Object(a.useState)(!1),E=Object(o.a)(C,2),_=E[0],T=E[1],R=Object(a.useRef)(null),L=Object(a.useState)({}),P=Object(o.a)(L,2),F=P[0],I=P[1],M=Object(a.useRef)({sendSeekMessage:function(){}}),$=Object(a.useState)({}),J=Object(o.a)($,2),q=J[0],B=J[1],G=Object(a.useState)({}),V=Object(o.a)(G,2),W=V[0],K=V[1],Q=Object(a.useState)({_id:{$oid:""},user:"",url:"",thumbnail_url:"",status:"pending",title:"",description:"",index:0}),X=Object(o.a)(Q,2),Y=X[0],Z=X[1],ee=Object(a.useCallback)((function(e){p([].concat(Object(N.a)(O),[e]))}),[O]),te=!r||!!l,ne=Object(a.useCallback)((function(e,t){console.log({seekNum:e,isPlaying:t},"video");try{var n,a,c=null===R||void 0===R||null===(n=R.current)||void 0===n?void 0:n.getInternalPlayer();null===R||void 0===R||null===(a=R.current)||void 0===a||a.seekTo(e,"seconds"),c&&(console.log("video try update"),c.seekTo(e,!0),t?c.playVideo():c.pauseVideo(),S(t),I({}))}catch(s){console.log("video try update error",s)}}),[]),ae=Object(a.useCallback)((function(e){var t=JSON.parse(e),n=t.video_id,a=t.video_index,c=t.seek,s=t.playing;console.log("video play pause handler");var r=Y._id.$oid,o=parseFloat(c),l=parseInt(a,10),d="true"===s,u=Y;r===n&&(console.log("current video"),Z(Object(i.a)({},Y))),r!==n&&O.length>l&&(console.log("different video"),u=Object(i.a)(Object(i.a)({},O[l]),{},{index:l}),Z(Object(i.a)({},u))),I(Object(y.a)({},n,{seek:o,playing:d}))}),[Y,O]),ce=Object(a.useCallback)((function(e){var t=JSON.parse(e),n=t.video_id,a=t.seek,c=W[n],s=parseFloat(a),r=Math.abs(((null===c||void 0===c?void 0:c.playedSeconds)||0)-s),o=d.tolerance;console.log({difference:r,tolerance:o}),b(Object(i.a)(Object(i.a)({},d),{},{latency:r})),c&&r>o&&I(Object(y.a)({},n,{seek:s,playing:!0}))}),[W,d,b]);Object(a.useEffect)((function(){var e,t=Y._id.$oid,n=F[t];if(!0===(null===(e=q[t])||void 0===e?void 0:e.ready)&&n){console.log("after video is ready from useEffect",n),ne(n.seek,n.playing||!1);var a=Y._id.$oid,c=W[a];K(Object(y.a)({},a,Object(i.a)(Object(i.a)({},c),{},{playedSeconds:n.seek})))}}),[q,Y,ne,F,W]);var se=Object(a.useCallback)((function(){return null===c||void 0===c?void 0:c.current}),[c]),re=Object(a.useCallback)((function(e){if(l&&r){var t,n,a=Y._id.$oid;null===(t=se())||void 0===t||t.send("/pp ".concat(a," ").concat((null===(n=W[a])||void 0===n?void 0:n.playedSeconds)||0," ").concat(e," ").concat(Y.index||0))}}),[Y,r,l,se,W]),ie=Object(a.useCallback)((function(e){var t;l&&r&&(null===(t=se())||void 0===t||t.send("/seek ".concat(Y._id.$oid," ").concat(e||0," ").concat(Y.index||0)))}),[l,r,Y,se]);Object(a.useEffect)((function(){M.current={sendSeekMessage:z()(ie,3e3,{maxWait:1500,leading:!1,trailing:!0})}}),[ie]);var oe=Object(a.useCallback)((function(){re(x)}),[re,x]);Object(a.useEffect)((function(){var e=null===c||void 0===c?void 0:c.current,a=null===s||void 0===s?void 0:s.current;return a&&n&&t&&e&&l&&r&&a.on("syncRoomJoined",oe),function(){null===a||void 0===a||a.removeListener("syncRoomJoined",oe)}}),[c,s,t,n,oe,x,l,r]),Object(a.useEffect)((function(){var e=null===c||void 0===c?void 0:c.current,a=null===s||void 0===s?void 0:s.current;return e&&t&&n&&a&&(a.on("playPause",ae),a.on("seek",ce)),function(){null===a||void 0===a||a.removeListener("playPause",ae),null===a||void 0===a||a.removeListener("seek",ce)}}),[c,s,n,t,ae,ce]),Object(a.useEffect)((function(){var e=null===c||void 0===c?void 0:c.current,a=null===s||void 0===s?void 0:s.current,r=function(e){var t=JSON.parse(e);ee(t)};return t&&e&&n&&a&&a.on("newSong",r),function(){null===a||void 0===a||a.removeListener("newSong",r)}}),[n,t,c,s,ee]),Object(a.useEffect)((function(){(function(){var e=Object(k.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,T(!0),e.next=4,A({method:"GET",url:"/playlist"});case 4:t=e.sent,p(t);case 6:return e.prev=6,T(!1),e.finish(6);case 9:case"end":return e.stop()}}),e,null,[[0,,6,9]])})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(a.useEffect)((function(){!O.length||x||Y.url||Z(Object(i.a)(Object(i.a)(Object(i.a)({},Y),O[0]),{},{index:0}))}),[O,x,Y]);var le=W[Y._id.$oid]||{playedSeconds:0,duration:0},de=le.playedSeconds,ue=le.duration,be=de&&ue?Math.round(de/ue*100):0;return _?Object(u.jsx)("div",{className:"max-height bg-dark d-flex align-items-center justify-content-center w-full",children:Object(u.jsx)(U,{})}):Object(u.jsxs)("div",{className:"overflow-hidden d-flex bg-dark",children:[Object(u.jsxs)("div",{className:"flex-grow-1 col max-height",children:[!te&&Object(u.jsx)("div",{style:{width:"100%",height:"100%",zIndex:1,position:"absolute"}}),Object(u.jsx)(w.a,{ref:R,url:Y.url,playing:x,onReady:function(){console.log("video ready callback"),B(Object(y.a)({},Y._id.$oid,{ready:!0}))},onStart:function(){re(!0),S(!0)},onPlay:function(){re(!0),S(!0)},onPause:function(){re(!1),S(!1)},pip:!0,onSeek:function(e){te&&ie(e)},onProgress:function(e){var t=e.playedSeconds,n=Y._id.$oid,a=W[n];K(Object(y.a)({},n,Object(i.a)(Object(i.a)({},a),{},{playedSeconds:t}))),M.current.sendSeekMessage(t)},onDuration:function(e){var t=Y._id.$oid,n=W[t];K(Object(y.a)({},t,Object(i.a)(Object(i.a)({},n),{},{duration:e})))},onEnded:function(){if(O.length){var e=Y.index+1;e===O.length?Z(Object(i.a)(Object(i.a)({},O[0]),{},{index:0})):Z(Object(i.a)(Object(i.a)({},O[e]),{},{index:e}))}},width:"100%",wrapper:D})]}),Object(u.jsx)("div",{className:"flex-shrink-0 col-sm-4 overflow-auto max-height",children:Object(u.jsx)("ul",{className:"list-group list-group-flush",children:O.map((function(e,t){var n,a,c,s=(null===(n=Y._id)||void 0===n?void 0:n.$oid)===(null===(a=e._id)||void 0===a?void 0:a.$oid),r=Y.index+1,o=r===O.length?0:r;return Object(u.jsx)(H,{className:"".concat(s?"bg-black":"bg-dark"),onClick:function(n){n.preventDefault(),!s&&te&&(Z(Object(i.a)(Object(i.a)({},e),{},{index:t})),S(!0))},song:e,isCurrent:s,playing:x,isNextSong:o===t,duration:ue||0,progress:be},null===(c=e._id)||void 0===c?void 0:c.$oid)}))})})]})};var G=function(){return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(m,{}),Object(u.jsx)(B,{})]})},V=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,101)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),s(e),r(e)}))};n(99);r.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(O,{url:P.webSocketUrl,children:Object(u.jsx)(G,{})})}),document.getElementById("root")),V()},99:function(e,t,n){}},[[100,1,2]]]);
//# sourceMappingURL=main.1df5c792.chunk.js.map