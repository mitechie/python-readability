SailthruScout={config:{numVisible:10},allContent:[],visibleContent:[],lastIndex:-1,setup:function(b){for(var a in b){SailthruScout.config[a]=b[a]}if(b.renderItem){SailthruScout.renderItem=b.renderItem}SailthruScout.fetchContent(SailthruScout.config.numVisible+5);$("#sailthru-scout a").live("mousedown",function(){var d=$(this).parents(".content-item").index();var e=SailthruScout.visibleContent[d].id;var c=SailthruScout.visibleContent[d].url;SailthruScout.removeContentItem(this);SailthruScout.track(e,"mhit",{index:d,url:c});return true});$("#sailthru-scout .hide").live("click",function(){var d=$(this).parents(".content-item").index();var e=SailthruScout.visibleContent[d].id;var c=SailthruScout.visibleContent[d].url;SailthruScout.removeContentItem(this);SailthruScout.track(e,"mhide",{index:d,url:c});return true})},track:function(e,d,a){var c="http://"+SailthruScout.config.domain+"/horizon/recommendtrack?event="+d;if(e){c+="&id="+e}if(SailthruScout.method){c+="&method="+SailthruScout.method}if(a){for(var b in a){c+="&"+b+"="+encodeURIComponent(a[b])}}c+="&cb="+Math.random();SailthruScout.jq("body").append('<img src="'+c+'" />')},debug:function(){console.log("ALL CONTENT");for(var a=0;a<SailthruScout.allContent.length;a++){console.log(SailthruScout.allContent[a].url)}console.log("VISIBLE CONTENT");for(var a=0;a<SailthruScout.visibleContent.length;a++){console.log(SailthruScout.visibleContent[a].url)}},renderItem:function(a,b){return SailthruScout.defaultItemRender(a,b)},defaultItemRender:function(b,c){var a="";a+='<div class="content-item">';a+='<div class="hide">X</div>';if(b.image){a+='<div class="image"><a href="'+b.url+'" target="_blank"><img src="'+b.image.thumb+'" /></a></div>'}a+='<div class="title"><a href="'+b.url+'" target="_blank">'+b.title+"</a></div>";a+="</div>";return a},contentItemExists:function(b){if(!b){return false}for(var a=0;a<SailthruScout.allContent.length;a++){if(SailthruScout.allContent[a].url==b.url){return true}}return false},addContentItem:function(a){if(!a){return false}if(SailthruScout.contentItemExists(a)){return}a.index=SailthruScout.allContent.length;SailthruScout.allContent.push(a)},refreshVisibleItems:function(){if(SailthruScout.visibleContent.length<SailthruScout.config.numVisible){var d=SailthruScout.lastIndex;SailthruScout.visibleContent=SailthruScout.visibleContent.concat(SailthruScout.allContent.slice(d+1,d+1+SailthruScout.config.numVisible-SailthruScout.visibleContent.length));SailthruScout.lastIndex=Math.max(SailthruScout.lastIndex,SailthruScout.visibleContent[SailthruScout.visibleContent.length-1].index);var b="";for(var a=0;a<SailthruScout.visibleContent.length;a++){var c=SailthruScout.visibleContent[a];b+=SailthruScout.renderItem(c,a)}$("#sailthru-scout").html(b);$(".sailthru-scout-loaded").show()}},removeContentItem:function(b){var a=$(b).parents(".content-item").index();SailthruScout.visibleContent.splice(a,1);$(b).parents(".content-item").fadeOut(500,function(){SailthruScout.refreshVisibleItems()});if(SailthruScout.allContent.length<SailthruScout.lastIndex+3){SailthruScout.fetchContent(SailthruScout.allContent.length+10)}},fetchContent:function(b){var a="http://"+SailthruScout.config.domain+"/horizon/recommend?format=jsonp&number="+b;SailthruScout.jq.ajax(a,{dataType:"jsonp",success:function(e){var d="";if(!SailthruScout.method&&e.method){SailthruScout.method=e.method;var f="";for(var c=0;c<e.content.length;c++){f+=","+e.content[c].id}f=f.substring(1);SailthruScout.track(null,"mshow",{ids:f,visible:SailthruScout.config.numVisible})}for(var c=0;c<b;c++){SailthruScout.addContentItem(e.content[c])}SailthruScout.refreshVisibleItems()}})},jq:window.$?window.$:null};