var wh="170";var xf=0,vu=1,yf=2;var Ld=1,Th=2,$i=3,ui=0,kt=1,Tn=2,ds=0,fs=1,Da=2,Mu=3,Su=4,vf=5,or=100,Mf=101,Sf=102,Ef=103,bf=104,wf=200,Tf=201,Rf=202,Af=203,il=204,sl=205,Cf=206,If=207,Pf=208,Lf=209,Df=210,Uf=211,Nf=212,Ff=213,Bf=214,rl=0,ol=1,al=2,Gr=3,cl=4,ll=5,hl=6,ul=7,Dd=0,Of=1,Hf=2,ps=0,zf=1,kf=2,Gf=3,dc=4,Vf=5,Wf=6,Xf=7;var Ud=300,Vr=301,Wr=302,dl=303,fl=304,fc=306,di=1e3,Qi=1001,pl=1002,cn=1003,qf=1004;var jo=1005;var ci=1006,Ec=1007;var cr=1008;var ts=1009,Nd=1010,Fd=1011,Ao=1012,Rh=1013,lr=1014,li=1015,Vo=1016,Ah=1017,Ch=1018,Xr=1020,Bd=35902,Od=1021,Hd=1022,An=1023,zd=1024,kd=1025,Hr=1026,qr=1027,Ih=1028,Ph=1029,Gd=1030,Lh=1031;var Dh=1033,Aa=33776,Ca=33777,Ia=33778,Pa=33779,ml=35840,gl=35841,_l=35842,xl=35843,yl=36196,vl=37492,Ml=37496,Sl=37808,El=37809,bl=37810,wl=37811,Tl=37812,Rl=37813,Al=37814,Cl=37815,Il=37816,Pl=37817,Ll=37818,Dl=37819,Ul=37820,Nl=37821,La=36492,Fl=36494,Bl=36495,Vd=36283,Ol=36284,Hl=36285,zl=36286;var Ua=2300,kl=2301,bc=2302,Eu=2400,bu=2401,wu=2402;var Yf=3200,Zf=3201;var Wd=0,Jf=1,Ut="",wt="srgb",jr="srgb-linear",pc="linear",lt="srgb";var xr=7680;var Tu=519,$f=512,Kf=513,Qf=514,Xd=515,jf=516,ep=517,tp=518,np=519,Gl=35044;var Ru="300 es",ji=2e3,Na=2001,ms=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Ot=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Au=1234567,So=Math.PI/180,Co=180/Math.PI;function hi(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ot[i&255]+Ot[i>>8&255]+Ot[i>>16&255]+Ot[i>>24&255]+"-"+Ot[e&255]+Ot[e>>8&255]+"-"+Ot[e>>16&15|64]+Ot[e>>24&255]+"-"+Ot[t&63|128]+Ot[t>>8&255]+"-"+Ot[t>>16&255]+Ot[t>>24&255]+Ot[n&255]+Ot[n>>8&255]+Ot[n>>16&255]+Ot[n>>24&255]).toLowerCase()}function Pt(i,e,t){return Math.max(e,Math.min(t,i))}function Uh(i,e){return(i%e+e)%e}function ip(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function sp(i,e,t){return i!==e?(t-i)/(e-i):0}function Eo(i,e,t){return(1-t)*i+t*e}function rp(i,e,t,n){return Eo(i,e,1-Math.exp(-t*n))}function op(i,e=1){return e-Math.abs(Uh(i,e*2)-e)}function ap(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function cp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function lp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function hp(i,e){return i+Math.random()*(e-i)}function up(i){return i*(.5-Math.random())}function dp(i){i!==void 0&&(Au=i);let e=Au+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function fp(i){return i*So}function pp(i){return i*Co}function mp(i){return(i&i-1)===0&&i!==0}function gp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function _p(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function xp(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Rn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function at(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var gn={DEG2RAD:So,RAD2DEG:Co,generateUUID:hi,clamp:Pt,euclideanModulo:Uh,mapLinear:ip,inverseLerp:sp,lerp:Eo,damp:rp,pingpong:op,smoothstep:ap,smootherstep:cp,randInt:lp,randFloat:hp,randFloatSpread:up,seededRandom:dp,degToRad:fp,radToDeg:pp,isPowerOfTwo:mp,ceilPowerOfTwo:gp,floorPowerOfTwo:_p,setQuaternionFromProperEuler:xp,normalize:at,denormalize:Rn},le=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ze=class i{constructor(e,t,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],R=s[1],E=s[4],y=s[7],N=s[2],C=s[5],I=s[8];return r[0]=o*_+a*R+c*N,r[3]=o*m+a*E+c*C,r[6]=o*p+a*y+c*I,r[1]=l*_+h*R+u*N,r[4]=l*m+h*E+u*C,r[7]=l*p+h*y+u*I,r[2]=d*_+f*R+g*N,r[5]=d*m+f*E+g*C,r[8]=d*p+f*y+g*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,g=t*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=u*_,e[1]=(s*l-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=d*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(wc.makeScale(e,t)),this}rotate(e){return this.premultiply(wc.makeRotation(-e)),this}translate(e,t){return this.premultiply(wc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},wc=new Ze;function qd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Io(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function yp(){let i=Io("canvas");return i.style.display="block",i}var Cu={};function vo(i){i in Cu||(Cu[i]=!0,console.warn(i))}function vp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Mp(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Sp(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var st={enabled:!0,workingColorSpace:jr,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===lt&&(i.r=es(i.r),i.g=es(i.g),i.b=es(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===lt&&(i.r=zr(i.r),i.g=zr(i.g),i.b=zr(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ut?pc:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function es(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function zr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Iu=[.64,.33,.3,.6,.15,.06],Pu=[.2126,.7152,.0722],Lu=[.3127,.329],Du=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Uu=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);st.define({[jr]:{primaries:Iu,whitePoint:Lu,transfer:pc,toXYZ:Du,fromXYZ:Uu,luminanceCoefficients:Pu,workingColorSpaceConfig:{unpackColorSpace:wt},outputColorSpaceConfig:{drawingBufferColorSpace:wt}},[wt]:{primaries:Iu,whitePoint:Lu,transfer:lt,toXYZ:Du,fromXYZ:Uu,luminanceCoefficients:Pu,outputColorSpaceConfig:{drawingBufferColorSpace:wt}}});var yr,Vl=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{yr===void 0&&(yr=Io("canvas")),yr.width=e.width,yr.height=e.height;let n=yr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=yr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Io("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=es(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(es(t[n]/255)*255):t[n]=es(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Ep=0,Fa=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ep++}),this.uuid=hi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Tc(s[o].image)):r.push(Tc(s[o]))}else r=Tc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Tc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Vl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var bp=0,Zt=class i extends ms{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Qi,s=Qi,r=ci,o=cr,a=An,c=ts,l=i.DEFAULT_ANISOTROPY,h=Ut){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bp++}),this.uuid=hi(),this.name="",this.source=new Fa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ud)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case di:e.x=e.x-Math.floor(e.x);break;case Qi:e.x=e.x<0?0:1;break;case pl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case di:e.y=e.y-Math.floor(e.y);break;case Qi:e.y=e.y<0?0:1;break;case pl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Zt.DEFAULT_IMAGE=null;Zt.DEFAULT_MAPPING=Ud;Zt.DEFAULT_ANISOTROPY=1;var ht=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(l+1)/2,y=(f+1)/2,N=(p+1)/2,C=(h+d)/4,I=(u+_)/4,P=(g+m)/4;return E>y&&E>N?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=C/n,r=I/n):y>N?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=C/s,r=P/s):N<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(N),n=I/r,s=P/r),this.set(n,s,r,t),this}let R=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(R)<.001&&(R=1),this.x=(m-g)/R,this.y=(u-_)/R,this.z=(d-h)/R,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Wl=class extends ms{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ht(0,0,e,t),this.scissorTest=!1,this.viewport=new ht(0,0,e,t);let s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ci,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new Zt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Fa(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ns=class extends Wl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ba=class extends Zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=cn,this.minFilter=cn,this.wrapR=Qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Xl=class extends Zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=cn,this.minFilter=cn,this.wrapR=Qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Lt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let m=1-a,p=c*d+l*f+h*g+u*_,R=p>=0?1:-1,E=1-p*p;if(E>Number.EPSILON){let N=Math.sqrt(E),C=Math.atan2(N,p*R);m=Math.sin(m*C)/N,a=Math.sin(a*C)/N}let y=a*R;if(c=c*m+d*y,l=l*m+f*y,h=h*m+g*y,u=u*m+_*y,m===1-a){let N=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=N,l*=N,h*=N,u*=N}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-a*f,e[t+2]=l*g+h*f+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Pt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Nu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Nu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Rc.copy(this).projectOnVector(e),this.sub(Rc)}reflect(e){return this.sub(Rc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Rc=new w,Nu=new Lt,fi=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(En.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(En.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=En.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,En):En.fromBufferAttribute(r,o),En.applyMatrix4(e.matrixWorld),this.expandByPoint(En);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ea.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ea.copy(n.boundingBox)),ea.applyMatrix4(e.matrixWorld),this.union(ea)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,En),En.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(lo),ta.subVectors(this.max,lo),vr.subVectors(e.a,lo),Mr.subVectors(e.b,lo),Sr.subVectors(e.c,lo),rs.subVectors(Mr,vr),os.subVectors(Sr,Mr),js.subVectors(vr,Sr);let t=[0,-rs.z,rs.y,0,-os.z,os.y,0,-js.z,js.y,rs.z,0,-rs.x,os.z,0,-os.x,js.z,0,-js.x,-rs.y,rs.x,0,-os.y,os.x,0,-js.y,js.x,0];return!Ac(t,vr,Mr,Sr,ta)||(t=[1,0,0,0,1,0,0,0,1],!Ac(t,vr,Mr,Sr,ta))?!1:(na.crossVectors(rs,os),t=[na.x,na.y,na.z],Ac(t,vr,Mr,Sr,ta))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,En).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(En).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Xi=[new w,new w,new w,new w,new w,new w,new w,new w],En=new w,ea=new fi,vr=new w,Mr=new w,Sr=new w,rs=new w,os=new w,js=new w,lo=new w,ta=new w,na=new w,er=new w;function Ac(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){er.fromArray(i,r);let a=s.x*Math.abs(er.x)+s.y*Math.abs(er.y)+s.z*Math.abs(er.z),c=e.dot(er),l=t.dot(er),h=n.dot(er);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var wp=new fi,ho=new w,Cc=new w,hr=class{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):wp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ho.subVectors(e,this.center);let t=ho.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ho,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Cc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ho.copy(e.center).add(Cc)),this.expandByPoint(ho.copy(e.center).sub(Cc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},qi=new w,Ic=new w,ia=new w,as=new w,Pc=new w,sa=new w,Lc=new w,ql=class{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=qi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qi.copy(this.origin).addScaledVector(this.direction,t),qi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ic.copy(e).add(t).multiplyScalar(.5),ia.copy(t).sub(e).normalize(),as.copy(this.origin).sub(Ic);let r=e.distanceTo(t)*.5,o=-this.direction.dot(ia),a=as.dot(this.direction),c=-as.dot(ia),l=as.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){let _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ic).addScaledVector(ia,d),f}intersectSphere(e,t){qi.subVectors(e.center,this.origin);let n=qi.dot(this.direction),s=qi.dot(qi)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,qi)!==null}intersectTriangle(e,t,n,s,r){Pc.subVectors(t,e),sa.subVectors(n,e),Lc.crossVectors(Pc,sa);let o=this.direction.dot(Lc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;as.subVectors(this.origin,e);let c=a*this.direction.dot(sa.crossVectors(as,sa));if(c<0)return null;let l=a*this.direction.dot(Pc.cross(as));if(l<0||c+l>o)return null;let h=-a*as.dot(Lc);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},nt=class i{constructor(e,t,n,s,r,o,a,c,l,h,u,d,f,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,d,f,g,_,m)}set(e,t,n,s,r,o,a,c,l,h,u,d,f,g,_,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/Er.setFromMatrixColumn(e,0).length(),r=1/Er.setFromMatrixColumn(e,1).length(),o=1/Er.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d+_*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*h,f=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,f=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){let d=o*c,f=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Tp,e,Rp)}lookAt(e,t,n){let s=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),cs.crossVectors(n,on),cs.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),cs.crossVectors(n,on)),cs.normalize(),ra.crossVectors(on,cs),s[0]=cs.x,s[4]=ra.x,s[8]=on.x,s[1]=cs.y,s[5]=ra.y,s[9]=on.y,s[2]=cs.z,s[6]=ra.z,s[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],R=n[3],E=n[7],y=n[11],N=n[15],C=s[0],I=s[4],P=s[8],S=s[12],v=s[1],A=s[5],z=s[9],F=s[13],k=s[2],Y=s[6],O=s[10],Q=s[14],W=s[3],oe=s[7],ue=s[11],ye=s[15];return r[0]=o*C+a*v+c*k+l*W,r[4]=o*I+a*A+c*Y+l*oe,r[8]=o*P+a*z+c*O+l*ue,r[12]=o*S+a*F+c*Q+l*ye,r[1]=h*C+u*v+d*k+f*W,r[5]=h*I+u*A+d*Y+f*oe,r[9]=h*P+u*z+d*O+f*ue,r[13]=h*S+u*F+d*Q+f*ye,r[2]=g*C+_*v+m*k+p*W,r[6]=g*I+_*A+m*Y+p*oe,r[10]=g*P+_*z+m*O+p*ue,r[14]=g*S+_*F+m*Q+p*ye,r[3]=R*C+E*v+y*k+N*W,r[7]=R*I+E*A+y*Y+N*oe,r[11]=R*P+E*z+y*O+N*ue,r[15]=R*S+E*F+y*Q+N*ye,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*f-n*c*f)+_*(+t*c*f-t*l*d+r*o*d-s*o*f+s*l*h-r*c*h)+m*(+t*l*u-t*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-s*a*h-t*c*u+t*a*d+s*o*u-n*o*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],R=u*m*l-_*d*l+_*c*f-a*m*f-u*c*p+a*d*p,E=g*d*l-h*m*l-g*c*f+o*m*f+h*c*p-o*d*p,y=h*_*l-g*u*l+g*a*f-o*_*f-h*a*p+o*u*p,N=g*u*c-h*_*c-g*a*d+o*_*d+h*a*m-o*u*m,C=t*R+n*E+s*y+r*N;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/C;return e[0]=R*I,e[1]=(_*d*r-u*m*r-_*s*f+n*m*f+u*s*p-n*d*p)*I,e[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*p+n*c*p)*I,e[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*f-n*c*f)*I,e[4]=E*I,e[5]=(h*m*r-g*d*r+g*s*f-t*m*f-h*s*p+t*d*p)*I,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*p-t*c*p)*I,e[7]=(o*d*r-h*c*r+h*s*l-t*d*l-o*s*f+t*c*f)*I,e[8]=y*I,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*p-t*u*p)*I,e[10]=(o*_*r-g*a*r+g*n*l-t*_*l-o*n*p+t*a*p)*I,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*f-t*a*f)*I,e[12]=N*I,e[13]=(h*_*s-g*u*s+g*n*d-t*_*d-h*n*m+t*u*m)*I,e[14]=(g*a*s-o*_*s-g*n*c+t*_*c+o*n*m-t*a*m)*I,e[15]=(o*u*s-h*a*s+h*n*c-t*u*c-o*n*d+t*a*d)*I,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,g=r*u,_=o*h,m=o*u,p=a*u,R=c*l,E=c*h,y=c*u,N=n.x,C=n.y,I=n.z;return s[0]=(1-(_+p))*N,s[1]=(f+y)*N,s[2]=(g-E)*N,s[3]=0,s[4]=(f-y)*C,s[5]=(1-(d+p))*C,s[6]=(m+R)*C,s[7]=0,s[8]=(g+E)*I,s[9]=(m-R)*I,s[10]=(1-(d+_))*I,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=Er.set(s[0],s[1],s[2]).length(),o=Er.set(s[4],s[5],s[6]).length(),a=Er.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],bn.copy(this);let l=1/r,h=1/o,u=1/a;return bn.elements[0]*=l,bn.elements[1]*=l,bn.elements[2]*=l,bn.elements[4]*=h,bn.elements[5]*=h,bn.elements[6]*=h,bn.elements[8]*=u,bn.elements[9]*=u,bn.elements[10]*=u,t.setFromRotationMatrix(bn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=ji){let c=this.elements,l=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s),f,g;if(a===ji)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Na)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=ji){let c=this.elements,l=1/(t-e),h=1/(n-s),u=1/(o-r),d=(t+e)*l,f=(n+s)*h,g,_;if(a===ji)g=(o+r)*u,_=-2*u;else if(a===Na)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Er=new w,bn=new nt,Tp=new w(0,0,0),Rp=new w(1,1,1),cs=new w,ra=new w,on=new w,Fu=new nt,Bu=new Lt,pi=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Pt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Pt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Pt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Pt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Fu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Fu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Bu.setFromEuler(this),this.setFromQuaternion(Bu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};pi.DEFAULT_ORDER="XYZ";var Oa=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Ap=0,Ou=new w,br=new Lt,Yi=new nt,oa=new w,uo=new w,Cp=new w,Ip=new Lt,Hu=new w(1,0,0),zu=new w(0,1,0),ku=new w(0,0,1),Gu={type:"added"},Pp={type:"removed"},wr={type:"childadded",child:null},Dc={type:"childremoved",child:null},Gt=class i extends ms{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ap++}),this.uuid=hi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new w,t=new pi,n=new Lt,s=new w(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new nt},normalMatrix:{value:new Ze}}),this.matrix=new nt,this.matrixWorld=new nt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Oa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return br.setFromAxisAngle(e,t),this.quaternion.multiply(br),this}rotateOnWorldAxis(e,t){return br.setFromAxisAngle(e,t),this.quaternion.premultiply(br),this}rotateX(e){return this.rotateOnAxis(Hu,e)}rotateY(e){return this.rotateOnAxis(zu,e)}rotateZ(e){return this.rotateOnAxis(ku,e)}translateOnAxis(e,t){return Ou.copy(e).applyQuaternion(this.quaternion),this.position.add(Ou.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Hu,e)}translateY(e){return this.translateOnAxis(zu,e)}translateZ(e){return this.translateOnAxis(ku,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?oa.copy(e):oa.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),uo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yi.lookAt(uo,oa,this.up):Yi.lookAt(oa,uo,this.up),this.quaternion.setFromRotationMatrix(Yi),s&&(Yi.extractRotation(s.matrixWorld),br.setFromRotationMatrix(Yi),this.quaternion.premultiply(br.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Gu),wr.child=e,this.dispatchEvent(wr),wr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Pp),Dc.child=e,this.dispatchEvent(Dc),Dc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Gu),wr.child=e,this.dispatchEvent(wr),wr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(uo,e,Cp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(uo,Ip,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Gt.DEFAULT_UP=new w(0,1,0);Gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var wn=new w,Zi=new w,Uc=new w,Ji=new w,Tr=new w,Rr=new w,Vu=new w,Nc=new w,Fc=new w,Bc=new w,Oc=new ht,Hc=new ht,zc=new ht,us=class i{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),wn.subVectors(e,t),s.cross(wn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){wn.subVectors(s,t),Zi.subVectors(n,t),Uc.subVectors(e,t);let o=wn.dot(wn),a=wn.dot(Zi),c=wn.dot(Uc),l=Zi.dot(Zi),h=Zi.dot(Uc),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ji)===null?!1:Ji.x>=0&&Ji.y>=0&&Ji.x+Ji.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Ji)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ji.x),c.addScaledVector(o,Ji.y),c.addScaledVector(a,Ji.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Oc.setScalar(0),Hc.setScalar(0),zc.setScalar(0),Oc.fromBufferAttribute(e,t),Hc.fromBufferAttribute(e,n),zc.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Oc,r.x),o.addScaledVector(Hc,r.y),o.addScaledVector(zc,r.z),o}static isFrontFacing(e,t,n,s){return wn.subVectors(n,t),Zi.subVectors(e,t),wn.cross(Zi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return wn.subVectors(this.c,this.b),Zi.subVectors(this.a,this.b),wn.cross(Zi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;Tr.subVectors(s,n),Rr.subVectors(r,n),Nc.subVectors(e,n);let c=Tr.dot(Nc),l=Rr.dot(Nc);if(c<=0&&l<=0)return t.copy(n);Fc.subVectors(e,s);let h=Tr.dot(Fc),u=Rr.dot(Fc);if(h>=0&&u<=h)return t.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Tr,o);Bc.subVectors(e,r);let f=Tr.dot(Bc),g=Rr.dot(Bc);if(g>=0&&f<=g)return t.copy(r);let _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Rr,a);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Vu.subVectors(r,s),a=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(Vu,a);let p=1/(m+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(Tr,o).addScaledVector(Rr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Yd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ls={h:0,s:0,l:0},aa={h:0,s:0,l:0};function kc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var We=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=st.workingColorSpace){return this.r=e,this.g=t,this.b=n,st.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=st.workingColorSpace){if(e=Uh(e,1),t=Pt(t,0,1),n=Pt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=kc(o,r,e+1/3),this.g=kc(o,r,e),this.b=kc(o,r,e-1/3)}return st.toWorkingColorSpace(this,s),this}setStyle(e,t=wt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wt){let n=Yd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=es(e.r),this.g=es(e.g),this.b=es(e.b),this}copyLinearToSRGB(e){return this.r=zr(e.r),this.g=zr(e.g),this.b=zr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wt){return st.fromWorkingColorSpace(Ht.copy(this),e),Math.round(Pt(Ht.r*255,0,255))*65536+Math.round(Pt(Ht.g*255,0,255))*256+Math.round(Pt(Ht.b*255,0,255))}getHexString(e=wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.fromWorkingColorSpace(Ht.copy(this),t);let n=Ht.r,s=Ht.g,r=Ht.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=st.workingColorSpace){return st.fromWorkingColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=wt){st.fromWorkingColorSpace(Ht.copy(this),e);let t=Ht.r,n=Ht.g,s=Ht.b;return e!==wt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ls),this.setHSL(ls.h+e,ls.s+t,ls.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ls),e.getHSL(aa);let n=Eo(ls.h,aa.h,t),s=Eo(ls.s,aa.s,t),r=Eo(ls.l,aa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ht=new We;We.NAMES=Yd;var Lp=0,is=class extends ms{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lp++}),this.uuid=hi(),this.name="",this.blending=fs,this.side=ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=il,this.blendDst=sl,this.blendEquation=or,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=Gr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xr,this.stencilZFail=xr,this.stencilZPass=xr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==fs&&(n.blending=this.blending),this.side!==ui&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==il&&(n.blendSrc=this.blendSrc),this.blendDst!==sl&&(n.blendDst=this.blendDst),this.blendEquation!==or&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Gr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Cn=class extends is{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pi,this.combine=Dd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var bt=new w,ca=new le,Nt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Gl,this.updateRanges=[],this.gpuType=li,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ca.fromBufferAttribute(this,t),ca.applyMatrix3(e),this.setXY(t,ca.x,ca.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Rn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Rn(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Rn(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Rn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Rn(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array),r=at(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Gl&&(e.usage=this.usage),e}};var Ha=class extends Nt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var za=class extends Nt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var xt=class extends Nt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Dp=0,pn=new nt,Gc=new Gt,Ar=new w,an=new fi,fo=new fi,It=new w,Jt=class i extends ms{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dp++}),this.uuid=hi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(qd(e)?za:Ha)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return pn.makeRotationFromQuaternion(e),this.applyMatrix4(pn),this}rotateX(e){return pn.makeRotationX(e),this.applyMatrix4(pn),this}rotateY(e){return pn.makeRotationY(e),this.applyMatrix4(pn),this}rotateZ(e){return pn.makeRotationZ(e),this.applyMatrix4(pn),this}translate(e,t,n){return pn.makeTranslation(e,t,n),this.applyMatrix4(pn),this}scale(e,t,n){return pn.makeScale(e,t,n),this.applyMatrix4(pn),this}lookAt(e){return Gc.lookAt(e),Gc.updateMatrix(),this.applyMatrix4(Gc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ar).negate(),this.translate(Ar.x,Ar.y,Ar.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new xt(n,3))}else{for(let n=0,s=t.count;n<s;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];an.setFromBufferAttribute(r),this.morphTargetsRelative?(It.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(It),It.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(It)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(e){let n=this.boundingSphere.center;if(an.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];fo.setFromBufferAttribute(a),this.morphTargetsRelative?(It.addVectors(an.min,fo.min),an.expandByPoint(It),It.addVectors(an.max,fo.max),an.expandByPoint(It)):(an.expandByPoint(fo.min),an.expandByPoint(fo.max))}an.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)It.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(It));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)It.fromBufferAttribute(a,l),c&&(Ar.fromBufferAttribute(e,l),It.add(Ar)),s=Math.max(s,n.distanceToSquared(It))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nt(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new w,c[P]=new w;let l=new w,h=new w,u=new w,d=new le,f=new le,g=new le,_=new w,m=new w;function p(P,S,v){l.fromBufferAttribute(n,P),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,v),d.fromBufferAttribute(r,P),f.fromBufferAttribute(r,S),g.fromBufferAttribute(r,v),h.sub(l),u.sub(l),f.sub(d),g.sub(d);let A=1/(f.x*g.y-g.x*f.y);isFinite(A)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(A),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(A),a[P].add(_),a[S].add(_),a[v].add(_),c[P].add(m),c[S].add(m),c[v].add(m))}let R=this.groups;R.length===0&&(R=[{start:0,count:e.count}]);for(let P=0,S=R.length;P<S;++P){let v=R[P],A=v.start,z=v.count;for(let F=A,k=A+z;F<k;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let E=new w,y=new w,N=new w,C=new w;function I(P){N.fromBufferAttribute(s,P),C.copy(N);let S=a[P];E.copy(S),E.sub(N.multiplyScalar(N.dot(S))).normalize(),y.crossVectors(C,S);let A=y.dot(c[P])<0?-1:1;o.setXYZW(P,E.x,E.y,E.z,A)}for(let P=0,S=R.length;P<S;++P){let v=R[P],A=v.start,z=v.count;for(let F=A,k=A+z;F<k;F+=3)I(e.getX(F+0)),I(e.getX(F+1)),I(e.getX(F+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Nt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new w,r=new w,o=new w,a=new w,c=new w,l=new w,h=new w,u=new w;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)It.fromBufferAttribute(e,t),It.normalize(),e.setXYZ(t,It.x,It.y,It.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),f=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new Nt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Wu=new nt,tr=new ql,la=new hr,Xu=new w,ha=new w,ua=new w,da=new w,Vc=new w,fa=new w,qu=new w,pa=new w,re=class extends Gt{constructor(e=new Jt,t=new Cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){fa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(Vc.fromBufferAttribute(u,e),o?fa.addScaledVector(Vc,h):fa.addScaledVector(Vc.sub(t),h))}t.add(fa)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),la.copy(n.boundingSphere),la.applyMatrix4(r),tr.copy(e.ray).recast(e.near),!(la.containsPoint(tr.origin)===!1&&(tr.intersectSphere(la,Xu)===null||tr.origin.distanceToSquared(Xu)>(e.far-e.near)**2))&&(Wu.copy(r).invert(),tr.copy(e.ray).applyMatrix4(Wu),!(n.boundingBox!==null&&tr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,tr)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],p=o[m.materialIndex],R=Math.max(m.start,f.start),E=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let y=R,N=E;y<N;y+=3){let C=a.getX(y),I=a.getX(y+1),P=a.getX(y+2);s=ma(this,p,e,n,l,h,u,C,I,P),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let R=a.getX(m),E=a.getX(m+1),y=a.getX(m+2);s=ma(this,o,e,n,l,h,u,R,E,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],p=o[m.materialIndex],R=Math.max(m.start,f.start),E=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let y=R,N=E;y<N;y+=3){let C=y,I=y+1,P=y+2;s=ma(this,p,e,n,l,h,u,C,I,P),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let R=m,E=m+1,y=m+2;s=ma(this,o,e,n,l,h,u,R,E,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Up(i,e,t,n,s,r,o,a){let c;if(e.side===kt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===ui,a),c===null)return null;pa.copy(a),pa.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(pa);return l<t.near||l>t.far?null:{distance:l,point:pa.clone(),object:i}}function ma(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,ha),i.getVertexPosition(c,ua),i.getVertexPosition(l,da);let h=Up(i,e,t,n,ha,ua,da,qu);if(h){let u=new w;us.getBarycoord(qu,ha,ua,da,u),s&&(h.uv=us.getInterpolatedAttribute(s,a,c,l,u,new le)),r&&(h.uv1=us.getInterpolatedAttribute(r,a,c,l,u,new le)),o&&(h.normal=us.getInterpolatedAttribute(o,a,c,l,u,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new w,materialIndex:0};us.getNormal(ha,ua,da,d.normal),h.face=d,h.barycoord=u}return h}var Ge=class i extends Jt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new xt(l,3)),this.setAttribute("normal",new xt(h,3)),this.setAttribute("uv",new xt(u,2));function g(_,m,p,R,E,y,N,C,I,P,S){let v=y/I,A=N/P,z=y/2,F=N/2,k=C/2,Y=I+1,O=P+1,Q=0,W=0,oe=new w;for(let ue=0;ue<O;ue++){let ye=ue*A-F;for(let Xe=0;Xe<Y;Xe++){let Je=Xe*v-z;oe[_]=Je*R,oe[m]=ye*E,oe[p]=k,l.push(oe.x,oe.y,oe.z),oe[_]=0,oe[m]=0,oe[p]=C>0?1:-1,h.push(oe.x,oe.y,oe.z),u.push(Xe/I),u.push(1-ue/P),Q+=1}}for(let ue=0;ue<P;ue++)for(let ye=0;ye<I;ye++){let Xe=d+ye+Y*ue,Je=d+ye+Y*(ue+1),X=d+(ye+1)+Y*(ue+1),ee=d+(ye+1)+Y*ue;c.push(Xe,Je,ee),c.push(Je,X,ee),W+=6}a.addGroup(f,W,S),f+=W,d+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Yr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Yt(i){let e={};for(let t=0;t<i.length;t++){let n=Yr(i[t]);for(let s in n)e[s]=n[s]}return e}function Np(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Zd(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}var Fp={clone:Yr,merge:Yt},Bp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Op=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,mi=class extends is{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bp,this.fragmentShader=Op,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Yr(e.uniforms),this.uniformsGroups=Np(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},ka=class extends Gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nt,this.projectionMatrix=new nt,this.projectionMatrixInverse=new nt,this.coordinateSystem=ji}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},hs=new w,Yu=new le,Zu=new le,zt=class extends ka{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Co*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(So*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Co*2*Math.atan(Math.tan(So*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){hs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(hs.x,hs.y).multiplyScalar(-e/hs.z),hs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(hs.x,hs.y).multiplyScalar(-e/hs.z)}getViewSize(e,t){return this.getViewBounds(e,Yu,Zu),t.subVectors(Zu,Yu)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(So*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Cr=-90,Ir=1,Yl=class extends Gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new zt(Cr,Ir,e,t);s.layers=this.layers,this.add(s);let r=new zt(Cr,Ir,e,t);r.layers=this.layers,this.add(r);let o=new zt(Cr,Ir,e,t);o.layers=this.layers,this.add(o);let a=new zt(Cr,Ir,e,t);a.layers=this.layers,this.add(a);let c=new zt(Cr,Ir,e,t);c.layers=this.layers,this.add(c);let l=new zt(Cr,Ir,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===ji)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Na)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ga=class extends Zt{constructor(e,t,n,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Vr,super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Zl=class extends ns{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Ga(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ci}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ge(5,5,5),r=new mi({name:"CubemapFromEquirect",uniforms:Yr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:kt,blending:ds});r.uniforms.tEquirect.value=t;let o=new re(s,r),a=t.minFilter;return t.minFilter===cr&&(t.minFilter=ci),new Yl(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},Wc=new w,Hp=new w,zp=new Ze,Ki=class{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Wc.subVectors(n,t).cross(Hp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Wc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||zp.getNormalMatrix(e),s=this.coplanarPoint(Wc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},nr=new hr,ga=new w,Po=class{constructor(e=new Ki,t=new Ki,n=new Ki,s=new Ki,r=new Ki,o=new Ki){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ji){let n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],R=s[13],E=s[14],y=s[15];if(n[0].setComponents(c-r,d-l,m-f,y-p).normalize(),n[1].setComponents(c+r,d+l,m+f,y+p).normalize(),n[2].setComponents(c+o,d+h,m+g,y+R).normalize(),n[3].setComponents(c-o,d-h,m-g,y-R).normalize(),n[4].setComponents(c-a,d-u,m-_,y-E).normalize(),t===ji)n[5].setComponents(c+a,d+u,m+_,y+E).normalize();else if(t===Na)n[5].setComponents(a,u,_,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),nr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),nr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(nr)}intersectsSprite(e){return nr.center.set(0,0,0),nr.radius=.7071067811865476,nr.applyMatrix4(e.matrixWorld),this.intersectsSphere(nr)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(ga.x=s.normal.x>0?e.max.x:e.min.x,ga.y=s.normal.y>0?e.max.y:e.min.y,ga.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ga)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Jd(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function kp(i){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let _=u[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var gs=class i extends Jt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,d=t/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let R=p*d-o;for(let E=0;E<l;E++){let y=E*u-r;g.push(y,-R,0),_.push(0,0,1),m.push(E/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let R=0;R<a;R++){let E=R+l*p,y=R+l*(p+1),N=R+1+l*(p+1),C=R+1+l*p;f.push(E,y,C),f.push(y,N,C)}this.setIndex(f),this.setAttribute("position",new xt(g,3)),this.setAttribute("normal",new xt(_,3)),this.setAttribute("uv",new xt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Gp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Wp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Xp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Yp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Jp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$p=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Kp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Qp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,em=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,tm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,nm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,im=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,sm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,om=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,am=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,cm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,lm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,hm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,um=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,dm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,fm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,pm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_m=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xm="gl_FragColor = linearToOutputTexel( gl_FragColor );",ym=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Mm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Sm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Em=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,wm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Rm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Am=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Cm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Im=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Um=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Nm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Om=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,km=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Gm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Vm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ym=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Zm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Jm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$m=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Km=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,e0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,t0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,n0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,i0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,s0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,r0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,o0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,a0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,c0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,l0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,h0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,u0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,d0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,f0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,p0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,m0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,g0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,_0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,x0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,y0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,v0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,M0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,S0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,E0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,b0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,w0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,T0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,R0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,A0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,C0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,I0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,P0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,L0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,D0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,U0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,N0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,F0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,B0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,O0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,H0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,z0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,k0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,G0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,W0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,X0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,q0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Y0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Z0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,J0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,$0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,K0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Q0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,j0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,eg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ng=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ig=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,og=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ag=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,cg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,lg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ug=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,dg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,gg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_g=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,yg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,je={alphahash_fragment:Gp,alphahash_pars_fragment:Vp,alphamap_fragment:Wp,alphamap_pars_fragment:Xp,alphatest_fragment:qp,alphatest_pars_fragment:Yp,aomap_fragment:Zp,aomap_pars_fragment:Jp,batching_pars_vertex:$p,batching_vertex:Kp,begin_vertex:Qp,beginnormal_vertex:jp,bsdfs:em,iridescence_fragment:tm,bumpmap_pars_fragment:nm,clipping_planes_fragment:im,clipping_planes_pars_fragment:sm,clipping_planes_pars_vertex:rm,clipping_planes_vertex:om,color_fragment:am,color_pars_fragment:cm,color_pars_vertex:lm,color_vertex:hm,common:um,cube_uv_reflection_fragment:dm,defaultnormal_vertex:fm,displacementmap_pars_vertex:pm,displacementmap_vertex:mm,emissivemap_fragment:gm,emissivemap_pars_fragment:_m,colorspace_fragment:xm,colorspace_pars_fragment:ym,envmap_fragment:vm,envmap_common_pars_fragment:Mm,envmap_pars_fragment:Sm,envmap_pars_vertex:Em,envmap_physical_pars_fragment:Um,envmap_vertex:bm,fog_vertex:wm,fog_pars_vertex:Tm,fog_fragment:Rm,fog_pars_fragment:Am,gradientmap_pars_fragment:Cm,lightmap_pars_fragment:Im,lights_lambert_fragment:Pm,lights_lambert_pars_fragment:Lm,lights_pars_begin:Dm,lights_toon_fragment:Nm,lights_toon_pars_fragment:Fm,lights_phong_fragment:Bm,lights_phong_pars_fragment:Om,lights_physical_fragment:Hm,lights_physical_pars_fragment:zm,lights_fragment_begin:km,lights_fragment_maps:Gm,lights_fragment_end:Vm,logdepthbuf_fragment:Wm,logdepthbuf_pars_fragment:Xm,logdepthbuf_pars_vertex:qm,logdepthbuf_vertex:Ym,map_fragment:Zm,map_pars_fragment:Jm,map_particle_fragment:$m,map_particle_pars_fragment:Km,metalnessmap_fragment:Qm,metalnessmap_pars_fragment:jm,morphinstance_vertex:e0,morphcolor_vertex:t0,morphnormal_vertex:n0,morphtarget_pars_vertex:i0,morphtarget_vertex:s0,normal_fragment_begin:r0,normal_fragment_maps:o0,normal_pars_fragment:a0,normal_pars_vertex:c0,normal_vertex:l0,normalmap_pars_fragment:h0,clearcoat_normal_fragment_begin:u0,clearcoat_normal_fragment_maps:d0,clearcoat_pars_fragment:f0,iridescence_pars_fragment:p0,opaque_fragment:m0,packing:g0,premultiplied_alpha_fragment:_0,project_vertex:x0,dithering_fragment:y0,dithering_pars_fragment:v0,roughnessmap_fragment:M0,roughnessmap_pars_fragment:S0,shadowmap_pars_fragment:E0,shadowmap_pars_vertex:b0,shadowmap_vertex:w0,shadowmask_pars_fragment:T0,skinbase_vertex:R0,skinning_pars_vertex:A0,skinning_vertex:C0,skinnormal_vertex:I0,specularmap_fragment:P0,specularmap_pars_fragment:L0,tonemapping_fragment:D0,tonemapping_pars_fragment:U0,transmission_fragment:N0,transmission_pars_fragment:F0,uv_pars_fragment:B0,uv_pars_vertex:O0,uv_vertex:H0,worldpos_vertex:z0,background_vert:k0,background_frag:G0,backgroundCube_vert:V0,backgroundCube_frag:W0,cube_vert:X0,cube_frag:q0,depth_vert:Y0,depth_frag:Z0,distanceRGBA_vert:J0,distanceRGBA_frag:$0,equirect_vert:K0,equirect_frag:Q0,linedashed_vert:j0,linedashed_frag:eg,meshbasic_vert:tg,meshbasic_frag:ng,meshlambert_vert:ig,meshlambert_frag:sg,meshmatcap_vert:rg,meshmatcap_frag:og,meshnormal_vert:ag,meshnormal_frag:cg,meshphong_vert:lg,meshphong_frag:hg,meshphysical_vert:ug,meshphysical_frag:dg,meshtoon_vert:fg,meshtoon_frag:pg,points_vert:mg,points_frag:gg,shadow_vert:_g,shadow_frag:xg,sprite_vert:yg,sprite_frag:vg},xe={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},ai={basic:{uniforms:Yt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:Yt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new We(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:Yt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:Yt([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:Yt([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new We(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:Yt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:Yt([xe.points,xe.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:Yt([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:Yt([xe.common,xe.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:Yt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:Yt([xe.sprite,xe.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:Yt([xe.common,xe.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:Yt([xe.lights,xe.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};ai.physical={uniforms:Yt([ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};var _a={r:0,b:0,g:0},ir=new pi,Mg=new nt;function Sg(i,e,t,n,s,r,o){let a=new We(0),c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(R){let E=R.isScene===!0?R.background:null;return E&&E.isTexture&&(E=(R.backgroundBlurriness>0?t:e).get(E)),E}function _(R){let E=!1,y=g(R);y===null?p(a,c):y&&y.isColor&&(p(y,1),E=!0);let N=i.xr.getEnvironmentBlendMode();N==="additive"?n.buffers.color.setClear(0,0,0,1,o):N==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(R,E){let y=g(E);y&&(y.isCubeTexture||y.mapping===fc)?(h===void 0&&(h=new re(new Ge(1,1,1),new mi({name:"BackgroundCubeMaterial",uniforms:Yr(ai.backgroundCube.uniforms),vertexShader:ai.backgroundCube.vertexShader,fragmentShader:ai.backgroundCube.fragmentShader,side:kt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(N,C,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ir.copy(E.backgroundRotation),ir.x*=-1,ir.y*=-1,ir.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ir.y*=-1,ir.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Mg.makeRotationFromEuler(ir)),h.material.toneMapped=st.getTransfer(y.colorSpace)!==lt,(u!==y||d!==y.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,f=i.toneMapping),h.layers.enableAll(),R.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new re(new gs(2,2),new mi({name:"BackgroundMaterial",uniforms:Yr(ai.background.uniforms),vertexShader:ai.background.vertexShader,fragmentShader:ai.background.fragmentShader,side:ui,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=st.getTransfer(y.colorSpace)!==lt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,f=i.toneMapping),l.layers.enableAll(),R.unshift(l,l.geometry,l.material,0,0,null))}function p(R,E){R.getRGB(_a,Zd(i)),n.buffers.color.setClear(_a.r,_a.g,_a.b,E,o)}return{getClearColor:function(){return a},setClearColor:function(R,E=1){a.set(R),c=E,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(R){c=R,p(a,c)},render:_,addToRenderList:m}}function Eg(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(v,A,z,F,k){let Y=!1,O=u(F,z,A);r!==O&&(r=O,l(r.object)),Y=f(v,F,z,k),Y&&g(v,F,z,k),k!==null&&e.update(k,i.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,y(v,A,z,F),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return i.createVertexArray()}function l(v){return i.bindVertexArray(v)}function h(v){return i.deleteVertexArray(v)}function u(v,A,z){let F=z.wireframe===!0,k=n[v.id];k===void 0&&(k={},n[v.id]=k);let Y=k[A.id];Y===void 0&&(Y={},k[A.id]=Y);let O=Y[F];return O===void 0&&(O=d(c()),Y[F]=O),O}function d(v){let A=[],z=[],F=[];for(let k=0;k<t;k++)A[k]=0,z[k]=0,F[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:z,attributeDivisors:F,object:v,attributes:{},index:null}}function f(v,A,z,F){let k=r.attributes,Y=A.attributes,O=0,Q=z.getAttributes();for(let W in Q)if(Q[W].location>=0){let ue=k[W],ye=Y[W];if(ye===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(ye=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(ye=v.instanceColor)),ue===void 0||ue.attribute!==ye||ye&&ue.data!==ye.data)return!0;O++}return r.attributesNum!==O||r.index!==F}function g(v,A,z,F){let k={},Y=A.attributes,O=0,Q=z.getAttributes();for(let W in Q)if(Q[W].location>=0){let ue=Y[W];ue===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(ue=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(ue=v.instanceColor));let ye={};ye.attribute=ue,ue&&ue.data&&(ye.data=ue.data),k[W]=ye,O++}r.attributes=k,r.attributesNum=O,r.index=F}function _(){let v=r.newAttributes;for(let A=0,z=v.length;A<z;A++)v[A]=0}function m(v){p(v,0)}function p(v,A){let z=r.newAttributes,F=r.enabledAttributes,k=r.attributeDivisors;z[v]=1,F[v]===0&&(i.enableVertexAttribArray(v),F[v]=1),k[v]!==A&&(i.vertexAttribDivisor(v,A),k[v]=A)}function R(){let v=r.newAttributes,A=r.enabledAttributes;for(let z=0,F=A.length;z<F;z++)A[z]!==v[z]&&(i.disableVertexAttribArray(z),A[z]=0)}function E(v,A,z,F,k,Y,O){O===!0?i.vertexAttribIPointer(v,A,z,k,Y):i.vertexAttribPointer(v,A,z,F,k,Y)}function y(v,A,z,F){_();let k=F.attributes,Y=z.getAttributes(),O=A.defaultAttributeValues;for(let Q in Y){let W=Y[Q];if(W.location>=0){let oe=k[Q];if(oe===void 0&&(Q==="instanceMatrix"&&v.instanceMatrix&&(oe=v.instanceMatrix),Q==="instanceColor"&&v.instanceColor&&(oe=v.instanceColor)),oe!==void 0){let ue=oe.normalized,ye=oe.itemSize,Xe=e.get(oe);if(Xe===void 0)continue;let Je=Xe.buffer,X=Xe.type,ee=Xe.bytesPerElement,we=X===i.INT||X===i.UNSIGNED_INT||oe.gpuType===Rh;if(oe.isInterleavedBufferAttribute){let se=oe.data,Ie=se.stride,Be=oe.offset;if(se.isInstancedInterleavedBuffer){for(let ze=0;ze<W.locationSize;ze++)p(W.location+ze,se.meshPerAttribute);v.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ze=0;ze<W.locationSize;ze++)m(W.location+ze);i.bindBuffer(i.ARRAY_BUFFER,Je);for(let ze=0;ze<W.locationSize;ze++)E(W.location+ze,ye/W.locationSize,X,ue,Ie*ee,(Be+ye/W.locationSize*ze)*ee,we)}else{if(oe.isInstancedBufferAttribute){for(let se=0;se<W.locationSize;se++)p(W.location+se,oe.meshPerAttribute);v.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let se=0;se<W.locationSize;se++)m(W.location+se);i.bindBuffer(i.ARRAY_BUFFER,Je);for(let se=0;se<W.locationSize;se++)E(W.location+se,ye/W.locationSize,X,ue,ye*ee,ye/W.locationSize*se*ee,we)}}else if(O!==void 0){let ue=O[Q];if(ue!==void 0)switch(ue.length){case 2:i.vertexAttrib2fv(W.location,ue);break;case 3:i.vertexAttrib3fv(W.location,ue);break;case 4:i.vertexAttrib4fv(W.location,ue);break;default:i.vertexAttrib1fv(W.location,ue)}}}}R()}function N(){P();for(let v in n){let A=n[v];for(let z in A){let F=A[z];for(let k in F)h(F[k].object),delete F[k];delete A[z]}delete n[v]}}function C(v){if(n[v.id]===void 0)return;let A=n[v.id];for(let z in A){let F=A[z];for(let k in F)h(F[k].object),delete F[k];delete A[z]}delete n[v.id]}function I(v){for(let A in n){let z=n[A];if(z[v.id]===void 0)continue;let F=z[v.id];for(let k in F)h(F[k].object),delete F[k];delete z[v.id]}}function P(){S(),o=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:S,dispose:N,releaseStatesOfGeometry:C,releaseStatesOfProgram:I,initAttributes:_,enableAttribute:m,disableUnusedAttributes:R}}function bg(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function c(l,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function wg(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(I){return!(I!==An&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){let P=I===Vo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==ts&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==li&&!P)}function c(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),R=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),N=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:R,maxVaryings:E,maxFragmentUniforms:y,vertexTextures:N,maxSamples:C}}function Tg(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Ki,a=new Ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let R=r?0:n,E=R*4,y=p.clippingState||null;c.value=y,y=h(g,d,E,f);for(let N=0;N!==E;++N)y[N]=t[N];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=R}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=f+_*4,R=d.matrixWorldInverse;a.getNormalMatrix(R),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,y=f;E!==_;++E,y+=4)o.copy(u[E]).applyMatrix4(R,a),o.normal.toArray(m,y),m[y+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Rg(i){let e=new WeakMap;function t(o,a){return a===dl?o.mapping=Vr:a===fl&&(o.mapping=Wr),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===dl||a===fl)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Zl(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Va=class extends ka{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Br=4,Ju=[.125,.215,.35,.446,.526,.582],ar=20,Xc=new Va,$u=new We,qc=null,Yc=0,Zc=0,Jc=!1,rr=(1+Math.sqrt(5))/2,Pr=1/rr,Ku=[new w(-rr,Pr,0),new w(rr,Pr,0),new w(-Pr,0,rr),new w(Pr,0,rr),new w(0,rr,-Pr),new w(0,rr,Pr),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],ur=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){qc=this._renderer.getRenderTarget(),Yc=this._renderer.getActiveCubeFace(),Zc=this._renderer.getActiveMipmapLevel(),Jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ed(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ju(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(qc,Yc,Zc),this._renderer.xr.enabled=Jc,e.scissorTest=!1,xa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Vr||e.mapping===Wr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),qc=this._renderer.getRenderTarget(),Yc=this._renderer.getActiveCubeFace(),Zc=this._renderer.getActiveMipmapLevel(),Jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ci,minFilter:ci,generateMipmaps:!1,type:Vo,format:An,colorSpace:jr,depthBuffer:!1},s=Qu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Qu(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ag(r)),this._blurMaterial=Cg(r,e,t)}return s}_compileMaterial(e){let t=new re(this._lodPlanes[0],e);this._renderer.compile(t,Xc)}_sceneToCubeUV(e,t,n,s){let a=new zt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor($u),h.toneMapping=ps,h.autoClear=!1;let f=new Cn({name:"PMREM.Background",side:kt,depthWrite:!1,depthTest:!1}),g=new re(new Ge,f),_=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy($u),_=!0);for(let p=0;p<6;p++){let R=p%3;R===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):R===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let E=this._cubeSize;xa(s,R*E,p>2?E:0,E,E),h.setRenderTarget(s),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Vr||e.mapping===Wr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ed()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ju());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new re(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;xa(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Xc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Ku[(s-r-1)%Ku.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new re(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ar-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):ar;m>ar&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ar}`);let p=[],R=0;for(let I=0;I<ar;++I){let P=I/_,S=Math.exp(-P*P/2);p.push(S),I===0?R+=S:I<m&&(R+=2*S)}for(let I=0;I<p.length;I++)p[I]=p[I]/R;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:E}=this;d.dTheta.value=g,d.mipInt.value=E-n;let y=this._sizeLods[s],N=3*y*(s>E-Br?s-E+Br:0),C=4*(this._cubeSize-y);xa(t,N,C,3*y,2*y),c.setRenderTarget(t),c.render(u,Xc)}};function Ag(i){let e=[],t=[],n=[],s=i,r=i-Br+1+Ju.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let c=1/a;o>i-Br?c=Ju[o-i+Br-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,R=new Float32Array(_*g*f),E=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let C=0;C<f;C++){let I=C%3*2/3-1,P=C>2?0:-1,S=[I,P,0,I+2/3,P,0,I+2/3,P+1,0,I,P,0,I+2/3,P+1,0,I,P+1,0];R.set(S,_*g*C),E.set(d,m*g*C);let v=[C,C,C,C,C,C];y.set(v,p*g*C)}let N=new Jt;N.setAttribute("position",new Nt(R,_)),N.setAttribute("uv",new Nt(E,m)),N.setAttribute("faceIndex",new Nt(y,p)),e.push(N),s>Br&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Qu(i,e,t){let n=new ns(i,e,t);return n.texture.mapping=fc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function xa(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Cg(i,e,t){let n=new Float32Array(ar),s=new w(0,1,0);return new mi({name:"SphericalGaussianBlur",defines:{n:ar,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Nh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ds,depthTest:!1,depthWrite:!1})}function ju(){return new mi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ds,depthTest:!1,depthWrite:!1})}function ed(){return new mi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ds,depthTest:!1,depthWrite:!1})}function Nh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ig(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===dl||c===fl,h=c===Vr||c===Wr;if(l||h){let u=e.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new ur(i)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return l&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new ur(i)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Pg(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&vo("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Lg(i,e,t,n){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);for(let g in d.morphAttributes){let _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let g in d)e.update(d[g],i.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],i.ARRAY_BUFFER)}}function l(u){let d=[],f=u.index,g=u.attributes.position,_=0;if(f!==null){let R=f.array;_=f.version;for(let E=0,y=R.length;E<y;E+=3){let N=R[E+0],C=R[E+1],I=R[E+2];d.push(N,C,C,I,I,N)}}else if(g!==void 0){let R=g.array;_=g.version;for(let E=0,y=R.length/3-1;E<y;E+=3){let N=E+0,C=E+1,I=E+2;d.push(N,C,C,I,I,N)}}else return;let m=new(qd(d)?za:Ha)(d,1);m.version=_;let p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Dg(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*o),t.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,_){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let R=0;R<g;R++)p+=f[R]*_[R];t.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Ug(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Ng(i,e,t){let n=new WeakMap,s=new ht;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let S=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],R=a.morphAttributes.color||[],E=0;f===!0&&(E=1),g===!0&&(E=2),_===!0&&(E=3);let y=a.attributes.position.count*E,N=1;y>e.maxTextureSize&&(N=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let C=new Float32Array(y*N*4*u),I=new Ba(C,y,N,u);I.type=li,I.needsUpdate=!0;let P=E*4;for(let v=0;v<u;v++){let A=m[v],z=p[v],F=R[v],k=y*N*4*v;for(let Y=0;Y<A.count;Y++){let O=Y*P;f===!0&&(s.fromBufferAttribute(A,Y),C[k+O+0]=s.x,C[k+O+1]=s.y,C[k+O+2]=s.z,C[k+O+3]=0),g===!0&&(s.fromBufferAttribute(z,Y),C[k+O+4]=s.x,C[k+O+5]=s.y,C[k+O+6]=s.z,C[k+O+7]=0),_===!0&&(s.fromBufferAttribute(F,Y),C[k+O+8]=s.x,C[k+O+9]=s.y,C[k+O+10]=s.z,C[k+O+11]=F.itemSize===4?s.w:1)}}d={count:u,texture:I,size:new le(y,N)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Fg(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var Wa=class extends Zt{constructor(e,t,n,s,r,o,a,c,l,h=Hr){if(h!==Hr&&h!==qr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Hr&&(n=lr),n===void 0&&h===qr&&(n=Xr),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:cn,this.minFilter=c!==void 0?c:cn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},$d=new Zt,td=new Wa(1,1),Kd=new Ba,Qd=new Xl,jd=new Ga,nd=[],id=[],sd=new Float32Array(16),rd=new Float32Array(9),od=new Float32Array(4);function eo(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=nd[s];if(r===void 0&&(r=new Float32Array(s),nd[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Rt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function At(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function mc(i,e){let t=id[e];t===void 0&&(t=new Int32Array(e),id[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Bg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Og(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2fv(this.addr,e),At(t,e)}}function Hg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;i.uniform3fv(this.addr,e),At(t,e)}}function zg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4fv(this.addr,e),At(t,e)}}function kg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),At(t,e)}else{if(Rt(t,n))return;od.set(n),i.uniformMatrix2fv(this.addr,!1,od),At(t,n)}}function Gg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),At(t,e)}else{if(Rt(t,n))return;rd.set(n),i.uniformMatrix3fv(this.addr,!1,rd),At(t,n)}}function Vg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),At(t,e)}else{if(Rt(t,n))return;sd.set(n),i.uniformMatrix4fv(this.addr,!1,sd),At(t,n)}}function Wg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Xg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2iv(this.addr,e),At(t,e)}}function qg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3iv(this.addr,e),At(t,e)}}function Yg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4iv(this.addr,e),At(t,e)}}function Zg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Jg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2uiv(this.addr,e),At(t,e)}}function $g(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3uiv(this.addr,e),At(t,e)}}function Kg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4uiv(this.addr,e),At(t,e)}}function Qg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(td.compareFunction=Xd,r=td):r=$d,t.setTexture2D(e||r,s)}function jg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Qd,s)}function e_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||jd,s)}function t_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Kd,s)}function n_(i){switch(i){case 5126:return Bg;case 35664:return Og;case 35665:return Hg;case 35666:return zg;case 35674:return kg;case 35675:return Gg;case 35676:return Vg;case 5124:case 35670:return Wg;case 35667:case 35671:return Xg;case 35668:case 35672:return qg;case 35669:case 35673:return Yg;case 5125:return Zg;case 36294:return Jg;case 36295:return $g;case 36296:return Kg;case 35678:case 36198:case 36298:case 36306:case 35682:return Qg;case 35679:case 36299:case 36307:return jg;case 35680:case 36300:case 36308:case 36293:return e_;case 36289:case 36303:case 36311:case 36292:return t_}}function i_(i,e){i.uniform1fv(this.addr,e)}function s_(i,e){let t=eo(e,this.size,2);i.uniform2fv(this.addr,t)}function r_(i,e){let t=eo(e,this.size,3);i.uniform3fv(this.addr,t)}function o_(i,e){let t=eo(e,this.size,4);i.uniform4fv(this.addr,t)}function a_(i,e){let t=eo(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function c_(i,e){let t=eo(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function l_(i,e){let t=eo(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function h_(i,e){i.uniform1iv(this.addr,e)}function u_(i,e){i.uniform2iv(this.addr,e)}function d_(i,e){i.uniform3iv(this.addr,e)}function f_(i,e){i.uniform4iv(this.addr,e)}function p_(i,e){i.uniform1uiv(this.addr,e)}function m_(i,e){i.uniform2uiv(this.addr,e)}function g_(i,e){i.uniform3uiv(this.addr,e)}function __(i,e){i.uniform4uiv(this.addr,e)}function x_(i,e,t){let n=this.cache,s=e.length,r=mc(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||$d,r[o])}function y_(i,e,t){let n=this.cache,s=e.length,r=mc(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Qd,r[o])}function v_(i,e,t){let n=this.cache,s=e.length,r=mc(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||jd,r[o])}function M_(i,e,t){let n=this.cache,s=e.length,r=mc(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Kd,r[o])}function S_(i){switch(i){case 5126:return i_;case 35664:return s_;case 35665:return r_;case 35666:return o_;case 35674:return a_;case 35675:return c_;case 35676:return l_;case 5124:case 35670:return h_;case 35667:case 35671:return u_;case 35668:case 35672:return d_;case 35669:case 35673:return f_;case 5125:return p_;case 36294:return m_;case 36295:return g_;case 36296:return __;case 35678:case 36198:case 36298:case 36306:case 35682:return x_;case 35679:case 36299:case 36307:return y_;case 35680:case 36300:case 36308:case 36293:return v_;case 36289:case 36303:case 36311:case 36292:return M_}}var Jl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=n_(t.type)}},$l=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=S_(t.type)}},Kl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},$c=/(\w+)(\])?(\[|\.)?/g;function ad(i,e){i.seq.push(e),i.map[e.id]=e}function E_(i,e,t){let n=i.name,s=n.length;for($c.lastIndex=0;;){let r=$c.exec(n),o=$c.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){ad(t,l===void 0?new Jl(a,i,e):new $l(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Kl(a),ad(t,u)),t=u}}}var kr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);E_(r,o,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function cd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var b_=37297,w_=0;function T_(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var ld=new Ze;function R_(i){st._getMatrix(ld,st.workingColorSpace,i);let e=`mat3( ${ld.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(i)){case pc:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function hd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+T_(i.getShaderSource(e),o)}else return s}function A_(i,e){let t=R_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function C_(i,e){let t;switch(e){case zf:t="Linear";break;case kf:t="Reinhard";break;case Gf:t="Cineon";break;case dc:t="ACESFilmic";break;case Wf:t="AgX";break;case Xf:t="Neutral";break;case Vf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ya=new w;function I_(){st.getLuminanceCoefficients(ya);let i=ya.x.toFixed(4),e=ya.y.toFixed(4),t=ya.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function P_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Mo).join(`
`)}function L_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function D_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Mo(i){return i!==""}function ud(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function dd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var U_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ql(i){return i.replace(U_,F_)}var N_=new Map;function F_(i,e){let t=je[e];if(t===void 0){let n=N_.get(e);if(n!==void 0)t=je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ql(t)}var B_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fd(i){return i.replace(B_,O_)}function O_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function pd(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function H_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ld?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Th?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===$i&&(e="SHADOWMAP_TYPE_VSM"),e}function z_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Vr:case Wr:e="ENVMAP_TYPE_CUBE";break;case fc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function k_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Wr:e="ENVMAP_MODE_REFRACTION";break}return e}function G_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Dd:e="ENVMAP_BLENDING_MULTIPLY";break;case Of:e="ENVMAP_BLENDING_MIX";break;case Hf:e="ENVMAP_BLENDING_ADD";break}return e}function V_(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function W_(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=H_(t),l=z_(t),h=k_(t),u=G_(t),d=V_(t),f=P_(t),g=L_(r),_=s.createProgram(),m,p,R=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Mo).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Mo).join(`
`),p.length>0&&(p+=`
`)):(m=[pd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Mo).join(`
`),p=[pd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ps?"#define TONE_MAPPING":"",t.toneMapping!==ps?je.tonemapping_pars_fragment:"",t.toneMapping!==ps?C_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,A_("linearToOutputTexel",t.outputColorSpace),I_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Mo).join(`
`)),o=Ql(o),o=ud(o,t),o=dd(o,t),a=Ql(a),a=ud(a,t),a=dd(a,t),o=fd(o),a=fd(a),t.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Ru?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ru?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let E=R+m+o,y=R+p+a,N=cd(s,s.VERTEX_SHADER,E),C=cd(s,s.FRAGMENT_SHADER,y);s.attachShader(_,N),s.attachShader(_,C),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function I(A){if(i.debug.checkShaderErrors){let z=s.getProgramInfoLog(_).trim(),F=s.getShaderInfoLog(N).trim(),k=s.getShaderInfoLog(C).trim(),Y=!0,O=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,N,C);else{let Q=hd(s,N,"vertex"),W=hd(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+z+`
`+Q+`
`+W)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(F===""||k==="")&&(O=!1);O&&(A.diagnostics={runnable:Y,programLog:z,vertexShader:{log:F,prefix:m},fragmentShader:{log:k,prefix:p}})}s.deleteShader(N),s.deleteShader(C),P=new kr(s,_),S=D_(s,_)}let P;this.getUniforms=function(){return P===void 0&&I(this),P};let S;this.getAttributes=function(){return S===void 0&&I(this),S};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(_,b_)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=w_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=N,this.fragmentShader=C,this}var X_=0,jl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new eh(e),t.set(e,n)),n}},eh=class{constructor(e){this.id=X_++,this.code=e,this.usedTimes=0}};function q_(i,e,t,n,s,r,o){let a=new Oa,c=new jl,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,v,A,z,F){let k=z.fog,Y=F.geometry,O=S.isMeshStandardMaterial?z.environment:null,Q=(S.isMeshStandardMaterial?t:e).get(S.envMap||O),W=Q&&Q.mapping===fc?Q.image.height:null,oe=g[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let ue=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ye=ue!==void 0?ue.length:0,Xe=0;Y.morphAttributes.position!==void 0&&(Xe=1),Y.morphAttributes.normal!==void 0&&(Xe=2),Y.morphAttributes.color!==void 0&&(Xe=3);let Je,X,ee,we;if(oe){let $e=ai[oe];Je=$e.vertexShader,X=$e.fragmentShader}else Je=S.vertexShader,X=S.fragmentShader,c.update(S),ee=c.getVertexShaderID(S),we=c.getFragmentShaderID(S);let se=i.getRenderTarget(),Ie=i.state.buffers.depth.getReversed(),Be=F.isInstancedMesh===!0,ze=F.isBatchedMesh===!0,Ye=!!S.map,J=!!S.matcap,ne=!!Q,T=!!S.aoMap,Ae=!!S.lightMap,j=!!S.bumpMap,_e=!!S.normalMap,he=!!S.displacementMap,Ne=!!S.emissiveMap,fe=!!S.metalnessMap,b=!!S.roughnessMap,x=S.anisotropy>0,B=S.clearcoat>0,q=S.dispersion>0,$=S.iridescence>0,Z=S.sheen>0,Te=S.transmission>0,ae=x&&!!S.anisotropyMap,me=B&&!!S.clearcoatMap,et=B&&!!S.clearcoatNormalMap,te=B&&!!S.clearcoatRoughnessMap,ve=$&&!!S.iridescenceMap,De=$&&!!S.iridescenceThicknessMap,Ve=Z&&!!S.sheenColorMap,Se=Z&&!!S.sheenRoughnessMap,qe=!!S.specularMap,ke=!!S.specularColorMap,ot=!!S.specularIntensityMap,L=Te&&!!S.transmissionMap,ce=Te&&!!S.thicknessMap,V=!!S.gradientMap,K=!!S.alphaMap,pe=S.alphaTest>0,de=!!S.alphaHash,Oe=!!S.extensions,ft=ps;S.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(ft=i.toneMapping);let pt={shaderID:oe,shaderType:S.type,shaderName:S.name,vertexShader:Je,fragmentShader:X,defines:S.defines,customVertexShaderID:ee,customFragmentShaderID:we,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:ze,batchingColor:ze&&F._colorsTexture!==null,instancing:Be,instancingColor:Be&&F.instanceColor!==null,instancingMorph:Be&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:se===null?i.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:jr,alphaToCoverage:!!S.alphaToCoverage,map:Ye,matcap:J,envMap:ne,envMapMode:ne&&Q.mapping,envMapCubeUVHeight:W,aoMap:T,lightMap:Ae,bumpMap:j,normalMap:_e,displacementMap:d&&he,emissiveMap:Ne,normalMapObjectSpace:_e&&S.normalMapType===Jf,normalMapTangentSpace:_e&&S.normalMapType===Wd,metalnessMap:fe,roughnessMap:b,anisotropy:x,anisotropyMap:ae,clearcoat:B,clearcoatMap:me,clearcoatNormalMap:et,clearcoatRoughnessMap:te,dispersion:q,iridescence:$,iridescenceMap:ve,iridescenceThicknessMap:De,sheen:Z,sheenColorMap:Ve,sheenRoughnessMap:Se,specularMap:qe,specularColorMap:ke,specularIntensityMap:ot,transmission:Te,transmissionMap:L,thicknessMap:ce,gradientMap:V,opaque:S.transparent===!1&&S.blending===fs&&S.alphaToCoverage===!1,alphaMap:K,alphaTest:pe,alphaHash:de,combine:S.combine,mapUv:Ye&&_(S.map.channel),aoMapUv:T&&_(S.aoMap.channel),lightMapUv:Ae&&_(S.lightMap.channel),bumpMapUv:j&&_(S.bumpMap.channel),normalMapUv:_e&&_(S.normalMap.channel),displacementMapUv:he&&_(S.displacementMap.channel),emissiveMapUv:Ne&&_(S.emissiveMap.channel),metalnessMapUv:fe&&_(S.metalnessMap.channel),roughnessMapUv:b&&_(S.roughnessMap.channel),anisotropyMapUv:ae&&_(S.anisotropyMap.channel),clearcoatMapUv:me&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:et&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:De&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Se&&_(S.sheenRoughnessMap.channel),specularMapUv:qe&&_(S.specularMap.channel),specularColorMapUv:ke&&_(S.specularColorMap.channel),specularIntensityMapUv:ot&&_(S.specularIntensityMap.channel),transmissionMapUv:L&&_(S.transmissionMap.channel),thicknessMapUv:ce&&_(S.thicknessMap.channel),alphaMapUv:K&&_(S.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(_e||x),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Y.attributes.uv&&(Ye||K),fog:!!k,useFog:S.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ie,skinning:F.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Xe,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:ft,decodeVideoTexture:Ye&&S.map.isVideoTexture===!0&&st.getTransfer(S.map.colorSpace)===lt,decodeVideoTextureEmissive:Ne&&S.emissiveMap.isVideoTexture===!0&&st.getTransfer(S.emissiveMap.colorSpace)===lt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Tn,flipSided:S.side===kt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Oe&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Oe&&S.extensions.multiDraw===!0||ze)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return pt.vertexUv1s=l.has(1),pt.vertexUv2s=l.has(2),pt.vertexUv3s=l.has(3),l.clear(),pt}function p(S){let v=[];if(S.shaderID?v.push(S.shaderID):(v.push(S.customVertexShaderID),v.push(S.customFragmentShaderID)),S.defines!==void 0)for(let A in S.defines)v.push(A),v.push(S.defines[A]);return S.isRawShaderMaterial===!1&&(R(v,S),E(v,S),v.push(i.outputColorSpace)),v.push(S.customProgramCacheKey),v.join()}function R(S,v){S.push(v.precision),S.push(v.outputColorSpace),S.push(v.envMapMode),S.push(v.envMapCubeUVHeight),S.push(v.mapUv),S.push(v.alphaMapUv),S.push(v.lightMapUv),S.push(v.aoMapUv),S.push(v.bumpMapUv),S.push(v.normalMapUv),S.push(v.displacementMapUv),S.push(v.emissiveMapUv),S.push(v.metalnessMapUv),S.push(v.roughnessMapUv),S.push(v.anisotropyMapUv),S.push(v.clearcoatMapUv),S.push(v.clearcoatNormalMapUv),S.push(v.clearcoatRoughnessMapUv),S.push(v.iridescenceMapUv),S.push(v.iridescenceThicknessMapUv),S.push(v.sheenColorMapUv),S.push(v.sheenRoughnessMapUv),S.push(v.specularMapUv),S.push(v.specularColorMapUv),S.push(v.specularIntensityMapUv),S.push(v.transmissionMapUv),S.push(v.thicknessMapUv),S.push(v.combine),S.push(v.fogExp2),S.push(v.sizeAttenuation),S.push(v.morphTargetsCount),S.push(v.morphAttributeCount),S.push(v.numDirLights),S.push(v.numPointLights),S.push(v.numSpotLights),S.push(v.numSpotLightMaps),S.push(v.numHemiLights),S.push(v.numRectAreaLights),S.push(v.numDirLightShadows),S.push(v.numPointLightShadows),S.push(v.numSpotLightShadows),S.push(v.numSpotLightShadowsWithMaps),S.push(v.numLightProbes),S.push(v.shadowMapType),S.push(v.toneMapping),S.push(v.numClippingPlanes),S.push(v.numClipIntersection),S.push(v.depthPacking)}function E(S,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),S.push(a.mask)}function y(S){let v=g[S.type],A;if(v){let z=ai[v];A=Fp.clone(z.uniforms)}else A=S.uniforms;return A}function N(S,v){let A;for(let z=0,F=h.length;z<F;z++){let k=h[z];if(k.cacheKey===v){A=k,++A.usedTimes;break}}return A===void 0&&(A=new W_(i,v,S,r),h.push(A)),A}function C(S){if(--S.usedTimes===0){let v=h.indexOf(S);h[v]=h[h.length-1],h.pop(),S.destroy()}}function I(S){c.remove(S)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:N,releaseProgram:C,releaseShaderCache:I,programs:h,dispose:P}}function Y_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Z_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function md(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function gd(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,d,f,g,_,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function a(u,d,f,g,_,m){let p=o(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(u,d,f,g,_,m){let p=o(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||Z_),n.length>1&&n.sort(d||md),s.length>1&&s.sort(d||md)}function h(){for(let u=e,d=i.length;u<d;u++){let f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function J_(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new gd,i.set(n,[o])):s>=r.length?(o=new gd,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function $_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new We};break;case"SpotLight":t={position:new w,direction:new w,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new w,halfWidth:new w,halfHeight:new w};break}return i[e.id]=t,t}}}function K_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Q_=0;function j_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function ex(i){let e=new $_,t=K_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new w);let s=new w,r=new nt,o=new nt;function a(l){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,R=0,E=0,y=0,N=0,C=0,I=0;l.sort(j_);for(let S=0,v=l.length;S<v;S++){let A=l[S],z=A.color,F=A.intensity,k=A.distance,Y=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)h+=z.r*F,u+=z.g*F,d+=z.b*F;else if(A.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(A.sh.coefficients[O],F);I++}else if(A.isDirectionalLight){let O=e.get(A);if(O.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let Q=A.shadow,W=t.get(A);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=Y,n.directionalShadowMatrix[f]=A.shadow.matrix,R++}n.directional[f]=O,f++}else if(A.isSpotLight){let O=e.get(A);O.position.setFromMatrixPosition(A.matrixWorld),O.color.copy(z).multiplyScalar(F),O.distance=k,O.coneCos=Math.cos(A.angle),O.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),O.decay=A.decay,n.spot[_]=O;let Q=A.shadow;if(A.map&&(n.spotLightMap[N]=A.map,N++,Q.updateMatrices(A),A.castShadow&&C++),n.spotLightMatrix[_]=Q.matrix,A.castShadow){let W=t.get(A);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=Y,y++}_++}else if(A.isRectAreaLight){let O=e.get(A);O.color.copy(z).multiplyScalar(F),O.halfWidth.set(A.width*.5,0,0),O.halfHeight.set(0,A.height*.5,0),n.rectArea[m]=O,m++}else if(A.isPointLight){let O=e.get(A);if(O.color.copy(A.color).multiplyScalar(A.intensity),O.distance=A.distance,O.decay=A.decay,A.castShadow){let Q=A.shadow,W=t.get(A);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,W.shadowCameraNear=Q.camera.near,W.shadowCameraFar=Q.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=A.shadow.matrix,E++}n.point[g]=O,g++}else if(A.isHemisphereLight){let O=e.get(A);O.skyColor.copy(A.color).multiplyScalar(F),O.groundColor.copy(A.groundColor).multiplyScalar(F),n.hemi[p]=O,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xe.LTC_FLOAT_1,n.rectAreaLTC2=xe.LTC_FLOAT_2):(n.rectAreaLTC1=xe.LTC_HALF_1,n.rectAreaLTC2=xe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let P=n.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==R||P.numPointShadows!==E||P.numSpotShadows!==y||P.numSpotMaps!==N||P.numLightProbes!==I)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=R,n.directionalShadowMap.length=R,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=R,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=y+N-C,n.spotLightMap.length=N,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=I,P.directionalLength=f,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=R,P.numPointShadows=E,P.numSpotShadows=y,P.numSpotMaps=N,P.numLightProbes=I,n.version=Q_++)}function c(l,h){let u=0,d=0,f=0,g=0,_=0,m=h.matrixWorldInverse;for(let p=0,R=l.length;p<R;p++){let E=l[p];if(E.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(E.isSpotLight){let y=n.spot[f];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(E.isRectAreaLight){let y=n.rectArea[g];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(E.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(E.width*.5,0,0),y.halfHeight.set(0,E.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){let y=n.point[d];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),d++}else if(E.isHemisphereLight){let y=n.hemi[_];y.direction.setFromMatrixPosition(E.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function _d(i){let e=new ex(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function tx(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new _d(i),e.set(s,[a])):r>=o.length?(a=new _d(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var th=class extends is{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Yf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},nh=class extends is{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},nx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ix=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function sx(i,e,t){let n=new Po,s=new le,r=new le,o=new ht,a=new th({depthPacking:Zf}),c=new nh,l={},h=t.maxTextureSize,u={[ui]:kt,[kt]:ui,[Tn]:Tn},d=new mi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new le},radius:{value:4}},vertexShader:nx,fragmentShader:ix}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Jt;g.setAttribute("position",new Nt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new re(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ld;let p=this.type;this.render=function(C,I,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let S=i.getRenderTarget(),v=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),z=i.state;z.setBlending(ds),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let F=p!==$i&&this.type===$i,k=p===$i&&this.type!==$i;for(let Y=0,O=C.length;Y<O;Y++){let Q=C[Y],W=Q.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let oe=W.getFrameExtents();if(s.multiply(oe),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/oe.x),s.x=r.x*oe.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/oe.y),s.y=r.y*oe.y,W.mapSize.y=r.y)),W.map===null||F===!0||k===!0){let ye=this.type!==$i?{minFilter:cn,magFilter:cn}:{};W.map!==null&&W.map.dispose(),W.map=new ns(s.x,s.y,ye),W.map.texture.name=Q.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();let ue=W.getViewportCount();for(let ye=0;ye<ue;ye++){let Xe=W.getViewport(ye);o.set(r.x*Xe.x,r.y*Xe.y,r.x*Xe.z,r.y*Xe.w),z.viewport(o),W.updateMatrices(Q,ye),n=W.getFrustum(),y(I,P,W.camera,Q,this.type)}W.isPointLightShadow!==!0&&this.type===$i&&R(W,P),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,v,A)};function R(C,I){let P=e.update(_);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new ns(s.x,s.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(I,null,P,d,_,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(I,null,P,f,_,null)}function E(C,I,P,S){let v=null,A=P.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(A!==void 0)v=A;else if(v=P.isPointLight===!0?c:a,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0){let z=v.uuid,F=I.uuid,k=l[z];k===void 0&&(k={},l[z]=k);let Y=k[F];Y===void 0&&(Y=v.clone(),k[F]=Y,I.addEventListener("dispose",N)),v=Y}if(v.visible=I.visible,v.wireframe=I.wireframe,S===$i?v.side=I.shadowSide!==null?I.shadowSide:I.side:v.side=I.shadowSide!==null?I.shadowSide:u[I.side],v.alphaMap=I.alphaMap,v.alphaTest=I.alphaTest,v.map=I.map,v.clipShadows=I.clipShadows,v.clippingPlanes=I.clippingPlanes,v.clipIntersection=I.clipIntersection,v.displacementMap=I.displacementMap,v.displacementScale=I.displacementScale,v.displacementBias=I.displacementBias,v.wireframeLinewidth=I.wireframeLinewidth,v.linewidth=I.linewidth,P.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let z=i.properties.get(v);z.light=P}return v}function y(C,I,P,S,v){if(C.visible===!1)return;if(C.layers.test(I.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&v===$i)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,C.matrixWorld);let F=e.update(C),k=C.material;if(Array.isArray(k)){let Y=F.groups;for(let O=0,Q=Y.length;O<Q;O++){let W=Y[O],oe=k[W.materialIndex];if(oe&&oe.visible){let ue=E(C,oe,S,v);C.onBeforeShadow(i,C,I,P,F,ue,W),i.renderBufferDirect(P,null,F,ue,C,W),C.onAfterShadow(i,C,I,P,F,ue,W)}}}else if(k.visible){let Y=E(C,k,S,v);C.onBeforeShadow(i,C,I,P,F,Y,null),i.renderBufferDirect(P,null,F,Y,C,null),C.onAfterShadow(i,C,I,P,F,Y,null)}}let z=C.children;for(let F=0,k=z.length;F<k;F++)y(z[F],I,P,S,v)}function N(C){C.target.removeEventListener("dispose",N);for(let P in l){let S=l[P],v=C.target.uuid;v in S&&(S[v].dispose(),delete S[v])}}}var rx={[rl]:ol,[al]:hl,[cl]:ul,[Gr]:ll,[ol]:rl,[hl]:al,[ul]:cl,[ll]:Gr};function ox(i,e){function t(){let L=!1,ce=new ht,V=null,K=new ht(0,0,0,0);return{setMask:function(pe){V!==pe&&!L&&(i.colorMask(pe,pe,pe,pe),V=pe)},setLocked:function(pe){L=pe},setClear:function(pe,de,Oe,ft,pt){pt===!0&&(pe*=ft,de*=ft,Oe*=ft),ce.set(pe,de,Oe,ft),K.equals(ce)===!1&&(i.clearColor(pe,de,Oe,ft),K.copy(ce))},reset:function(){L=!1,V=null,K.set(-1,0,0,0)}}}function n(){let L=!1,ce=!1,V=null,K=null,pe=null;return{setReversed:function(de){if(ce!==de){let Oe=e.get("EXT_clip_control");ce?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT);let ft=pe;pe=null,this.setClear(ft)}ce=de},getReversed:function(){return ce},setTest:function(de){de?se(i.DEPTH_TEST):Ie(i.DEPTH_TEST)},setMask:function(de){V!==de&&!L&&(i.depthMask(de),V=de)},setFunc:function(de){if(ce&&(de=rx[de]),K!==de){switch(de){case rl:i.depthFunc(i.NEVER);break;case ol:i.depthFunc(i.ALWAYS);break;case al:i.depthFunc(i.LESS);break;case Gr:i.depthFunc(i.LEQUAL);break;case cl:i.depthFunc(i.EQUAL);break;case ll:i.depthFunc(i.GEQUAL);break;case hl:i.depthFunc(i.GREATER);break;case ul:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}K=de}},setLocked:function(de){L=de},setClear:function(de){pe!==de&&(ce&&(de=1-de),i.clearDepth(de),pe=de)},reset:function(){L=!1,V=null,K=null,pe=null,ce=!1}}}function s(){let L=!1,ce=null,V=null,K=null,pe=null,de=null,Oe=null,ft=null,pt=null;return{setTest:function($e){L||($e?se(i.STENCIL_TEST):Ie(i.STENCIL_TEST))},setMask:function($e){ce!==$e&&!L&&(i.stencilMask($e),ce=$e)},setFunc:function($e,Mt,hn){(V!==$e||K!==Mt||pe!==hn)&&(i.stencilFunc($e,Mt,hn),V=$e,K=Mt,pe=hn)},setOp:function($e,Mt,hn){(de!==$e||Oe!==Mt||ft!==hn)&&(i.stencilOp($e,Mt,hn),de=$e,Oe=Mt,ft=hn)},setLocked:function($e){L=$e},setClear:function($e){pt!==$e&&(i.clearStencil($e),pt=$e)},reset:function(){L=!1,ce=null,V=null,K=null,pe=null,de=null,Oe=null,ft=null,pt=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,R=null,E=null,y=null,N=null,C=null,I=new We(0,0,0),P=0,S=!1,v=null,A=null,z=null,F=null,k=null,Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),O=!1,Q=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(W)[1]),O=Q>=1):W.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),O=Q>=2);let oe=null,ue={},ye=i.getParameter(i.SCISSOR_BOX),Xe=i.getParameter(i.VIEWPORT),Je=new ht().fromArray(ye),X=new ht().fromArray(Xe);function ee(L,ce,V,K){let pe=new Uint8Array(4),de=i.createTexture();i.bindTexture(L,de),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Oe=0;Oe<V;Oe++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(ce,0,i.RGBA,1,1,K,0,i.RGBA,i.UNSIGNED_BYTE,pe):i.texImage2D(ce+Oe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,pe);return de}let we={};we[i.TEXTURE_2D]=ee(i.TEXTURE_2D,i.TEXTURE_2D,1),we[i.TEXTURE_CUBE_MAP]=ee(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),we[i.TEXTURE_2D_ARRAY]=ee(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),we[i.TEXTURE_3D]=ee(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(i.DEPTH_TEST),o.setFunc(Gr),j(!1),_e(vu),se(i.CULL_FACE),T(ds);function se(L){h[L]!==!0&&(i.enable(L),h[L]=!0)}function Ie(L){h[L]!==!1&&(i.disable(L),h[L]=!1)}function Be(L,ce){return u[L]!==ce?(i.bindFramebuffer(L,ce),u[L]=ce,L===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ce),L===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ce),!0):!1}function ze(L,ce){let V=f,K=!1;if(L){V=d.get(ce),V===void 0&&(V=[],d.set(ce,V));let pe=L.textures;if(V.length!==pe.length||V[0]!==i.COLOR_ATTACHMENT0){for(let de=0,Oe=pe.length;de<Oe;de++)V[de]=i.COLOR_ATTACHMENT0+de;V.length=pe.length,K=!0}}else V[0]!==i.BACK&&(V[0]=i.BACK,K=!0);K&&i.drawBuffers(V)}function Ye(L){return g!==L?(i.useProgram(L),g=L,!0):!1}let J={[or]:i.FUNC_ADD,[Mf]:i.FUNC_SUBTRACT,[Sf]:i.FUNC_REVERSE_SUBTRACT};J[Ef]=i.MIN,J[bf]=i.MAX;let ne={[wf]:i.ZERO,[Tf]:i.ONE,[Rf]:i.SRC_COLOR,[il]:i.SRC_ALPHA,[Df]:i.SRC_ALPHA_SATURATE,[Pf]:i.DST_COLOR,[Cf]:i.DST_ALPHA,[Af]:i.ONE_MINUS_SRC_COLOR,[sl]:i.ONE_MINUS_SRC_ALPHA,[Lf]:i.ONE_MINUS_DST_COLOR,[If]:i.ONE_MINUS_DST_ALPHA,[Uf]:i.CONSTANT_COLOR,[Nf]:i.ONE_MINUS_CONSTANT_COLOR,[Ff]:i.CONSTANT_ALPHA,[Bf]:i.ONE_MINUS_CONSTANT_ALPHA};function T(L,ce,V,K,pe,de,Oe,ft,pt,$e){if(L===ds){_===!0&&(Ie(i.BLEND),_=!1);return}if(_===!1&&(se(i.BLEND),_=!0),L!==vf){if(L!==m||$e!==S){if((p!==or||y!==or)&&(i.blendEquation(i.FUNC_ADD),p=or,y=or),$e)switch(L){case fs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Da:i.blendFunc(i.ONE,i.ONE);break;case Mu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Su:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case fs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Da:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Mu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Su:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}R=null,E=null,N=null,C=null,I.set(0,0,0),P=0,m=L,S=$e}return}pe=pe||ce,de=de||V,Oe=Oe||K,(ce!==p||pe!==y)&&(i.blendEquationSeparate(J[ce],J[pe]),p=ce,y=pe),(V!==R||K!==E||de!==N||Oe!==C)&&(i.blendFuncSeparate(ne[V],ne[K],ne[de],ne[Oe]),R=V,E=K,N=de,C=Oe),(ft.equals(I)===!1||pt!==P)&&(i.blendColor(ft.r,ft.g,ft.b,pt),I.copy(ft),P=pt),m=L,S=!1}function Ae(L,ce){L.side===Tn?Ie(i.CULL_FACE):se(i.CULL_FACE);let V=L.side===kt;ce&&(V=!V),j(V),L.blending===fs&&L.transparent===!1?T(ds):T(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),r.setMask(L.colorWrite);let K=L.stencilWrite;a.setTest(K),K&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Ne(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?se(i.SAMPLE_ALPHA_TO_COVERAGE):Ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function j(L){v!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),v=L)}function _e(L){L!==xf?(se(i.CULL_FACE),L!==A&&(L===vu?i.cullFace(i.BACK):L===yf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ie(i.CULL_FACE),A=L}function he(L){L!==z&&(O&&i.lineWidth(L),z=L)}function Ne(L,ce,V){L?(se(i.POLYGON_OFFSET_FILL),(F!==ce||k!==V)&&(i.polygonOffset(ce,V),F=ce,k=V)):Ie(i.POLYGON_OFFSET_FILL)}function fe(L){L?se(i.SCISSOR_TEST):Ie(i.SCISSOR_TEST)}function b(L){L===void 0&&(L=i.TEXTURE0+Y-1),oe!==L&&(i.activeTexture(L),oe=L)}function x(L,ce,V){V===void 0&&(oe===null?V=i.TEXTURE0+Y-1:V=oe);let K=ue[V];K===void 0&&(K={type:void 0,texture:void 0},ue[V]=K),(K.type!==L||K.texture!==ce)&&(oe!==V&&(i.activeTexture(V),oe=V),i.bindTexture(L,ce||we[L]),K.type=L,K.texture=ce)}function B(){let L=ue[oe];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Te(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ae(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function me(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function et(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function te(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ve(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function De(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ve(L){Je.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),Je.copy(L))}function Se(L){X.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),X.copy(L))}function qe(L,ce){let V=l.get(ce);V===void 0&&(V=new WeakMap,l.set(ce,V));let K=V.get(L);K===void 0&&(K=i.getUniformBlockIndex(ce,L.name),V.set(L,K))}function ke(L,ce){let K=l.get(ce).get(L);c.get(ce)!==K&&(i.uniformBlockBinding(ce,K,L.__bindingPointIndex),c.set(ce,K))}function ot(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},oe=null,ue={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,R=null,E=null,y=null,N=null,C=null,I=new We(0,0,0),P=0,S=!1,v=null,A=null,z=null,F=null,k=null,Je.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:se,disable:Ie,bindFramebuffer:Be,drawBuffers:ze,useProgram:Ye,setBlending:T,setMaterial:Ae,setFlipSided:j,setCullFace:_e,setLineWidth:he,setPolygonOffset:Ne,setScissorTest:fe,activeTexture:b,bindTexture:x,unbindTexture:B,compressedTexImage2D:q,compressedTexImage3D:$,texImage2D:ve,texImage3D:De,updateUBOMapping:qe,uniformBlockBinding:ke,texStorage2D:et,texStorage3D:te,texSubImage2D:Z,texSubImage3D:Te,compressedTexSubImage2D:ae,compressedTexSubImage3D:me,scissor:Ve,viewport:Se,reset:ot}}function xd(i,e,t,n){let s=ax(n);switch(t){case Od:return i*e;case zd:return i*e;case kd:return i*e*2;case Ih:return i*e/s.components*s.byteLength;case Ph:return i*e/s.components*s.byteLength;case Gd:return i*e*2/s.components*s.byteLength;case Lh:return i*e*2/s.components*s.byteLength;case Hd:return i*e*3/s.components*s.byteLength;case An:return i*e*4/s.components*s.byteLength;case Dh:return i*e*4/s.components*s.byteLength;case Aa:case Ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ia:case Pa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case gl:case xl:return Math.max(i,16)*Math.max(e,8)/4;case ml:case _l:return Math.max(i,8)*Math.max(e,8)/2;case yl:case vl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ml:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Sl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case El:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case bl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case wl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Tl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Rl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Al:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Cl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Il:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Pl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ll:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Dl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ul:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Nl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case La:case Fl:case Bl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Vd:case Ol:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Hl:case zl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ax(i){switch(i){case ts:case Nd:return{byteLength:1,components:1};case Ao:case Fd:case Vo:return{byteLength:2,components:1};case Ah:case Ch:return{byteLength:2,components:4};case lr:case Rh:case li:return{byteLength:4,components:1};case Bd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function cx(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new le,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,x){return f?new OffscreenCanvas(b,x):Io("canvas")}function _(b,x,B){let q=1,$=fe(b);if(($.width>B||$.height>B)&&(q=B/Math.max($.width,$.height)),q<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let Z=Math.floor(q*$.width),Te=Math.floor(q*$.height);u===void 0&&(u=g(Z,Te));let ae=x?g(Z,Te):u;return ae.width=Z,ae.height=Te,ae.getContext("2d").drawImage(b,0,0,Z,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+Z+"x"+Te+")."),ae}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),b;return b}function m(b){return b.generateMipmaps}function p(b){i.generateMipmap(b)}function R(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(b,x,B,q,$=!1){if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let Z=x;if(x===i.RED&&(B===i.FLOAT&&(Z=i.R32F),B===i.HALF_FLOAT&&(Z=i.R16F),B===i.UNSIGNED_BYTE&&(Z=i.R8)),x===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.R8UI),B===i.UNSIGNED_SHORT&&(Z=i.R16UI),B===i.UNSIGNED_INT&&(Z=i.R32UI),B===i.BYTE&&(Z=i.R8I),B===i.SHORT&&(Z=i.R16I),B===i.INT&&(Z=i.R32I)),x===i.RG&&(B===i.FLOAT&&(Z=i.RG32F),B===i.HALF_FLOAT&&(Z=i.RG16F),B===i.UNSIGNED_BYTE&&(Z=i.RG8)),x===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RG8UI),B===i.UNSIGNED_SHORT&&(Z=i.RG16UI),B===i.UNSIGNED_INT&&(Z=i.RG32UI),B===i.BYTE&&(Z=i.RG8I),B===i.SHORT&&(Z=i.RG16I),B===i.INT&&(Z=i.RG32I)),x===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),B===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),B===i.UNSIGNED_INT&&(Z=i.RGB32UI),B===i.BYTE&&(Z=i.RGB8I),B===i.SHORT&&(Z=i.RGB16I),B===i.INT&&(Z=i.RGB32I)),x===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),B===i.UNSIGNED_INT&&(Z=i.RGBA32UI),B===i.BYTE&&(Z=i.RGBA8I),B===i.SHORT&&(Z=i.RGBA16I),B===i.INT&&(Z=i.RGBA32I)),x===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),x===i.RGBA){let Te=$?pc:st.getTransfer(q);B===i.FLOAT&&(Z=i.RGBA32F),B===i.HALF_FLOAT&&(Z=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Z=Te===lt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function y(b,x){let B;return b?x===null||x===lr||x===Xr?B=i.DEPTH24_STENCIL8:x===li?B=i.DEPTH32F_STENCIL8:x===Ao&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===lr||x===Xr?B=i.DEPTH_COMPONENT24:x===li?B=i.DEPTH_COMPONENT32F:x===Ao&&(B=i.DEPTH_COMPONENT16),B}function N(b,x){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==cn&&b.minFilter!==ci?Math.log2(Math.max(x.width,x.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?x.mipmaps.length:1}function C(b){let x=b.target;x.removeEventListener("dispose",C),P(x),x.isVideoTexture&&h.delete(x)}function I(b){let x=b.target;x.removeEventListener("dispose",I),v(x)}function P(b){let x=n.get(b);if(x.__webglInit===void 0)return;let B=b.source,q=d.get(B);if(q){let $=q[x.__cacheKey];$.usedTimes--,$.usedTimes===0&&S(b),Object.keys(q).length===0&&d.delete(B)}n.remove(b)}function S(b){let x=n.get(b);i.deleteTexture(x.__webglTexture);let B=b.source,q=d.get(B);delete q[x.__cacheKey],o.memory.textures--}function v(b){let x=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(x.__webglFramebuffer[q]))for(let $=0;$<x.__webglFramebuffer[q].length;$++)i.deleteFramebuffer(x.__webglFramebuffer[q][$]);else i.deleteFramebuffer(x.__webglFramebuffer[q]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[q])}else{if(Array.isArray(x.__webglFramebuffer))for(let q=0;q<x.__webglFramebuffer.length;q++)i.deleteFramebuffer(x.__webglFramebuffer[q]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let q=0;q<x.__webglColorRenderbuffer.length;q++)x.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[q]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let B=b.textures;for(let q=0,$=B.length;q<$;q++){let Z=n.get(B[q]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(B[q])}n.remove(b)}let A=0;function z(){A=0}function F(){let b=A;return b>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),A+=1,b}function k(b){let x=[];return x.push(b.wrapS),x.push(b.wrapT),x.push(b.wrapR||0),x.push(b.magFilter),x.push(b.minFilter),x.push(b.anisotropy),x.push(b.internalFormat),x.push(b.format),x.push(b.type),x.push(b.generateMipmaps),x.push(b.premultiplyAlpha),x.push(b.flipY),x.push(b.unpackAlignment),x.push(b.colorSpace),x.join()}function Y(b,x){let B=n.get(b);if(b.isVideoTexture&&he(b),b.isRenderTargetTexture===!1&&b.version>0&&B.__version!==b.version){let q=b.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(B,b,x);return}}t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+x)}function O(b,x){let B=n.get(b);if(b.version>0&&B.__version!==b.version){X(B,b,x);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+x)}function Q(b,x){let B=n.get(b);if(b.version>0&&B.__version!==b.version){X(B,b,x);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+x)}function W(b,x){let B=n.get(b);if(b.version>0&&B.__version!==b.version){ee(B,b,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+x)}let oe={[di]:i.REPEAT,[Qi]:i.CLAMP_TO_EDGE,[pl]:i.MIRRORED_REPEAT},ue={[cn]:i.NEAREST,[qf]:i.NEAREST_MIPMAP_NEAREST,[jo]:i.NEAREST_MIPMAP_LINEAR,[ci]:i.LINEAR,[Ec]:i.LINEAR_MIPMAP_NEAREST,[cr]:i.LINEAR_MIPMAP_LINEAR},ye={[$f]:i.NEVER,[np]:i.ALWAYS,[Kf]:i.LESS,[Xd]:i.LEQUAL,[Qf]:i.EQUAL,[tp]:i.GEQUAL,[jf]:i.GREATER,[ep]:i.NOTEQUAL};function Xe(b,x){if(x.type===li&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===ci||x.magFilter===Ec||x.magFilter===jo||x.magFilter===cr||x.minFilter===ci||x.minFilter===Ec||x.minFilter===jo||x.minFilter===cr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,oe[x.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,oe[x.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,oe[x.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,ue[x.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,ue[x.minFilter]),x.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,ye[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===cn||x.minFilter!==jo&&x.minFilter!==cr||x.type===li&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Je(b,x){let B=!1;b.__webglInit===void 0&&(b.__webglInit=!0,x.addEventListener("dispose",C));let q=x.source,$=d.get(q);$===void 0&&($={},d.set(q,$));let Z=k(x);if(Z!==b.__cacheKey){$[Z]===void 0&&($[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),$[Z].usedTimes++;let Te=$[b.__cacheKey];Te!==void 0&&($[b.__cacheKey].usedTimes--,Te.usedTimes===0&&S(x)),b.__cacheKey=Z,b.__webglTexture=$[Z].texture}return B}function X(b,x,B){let q=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(q=i.TEXTURE_3D);let $=Je(b,x),Z=x.source;t.bindTexture(q,b.__webglTexture,i.TEXTURE0+B);let Te=n.get(Z);if(Z.version!==Te.__version||$===!0){t.activeTexture(i.TEXTURE0+B);let ae=st.getPrimaries(st.workingColorSpace),me=x.colorSpace===Ut?null:st.getPrimaries(x.colorSpace),et=x.colorSpace===Ut||ae===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);let te=_(x.image,!1,s.maxTextureSize);te=Ne(x,te);let ve=r.convert(x.format,x.colorSpace),De=r.convert(x.type),Ve=E(x.internalFormat,ve,De,x.colorSpace,x.isVideoTexture);Xe(q,x);let Se,qe=x.mipmaps,ke=x.isVideoTexture!==!0,ot=Te.__version===void 0||$===!0,L=Z.dataReady,ce=N(x,te);if(x.isDepthTexture)Ve=y(x.format===qr,x.type),ot&&(ke?t.texStorage2D(i.TEXTURE_2D,1,Ve,te.width,te.height):t.texImage2D(i.TEXTURE_2D,0,Ve,te.width,te.height,0,ve,De,null));else if(x.isDataTexture)if(qe.length>0){ke&&ot&&t.texStorage2D(i.TEXTURE_2D,ce,Ve,qe[0].width,qe[0].height);for(let V=0,K=qe.length;V<K;V++)Se=qe[V],ke?L&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,Se.width,Se.height,ve,De,Se.data):t.texImage2D(i.TEXTURE_2D,V,Ve,Se.width,Se.height,0,ve,De,Se.data);x.generateMipmaps=!1}else ke?(ot&&t.texStorage2D(i.TEXTURE_2D,ce,Ve,te.width,te.height),L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,te.width,te.height,ve,De,te.data)):t.texImage2D(i.TEXTURE_2D,0,Ve,te.width,te.height,0,ve,De,te.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){ke&&ot&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ce,Ve,qe[0].width,qe[0].height,te.depth);for(let V=0,K=qe.length;V<K;V++)if(Se=qe[V],x.format!==An)if(ve!==null)if(ke){if(L)if(x.layerUpdates.size>0){let pe=xd(Se.width,Se.height,x.format,x.type);for(let de of x.layerUpdates){let Oe=Se.data.subarray(de*pe/Se.data.BYTES_PER_ELEMENT,(de+1)*pe/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,de,Se.width,Se.height,1,ve,Oe)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,Se.width,Se.height,te.depth,ve,Se.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,V,Ve,Se.width,Se.height,te.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ke?L&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,Se.width,Se.height,te.depth,ve,De,Se.data):t.texImage3D(i.TEXTURE_2D_ARRAY,V,Ve,Se.width,Se.height,te.depth,0,ve,De,Se.data)}else{ke&&ot&&t.texStorage2D(i.TEXTURE_2D,ce,Ve,qe[0].width,qe[0].height);for(let V=0,K=qe.length;V<K;V++)Se=qe[V],x.format!==An?ve!==null?ke?L&&t.compressedTexSubImage2D(i.TEXTURE_2D,V,0,0,Se.width,Se.height,ve,Se.data):t.compressedTexImage2D(i.TEXTURE_2D,V,Ve,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?L&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,Se.width,Se.height,ve,De,Se.data):t.texImage2D(i.TEXTURE_2D,V,Ve,Se.width,Se.height,0,ve,De,Se.data)}else if(x.isDataArrayTexture)if(ke){if(ot&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ce,Ve,te.width,te.height,te.depth),L)if(x.layerUpdates.size>0){let V=xd(te.width,te.height,x.format,x.type);for(let K of x.layerUpdates){let pe=te.data.subarray(K*V/te.data.BYTES_PER_ELEMENT,(K+1)*V/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,te.width,te.height,1,ve,De,pe)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ve,De,te.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ve,te.width,te.height,te.depth,0,ve,De,te.data);else if(x.isData3DTexture)ke?(ot&&t.texStorage3D(i.TEXTURE_3D,ce,Ve,te.width,te.height,te.depth),L&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ve,De,te.data)):t.texImage3D(i.TEXTURE_3D,0,Ve,te.width,te.height,te.depth,0,ve,De,te.data);else if(x.isFramebufferTexture){if(ot)if(ke)t.texStorage2D(i.TEXTURE_2D,ce,Ve,te.width,te.height);else{let V=te.width,K=te.height;for(let pe=0;pe<ce;pe++)t.texImage2D(i.TEXTURE_2D,pe,Ve,V,K,0,ve,De,null),V>>=1,K>>=1}}else if(qe.length>0){if(ke&&ot){let V=fe(qe[0]);t.texStorage2D(i.TEXTURE_2D,ce,Ve,V.width,V.height)}for(let V=0,K=qe.length;V<K;V++)Se=qe[V],ke?L&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,ve,De,Se):t.texImage2D(i.TEXTURE_2D,V,Ve,ve,De,Se);x.generateMipmaps=!1}else if(ke){if(ot){let V=fe(te);t.texStorage2D(i.TEXTURE_2D,ce,Ve,V.width,V.height)}L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ve,De,te)}else t.texImage2D(i.TEXTURE_2D,0,Ve,ve,De,te);m(x)&&p(q),Te.__version=Z.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function ee(b,x,B){if(x.image.length!==6)return;let q=Je(b,x),$=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+B);let Z=n.get($);if($.version!==Z.__version||q===!0){t.activeTexture(i.TEXTURE0+B);let Te=st.getPrimaries(st.workingColorSpace),ae=x.colorSpace===Ut?null:st.getPrimaries(x.colorSpace),me=x.colorSpace===Ut||Te===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let et=x.isCompressedTexture||x.image[0].isCompressedTexture,te=x.image[0]&&x.image[0].isDataTexture,ve=[];for(let K=0;K<6;K++)!et&&!te?ve[K]=_(x.image[K],!0,s.maxCubemapSize):ve[K]=te?x.image[K].image:x.image[K],ve[K]=Ne(x,ve[K]);let De=ve[0],Ve=r.convert(x.format,x.colorSpace),Se=r.convert(x.type),qe=E(x.internalFormat,Ve,Se,x.colorSpace),ke=x.isVideoTexture!==!0,ot=Z.__version===void 0||q===!0,L=$.dataReady,ce=N(x,De);Xe(i.TEXTURE_CUBE_MAP,x);let V;if(et){ke&&ot&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ce,qe,De.width,De.height);for(let K=0;K<6;K++){V=ve[K].mipmaps;for(let pe=0;pe<V.length;pe++){let de=V[pe];x.format!==An?Ve!==null?ke?L&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,pe,0,0,de.width,de.height,Ve,de.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,pe,qe,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ke?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,pe,0,0,de.width,de.height,Ve,Se,de.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,pe,qe,de.width,de.height,0,Ve,Se,de.data)}}}else{if(V=x.mipmaps,ke&&ot){V.length>0&&ce++;let K=fe(ve[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ce,qe,K.width,K.height)}for(let K=0;K<6;K++)if(te){ke?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ve[K].width,ve[K].height,Ve,Se,ve[K].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,qe,ve[K].width,ve[K].height,0,Ve,Se,ve[K].data);for(let pe=0;pe<V.length;pe++){let Oe=V[pe].image[K].image;ke?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,pe+1,0,0,Oe.width,Oe.height,Ve,Se,Oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,pe+1,qe,Oe.width,Oe.height,0,Ve,Se,Oe.data)}}else{ke?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ve,Se,ve[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,qe,Ve,Se,ve[K]);for(let pe=0;pe<V.length;pe++){let de=V[pe];ke?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,pe+1,0,0,Ve,Se,de.image[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,pe+1,qe,Ve,Se,de.image[K])}}}m(x)&&p(i.TEXTURE_CUBE_MAP),Z.__version=$.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function we(b,x,B,q,$,Z){let Te=r.convert(B.format,B.colorSpace),ae=r.convert(B.type),me=E(B.internalFormat,Te,ae,B.colorSpace),et=n.get(x),te=n.get(B);if(te.__renderTarget=x,!et.__hasExternalTextures){let ve=Math.max(1,x.width>>Z),De=Math.max(1,x.height>>Z);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,Z,me,ve,De,x.depth,0,Te,ae,null):t.texImage2D($,Z,me,ve,De,0,Te,ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),_e(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,$,te.__webglTexture,0,j(x)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,$,te.__webglTexture,Z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function se(b,x,B){if(i.bindRenderbuffer(i.RENDERBUFFER,b),x.depthBuffer){let q=x.depthTexture,$=q&&q.isDepthTexture?q.type:null,Z=y(x.stencilBuffer,$),Te=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=j(x);_e(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ae,Z,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ae,Z,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,Z,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Te,i.RENDERBUFFER,b)}else{let q=x.textures;for(let $=0;$<q.length;$++){let Z=q[$],Te=r.convert(Z.format,Z.colorSpace),ae=r.convert(Z.type),me=E(Z.internalFormat,Te,ae,Z.colorSpace),et=j(x);B&&_e(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,et,me,x.width,x.height):_e(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,et,me,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,me,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ie(b,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let q=n.get(x.depthTexture);q.__renderTarget=x,(!q.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Y(x.depthTexture,0);let $=q.__webglTexture,Z=j(x);if(x.depthTexture.format===Hr)_e(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0);else if(x.depthTexture.format===qr)_e(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Be(b){let x=n.get(b),B=b.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==b.depthTexture){let q=b.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),q){let $=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,q.removeEventListener("dispose",$)};q.addEventListener("dispose",$),x.__depthDisposeCallback=$}x.__boundDepthTexture=q}if(b.depthTexture&&!x.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Ie(x.__webglFramebuffer,b)}else if(B){x.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[q]),x.__webglDepthbuffer[q]===void 0)x.__webglDepthbuffer[q]=i.createRenderbuffer(),se(x.__webglDepthbuffer[q],b,!1);else{let $=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=x.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,Z)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),se(x.__webglDepthbuffer,b,!1);else{let q=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,$)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ze(b,x,B){let q=n.get(b);x!==void 0&&we(q.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Be(b)}function Ye(b){let x=b.texture,B=n.get(b),q=n.get(x);b.addEventListener("dispose",I);let $=b.textures,Z=b.isWebGLCubeRenderTarget===!0,Te=$.length>1;if(Te||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=x.version,o.memory.textures++),Z){B.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer[ae]=[];for(let me=0;me<x.mipmaps.length;me++)B.__webglFramebuffer[ae][me]=i.createFramebuffer()}else B.__webglFramebuffer[ae]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer=[];for(let ae=0;ae<x.mipmaps.length;ae++)B.__webglFramebuffer[ae]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Te)for(let ae=0,me=$.length;ae<me;ae++){let et=n.get($[ae]);et.__webglTexture===void 0&&(et.__webglTexture=i.createTexture(),o.memory.textures++)}if(b.samples>0&&_e(b)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ae=0;ae<$.length;ae++){let me=$[ae];B.__webglColorRenderbuffer[ae]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ae]);let et=r.convert(me.format,me.colorSpace),te=r.convert(me.type),ve=E(me.internalFormat,et,te,me.colorSpace,b.isXRRenderTarget===!0),De=j(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,De,ve,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,B.__webglColorRenderbuffer[ae])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),se(B.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Xe(i.TEXTURE_CUBE_MAP,x);for(let ae=0;ae<6;ae++)if(x.mipmaps&&x.mipmaps.length>0)for(let me=0;me<x.mipmaps.length;me++)we(B.__webglFramebuffer[ae][me],b,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,me);else we(B.__webglFramebuffer[ae],b,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);m(x)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let ae=0,me=$.length;ae<me;ae++){let et=$[ae],te=n.get(et);t.bindTexture(i.TEXTURE_2D,te.__webglTexture),Xe(i.TEXTURE_2D,et),we(B.__webglFramebuffer,b,et,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,0),m(et)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let ae=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ae=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ae,q.__webglTexture),Xe(ae,x),x.mipmaps&&x.mipmaps.length>0)for(let me=0;me<x.mipmaps.length;me++)we(B.__webglFramebuffer[me],b,x,i.COLOR_ATTACHMENT0,ae,me);else we(B.__webglFramebuffer,b,x,i.COLOR_ATTACHMENT0,ae,0);m(x)&&p(ae),t.unbindTexture()}b.depthBuffer&&Be(b)}function J(b){let x=b.textures;for(let B=0,q=x.length;B<q;B++){let $=x[B];if(m($)){let Z=R(b),Te=n.get($).__webglTexture;t.bindTexture(Z,Te),p(Z),t.unbindTexture()}}}let ne=[],T=[];function Ae(b){if(b.samples>0){if(_e(b)===!1){let x=b.textures,B=b.width,q=b.height,$=i.COLOR_BUFFER_BIT,Z=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Te=n.get(b),ae=x.length>1;if(ae)for(let me=0;me<x.length;me++)t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let me=0;me<x.length;me++){if(b.resolveDepthBuffer&&(b.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),ae){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Te.__webglColorRenderbuffer[me]);let et=n.get(x[me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,et,0)}i.blitFramebuffer(0,0,B,q,0,0,B,q,$,i.NEAREST),c===!0&&(ne.length=0,T.length=0,ne.push(i.COLOR_ATTACHMENT0+me),b.depthBuffer&&b.resolveDepthBuffer===!1&&(ne.push(Z),T.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,T)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ne))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ae)for(let me=0;me<x.length;me++){t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,Te.__webglColorRenderbuffer[me]);let et=n.get(x[me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,et,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){let x=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function j(b){return Math.min(s.maxSamples,b.samples)}function _e(b){let x=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function he(b){let x=o.render.frame;h.get(b)!==x&&(h.set(b,x),b.update())}function Ne(b,x){let B=b.colorSpace,q=b.format,$=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||B!==jr&&B!==Ut&&(st.getTransfer(B)===lt?(q!==An||$!==ts)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),x}function fe(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=z,this.setTexture2D=Y,this.setTexture2DArray=O,this.setTexture3D=Q,this.setTextureCube=W,this.rebindTextures=ze,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=J,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=we,this.useMultisampledRTT=_e}function lx(i,e){function t(n,s=Ut){let r,o=st.getTransfer(s);if(n===ts)return i.UNSIGNED_BYTE;if(n===Ah)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ch)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Bd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Nd)return i.BYTE;if(n===Fd)return i.SHORT;if(n===Ao)return i.UNSIGNED_SHORT;if(n===Rh)return i.INT;if(n===lr)return i.UNSIGNED_INT;if(n===li)return i.FLOAT;if(n===Vo)return i.HALF_FLOAT;if(n===Od)return i.ALPHA;if(n===Hd)return i.RGB;if(n===An)return i.RGBA;if(n===zd)return i.LUMINANCE;if(n===kd)return i.LUMINANCE_ALPHA;if(n===Hr)return i.DEPTH_COMPONENT;if(n===qr)return i.DEPTH_STENCIL;if(n===Ih)return i.RED;if(n===Ph)return i.RED_INTEGER;if(n===Gd)return i.RG;if(n===Lh)return i.RG_INTEGER;if(n===Dh)return i.RGBA_INTEGER;if(n===Aa||n===Ca||n===Ia||n===Pa)if(o===lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Aa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Pa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Aa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ca)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ia)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Pa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ml||n===gl||n===_l||n===xl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ml)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===gl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===_l)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===xl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===yl||n===vl||n===Ml)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===yl||n===vl)return o===lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ml)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Sl||n===El||n===bl||n===wl||n===Tl||n===Rl||n===Al||n===Cl||n===Il||n===Pl||n===Ll||n===Dl||n===Ul||n===Nl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Sl)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===El)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===bl)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wl)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Tl)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Rl)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Al)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Cl)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Il)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Pl)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ll)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Dl)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ul)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Nl)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===La||n===Fl||n===Bl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===La)return o===lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Fl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Bl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Vd||n===Ol||n===Hl||n===zl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===La)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ol)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Hl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===zl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var ih=class extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Ee=class extends Gt{constructor(){super(),this.isGroup=!0,this.type="Group"}},hx={type:"move"},bo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ee,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ee,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ee,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(hx)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ee;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},ux=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,sh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let s=new Zt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new mi({vertexShader:ux,fragmentShader:dx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new re(new gs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},rh=class extends ms{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null,_=new sh,m=t.getContextAttributes(),p=null,R=null,E=[],y=[],N=new le,C=null,I=new zt;I.viewport=new ht;let P=new zt;P.viewport=new ht;let S=[I,P],v=new ih,A=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ee=E[X];return ee===void 0&&(ee=new bo,E[X]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(X){let ee=E[X];return ee===void 0&&(ee=new bo,E[X]=ee),ee.getGripSpace()},this.getHand=function(X){let ee=E[X];return ee===void 0&&(ee=new bo,E[X]=ee),ee.getHandSpace()};function F(X){let ee=y.indexOf(X.inputSource);if(ee===-1)return;let we=E[ee];we!==void 0&&(we.update(X.inputSource,X.frame,l||o),we.dispatchEvent({type:X.type,data:X.inputSource}))}function k(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",Y);for(let X=0;X<E.length;X++){let ee=y[X];ee!==null&&(y[X]=null,E[X].disconnect(ee))}A=null,z=null,_.reset(),e.setRenderTarget(p),f=null,d=null,u=null,s=null,R=null,Je.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",k),s.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(N),s.renderState.layers===void 0){let ee={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ee),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),R=new ns(f.framebufferWidth,f.framebufferHeight,{format:An,type:ts,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ee=null,we=null,se=null;m.depth&&(se=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=m.stencil?qr:Hr,we=m.stencil?Xr:lr);let Ie={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:r};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(Ie),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),R=new ns(d.textureWidth,d.textureHeight,{format:An,type:ts,depthTexture:new Wa(d.textureWidth,d.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}R.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Je.setContext(s),Je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Y(X){for(let ee=0;ee<X.removed.length;ee++){let we=X.removed[ee],se=y.indexOf(we);se>=0&&(y[se]=null,E[se].disconnect(we))}for(let ee=0;ee<X.added.length;ee++){let we=X.added[ee],se=y.indexOf(we);if(se===-1){for(let Be=0;Be<E.length;Be++)if(Be>=y.length){y.push(we),se=Be;break}else if(y[Be]===null){y[Be]=we,se=Be;break}if(se===-1)break}let Ie=E[se];Ie&&Ie.connect(we)}}let O=new w,Q=new w;function W(X,ee,we){O.setFromMatrixPosition(ee.matrixWorld),Q.setFromMatrixPosition(we.matrixWorld);let se=O.distanceTo(Q),Ie=ee.projectionMatrix.elements,Be=we.projectionMatrix.elements,ze=Ie[14]/(Ie[10]-1),Ye=Ie[14]/(Ie[10]+1),J=(Ie[9]+1)/Ie[5],ne=(Ie[9]-1)/Ie[5],T=(Ie[8]-1)/Ie[0],Ae=(Be[8]+1)/Be[0],j=ze*T,_e=ze*Ae,he=se/(-T+Ae),Ne=he*-T;if(ee.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ne),X.translateZ(he),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Ie[10]===-1)X.projectionMatrix.copy(ee.projectionMatrix),X.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{let fe=ze+he,b=Ye+he,x=j-Ne,B=_e+(se-Ne),q=J*Ye/b*fe,$=ne*Ye/b*fe;X.projectionMatrix.makePerspective(x,B,q,$,fe,b),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function oe(X,ee){ee===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ee.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let ee=X.near,we=X.far;_.texture!==null&&(_.depthNear>0&&(ee=_.depthNear),_.depthFar>0&&(we=_.depthFar)),v.near=P.near=I.near=ee,v.far=P.far=I.far=we,(A!==v.near||z!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),A=v.near,z=v.far),I.layers.mask=X.layers.mask|2,P.layers.mask=X.layers.mask|4,v.layers.mask=I.layers.mask|P.layers.mask;let se=X.parent,Ie=v.cameras;oe(v,se);for(let Be=0;Be<Ie.length;Be++)oe(Ie[Be],se);Ie.length===2?W(v,I,P):v.projectionMatrix.copy(I.projectionMatrix),ue(X,v,se)};function ue(X,ee,we){we===null?X.matrix.copy(ee.matrixWorld):(X.matrix.copy(we.matrixWorld),X.matrix.invert(),X.matrix.multiply(ee.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ee.projectionMatrix),X.projectionMatrixInverse.copy(ee.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Co*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(X){c=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let ye=null;function Xe(X,ee){if(h=ee.getViewerPose(l||o),g=ee,h!==null){let we=h.views;f!==null&&(e.setRenderTargetFramebuffer(R,f.framebuffer),e.setRenderTarget(R));let se=!1;we.length!==v.cameras.length&&(v.cameras.length=0,se=!0);for(let Be=0;Be<we.length;Be++){let ze=we[Be],Ye=null;if(f!==null)Ye=f.getViewport(ze);else{let ne=u.getViewSubImage(d,ze);Ye=ne.viewport,Be===0&&(e.setRenderTargetTextures(R,ne.colorTexture,d.ignoreDepthValues?void 0:ne.depthStencilTexture),e.setRenderTarget(R))}let J=S[Be];J===void 0&&(J=new zt,J.layers.enable(Be),J.viewport=new ht,S[Be]=J),J.matrix.fromArray(ze.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(ze.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(Ye.x,Ye.y,Ye.width,Ye.height),Be===0&&(v.matrix.copy(J.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),se===!0&&v.cameras.push(J)}let Ie=s.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")){let Be=u.getDepthInformation(we[0]);Be&&Be.isValid&&Be.texture&&_.init(e,Be,s.renderState)}}for(let we=0;we<E.length;we++){let se=y[we],Ie=E[we];se!==null&&Ie!==void 0&&Ie.update(se,ee,l||o)}ye&&ye(X,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),g=null}let Je=new Jd;Je.setAnimationLoop(Xe),this.setAnimationLoop=function(X){ye=X},this.dispose=function(){}}},sr=new pi,fx=new nt;function px(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Zd(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,R,E,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,R,E):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===kt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===kt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let R=e.get(p),E=R.envMap,y=R.envMapRotation;E&&(m.envMap.value=E,sr.copy(y),sr.x*=-1,sr.y*=-1,sr.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(sr.y*=-1,sr.z*=-1),m.envMapRotation.value.setFromMatrix4(fx.makeRotationFromEuler(sr)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,R,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*R,m.scale.value=E*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,R){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===kt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=R.texture,m.transmissionSamplerSize.value.set(R.width,R.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let R=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(R.matrixWorld),m.nearDistance.value=R.shadow.camera.near,m.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function mx(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(R,E){let y=E.program;n.uniformBlockBinding(R,y)}function l(R,E){let y=s[R.id];y===void 0&&(g(R),y=h(R),s[R.id]=y,R.addEventListener("dispose",m));let N=E.program;n.updateUBOMapping(R,N);let C=e.render.frame;r[R.id]!==C&&(d(R),r[R.id]=C)}function h(R){let E=u();R.__bindingPointIndex=E;let y=i.createBuffer(),N=R.__size,C=R.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,N,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,y),y}function u(){for(let R=0;R<a;R++)if(o.indexOf(R)===-1)return o.push(R),R;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(R){let E=s[R.id],y=R.uniforms,N=R.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let C=0,I=y.length;C<I;C++){let P=Array.isArray(y[C])?y[C]:[y[C]];for(let S=0,v=P.length;S<v;S++){let A=P[S];if(f(A,C,S,N)===!0){let z=A.__offset,F=Array.isArray(A.value)?A.value:[A.value],k=0;for(let Y=0;Y<F.length;Y++){let O=F[Y],Q=_(O);typeof O=="number"||typeof O=="boolean"?(A.__data[0]=O,i.bufferSubData(i.UNIFORM_BUFFER,z+k,A.__data)):O.isMatrix3?(A.__data[0]=O.elements[0],A.__data[1]=O.elements[1],A.__data[2]=O.elements[2],A.__data[3]=0,A.__data[4]=O.elements[3],A.__data[5]=O.elements[4],A.__data[6]=O.elements[5],A.__data[7]=0,A.__data[8]=O.elements[6],A.__data[9]=O.elements[7],A.__data[10]=O.elements[8],A.__data[11]=0):(O.toArray(A.__data,k),k+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,A.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(R,E,y,N){let C=R.value,I=E+"_"+y;if(N[I]===void 0)return typeof C=="number"||typeof C=="boolean"?N[I]=C:N[I]=C.clone(),!0;{let P=N[I];if(typeof C=="number"||typeof C=="boolean"){if(P!==C)return N[I]=C,!0}else if(P.equals(C)===!1)return P.copy(C),!0}return!1}function g(R){let E=R.uniforms,y=0,N=16;for(let I=0,P=E.length;I<P;I++){let S=Array.isArray(E[I])?E[I]:[E[I]];for(let v=0,A=S.length;v<A;v++){let z=S[v],F=Array.isArray(z.value)?z.value:[z.value];for(let k=0,Y=F.length;k<Y;k++){let O=F[k],Q=_(O),W=y%N,oe=W%Q.boundary,ue=W+oe;y+=oe,ue!==0&&N-ue<Q.storage&&(y+=N-ue),z.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=y,y+=Q.storage}}}let C=y%N;return C>0&&(y+=N-C),R.__size=y,R.__cache={},this}function _(R){let E={boundary:0,storage:0};return typeof R=="number"||typeof R=="boolean"?(E.boundary=4,E.storage=4):R.isVector2?(E.boundary=8,E.storage=8):R.isVector3||R.isColor?(E.boundary=16,E.storage=12):R.isVector4?(E.boundary=16,E.storage=16):R.isMatrix3?(E.boundary=48,E.storage=48):R.isMatrix4?(E.boundary=64,E.storage=64):R.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",R),E}function m(R){let E=R.target;E.removeEventListener("dispose",m);let y=o.indexOf(E.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(let R in s)i.deleteBuffer(s[R]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var Xa=class{constructor(e={}){let{canvas:t=yp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,p=null,R=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=wt,this.toneMapping=ps,this.toneMappingExposure=1;let y=this,N=!1,C=0,I=0,P=null,S=-1,v=null,A=new ht,z=new ht,F=null,k=new We(0),Y=0,O=t.width,Q=t.height,W=1,oe=null,ue=null,ye=new ht(0,0,O,Q),Xe=new ht(0,0,O,Q),Je=!1,X=new Po,ee=!1,we=!1,se=new nt,Ie=new nt,Be=new w,ze=new ht,Ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},J=!1;function ne(){return P===null?W:1}let T=n;function Ae(M,U){return t.getContext(M,U)}try{let M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${wh}`),t.addEventListener("webglcontextlost",K,!1),t.addEventListener("webglcontextrestored",pe,!1),t.addEventListener("webglcontextcreationerror",de,!1),T===null){let U="webgl2";if(T=Ae(U,M),T===null)throw Ae(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let j,_e,he,Ne,fe,b,x,B,q,$,Z,Te,ae,me,et,te,ve,De,Ve,Se,qe,ke,ot,L;function ce(){j=new Pg(T),j.init(),ke=new lx(T,j),_e=new wg(T,j,e,ke),he=new ox(T,j),_e.reverseDepthBuffer&&d&&he.buffers.depth.setReversed(!0),Ne=new Ug(T),fe=new Y_,b=new cx(T,j,he,fe,_e,ke,Ne),x=new Rg(y),B=new Ig(y),q=new kp(T),ot=new Eg(T,q),$=new Lg(T,q,Ne,ot),Z=new Fg(T,$,q,Ne),Ve=new Ng(T,_e,b),te=new Tg(fe),Te=new q_(y,x,B,j,_e,ot,te),ae=new px(y,fe),me=new J_,et=new tx(j),De=new Sg(y,x,B,he,Z,f,c),ve=new sx(y,Z,_e),L=new mx(T,Ne,_e,he),Se=new bg(T,j,Ne),qe=new Dg(T,j,Ne),Ne.programs=Te.programs,y.capabilities=_e,y.extensions=j,y.properties=fe,y.renderLists=me,y.shadowMap=ve,y.state=he,y.info=Ne}ce();let V=new rh(y,T);this.xr=V,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){let M=j.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=j.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(M){M!==void 0&&(W=M,this.setSize(O,Q,!1))},this.getSize=function(M){return M.set(O,Q)},this.setSize=function(M,U,H=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=M,Q=U,t.width=Math.floor(M*W),t.height=Math.floor(U*W),H===!0&&(t.style.width=M+"px",t.style.height=U+"px"),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(O*W,Q*W).floor()},this.setDrawingBufferSize=function(M,U,H){O=M,Q=U,W=H,t.width=Math.floor(M*H),t.height=Math.floor(U*H),this.setViewport(0,0,M,U)},this.getCurrentViewport=function(M){return M.copy(A)},this.getViewport=function(M){return M.copy(ye)},this.setViewport=function(M,U,H,G){M.isVector4?ye.set(M.x,M.y,M.z,M.w):ye.set(M,U,H,G),he.viewport(A.copy(ye).multiplyScalar(W).round())},this.getScissor=function(M){return M.copy(Xe)},this.setScissor=function(M,U,H,G){M.isVector4?Xe.set(M.x,M.y,M.z,M.w):Xe.set(M,U,H,G),he.scissor(z.copy(Xe).multiplyScalar(W).round())},this.getScissorTest=function(){return Je},this.setScissorTest=function(M){he.setScissorTest(Je=M)},this.setOpaqueSort=function(M){oe=M},this.setTransparentSort=function(M){ue=M},this.getClearColor=function(M){return M.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor.apply(De,arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha.apply(De,arguments)},this.clear=function(M=!0,U=!0,H=!0){let G=0;if(M){let D=!1;if(P!==null){let ie=P.texture.format;D=ie===Dh||ie===Lh||ie===Ph}if(D){let ie=P.texture.type,Me=ie===ts||ie===lr||ie===Ao||ie===Xr||ie===Ah||ie===Ch,Re=De.getClearColor(),Le=De.getClearAlpha(),Fe=Re.r,He=Re.g,Pe=Re.b;Me?(g[0]=Fe,g[1]=He,g[2]=Pe,g[3]=Le,T.clearBufferuiv(T.COLOR,0,g)):(_[0]=Fe,_[1]=He,_[2]=Pe,_[3]=Le,T.clearBufferiv(T.COLOR,0,_))}else G|=T.COLOR_BUFFER_BIT}U&&(G|=T.DEPTH_BUFFER_BIT),H&&(G|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",K,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",de,!1),me.dispose(),et.dispose(),fe.dispose(),x.dispose(),B.dispose(),Z.dispose(),ot.dispose(),L.dispose(),Te.dispose(),V.dispose(),V.removeEventListener("sessionstart",Ln),V.removeEventListener("sessionend",tn),Dt.stop()};function K(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function pe(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;let M=Ne.autoReset,U=ve.enabled,H=ve.autoUpdate,G=ve.needsUpdate,D=ve.type;ce(),Ne.autoReset=M,ve.enabled=U,ve.autoUpdate=H,ve.needsUpdate=G,ve.type=D}function de(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Oe(M){let U=M.target;U.removeEventListener("dispose",Oe),ft(U)}function ft(M){pt(M),fe.remove(M)}function pt(M){let U=fe.get(M).programs;U!==void 0&&(U.forEach(function(H){Te.releaseProgram(H)}),M.isShaderMaterial&&Te.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,H,G,D,ie){U===null&&(U=Ye);let Me=D.isMesh&&D.matrixWorld.determinant()<0,Re=Qo(M,U,H,G,D);he.setMaterial(G,Me);let Le=H.index,Fe=1;if(G.wireframe===!0){if(Le=$.getWireframeAttribute(H),Le===void 0)return;Fe=2}let He=H.drawRange,Pe=H.attributes.position,Ke=He.start*Fe,ut=(He.start+He.count)*Fe;ie!==null&&(Ke=Math.max(Ke,ie.start*Fe),ut=Math.min(ut,(ie.start+ie.count)*Fe)),Le!==null?(Ke=Math.max(Ke,0),ut=Math.min(ut,Le.count)):Pe!=null&&(Ke=Math.max(Ke,0),ut=Math.min(ut,Pe.count));let tt=ut-Ke;if(tt<0||tt===1/0)return;ot.setup(D,G,Re,H,Le);let mt,it=Se;if(Le!==null&&(mt=q.get(Le),it=qe,it.setIndex(mt)),D.isMesh)G.wireframe===!0?(he.setLineWidth(G.wireframeLinewidth*ne()),it.setMode(T.LINES)):it.setMode(T.TRIANGLES);else if(D.isLine){let Ce=G.linewidth;Ce===void 0&&(Ce=1),he.setLineWidth(Ce*ne()),D.isLineSegments?it.setMode(T.LINES):D.isLineLoop?it.setMode(T.LINE_LOOP):it.setMode(T.LINE_STRIP)}else D.isPoints?it.setMode(T.POINTS):D.isSprite&&it.setMode(T.TRIANGLES);if(D.isBatchedMesh)if(D._multiDrawInstances!==null)it.renderMultiDrawInstances(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount,D._multiDrawInstances);else if(j.get("WEBGL_multi_draw"))it.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{let Ce=D._multiDrawStarts,Et=D._multiDrawCounts,Qe=D._multiDrawCount,Qt=Le?q.get(Le).bytesPerElement:1,jt=fe.get(G).currentProgram.getUniforms();for(let gt=0;gt<Qe;gt++)jt.setValue(T,"_gl_DrawID",gt),it.render(Ce[gt]/Qt,Et[gt])}else if(D.isInstancedMesh)it.renderInstances(Ke,tt,D.count);else if(H.isInstancedBufferGeometry){let Ce=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Et=Math.min(H.instanceCount,Ce);it.renderInstances(Ke,tt,Et)}else it.render(Ke,tt)};function $e(M,U,H){M.transparent===!0&&M.side===Tn&&M.forceSinglePass===!1?(M.side=kt,M.needsUpdate=!0,un(M,U,H),M.side=ui,M.needsUpdate=!0,un(M,U,H),M.side=Tn):un(M,U,H)}this.compile=function(M,U,H=null){H===null&&(H=M),p=et.get(H),p.init(U),E.push(p),H.traverseVisible(function(D){D.isLight&&D.layers.test(U.layers)&&(p.pushLight(D),D.castShadow&&p.pushShadow(D))}),M!==H&&M.traverseVisible(function(D){D.isLight&&D.layers.test(U.layers)&&(p.pushLight(D),D.castShadow&&p.pushShadow(D))}),p.setupLights();let G=new Set;return M.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;let ie=D.material;if(ie)if(Array.isArray(ie))for(let Me=0;Me<ie.length;Me++){let Re=ie[Me];$e(Re,H,D),G.add(Re)}else $e(ie,H,D),G.add(ie)}),E.pop(),p=null,G},this.compileAsync=function(M,U,H=null){let G=this.compile(M,U,H);return new Promise(D=>{function ie(){if(G.forEach(function(Me){fe.get(Me).currentProgram.isReady()&&G.delete(Me)}),G.size===0){D(M);return}setTimeout(ie,10)}j.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let Mt=null;function hn(M){Mt&&Mt(M)}function Ln(){Dt.stop()}function tn(){Dt.start()}let Dt=new Jd;Dt.setAnimationLoop(hn),typeof self<"u"&&Dt.setContext(self),this.setAnimationLoop=function(M){Mt=M,V.setAnimationLoop(M),M===null?Dt.stop():Dt.start()},V.addEventListener("sessionstart",Ln),V.addEventListener("sessionend",tn),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(U),U=V.getCamera()),M.isScene===!0&&M.onBeforeRender(y,M,U,P),p=et.get(M,E.length),p.init(U),E.push(p),Ie.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),X.setFromProjectionMatrix(Ie),we=this.localClippingEnabled,ee=te.init(this.clippingPlanes,we),m=me.get(M,R.length),m.init(),R.push(m),V.enabled===!0&&V.isPresenting===!0){let ie=y.xr.getDepthSensingMesh();ie!==null&&_r(ie,U,-1/0,y.sortObjects)}_r(M,U,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(oe,ue),J=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,J&&De.addToRenderList(m,M),this.info.render.frame++,ee===!0&&te.beginShadows();let H=p.state.shadowsArray;ve.render(H,M,U),ee===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();let G=m.opaque,D=m.transmissive;if(p.setupLights(),U.isArrayCamera){let ie=U.cameras;if(D.length>0)for(let Me=0,Re=ie.length;Me<Re;Me++){let Le=ie[Me];nn(G,D,M,Le)}J&&De.render(M);for(let Me=0,Re=ie.length;Me<Re;Me++){let Le=ie[Me];Dn(m,M,Le,Le.viewport)}}else D.length>0&&nn(G,D,M,U),J&&De.render(M),Dn(m,M,U);P!==null&&(b.updateMultisampleRenderTarget(P),b.updateRenderTargetMipmap(P)),M.isScene===!0&&M.onAfterRender(y,M,U),ot.resetDefaultState(),S=-1,v=null,E.pop(),E.length>0?(p=E[E.length-1],ee===!0&&te.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,R.pop(),R.length>0?m=R[R.length-1]:m=null};function _r(M,U,H,G){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)H=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLight)p.pushLight(M),M.castShadow&&p.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||X.intersectsSprite(M)){G&&ze.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Ie);let Me=Z.update(M),Re=M.material;Re.visible&&m.push(M,Me,Re,H,ze.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||X.intersectsObject(M))){let Me=Z.update(M),Re=M.material;if(G&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),ze.copy(M.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),ze.copy(Me.boundingSphere.center)),ze.applyMatrix4(M.matrixWorld).applyMatrix4(Ie)),Array.isArray(Re)){let Le=Me.groups;for(let Fe=0,He=Le.length;Fe<He;Fe++){let Pe=Le[Fe],Ke=Re[Pe.materialIndex];Ke&&Ke.visible&&m.push(M,Me,Ke,H,ze.z,Pe)}}else Re.visible&&m.push(M,Me,Re,H,ze.z,null)}}let ie=M.children;for(let Me=0,Re=ie.length;Me<Re;Me++)_r(ie[Me],U,H,G)}function Dn(M,U,H,G){let D=M.opaque,ie=M.transmissive,Me=M.transparent;p.setupLightsView(H),ee===!0&&te.setGlobalState(y.clippingPlanes,H),G&&he.viewport(A.copy(G)),D.length>0&&Kt(D,U,H),ie.length>0&&Kt(ie,U,H),Me.length>0&&Kt(Me,U,H),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function nn(M,U,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new ns(1,1,{generateMipmaps:!0,type:j.has("EXT_color_buffer_half_float")||j.has("EXT_color_buffer_float")?Vo:ts,minFilter:cr,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace}));let ie=p.state.transmissionRenderTarget[G.id],Me=G.viewport||A;ie.setSize(Me.z,Me.w);let Re=y.getRenderTarget();y.setRenderTarget(ie),y.getClearColor(k),Y=y.getClearAlpha(),Y<1&&y.setClearColor(16777215,.5),y.clear(),J&&De.render(H);let Le=y.toneMapping;y.toneMapping=ps;let Fe=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),ee===!0&&te.setGlobalState(y.clippingPlanes,G),Kt(M,H,G),b.updateMultisampleRenderTarget(ie),b.updateRenderTargetMipmap(ie),j.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let Pe=0,Ke=U.length;Pe<Ke;Pe++){let ut=U[Pe],tt=ut.object,mt=ut.geometry,it=ut.material,Ce=ut.group;if(it.side===Tn&&tt.layers.test(G.layers)){let Et=it.side;it.side=kt,it.needsUpdate=!0,co(tt,H,G,mt,it,Ce),it.side=Et,it.needsUpdate=!0,He=!0}}He===!0&&(b.updateMultisampleRenderTarget(ie),b.updateRenderTargetMipmap(ie))}y.setRenderTarget(Re),y.setClearColor(k,Y),Fe!==void 0&&(G.viewport=Fe),y.toneMapping=Le}function Kt(M,U,H){let G=U.isScene===!0?U.overrideMaterial:null;for(let D=0,ie=M.length;D<ie;D++){let Me=M[D],Re=Me.object,Le=Me.geometry,Fe=G===null?Me.material:G,He=Me.group;Re.layers.test(H.layers)&&co(Re,U,H,Le,Fe,He)}}function co(M,U,H,G,D,ie){M.onBeforeRender(y,U,H,G,D,ie),M.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),D.onBeforeRender(y,U,H,G,M,ie),D.transparent===!0&&D.side===Tn&&D.forceSinglePass===!1?(D.side=kt,D.needsUpdate=!0,y.renderBufferDirect(H,U,G,D,M,ie),D.side=ui,D.needsUpdate=!0,y.renderBufferDirect(H,U,G,D,M,ie),D.side=Tn):y.renderBufferDirect(H,U,G,D,M,ie),M.onAfterRender(y,U,H,G,D,ie)}function un(M,U,H){U.isScene!==!0&&(U=Ye);let G=fe.get(M),D=p.state.lights,ie=p.state.shadowsArray,Me=D.state.version,Re=Te.getParameters(M,D.state,ie,U,H),Le=Te.getProgramCacheKey(Re),Fe=G.programs;G.environment=M.isMeshStandardMaterial?U.environment:null,G.fog=U.fog,G.envMap=(M.isMeshStandardMaterial?B:x).get(M.envMap||G.environment),G.envMapRotation=G.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,Fe===void 0&&(M.addEventListener("dispose",Oe),Fe=new Map,G.programs=Fe);let He=Fe.get(Le);if(He!==void 0){if(G.currentProgram===He&&G.lightsStateVersion===Me)return dn(M,Re),He}else Re.uniforms=Te.getUniforms(M),M.onBeforeCompile(Re,y),He=Te.acquireProgram(Re,Le),Fe.set(Le,He),G.uniforms=Re.uniforms;let Pe=G.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Pe.clippingPlanes=te.uniform),dn(M,Re),G.needsLights=fn(M),G.lightsStateVersion=Me,G.needsLights&&(Pe.ambientLightColor.value=D.state.ambient,Pe.lightProbe.value=D.state.probe,Pe.directionalLights.value=D.state.directional,Pe.directionalLightShadows.value=D.state.directionalShadow,Pe.spotLights.value=D.state.spot,Pe.spotLightShadows.value=D.state.spotShadow,Pe.rectAreaLights.value=D.state.rectArea,Pe.ltc_1.value=D.state.rectAreaLTC1,Pe.ltc_2.value=D.state.rectAreaLTC2,Pe.pointLights.value=D.state.point,Pe.pointLightShadows.value=D.state.pointShadow,Pe.hemisphereLights.value=D.state.hemi,Pe.directionalShadowMap.value=D.state.directionalShadowMap,Pe.directionalShadowMatrix.value=D.state.directionalShadowMatrix,Pe.spotShadowMap.value=D.state.spotShadowMap,Pe.spotLightMatrix.value=D.state.spotLightMatrix,Pe.spotLightMap.value=D.state.spotLightMap,Pe.pointShadowMap.value=D.state.pointShadowMap,Pe.pointShadowMatrix.value=D.state.pointShadowMatrix),G.currentProgram=He,G.uniformsList=null,He}function sn(M){if(M.uniformsList===null){let U=M.currentProgram.getUniforms();M.uniformsList=kr.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function dn(M,U){let H=fe.get(M);H.outputColorSpace=U.outputColorSpace,H.batching=U.batching,H.batchingColor=U.batchingColor,H.instancing=U.instancing,H.instancingColor=U.instancingColor,H.instancingMorph=U.instancingMorph,H.skinning=U.skinning,H.morphTargets=U.morphTargets,H.morphNormals=U.morphNormals,H.morphColors=U.morphColors,H.morphTargetsCount=U.morphTargetsCount,H.numClippingPlanes=U.numClippingPlanes,H.numIntersection=U.numClipIntersection,H.vertexAlphas=U.vertexAlphas,H.vertexTangents=U.vertexTangents,H.toneMapping=U.toneMapping}function Qo(M,U,H,G,D){U.isScene!==!0&&(U=Ye),b.resetTextureUnits();let ie=U.fog,Me=G.isMeshStandardMaterial?U.environment:null,Re=P===null?y.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:jr,Le=(G.isMeshStandardMaterial?B:x).get(G.envMap||Me),Fe=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,He=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Pe=!!H.morphAttributes.position,Ke=!!H.morphAttributes.normal,ut=!!H.morphAttributes.color,tt=ps;G.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(tt=y.toneMapping);let mt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,it=mt!==void 0?mt.length:0,Ce=fe.get(G),Et=p.state.lights;if(ee===!0&&(we===!0||M!==v)){let vt=M===v&&G.id===S;te.setState(G,M,vt)}let Qe=!1;G.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==Et.state.version||Ce.outputColorSpace!==Re||D.isBatchedMesh&&Ce.batching===!1||!D.isBatchedMesh&&Ce.batching===!0||D.isBatchedMesh&&Ce.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&Ce.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&Ce.instancing===!1||!D.isInstancedMesh&&Ce.instancing===!0||D.isSkinnedMesh&&Ce.skinning===!1||!D.isSkinnedMesh&&Ce.skinning===!0||D.isInstancedMesh&&Ce.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&Ce.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&Ce.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&Ce.instancingMorph===!1&&D.morphTexture!==null||Ce.envMap!==Le||G.fog===!0&&Ce.fog!==ie||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==te.numPlanes||Ce.numIntersection!==te.numIntersection)||Ce.vertexAlphas!==Fe||Ce.vertexTangents!==He||Ce.morphTargets!==Pe||Ce.morphNormals!==Ke||Ce.morphColors!==ut||Ce.toneMapping!==tt||Ce.morphTargetsCount!==it)&&(Qe=!0):(Qe=!0,Ce.__version=G.version);let Qt=Ce.currentProgram;Qe===!0&&(Qt=un(G,U,D));let jt=!1,gt=!1,Vt=!1,ct=Qt.getUniforms(),Ct=Ce.uniforms;if(he.useProgram(Qt.program)&&(jt=!0,gt=!0,Vt=!0),G.id!==S&&(S=G.id,gt=!0),jt||v!==M){he.buffers.depth.getReversed()?(se.copy(M.projectionMatrix),Mp(se),Sp(se),ct.setValue(T,"projectionMatrix",se)):ct.setValue(T,"projectionMatrix",M.projectionMatrix),ct.setValue(T,"viewMatrix",M.matrixWorldInverse);let _n=ct.map.cameraPosition;_n!==void 0&&_n.setValue(T,Be.setFromMatrixPosition(M.matrixWorld)),_e.logarithmicDepthBuffer&&ct.setValue(T,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ct.setValue(T,"isOrthographic",M.isOrthographicCamera===!0),v!==M&&(v=M,gt=!0,Vt=!0)}if(D.isSkinnedMesh){ct.setOptional(T,D,"bindMatrix"),ct.setOptional(T,D,"bindMatrixInverse");let vt=D.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),ct.setValue(T,"boneTexture",vt.boneTexture,b))}D.isBatchedMesh&&(ct.setOptional(T,D,"batchingTexture"),ct.setValue(T,"batchingTexture",D._matricesTexture,b),ct.setOptional(T,D,"batchingIdTexture"),ct.setValue(T,"batchingIdTexture",D._indirectTexture,b),ct.setOptional(T,D,"batchingColorTexture"),D._colorsTexture!==null&&ct.setValue(T,"batchingColorTexture",D._colorsTexture,b));let Ft=H.morphAttributes;if((Ft.position!==void 0||Ft.normal!==void 0||Ft.color!==void 0)&&Ve.update(D,H,Qt),(gt||Ce.receiveShadow!==D.receiveShadow)&&(Ce.receiveShadow=D.receiveShadow,ct.setValue(T,"receiveShadow",D.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Ct.envMap.value=Le,Ct.flipEnvMap.value=Le.isCubeTexture&&Le.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&U.environment!==null&&(Ct.envMapIntensity.value=U.environmentIntensity),gt&&(ct.setValue(T,"toneMappingExposure",y.toneMappingExposure),Ce.needsLights&&gi(Ct,Vt),ie&&G.fog===!0&&ae.refreshFogUniforms(Ct,ie),ae.refreshMaterialUniforms(Ct,G,W,Q,p.state.transmissionRenderTarget[M.id]),kr.upload(T,sn(Ce),Ct,b)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(kr.upload(T,sn(Ce),Ct,b),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ct.setValue(T,"center",D.center),ct.setValue(T,"modelViewMatrix",D.modelViewMatrix),ct.setValue(T,"normalMatrix",D.normalMatrix),ct.setValue(T,"modelMatrix",D.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let vt=G.uniformsGroups;for(let _n=0,Bt=vt.length;_n<Bt;_n++){let rn=vt[_n];L.update(rn,Qt),L.bind(rn,Qt)}}return Qt}function gi(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function fn(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(M,U,H){fe.get(M.texture).__webglTexture=U,fe.get(M.depthTexture).__webglTexture=H;let G=fe.get(M);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=H===void 0,G.__autoAllocateDepthBuffer||j.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,U){let H=fe.get(M);H.__webglFramebuffer=U,H.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(M,U=0,H=0){P=M,C=U,I=H;let G=!0,D=null,ie=!1,Me=!1;if(M){let Le=fe.get(M);if(Le.__useDefaultFramebuffer!==void 0)he.bindFramebuffer(T.FRAMEBUFFER,null),G=!1;else if(Le.__webglFramebuffer===void 0)b.setupRenderTarget(M);else if(Le.__hasExternalTextures)b.rebindTextures(M,fe.get(M.texture).__webglTexture,fe.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Pe=M.depthTexture;if(Le.__boundDepthTexture!==Pe){if(Pe!==null&&fe.has(Pe)&&(M.width!==Pe.image.width||M.height!==Pe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(M)}}let Fe=M.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(Me=!0);let He=fe.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(He[U])?D=He[U][H]:D=He[U],ie=!0):M.samples>0&&b.useMultisampledRTT(M)===!1?D=fe.get(M).__webglMultisampledFramebuffer:Array.isArray(He)?D=He[H]:D=He,A.copy(M.viewport),z.copy(M.scissor),F=M.scissorTest}else A.copy(ye).multiplyScalar(W).floor(),z.copy(Xe).multiplyScalar(W).floor(),F=Je;if(he.bindFramebuffer(T.FRAMEBUFFER,D)&&G&&he.drawBuffers(M,D),he.viewport(A),he.scissor(z),he.setScissorTest(F),ie){let Le=fe.get(M.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+U,Le.__webglTexture,H)}else if(Me){let Le=fe.get(M.texture),Fe=U||0;T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,Le.__webglTexture,H||0,Fe)}S=-1},this.readRenderTargetPixels=function(M,U,H,G,D,ie,Me){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=fe.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Me!==void 0&&(Re=Re[Me]),Re){he.bindFramebuffer(T.FRAMEBUFFER,Re);try{let Le=M.texture,Fe=Le.format,He=Le.type;if(!_e.textureFormatReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_e.textureTypeReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-G&&H>=0&&H<=M.height-D&&T.readPixels(U,H,G,D,ke.convert(Fe),ke.convert(He),ie)}finally{let Le=P!==null?fe.get(P).__webglFramebuffer:null;he.bindFramebuffer(T.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(M,U,H,G,D,ie,Me){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=fe.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Me!==void 0&&(Re=Re[Me]),Re){let Le=M.texture,Fe=Le.format,He=Le.type;if(!_e.textureFormatReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_e.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=M.width-G&&H>=0&&H<=M.height-D){he.bindFramebuffer(T.FRAMEBUFFER,Re);let Pe=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,Pe),T.bufferData(T.PIXEL_PACK_BUFFER,ie.byteLength,T.STREAM_READ),T.readPixels(U,H,G,D,ke.convert(Fe),ke.convert(He),0);let Ke=P!==null?fe.get(P).__webglFramebuffer:null;he.bindFramebuffer(T.FRAMEBUFFER,Ke);let ut=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await vp(T,ut,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,Pe),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,ie),T.deleteBuffer(Pe),T.deleteSync(ut),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(M,U=null,H=0){M.isTexture!==!0&&(vo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,M=arguments[1]);let G=Math.pow(2,-H),D=Math.floor(M.image.width*G),ie=Math.floor(M.image.height*G),Me=U!==null?U.x:0,Re=U!==null?U.y:0;b.setTexture2D(M,0),T.copyTexSubImage2D(T.TEXTURE_2D,H,0,0,Me,Re,D,ie),he.unbindTexture()},this.copyTextureToTexture=function(M,U,H=null,G=null,D=0){M.isTexture!==!0&&(vo("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,M=arguments[1],U=arguments[2],D=arguments[3]||0,H=null);let ie,Me,Re,Le,Fe,He,Pe,Ke,ut,tt=M.isCompressedTexture?M.mipmaps[D]:M.image;H!==null?(ie=H.max.x-H.min.x,Me=H.max.y-H.min.y,Re=H.isBox3?H.max.z-H.min.z:1,Le=H.min.x,Fe=H.min.y,He=H.isBox3?H.min.z:0):(ie=tt.width,Me=tt.height,Re=tt.depth||1,Le=0,Fe=0,He=0),G!==null?(Pe=G.x,Ke=G.y,ut=G.z):(Pe=0,Ke=0,ut=0);let mt=ke.convert(U.format),it=ke.convert(U.type),Ce;U.isData3DTexture?(b.setTexture3D(U,0),Ce=T.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(b.setTexture2DArray(U,0),Ce=T.TEXTURE_2D_ARRAY):(b.setTexture2D(U,0),Ce=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,U.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,U.unpackAlignment);let Et=T.getParameter(T.UNPACK_ROW_LENGTH),Qe=T.getParameter(T.UNPACK_IMAGE_HEIGHT),Qt=T.getParameter(T.UNPACK_SKIP_PIXELS),jt=T.getParameter(T.UNPACK_SKIP_ROWS),gt=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,tt.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,tt.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Le),T.pixelStorei(T.UNPACK_SKIP_ROWS,Fe),T.pixelStorei(T.UNPACK_SKIP_IMAGES,He);let Vt=M.isDataArrayTexture||M.isData3DTexture,ct=U.isDataArrayTexture||U.isData3DTexture;if(M.isRenderTargetTexture||M.isDepthTexture){let Ct=fe.get(M),Ft=fe.get(U),vt=fe.get(Ct.__renderTarget),_n=fe.get(Ft.__renderTarget);he.bindFramebuffer(T.READ_FRAMEBUFFER,vt.__webglFramebuffer),he.bindFramebuffer(T.DRAW_FRAMEBUFFER,_n.__webglFramebuffer);for(let Bt=0;Bt<Re;Bt++)Vt&&T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,fe.get(M).__webglTexture,D,He+Bt),M.isDepthTexture?(ct&&T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,fe.get(U).__webglTexture,D,ut+Bt),T.blitFramebuffer(Le,Fe,ie,Me,Pe,Ke,ie,Me,T.DEPTH_BUFFER_BIT,T.NEAREST)):ct?T.copyTexSubImage3D(Ce,D,Pe,Ke,ut+Bt,Le,Fe,ie,Me):T.copyTexSubImage2D(Ce,D,Pe,Ke,ut+Bt,Le,Fe,ie,Me);he.bindFramebuffer(T.READ_FRAMEBUFFER,null),he.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else ct?M.isDataTexture||M.isData3DTexture?T.texSubImage3D(Ce,D,Pe,Ke,ut,ie,Me,Re,mt,it,tt.data):U.isCompressedArrayTexture?T.compressedTexSubImage3D(Ce,D,Pe,Ke,ut,ie,Me,Re,mt,tt.data):T.texSubImage3D(Ce,D,Pe,Ke,ut,ie,Me,Re,mt,it,tt):M.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,D,Pe,Ke,ie,Me,mt,it,tt.data):M.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,D,Pe,Ke,tt.width,tt.height,mt,tt.data):T.texSubImage2D(T.TEXTURE_2D,D,Pe,Ke,ie,Me,mt,it,tt);T.pixelStorei(T.UNPACK_ROW_LENGTH,Et),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,Qe),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Qt),T.pixelStorei(T.UNPACK_SKIP_ROWS,jt),T.pixelStorei(T.UNPACK_SKIP_IMAGES,gt),D===0&&U.generateMipmaps&&T.generateMipmap(Ce),he.unbindTexture()},this.copyTextureToTexture3D=function(M,U,H=null,G=null,D=0){return M.isTexture!==!0&&(vo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,G=arguments[1]||null,M=arguments[2],U=arguments[3],D=arguments[4]||0),vo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(M,U,H,G,D)},this.initRenderTarget=function(M){fe.get(M).__webglFramebuffer===void 0&&b.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?b.setTextureCube(M,0):M.isData3DTexture?b.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?b.setTexture2DArray(M,0):b.setTexture2D(M,0),he.unbindTexture()},this.resetState=function(){C=0,I=0,P=null,he.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}};var qa=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new We(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Zr=class extends Gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pi,this.environmentIntensity=1,this.environmentRotation=new pi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ya=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Gl,this.updateRanges=[],this.version=0,this.uuid=hi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},qt=new w,Lo=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Rn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Rn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Rn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Rn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Rn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array),r=at(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Nt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Do=class extends is{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new We(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Lr,po=new w,Dr=new w,Ur=new w,Nr=new le,mo=new le,ef=new nt,va=new w,go=new w,Ma=new w,yd=new le,Kc=new le,vd=new le,Za=class extends Gt{constructor(e=new Do){if(super(),this.isSprite=!0,this.type="Sprite",Lr===void 0){Lr=new Jt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ya(t,5);Lr.setIndex([0,1,2,0,2,3]),Lr.setAttribute("position",new Lo(n,3,0,!1)),Lr.setAttribute("uv",new Lo(n,2,3,!1))}this.geometry=Lr,this.material=e,this.center=new le(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Dr.setFromMatrixScale(this.matrixWorld),ef.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ur.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Dr.multiplyScalar(-Ur.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;Sa(va.set(-.5,-.5,0),Ur,o,Dr,s,r),Sa(go.set(.5,-.5,0),Ur,o,Dr,s,r),Sa(Ma.set(.5,.5,0),Ur,o,Dr,s,r),yd.set(0,0),Kc.set(1,0),vd.set(1,1);let a=e.ray.intersectTriangle(va,go,Ma,!1,po);if(a===null&&(Sa(go.set(-.5,.5,0),Ur,o,Dr,s,r),Kc.set(0,1),a=e.ray.intersectTriangle(va,Ma,go,!1,po),a===null))return;let c=e.ray.origin.distanceTo(po);c<e.near||c>e.far||t.push({distance:c,point:po.clone(),uv:us.getInterpolation(po,va,go,Ma,yd,Kc,vd,new le),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Sa(i,e,t,n,s,r){Nr.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(mo.x=r*Nr.x-s*Nr.y,mo.y=s*Nr.x+r*Nr.y):mo.copy(Nr),i.copy(e),i.x+=mo.x,i.y+=mo.y,i.applyMatrix4(ef)}var oh=class extends Zt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=cn,h=cn,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Uo=class extends Nt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Fr=new nt,Md=new nt,Ea=[],Sd=new fi,gx=new nt,_o=new re,xo=new hr,dr=class extends re{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Uo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,gx)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new fi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Fr),Sd.copy(e.boundingBox).applyMatrix4(Fr),this.boundingBox.union(Sd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new hr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Fr),xo.copy(e.boundingSphere).applyMatrix4(Fr),this.boundingSphere.union(xo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(_o.geometry=this.geometry,_o.material=this.material,_o.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xo.copy(this.boundingSphere),xo.applyMatrix4(n),e.ray.intersectsSphere(xo)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Fr),Md.multiplyMatrices(n,Fr),_o.matrixWorld=Md,_o.raycast(e,Ea);for(let o=0,a=Ea.length;o<a;o++){let c=Ea[o];c.instanceId=r,c.object=this,t.push(c)}Ea.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Uo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new oh(new Float32Array(s*this.count),s,this.count,Ih,li));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var _s=class extends Zt{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},mn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new le:new w);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new w,s=[],r=[],o=[],a=new w,c=new nt;for(let f=0;f<=e;f++){let g=f/e;s[f]=this.getTangentAt(g,new w)}r[0]=new w,o[0]=new w;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Pt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Pt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},No=class extends mn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new le){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ah=class extends No{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Fh(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var ba=new w,Qc=new Fh,jc=new Fh,el=new Fh,Fo=class extends mn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new w){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(ba.subVectors(s[0],s[1]).add(s[0]),l=ba);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(ba.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=ba),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Qc.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,m),jc.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,m),el.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Qc.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),jc.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),el.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(Qc.calc(c),jc.calc(c),el.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new w().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Ed(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function _x(i,e){let t=1-i;return t*t*e}function xx(i,e){return 2*(1-i)*i*e}function yx(i,e){return i*i*e}function wo(i,e,t,n){return _x(i,e)+xx(i,t)+yx(i,n)}function vx(i,e){let t=1-i;return t*t*t*e}function Mx(i,e){let t=1-i;return 3*t*t*i*e}function Sx(i,e){return 3*(1-i)*i*i*e}function Ex(i,e){return i*i*i*e}function To(i,e,t,n,s){return vx(i,e)+Mx(i,t)+Sx(i,n)+Ex(i,s)}var Ja=class extends mn{constructor(e=new le,t=new le,n=new le,s=new le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new le){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(To(e,s.x,r.x,o.x,a.x),To(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ch=class extends mn{constructor(e=new w,t=new w,n=new w,s=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new w){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(To(e,s.x,r.x,o.x,a.x),To(e,s.y,r.y,o.y,a.y),To(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},$a=class extends mn{constructor(e=new le,t=new le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new le){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new le){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},lh=class extends mn{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ka=class extends mn{constructor(e=new le,t=new le,n=new le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new le){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(wo(e,s.x,r.x,o.x),wo(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Qa=class extends mn{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(wo(e,s.x,r.x,o.x),wo(e,s.y,r.y,o.y),wo(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ja=class extends mn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new le){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Ed(a,c.x,l.x,h.x,u.x),Ed(a,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new le().fromArray(s))}return this}},ec=Object.freeze({__proto__:null,ArcCurve:ah,CatmullRomCurve3:Fo,CubicBezierCurve:Ja,CubicBezierCurve3:ch,EllipseCurve:No,LineCurve:$a,LineCurve3:lh,QuadraticBezierCurve:Ka,QuadraticBezierCurve3:Qa,SplineCurve:ja}),hh=class extends mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ec[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new ec[s.type]().fromJSON(s))}return this}},Jr=class extends hh{constructor(e){super(),this.type="Path",this.currentPoint=new le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new $a(this.currentPoint.clone(),new le(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new Ka(this.currentPoint.clone(),new le(e,t),new le(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new Ja(this.currentPoint.clone(),new le(e,t),new le(n,s),new le(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new ja(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){let l=new No(e,t,n,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}};var tc=class i extends Jt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new w,h=new le;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*s;l.x=e*Math.cos(f),l.y=e*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new xt(o,3)),this.setAttribute("normal",new xt(a,3)),this.setAttribute("uv",new xt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},ge=class i extends Jt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,_=[],m=n/2,p=0;R(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new xt(u,3)),this.setAttribute("normal",new xt(d,3)),this.setAttribute("uv",new xt(f,2));function R(){let y=new w,N=new w,C=0,I=(t-e)/n;for(let P=0;P<=r;P++){let S=[],v=P/r,A=v*(t-e)+e;for(let z=0;z<=s;z++){let F=z/s,k=F*c+a,Y=Math.sin(k),O=Math.cos(k);N.x=A*Y,N.y=-v*n+m,N.z=A*O,u.push(N.x,N.y,N.z),y.set(Y,I,O).normalize(),d.push(y.x,y.y,y.z),f.push(F,1-v),S.push(g++)}_.push(S)}for(let P=0;P<s;P++)for(let S=0;S<r;S++){let v=_[S][P],A=_[S+1][P],z=_[S+1][P+1],F=_[S][P+1];(e>0||S!==0)&&(h.push(v,A,F),C+=3),(t>0||S!==r-1)&&(h.push(A,z,F),C+=3)}l.addGroup(p,C,0),p+=C}function E(y){let N=g,C=new le,I=new w,P=0,S=y===!0?e:t,v=y===!0?1:-1;for(let z=1;z<=s;z++)u.push(0,m*v,0),d.push(0,v,0),f.push(.5,.5),g++;let A=g;for(let z=0;z<=s;z++){let k=z/s*c+a,Y=Math.cos(k),O=Math.sin(k);I.x=S*O,I.y=m*v,I.z=S*Y,u.push(I.x,I.y,I.z),d.push(0,v,0),C.x=Y*.5+.5,C.y=O*.5*v+.5,f.push(C.x,C.y),g++}for(let z=0;z<s;z++){let F=N+z,k=A+z;y===!0?h.push(k,k+1,F):h.push(k+1,k,F),P+=3}l.addGroup(p,P,y===!0?1:2),p+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Bo=class extends Jr{constructor(e){super(e),this.uuid=hi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Jr().fromJSON(s))}return this}},bx={triangulate:function(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=tf(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,f;if(n&&(r=Cx(i,e,r,t)),i.length>80*t){a=l=i[0],c=h=i[1];for(let g=t;g<s;g+=t)u=i[g],d=i[g+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return Oo(r,o,t,a,c,f,0),o}};function tf(i,e,t,n,s){let r,o;if(s===zx(i,e,t,n)>0)for(r=e;r<t;r+=n)o=bd(r,i[r],i[r+1],o);else for(r=t-n;r>=e;r-=n)o=bd(r,i[r],i[r+1],o);return o&&gc(o,o.next)&&(zo(o),o=o.next),o}function fr(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(gc(t,t.next)||yt(t.prev,t,t.next)===0)){if(zo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Oo(i,e,t,n,s,r,o){if(!i)return;!o&&r&&Ux(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?Tx(i,n,s,r):wx(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(l.i/t|0),zo(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Rx(fr(i),e,t),Oo(i,e,t,n,s,r,2)):o===2&&Ax(i,e,t,n,s,r):Oo(fr(i),e,t,n,s,r,1);break}}}function wx(i){let e=i.prev,t=i,n=i.next;if(yt(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l,g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Or(s,a,r,c,o,l,g.x,g.y)&&yt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Tx(i,e,t,n){let s=i.prev,r=i,o=i.next;if(yt(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,_=a>c?a>l?a:l:c>l?c:l,m=h>u?h>d?h:d:u>d?u:d,p=uh(f,g,e,t,n),R=uh(_,m,e,t,n),E=i.prevZ,y=i.nextZ;for(;E&&E.z>=p&&y&&y.z<=R;){if(E.x>=f&&E.x<=_&&E.y>=g&&E.y<=m&&E!==s&&E!==o&&Or(a,h,c,u,l,d,E.x,E.y)&&yt(E.prev,E,E.next)>=0||(E=E.prevZ,y.x>=f&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Or(a,h,c,u,l,d,y.x,y.y)&&yt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;E&&E.z>=p;){if(E.x>=f&&E.x<=_&&E.y>=g&&E.y<=m&&E!==s&&E!==o&&Or(a,h,c,u,l,d,E.x,E.y)&&yt(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;y&&y.z<=R;){if(y.x>=f&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Or(a,h,c,u,l,d,y.x,y.y)&&yt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Rx(i,e,t){let n=i;do{let s=n.prev,r=n.next.next;!gc(s,r)&&nf(s,n,n.next,r)&&Ho(s,r)&&Ho(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),zo(n),zo(n.next),n=i=r),n=n.next}while(n!==i);return fr(n)}function Ax(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Bx(o,a)){let c=sf(o,a);o=fr(o,o.next),c=fr(c,c.next),Oo(o,e,t,n,s,r,0),Oo(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Cx(i,e,t,n){let s=[],r,o,a,c,l;for(r=0,o=e.length;r<o;r++)a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=tf(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(Fx(l));for(s.sort(Ix),r=0;r<s.length;r++)t=Px(s[r],t);return t}function Ix(i,e){return i.x-e.x}function Px(i,e){let t=Lx(i,e);if(!t)return e;let n=sf(t,i);return fr(n,n.next),fr(t,t.next)}function Lx(i,e){let t=e,n=-1/0,s,r=i.x,o=i.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){let d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,s=t.x<t.next.x?t:t.next,d===r))return s}t=t.next}while(t!==e);if(!s)return null;let a=s,c=s.x,l=s.y,h=1/0,u;t=s;do r>=t.x&&t.x>=c&&r!==t.x&&Or(o<l?r:n,o,c,l,o<l?n:r,o,t.x,t.y)&&(u=Math.abs(o-t.y)/(r-t.x),Ho(t,i)&&(u<h||u===h&&(t.x>s.x||t.x===s.x&&Dx(s,t)))&&(s=t,h=u)),t=t.next;while(t!==a);return s}function Dx(i,e){return yt(i.prev,i,e.prev)<0&&yt(e.next,i,i.next)<0}function Ux(i,e,t,n){let s=i;do s.z===0&&(s.z=uh(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Nx(s)}function Nx(i){let e,t,n,s,r,o,a,c,l=1;do{for(t=i,i=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<l&&(a++,n=n.nextZ,!!n);e++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,l*=2}while(o>1);return i}function uh(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Fx(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Or(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function Bx(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Ox(i,e)&&(Ho(i,e)&&Ho(e,i)&&Hx(i,e)&&(yt(i.prev,i,e.prev)||yt(i,e.prev,e))||gc(i,e)&&yt(i.prev,i,i.next)>0&&yt(e.prev,e,e.next)>0)}function yt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function gc(i,e){return i.x===e.x&&i.y===e.y}function nf(i,e,t,n){let s=Ta(yt(i,e,t)),r=Ta(yt(i,e,n)),o=Ta(yt(t,n,i)),a=Ta(yt(t,n,e));return!!(s!==r&&o!==a||s===0&&wa(i,t,e)||r===0&&wa(i,n,e)||o===0&&wa(t,i,n)||a===0&&wa(t,e,n))}function wa(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Ta(i){return i>0?1:i<0?-1:0}function Ox(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&nf(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ho(i,e){return yt(i.prev,i,i.next)<0?yt(i,e,i.next)>=0&&yt(i,i.prev,e)>=0:yt(i,e,i.prev)<0||yt(i,i.next,e)<0}function Hx(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function sf(i,e){let t=new dh(i.i,i.x,i.y),n=new dh(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function bd(i,e,t,n){let s=new dh(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function zo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function dh(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function zx(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Ro=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];wd(e),Td(n,e);let o=e.length;t.forEach(wd);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,Td(n,t[c]);let a=bx.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function wd(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Td(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var nc=class i extends Jt{constructor(e=new Bo([new le(.5,.5),new le(-.5,.5),new le(-.5,-.5),new le(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let a=0,c=e.length;a<c;a++){let l=e[a];o(l)}this.setAttribute("position",new xt(s,3)),this.setAttribute("uv",new xt(r,2)),this.computeVertexNormals();function o(a){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,R=t.UVGenerator!==void 0?t.UVGenerator:kx,E,y=!1,N,C,I,P;p&&(E=p.getSpacedPoints(h),y=!0,d=!1,N=p.computeFrenetFrames(h,!1),C=new w,I=new w,P=new w),d||(m=0,f=0,g=0,_=0);let S=a.extractPoints(l),v=S.shape,A=S.holes;if(!Ro.isClockWise(v)){v=v.reverse();for(let J=0,ne=A.length;J<ne;J++){let T=A[J];Ro.isClockWise(T)&&(A[J]=T.reverse())}}let F=Ro.triangulateShape(v,A),k=v;for(let J=0,ne=A.length;J<ne;J++){let T=A[J];v=v.concat(T)}function Y(J,ne,T){return ne||console.error("THREE.ExtrudeGeometry: vec does not exist"),J.clone().addScaledVector(ne,T)}let O=v.length,Q=F.length;function W(J,ne,T){let Ae,j,_e,he=J.x-ne.x,Ne=J.y-ne.y,fe=T.x-J.x,b=T.y-J.y,x=he*he+Ne*Ne,B=he*b-Ne*fe;if(Math.abs(B)>Number.EPSILON){let q=Math.sqrt(x),$=Math.sqrt(fe*fe+b*b),Z=ne.x-Ne/q,Te=ne.y+he/q,ae=T.x-b/$,me=T.y+fe/$,et=((ae-Z)*b-(me-Te)*fe)/(he*b-Ne*fe);Ae=Z+he*et-J.x,j=Te+Ne*et-J.y;let te=Ae*Ae+j*j;if(te<=2)return new le(Ae,j);_e=Math.sqrt(te/2)}else{let q=!1;he>Number.EPSILON?fe>Number.EPSILON&&(q=!0):he<-Number.EPSILON?fe<-Number.EPSILON&&(q=!0):Math.sign(Ne)===Math.sign(b)&&(q=!0),q?(Ae=-Ne,j=he,_e=Math.sqrt(x)):(Ae=he,j=Ne,_e=Math.sqrt(x/2))}return new le(Ae/_e,j/_e)}let oe=[];for(let J=0,ne=k.length,T=ne-1,Ae=J+1;J<ne;J++,T++,Ae++)T===ne&&(T=0),Ae===ne&&(Ae=0),oe[J]=W(k[J],k[T],k[Ae]);let ue=[],ye,Xe=oe.concat();for(let J=0,ne=A.length;J<ne;J++){let T=A[J];ye=[];for(let Ae=0,j=T.length,_e=j-1,he=Ae+1;Ae<j;Ae++,_e++,he++)_e===j&&(_e=0),he===j&&(he=0),ye[Ae]=W(T[Ae],T[_e],T[he]);ue.push(ye),Xe=Xe.concat(ye)}for(let J=0;J<m;J++){let ne=J/m,T=f*Math.cos(ne*Math.PI/2),Ae=g*Math.sin(ne*Math.PI/2)+_;for(let j=0,_e=k.length;j<_e;j++){let he=Y(k[j],oe[j],Ae);se(he.x,he.y,-T)}for(let j=0,_e=A.length;j<_e;j++){let he=A[j];ye=ue[j];for(let Ne=0,fe=he.length;Ne<fe;Ne++){let b=Y(he[Ne],ye[Ne],Ae);se(b.x,b.y,-T)}}}let Je=g+_;for(let J=0;J<O;J++){let ne=d?Y(v[J],Xe[J],Je):v[J];y?(I.copy(N.normals[0]).multiplyScalar(ne.x),C.copy(N.binormals[0]).multiplyScalar(ne.y),P.copy(E[0]).add(I).add(C),se(P.x,P.y,P.z)):se(ne.x,ne.y,0)}for(let J=1;J<=h;J++)for(let ne=0;ne<O;ne++){let T=d?Y(v[ne],Xe[ne],Je):v[ne];y?(I.copy(N.normals[J]).multiplyScalar(T.x),C.copy(N.binormals[J]).multiplyScalar(T.y),P.copy(E[J]).add(I).add(C),se(P.x,P.y,P.z)):se(T.x,T.y,u/h*J)}for(let J=m-1;J>=0;J--){let ne=J/m,T=f*Math.cos(ne*Math.PI/2),Ae=g*Math.sin(ne*Math.PI/2)+_;for(let j=0,_e=k.length;j<_e;j++){let he=Y(k[j],oe[j],Ae);se(he.x,he.y,u+T)}for(let j=0,_e=A.length;j<_e;j++){let he=A[j];ye=ue[j];for(let Ne=0,fe=he.length;Ne<fe;Ne++){let b=Y(he[Ne],ye[Ne],Ae);y?se(b.x,b.y+E[h-1].y,E[h-1].x+T):se(b.x,b.y,u+T)}}}X(),ee();function X(){let J=s.length/3;if(d){let ne=0,T=O*ne;for(let Ae=0;Ae<Q;Ae++){let j=F[Ae];Ie(j[2]+T,j[1]+T,j[0]+T)}ne=h+m*2,T=O*ne;for(let Ae=0;Ae<Q;Ae++){let j=F[Ae];Ie(j[0]+T,j[1]+T,j[2]+T)}}else{for(let ne=0;ne<Q;ne++){let T=F[ne];Ie(T[2],T[1],T[0])}for(let ne=0;ne<Q;ne++){let T=F[ne];Ie(T[0]+O*h,T[1]+O*h,T[2]+O*h)}}n.addGroup(J,s.length/3-J,0)}function ee(){let J=s.length/3,ne=0;we(k,ne),ne+=k.length;for(let T=0,Ae=A.length;T<Ae;T++){let j=A[T];we(j,ne),ne+=j.length}n.addGroup(J,s.length/3-J,1)}function we(J,ne){let T=J.length;for(;--T>=0;){let Ae=T,j=T-1;j<0&&(j=J.length-1);for(let _e=0,he=h+m*2;_e<he;_e++){let Ne=O*_e,fe=O*(_e+1),b=ne+Ae+Ne,x=ne+j+Ne,B=ne+j+fe,q=ne+Ae+fe;Be(b,x,B,q)}}}function se(J,ne,T){c.push(J),c.push(ne),c.push(T)}function Ie(J,ne,T){ze(J),ze(ne),ze(T);let Ae=s.length/3,j=R.generateTopUV(n,s,Ae-3,Ae-2,Ae-1);Ye(j[0]),Ye(j[1]),Ye(j[2])}function Be(J,ne,T,Ae){ze(J),ze(ne),ze(Ae),ze(ne),ze(T),ze(Ae);let j=s.length/3,_e=R.generateSideWallUV(n,s,j-6,j-3,j-2,j-1);Ye(_e[0]),Ye(_e[1]),Ye(_e[3]),Ye(_e[1]),Ye(_e[2]),Ye(_e[3])}function ze(J){s.push(c[J*3+0]),s.push(c[J*3+1]),s.push(c[J*3+2])}function Ye(J){r.push(J.x),r.push(J.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Gx(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new ec[s.type]().fromJSON(s)),new i(n,e.options)}},kx={generateTopUV:function(i,e,t,n,s){let r=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new le(r,o),new le(a,c),new le(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){let o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[s*3],f=e[s*3+1],g=e[s*3+2],_=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new le(o,1-c),new le(l,1-u),new le(d,1-g),new le(_,1-p)]:[new le(a,1-c),new le(h,1-u),new le(f,1-g),new le(m,1-p)]}};function Gx(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var ic=class i extends Jt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new w,u=new w,d=new w;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){let _=g/s*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){let _=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,R=(s+1)*f+g;o.push(_,m,R),o.push(m,p,R)}this.setIndex(o),this.setAttribute("position",new xt(a,3)),this.setAttribute("normal",new xt(c,3)),this.setAttribute("uv",new xt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var sc=class i extends Jt{constructor(e=new Qa(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new w,c=new w,l=new le,h=new w,u=[],d=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new xt(u,3)),this.setAttribute("normal",new xt(d,3)),this.setAttribute("uv",new xt(f,2));function _(){for(let E=0;E<t;E++)m(E);m(r===!1?t:0),R(),p()}function m(E){h=e.getPointAt(E/t,h);let y=o.normals[E],N=o.binormals[E];for(let C=0;C<=s;C++){let I=C/s*Math.PI*2,P=Math.sin(I),S=-Math.cos(I);c.x=S*y.x+P*N.x,c.y=S*y.y+P*N.y,c.z=S*y.z+P*N.z,c.normalize(),d.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,u.push(a.x,a.y,a.z)}}function p(){for(let E=1;E<=t;E++)for(let y=1;y<=s;y++){let N=(s+1)*(E-1)+(y-1),C=(s+1)*E+(y-1),I=(s+1)*E+y,P=(s+1)*(E-1)+y;g.push(N,C,P),g.push(C,I,P)}}function R(){for(let E=0;E<=t;E++)for(let y=0;y<=s;y++)l.x=E/t,l.y=y/s,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new ec[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var rc=class extends is{static get type(){return"ShadowMaterial"}constructor(e){super(),this.isShadowMaterial=!0,this.color=new We(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var be=class extends is{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wd,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},oc=class extends be{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new le(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Pt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new We(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new We(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new We(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function Ra(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Vx(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var $r=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},fh=class extends $r{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Eu,endingEnd:Eu}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case bu:r=e,a=2*t-n;break;case wu:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case bu:o=e,c=2*n-t;break;case wu:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,R=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,E=(-1-f)*m+(1.5+f)*_+.5*g,y=f*m-f*_;for(let N=0;N!==a;++N)r[N]=p*o[h+N]+R*o[l+N]+E*o[c+N]+y*o[u+N];return r}},ph=class extends $r{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},mh=class extends $r{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},In=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ra(t,this.TimeBufferType),this.values=Ra(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ra(e.times,Array),values:Ra(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new mh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ph(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new fh(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ua:t=this.InterpolantFactoryMethodDiscrete;break;case kl:t=this.InterpolantFactoryMethodLinear;break;case bc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ua;case this.InterpolantFactoryMethodLinear:return kl;case this.InterpolantFactoryMethodSmooth:return bc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&Vx(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===bc,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{let u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};In.prototype.TimeBufferType=Float32Array;In.prototype.ValueBufferType=Float32Array;In.prototype.DefaultInterpolation=kl;var pr=class extends In{constructor(e,t,n){super(e,t,n)}};pr.prototype.ValueTypeName="bool";pr.prototype.ValueBufferType=Array;pr.prototype.DefaultInterpolation=Ua;pr.prototype.InterpolantFactoryMethodLinear=void 0;pr.prototype.InterpolantFactoryMethodSmooth=void 0;var gh=class extends In{};gh.prototype.ValueTypeName="color";var _h=class extends In{};_h.prototype.ValueTypeName="number";var xh=class extends $r{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)Lt.slerpFlat(r,0,o,l-a,o,l,c);return r}},ac=class extends In{InterpolantFactoryMethodLinear(e){return new xh(this.times,this.values,this.getValueSize(),e)}};ac.prototype.ValueTypeName="quaternion";ac.prototype.InterpolantFactoryMethodSmooth=void 0;var mr=class extends In{constructor(e,t,n){super(e,t,n)}};mr.prototype.ValueTypeName="string";mr.prototype.ValueBufferType=Array;mr.prototype.DefaultInterpolation=Ua;mr.prototype.InterpolantFactoryMethodLinear=void 0;mr.prototype.InterpolantFactoryMethodSmooth=void 0;var yh=class extends In{};yh.prototype.ValueTypeName="vector";var Rd={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},vh=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},Wx=new vh,ko=class{constructor(e){this.manager=e!==void 0?e:Wx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};ko.DEFAULT_MATERIAL_NAME="__DEFAULT";var Mh=class extends ko{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Rd.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=Io("img");function c(){h(),Rd.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}};var cc=class extends ko{constructor(e){super(e)}load(e,t,n,s){let r=new Zt,o=new Mh(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Go=class extends Gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Kr=class extends Go{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Gt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},tl=new nt,Ad=new w,Cd=new w,lc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new le(512,512),this.map=null,this.mapPass=null,this.matrix=new nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Po,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Ad.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ad),Cd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Cd),t.updateMatrixWorld(),tl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(tl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(tl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Id=new nt,yo=new w,nl=new w,Sh=class extends lc{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new le(4,2),this._viewportCount=6,this._viewports=[new ht(2,1,1,1),new ht(0,1,1,1),new ht(3,1,1,1),new ht(1,1,1,1),new ht(3,0,1,1),new ht(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),yo.setFromMatrixPosition(e.matrixWorld),n.position.copy(yo),nl.copy(n.position),nl.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(nl),n.updateMatrixWorld(),s.makeTranslation(-yo.x,-yo.y,-yo.z),Id.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Id)}},hc=class extends Go{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Sh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Eh=class extends lc{constructor(){super(new Va(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Qr=class extends Go{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Gt.DEFAULT_UP),this.updateMatrix(),this.target=new Gt,this.shadow=new Eh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var uc=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Pd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=Pd();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function Pd(){return performance.now()}var Bh="\\[\\]\\.:\\/",Xx=new RegExp("["+Bh+"]","g"),Oh="[^"+Bh+"]",qx="[^"+Bh.replace("\\.","")+"]",Yx=/((?:WC+[\/:])*)/.source.replace("WC",Oh),Zx=/(WCOD+)?/.source.replace("WCOD",qx),Jx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Oh),$x=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Oh),Kx=new RegExp("^"+Yx+Zx+Jx+$x+"$"),Qx=["material","materials","bones","map"],bh=class{constructor(e,t,n){let s=n||_t.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},_t=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Xx,"")}static parseTrackName(e){let t=Kx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Qx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};_t.Composite=bh;_t.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};_t.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};_t.prototype.GetterByBindingType=[_t.prototype._getValue_direct,_t.prototype._getValue_array,_t.prototype._getValue_arrayElement,_t.prototype._getValue_toArray];_t.prototype.SetterByBindingTypeAndVersioning=[[_t.prototype._setValue_direct,_t.prototype._setValue_direct_setNeedsUpdate,_t.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_array,_t.prototype._setValue_array_setNeedsUpdate,_t.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_arrayElement,_t.prototype._setValue_arrayElement_setNeedsUpdate,_t.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_fromArray,_t.prototype._setValue_fromArray_setNeedsUpdate,_t.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Uy=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wh);var _c=class extends Zr{constructor(){super();let e=new Ge;e.deleteAttribute("uv");let t=new be({side:kt}),n=new be,s=new hc(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new re(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new re(e,n);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);let a=new re(e,n);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);let c=new re(e,n);c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),this.add(c);let l=new re(e,n);l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),this.add(l);let h=new re(e,n);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);let u=new re(e,n);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);let d=new re(e,to(50));d.position.set(-16.116,14.37,8.208),d.scale.set(.1,2.428,2.739),this.add(d);let f=new re(e,to(50));f.position.set(-16.109,18.021,-8.207),f.scale.set(.1,2.425,2.751),this.add(f);let g=new re(e,to(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);let _=new re(e,to(43));_.position.set(-.462,8.89,14.52),_.scale.set(4.38,5.441,.088),this.add(_);let m=new re(e,to(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);let p=new re(e,to(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function to(i){let e=new Cn;return e.color.setScalar(i),e}function af(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new Jt,l=0;for(let h=0;h<i.length;++h){let u=i[h],d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(t){let h=0,u=[];for(let d=0;d<i.length;++d){let f=i[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=i[d].attributes.position.count}c.setIndex(u)}for(let h in r){let u=of(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let _=0;_<o[h].length;++_)f.push(o[h][_][d]);let g=of(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function of(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let o=new e(r),a=new Nt(o,t,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let u=c/t;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<t;g++){let _=h.getComponent(d,g);a.setComponent(d+u,g,_)}}else o.set(h.array,c);c+=h.count*t}return s!==void 0&&(a.gpuType=s),a}function cf(i,e=Math.PI/3){let t=Math.cos(e),n=(1+1e-10)*100,s=[new w,new w,new w],r=new w,o=new w,a=new w,c=new w;function l(_){let m=~~(_.x*n),p=~~(_.y*n),R=~~(_.z*n);return`${m},${p},${R}`}let h=i.index?i.toNonIndexed():i,u=h.attributes.position,d={};for(let _=0,m=u.count/3;_<m;_++){let p=3*_,R=s[0].fromBufferAttribute(u,p+0),E=s[1].fromBufferAttribute(u,p+1),y=s[2].fromBufferAttribute(u,p+2);r.subVectors(y,E),o.subVectors(R,E);let N=new w().crossVectors(r,o).normalize();for(let C=0;C<3;C++){let I=s[C],P=l(I);P in d||(d[P]=[]),d[P].push(N)}}let f=new Float32Array(u.count*3),g=new Nt(f,3,!1);for(let _=0,m=u.count/3;_<m;_++){let p=3*_,R=s[0].fromBufferAttribute(u,p+0),E=s[1].fromBufferAttribute(u,p+1),y=s[2].fromBufferAttribute(u,p+2);r.subVectors(y,E),o.subVectors(R,E),a.crossVectors(r,o).normalize();for(let N=0;N<3;N++){let C=s[N],I=l(C),P=d[I];c.set(0,0,0);for(let S=0,v=P.length;S<v;S++){let A=P[S];a.dot(A)>t&&c.add(A)}c.normalize(),g.setXYZ(p+N,c.x,c.y,c.z)}}return h.setAttribute("normal",g),h}function jx(i,e){let t=new Bo;if(i.length>0){t.moveTo(i[0][0],i[0][1]);for(let n=1;n<i.length;n+=1)t.lineTo(i[n][0],i[n][1])}for(let n of e??[]){if(n.length<3)continue;let s=new Jr;s.moveTo(n[0][0],n[0][1]);for(let r=1;r<n.length;r+=1)s.lineTo(n[r][0],n[r][1]);s.closePath(),t.holes.push(s)}return t}function ey(i,e,t,n,s=24){let r=[];for(let o=0;o<s;o+=1){let a=o/s*Math.PI*2;r.push([i+Math.cos(a)*t,e+Math.sin(a)*n])}return r}function xc(i){let e=[...i.holes??[],...(i.ovalHoles??[]).map(n=>ey(n.cx,n.cy,n.rx,n.ry))],t=jx(i.points,e);return new nc(t,{depth:i.depth,bevelEnabled:!1,steps:1})}function ty(i){let e=2166136261;for(let t=0;t<i.length;t+=1)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function rt(i,e,t){if(typeof i=="number")return i;if(i&&typeof i=="object"){let n=i;for(let s of e)if(typeof n[s]=="number")return n[s]}return t}function ny(i){let e=/^#[0-9a-f]{3}$/i.test(i)?"#"+i.slice(1).split("").map(n=>n+n).join(""):i,t=/^#[0-9a-f]{6}$/i.test(e)?Number.parseInt(e.slice(1),16):9075295;return[no(t>>16&255),no(t>>8&255),no(t&255)]}function iy(i){let e=i.colorVariation?.palette;if(Array.isArray(e)&&e.length>0)return e.filter(s=>typeof s=="string");let t=i.albedo?.secondary;return[i.baseColor??i.color??i.albedo?.dominant,...Array.isArray(t)?t:[]].filter(s=>typeof s=="string"&&s.startsWith("#"))}function St(i){return Math.max(0,Math.min(1,i))}function no(i){return Math.max(30,Math.min(240,Math.round(i)))}function sy(i){return Math.max(.02,Math.min(1,i))}function lf(i){return Math.max(1,Math.min(2.5,i))}function ry(i){return i>=.5?1:0}function oy(i){let e=typeof i.baseColor=="string"?i.baseColor:"#8A7A5F";return new We().setStyle(e,wt)}function hf(i){return i*i*(3-2*i)}function yc(i,e,t,n,s){let r=(i%n+n)%n,o=(e%s+s)%s,a=Math.imul(r+t*17,374761393)^Math.imul(o+t*31,668265263);return a=Math.imul(a^a>>>13,1274126177),((a^a>>>16)>>>0)/4294967295}function ay(i,e,t,n,s){let r=i*n,o=e*s,a=Math.floor(r),c=Math.floor(o),l=hf(r-a),h=hf(o-c),u=yc(a,c,t,n,s),d=yc(a+1,c,t,n,s),f=yc(a,c+1,t,n,s),g=yc(a+1,c+1,t,n,s);return gn.lerp(gn.lerp(u,d,l),gn.lerp(f,g,l),h)}function cy(i){let t=(Array.isArray(i.surfaceFrequencyBands)?i.surfaceFrequencyBands:[]).flatMap(n=>{if(!n||typeof n!="object")return[];let s=n,r=typeof s.frequency=="number"?s.frequency:0,o=typeof s.amplitude=="number"?s.amplitude:0;if(r<=0||o<=0)return[];let a=Array.isArray(s.stretch)?s.stretch:[1,1],c=`${String(s.pattern??"")} ${String(s.role??"")}`.toLowerCase();return[{frequency:r,amplitude:o,stretchX:typeof a[0]=="number"?Math.max(.1,a[0]):1,stretchY:typeof a[1]=="number"?Math.max(.1,a[1]):1,ridge:/(ridge|groove|grain|fiber|striated|crack)/.test(c)}]});return t.length>0?t:[{frequency:2,amplitude:.42,stretchX:1,stretchY:1,ridge:!1},{frequency:12,amplitude:.22,stretchX:1,stretchY:1,ridge:!1},{frequency:56,amplitude:.08,stretchX:1,stretchY:1,ridge:!1}]}function Hh(i,e,t,n){let s=0,r=0;for(let o=0;o<t.length;o+=1){let a=t[o],c=Math.max(1,Math.round(a.frequency*a.stretchX)),l=Math.max(1,Math.round(a.frequency*a.stretchY)),h=ay(i,e,n+o*1013,c,l);a.ridge&&(h=1-Math.abs(h*2-1)),s+=h*a.amplitude,r+=a.amplitude}return r>0?St(s/r):.5}function ly(i,e){if(i.length===1)return i[0];let t=St(e)*(i.length-1),n=Math.min(i.length-2,Math.floor(t)),s=t-n,r=i[n],o=i[n+1];return[Math.round(gn.lerp(r[0],o[0],s)),Math.round(gn.lerp(r[1],o[1],s)),Math.round(gn.lerp(r[2],o[2],s))]}function uf(i){let e=/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(i);return e?[no(Number(e[1])),no(Number(e[2])),no(Number(e[3]))]:[138,122,95]}function hy(i,e,t){let n=i.stops.length>=2?i.stops:[{offset:0,color:"rgba(138,122,95,1)"},{offset:1,color:"rgba(138,122,95,1)"}],s;if(i.type==="radial"){let[h,u]=i.axis,d=e-h,f=t-u,g=Math.max(.001,Math.hypot(Math.max(h,1-h),Math.max(u,1-u)));s=St(Math.hypot(d,f)/g)}else{let[h,u]=i.axis,d=(e-.5)*h+(t-.5)*u,f=.5*(Math.abs(h)+Math.abs(u))||.5;s=St(d/f+.5)}let r=s*(n.length-1),o=Math.min(n.length-2,Math.max(0,Math.floor(r))),a=r-o,c=uf(n[o].color),l=uf(n[o+1].color);return[gn.lerp(c[0],l[0],a),gn.lerp(c[1],l[1],a),gn.lerp(c[2],l[2],a)]}function Wo(i,e,t,n,s){i[e]=Math.max(0,Math.min(255,Math.round(t))),i[e+1]=Math.max(0,Math.min(255,Math.round(n))),i[e+2]=Math.max(0,Math.min(255,Math.round(s))),i[e+3]=255}function Xo(i){let e=document.createElement("canvas");return e.width=i,e.height=i,e}function qo(i,e,t,n){let s=new _s(i),r=t.textureProjection&&typeof t.textureProjection=="object"?t.textureProjection:{},o=Array.isArray(r.repeat)?r.repeat:[2,2];return s.colorSpace=e,s.wrapS=di,s.wrapT=di,s.repeat.set(typeof o[0]=="number"?o[0]:2,typeof o[1]=="number"?o[1]:2),s.anisotropy=Math.max(1,Math.round(n.textureAnisotropy??r.anisotropy??8)),s.needsUpdate=!0,s}function Yo(i,e){let t=i.referencePbr;if(!t||typeof t!="object"||t.usable===!1)return null;let n=typeof t.confidence=="number"?t.confidence:typeof t.estimatedFidelity=="number"?t.estimatedFidelity:0,s=typeof t.targetThreshold=="number"?t.targetThreshold:.7;if(n<s)return null;let r=t.maps;if(!r||typeof r!="object")return null;let o=r[e];if(!o||typeof o!="object")return null;let a=o,c=typeof a.url=="string"&&a.url.trim()?a.url:a.path;return typeof c=="string"&&c.trim()?c:null}function Zo(i,e,t,n){let s=new cc().load(i),r=t.textureProjection&&typeof t.textureProjection=="object"?t.textureProjection:{},o=Array.isArray(r.repeat)?r.repeat:[1,1];return s.colorSpace=e,s.wrapS=di,s.wrapT=di,s.repeat.set(typeof o[0]=="number"?o[0]:1,typeof o[1]=="number"?o[1]:1),s.anisotropy=Math.max(1,Math.round(n.textureAnisotropy??r.anisotropy??8)),s.needsUpdate=!0,s}function uy(i,e){let t=Yo(i,"albedo"),n=Yo(i,"roughness"),s=Yo(i,"height"),r=Yo(i,"normal"),o=Yo(i,"ao");return!t||!n||!s||!r||!o?null:{albedo:Zo(t,wt,i,e),roughness:Zo(n,Ut,i,e),height:Zo(s,Ut,i,e),normal:Zo(r,Ut,i,e),ao:Zo(o,Ut,i,e),source:"reference-pixel-extraction"}}function dy(i,e,t){if(typeof document>"u")return null;let n=(t.qualityPriority??"reference-fidelity")==="reference-fidelity",s=t.textureSize??e.textureResolution,r=typeof s=="number"&&Number.isFinite(s)?s:n?1024:512,o=Math.max(256,Math.min(2048,2**Math.round(Math.log2(r)))),a={albedo:Xo(o),roughness:Xo(o),height:Xo(o),normal:Xo(o),ao:Xo(o)},c={albedo:a.albedo.getContext("2d"),roughness:a.roughness.getContext("2d"),height:a.height.getContext("2d"),normal:a.normal.getContext("2d"),ao:a.ao.getContext("2d")};if(!c.albedo||!c.roughness||!c.height||!c.normal||!c.ao)return null;let l={albedo:c.albedo.createImageData(o,o),roughness:c.roughness.createImageData(o,o),height:c.height.createImageData(o,o),normal:c.normal.createImageData(o,o),ao:c.ao.createImageData(o,o)},h=ty(i),u=cy(e),d=new Float32Array(o*o),f=new Float32Array(o*o),g=iy(e),_=typeof e.baseColor=="string"?e.baseColor:"#8A7A5F",m=(g.length>=2?g:[_,"#6E614B","#A08F70"]).map(ny),p=St(rt(e.roughness,["base"],.76)),R=St(rt(e.roughness,["variation"],.18)),E=St(rt(e.colorVariation,["amplitude","variation"],.18)),y=St(rt(e.colorVariation,["heightCorrelation"],.3)),N=e.colorGradient;for(let P=0;P<o;P+=1){let S=P/o;for(let v=0;v<o;v+=1){let A=v/o,z=P*o+v,F=Hh(A,S,u,h+101),k=Hh(A,S,u,h+7001),Y=Hh(A,S,u,h+15013);d[z]=F,f[z]=St(p+(k-.5)*R*2);let O;if(N)O=hy(N,A,S);else{let Q=St(.5+(Y-.5)*E*2+(F-.5)*y);O=ly(m,Q)}Wo(l.albedo.data,z*4,O[0],O[1],O[2])}}let C=Math.max(.05,rt(e.normal,["strength","amplitude"],.35)),I=St(rt(e.ambientOcclusion,["cavityStrength","strength"],.35));for(let P=0;P<o;P+=1){let S=(P-1+o)%o*o,v=(P+1)%o*o;for(let A=0;A<o;A+=1){let z=(A-1+o)%o,F=(A+1)%o,k=P*o+A,Y=d[k],O=(d[P*o+F]-d[P*o+z])*C*6,Q=(d[v+A]-d[S+A])*C*6,W=1/Math.sqrt(O*O+Q*Q+1),oe=-O*W,ue=-Q*W,ye=W,Xe=(d[P*o+z]+d[P*o+F]+d[S+A]+d[v+A])*.25,Je=Math.max(0,Xe-Y),X=St(1-I*(Je*12+(1-Y)*.16)),ee=k*4,we=Y*255,se=f[k]*255;Wo(l.height.data,ee,we,we,we),Wo(l.roughness.data,ee,se,se,se),Wo(l.normal.data,ee,(oe*.5+.5)*255,(ue*.5+.5)*255,(ye*.5+.5)*255),Wo(l.ao.data,ee,X*255,X*255,X*255)}}return c.albedo.putImageData(l.albedo,0,0),c.roughness.putImageData(l.roughness,0,0),c.height.putImageData(l.height,0,0),c.normal.putImageData(l.normal,0,0),c.ao.putImageData(l.ao,0,0),{albedo:qo(a.albedo,wt,e,t),roughness:qo(a.roughness,Ut,e,t),height:qo(a.height,Ut,e,t),normal:qo(a.normal,Ut,e,t),ao:qo(a.ao,Ut,e,t),source:"procedural"}}function ss(i,e,t,n=!1){let r=e.textureless?.declared===!0?null:uy(e,t)??dy(i,e,t),o=new oc({color:r?16777215:oy(e),roughness:r?1:St(rt(e.roughness,["base"],.76)),metalness:ry(rt(e.metalness,["base"],0)),clearcoat:St(rt(e.clearcoat,["base","amount"],0)),clearcoatRoughness:St(rt(e.clearcoatRoughness,["base"],.25)),transmission:St(rt(e.transmission,["base","amount"],0)),ior:lf(rt(e.ior,["base","value"],1.5)),thickness:Math.max(0,rt(e.thickness,["base","amount"],0)),attenuationDistance:Math.max(.001,rt(e.attenuationDistance,["base","value"],1/0)),attenuationColor:new We(typeof e.attenuationColor=="string"?e.attenuationColor:"#ffffff"),sheen:St(rt(e.sheen,["base","amount"],0)),sheenColor:new We(typeof e.sheenColor=="string"?e.sheenColor:"#ffffff"),sheenRoughness:St(rt(e.sheenRoughness,["base"],1)),iridescence:St(rt(e.iridescence,["base","amount"],0)),iridescenceIOR:lf(rt(e.iridescenceIOR,["base","value"],1.3)),anisotropy:St(rt(e.anisotropy,["base","amount"],0)),anisotropyRotation:rt(e.anisotropy,["rotation"],0),specularIntensity:sy(rt(e.specularF0??e.f0??e.specularIntensity,["base","value"],1)),specularColor:new We(typeof e.specularColor=="string"?e.specularColor:"#ffffff"),emissive:new We(typeof e.emissive=="string"?e.emissive:"#000000"),emissiveIntensity:Math.max(0,rt(e.emissiveIntensity,["base"],1)),opacity:St(rt(e.opacity,["base"],1)),transparent:rt(e.transmission,["base","amount"],0)>0||rt(e.opacity,["base"],1)<1,alphaTest:Math.max(0,rt(e.alpha,["cutoff","alphaTest"],0)),wireframe:t.wireframe??!1,side:e.doubleSided===!0?Tn:ui,flatShading:e.flatShading===!0});if(r){o.map=r.albedo,o.roughnessMap=r.roughness,o.normalMap=r.normal,o.normalScale.setScalar(Math.max(.05,rt(e.normal,["strength","amplitude"],.35))),o.aoMap=r.ao,o.aoMap.channel=0,o.aoMapIntensity=rt(e.ambientOcclusion,["cavityStrength","strength"],.35);let a=n||e.denseMesh===!0||e.geometryDensity==="dense"||e.topologyClass==="dense",c=Math.max(0,rt(e.bump,["amplitude","strength"],0)),l=a?Math.max(.05,c):c;l>0&&(o.bumpMap=r.height,o.bumpScale=l);let h=Math.max(0,rt(e.displacement,["amplitude","strength"],0)),u=a?Math.max(.005,h):h;u>0&&(o.displacementMap=r.height,o.displacementScale=u,o.displacementBias=-u*.5)}return o.envMapIntensity=rt(e,["envMapIntensity"],.8),o.userData.sculptMaterial=e,o.userData.proceduralMapsIndependent=!0,o.userData.pbrConstraints={albedoRange:[30,240],binaryMetalness:!0,f0Range:[.02,1],iorRange:[1,2.5]},o.userData.pbrTextureSource=r?.source??"flat-fallback",o.userData.referencePbr=e.referencePbr??null,o.userData.referenceMaterialId=e.referenceMaterialId??e.materialReference?.profileId??null,o.userData.materialEvidence=e.materialEvidence??null,o.userData.validationViews=e.materialReference?.validationViews??[],o.needsUpdate=!0,o}function df(i,e){return Array.isArray(i)&&i.length===3&&i.every(t=>typeof t=="number")?new w(i[0],i[1],i[2]):new w(e[0],e[1],e[2])}function ff(i,e){return typeof i=="number"&&Number.isFinite(i)?i:e}function Ue(i){if(!i||typeof i!="object")return null;let e=i,t=df(e.localStart,[0,0,0]),s=df(e.localEnd,[0,1,0]).clone().sub(t),r=s.length();if(r<=1e-4)return null;let o=s.clone().normalize(),a=new Lt().setFromUnitVectors(new w(0,1,0),o),c=Math.max(.005,ff(e.baseRadius,.06)),l=Math.max(.003,ff(e.endRadius,c*.55));return{start:t,midpoint:s.multiplyScalar(.5),quaternion:a,length:r,baseRadius:c,endRadius:l}}function pf(i={}){let e=new Ee;e.name="SPN Actros L tractor unit";let t={};t.paintSilver=ss("paintSilver",{id:"paintSilver",type:"physical",baseColor:"#a7acb2",color:"#a7acb2",roughness:{base:.38,variation:.05,map:"none (textureless)",localResponse:"slightly lower roughness on convex panel crowns than in recesses"},metalness:{base:1,variation:.02},clearcoat:{base:1},clearcoatRoughness:{base:.08},ior:{base:1.5,variation:0},envMapIntensity:1,textureless:{declared:!0}},i),t.trimBlack=ss("trimBlack",{id:"trimBlack",type:"standard",baseColor:"#151618",color:"#151618",roughness:{base:.62,variation:.05,map:"none (textureless)",localResponse:"slightly lower roughness on convex panel crowns than in recesses"},metalness:{base:0,variation:.02},ior:{base:1.5,variation:0},envMapIntensity:.7,textureless:{declared:!0}},i),t.glassTint=ss("glassTint",{id:"glassTint",type:"physical",baseColor:"#10161b",color:"#10161b",roughness:{base:.04,variation:.05,map:"none (textureless)",localResponse:"slightly lower roughness on convex panel crowns than in recesses"},metalness:{base:0,variation:.02},clearcoat:{base:1},clearcoatRoughness:{base:.0525},transmission:{base:0},ior:{base:1.5,variation:0},envMapIntensity:1.4,textureless:{declared:!0}},i),t.chromeBright=ss("chromeBright",{id:"chromeBright",type:"physical",baseColor:"#d8dade",color:"#d8dade",roughness:{base:.1,variation:.05,map:"none (textureless)",localResponse:"slightly lower roughness on convex panel crowns than in recesses"},metalness:{base:1,variation:.02},anisotropy:{base:0,variation:0},envMapIntensity:1.2,textureless:{declared:!0}},i),t.grilleMeshDark=ss("grilleMeshDark",{id:"grilleMeshDark",type:"standard",baseColor:"#1f2124",color:"#1f2124",roughness:{base:.45,variation:.05,map:"none (textureless)",localResponse:"slightly lower roughness on convex panel crowns than in recesses"},metalness:{base:1,variation:.02},anisotropy:{base:.2,variation:0},envMapIntensity:.6,textureless:{declared:!0}},i),t.tyreRubber=ss("tyreRubber",{id:"tyreRubber",type:"standard",baseColor:"#141416",color:"#141416",roughness:{base:.9,variation:.05,map:"none (textureless)",localResponse:"slightly lower roughness on convex panel crowns than in recesses"},metalness:{base:0,variation:.02},ior:{base:1.48,variation:0},envMapIntensity:.4,textureless:{declared:!0}},i),t.alloyRim=ss("alloyRim",{id:"alloyRim",type:"physical",baseColor:"#3a3c42",color:"#3a3c42",roughness:{base:.35,variation:.05,map:"none (textureless)",localResponse:"slightly lower roughness on convex panel crowns than in recesses"},metalness:{base:1,variation:.02},anisotropy:{base:.2,variation:0},envMapIntensity:.9,textureless:{declared:!0}},i),t.lampLens=ss("lampLens",{id:"lampLens",type:"physical",baseColor:"#22262b",color:"#22262b",roughness:{base:.12,variation:.05,map:"none (textureless)",localResponse:"slightly lower roughness on convex panel crowns than in recesses"},metalness:{base:0,variation:.02},emissive:"#cfe0f2",emissiveIntensity:.08,transmission:{base:0},ior:{base:1.5,variation:0},envMapIntensity:.5,textureless:{declared:!0}},i),t.plateWhite=ss("plateWhite",{id:"plateWhite",type:"standard",baseColor:"#efefea",color:"#efefea",roughness:{base:.6,variation:.05,map:"none (textureless)",localResponse:"slightly lower roughness on convex panel crowns than in recesses"},metalness:{base:0,variation:.02},ior:{base:1.5,variation:0},textureless:{declared:!0}},i);let n={root:e},s={},r={},o={},a={},c=Ue(null),l=new Ee;l.name="Ladder frame chassis__pivot",l.scale.set(1,1,1),c?(l.position.copy(c.start),l.rotation.set(0,0,0)):(l.position.set(0,.8,-3),l.rotation.set(0,0,0)),(n.root??e).add(l),n.root=l;let h=c?new ge(c.endRadius,c.baseRadius,c.length,16,6):new Ge(1,1,1,4,4,4);c||h.scale(.95,.3,6.2);let u=new re(h,t.trimBlack??new be({color:8947848}));u.name="Ladder frame chassis",c&&(u.position.copy(c.midpoint),u.quaternion.copy(c.quaternion)),u.castShadow=i.castShadow??!0,u.receiveShadow=i.receiveShadow??!0,l.add(u),s.root=u;let d=Ue(null),f=new Ee;f.name="Cab floor pan and mounts (cab pivot)__pivot",f.scale.set(1,1,1),d?(f.position.copy(d.start),f.rotation.set(0,0,0)):(f.position.set(0,.38,1.8),f.rotation.set(0,0,0)),(n.root??e).add(f),n.cabShell=f;let g=d?new ge(d.endRadius,d.baseRadius,d.length,16,6):new Ge(1,1,1,4,4,4);d||g.scale(2.3,.08,2.2);let _=new re(g,t.paintSilver??new be({color:8947848}));_.name="Cab floor pan and mounts (cab pivot)",d&&(_.position.copy(d.midpoint),_.quaternion.copy(d.quaternion)),_.castShadow=i.castShadow??!0,_.receiveShadow=i.receiveShadow??!0,f.add(_),s.cabShell=_;let m=Ue(null),p=new Ee;p.name="Cab body shell (GigaSpace)__pivot",p.scale.set(1,1,1),m?(p.position.copy(m.start),p.rotation.set(-1.5707963267948966,0,0)):(p.position.set(0,-.04,1.2),p.rotation.set(-1.5707963267948966,0,0)),(n.cabShell??e).add(p),n.cabBody=p;let R=m?new ge(m.endRadius,m.baseRadius,m.length,16,6):xc({points:[[-1.25,.24],[-1.2418,.1779],[-1.2178,.12],[-1.1797,.0703],[-1.13,.0322],[-1.0721,.0082],[-1.01,0],[1.01,0],[1.0721,.0082],[1.13,.0322],[1.1797,.0703],[1.2178,.12],[1.2418,.1779],[1.25,.24],[1.25,2.3],[1.2466,2.3259],[1.2366,2.35],[1.2207,2.3707],[1.2,2.3866],[1.1759,2.3966],[1.15,2.4],[-1.15,2.4],[-1.1759,2.3966],[-1.2,2.3866],[-1.2207,2.3707],[-1.2366,2.35],[-1.2466,2.3259],[-1.25,2.3]],depth:2.32});m||R.scale(1,1,1);let E=new re(R,t.paintSilver??new be({color:8947848}));E.name="Cab body shell (GigaSpace)",m&&(E.position.copy(m.midpoint),E.quaternion.copy(m.quaternion)),E.castShadow=i.castShadow??!0,E.receiveShadow=i.receiveShadow??!0,p.add(E),s.cabBody=E;let y=Ue(null),N=new Ee;N.name="High-roof cap (GigaSpace)__pivot",N.scale.set(1,1,1),y?(N.position.copy(y.start),N.rotation.set(0,1.5707963267948966,0)):(N.position.set(-1.22,-1.18,1.2),N.rotation.set(0,1.5707963267948966,0)),(n.cabShell??e).add(N),n.roofCap=N;let C=y?new ge(y.endRadius,y.baseRadius,y.length,16,6):xc({points:[[.09,3.4],[2.41,3.4],[2.41,3.84],[2.4059,3.8711],[2.3939,3.9],[2.3749,3.9249],[2.35,3.9439],[2.3211,3.9559],[2.29,3.96],[.51,3.96],[.4013,3.9457],[.3,3.9037],[.213,3.837],[.1463,3.75],[.1043,3.6487],[.09,3.54]],depth:2.44});y||C.scale(1,1,1);let I=new re(C,t.paintSilver??new be({color:8947848}));I.name="High-roof cap (GigaSpace)",y&&(I.position.copy(y.midpoint),I.quaternion.copy(y.quaternion)),I.castShadow=i.castShadow??!0,I.receiveShadow=i.receiveShadow??!0,N.add(I),s.roofCap=I;let P=Ue(null),S=new Ee;S.name="Lower front fascia (grille surround + bumper carrier)__pivot",S.scale.set(1,1,1),P?(S.position.copy(P.start),S.rotation.set(-1.5707963267948966,0,0)):(S.position.set(0,-.93,1.2),S.rotation.set(-1.5707963267948966,0,0)),(n.cabShell??e).add(S),n.frontFascia=S;let v=P?new ge(P.endRadius,P.baseRadius,P.length,16,6):xc({points:[[-1.25,.24],[-1.2411,.1727],[-1.2152,.11],[-1.1738,.0562],[-1.12,.0148],[-1.0573,-.0111],[-.99,-.02],[.99,-.02],[1.0573,-.0111],[1.12,.0148],[1.1738,.0562],[1.2152,.11],[1.2411,.1727],[1.25,.24],[1.25,.68],[-1.25,.68]],depth:1.06});P||v.scale(1,1,1);let A=new re(v,t.paintSilver??new be({color:8947848}));A.name="Lower front fascia (grille surround + bumper carrier)",P&&(A.position.copy(P.midpoint),A.quaternion.copy(P.quaternion)),A.castShadow=i.castShadow??!0,A.receiveShadow=i.receiveShadow??!0,S.add(A),s.frontFascia=A;let z=Ue(null),F=new Ee;F.name="Black sun visor__pivot",F.scale.set(1,1,1),z?(F.position.copy(z.start),F.rotation.set(0,0,0)):(F.position.set(0,2.13,1.18),F.rotation.set(0,0,0)),(n.cabShell??e).add(F),n.sunVisor=F;let k=z?new ge(z.endRadius,z.baseRadius,z.length,16,6):new Ge(1,1,1,4,4,4);z||k.scale(2.46,.32,.2);let Y=new re(k,t.trimBlack??new be({color:8947848}));Y.name="Black sun visor",z&&(Y.position.copy(z.midpoint),Y.quaternion.copy(z.quaternion)),Y.castShadow=i.castShadow??!0,Y.receiveShadow=i.receiveShadow??!0,F.add(Y),s.sunVisor=Y;let O=Ue(null),Q=new Ee;Q.name="Windshield__pivot",Q.scale.set(1,1,1),O?(Q.position.copy(O.start),Q.rotation.set(0,0,0)):(Q.position.set(0,1.48,1.205),Q.rotation.set(0,0,0)),(n.cabShell??e).add(Q),n.windshield=Q;let W=O?new ge(O.endRadius,O.baseRadius,O.length,16,6):new Ge(1,1,1,4,4,4);O||W.scale(2.28,1,.04);let oe=new re(W,t.glassTint??new be({color:8947848}));oe.name="Windshield",O&&(oe.position.copy(O.midpoint),oe.quaternion.copy(O.quaternion)),oe.castShadow=i.castShadow??!0,oe.receiveShadow=i.receiveShadow??!0,Q.add(oe),s.windshield=oe;let ue=Ue(null),ye=new Ee;ye.name="Black wiper cowl below the windshield__pivot",ye.scale.set(1,1,1),ue?(ye.position.copy(ue.start),ye.rotation.set(0,0,0)):(ye.position.set(0,.9,1.21),ye.rotation.set(0,0,0)),(n.cabShell??e).add(ye),n.wiperCowl=ye;let Xe=ue?new ge(ue.endRadius,ue.baseRadius,ue.length,16,6):new Ge(1,1,1,4,4,4);ue||Xe.scale(2.3,.14,.05);let Je=new re(Xe,t.trimBlack??new be({color:8947848}));Je.name="Black wiper cowl below the windshield",ue&&(Je.position.copy(ue.midpoint),Je.quaternion.copy(ue.quaternion)),Je.castShadow=i.castShadow??!0,Je.receiveShadow=i.receiveShadow??!0,ye.add(Je),s.wiperCowl=Je;let X=Ue(null),ee=new Ee;ee.name="Grille mesh panel__pivot",ee.scale.set(1,1,1),X?(ee.position.copy(X.start),ee.rotation.set(0,0,0)):(ee.position.set(0,.14,1.21),ee.rotation.set(0,0,0)),(n.cabShell??e).add(ee),n.grilleMesh=ee;let we=X?new ge(X.endRadius,X.baseRadius,X.length,16,6):new Ge(1,1,1,4,4,4);X||we.scale(1.72,.98,.05);let se=new re(we,t.grilleMeshDark??new be({color:8947848}));se.name="Grille mesh panel",X&&(se.position.copy(X.midpoint),se.quaternion.copy(X.quaternion)),se.castShadow=i.castShadow??!0,se.receiveShadow=i.receiveShadow??!0,ee.add(se),s.grilleMesh=se;let Ie=Ue(null),Be=new Ee;Be.name="Grille slat (repetition template)__pivot",Be.scale.set(1,1,1),Ie?(Be.position.copy(Ie.start),Be.rotation.set(0,0,0)):(Be.position.set(0,-.44,.04),Be.rotation.set(0,0,0)),(n.grilleMesh??e).add(Be),n.grilleSlat=Be;let ze=Ie?new ge(Ie.endRadius,Ie.baseRadius,Ie.length,16,6):new Ge(1,1,1,4,4,4);Ie||ze.scale(1.78,.075,.07);let Ye=new re(ze,t.paintSilver??new be({color:8947848}));Ye.name="Grille slat (repetition template)",Ie&&(Ye.position.copy(Ie.midpoint),Ye.quaternion.copy(Ie.quaternion)),Ye.castShadow=i.castShadow??!0,Ye.receiveShadow=i.receiveShadow??!0,Be.add(Ye),s.grilleSlat=Ye;let J=Ue(null),ne=new Ee;ne.name="Grille slat 2__pivot",ne.scale.set(1,1,1),J?(ne.position.copy(J.start),ne.rotation.set(0,0,0)):(ne.position.set(0,-.225,.04),ne.rotation.set(0,0,0)),(n.grilleMesh??e).add(ne),n.grilleSlat2=ne;let T=J?new ge(J.endRadius,J.baseRadius,J.length,16,6):new Ge(1,1,1,4,4,4);J||T.scale(1.74,.075,.07);let Ae=new re(T,t.paintSilver??new be({color:8947848}));Ae.name="Grille slat 2",J&&(Ae.position.copy(J.midpoint),Ae.quaternion.copy(J.quaternion)),Ae.castShadow=i.castShadow??!0,Ae.receiveShadow=i.receiveShadow??!0,ne.add(Ae),s.grilleSlat2=Ae;let j=Ue(null),_e=new Ee;_e.name="Grille slat 3__pivot",_e.scale.set(1,1,1),j?(_e.position.copy(j.start),_e.rotation.set(0,0,0)):(_e.position.set(0,-.01,.04),_e.rotation.set(0,0,0)),(n.grilleMesh??e).add(_e),n.grilleSlat3=_e;let he=j?new ge(j.endRadius,j.baseRadius,j.length,16,6):new Ge(1,1,1,4,4,4);j||he.scale(1.7,.075,.07);let Ne=new re(he,t.paintSilver??new be({color:8947848}));Ne.name="Grille slat 3",j&&(Ne.position.copy(j.midpoint),Ne.quaternion.copy(j.quaternion)),Ne.castShadow=i.castShadow??!0,Ne.receiveShadow=i.receiveShadow??!0,_e.add(Ne),s.grilleSlat3=Ne;let fe=Ue(null),b=new Ee;b.name="Grille slat 4__pivot",b.scale.set(1,1,1),fe?(b.position.copy(fe.start),b.rotation.set(0,0,0)):(b.position.set(0,.205,.04),b.rotation.set(0,0,0)),(n.grilleMesh??e).add(b),n.grilleSlat4=b;let x=fe?new ge(fe.endRadius,fe.baseRadius,fe.length,16,6):new Ge(1,1,1,4,4,4);fe||x.scale(1.6600000000000001,.075,.07);let B=new re(x,t.paintSilver??new be({color:8947848}));B.name="Grille slat 4",fe&&(B.position.copy(fe.midpoint),B.quaternion.copy(fe.quaternion)),B.castShadow=i.castShadow??!0,B.receiveShadow=i.receiveShadow??!0,b.add(B),s.grilleSlat4=B;let q=Ue(null),$=new Ee;$.name="Grille slat 5__pivot",$.scale.set(1,1,1),q?($.position.copy(q.start),$.rotation.set(0,0,0)):($.position.set(0,.42,.04),$.rotation.set(0,0,0)),(n.grilleMesh??e).add($),n.grilleSlat5=$;let Z=q?new ge(q.endRadius,q.baseRadius,q.length,16,6):new Ge(1,1,1,4,4,4);q||Z.scale(1.62,.075,.07);let Te=new re(Z,t.paintSilver??new be({color:8947848}));Te.name="Grille slat 5",q&&(Te.position.copy(q.midpoint),Te.quaternion.copy(q.quaternion)),Te.castShadow=i.castShadow??!0,Te.receiveShadow=i.receiveShadow??!0,$.add(Te),s.grilleSlat5=Te;let ae=Ue(null),me=new Ee;me.name="Star emblem ring__pivot",me.scale.set(1,1,1),ae?(me.position.copy(ae.start),me.rotation.set(0,0,0)):(me.position.set(0,.31,.08),me.rotation.set(0,0,0)),(n.grilleMesh??e).add(me),n.starRing=me;let et=ae?new ge(ae.endRadius,ae.baseRadius,ae.length,16,6):new ic(.45,.0405,12,48);ae||et.scale(.44,.44,.06);let te=new re(et,t.chromeBright??new be({color:8947848}));te.name="Star emblem ring",ae&&(te.position.copy(ae.midpoint),te.quaternion.copy(ae.quaternion)),te.castShadow=i.castShadow??!0,te.receiveShadow=i.receiveShadow??!0,me.add(te),s.starRing=te;let ve=Ue(null),De=new Ee;De.name="Star spoke 1__pivot",De.scale.set(1,1,1),ve?(De.position.copy(ve.start),De.rotation.set(0,0,0)):(De.position.set(0,.095,0),De.rotation.set(0,0,0)),(n.starRing??e).add(De),n.starSpoke=De;let Ve=ve?new ge(ve.endRadius,ve.baseRadius,ve.length,16,6):new Ge(1,1,1,4,4,4);ve||Ve.scale(.045,.19,.03);let Se=new re(Ve,t.chromeBright??new be({color:8947848}));Se.name="Star spoke 1",ve&&(Se.position.copy(ve.midpoint),Se.quaternion.copy(ve.quaternion)),Se.castShadow=i.castShadow??!0,Se.receiveShadow=i.receiveShadow??!0,De.add(Se),s.starSpoke=Se;let qe=Ue(null),ke=new Ee;ke.name="Star spoke 2__pivot",ke.scale.set(1,1,1),qe?(ke.position.copy(qe.start),ke.rotation.set(0,0,2.0944)):(ke.position.set(-.0823,-.0475,0),ke.rotation.set(0,0,2.0944)),(n.starRing??e).add(ke),n.starSpoke2=ke;let ot=qe?new ge(qe.endRadius,qe.baseRadius,qe.length,16,6):new Ge(1,1,1,4,4,4);qe||ot.scale(.045,.19,.03);let L=new re(ot,t.chromeBright??new be({color:8947848}));L.name="Star spoke 2",qe&&(L.position.copy(qe.midpoint),L.quaternion.copy(qe.quaternion)),L.castShadow=i.castShadow??!0,L.receiveShadow=i.receiveShadow??!0,ke.add(L),s.starSpoke2=L;let ce=Ue(null),V=new Ee;V.name="Star spoke 3__pivot",V.scale.set(1,1,1),ce?(V.position.copy(ce.start),V.rotation.set(0,0,4.1888)):(V.position.set(.0823,-.0475,0),V.rotation.set(0,0,4.1888)),(n.starRing??e).add(V),n.starSpoke3=V;let K=ce?new ge(ce.endRadius,ce.baseRadius,ce.length,16,6):new Ge(1,1,1,4,4,4);ce||K.scale(.045,.19,.03);let pe=new re(K,t.chromeBright??new be({color:8947848}));pe.name="Star spoke 3",ce&&(pe.position.copy(ce.midpoint),pe.quaternion.copy(ce.quaternion)),pe.castShadow=i.castShadow??!0,pe.receiveShadow=i.receiveShadow??!0,V.add(pe),s.starSpoke3=pe;let de=Ue(null),Oe=new Ee;Oe.name="Headlight cluster (left)__pivot",Oe.scale.set(1,1,1),de?(Oe.position.copy(de.start),Oe.rotation.set(0,0,0)):(Oe.position.set(.98,-.28,1.23),Oe.rotation.set(0,0,0)),(n.cabShell??e).add(Oe),n.headlight=Oe;let ft=de?new ge(de.endRadius,de.baseRadius,de.length,16,6):new Ge(1,1,1,4,4,4);de||ft.scale(.42,.24,.08);let pt=new re(ft,t.lampLens??new be({color:8947848}));pt.name="Headlight cluster (left)",de&&(pt.position.copy(de.midpoint),pt.quaternion.copy(de.quaternion)),pt.castShadow=i.castShadow??!0,pt.receiveShadow=i.receiveShadow??!0,Oe.add(pt),s.headlight=pt;let $e=Ue(null),Mt=new Ee;Mt.name="Headlight LED / chrome reflector strip (left)__pivot",Mt.scale.set(1,1,1),$e?(Mt.position.copy($e.start),Mt.rotation.set(0,0,0)):(Mt.position.set(0,-.06,.045),Mt.rotation.set(0,0,0)),(n.headlight??e).add(Mt),n.headlightDrl=Mt;let hn=$e?new ge($e.endRadius,$e.baseRadius,$e.length,16,6):new Ge(1,1,1,4,4,4);$e||hn.scale(.36,.04,.02);let Ln=new re(hn,t.chromeBright??new be({color:8947848}));Ln.name="Headlight LED / chrome reflector strip (left)",$e&&(Ln.position.copy($e.midpoint),Ln.quaternion.copy($e.quaternion)),Ln.castShadow=i.castShadow??!0,Ln.receiveShadow=i.receiveShadow??!0,Mt.add(Ln),s.headlightDrl=Ln;let tn=Ue(null),Dt=new Ee;Dt.name="Bumper frame (body colour)__pivot",Dt.scale.set(1,1,1),tn?(Dt.position.copy(tn.start),Dt.rotation.set(-1.5707963267948966,0,0)):(Dt.position.set(0,-.96,1.2),Dt.rotation.set(-1.5707963267948966,0,0)),(n.cabShell??e).add(Dt),n.bumperUpper=Dt;let _r=tn?new ge(tn.endRadius,tn.baseRadius,tn.length,16,6):xc({points:[[-1.25,.15],[-1.2391,.0672],[-1.2071,-.01],[-1.1563,-.0763],[-1.09,-.1271],[-1.0128,-.1591],[-.93,-.17],[.93,-.17],[1.0128,-.1591],[1.09,-.1271],[1.1563,-.0763],[1.2071,-.01],[1.2391,.0672],[1.25,.15],[1.25,.33],[-1.25,.33]],depth:.56});tn||_r.scale(1,1,1);let Dn=new re(_r,t.paintSilver??new be({color:8947848}));Dn.name="Bumper frame (body colour)",tn&&(Dn.position.copy(tn.midpoint),Dn.quaternion.copy(tn.quaternion)),Dn.castShadow=i.castShadow??!0,Dn.receiveShadow=i.receiveShadow??!0,Dt.add(Dn),s.bumperUpper=Dn;let nn=Ue(null),Kt=new Ee;Kt.name="Bumper air intake (black)__pivot",Kt.scale.set(1,1,1),nn?(Kt.position.copy(nn.start),Kt.rotation.set(0,0,0)):(Kt.position.set(0,-.73,1.22),Kt.rotation.set(0,0,0)),(n.cabShell??e).add(Kt),n.bumperLower=Kt;let co=nn?new ge(nn.endRadius,nn.baseRadius,nn.length,16,6):new Ge(1,1,1,4,4,4);nn||co.scale(1.85,.3,.42);let un=new re(co,t.trimBlack??new be({color:8947848}));un.name="Bumper air intake (black)",nn&&(un.position.copy(nn.midpoint),un.quaternion.copy(nn.quaternion)),un.castShadow=i.castShadow??!0,un.receiveShadow=i.receiveShadow??!0,Kt.add(un),s.bumperLower=un;let sn=Ue(null),dn=new Ee;dn.name="Door window (left)__pivot",dn.scale.set(1,1,1),sn?(dn.position.copy(sn.start),dn.rotation.set(0,0,0)):(dn.position.set(1.255,1.54,.48),dn.rotation.set(0,0,0)),(n.cabShell??e).add(dn),n.sideWindow=dn;let Qo=sn?new ge(sn.endRadius,sn.baseRadius,sn.length,16,6):new Ge(1,1,1,4,4,4);sn||Qo.scale(.03,.8,.95);let gi=new re(Qo,t.glassTint??new be({color:8947848}));gi.name="Door window (left)",sn&&(gi.position.copy(sn.midpoint),gi.quaternion.copy(sn.quaternion)),gi.castShadow=i.castShadow??!0,gi.receiveShadow=i.receiveShadow??!0,dn.add(gi),s.sideWindow=gi;let fn=Ue(null),M=new Ee;M.name="MirrorCam camera head (left)__pivot",M.scale.set(1,1,1),fn?(M.position.copy(fn.start),M.rotation.set(0,0,0)):(M.position.set(1.4,1.99,1.15),M.rotation.set(0,0,0)),(n.cabShell??e).add(M),n.mirrorHead=M;let U=fn?new ge(fn.endRadius,fn.baseRadius,fn.length,16,6):new Ge(1,1,1,4,4,4);fn||U.scale(.16,.1,.14);let H=new re(U,t.trimBlack??new be({color:8947848}));H.name="MirrorCam camera head (left)",fn&&(H.position.copy(fn.midpoint),H.quaternion.copy(fn.quaternion)),H.castShadow=i.castShadow??!0,H.receiveShadow=i.receiveShadow??!0,M.add(H),s.mirrorHead=H;let D=Ue({parentId:"cabShell",parentSocket:"roofEdgeLeft",localStart:[1.2,2.17,.95],localEnd:[1.36,2.04,1.13],baseRadius:.03,endRadius:.025,contactType:"socket",embedDepth:.03,gapTolerance:.005,evidenceRefs:["front-3q-left"]}),ie=new Ee;ie.name="MirrorCam arm (left)__pivot",ie.scale.set(1,1,1),D?(ie.position.copy(D.start),ie.rotation.set(0,0,0)):(ie.position.set(1.22,2.02,.95),ie.rotation.set(0,0,0)),(n.cabShell??e).add(ie),n.mirrorArm=ie;let Me=D?new ge(D.endRadius,D.baseRadius,D.length,16,6):new ge(.5,.5,1,24,8);D||Me.scale(.05,.35,.05);let Re=new re(Me,t.trimBlack??new be({color:8947848}));Re.name="MirrorCam arm (left)",D&&(Re.position.copy(D.midpoint),Re.quaternion.copy(D.quaternion)),Re.castShadow=i.castShadow??!0,Re.receiveShadow=i.receiveShadow??!0,ie.add(Re),s.mirrorArm=Re;let Fe=Ue({parentId:"root",parentSocket:"wheelFrontAxle",localStart:[.98,-.27,1.75],localEnd:[1.3,-.27,1.75],baseRadius:.53,endRadius:.53,contactType:"pivot-hinge",embedDepth:.02,gapTolerance:.005,evidenceRefs:["front-3q-left"]}),He=new Ee;He.name="Front wheel + tyre (left)__pivot",He.scale.set(1,1,1),Fe?(He.position.copy(Fe.start),He.rotation.set(0,0,0)):(He.position.set(1.06,-.27,1.75),He.rotation.set(0,0,0)),(n.root??e).add(He),n.wheelFront=He;let Pe=Fe?new ge(Fe.endRadius,Fe.baseRadius,Fe.length,16,6):new ge(.5,.5,1,24,8);Fe||Pe.scale(1.06,.32,1.06);let Ke=new re(Pe,t.tyreRubber??new be({color:8947848}));Ke.name="Front wheel + tyre (left)",Fe&&(Ke.position.copy(Fe.midpoint),Ke.quaternion.copy(Fe.quaternion)),Ke.castShadow=i.castShadow??!0,Ke.receiveShadow=i.receiveShadow??!0,He.add(Ke),s.wheelFront=Ke;let tt=Ue({parentId:"root",parentSocket:"wheelRearAxle",localStart:[.7,-.27,-1.7],localEnd:[1.3,-.27,-1.7],baseRadius:.53,endRadius:.53,contactType:"pivot-hinge",embedDepth:.02,gapTolerance:.005,evidenceRefs:["front-3q-left"]}),mt=new Ee;mt.name="Rear twin wheel (left)__pivot",mt.scale.set(1,1,1),tt?(mt.position.copy(tt.start),mt.rotation.set(0,0,0)):(mt.position.set(1,-.27,-1.7),mt.rotation.set(0,0,0)),(n.root??e).add(mt),n.wheelRear=mt;let it=tt?new ge(tt.endRadius,tt.baseRadius,tt.length,16,6):new ge(.5,.5,1,24,8);tt||it.scale(1.06,.6,1.06);let Ce=new re(it,t.tyreRubber??new be({color:8947848}));Ce.name="Rear twin wheel (left)",tt&&(Ce.position.copy(tt.midpoint),Ce.quaternion.copy(tt.quaternion)),Ce.castShadow=i.castShadow??!0,Ce.receiveShadow=i.receiveShadow??!0,mt.add(Ce),s.wheelRear=Ce;let Et=Ue(null),Qe=new Ee;Qe.name="Rear mudguard (left)__pivot",Qe.scale.set(1,1,1),Et?(Qe.position.copy(Et.start),Qe.rotation.set(0,0,0)):(Qe.position.set(1,.35,-1.7),Qe.rotation.set(0,0,0)),(n.root??e).add(Qe),n.fenderRear=Qe;let Qt=Et?new ge(Et.endRadius,Et.baseRadius,Et.length,16,6):new Ge(1,1,1,4,4,4);Et||Qt.scale(.66,.07,1.35);let jt=new re(Qt,t.trimBlack??new be({color:8947848}));jt.name="Rear mudguard (left)",Et&&(jt.position.copy(Et.midpoint),jt.quaternion.copy(Et.quaternion)),jt.castShadow=i.castShadow??!0,jt.receiveShadow=i.receiveShadow??!0,Qe.add(jt),s.fenderRear=jt;let gt=Ue(null),Vt=new Ee;Vt.name="Fuel tank (left)__pivot",Vt.scale.set(1,1,1),gt?(Vt.position.copy(gt.start),Vt.rotation.set(0,0,0)):(Vt.position.set(.8,-.08,.15),Vt.rotation.set(0,0,0)),(n.root??e).add(Vt),n.fuelTank=Vt;let ct=gt?new ge(gt.endRadius,gt.baseRadius,gt.length,16,6):new Ge(1,1,1,4,4,4);gt||ct.scale(.55,.55,1.2);let Ct=new re(ct,t.paintSilver??new be({color:8947848}));Ct.name="Fuel tank (left)",gt&&(Ct.position.copy(gt.midpoint),Ct.quaternion.copy(gt.quaternion)),Ct.castShadow=i.castShadow??!0,Ct.receiveShadow=i.receiveShadow??!0,Vt.add(Ct),s.fuelTank=Ct;let Ft=Ue(null),vt=new Ee;vt.name="Entry step box behind the front wheel (left)__pivot",vt.scale.set(1,1,1),Ft?(vt.position.copy(Ft.start),vt.rotation.set(0,0,0)):(vt.position.set(1.05,-.02,.98),vt.rotation.set(0,0,0)),(n.root??e).add(vt),n.stepBox=vt;let _n=Ft?new ge(Ft.endRadius,Ft.baseRadius,Ft.length,16,6):new Ge(1,1,1,4,4,4);Ft||_n.scale(.4,.72,.5);let Bt=new re(_n,t.trimBlack??new be({color:8947848}));Bt.name="Entry step box behind the front wheel (left)",Ft&&(Bt.position.copy(Ft.midpoint),Bt.quaternion.copy(Ft.quaternion)),Bt.castShadow=i.castShadow??!0,Bt.receiveShadow=i.receiveShadow??!0,vt.add(Bt),s.stepBox=Bt;let rn=Ue(null),_i=new Ee;_i.name="Engine and cab mounts between the frame rails__pivot",_i.scale.set(1,1,1),rn?(_i.position.copy(rn.start),_i.rotation.set(0,0,0)):(_i.position.set(0,.18,1.55),_i.rotation.set(0,0,0)),(n.root??e).add(_i),n.engineBlock=_i;let qh=rn?new ge(rn.endRadius,rn.baseRadius,rn.length,16,6):new Ge(1,1,1,4,4,4);rn||qh.scale(.9,.42,1.7);let xs=new re(qh,t.trimBlack??new be({color:8947848}));xs.name="Engine and cab mounts between the frame rails",rn&&(xs.position.copy(rn.midpoint),xs.quaternion.copy(rn.quaternion)),xs.castShadow=i.castShadow??!0,xs.receiveShadow=i.receiveShadow??!0,_i.add(xs),s.engineBlock=xs;let Un=Ue(null),xi=new Ee;xi.name="Fifth-wheel coupling plate__pivot",xi.scale.set(1,1,1),Un?(xi.position.copy(Un.start),xi.rotation.set(0,0,0)):(xi.position.set(0,.28,-1.45),xi.rotation.set(0,0,0)),(n.root??e).add(xi),n.fifthWheel=xi;let Yh=Un?new ge(Un.endRadius,Un.baseRadius,Un.length,16,6):new Ge(1,1,1,4,4,4);Un||Yh.scale(1.25,.12,1.05);let ys=new re(Yh,t.trimBlack??new be({color:8947848}));ys.name="Fifth-wheel coupling plate",Un&&(ys.position.copy(Un.midpoint),ys.quaternion.copy(Un.quaternion)),ys.castShadow=i.castShadow??!0,ys.receiveShadow=i.receiveShadow??!0,xi.add(ys),s.fifthWheel=ys;let Nn=Ue({parentId:"wheelFront",parentSocket:"wheelFrontHub",localStart:[.29,0,0],localEnd:[.335,0,0],baseRadius:.31,endRadius:.31,contactType:"flush-mount",embedDepth:.03,gapTolerance:.005,evidenceRefs:["front-3q-left"]}),yi=new Ee;yi.name="Front rim face (left)__pivot",yi.scale.set(1,1,1),Nn?(yi.position.copy(Nn.start),yi.rotation.set(0,0,0)):(yi.position.set(.28,0,0),yi.rotation.set(0,0,0)),(n.wheelFront??e).add(yi),n.rimFront=yi;let Zh=Nn?new ge(Nn.endRadius,Nn.baseRadius,Nn.length,16,6):new ge(.5,.5,1,24,8);Nn||Zh.scale(.62,.04,.62);let vs=new re(Zh,t.alloyRim??new be({color:8947848}));vs.name="Front rim face (left)",Nn&&(vs.position.copy(Nn.midpoint),vs.quaternion.copy(Nn.quaternion)),vs.castShadow=i.castShadow??!0,vs.receiveShadow=i.receiveShadow??!0,yi.add(vs),s.rimFront=vs;let Fn=Ue({parentId:"wheelRear",parentSocket:"wheelRearHub",localStart:[.57,0,0],localEnd:[.615,0,0],baseRadius:.31,endRadius:.31,contactType:"flush-mount",embedDepth:.03,gapTolerance:.005,evidenceRefs:["front-3q-left"]}),vi=new Ee;vi.name="Rear rim face (left)__pivot",vi.scale.set(1,1,1),Fn?(vi.position.copy(Fn.start),vi.rotation.set(0,0,0)):(vi.position.set(.32,0,0),vi.rotation.set(0,0,0)),(n.wheelRear??e).add(vi),n.rimRear=vi;let Jh=Fn?new ge(Fn.endRadius,Fn.baseRadius,Fn.length,16,6):new ge(.5,.5,1,24,8);Fn||Jh.scale(.62,.04,.62);let Ms=new re(Jh,t.alloyRim??new be({color:8947848}));Ms.name="Rear rim face (left)",Fn&&(Ms.position.copy(Fn.midpoint),Ms.quaternion.copy(Fn.quaternion)),Ms.castShadow=i.castShadow??!0,Ms.receiveShadow=i.receiveShadow??!0,vi.add(Ms),s.rimRear=Ms;let Bn=Ue({parentId:"wheelFront",parentSocket:"wheelFrontHub",localStart:[.335,0,0],localEnd:[.385,0,0],baseRadius:.12,endRadius:.1,contactType:"flush-mount",embedDepth:.01,gapTolerance:.005,evidenceRefs:["front-3q-left"]}),Mi=new Ee;Mi.name="Front hub cap (left)__pivot",Mi.scale.set(1,1,1),Bn?(Mi.position.copy(Bn.start),Mi.rotation.set(0,0,0)):(Mi.position.set(.255,0,0),Mi.rotation.set(0,0,0)),(n.wheelFront??e).add(Mi),n.hubFront=Mi;let $h=Bn?new ge(Bn.endRadius,Bn.baseRadius,Bn.length,16,6):new ge(.5,.5,1,24,8);Bn||$h.scale(.24,.05,.24);let Ss=new re($h,t.chromeBright??new be({color:8947848}));Ss.name="Front hub cap (left)",Bn&&(Ss.position.copy(Bn.midpoint),Ss.quaternion.copy(Bn.quaternion)),Ss.castShadow=i.castShadow??!0,Ss.receiveShadow=i.receiveShadow??!0,Mi.add(Ss),s.hubFront=Ss;let On=Ue({parentId:"wheelRear",parentSocket:"wheelRearHub",localStart:[.615,0,0],localEnd:[.665,0,0],baseRadius:.12,endRadius:.1,contactType:"flush-mount",embedDepth:.01,gapTolerance:.005,evidenceRefs:["front-3q-left"]}),Si=new Ee;Si.name="Rear hub cap (left)__pivot",Si.scale.set(1,1,1),On?(Si.position.copy(On.start),Si.rotation.set(0,0,0)):(Si.position.set(.295,0,0),Si.rotation.set(0,0,0)),(n.wheelRear??e).add(Si),n.hubRear=Si;let Kh=On?new ge(On.endRadius,On.baseRadius,On.length,16,6):new ge(.5,.5,1,24,8);On||Kh.scale(.24,.05,.24);let Es=new re(Kh,t.chromeBright??new be({color:8947848}));Es.name="Rear hub cap (left)",On&&(Es.position.copy(On.midpoint),Es.quaternion.copy(On.quaternion)),Es.castShadow=i.castShadow??!0,Es.receiveShadow=i.receiveShadow??!0,Si.add(Es),s.hubRear=Es;let Hn=Ue(null),Ei=new Ee;Ei.name="GIGASPACE nameplate__pivot",Ei.scale.set(1,1,1),Hn?(Ei.position.copy(Hn.start),Ei.rotation.set(0,0,0)):(Ei.position.set(0,.02,.11),Ei.rotation.set(0,0,0)),(n.sunVisor??e).add(Ei),n.visorPlate=Ei;let Qh=Hn?new ge(Hn.endRadius,Hn.baseRadius,Hn.length,16,6):new Ge(1,1,1,4,4,4);Hn||Qh.scale(1,.07,.02);let bs=new re(Qh,t.chromeBright??new be({color:8947848}));bs.name="GIGASPACE nameplate",Hn&&(bs.position.copy(Hn.midpoint),bs.quaternion.copy(Hn.quaternion)),bs.castShadow=i.castShadow??!0,bs.receiveShadow=i.receiveShadow??!0,Ei.add(bs),s.visorPlate=bs;let zn=Ue(null),bi=new Ee;bi.name="Front number plate__pivot",bi.scale.set(1,1,1),zn?(bi.position.copy(zn.start),bi.rotation.set(0,0,0)):(bi.position.set(0,-.09,.22),bi.rotation.set(0,0,0)),(n.bumperLower??e).add(bi),n.numberPlate=bi;let jh=zn?new ge(zn.endRadius,zn.baseRadius,zn.length,16,6):new Ge(1,1,1,4,4,4);zn||jh.scale(.52,.11,.02);let ws=new re(jh,t.plateWhite??new be({color:8947848}));ws.name="Front number plate",zn&&(ws.position.copy(zn.midpoint),ws.quaternion.copy(zn.quaternion)),ws.castShadow=i.castShadow??!0,ws.receiveShadow=i.receiveShadow??!0,bi.add(ws),s.numberPlate=ws;let kn=Ue(null),wi=new Ee;wi.name="Wiper arm (left of centre)__pivot",wi.scale.set(1,1,1),kn?(wi.position.copy(kn.start),wi.rotation.set(0,0,.12)):(wi.position.set(.42,-.4,.045),wi.rotation.set(0,0,.12)),(n.windshield??e).add(wi),n.wiper=wi;let eu=kn?new ge(kn.endRadius,kn.baseRadius,kn.length,16,6):new Ge(1,1,1,4,4,4);kn||eu.scale(.85,.03,.03);let Ts=new re(eu,t.trimBlack??new be({color:8947848}));Ts.name="Wiper arm (left of centre)",kn&&(Ts.position.copy(kn.midpoint),Ts.quaternion.copy(kn.quaternion)),Ts.castShadow=i.castShadow??!0,Ts.receiveShadow=i.receiveShadow??!0,wi.add(Ts),s.wiper=Ts;let Gn=Ue({parentId:"cabShell",parentSocket:"roofTop",localStart:[-.35,2.76,.7],localEnd:[-.35,3.08,.68],baseRadius:.012,endRadius:.008,contactType:"socket",embedDepth:.02,gapTolerance:.005,evidenceRefs:["front-3q-left"]}),Ti=new Ee;Ti.name="Roof antenna__pivot",Ti.scale.set(1,1,1),Gn?(Ti.position.copy(Gn.start),Ti.rotation.set(0,0,0)):(Ti.position.set(-.35,2.76,.7),Ti.rotation.set(0,0,0)),(n.cabShell??e).add(Ti),n.roofAntenna=Ti;let tu=Gn?new ge(Gn.endRadius,Gn.baseRadius,Gn.length,16,6):new ge(.5,.5,1,24,8);Gn||tu.scale(.02,.32,.02);let Rs=new re(tu,t.trimBlack??new be({color:8947848}));Rs.name="Roof antenna",Gn&&(Rs.position.copy(Gn.midpoint),Rs.quaternion.copy(Gn.quaternion)),Rs.castShadow=i.castShadow??!0,Rs.receiveShadow=i.receiveShadow??!0,Ti.add(Rs),s.roofAntenna=Rs;let Vn=Ue(null),Ri=new Ee;Ri.name="Entry step tread (left, repetition template)__pivot",Ri.scale.set(1,1,1),Vn?(Ri.position.copy(Vn.start),Ri.rotation.set(0,0,0)):(Ri.position.set(1.12,-.56,-.75),Ri.rotation.set(0,0,0)),(n.cabShell??e).add(Ri),n.stepTread=Ri;let nu=Vn?new ge(Vn.endRadius,Vn.baseRadius,Vn.length,16,6):new Ge(1,1,1,4,4,4);Vn||nu.scale(.3,.05,.5);let As=new re(nu,t.trimBlack??new be({color:8947848}));As.name="Entry step tread (left, repetition template)",Vn&&(As.position.copy(Vn.midpoint),As.quaternion.copy(Vn.quaternion)),As.castShadow=i.castShadow??!0,As.receiveShadow=i.receiveShadow??!0,Ri.add(As),s.stepTread=As;let Wn=Ue(null),Ai=new Ee;Ai.name="Entry step tread, upper (left)__pivot",Ai.scale.set(1,1,1),Wn?(Ai.position.copy(Wn.start),Ai.rotation.set(0,0,0)):(Ai.position.set(1.12,-.18,-.75),Ai.rotation.set(0,0,0)),(n.cabShell??e).add(Ai),n.stepTread2=Ai;let iu=Wn?new ge(Wn.endRadius,Wn.baseRadius,Wn.length,16,6):new Ge(1,1,1,4,4,4);Wn||iu.scale(.3,.05,.5);let Cs=new re(iu,t.trimBlack??new be({color:8947848}));Cs.name="Entry step tread, upper (left)",Wn&&(Cs.position.copy(Wn.midpoint),Cs.quaternion.copy(Wn.quaternion)),Cs.castShadow=i.castShadow??!0,Cs.receiveShadow=i.receiveShadow??!0,Ai.add(Cs),s.stepTread2=Cs;let Xn=Ue(null),Ci=new Ee;Ci.name="Headlight cluster (right)__pivot",Ci.scale.set(1,1,1),Xn?(Ci.position.copy(Xn.start),Ci.rotation.set(0,0,0)):(Ci.position.set(-.98,-.28,1.23),Ci.rotation.set(0,0,0)),(n.cabShell??e).add(Ci),n.headlightR=Ci;let su=Xn?new ge(Xn.endRadius,Xn.baseRadius,Xn.length,16,6):new Ge(1,1,1,4,4,4);Xn||su.scale(.42,.24,.08);let Is=new re(su,t.lampLens??new be({color:8947848}));Is.name="Headlight cluster (right)",Xn&&(Is.position.copy(Xn.midpoint),Is.quaternion.copy(Xn.quaternion)),Is.castShadow=i.castShadow??!0,Is.receiveShadow=i.receiveShadow??!0,Ci.add(Is),s.headlightR=Is;let qn=Ue(null),Ii=new Ee;Ii.name="Headlight LED / chrome reflector strip (right)__pivot",Ii.scale.set(1,1,1),qn?(Ii.position.copy(qn.start),Ii.rotation.set(0,0,0)):(Ii.position.set(-0,-.06,.045),Ii.rotation.set(0,0,0)),(n.headlightR??e).add(Ii),n.headlightDrlR=Ii;let ru=qn?new ge(qn.endRadius,qn.baseRadius,qn.length,16,6):new Ge(1,1,1,4,4,4);qn||ru.scale(.36,.04,.02);let Ps=new re(ru,t.chromeBright??new be({color:8947848}));Ps.name="Headlight LED / chrome reflector strip (right)",qn&&(Ps.position.copy(qn.midpoint),Ps.quaternion.copy(qn.quaternion)),Ps.castShadow=i.castShadow??!0,Ps.receiveShadow=i.receiveShadow??!0,Ii.add(Ps),s.headlightDrlR=Ps;let Yn=Ue(null),Pi=new Ee;Pi.name="Door window (right)__pivot",Pi.scale.set(1,1,1),Yn?(Pi.position.copy(Yn.start),Pi.rotation.set(0,0,0)):(Pi.position.set(-1.255,1.54,.48),Pi.rotation.set(0,0,0)),(n.cabShell??e).add(Pi),n.sideWindowR=Pi;let ou=Yn?new ge(Yn.endRadius,Yn.baseRadius,Yn.length,16,6):new Ge(1,1,1,4,4,4);Yn||ou.scale(.03,.8,.95);let Ls=new re(ou,t.glassTint??new be({color:8947848}));Ls.name="Door window (right)",Yn&&(Ls.position.copy(Yn.midpoint),Ls.quaternion.copy(Yn.quaternion)),Ls.castShadow=i.castShadow??!0,Ls.receiveShadow=i.receiveShadow??!0,Pi.add(Ls),s.sideWindowR=Ls;let Zn=Ue(null),Li=new Ee;Li.name="MirrorCam camera head (right)__pivot",Li.scale.set(1,1,1),Zn?(Li.position.copy(Zn.start),Li.rotation.set(0,0,0)):(Li.position.set(-1.4,1.99,1.15),Li.rotation.set(0,0,0)),(n.cabShell??e).add(Li),n.mirrorHeadR=Li;let au=Zn?new ge(Zn.endRadius,Zn.baseRadius,Zn.length,16,6):new Ge(1,1,1,4,4,4);Zn||au.scale(.16,.1,.14);let Ds=new re(au,t.trimBlack??new be({color:8947848}));Ds.name="MirrorCam camera head (right)",Zn&&(Ds.position.copy(Zn.midpoint),Ds.quaternion.copy(Zn.quaternion)),Ds.castShadow=i.castShadow??!0,Ds.receiveShadow=i.receiveShadow??!0,Li.add(Ds),s.mirrorHeadR=Ds;let Jn=Ue({parentId:"cabShell",parentSocket:"roofEdgeLeftR",localStart:[-1.2,2.17,.95],localEnd:[-1.36,2.04,1.13],baseRadius:.03,endRadius:.025,contactType:"socket",embedDepth:.03,gapTolerance:.005,evidenceRefs:["front-3q-left"]}),Di=new Ee;Di.name="MirrorCam arm (right)__pivot",Di.scale.set(1,1,1),Jn?(Di.position.copy(Jn.start),Di.rotation.set(0,0,0)):(Di.position.set(-1.22,2.02,.95),Di.rotation.set(0,0,0)),(n.cabShell??e).add(Di),n.mirrorArmR=Di;let cu=Jn?new ge(Jn.endRadius,Jn.baseRadius,Jn.length,16,6):new ge(.5,.5,1,24,8);Jn||cu.scale(.05,.35,.05);let Us=new re(cu,t.trimBlack??new be({color:8947848}));Us.name="MirrorCam arm (right)",Jn&&(Us.position.copy(Jn.midpoint),Us.quaternion.copy(Jn.quaternion)),Us.castShadow=i.castShadow??!0,Us.receiveShadow=i.receiveShadow??!0,Di.add(Us),s.mirrorArmR=Us;let $n=Ue({parentId:"root",parentSocket:"wheelFrontAxleR",localStart:[-.98,-.27,1.75],localEnd:[-1.3,-.27,1.75],baseRadius:.53,endRadius:.53,contactType:"pivot-hinge",embedDepth:.02,gapTolerance:.005,evidenceRefs:["front-3q-left"]}),Ui=new Ee;Ui.name="Front wheel + tyre (right)__pivot",Ui.scale.set(1,1,1),$n?(Ui.position.copy($n.start),Ui.rotation.set(0,0,0)):(Ui.position.set(-1.06,-.27,1.75),Ui.rotation.set(0,0,0)),(n.root??e).add(Ui),n.wheelFrontR=Ui;let lu=$n?new ge($n.endRadius,$n.baseRadius,$n.length,16,6):new ge(.5,.5,1,24,8);$n||lu.scale(1.06,.32,1.06);let Ns=new re(lu,t.tyreRubber??new be({color:8947848}));Ns.name="Front wheel + tyre (right)",$n&&(Ns.position.copy($n.midpoint),Ns.quaternion.copy($n.quaternion)),Ns.castShadow=i.castShadow??!0,Ns.receiveShadow=i.receiveShadow??!0,Ui.add(Ns),s.wheelFrontR=Ns;let Kn=Ue({parentId:"root",parentSocket:"wheelRearAxleR",localStart:[-.7,-.27,-1.7],localEnd:[-1.3,-.27,-1.7],baseRadius:.53,endRadius:.53,contactType:"pivot-hinge",embedDepth:.02,gapTolerance:.005,evidenceRefs:["front-3q-left"]}),Ni=new Ee;Ni.name="Rear twin wheel (right)__pivot",Ni.scale.set(1,1,1),Kn?(Ni.position.copy(Kn.start),Ni.rotation.set(0,0,0)):(Ni.position.set(-1,-.27,-1.7),Ni.rotation.set(0,0,0)),(n.root??e).add(Ni),n.wheelRearR=Ni;let hu=Kn?new ge(Kn.endRadius,Kn.baseRadius,Kn.length,16,6):new ge(.5,.5,1,24,8);Kn||hu.scale(1.06,.6,1.06);let Fs=new re(hu,t.tyreRubber??new be({color:8947848}));Fs.name="Rear twin wheel (right)",Kn&&(Fs.position.copy(Kn.midpoint),Fs.quaternion.copy(Kn.quaternion)),Fs.castShadow=i.castShadow??!0,Fs.receiveShadow=i.receiveShadow??!0,Ni.add(Fs),s.wheelRearR=Fs;let Qn=Ue(null),Fi=new Ee;Fi.name="Rear mudguard (right)__pivot",Fi.scale.set(1,1,1),Qn?(Fi.position.copy(Qn.start),Fi.rotation.set(0,0,0)):(Fi.position.set(-1,.35,-1.7),Fi.rotation.set(0,0,0)),(n.root??e).add(Fi),n.fenderRearR=Fi;let uu=Qn?new ge(Qn.endRadius,Qn.baseRadius,Qn.length,16,6):new Ge(1,1,1,4,4,4);Qn||uu.scale(.66,.07,1.35);let Bs=new re(uu,t.trimBlack??new be({color:8947848}));Bs.name="Rear mudguard (right)",Qn&&(Bs.position.copy(Qn.midpoint),Bs.quaternion.copy(Qn.quaternion)),Bs.castShadow=i.castShadow??!0,Bs.receiveShadow=i.receiveShadow??!0,Fi.add(Bs),s.fenderRearR=Bs;let jn=Ue(null),Bi=new Ee;Bi.name="Battery / AdBlue box (right)__pivot",Bi.scale.set(1,1,1),jn?(Bi.position.copy(jn.start),Bi.rotation.set(0,0,0)):(Bi.position.set(-.8,-.08,.15),Bi.rotation.set(0,0,0)),(n.root??e).add(Bi),n.fuelTankR=Bi;let du=jn?new ge(jn.endRadius,jn.baseRadius,jn.length,16,6):new Ge(1,1,1,4,4,4);jn||du.scale(.55,.55,1.2);let Os=new re(du,t.paintSilver??new be({color:8947848}));Os.name="Battery / AdBlue box (right)",jn&&(Os.position.copy(jn.midpoint),Os.quaternion.copy(jn.quaternion)),Os.castShadow=i.castShadow??!0,Os.receiveShadow=i.receiveShadow??!0,Bi.add(Os),s.fuelTankR=Os;let ei=Ue(null),Oi=new Ee;Oi.name="Entry step box behind the front wheel (right)__pivot",Oi.scale.set(1,1,1),ei?(Oi.position.copy(ei.start),Oi.rotation.set(0,0,0)):(Oi.position.set(-1.05,-.02,.98),Oi.rotation.set(0,0,0)),(n.root??e).add(Oi),n.stepBoxR=Oi;let fu=ei?new ge(ei.endRadius,ei.baseRadius,ei.length,16,6):new Ge(1,1,1,4,4,4);ei||fu.scale(.4,.72,.5);let Hs=new re(fu,t.trimBlack??new be({color:8947848}));Hs.name="Entry step box behind the front wheel (right)",ei&&(Hs.position.copy(ei.midpoint),Hs.quaternion.copy(ei.quaternion)),Hs.castShadow=i.castShadow??!0,Hs.receiveShadow=i.receiveShadow??!0,Oi.add(Hs),s.stepBoxR=Hs;let ti=Ue({parentId:"wheelFrontR",parentSocket:"wheelFrontHubR",localStart:[-.29,0,0],localEnd:[-.335,0,0],baseRadius:.31,endRadius:.31,contactType:"flush-mount",embedDepth:.03,gapTolerance:.005,evidenceRefs:["front-3q-left"]}),Hi=new Ee;Hi.name="Front rim face (right)__pivot",Hi.scale.set(1,1,1),ti?(Hi.position.copy(ti.start),Hi.rotation.set(0,0,0)):(Hi.position.set(-.28,0,0),Hi.rotation.set(0,0,0)),(n.wheelFrontR??e).add(Hi),n.rimFrontR=Hi;let pu=ti?new ge(ti.endRadius,ti.baseRadius,ti.length,16,6):new ge(.5,.5,1,24,8);ti||pu.scale(.62,.04,.62);let zs=new re(pu,t.alloyRim??new be({color:8947848}));zs.name="Front rim face (right)",ti&&(zs.position.copy(ti.midpoint),zs.quaternion.copy(ti.quaternion)),zs.castShadow=i.castShadow??!0,zs.receiveShadow=i.receiveShadow??!0,Hi.add(zs),s.rimFrontR=zs;let ni=Ue({parentId:"wheelRearR",parentSocket:"wheelRearHubR",localStart:[-.57,0,0],localEnd:[-.615,0,0],baseRadius:.31,endRadius:.31,contactType:"flush-mount",embedDepth:.03,gapTolerance:.005,evidenceRefs:["front-3q-left"]}),zi=new Ee;zi.name="Rear rim face (right)__pivot",zi.scale.set(1,1,1),ni?(zi.position.copy(ni.start),zi.rotation.set(0,0,0)):(zi.position.set(-.32,0,0),zi.rotation.set(0,0,0)),(n.wheelRearR??e).add(zi),n.rimRearR=zi;let mu=ni?new ge(ni.endRadius,ni.baseRadius,ni.length,16,6):new ge(.5,.5,1,24,8);ni||mu.scale(.62,.04,.62);let ks=new re(mu,t.alloyRim??new be({color:8947848}));ks.name="Rear rim face (right)",ni&&(ks.position.copy(ni.midpoint),ks.quaternion.copy(ni.quaternion)),ks.castShadow=i.castShadow??!0,ks.receiveShadow=i.receiveShadow??!0,zi.add(ks),s.rimRearR=ks;let ii=Ue({parentId:"wheelFrontR",parentSocket:"wheelFrontHubR",localStart:[-.335,0,0],localEnd:[-.385,0,0],baseRadius:.12,endRadius:.1,contactType:"flush-mount",embedDepth:.01,gapTolerance:.005,evidenceRefs:["front-3q-left"]}),ki=new Ee;ki.name="Front hub cap (right)__pivot",ki.scale.set(1,1,1),ii?(ki.position.copy(ii.start),ki.rotation.set(0,0,0)):(ki.position.set(-.255,0,0),ki.rotation.set(0,0,0)),(n.wheelFrontR??e).add(ki),n.hubFrontR=ki;let gu=ii?new ge(ii.endRadius,ii.baseRadius,ii.length,16,6):new ge(.5,.5,1,24,8);ii||gu.scale(.24,.05,.24);let Gs=new re(gu,t.chromeBright??new be({color:8947848}));Gs.name="Front hub cap (right)",ii&&(Gs.position.copy(ii.midpoint),Gs.quaternion.copy(ii.quaternion)),Gs.castShadow=i.castShadow??!0,Gs.receiveShadow=i.receiveShadow??!0,ki.add(Gs),s.hubFrontR=Gs;let si=Ue({parentId:"wheelRearR",parentSocket:"wheelRearHubR",localStart:[-.615,0,0],localEnd:[-.665,0,0],baseRadius:.12,endRadius:.1,contactType:"flush-mount",embedDepth:.01,gapTolerance:.005,evidenceRefs:["front-3q-left"]}),Gi=new Ee;Gi.name="Rear hub cap (right)__pivot",Gi.scale.set(1,1,1),si?(Gi.position.copy(si.start),Gi.rotation.set(0,0,0)):(Gi.position.set(-.295,0,0),Gi.rotation.set(0,0,0)),(n.wheelRearR??e).add(Gi),n.hubRearR=Gi;let _u=si?new ge(si.endRadius,si.baseRadius,si.length,16,6):new ge(.5,.5,1,24,8);si||_u.scale(.24,.05,.24);let Vs=new re(_u,t.chromeBright??new be({color:8947848}));Vs.name="Rear hub cap (right)",si&&(Vs.position.copy(si.midpoint),Vs.quaternion.copy(si.quaternion)),Vs.castShadow=i.castShadow??!0,Vs.receiveShadow=i.receiveShadow??!0,Gi.add(Vs),s.hubRearR=Vs;let ri=Ue(null),Vi=new Ee;Vi.name="Entry step tread (right, repetition template)__pivot",Vi.scale.set(1,1,1),ri?(Vi.position.copy(ri.start),Vi.rotation.set(0,0,0)):(Vi.position.set(-1.12,-.56,-.75),Vi.rotation.set(0,0,0)),(n.cabShell??e).add(Vi),n.stepTreadR=Vi;let xu=ri?new ge(ri.endRadius,ri.baseRadius,ri.length,16,6):new Ge(1,1,1,4,4,4);ri||xu.scale(.3,.05,.5);let Ws=new re(xu,t.trimBlack??new be({color:8947848}));Ws.name="Entry step tread (right, repetition template)",ri&&(Ws.position.copy(ri.midpoint),Ws.quaternion.copy(ri.quaternion)),Ws.castShadow=i.castShadow??!0,Ws.receiveShadow=i.receiveShadow??!0,Vi.add(Ws),s.stepTreadR=Ws;let oi=Ue(null),Wi=new Ee;Wi.name="Entry step tread, upper (right)__pivot",Wi.scale.set(1,1,1),oi?(Wi.position.copy(oi.start),Wi.rotation.set(0,0,0)):(Wi.position.set(-1.12,-.18,-.75),Wi.rotation.set(0,0,0)),(n.cabShell??e).add(Wi),n.stepTread2R=Wi;let yu=oi?new ge(oi.endRadius,oi.baseRadius,oi.length,16,6):new Ge(1,1,1,4,4,4);oi||yu.scale(.3,.05,.5);let Xs=new re(yu,t.trimBlack??new be({color:8947848}));Xs.name="Entry step tread, upper (right)",oi&&(Xs.position.copy(oi.midpoint),Xs.quaternion.copy(oi.quaternion)),Xs.castShadow=i.castShadow??!0,Xs.receiveShadow=i.receiveShadow??!0,Wi.add(Xs),s.stepTread2R=Xs;{let qs=n.hubFront??e,Ys=new Ge(1,1,1,4,4,4),Zs=t.trimBlack??new be({color:8947848}),Wt=[.06,.06,.06],Xt=new w(1,0,0).normalize(),xn=.44,Js=Math.abs(Xt.z)<.9?new w(0,0,1):new w(1,0,0),$s=new w().crossVectors(Xt,Js).normalize(),dt=new dr(Ys,Zs,10),yn=new nt,vn=new w,Mn=new Lt,Ks=new w(Wt[0],Wt[1],Wt[2]);for(let Tt=0;Tt<10;Tt++){let Qs=(0+Tt*360/10)*Math.PI/180,Sn=$s.clone().applyQuaternion(new Lt().setFromAxisAngle(Xt,Qs));vn.copy(xn>0?Sn.clone().multiplyScalar(xn*.5):new w),Mn.setFromUnitVectors(new w(1,0,0),Sn),yn.compose(vn,Mn,Ks),dt.setMatrixAt(Tt,yn)}dt.instanceMatrix.needsUpdate=!0,dt.castShadow=i.castShadow??!0,dt.receiveShadow=i.receiveShadow??!0,dt.name="hubFrontHandHoles",qs.add(dt)}{let qs=n.hubFrontR??e,Ys=new Ge(1,1,1,4,4,4),Zs=t.trimBlack??new be({color:8947848}),Wt=[.06,.06,.06],Xt=new w(1,0,0).normalize(),xn=.44,Js=Math.abs(Xt.z)<.9?new w(0,0,1):new w(1,0,0),$s=new w().crossVectors(Xt,Js).normalize(),dt=new dr(Ys,Zs,10),yn=new nt,vn=new w,Mn=new Lt,Ks=new w(Wt[0],Wt[1],Wt[2]);for(let Tt=0;Tt<10;Tt++){let Qs=(0+Tt*360/10)*Math.PI/180,Sn=$s.clone().applyQuaternion(new Lt().setFromAxisAngle(Xt,Qs));vn.copy(xn>0?Sn.clone().multiplyScalar(xn*.5):new w),Mn.setFromUnitVectors(new w(1,0,0),Sn),yn.compose(vn,Mn,Ks),dt.setMatrixAt(Tt,yn)}dt.instanceMatrix.needsUpdate=!0,dt.castShadow=i.castShadow??!0,dt.receiveShadow=i.receiveShadow??!0,dt.name="hubFrontRHandHoles",qs.add(dt)}{let qs=n.hubRear??e,Ys=new Ge(1,1,1,4,4,4),Zs=t.trimBlack??new be({color:8947848}),Wt=[.06,.06,.06],Xt=new w(1,0,0).normalize(),xn=.44,Js=Math.abs(Xt.z)<.9?new w(0,0,1):new w(1,0,0),$s=new w().crossVectors(Xt,Js).normalize(),dt=new dr(Ys,Zs,10),yn=new nt,vn=new w,Mn=new Lt,Ks=new w(Wt[0],Wt[1],Wt[2]);for(let Tt=0;Tt<10;Tt++){let Qs=(0+Tt*360/10)*Math.PI/180,Sn=$s.clone().applyQuaternion(new Lt().setFromAxisAngle(Xt,Qs));vn.copy(xn>0?Sn.clone().multiplyScalar(xn*.5):new w),Mn.setFromUnitVectors(new w(1,0,0),Sn),yn.compose(vn,Mn,Ks),dt.setMatrixAt(Tt,yn)}dt.instanceMatrix.needsUpdate=!0,dt.castShadow=i.castShadow??!0,dt.receiveShadow=i.receiveShadow??!0,dt.name="hubRearHandHoles",qs.add(dt)}{let qs=n.hubRearR??e,Ys=new Ge(1,1,1,4,4,4),Zs=t.trimBlack??new be({color:8947848}),Wt=[.06,.06,.06],Xt=new w(1,0,0).normalize(),xn=.44,Js=Math.abs(Xt.z)<.9?new w(0,0,1):new w(1,0,0),$s=new w().crossVectors(Xt,Js).normalize(),dt=new dr(Ys,Zs,10),yn=new nt,vn=new w,Mn=new Lt,Ks=new w(Wt[0],Wt[1],Wt[2]);for(let Tt=0;Tt<10;Tt++){let Qs=(0+Tt*360/10)*Math.PI/180,Sn=$s.clone().applyQuaternion(new Lt().setFromAxisAngle(Xt,Qs));vn.copy(xn>0?Sn.clone().multiplyScalar(xn*.5):new w),Mn.setFromUnitVectors(new w(1,0,0),Sn),yn.compose(vn,Mn,Ks),dt.setMatrixAt(Tt,yn)}dt.instanceMatrix.needsUpdate=!0,dt.castShadow=i.castShadow??!0,dt.receiveShadow=i.receiveShadow??!0,dt.name="hubRearRHandHoles",qs.add(dt)}return e.userData.sculptRuntime={nodes:n,meshes:s,sockets:r,colliders:o,destructionGroups:a},e.userData.actionReadiness={note:"Use root.userData.sculptRuntime.nodes for transforms, sockets for attachments, colliders for physics proxies, and destructionGroups for breakable sets."},e}var fy=.53,so=-3,py=["wheelFront","wheelFrontR","wheelRear","wheelRearR"],$o=i=>Math.min(1,Math.max(0,i)),Pn=(i,e,t)=>i+(e-i)*t,mf=(i,e,t)=>$o((i-e)/(t-e)),my=i=>1-(1-i)**4,gy=i=>i*i*i,Sc=i=>i<.5?4*i*i*i:1-(-2*i+2)**3/2,gr=gn.degToRad,vc=null;function _y(){if(vc)return vc;let i=pf({castShadow:!1,receiveShadow:!1});i.updateMatrixWorld(!0);let e=i.userData.sculptRuntime.nodes,t=py.map(c=>e[c]),n=c=>{for(let l=c;l;l=l.parent)if(t.includes(l))return l;return null},s=new Ee;s.name="SPN Actros";let r=new nt,o=new nt;for(let c of t){let l=new Ee;l.name="wheel",c.matrixWorld.decompose(l.position,l.quaternion,l.scale),r.copy(c.matrixWorld).invert(),c.traverse(h=>{if(!h.isMesh)return;let u=h.clone(!1);o.multiplyMatrices(r,h.matrixWorld),o.decompose(u.position,u.quaternion,u.scale),l.add(u)}),s.add(l)}let a=new Map;i.traverse(c=>{if(!c.isMesh||c.isInstancedMesh||n(c))return;let l=c.geometry.clone().applyMatrix4(c.matrixWorld);l=cf(l,gr(35));for(let h of Object.keys(l.attributes))["position","normal","uv"].includes(h)||l.deleteAttribute(h);a.has(c.material)||a.set(c.material,[]),a.get(c.material).push(l)});for(let[c,l]of a)s.add(new re(af(l),c));return vc=s,vc}var Jo=null;function xy(){if(Jo)return Jo;let i=document.createElement("canvas");i.width=i.height=128;let e=i.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.18,"rgba(255,255,255,0.85)"),t.addColorStop(.45,"rgba(255,255,255,0.22)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),Jo=new _s(i),Jo.colorSpace=wt,Jo}var Mc=null;function yy(){if(Mc)return Mc;let i=document.createElement("canvas");i.width=64,i.height=128;let e=i.getContext("2d");e.translate(32,64),e.scale(1,2);let t=e.createRadialGradient(0,0,4,0,0,32);return t.addColorStop(0,"rgba(0,0,0,0.55)"),t.addColorStop(.55,"rgba(0,0,0,0.3)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.fillRect(-32,-32,64,64),Mc=new _s(i),Mc}var oo=class{constructor({night:e=!1}={}){this.object=_y().clone(),this.wheels=this.object.children.filter(s=>s.name==="wheel"),this.lamps=[];let t=new re(new gs(3.3,7.4),new Cn({map:yy(),transparent:!0,depthWrite:!1,toneMapped:!1,opacity:e?.9:.75}));t.rotation.x=-Math.PI/2,t.position.set(0,.012,so),t.renderOrder=1,this.object.add(t);let n=(s,r,o,a,c,l)=>{let h=new Za(new Do({map:xy(),color:a,transparent:!0,depthWrite:!1,fog:!1,blending:l?Da:fs,toneMapped:!1}));return h.position.set(s,r,o),h.userData.size=c,this.object.add(h),this.lamps.push(h),h};for(let s of[-.98,.98])n(s,.9,.16,e?"#eaf2ff":"#ffffff",e?1.4:.5,e);for(let s of[-.82,.82])n(s,.78,-6.16,e?"#ff1f2d":"#e0101c",e?1.25:.32,e);this.distance=0}place(e,t,n=0){this.object.rotation.y=n,this.object.position.set(e-Math.sin(n)*so,0,t-Math.cos(n)*so)}roll(e){this.distance=e;let t=e/fy;for(let n of this.wheels)n.rotation.x=t}sizeLamps(e,t,n){let s=new w,r=2*Math.tan(gr(e.fov)/2)/n;for(let o of this.lamps){o.getWorldPosition(s);let a=s.distanceTo(e.position),c=Math.max(o.userData.size,a*r*t);o.scale.set(c,c,1)}}};function vy(i,e){let t=document.createElement("canvas");t.width=256,t.height=512;let n=t.getContext("2d"),s=256/9,r=512/12;n.fillStyle=i?"#0c0c0e":"#e7e7eb",n.fillRect(0,0,256,512),n.fillStyle=i?"#3a3a3c":"#ffffff",n.fillRect(.35*s,0,.15*s,512),n.fillRect(256-.5*s,0,.15*s,512),n.fillRect(128-.075*s,0,.15*s,4.5*r);let o=new _s(t);return o.colorSpace=wt,o.wrapS=Qi,o.wrapT=di,o.anisotropy=e,o}function Xh(i,{night:e,centreX:t=1.75,from:n=-400,to:s=400}){let r=s-n,o=vy(e,i.renderer.capabilities.getMaxAnisotropy());o.repeat.set(1,r/12);let a=new re(new gs(9,r),new Cn({map:o,toneMapped:!1}));return a.rotation.x=-Math.PI/2,a.position.set(t,0,(n+s)/2),a}function My(i,{night:e}){let t=new Qr(e?"#ffffff":"#fff4e6",e?2.4:2.3),n=new Qr(e?"#c4d6ff":"#e2ebff",e?1.7:1.1);return e?(i.add(new Kr("#8c96a8","#050505",.5)),t.position.set(-8,11,-6),n.position.set(7,5,10)):(i.add(new Kr("#ffffff","#c9cbd1",1.5)),t.position.set(-9,12,9),n.position.set(6,6,-10)),i.add(t,n),{key:t,rim:n}}var en=window.matchMedia("(prefers-reduced-motion: reduce)"),ao=class{constructor(e,{background:t,night:n=!1,fov:s=30,fog:r=null,exposure:o=n?1:1.12}){this.host=e,this.night=n,this.canvas=document.createElement("canvas"),this.canvas.className="stage3d",this.canvas.setAttribute("aria-hidden","true"),e.prepend(this.canvas),this.renderer=new Xa({canvas:this.canvas,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),this.renderer.toneMapping=dc,this.renderer.toneMappingExposure=o,this.renderer.outputColorSpace=wt,this.scene=new Zr,this.scene.background=new We(t),r&&(this.scene.fog=new qa(t,r[0],r[1]));let a=new ur(this.renderer);this.scene.environment=a.fromScene(new _c,.04).texture,this.scene.environmentIntensity=n?.4:.85,a.dispose(),this.lights=My(this.scene,{night:n}),this.camera=new zt(s,1,.1,600),this.width=1,this.height=1,this.visible=!1,new ResizeObserver(()=>this.resize()).observe(e),this.resize()}resize(){let e=Math.max(1,this.host.clientWidth),t=Math.max(1,this.host.clientHeight);e===this.width&&t===this.height||(this.width=e,this.height=t,this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),en.matches&&this.ready&&this.frame(0,0))}fit(e,t,n,s){let r=Math.tan(gr(this.camera.fov)/2);return Math.max(t/s/(2*r),e/n/(2*r*this.camera.aspect))}orbit(e,t,n,s){let r=gr(t),o=gr(n);this.camera.position.set(e.x+Math.sin(r)*Math.cos(o)*s,e.y+Math.sin(o)*s,e.z+Math.cos(r)*Math.cos(o)*s),this.camera.lookAt(e)}frame(e,t){this.update(e,t),this.renderer.render(this.scene,this.camera),this.live||(this.live=!0,this.host.classList.add("is-live"))}},Ko=()=>window.innerHeight||document.documentElement.clientHeight,zh=class extends ao{constructor(e,t){super(e,{background:"#f5f5f7",fov:30,fog:[40,200]}),this.section=t,this.scene.add(Xh(this,{night:!1,centreX:1.75,from:-420,to:160})),this.truck=new oo,this.scene.add(this.truck.object),this.target=new w,this.introStart=null,(this.progress()>.04||en.matches)&&(this.introStart=-1e9),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Th;let{key:n}=this.lights;n.castShadow=!0;let s=window.matchMedia("(max-width: 48rem)").matches?1024:2048;n.shadow.mapSize.set(s,s),Object.assign(n.shadow.camera,{left:-6,right:6,top:7,bottom:-7,near:1,far:60}),n.shadow.camera.updateProjectionMatrix(),n.shadow.bias=-5e-4,n.shadow.normalBias=.03,this.keyDirection=n.position.clone().normalize().multiplyScalar(24),this.scene.add(n.target);let r=new re(new gs(40,640),new rc({opacity:.2}));r.rotation.x=-Math.PI/2,r.position.set(1.75,.005,-150),r.receiveShadow=!0,this.scene.add(r),this.truck.object.traverse(o=>{o.isMesh&&!o.material.transparent&&(o.castShadow=!0)}),this.pointer={x:0,y:0,tx:0,ty:0},window.matchMedia("(pointer: fine)").matches&&window.addEventListener("pointermove",o=>{this.pointer.tx=o.clientX/window.innerWidth*2-1,this.pointer.ty=o.clientY/window.innerHeight*2-1},{passive:!0})}progress(){let e=this.section.getBoundingClientRect();return $o(-e.top/Math.max(1,e.height-Ko()))}update(e){let t=this.lastTime===void 0?0:Math.max(0,e-this.lastTime);this.introStart===null?(this.introStart=0,this.introClock=0):this.introStart===0&&(this.introClock+=Math.min(e-this.lastTime,1/30)),this.lastTime=e;let n=en.matches||this.introStart!==0?1:$o(this.introClock/4.2),s=en.matches?0:this.progress(),r=my(n),o=gy(mf(s,.5,.94)),a=Pn(-190,0,r)+80*o;this.truck.place(0,a+so,0),this.truck.roll(a);let c=Sc(mf(s,.04,.5)),l=en.matches?0:Math.sin(e*.35)*2.2*(1-c)*r,h=en.matches?0:1-Math.exp(-t*3);this.pointer.x+=(this.pointer.tx-this.pointer.x)*h,this.pointer.y+=(this.pointer.ty-this.pointer.y)*h;let u=r*(1-.7*c),d=Pn(Pn(-3,-30,Sc(n)),-90,c)+l+this.pointer.x*6*u,f=Math.max(1,Pn(4.5,2.5,c)-this.pointer.y*2*u),g=Math.abs(Math.sin(gr(d))),_=2.5*Math.sqrt(1-g*g)+6.4*g,m=this.camera.aspect<.8,p=this.fit(_,4,m?.88:.6,m?.34:.4);this.target.set(0,1.85,Pn(m?-2.7:-1.9,so,c)),this.orbit(this.target,d,f,p);let R=Pn(m?.27:.25,.06,c);this.camera.setViewOffset(this.width,this.height,0,-R*this.height,this.width,this.height),this.truck.sizeLamps(this.camera,3,this.height);let{key:E}=this.lights;E.target.position.set(0,0,a+so),E.position.copy(E.target.position).add(this.keyDirection)}},ln=2.6,$t=9,io=3.2,kh=Math.PI*ln,ro=4*$t+2*kh;function gf(i){if(i=(i%ro+ro)%ro,i<2*$t)return{x:-ln,z:-$t+i,tx:0,tz:1};if(i-=2*$t,i<kh){let t=Math.PI-i/ln;return{x:ln*Math.cos(t),z:$t+ln*Math.sin(t),tx:Math.sin(t),tz:-Math.cos(t)}}if(i-=kh,i<2*$t)return{x:ln,z:$t-i,tx:0,tz:-1};i-=2*$t;let e=-i/ln;return{x:ln*Math.cos(e),z:-$t+ln*Math.sin(e),tx:Math.sin(e),tz:-Math.cos(e)}}var Gh=class extends ao{constructor(e){super(e,{background:"#ffffff",fov:22,exposure:.95});let t=[];for(let o=0;o<=160;o++){let a=gf(o/160*ro);t.push(new w(a.x,.01,a.z))}let n=new Fo(t,!0),s=new re(new sc(n,240,.06,4,!0),new Cn({color:"#d2d2d7",toneMapped:!1}));s.scale.y=.2,this.scene.add(s);let r=new Cn({color:"#1d1d1f",toneMapped:!1});for(let o of[-$t+io,$t-io]){let a=new re(new tc(.3,32),r);a.rotation.x=-Math.PI/2,a.position.set(-ln-1.9,.015,o),this.scene.add(a)}this.truck=new oo,this.scene.add(this.truck.object),this.labels=[...e.querySelectorAll("[data-stop]")],this.stops=[new w(-ln-1.9,0,-$t+io),new w(-ln-1.9,0,$t-io)]}update(e){let t=en.matches?0:e%11,n=io,s=2*$t-io,r;t<1.1?r=n:t<4.1?r=Pn(n,s,Sc((t-1.1)/3)):t<5.2?r=s:r=Pn(s,ro+n,Sc((t-5.2)/5.8));let o=gf(r);this.truck.place(o.x,o.z,Math.atan2(o.tx,o.tz)),this.truck.roll(Math.floor((en.matches?0:e)/11)*ro+r);let a=this.fit(2*($t+ln+1.8),11,.98,.9);this.orbit(new w(.2,0,0),-90,56,a),this.camera.updateMatrixWorld(),this.truck.sizeLamps(this.camera,2,this.height);let c=new w;this.labels.forEach((l,h)=>{c.copy(this.stops[h]).project(this.camera),l.style.transform=`translate(${(c.x+1)/2*this.width}px, ${(1-c.y)/2*this.height}px)`})}},Vh=class extends ao{constructor(e){super(e,{background:"#000000",night:!0,fov:24,fog:[26,70]}),this.scene.add(Xh(this,{night:!0,centreX:0,from:-300,to:300})),this.pool=Array.from({length:6},()=>{let t=new oo({night:!0});return t.object.visible=!1,this.scene.add(t.object),{truck:t,active:!1}}),this.lanes=[{x:-1.75,dir:1,speed:12.5,next:0},{x:1.75,dir:-1,speed:10,next:1.4}],this.last=null,this.target=new w}progress(){let e=this.host.getBoundingClientRect();return $o((Ko()-e.top)/(Ko()+e.height))}spawn(e,t){let n=this.pool.find(s=>!s.active);n&&(Object.assign(n,{active:!0,lane:e,z:t,distance:Math.random()*10}),n.truck.object.visible=!0)}update(e){let t=this.progress(),n=this.fit(this.camera.aspect<1.4?8:14,4.2,.9,.6);this.target.set(0,1.7,Pn(-3,3,t)),this.orbit(this.target,Pn(-82,-98,t),3.5,n),this.camera.updateMatrixWorld();let s=this.camera.aspect<1.4,r=n*Math.tan(gr(this.camera.fov)/2)*this.camera.aspect+7.5;if(en.matches)this.parked||(this.parked=!0,this.spawn(this.lanes[0],-3.5),this.spawn(this.lanes[1],5.5));else{let o=this.last===null?0:Math.min(.1,e-this.last);this.last=e,this.seeded||(this.seeded=!0,this.spawn(this.lanes[0],-6),this.spawn(this.lanes[1],9));for(let a of this.lanes)a.next-=o,a.next<=0&&(this.spawn(a,-a.dir*r+this.target.z),a.next=s?1.4+Math.random()*1.2:2.4+Math.random()*2);for(let a of this.pool)a.active&&(a.z+=a.lane.dir*a.lane.speed*o,a.distance+=a.lane.speed*o,Math.abs(a.z-this.target.z)>r+2&&(a.active=!1,a.truck.object.visible=!1))}for(let o of this.pool)o.active&&(o.truck.place(o.lane.x,o.z,o.lane.dir>0?0:Math.PI),o.truck.roll(o.distance),o.truck.sizeLamps(this.camera,2,this.height))}},Wh=class extends ao{constructor(e){super(e,{background:"#000000",night:!0,fov:28,fog:[24,120]}),this.scene.add(Xh(this,{night:!0,centreX:1.75,from:-40,to:420})),this.truck=new oo({night:!0}),this.scene.add(this.truck.object)}progress(){let t=this.host.getBoundingClientRect().top+window.scrollY-Ko(),n=document.documentElement.scrollHeight-Ko();return n<=t?1:$o((window.scrollY-t)/(n-t))}update(){let e=en.matches?.35:this.progress(),t=Pn(5,190,e*e);this.truck.place(0,t,0),this.truck.roll(t);let n=this.camera.aspect<.9;this.camera.position.set(n?.6:1.2,2.5,n?-15:-11),this.camera.lookAt(.4,1.6,40),this.camera.updateMatrixWorld(),this.truck.sizeLamps(this.camera,4,this.height)}},_f={hero:i=>new zh(i,i.closest("[data-scroll-stage]")??i),shuttle:i=>new Gh(i),traffic:i=>new Vh(i),away:i=>new Wh(i)};function qy({root:i=document,onFail:e=()=>{}}={}){let t=[...i.querySelectorAll("[data-stage]")].filter(l=>_f[l.dataset.stage]),n=new Map,s=!1,r=new uc,o=()=>{let l=[...n.values()].filter(u=>u.visible);if(!l.length||en.matches){s=!1;return}let h=r.getElapsedTime();for(let u of l)u.frame(h);requestAnimationFrame(o)},a=()=>{s||en.matches||(s=!0,requestAnimationFrame(o))},c=new IntersectionObserver(l=>{for(let h of l){let u=n.get(h.target);if(!u&&h.isIntersecting){try{u=_f[h.target.dataset.stage](h.target)}catch(d){c.disconnect(),e(d);return}u.ready=!0,n.set(h.target,u)}u&&(u.visible=h.isIntersecting,u.visible&&en.matches&&u.frame(0,0))}a()},{rootMargin:"25% 0px"});for(let l of t)c.observe(l);return en.addEventListener?.("change",()=>{for(let l of n.values())l.visible&&l.frame(0,0);a()}),n}export{qy as mountRoad};
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
