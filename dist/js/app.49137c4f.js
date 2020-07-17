(function(e){function t(t){for(var o,s,r=t[0],c=t[1],u=t[2],d=0,p=[];d<r.length;d++)s=r[d],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&p.push(i[s][0]),i[s]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);l&&l(t);while(p.length)p.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,r=1;r<n.length;r++){var c=n[r];0!==i[c]&&(o=!1)}o&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},i={app:0},a=[];function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var u=0;u<r.length;u++)t(r[u]);var l=c;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var o=n("85ec"),i=n.n(o);i.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Test")],1)},a=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"motion-app"},[n("div",{staticClass:"welcome"},[n("h1",[e._v("欢迎来到语音情绪识别系统")]),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.isStarted,expression:"!isStarted"}],staticClass:"start",on:{click:function(t){e.isStarted=!0}}},[e._v(" 立即体验 ")])]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.isStarted,expression:"isStarted"}],staticClass:"test-input"},[n("button",{directives:[{name:"show",rawName:"v-show",value:!e.isRecording,expression:"!isRecording"}],staticClass:"record",on:{click:e.getRecorder}},[e._v(" 录音 ")]),n("button",{directives:[{name:"show",rawName:"v-show",value:e.isRecording,expression:"isRecording"}],staticClass:"stop-record",on:{click:e.stopRecorder}},[e._v(" 停止 ")])]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.isStarted,expression:"isStarted"}],staticClass:"app-container"},[n("div",{staticClass:"scene-selector"},[n("span",[e._v("请选择对话场景:")]),n("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedScene,expression:"selectedScene"}],attrs:{name:"scene",id:"scene"},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.selectedScene=t.target.multiple?n:n[0]}}},[n("option",{attrs:{value:"default"}},[e._v("任意")]),n("option",{attrs:{value:"talk"}},[e._v("闲聊")]),n("option",{attrs:{value:"task"}},[e._v("任务")]),n("option",{attrs:{value:"customer_service"}},[e._v("客服")])])]),n("div",{staticClass:"result-container"},[n("div",{staticClass:"input-content"},[e._m(0),e.userInput.length>0?n("div",{staticClass:"user-input"},[e._v("您输入的内容是："+e._s(e.userInput))]):n("div",{staticClass:"user-input"},[e._v("请点击录音进行语音输入")])]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.motion1,expression:"motion1"}],staticClass:"result-desc"},[e.motion2?n("p",[e._v("您的情绪是：("+e._s(e.selectedSceneCN)+")"+e._s(e.motion1)+" "+e._s(e.motion2))]):n("p",[e._v("您的情绪是：("+e._s(e.selectedSceneCN)+")"+e._s(e.motion1))])])])])])},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"audio-wrap"},[n("audio",{attrs:{id:"player",controls:""}})])}],c=(n("ac1f"),n("1276"),n("96cf"),n("1da1")),u=n("6c03"),l={mounted:function(){this.getAccessTokens()},data:function(){return{userInput:"",motionAccessToken:"",scenes:["default","talk","task","customer_service"],selectedScene:"default",motionData:{},stream:null,mediaStreamTrack:null,mediaRecorder:null,chunks:[],voiceAccessToken:"",voiceData:null,size:8e3,motionLevel1:{pessimistic:"负向情绪",neutral:"中性情绪",optimistic:"正向情绪"},motionLevel2:{thankful:"感谢",happy:"愉快",complaining:"抱怨",angry:"愤怒",like:"喜爱",disgusting:"厌恶",fearful:"恐惧",sad:"悲伤"},isRecording:!1,isStarted:!1}},methods:{getAccessTokens:function(){var e=this;this.axios.post("/baiduApi/oauth/2.0/token?grant_type=client_credentials&client_id=IOGlBFG3B13TIzgSCYGRQz5k&client_secret=W5auMeyiTNfHkRdDa1viHjt7RXyAcWA0&").then((function(t){var n,o=null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.access_token;o?e.motionAccessToken=o:console.log("获取token失败")})).catch((function(e){console.log(e)})),this.axios.post("/baiduApi/oauth/2.0/token?grant_type=client_credentials&client_id=LUWklplmtiXwexyH8qcURmbG&client_secret=A0fC9ptlix7nOBOIkxge8cNonuPyx2sv&").then((function(t){var n,o=null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.access_token;o?e.voiceAccessToken=o:console.log("获取token失败")})).catch((function(e){console.log(e)}))},getData:function(){var e=this;0!==this.motionAccessToken.length&&0!==this.userInput.length&&this.axios({method:"post",url:"/baiduApi/rpc/2.0/nlp/v1/emotion",params:{charset:"UTF-8",access_token:this.motionAccessToken},data:{scene:this.selectedScene,text:this.apiInput}}).then((function(t){e.motionData=t.data})).catch((function(e){console.log(e)}))},getRecorder:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.stream){t.next=3;break}return t.next=3,navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then((function(t){e.stream=t})).catch((function(e){console.log(e)}));case 3:e.mediaStreamTrack="function"===typeof e.stream.stop?e.stream:e.stream.getTracks()[0],n=new u["b"],e.mediaRecorder=n,n.start().then((function(){e.motionData={},e.isRecording=!0})).catch((function(e){console.log("Recording failed.",e)}));case 7:case"end":return t.stop()}}),t)})))()},stopRecorder:function(){var e=this;if(this.mediaRecorder){this.mediaRecorder.pause();var t=this.mediaRecorder.getRecord({encodeTo:u["a"].WAV,compressible:!0}),n=new FileReader;n.onload=function(n){e.voiceData=n.target.result.split("data:audio/wav;base64,")[1],e.size=t.size;var o=document.getElementById("player");o.src=n.target.result,o.play(),e.isRecording=!1,e.getTextFromApi()},n.readAsDataURL(t)}},getTextFromApi:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.axios({method:"post",url:"/voiceApi/server_api",data:{format:"wav",rate:16e3,dev_pid:1537,channel:1,token:e.voiceAccessToken,cuid:"pk147",len:e.size,speech:e.voiceData}}).then((function(t){console.log(t),e.mediaRecorder.clear(),e.userInput=t.data.result[0],""!==e.userInput?e.getData():e.userInput="识别失败"})).catch((function(e){console.log(e)}));case 1:case"end":return t.stop()}}),t)})))()}},computed:{apiInput:function(){return this.userInput},motion1:function(){return Array.isArray(this.motionData.items)?this.motionLevel1[this.motionData.items[0].label]:(console.log("not array"),"")},motion2:function(){if(""===this.motion1)return"";var e=this.motionData.items[0].subitems;return console.log(e),e.length>0?this.motionLevel2[e[0].label]:""},selectedSceneCN:function(){var e=this.selectedScene;return"default"===e?"任意":"talk"===e?"闲聊":"task"===e?"任务":"客服"}}},d=l,p=(n("75e4"),n("2877")),v=Object(p["a"])(d,s,r,!1,null,"441516ca",null),m=v.exports,f={name:"App",components:{Test:m}},h=f,g=(n("034f"),Object(p["a"])(h,i,a,!1,null,null,null)),_=g.exports,k=n("62c3"),w=n.n(k),b=n("8549"),y=n.n(b);o["a"].use(y.a,w.a),o["a"].config.productionTip=!1,new o["a"]({render:function(e){return e(_)}}).$mount("#app")},"75e4":function(e,t,n){"use strict";var o=n("992f"),i=n.n(o);i.a},"85ec":function(e,t,n){},"992f":function(e,t,n){}});
//# sourceMappingURL=app.49137c4f.js.map