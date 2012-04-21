

/* SiteCatalyst code version: H.10.
Copyright 1997-2007 Omniture, Inc. More info available at
http://www.omniture.com */
/************************ ADDITIONAL FEATURES ************************
     Plugins
*/
/* Specify the Report Suite ID(s) to track here */
var s_account="wpniwashpostcom"
var s=s_gi(s_account)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* E-commerce Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls,ics"
s.linkInternalFilters="javascript:,washingtonpost.com,www.facebook.com/plugins,"+window.location.host
s.linkLeaveQueryString=false
s.linkTrackVars="server"
s.linkTrackEvents="None"

/* Future DST Dates for Time Parting */
// Year		Begins		Ends
// 2012 	03/11/2012 	11/04/2012
// 2013 	03/10/2012 	11/03/2012
// 2014 	03/09/2012 	11/02/2012
// 2015 	03/08/2012 	11/01/2012
s.dstStart="03/13/2011";
s.dstEnd="11/06/2011";

/* Plugin Config */
s.usePlugins=true

function s_doPlugins(s) {
	/* Add calls to plugins here */

	var URL=window.location.host+window.location.pathname;
	/* Plugin Example: getQueryParam v2.0 */
	if ( typeof s.campaign == 'undefined'  || ( typeof s.campaign == 'string' && s.campaign == '' ))
		s.campaign = (s.getQueryParam('wpsrc')) ? s.getQueryParam('wpsrc') : (s.getQueryParam('wpmk')) ? s.getQueryParam('wpmk') : "" ;
	if ( typeof s.eVar3 == 'undefined' || ( typeof s.eVar3 == 'string' && s.eVar3 == '' ) )
		s.eVar3=s.getQueryParam('wpisrc');
	if (! document.referrer.toString().match(/washingtonpost\.com/) )
		s.eVar29=s.getQueryParam('wprss');

	/* Plugin Example: getValOnce v0.2
	s.campaign=s.getValOnce(s.campaign,"s_campaign",0)
	*/

	/* Set event 1 (page view) on every page */
	var re_event1 = new RegExp("(?:^|,)event1(?:$|,)");
	s.events=(!s.events)?'event1':(!s.events.match(re_event1))?s.events+',event1':s.events;
	if ( typeof(wp_events) != "undefined" && wp_events != '' ) {
		s.events += ','+wp_events ;
	}

	/* Set eVar 1 & 2 to PN and Channel  */
	s.eVar1=s.pageName;
	s.eVar2=s.channel;

	/* Set eVar11 to prop25 (blog name) */
	s.eVar11=(typeof s.prop25 != "undefined")?s.prop25:'';

	/* Set DSLV & New vs Repeat  */
	try {
		s.prop18=s.getNewRepeat();
	} catch(e) {
		s.prop18="nocategory";
		// s.prop18=e.description;
		// alert("Error calling s.getNewRepeat(): "+e.description );
	}
	s.prop17=s.getDaysSinceLastVisit('s_lv');
	s.prop17=s.getAndPersistValue(s.prop17,'s_dslv',0);
	s.eVar14=s.prop18;
	s.eVar15=s.prop17;

	/* Get Visit Num */
	try {
		s.eVar16=s.getVisitNum('m','s_vmonthnum','s_monthinvisit');
	} catch(e) {
		s.eVar16="nocategory";
		// s.eVar16=e.description;
		// alert("Error calling s.getVisitNum(): "+e.description );
	}

	/* Plugin Example: timeparting - EST - hour,day,weekday */
	var wp_current_year = new Date().getFullYear()+'';
	s.prop8=s.getTimeParting('d','-5',wp_current_year);
	s.prop9=s.getTimeParting('h','-5',wp_current_year);
	s.prop10=s.getTimeParting('w','-5',wp_current_year);
	// Ideally, we'd capture the year with an SSI, but because thise file is used on servers where SSIs might not be supported, not doing that.

	/* Set hierarchy to prop23 */
	s.prop23=s.hier1;

	/* Set eVar18 to entry content type */
	var ct = s.prop3
	var isEP = s.c_r('s_wp_ep');
	if(!isEP && ct){s.c_w('s_wp_ep',ct,0)
	s.eVar18=ct;}

	/* Look for Navigation ID - Set prop28 & 29 */
	var pp=s.getPreviousPage();
	var ppn = s.getPreviousValue(s.pageName,'gvp_p5');
	var nid=s.getQueryParam('nid')
	if(nid){s.prop28=nid;}
	s.prop29=ppn;

	/* Look for homepage id - Set prop 27 if HP value is previous page */
	var hpid=s.getQueryParam('hpid');
	if(hpid && ppn=="wp - homepage") {
		s.prop27=ppn+' - '+hpid;
		s.eVar19=s.prop27;
	}

	var hpv=s.getQueryParam('hpv');//multimedia check
	if(hpid && hpv=="national"){pp="wp - homepage";s.prop27=pp+' - '+hpid;s.eVar19=s.prop27}
	if(hpid && hpv=="default"){pp="wp - homepage";s.prop27=pp+' - '+hpid;s.eVar19=s.prop27}
	if(hpid && hpv=="override"){pp="wp - homepage";s.prop27=pp+' - '+hpid;s.eVar19=s.prop27}

	if(s.server=="washingtonpost.com jobs"){s.eVar4=s.prop6};

	var temp1=s.getQueryParam('reload');var temp2=s.getQueryParam('sub');
	if(temp1=="true"){s.prop31="site reload"};
	if(temp2 && temp2.toLowerCase()=="ar"){s.prop31="completed sign in"};
	if(temp2 && temp2.toLowerCase()=="new"){s.prop31="completed registration"};
	if ( typeof s.prop20 == 'undefined' || ( typeof s.prop20 == 'string' && s.prop20 == '' ) ) {
		s.prop20=s.getQueryParam('tid');
		s.eVar20=s.prop20;
	}
	if ( typeof s.prop20 == 'undefined' || ( typeof s.prop20 == 'string' && s.prop20 == '' ) ) {
		s.prop20=s.getQueryParam('fb_Ref');
		s.eVar20=s.prop20;
	}

	if (! s.eVar31 ) {
		if(navigator.userAgent.match(/(iPad|SCH-I800|PlayBook|A500|Kindle)/i))
		{
		    s.eVar31="tablet";
		} else {
		    s.eVar31="desktop";
		}
	}

	/* Facebook Referral Tracking */
/* Turned off for Spring 2011 release
	s.eVar9=s.facebookSocialReferrers();
	s.eVar9=s.getValOnce(s.eVar9,"s_fr",0);
	s.events=s.eVar9?s.apl(s.events,'event14',',',2):s.events;
	s.eVar6=s.getPreviousValue(s.pageName,'gvp_pn');
*/
	/* Set event20 as visit entry event (wether the referrer is external, or the page is a direct load) */
	s._referrer=s._2referrer=s.referrer?s.referrer:document.referrer;
	if(!s._referrer){s._referrer=s._2referrer=s._entry="Direct-Load";}
	if (s._referrer){
		s._referrer=s._referrer.indexOf('?')>-1?s._referrer.substring("0",s._referrer.indexOf('?')):s._referrer;
		s._urlCheck=s.split(s.linkInternalFilters,",");
		s._urlCheckLength=s._urlCheck.length-1;
		for (s._for=0;s._for<=s._urlCheckLength;s._for++){
			s._urlReferrer=s._referrer.indexOf(s._urlCheck[s._for])>-1?"1":"0";
			if (s._urlReferrer=="1") {
			s._entry="0";
			}
		}
	}
	if (s._entry!="0") {
		s._referrerPass=s._2referrer;
		s._referrerPass=s.getValOnce(s._referrerPass,'s._ref',0);
		if (s._referrerPass) {s.events=s.apl(s.events,'event20',',',2)}
	}

	/* New vs Repeat  */
	if (s.pageName=="wp - homepage - local") {
		try {
			s.prop15 = s.getNewRepeat('','s_npr');
		} catch(e) {
			s.prop15="nocategory";
			// s.prop15=e.description;
			// alert("Error calling s.getNewRepeat('','s_npr'): "+e.description );
		}
	}

}
s.doPlugins=s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */
/*
 * facebookSocialReferrers v1.0 - stopping the referrer inflation and tracking this in another var
 */
/* Turned off for Spring 2011 release
s.facebookSocialReferrers=new Function("l",""
+"var s=this,g,i,j,m,n,d,x,a,q,r,T,Y,f,P,b,c;x=g=s.referrer?s.referre"
+"r:document.referrer;g=g.toLowerCase();if(g){z=g.indexOf('?');i=z>-1"
+"?z:g.length;j=g.substring(0,i);a=s.facebookSocial;a=s.split(a,'>');"
+"for(m=0;m<a.length;m++){q=s.split(a[m],'|');r=s.split(q[1],',');for"
+"(T=0;T<r.length;T++){Y=r[T].toLowerCase();i=j.indexOf(Y);if(i>-1){f"
+"=s.getQueryParam('u','',g);if(f){P=q[0];d=s.linkInternalFilters.toL"
+"owerCase();d=s.split(d,',');l=l?l-1:1;s.referrer=d[l]}}}}}return P");
*/
/*
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");

/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");

/*
 * Plugin: getQueryParam 2.4
 */
s.getQueryParam=new Function("p","d","u","h",""
+"var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
+"tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+"?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+"')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+"g(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u","h",""
+"var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+"string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return''");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/*
 * Plugin: Days since last Visit 1.1.H - capture time from last visit
 */
s.getDaysSinceLastVisit=new Function("c",""
+"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+"5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);"
+"s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da"
+"y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day"
+"){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s."
+"c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c"
+"_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c"
+"+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur"
+"n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s"
+"!=f5) return '';else return cval_s;");

/*                                                                  
 * Plugin: getVisitNum - version 3.0
 */
s.getVisitNum=new Function("tp","c","c2",""
+"var s=this,e=new Date,cval,cvisit,ct=e.getTime(),d;if(!tp){tp='m';}"
+"if(tp=='m'||tp=='w'||tp=='d'){eo=s.endof(tp),y=eo.getTime();e.setTi"
+"me(y);}else {d=tp*86400000;e.setTime(ct+d);}if(!c){c='s_vnum';}if(!"
+"c2){c2='s_invisit';}cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn="
+"'),str=cval.substring(i+4,cval.length),k;}cvisit=s.c_r(c2);if(cvisi"
+"t){if(str){e.setTime(ct+1800000);s.c_w(c2,'true',e);return str;}els"
+"e {return 'unknown visit number';}}else {if(str){str++;k=cval.substri"
+"ng(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+1800000);"
+"s.c_w(c2,'true',e);return str;}else {s.c_w(c,e.getTime()+'&vn=1',e)"
+";e.setTime(ct+1800000);s.c_w(c2,'true',e);return 1;}}");
s.dimo=new Function("m","y",""
+"var d=new Date(y,m+1,0);return d.getDate();");
s.endof=new Function("x",""
+"var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=="
+"'m'){d=s.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if("
+"x=='w'){d=7-t.getDay();}else {d=1;}t.setDate(t.getDate()+d);return "
+"t;");

/*
 * Plugin: getTimeParting 2.0 
 */
s.getTimeParting=new Function("t","z","y","l",""
+"var s=this,d,A,U,X,Z,W,B,C,D,Y;d=new Date();A=d.getFullYear();Y=U=S"
+"tring(A);if(s.dstStart&&s.dstEnd){B=s.dstStart;C=s.dstEnd}else{;U=U"
+".substring(2,4);X='090801|101407|111306|121104|131003|140902|150801"
+"|161306|171205|181104|191003';X=s.split(X,'|');for(W=0;W<=10;W++){Z"
+"=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substrin"
+"g(4,6)}}if(!B||!C){B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;}D"
+"=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Dat"
+"a Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new"
+" Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.g"
+"etTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Mo"
+"nday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.get"
+"Hours();C=W.getMinutes();D=W.getDay();Z=X[D];U='AM';A='Weekday';X='"
+"00';if(C>30){X='30'}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6"
+"||D==0){A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Availab"
+"le'}else{if(t){if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){r"
+"eturn A}}else{return Z+', '+W}}}");

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
/*
 * Plugin: getPreviousPage_v1.1 - return previous page based on event list
 */
s.getPreviousPage=new Function("el",""
+"var s=this,pid,i,j,e;if(el){if(s.events){while(el){if(pid){break;}i"
+"=el.indexOf(',');i=i<0?el.length:i;e=s.events;while(e){j=e.indexOf("
+"',');j=j<0?e.length:j;if(e.substring(0,j)==el.substring(0,i)){pid=s"
+".p_gpp();}e=e.substring(j==e.length?j:j+1);}el=el.substring(i==el.l"
+"ength?i:i+1);}}}else{pid=s.p_gpp();}return pid;");
/*
 * Utility Function: p_gpp
 */
s.p_gpp=new Function(""
+"var s=this,p,i;p=s.rq(s.un);i=p.indexOf('pid=')+4;p=p.substring(i,p"
+".length);i=p.indexOf('&');p=p.substring(0,i);p=unescape(p);return p"
+";");
/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
/*
 * Function - read combined cookies v 0.2
 */
s.c_rr=s.c_r;
s.c_r=new Function("k",""
+"var s=this,d=new Date,v=s.c_rr(k),c=s.c_rr('s_pers'),i,m,e;if(v)ret"
+"urn v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;i="
+"c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';'"
+",i);m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length,m<0?c.length:"
+"m));if(m>0&&m!=e)if(parseInt(c.substring(m+1,e<0?c.length:e))<d.get"
+"Time()){if(toxicOmnitureCounter<20){toxicOmnitureCounter++;d.setTim"
+"e(d.getTime()-60000);s.c_w(s.epa(k),'',d);v='';}else{toxicOmnitureC"
+"ounter=0;throw new ThreateningStackOverflowException()}}return v;");
/*
 * Function - write combined cookies v 0.2
 */
s.c_wr=s.c_w;
s.c_w=new Function("k","v","e",""
+"var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,"
+"c,i,t;d.setTime(d.getTime()-60000);if(s.c_rr(k)) s.c_wr(k,'',d);k=s"
+".ape(k);pv=s.c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1){pv=pv.substr"
+"ing(0,i)+pv.substring(pv.indexOf(';',i)+1);pc=1;}sv=s.c_rr(sn);i=sv"
+".indexOf(' '+k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.i"
+"ndexOf(';',i)+1);sc=1;}d=new Date;if(e){if(e.getTime()>d.getTime())"
+"{pv+=' '+k+'='+s.ape(v)+'|'+e.getTime()+';';pc=1;}}else{sv+=' '+k+'"
+"='+s.ape(v)+';';sc=1;}if(sc) s.c_wr(sn,sv,0);if(pc){t=pv;while(t&&t"
+".indexOf(';')!=-1){var t1=parseInt(t.substring(t.indexOf('|')+1,t.i"
+"ndexOf(';')));t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.set"
+"Time(ht);s.c_wr(pn,pv,d);}return v==s.c_r(s.epa(k));");

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="wpni"
s.trackingServer="metrics.washingtonpost.com"
s.trackingServerSecure="smetrics.washingtonpost.com"
s.dc=112
//s.vmk="46BF8B07"

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_objectID;function s_c2fe(f){var x='',s=0,e,a,b,c;while(1){e=
f.indexOf('"',s);b=f.indexOf('\\',s);c=f.indexOf("\n",s);if(e<0||(b>=
0&&b<e))e=b;if(e<0||(c>=0&&c<e))e=c;if(e>=0){x+=(e>s?f.substring(s,e):
'')+(e==c?'\\n':'\\'+f.substring(e,e+1));s=e+1}else return x
+f.substring(s)}return f}function s_c2fa(f){var s=f.indexOf('(')+1,e=
f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')
a+='","';else if(("\n\r\t ").indexOf(c)<0)a+=c;s++}return a?'"'+a+'"':
a}function s_c2f(cc){cc=''+cc;var fc='var f=new Function(',s=
cc.indexOf(';',cc.indexOf('{')),e=cc.lastIndexOf('}'),o,a,d,q,c,f,h,x
fc+=s_c2fa(cc)+',"var s=new Object;';c=cc.substring(s+1,e);s=
c.indexOf('function');while(s>=0){d=1;q='';x=0;f=c.substring(s);a=
s_c2fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(
q){if(h==q&&!x)q='';if(h=='\\')x=x?0:1;else x=0}else{if(h=='"'||h=="'"
)q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)
+'new Function('+(a?a+',':'')+'"'+s_c2fe(c.substring(o+1,e))+'")'
+c.substring(e+1);s=c.indexOf('function')}fc+=s_c2fe(c)+';return s");'
eval(fc);return f}function s_gi(un,pg,ss){var c="function s_c(un,pg,s"
+"s){var s=this;s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s."
+"wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.w"
+"d.s_c_in++;s.m=function(m){return (''+m).indexOf('{')<0};s.fl=funct"
+"ion(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){if(!o)r"
+"eturn o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.i"
+"ndexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for"
+"(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1"
+"))<0)return 0;return 1};s.rep=function(x,o,n){var i=x.indexOf(o);wh"
+"ile(x&&i>=0){x=x.substring(0,i)+n+x.substring(i+o.length);i=x.index"
+"Of(o,i+n.length)}return x};s.ape=function(x){var s=this,h='01234567"
+"89ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x='"
+"'+x;if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.subs"
+"tring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+".substring(n%16,n%16+1)+e;n=parseInt(n/16);l++}y+='%u'+e}else if(c="
+"='+')y+='%2B';else y+=escape(c)}x=y}else{x=x?s.rep(escape(''+x),'+'"
+",'%2B'):x;if(x&&c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i"
+"=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substri"
+"ng(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substri"
+"ng(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;"
+"return x?unescape(s.rep(''+x,'+',' ')):x};s.pt=function(x,d,f,a){va"
+"r s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.s"
+"ubstring(0,y);r=s.m(f)?s[f](t,a):f(t,a);if(r)return r;z+=y+d.length"
+";t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=funct"
+"ion(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.subst"
+"ring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=functi"
+"on(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')"
+"+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf"
+"',f);return s.fsg};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s."
+"num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.locat"
+"ion.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeri"
+"ods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');"
+"if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s"
+".pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function"
+"(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'="
+"'),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length"
+",e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var"
+" s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCa"
+"se():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60"
+");if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'"
+"){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSI"
+"ON'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');ret"
+"urn s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+"
+"e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<"
+"l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new"
+" Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f"
+"}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){va"
+"r s=this,r;if(s.apv>=5&&(!s.isopera||s.apv>=7))eval('try{r=s.m(f)?s"
+"[f](a):f(a)}catch(e){r=s.m(t)?s[t](e):t(e)}');else{if(s.ismac&&s.u."
+"indexOf('MSIE 4')>=0)r=s.m(b)?s[b](a):b(a);else{s.eh(s.wd,'onerror'"
+",0,o);r=s.m(f)?s[f](a):f(a);s.eh(s.wd,'onerror',1)}}return r};s.gtf"
+"set=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e',"
+"'var s=s_c_il['+s._in+'];s.eh(window,\"onerror\",1);s.etfs=1;var c="
+"s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a)"
+"{return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.locat"
+"ion;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;r"
+"eturn s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if("
+"!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s."
+"gtfsoe,'gtfsfb')}return s.tfs};s.mr=function(sess,q,ta){var s=this,"
+"dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,ns=s.visitorN"
+"amespace,unc=s.rep(s.fun,'_','-'),imn='s_i_'+s.fun,im,b,e,rs='http'"
+"+(s.ssl?'s':'')+'://'+(t1?(s.ssl&&t2?t2:t1):((ns?ns:(s.ssl?'102':un"
+"c))+'.'+(s.dc?s.dc:112)+'.2o7.net'))+'/b/ss/'+s.un+'/1/H.10-Pdvu-2/"
+"'+sess+'?[AQB]&ndh=1'+(q?q:'')+(s.q?s.q:'')+'&[AQE]';if(s.isie&&!s."
+"ismac){if(s.apv>5.5)rs=s.fl(rs,4095);else rs=s.fl(rs,2047)}if(s.d.i"
+"mages&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){im="
+"s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.src=rs;if(rs.indexOf('&p"
+"e=')>=0&&(!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))"
+"){b=e=new Date;while(e.getTime()-b.getTime()<500)e=new Date}return "
+"''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt="
+"\"\">'};s.gg=function(v){var s=this;return s.wd['s_'+v]};s.glf=func"
+"tion(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s"
+".gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',',"
+"'glf',0)};s.gv=function(v){var s=this;return s['vpm_'+v]?s['vpv_'+v"
+"]:(s[v]?s[v]:'')};s.havf=function(t,a){var s=this,b=t.substring(0,4"
+"),x=t.substring(4),n=parseInt(x),k='g_'+t,m='vpm_'+t,q=t,v=s.linkTr"
+"ackVars,e=s.linkTrackEvents;s[k]=s.gv(t);if(s.lnk||s.eo){v=v?v+','+"
+"s.vl_l:'';if(v&&!s.pt(v,',','isf',t))s[k]='';if(t=='events'&&e)s[k]"
+"=s.fs(s[k],e)}s[m]=0;if(t=='visitorID')q='vid';else if(t=='pageURL'"
+"){q='g';s[k]=s.fl(s[k],255)}else if(t=='referrer'){q='r';s[k]=s.fl("
+"s[k],255)}else if(t=='vmk')q='vmt';else if(t=='charSet'){q='ce';if("
+"s[k]&&s[k].toUpperCase()=='AUTO')s[k]='ISO8859-1';else if(s[k]&&s.e"
+"m==2)s[k]='UTF-8'}else if(t=='visitorNamespace')q='ns';else if(t=='"
+"cookieDomainPeriods')q='cdp';else if(t=='cookieLifetime')q='cl';els"
+"e if(t=='variableProvider')q='vvp';else if(t=='currencyCode')q='cc'"
+";else if(t=='channel')q='ch';else if(t=='transactionID')q='xact';el"
+"se if(t=='campaign')q='v0';else if(s.num(x)){if(b=='prop')q='c'+n;e"
+"lse if(b=='eVar')q='v'+n;else if(b=='hier'){q='h'+n;s[k]=s.fl(s[k],"
+"255)}}if(s[k]&&t!='linkName'&&t!='linkType')s.qav+='&'+q+'='+s.ape("
+"s[k]);return ''};s.hav=function(){var s=this;s.qav='';s.pt(s.vl_t,'"
+",','havf',0);return s.qav};s.lnf=function(t,h){t=t?t.toLowerCase():"
+"'';h=h?h.toLowerCase():'';var te=t.indexOf('=');if(t&&te>0&&h.index"
+"Of(t.substring(te+1))>=0)return t.substring(0,te);return ''};s.ln=f"
+"unction(h){var s=this,n=s.linkNames;if(n)return s.pt(n,',','lnf',h)"
+";return ''};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLow"
+"erCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&"
+"&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.lte"
+"f=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&"
+"&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft"
+"=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkIntern"
+"alFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s"
+".trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.tr"
+"ackExternalLinks&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif"
+"||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function("
+"'e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(th"
+"is);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Fun"
+"ction('e','var s=s_c_il['+s._in+'],f;if(s.d&&s.d.all&&s.d.all.cppXY"
+"ctnr)return;s.eo=e.srcElement?e.srcElement:e.target;eval(\"try{if(s"
+".eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catc"
+"h(f){}\");s.eo=0');s.ot=function(o){var a=o.type,b=o.tagName;return"
+" (a&&a.toUpperCase?a:b&&b.toUpperCase?b:o.href?'A':'').toUpperCase("
+")};s.oid=function(o){var s=this,t=s.ot(o),p=o.protocol,c=o.onclick,"
+"n='',x=0;if(!o.s_oid){if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.to"
+"LowerCase().indexOf('javascript')<0))n=o.href;else if(c){n=s.rep(s."
+"rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x="
+"2}else if(o.value&&(t=='INPUT'||t=='SUBMIT')){n=o.value;x=3}else if"
+"(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}re"
+"turn o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>"
+"=0?','+t.substring(0,e)+',':'';return u&&u.indexOf(','+un+',')>=0?s"
+".epa(t.substring(e+1)):''};s.rq=function(un){var s=this,c=un.indexO"
+"f(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);retu"
+"rn s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf("
+"'='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.su"
+"bstring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this"
+";s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r"
+"(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&',"
+"'sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)s.sqq[s.squ[x]]"
+"+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&s.sqq[x]&&(x==q||"
+"c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};"
+"s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,"
+"\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++"
+"){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\""
+"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh"
+"(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s"
+".apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b."
+"attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.a"
+"ddEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl"
+")}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamp"
+"lingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.ge"
+"tYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c"
+"_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=fun"
+"ction(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=func"
+"tion(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t."
+"substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return "
+"n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection"
+",l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un.toLowerCas"
+"e();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l="
+"l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un"
+"=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=fun"
+"ction(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+"
+"',').indexOf(un)<0)s.oun+=','+un;s.uns()};s.t=function(){var s=this"
+",trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*1"
+"0000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/108000"
+"00)%10+sed,yr=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y"
+"r<1900?yr+1900:yr)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.get"
+"Seconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tfs=s.gtfs(),t"
+"a='',q='',qs='';s.gl(s.vl_g);s.uns();if(!s.q){var tl=tfs.location,a"
+",o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',"
+"0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j=\"1.1"
+"\";if(j.match){j=\"1.2\";if(tm.setUTCDate){j=\"1.3\";if(s.isie&&s.i"
+"smac&&s.apv>=5)j=\"1.4\";if(pn.toPrecision){j=\"1.5\";a=new Array;i"
+"f(a.forEach){j=\"1.6\";i=0;o=new Object;eval(\"try{i=new Iterator(o"
+")}catch(e){}\");if(i&&i.next)j=\"1.7\"}}}}}if(s.apv>=4)x=screen.wid"
+"th+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaE"
+"nabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidt"
+"h;bh=s.wd.innerHeight;}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>="
+"4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw="
+"s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight"
+";if(!s.ismac&&s.b){eval(\"try{s.b.addBehavior('#default#homePage');"
+"hp=s.b.isHomePage(tl)?'Y':'N'}catch(e){}\");eval(\"try{s.b.addBehav"
+"ior('#default#clientCaps');ct=s.b.connectionType}catch(e){}\")}}}el"
+"se r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,"
+"100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.q=(x?'&s='+s.ape(x):'')+(c"
+"?'&c='+s.ape(c):'')+(j?'&j='+j:'')+(v?'&v='+v:'')+(k?'&k='+k:'')+(b"
+"w?'&bw='+bw:'')+(bh?'&bh='+bh:'')+(ct?'&ct='+s.ape(ct):'')+(hp?'&hp"
+"='+hp:'')+(p?'&p='+s.ape(p):'')}if(s.usePlugins)s.doPlugins(s);var "
+"l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l;i"
+"f(!s.referrer)s.referrer=r;if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if"
+"(!o)return '';var p=s.gv('pageName'),w=1,t=s.ot(o),n=s.oid(o),x=o.s"
+"_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parent"
+"Element?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s."
+"oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_g"
+"s(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return"
+" ''}ta=n?o.target:1;h=o.href?o.href:'';i=h.indexOf('?');h=s.linkLea"
+"veQueryString||i<0?h:h.substring(0,i);l=s.linkName?s.linkName:s.ln("
+"h);t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&"
+"pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?"
+"'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p=s."
+"gv('pageURL');w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n="
+"s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+("
+"w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot="
+"'+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';if(s.p_r)s.p_r()"
+";var code='';if(trk&&s.vs(sed))code=s.mr(sess,(vt?'&t='+s.ape(vt):'"
+"')+s.hav()+q+(qs?qs:s.rq(s.un)),ta);s.sq(trk?'':qs);s.lnk=s.eo=s.li"
+"nkName=s.linkType=s.wd.s_objectID=s.ppu='';if(s.pg)s.wd.s_lnk=s.wd."
+"s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.tl=function("
+"o,t,n){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t()};s."
+"ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d="
+"document;s.b=s.d.body;s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.ind"
+"exOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexO"
+"f('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)"
+"apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn"
+"=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>"
+"=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv"
+"=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else "
+"if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=par"
+"seFloat(v);s.em=0;if(String.fromCharCode){i=escape(String.fromCharC"
+"ode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}s.sa"
+"(un);s.vl_l='visitorID,vmk,ppu,charSet,visitorNamespace,cookieDomai"
+"nPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode,purc"
+"haseID';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,tr"
+"ansactionID,campaign,state,zip,events,products,linkName,linkType';f"
+"or(var n=1;n<51;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n;s.vl_g=s."
+"vl_t+',trackDownloadLinks,trackExternalLinks,trackInlineStats,linkL"
+"eaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInter"
+"nalFilters,linkNames';s.pg=pg;s.gl(s.vl_g);if(!ss)s.wds()}",
l=window.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf(
'MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(l)for(i=0;i<l.length;i++){
s=l[i];if(s.oun==un)return s;else if(s.fs(s.oun,un)){s.sa(un);return s
}}if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}
else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a
>=5&&v.indexOf('Opera')<0&&u.indexOf('Opera')<0){eval(c);return new
s_c(un,pg,ss)}else s=s_c2f(c);return s(un,pg,ss)}function s_co(o){
var s=s_gi("^",1,1);return s.co(o)}function s_gs(un){var s=s_gi(un,1,1
);return s.t()}function s_dc(un){var s=s_gi(un,1);return s.t()}

// Test & Target Plug-In
// depends on /wp-srv/otto/js/mbox.js
/*
if (typeof mboxLoadSCPlugin == "function")
	mboxLoadSCPlugin(s);
*/
/* end s_code */

/* START: TWP vars, fns, objs, etc. */
/* START: s.initForTwp */
s.initForTwp = function(){

/* Facebook domains */
s.facebookSocial="facebook - recommendations|facebook.com/plugins/recommendations.php>facebook - friends activity|facebook.com/plugins/activity.php"

/* You may give each page an identifying name, server, and channel on the next lines. */
if (typeof(wp_section) != "undefined")
{
	wp_section = wp_section.replace(/\//, " - ");
}
if (typeof(wp_subsection) != "undefined")
{
	wp_subsection = wp_subsection.replace(/\//, " - ");
}
/* need to test */

if (typeof(wp_page_name) != "undefined")
{
	s.pageName=wp_page_name.replace(/<[a-zA-Z\/][^>]*>/g,"");

	//remove session id
	s.pageName=s.pageName.replace(/\;jsessionid\=.{23}/g,"");
}
else
{
	s.pageName="wp - " + document.location.pathname + " - " + document.title;

	//remove html
	s.pageName=s.pageName.replace(/<[a-zA-Z\/][^>]*>/g,"");

	//remove session id
	s.pageName=s.pageName.replace(/\;jsessionid\=.{23}/g,"");

	//var doc_url = document.location.href;

	//if (doc_url.indexOf("ac2/wp-dyn?")>0)
	//{
	//	s.prop50=doc_url.substr(doc_url.indexOf("ac2/wp-dyn?")+10);
	//}
}

if(typeof(wp_channel) != "undefined")
{
	s.channel=(wp_channel.indexOf("wp - ")>=0)?wp_channel:"wp - " + wp_channel;
}
else if(typeof(wp_section) != "undefined")
{
	s.channel=(wp_section.indexOf("wp - ")>=0)?wp_section.split('/')[0]:"wp - " + wp_section.split('/')[0];
}
else if (typeof(wp_hierarchy) != "undefined")
{
	s.channel=(wp_hierarchy.indexOf("wp - ")>=0)?wp_hierarchy.split('|')[0]:"wp - " + wp_hierarchy.split('|')[0];
}
else
{
	s.channel="wp - nocategory";
}

// <meta name="eomportal-instanceid" content="135" />

s_portalInstance = "";
if ( document.getElementsByName( 'eomportal-instanceid' ).length ){
	s_portalInstance = document.getElementsByName( 'eomportal-instanceid' )[0].getAttribute('content');
}

s.server="washingtonpost.com";
s.server += (s_portalInstance)? ":"+s_portalInstance : "" ;

s.pageType= (window.wp_page_type) ? wp_page_type : "";
/*
s.prop1
	wp_sectionfront=wp_sectionfront.toLowerCase();
	s.prop1=(wp_sectionfront.indexOf("wp - ")>=0||wp_sectionfront.length == 0)?wp_sectionfront:"wp - " + wp_sectionfront;
*/
if (typeof(wp_print_section) != "undefined")
{
	wp_print_section=wp_print_section.toLowerCase();
	s.prop1=wp_print_section;
} else {
	s.prop1="Not in Print";
}
if (typeof(wp_subsection) != "undefined")
{
	wp_subsection = wp_subsection.toLowerCase();
	s.prop2=(wp_subsection.indexOf("wp - ")>=0||wp_subsection.length == 0)?wp_subsection:"wp - " + wp_subsection;
}
if (typeof(wp_content_type) != "undefined")
{
	s.prop3=wp_content_type.toLowerCase();
}
if (typeof(wp_source) != "undefined")
{
	s.prop4=wp_source.toLowerCase();
} else {
	s.prop4="washingtonpost.com";
}
if (typeof(wp_author) != "undefined")
{
	s.prop5=wp_author.toLowerCase();
}
if (typeof(wp_search_keywords) != "undefined")
{
	s.prop6=wp_search_keywords.toLowerCase();
}
if (typeof(wp_search_type) != "undefined")
{
	s.prop7=wp_search_type.toLowerCase();
}
s.prop8="";
s.prop9="";
s.prop10="";
s.prop11="";
if (typeof(wp_content_id) != "undefined")
{
	// s.prop13=wp_content_id;
	s.prop12=wp_content_id;
	if ( window.wp_application )
	{
	      s.prop13 = "" ;
	}
	if ( window.wp_content_id )
	{
		s.prop13= wp_content_id+" - "+window.wp_headline;
	}
	/* killed for eidos
	if ( window.wp_section && window.wp_section == "interactivity")
	{
		s.prop13 = "" ;
	}
	*/
}
if (typeof(wp_page_num) != "undefined")
{
	s.prop14=wp_page_num;
}
if (typeof(wp_op_ranking) != "undefined")
{
	s.prop16=wp_op_ranking.toLowerCase();
}
/* killed for eidos
if (typeof(wp_printed) != "undefined") {
	s.prop19="printed page";
}
*/
if (typeof(wp_search_result_count) != "undefined")
{
	s.prop21=wp_search_result_count;
}
/* killed for eidos
if (typeof(wp_story_id) != "undefined")
{
	s.prop22=wp_story_id;
}
*/
/* killed for eidos
if (typeof(wp_topic) != "undefined")
{
	s.prop24=wp_topic;
}
*/
if (typeof(wp_story_type) != "undefined")
{
	s.prop24=wp_story_type;
}
if (typeof(wp_blogname) != "undefined")
{
	s.prop25=wp_blogname;
}
if (typeof(wp_columnname) != "undefined")
{
	s.prop26=wp_columnname;
}
/* killed for eidos
if (typeof(wp_application) != "undefined")
{
	s.prop32=wp_application;
}
*/
s.getRegistrationStatus = function()
{
	var regStatus = "anonymous";
	if ( document.cookie.match(/wpniuser=([^;]+)/) ) {
		regStatus = "wp registration";
	}
	if (document.cookie.indexOf("fbuid") != -1)
	{
		regStatus = "facebook connect";
	}
	return regStatus;
}
getFBConnectUserName = s.getRegistrationStatus;
s.prop33=s.getRegistrationStatus();
function getUserName()
{
	var username;
	if ( document.cookie.match(/wpniuser=([^;]+)/) ) {
		return RegExp.$1 ;
	}
	return username;
}
/* START: s.prop34 */
if (typeof(wp_news_or_commercial) != "undefined")
{
	s.prop34 = wp_news_or_commercial;
} else {
	s.prop34 = "News";
	if ( s.channel.match(/^(wp - )?(cars|classifieds|jobs|real ?estate|rentals)/) )
	{
		s.prop34 = "Commercial";
	}
}
/* END: s.prop34 */

s.prop35=(document.referrer)?(document.referrer).toString().match(/https?\:\/\/([^\/]+)\//)[1] : '' ;

// one-off condition added 4/27/2011
if(document.location.href.toString().indexOf('http://www.washingtonpost.com/doubleclick/DARTIframe.html')==0)
{
	s.prop37=s.getQueryParam('clickThroughUrl')
}

if (typeof(wp_published) != "undefined")
{
	s.prop38=wp_published;
}
if (typeof(wp_commercial_node) != "undefined")
{
	s.prop39=wp_commercial_node;
}
if (typeof(wp_content_category) != "undefined")
{
	s.prop40=wp_content_category;
}
s.prop41=getUserName();

/* E-commerce Variables */
s.campaign=(typeof s.campaign == 'undefined')?"":s.campaign;
s.state="";
s.zip="";
s.events="";
s.products="";
s.purchaseID="";
s.eVar1=(typeof(wp_evar1)!="undefined")?wp_evar1:s.pageName;
s.eVar2=(typeof(wp_evar2)!="undefined")?wp_evar2:s.channel;
s.eVar3=(typeof(wp_evar3)!="undefined")?wp_evar3:'';
s.eVar4=(typeof(wp_evar4)!="undefined")?wp_evar4:'';
s.eVar5=(typeof(wp_evar5)!="undefined")?wp_evar5:'';
s.eVar6=(typeof(wp_evar6)!="undefined")?wp_evar6:'';
s.eVar7=(typeof(wp_evar7)!="undefined")?wp_evar7:'';
s.eVar8=(typeof(wp_evar8)!="undefined")?wp_evar8:s.prop5;
s.eVar9=(typeof(wp_evar9)!="undefined")?wp_evar9:'';
s.eVar10=(typeof(wp_evar10)!="undefined")?wp_evar10:s.prop16;
s.eVar11=(typeof(wp_evar11)!="undefined")?wp_evar11:'';
s.eVar12=(typeof(wp_evar12)!="undefined")?wp_evar12:'';
s.eVar13=(typeof(wp_evar13)!="undefined")?wp_evar13:'';
s.eVar14=(typeof(wp_evar14)!="undefined")?wp_evar14:'';
s.eVar15=(typeof(wp_evar15)!="undefined")?wp_evar15:'';
s.eVar16=(typeof(wp_evar16)!="undefined")?wp_evar16:'';
s.eVar17=(typeof(wp_evar17)!="undefined")?wp_evar17:s.prop3;
s.eVar18=(typeof(wp_evar18)!="undefined")?wp_evar18:'';
s.eVar19=(typeof(wp_evar19)!="undefined")?wp_evar19:'';
s.eVar20=(typeof(wp_evar20)!="undefined")?wp_evar20:'';
s.eVar21=(typeof(wp_evar21)!="undefined")?wp_evar21:'';
s.eVar22=(typeof(wp_evar22)!="undefined")?wp_evar22:'';
s.eVar23=(typeof(wp_evar23)!="undefined")?wp_evar23:'';
s.eVar24=(typeof(wp_evar24)!="undefined")?wp_evar24:'';
s.eVar25=(typeof(wp_evar25)!="undefined")?wp_evar25:'';
s.eVar26=(typeof(wp_evar26)!="undefined")?wp_evar26:'';
s.eVar27=(typeof(wp_evar27)!="undefined")?wp_evar27:'';
s.eVar28=(typeof(wp_evar28)!="undefined")?wp_evar28:'';
s.eVar29=(typeof(wp_evar29)!="undefined")?wp_evar29:'';
s.eVar30=(typeof(wp_evar30)!="undefined")?wp_evar30:'';
s.eVar31=(typeof(wp_evar31)!="undefined")?wp_evar31:'';
s.eVar32=(typeof(wp_evar32)!="undefined")?wp_evar32:'';
s.eVar33=(typeof(wp_evar33)!="undefined")?wp_evar33:s.prop33;
s.eVar34=(typeof(wp_evar34)!="undefined")?wp_evar34:'';
s.eVar35=(typeof(wp_evar35)!="undefined")?wp_evar35:s.prop35;
// s.eVar35=(typeof(wp_evar35)!="undefined")?wp_evar35:s.getValOnce(s.prop35,'s_ev35',0);
s.eVar36=(typeof(wp_evar36)!="undefined")?wp_evar36:'';
s.eVar37=(typeof(wp_evar37)!="undefined")?wp_evar37:'';
s.eVar38=(typeof(wp_evar38)!="undefined")?wp_evar38:'';
s.eVar39=(typeof(wp_evar39)!="undefined")?wp_evar39:'';
s.eVar40=(typeof(wp_evar40)!="undefined")?wp_evar40:'';
s.eVar41=(typeof(wp_evar41)!="undefined")?wp_evar41:'';
s.eVar42=(typeof(wp_evar42)!="undefined")?wp_evar42:'';
s.eVar43=(typeof(wp_evar43)!="undefined")?wp_evar43:'';
s.eVar44=(typeof(wp_evar44)!="undefined")?wp_evar44:'';
s.eVar45=(typeof(wp_evar45)!="undefined")?wp_evar45:'';
s.eVar46=(typeof(wp_evar46)!="undefined")?wp_evar46:'';
s.eVar47=(typeof(wp_evar47)!="undefined")?wp_evar47:'';
s.eVar48=(typeof(wp_evar48)!="undefined")?wp_evar48:'';
s.eVar49=(typeof(wp_evar49)!="undefined")?wp_evar49:'';
s.eVar50=(typeof(wp_evar50)!="undefined")?wp_evar50:'';
/* Hierarchy Variables */
if (typeof(wp_hierarchy) != "undefined") {
	s.hier1= wp_hierarchy.toLowerCase();
} else {
	s.hier1="nocategory";
}
/* killed for eidos
s.hier2="washingtonpost.com|" + s.hier1;
*/
/* killed for eidos
function setWpStoryIdForOmniture( wp_story_id ) {
	s.prop22 = wp_story_id ;
}
*/

s_propsInNeedOfBeingMapped = [
	'pageName','channel','prop2','prop23','prop39','hier1','hier2','eVar6'
];
for (var i=0; i < s_propsInNeedOfBeingMapped.length; i++){
	var p = s_propsInNeedOfBeingMapped[i];
	if ( window.s[p] ) {
		s[p]=s[p].replace(/\bnation\b/g,"national");
		s[p]=s[p].replace(/\bmetro\b/g,"local");
	}
}

}
/* END: s.initForTwp */

/* START: Initialize wp_ variables from TWP.Data.Tracking.props, if available */
s.copyTWPToWd = function(){
	if  (
	        window.TWP &&
	        TWP.Data &&
	        TWP.Data.Tracking &&
	        TWP.Data.Tracking.props
	    )
	{
	    for ( p in TWP.Data.Tracking.props ) {
			window["wp_"+p] = TWP.Data.Tracking.props[p];
	    }
	}
}
/* END: Initialize wp_ variables from TWP.Data.Tracking.props, if available */

/* START: s.sendPageViewToOmniture family */
s.nullifyOnResend = ['campaign','prop20','prop27','eVar3','eVar20'];
s.sendPageViewToOmniture = function(props,nullify) {
	nullify = nullify||s.nullifyOnResend;
	for ( var i=0; i < nullify.length; i++){
		s[ nullify[i] ] = null;
		window[ 'wp_'+nullify[i].toLowerCase() ] = null;
	}
	props = props||{};
	for ( p in props ){
		s[p] = props[p];
	}
	s.t();
}
s.sendPageViewToOmnitureWithFullReset = function(props,nullify) {
	s.copyTWPToWd();
	s.initForTwp();
	s.sendPageViewToOmniture(props,nullify);
}
/* END: s.sendPageViewToOmniture family */

/* START: s.sendDataToOmniture */
s.sendDataToOmniture = function(customLinkName,events,props) {
	// START: abort if no s_acount or no customLinkName or no events and props
	if( typeof s_account!="undefined" && customLinkName && (events||props) ){
		var propPattern = /^(prop|eVar|channel|hier|pageName)/ ;
		// START: make sure events is a string
		if(events){
			if(typeof events == "string"){}
			else if(typeof events == "object" && events.join){events=events.join(',')}
			else{events=null}
		}
		// END: make sure events is a string

		// START: make sure props is an object
		if(props){
			if(typeof props == "object"){}
			else{props=null}
		}
		// END: make sure props is an object

		// START: only continue of both props and events haven't been nulled out
		if(events||props){
			// START: set linkTrackVars
			var linkTrackVars = [] ;
			if(events)
				linkTrackVars[linkTrackVars.length] = "events";
			if(props){
				for (prop in props){
					if(prop.match(propPattern))
						linkTrackVars[linkTrackVars.length] = prop ;
				}
			}
			// START: set linkTrackVars

			// START: if no linkTrackVars, no point in doing anything
			if(linkTrackVars.length){
				s.linkTrackVars=linkTrackVars;
				if(events)
					s.linkTrackEvents=events;
				for (prop in props){
					if(prop.match(propPattern))
						eval("s."+prop+" = props[prop]");
				}
				if(events)
					s.events=events;

				// The Holy Grail:
				s.tl(true,'o',customLinkName);
			}
			// END: if no linkTrackVars, no point in doing anything
		}
		// END: only continue of both props and events haven't been nulled out
	}
	// END: abort if no s_account and no events or props
}
sendDataToOmniture = sendEventToOmniture = sendDataToOmnitureFromEvri = s.sendDataToOmniture;
/* START: s.sendDataToOmniture */

var toxicOmnitureCounter = 0 ;
function ThreateningStackOverflowException() {
	this.description = "Threatening Stack Overflow Exception" ;
	this.name = "ThreateningStackOverflowException" ;
	this.number = "" ;
	this.message = this.description ;
}
/* END: TWP vars, fns, objs, etc. */

// initialize lots of variables
s.copyTWPToWd();
s.initForTwp();
/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code=s.t();
/* End SiteCatalyst code version: H.7. */