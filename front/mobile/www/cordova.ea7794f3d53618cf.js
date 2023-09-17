(function(){var PLATFORM_VERSION_BUILD_LABEL="12.0.0",require,define,s,f,p;s={},f=[],p={},require=function(n){if(!s[n])throw new Error("module "+n+" not found");if(n in p){var c=f.slice(p[n]).join("->")+"->"+n;throw new Error("Cycle in require graph: "+c)}if(s[n].factory)try{return p[n]=f.length,f.push(n),function d(n){var c=n.factory;return n.exports={},delete n.factory,c(function(t){var e=t;return"."===t.charAt(0)&&(e=n.id.slice(0,n.id.lastIndexOf("."))+"."+t.slice(2)),require(e)},n.exports,n),n.exports}(s[n])}finally{delete p[n],f.pop()}return s[n].exports},(define=function(n,c){if(Object.prototype.hasOwnProperty.call(s,n))throw new Error("module "+n+" already defined");s[n]={id:n,factory:c}}).remove=function(n){delete s[n]},define.moduleMap=s,"object"==typeof module&&"function"==typeof require&&(module.exports.require=require,module.exports.define=define),define("cordova",function(s,f,p){if(window.cordova&&!(window.cordova instanceof HTMLElement))throw new Error("cordova already defined");var a=s("cordova/channel"),d=s("cordova/platform"),n=document.addEventListener,c=document.removeEventListener,l=window.addEventListener,t=window.removeEventListener,e={},r={};function o(i,v){var h=document.createEvent("Events");if(h.initEvent(i,!1,!1),v)for(var m in v)Object.prototype.hasOwnProperty.call(v,m)&&(h[m]=v[m]);return h}document.addEventListener=function(i,v,h){var m=i.toLowerCase();typeof e[m]<"u"?e[m].subscribe(v):n.call(document,i,v,h)},window.addEventListener=function(i,v,h){var m=i.toLowerCase();typeof r[m]<"u"?r[m].subscribe(v):l.call(window,i,v,h)},document.removeEventListener=function(i,v,h){var m=i.toLowerCase();typeof e[m]<"u"?e[m].unsubscribe(v):c.call(document,i,v,h)},window.removeEventListener=function(i,v,h){var m=i.toLowerCase();typeof r[m]<"u"?r[m].unsubscribe(v):t.call(window,i,v,h)};var u={define,require:s,version:PLATFORM_VERSION_BUILD_LABEL,platformVersion:PLATFORM_VERSION_BUILD_LABEL,platformId:d.id,addWindowEventHandler:function(i){return r[i]=a.create(i)},addStickyDocumentEventHandler:function(i){return e[i]=a.createSticky(i)},addDocumentEventHandler:function(i){return e[i]=a.create(i)},removeWindowEventHandler:function(i){delete r[i]},removeDocumentEventHandler:function(i){delete e[i]},getOriginalHandlers:function(){return{document:{addEventListener:n,removeEventListener:c},window:{addEventListener:l,removeEventListener:t}}},fireDocumentEvent:function(i,v,h){var m=o(i,v);typeof e[i]<"u"?h?e[i].fire(m):setTimeout(function(){"deviceready"===i&&document.dispatchEvent(m),e[i].fire(m)},0):document.dispatchEvent(m)},fireWindowEvent:function(i,v){var h=o(i,v);typeof r[i]<"u"?setTimeout(function(){r[i].fire(h)},0):window.dispatchEvent(h)},callbackId:Math.floor(2e9*Math.random()),callbacks:{},callbackStatus:{NO_RESULT:0,OK:1,CLASS_NOT_FOUND_EXCEPTION:2,ILLEGAL_ACCESS_EXCEPTION:3,INSTANTIATION_EXCEPTION:4,MALFORMED_URL_EXCEPTION:5,IO_EXCEPTION:6,INVALID_ACTION:7,JSON_EXCEPTION:8,ERROR:9},callbackSuccess:function(i,v){u.callbackFromNative(i,!0,v.status,[v.message],v.keepCallback)},callbackError:function(i,v){u.callbackFromNative(i,!1,v.status,[v.message],v.keepCallback)},callbackFromNative:function(i,v,h,m,b){try{var g=u.callbacks[i];g&&(v&&h===u.callbackStatus.OK?g.success&&g.success.apply(null,m):v||g.fail&&g.fail.apply(null,m),b||delete u.callbacks[i])}catch(E){throw u.fireWindowEvent("cordovacallbackerror",{message:"Error in "+(v?"Success":"Error")+" callbackId: "+i+" : "+E,error:E}),E}},addConstructor:function(i){a.onCordovaReady.subscribe(function(){try{i()}catch(v){console.log("Failed to run constructor: "+v)}})}};p.exports=u}),define("cordova/android/nativeapiprovider",function(s,f,p){var a=this._cordovaNative||s("cordova/android/promptbasednativeapi"),d=a;p.exports={get:function(){return d},setPreferPrompt:function(n){d=n?s("cordova/android/promptbasednativeapi"):a},set:function(n){d=n}}}),define("cordova/android/promptbasednativeapi",function(s,f,p){p.exports={exec:function(a,d,n,c,l){return prompt(l,"gap:"+JSON.stringify([a,d,n,c]))},setNativeToJsBridgeMode:function(a,d){prompt(d,"gap_bridge_mode:"+a)},retrieveJsMessages:function(a,d){return prompt(+d,"gap_poll:"+a)}}}),define("cordova/argscheck",function(s,f,p){var a=s("cordova/utils"),d=p.exports,n={A:"Array",D:"Date",N:"Number",S:"String",F:"Function",O:"Object"};d.checkArgs=function l(e,r,o,u){if(d.enableChecks){for(var v,i=null,h=0;h<e.length;++h){var m=e.charAt(h),b=m.toUpperCase(),g=o[h];if("*"!==m&&(v=a.typeName(g),(null!=g||m!==b)&&v!==n[b])){i="Expected "+n[b];break}}if(i)throw i+=", but got "+v+".",i='Wrong type for parameter "'+function c(e,r){return/\(\s*([^)]*?)\s*\)/.exec(e)[1].split(/\s*,\s*/)[r]}(u||o.callee,h)+'" of '+r+": "+i,typeof jasmine>"u"&&console.error(i),TypeError(i)}},d.getValue=function t(e,r){return void 0===e?r:e},d.enableChecks=!0}),define("cordova/base64",function(s,f,p){var a=f;a.fromArrayBuffer=function(t){return function l(t){for(var o,e=t.byteLength,r="",u=c(),i=0;i<e-2;i+=3)r+=u[(o=(t[i]<<16)+(t[i+1]<<8)+t[i+2])>>12],r+=u[4095&o];return e-i==2?(r+=u[(o=(t[i]<<16)+(t[i+1]<<8))>>12],r+=d[(4095&o)>>6],r+="="):e-i==1&&(r+=u[(o=t[i]<<16)>>12],r+="=="),r}(new Uint8Array(t))},a.toArrayBuffer=function(t){for(var e=atob(t),r=new ArrayBuffer(e.length),o=new Uint8Array(r),u=0,i=e.length;u<i;u++)o[u]=e.charCodeAt(u);return r};var n,d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",c=function(){n=[];for(var t=0;t<64;t++)for(var e=0;e<64;e++)n[64*t+e]=d[t]+d[e];return c=function(){return n},n}}),define("cordova/builder",function(s,f,p){var a=s("cordova/utils");function n(e,r,o){var u=!1;try{e[r]=o}catch{u=!0}(u||e[r]!==o)&&a.defineGetter(e,r,function(){return o})}function c(e,r,o,u){u?a.defineGetter(e,r,function(){return console.log(u),delete e[r],n(e,r,o),o}):n(e,r,o)}function l(e,r,o,u){!function d(e,r,o){for(var u in e)Object.prototype.hasOwnProperty.call(e,u)&&r.apply(o,[e[u],u])}(r,function(i,v){try{var h=i.path?s(i.path):{};o?(typeof e[v]>"u"?c(e,v,h,i.deprecated):typeof i.path<"u"&&(u?t(e[v],h):c(e,v,h,i.deprecated)),h=e[v]):typeof e[v]>"u"?c(e,v,h,i.deprecated):h=e[v],i.children&&l(h,i.children,o,u)}catch(m){a.alert("Exception building Cordova JS globals: "+m+' for key "'+v+'"')}})}function t(e,r){for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e.prototype&&e.prototype.constructor===e?n(e.prototype,o,r[o]):"object"==typeof r[o]&&"object"==typeof e[o]?t(e[o],r[o]):n(e,o,r[o]))}f.buildIntoButDoNotClobber=function(e,r){l(r,e,!1,!1)},f.buildIntoAndClobber=function(e,r){l(r,e,!0,!1)},f.buildIntoAndMerge=function(e,r){l(r,e,!0,!0)},f.recursiveMerge=t,f.assignOrWrapInDeprecateGetter=c}),define("cordova/channel",function(s,f,p){var a=s("cordova/utils"),d=1,n=function(t,e){this.type=t,this.handlers={},this.state=e?1:0,this.fireArgs=null,this.numHandlers=0,this.onHasSubscribersChange=null},c={join:function(t,e){for(var r=e.length,o=r,u=function(){--o||t()},i=0;i<r;i++){if(0===e[i].state)throw Error("Can only use join with sticky channels.");e[i].subscribe(u)}r||t()},create:function(t){return c[t]=new n(t,!1)},createSticky:function(t){return c[t]=new n(t,!0)},deviceReadyChannelsArray:[],deviceReadyChannelsMap:{},waitForInitialization:function(t){if(t){var e=c[t]||this.createSticky(t);this.deviceReadyChannelsMap[t]=e,this.deviceReadyChannelsArray.push(e)}},initializationComplete:function(t){var e=this.deviceReadyChannelsMap[t];e&&e.fire()}};function l(t){if("function"!=typeof t&&"function"!=typeof t.handleEvent)throw new Error("Must provide a function or an EventListener object implementing the handleEvent interface.")}n.prototype.subscribe=function(t,e){var r,o;l(t),t&&"object"==typeof t?(r=t.handleEvent,e=t):r=t,2!==this.state?(o=t.observer_guid,"object"==typeof e&&(r=a.close(e,r)),o||(o=""+d++),r.observer_guid=o,t.observer_guid=o,this.handlers[o]||(this.handlers[o]=r,this.numHandlers++,1===this.numHandlers&&this.onHasSubscribersChange&&this.onHasSubscribersChange())):r.apply(e||this,this.fireArgs)},n.prototype.unsubscribe=function(t){var r;l(t),this.handlers[r=(t&&"object"==typeof t?t.handleEvent:t).observer_guid]&&(delete this.handlers[r],this.numHandlers--,0===this.numHandlers&&this.onHasSubscribersChange&&this.onHasSubscribersChange())},n.prototype.fire=function(t){var e=Array.prototype.slice.call(arguments);if(1===this.state&&(this.state=2,this.fireArgs=e),this.numHandlers){var r=[];for(var o in this.handlers)r.push(this.handlers[o]);for(var u=0;u<r.length;++u)r[u].apply(this,e);2===this.state&&this.numHandlers&&(this.numHandlers=0,this.handlers={},this.onHasSubscribersChange&&this.onHasSubscribersChange())}},c.createSticky("onDOMContentLoaded"),c.createSticky("onNativeReady"),c.createSticky("onCordovaReady"),c.createSticky("onPluginsReady"),c.createSticky("onDeviceReady"),c.create("onResume"),c.create("onPause"),c.waitForInitialization("onCordovaReady"),c.waitForInitialization("onDOMContentLoaded"),p.exports=c}),define("cordova/exec",function(require,exports,module){var cordova=require("cordova"),nativeApiProvider=require("cordova/android/nativeapiprovider"),utils=require("cordova/utils"),base64=require("cordova/base64"),channel=require("cordova/channel"),jsToNativeModes={PROMPT:0,JS_OBJECT:1},nativeToJsModes={POLLING:0,LOAD_URL:1,ONLINE_EVENT:2,EVAL_BRIDGE:3},jsToNativeBridgeMode,nativeToJsBridgeMode=nativeToJsModes.EVAL_BRIDGE,pollEnabled=!1,bridgeSecret=-1,messagesFromNative=[],isProcessing=!1,resolvedPromise=typeof Promise>"u"?null:Promise.resolve(),nextTick=resolvedPromise?function(s){resolvedPromise.then(s)}:function(s){setTimeout(s)};function androidExec(s,f,p,a,d){if(bridgeSecret<0)throw new Error("exec() called without bridgeSecret");void 0===jsToNativeBridgeMode&&androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT),d=d||[];for(var n=0;n<d.length;n++)"ArrayBuffer"===utils.typeName(d[n])&&(d[n]=base64.fromArrayBuffer(d[n]));var c=p+cordova.callbackId++,l=JSON.stringify(d);(s||f)&&(cordova.callbacks[c]={success:s,fail:f});var t=nativeApiProvider.get().exec(bridgeSecret,p,a,c,l);jsToNativeBridgeMode===jsToNativeModes.JS_OBJECT&&"@Null arguments."===t?(androidExec.setJsToNativeBridgeMode(jsToNativeModes.PROMPT),androidExec(s,f,p,a,d),androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT)):t&&(messagesFromNative.push(t),nextTick(processMessages))}function pollOnceFromOnlineEvent(){pollOnce(!0)}function pollOnce(s){if(!(bridgeSecret<0)){var f=nativeApiProvider.get().retrieveJsMessages(bridgeSecret,!!s);f&&(messagesFromNative.push(f),processMessages())}}function pollingTimerFunc(){pollEnabled&&(pollOnce(),setTimeout(pollingTimerFunc,50))}function hookOnlineApis(){function s(f){cordova.fireWindowEvent(f.type)}window.addEventListener("online",pollOnceFromOnlineEvent,!1),window.addEventListener("offline",pollOnceFromOnlineEvent,!1),cordova.addWindowEventHandler("online"),cordova.addWindowEventHandler("offline"),document.addEventListener("online",s,!1),document.addEventListener("offline",s,!1)}function buildPayload(s,f){var p=f.charAt(0);if("s"===p)s.push(f.slice(1));else if("t"===p)s.push(!0);else if("f"===p)s.push(!1);else if("N"===p)s.push(null);else if("n"===p)s.push(+f.slice(1));else if("A"===p){var a=f.slice(1);s.push(base64.toArrayBuffer(a))}else if("S"===p)s.push(window.atob(f.slice(1)));else if("M"===p)for(var d=f.slice(1);""!==d;){var n=d.indexOf(" "),c=+d.slice(0,n),l=d.substr(n+1,c);d=d.slice(n+c+1),buildPayload(s,l)}else s.push(JSON.parse(f))}function processMessage(message){var firstChar=message.charAt(0);if("J"===firstChar)eval(message.slice(1));else if("S"===firstChar||"F"===firstChar){var success="S"===firstChar,keepCallback="1"===message.charAt(1),spaceIdx=message.indexOf(" ",2),status=+message.slice(2,spaceIdx),nextSpaceIdx=message.indexOf(" ",spaceIdx+1),callbackId=message.slice(spaceIdx+1,nextSpaceIdx),payloadMessage=message.slice(nextSpaceIdx+1),payload=[];buildPayload(payload,payloadMessage),cordova.callbackFromNative(callbackId,success,status,payload,keepCallback)}else console.log("processMessage failed: invalid message: "+JSON.stringify(message))}function processMessages(){if(!isProcessing&&0!==messagesFromNative.length){isProcessing=!0;try{var s=popMessageFromQueue();if("*"===s&&0===messagesFromNative.length)return void nextTick(pollOnce);processMessage(s)}finally{isProcessing=!1,messagesFromNative.length>0&&nextTick(processMessages)}}}function popMessageFromQueue(){var s=messagesFromNative.shift();if("*"===s)return"*";var f=s.indexOf(" "),p=+s.slice(0,f),a=s.substr(f+1,p);return(s=s.slice(f+p+1))&&messagesFromNative.unshift(s),a}androidExec.init=function(){bridgeSecret=+prompt("","gap_init:"+nativeToJsBridgeMode),channel.onNativeReady.fire()},hookOnlineApis(),androidExec.jsToNativeModes=jsToNativeModes,androidExec.nativeToJsModes=nativeToJsModes,androidExec.setJsToNativeBridgeMode=function(s){s===jsToNativeModes.JS_OBJECT&&!window._cordovaNative&&(s=jsToNativeModes.PROMPT),nativeApiProvider.setPreferPrompt(s===jsToNativeModes.PROMPT),jsToNativeBridgeMode=s},androidExec.setNativeToJsBridgeMode=function(s){s!==nativeToJsBridgeMode&&(nativeToJsBridgeMode===nativeToJsModes.POLLING&&(pollEnabled=!1),nativeToJsBridgeMode=s,bridgeSecret>=0&&nativeApiProvider.get().setNativeToJsBridgeMode(bridgeSecret,s),s===nativeToJsModes.POLLING&&(pollEnabled=!0,setTimeout(pollingTimerFunc,1)))},module.exports=androidExec}),define("cordova/exec/proxy",function(s,f,p){var a={};p.exports={add:function(d,n){return console.log("adding proxy for "+d),a[d]=n,n},remove:function(d){var n=a[d];return delete a[d],a[d]=null,n},get:function(d,n){return a[d]?a[d][n]:null}}}),define("cordova/init",function(s,f,p){var a=s("cordova/channel"),d=s("cordova"),n=s("cordova/modulemapper"),c=s("cordova/platform"),l=s("cordova/pluginloader"),t=[a.onNativeReady,a.onPluginsReady];function e(r){for(var o=0;o<r.length;++o)2!==r[o].state&&console.log("Channel not fired: "+r[o].type)}window.setTimeout(function(){2!==a.onDeviceReady.state&&(console.log("deviceready has not fired after 5 seconds."),e(t),e(a.deviceReadyChannelsArray))},5e3),window.console||(window.console={log:function(){}}),window.console.warn||(window.console.warn=function(r){this.log("warn: "+r)}),a.onPause=d.addDocumentEventHandler("pause"),a.onResume=d.addDocumentEventHandler("resume"),a.onActivated=d.addDocumentEventHandler("activated"),a.onDeviceReady=d.addStickyDocumentEventHandler("deviceready"),"complete"===document.readyState||"interactive"===document.readyState?a.onDOMContentLoaded.fire():document.addEventListener("DOMContentLoaded",function(){a.onDOMContentLoaded.fire()},!1),window._nativeReady&&a.onNativeReady.fire(),n.clobbers("cordova","cordova"),n.clobbers("cordova/exec","cordova.exec"),n.clobbers("cordova/exec","Cordova.exec"),c.bootstrap&&c.bootstrap(),setTimeout(function(){l.load(function(){a.onPluginsReady.fire()})},0),a.join(function(){n.mapModules(window),c.initialize&&c.initialize(),a.onCordovaReady.fire(),a.join(function(){s("cordova").fireDocumentEvent("deviceready")},a.deviceReadyChannelsArray)},t)}),define("cordova/modulemapper",function(s,f,p){var n,c,a=s("cordova/builder"),d=define.moduleMap;function l(e,r,o,u){if(!(r in d))throw new Error("Module "+r+" does not exist.");n.push(e,r,o),u&&(c[o]=u)}function t(e,r){return e?e.split(".").reduce(function(o,u){return o[u]=o[u]||{}},r):r}f.reset=function(){n=[],c={}},f.clobbers=function(e,r,o){l("c",e,r,o)},f.merges=function(e,r,o){l("m",e,r,o)},f.defaults=function(e,r,o){l("d",e,r,o)},f.runs=function(e){l("r",e,null)},f.mapModules=function(e){var r={};e.CDV_origSymbols=r;for(var o=0,u=n.length;o<u;o+=3){var i=n[o],h=s(n[o+1]);if("r"!==i){var m=n[o+2],b=m.lastIndexOf("."),g=m.substr(0,b),y=m.substr(b+1),E=m in c?"Access made to deprecated symbol: "+m+". "+E:null,N=t(g,e),w=N[y];"m"===i&&w?a.recursiveMerge(w,h):("d"===i&&!w||"d"!==i)&&(m in r||(r[m]=w),a.assignOrWrapInDeprecateGetter(N,y,h,E))}}},f.getOriginalSymbol=function(e,r){var o=e.CDV_origSymbols;if(o&&r in o)return o[r];for(var u=r.split("."),i=e,v=0;v<u.length;++v)i=i&&i[u[v]];return i},f.reset()}),define("cordova/platform",function(s,f,p){var a=null;function d(n){var c=s("cordova"),l=n.action;switch(l){case"backbutton":case"menubutton":case"searchbutton":case"pause":case"volumedownbutton":case"volumeupbutton":c.fireDocumentEvent(l);break;case"resume":if(arguments.length>1&&n.pendingResult){if(2===arguments.length)n.pendingResult.result=arguments[1];else{for(var t=[],e=1;e<arguments.length;e++)t.push(arguments[e]);n.pendingResult.result=t}a=n}c.fireDocumentEvent(l,n);break;default:throw new Error("Unknown event action "+l)}}p.exports={id:"android",bootstrap:function(){var n=s("cordova/channel"),c=s("cordova"),l=s("cordova/exec"),t=s("cordova/modulemapper");l.init(),t.clobbers("cordova/plugin/android/app","navigator.app"),t.clobbers("cordova/plugin/android/splashscreen","navigator.splashscreen");var e=Number(c.platformVersion.split(".")[0])>=4?"CoreAndroid":"App";function o(i){c.addDocumentEventHandler(i+"button").onHasSubscribersChange=function(){l(null,null,e,"overrideButton",[i,1===this.numHandlers])}}c.addDocumentEventHandler("backbutton").onHasSubscribersChange=function(){l(null,null,e,"overrideBackbutton",[1===this.numHandlers])},c.addDocumentEventHandler("menubutton"),c.addDocumentEventHandler("searchbutton"),o("volumeup"),o("volumedown");var u=document.addEventListener;document.addEventListener=function(i,v,h){u(i,v,h),"resume"===i&&a&&v(a)},n.onCordovaReady.subscribe(function(){l(d,null,e,"messageChannel",[]),l(null,null,e,"show",[])})}}}),define("cordova/plugin/android/app",function(s,f,p){var a=s("cordova/exec"),d=Number(s("cordova").platformVersion.split(".")[0])>=4?"CoreAndroid":"App";p.exports={clearCache:function(){a(null,null,d,"clearCache",[])},loadUrl:function(n,c){a(null,null,d,"loadUrl",[n,c])},cancelLoadUrl:function(){a(null,null,d,"cancelLoadUrl",[])},clearHistory:function(){a(null,null,d,"clearHistory",[])},backHistory:function(){a(null,null,d,"backHistory",[])},overrideBackbutton:function(n){a(null,null,d,"overrideBackbutton",[n])},overrideButton:function(n,c){a(null,null,d,"overrideButton",[n,c])},exitApp:function(){return a(null,null,d,"exitApp",[])}}}),define("cordova/plugin/android/splashscreen",function(s,f,p){var a=s("cordova/exec");p.exports={show:function(){console.log('"navigator.splashscreen.show()" is unsupported on Android.')},hide:function(){a(null,null,"CordovaSplashScreenPlugin","hide",[])}}}),define("cordova/pluginloader",function(s,f,p){var a=s("cordova/modulemapper");function d(t,e,r,o){o=o||r,t in define.moduleMap?r():f.injectScript(e,function(){t in define.moduleMap?r():o()},o)}f.injectScript=function(t,e,r){var o=document.createElement("script");o.onload=e,o.onerror=r,o.src=t,document.head.appendChild(o)},f.load=function(t){var e=function l(){for(var t=null,e=document.getElementsByTagName("script"),o=e.length-1;o>-1;o--){var u=e[o].src.replace(/\?.*$/,"");if(u.indexOf("/cordova.js")===u.length-11){t=u.substring(0,u.length-11)+"/";break}}return t}();null===e&&(console.log("Could not find cordova.js script tag. Plugin loading may fail."),e=""),d("cordova/plugin_list",e+"cordova_plugins.js",function(){var r=s("cordova/plugin_list");!function c(t,e,r){var o=e.length;if(o)for(var i=0;i<e.length;i++)d(e[i].id,t+e[i].file,u);else r();function u(){--o||function n(t,e){for(var o,r=0;o=t[r];r++){if(o.clobbers&&o.clobbers.length)for(var u=0;u<o.clobbers.length;u++)a.clobbers(o.id,o.clobbers[u]);if(o.merges&&o.merges.length)for(var i=0;i<o.merges.length;i++)a.merges(o.id,o.merges[i]);o.runs&&a.runs(o.id)}e()}(e,r)}}(e,r,t)},t)}}),define("cordova/urlutil",function(s,f,p){f.makeAbsolute=function(d){var n=document.createElement("a");return n.href=d,n.href}}),define("cordova/utils",function(s,f,p){var n,a=f;function d(n){for(var c="",l=0;l<n;l++){var t=parseInt(256*Math.random(),10).toString(16);1===t.length&&(t="0"+t),c+=t}return c}a.defineGetterSetter=function(n,c,l,t){if(Object.defineProperty){var e={get:l,configurable:!0};t&&(e.set=t),Object.defineProperty(n,c,e)}else n.__defineGetter__(c,l),t&&n.__defineSetter__(c,t)},a.defineGetter=a.defineGetterSetter,a.arrayIndexOf=function(n,c){if(n.indexOf)return n.indexOf(c);for(var l=n.length,t=0;t<l;++t)if(n[t]===c)return t;return-1},a.arrayRemove=function(n,c){var l=a.arrayIndexOf(n,c);return-1!==l&&n.splice(l,1),-1!==l},a.typeName=function(n){return Object.prototype.toString.call(n).slice(8,-1)},a.isArray=Array.isArray||function(n){return"Array"===a.typeName(n)},a.isDate=function(n){return n instanceof Date},a.clone=function(n){if(!n||"function"==typeof n||a.isDate(n)||"object"!=typeof n)return n;var c,l;if(a.isArray(n)){for(c=[],l=0;l<n.length;++l)c.push(a.clone(n[l]));return c}for(l in c={},n)(!(l in c)||c[l]!==n[l])&&typeof n[l]<"u"&&"unknown"!=typeof n[l]&&(c[l]=a.clone(n[l]));return c},a.close=function(n,c,l){return function(){return c.apply(n,l||arguments)}},a.createUUID=function(){return d(4)+"-"+d(2)+"-"+d(2)+"-"+d(2)+"-"+d(6)},a.extend=(n=function(){},function(c,l){n.prototype=l.prototype,c.prototype=new n,c.__super__=l.prototype,c.prototype.constructor=c}),a.alert=function(n){window.alert?window.alert(n):console&&console.log&&console.log(n)}}),window.cordova=require("cordova"),require("cordova/init")})();