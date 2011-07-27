function qas_errHandler(){return true}if(typeof noErrorOverride=="undefined"||(typeof noErrorOverride!="undefined"&&noErrorOverride==false)){window.onerror=qas_errHandler}function qas_appendParam(c,b){var a=window;if((c.indexOf("previous")>-1&&b=="")||(b&&!(b==="undefined"))){if(a.srcUrl==="undefined"){a.srcUrl=""}if(a.srcUrl.indexOf("=")>-1){a.srcUrl+=("&"+c+"="+b)}else{a.srcUrl+=(c+"="+b)}}}function qas_appendAttr(c,b){var a=window;if(b&&!(b==="undefined")){a.wFrmStr+=(" "+c+'="'+b+'"')}}function qas_writeAdIFrame(){var a=window;var d=a.adsonar_jv;var c="http://";if(a.adsonar_ssl&&(a.adsonar_ssl==true)){c="https://"}a.srcUrl=c+d+"/adserving/getAds.jsp?";a.wFrmStr="";var b=Math.round(Math.random()*1000000);qas_appendAttr("name",("adsonar_serve"+b));qas_appendAttr("id",("adsonar_serve"+b));qas_appendAttr("scrolling","no");qas_appendAttr("frameborder","0");qas_appendAttr("marginwidth","0");qas_appendAttr("marginheight","0");qas_appendAttr("vspace","0");qas_appendAttr("hspace","0");qas_appendAttr("width",a.adsonar_zw);qas_appendAttr("height",a.adsonar_zh);qas_passParams();qas_appendAttr("src",a.srcUrl);a.adsonar_placementId=null;a.adsonar_pid=null;a.adsonar_ps=null;a.adsonar_zw=null;a.adsonar_zh=null;a.adsonar_jv=null;a.adsonar_topicid=null;a.wFrmStr="<iframe"+a.wFrmStr+"></iframe>";document.write(a.wFrmStr)}function qas_writeAdPopup(b){var l=window;var k=l.adsonar_jv;var a="http://";if(l.adsonar_ssl&&(l.adsonar_ssl==true)){a="https://"}l.srcUrl=a+k+"/adserving/getAds.jsp?";l.wFrmStr="";qas_passParams();qas_appendParam("url",escape(l.location.href));var e=screen.availWidth;var g=screen.availHeight;var i=(e-l.adsonar_zw)/2;var f=(g-l.adsonar_zh)/2;var j=l.srcUrl;var c="adSonarPopup_"+l.adsonar_pid+"_"+l.adsonar_ps;var d="";if((b==2)||(b==4)){d="LEFT="+(i-25)+",TOP="+(f-100)+",WIDTH="+(l.adsonar_zw+50)+",HEIGHT="+(l.adsonar_zh+200);d+=",directories,location,menubar,resizable,scrollbars,status,titlebar,toolbar"}else{d="LEFT="+i+",TOP="+f+",WIDTH="+l.adsonar_zw+",HEIGHT="+l.adsonar_zh}var h=window.open(j,c,d);if((b==3)||(b==4)){if(h){h.blur();h.opener.focus()}}else{if(h){h.focus()}}}function qas_validValue(a){if(a&&a!=null&&a!=""&&!isNaN(parseInt(a))){return true}return false}function qas_passParams(){var a=window;var g=top;var b=0;try{if(qas_validValue(a.adsonar_placementId)){if(g.previousPlacementIds==null){g.previousPlacementIds=new Array()}if(g.previousPlacementIds.length<=20){g.previousPlacementIds[g.previousPlacementIds.length]=a.adsonar_placementId}b=g.previousPlacementIds.length;if(b>1){qas_appendParam("previousPlacementIds",g.previousPlacementIds.slice(0,(b-1)).join())}else{qas_appendParam("previousPlacementIds","")}}else{if(qas_validValue(a.adsonar_ps)){if(g.previousPresetIds==null){g.previousPresetIds=new Array()}if(g.previousPresetIds.length<=20){g.previousPresetIds[g.previousPresetIds.length]=g.adsonar_ps}b=g.previousPresetIds.length;if(b>1){qas_appendParam("previousPresetIds",g.previousPresetIds.slice(0,(b-1)).join())}else{qas_appendParam("previousPresetIds","")}}}}catch(i){}qas_appendParam("placementId",a.adsonar_placementId);qas_appendParam("pid",a.adsonar_pid);qas_appendParam("ps",a.adsonar_ps);qas_appendParam("kc",encodeURIComponent(a.adsonar_kc));qas_appendParam("gw",a.adsonar_gw);qas_appendParam("gh",a.adsonar_gh);qas_appendParam("zw",a.adsonar_zw);qas_appendParam("zh",a.adsonar_zh);qas_appendParam("tc",encodeURIComponent(a.adsonar_tc));qas_appendParam("bc",encodeURIComponent(a.adsonar_bc));qas_appendParam("uc",encodeURIComponent(a.adsonar_uc));qas_appendParam("tl",a.adsonar_tl);qas_appendParam("ul",a.adsonar_ul);qas_appendParam("ts",a.adsonar_ts);qas_appendParam("bs",a.adsonar_bs);qas_appendParam("us",a.adsonar_us);qas_appendParam("tm",a.adsonar_tm);qas_appendParam("xb",a.adsonar_xb);qas_appendParam("xbc",encodeURIComponent(a.adsonar_xbc));qas_appendParam("xp",a.adsonar_xp);qas_appendParam("xpc",encodeURIComponent(a.adsonar_xpc));qas_appendParam("pb",a.adsonar_pb);qas_appendParam("pbc",encodeURIComponent(a.adsonar_pbc));qas_appendParam("ib",a.adsonar_ib);qas_appendParam("ibc",encodeURIComponent(a.adsonar_ibc));qas_appendParam("dbg",a.adsonar_dbg);qas_appendParam("fr",a.adsonar_fr);qas_appendParam("tp",a.adsonar_tp);qas_appendParam("zip",encodeURIComponent(a.adsonar_zip));qas_appendParam("topic",encodeURIComponent(a.adsonar_topic));qas_appendParam("tcu",encodeURIComponent(a.adsonar_tcu));qas_appendParam("topicid",a.adsonar_topicid);qas_appendParam("ssl",encodeURIComponent(a.adsonar_ssl));var d=a.adsonar_rfu;if((!(d&&!(d==="undefined")))||(d=="")){d=document.referrer;try{if(window.top.location==document.location){d=document.location}}catch(i){}}qas_appendParam("url",escape(d));qas_appendParam("v","5");try{var h=g.document.title;if(h&&!(h==="undefined")){if(h.length>100){h=h.substring(0,50)+"-"+h.substring(h.length-50,h.length)}qas_appendParam("dct",encodeURIComponent(h))}var f=g.document.referrer;if(f&&!(f==="undefined")&&a.srcUrl.length<2000){if((f.length+a.srcUrl.length)>2000){f=f.substring(0,2000-a.srcUrl.length)}qas_appendParam("ref",escape(f))}}catch(i){}try{c()}catch(i){}function c(){var m=g.document.getElementsByTagName("meta"),o=m.length,j,n,l,p="";for(var k=0;k<o;k++){if((m[k].getAttribute("name")&&m[k].getAttribute("content"))&&m[k].getAttribute("name").toLowerCase()=="keywords"){j=m[k].getAttribute("content")}}if(typeof j!="undefined"){j=j.replace(/(\r\n|\n|\r)/gm,"");n=(j.indexOf(",")>-1)?j.split(","):j.split(" ");l=n.length;for(var k=0;k<l;k++){var q=encodeURIComponent(e(n[k]));if((p+","+q).length<100){p+=(p.length==0)?q:(","+q)}else{break}}qas_appendParam("metakw",p)}function e(r){r=r.replace(/\t/g," ");r=r.replace(/\s+/g," ");return r.replace(/^\s|\s$/g,"")}}}function qas_writeAd(){var b=window;var a="";if(b.adsonar_tp&&!(b.adsonar_tp==="undefined")){a=b.adsonar_tp}switch(a){case"up":qas_writeAdPopup(1);break;case"upx":qas_writeAdPopup(2);break;case"un":qas_writeAdPopup(3);break;case"unx":qas_writeAdPopup(4);break;default:qas_writeAdIFrame()}}qas_writeAd();