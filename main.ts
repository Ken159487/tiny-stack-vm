import{readdirSync as L,readFileSync as G,writeFileSync as S,mkdirSync as K}from"node:fs";
const OC="12345678000000009999999:999;99909990000000000000<=>?@00000000000AB00000000000000CDEF";
const PP="x0001122321101100121101",PH="x0110223311100000100010",IM="x0140000000022220000000";
const AL=[(a,b)=>a+b,(a,b)=>a-b,Math.imul,(a,b)=>a==-2147483648&&b==-1?a:a/b,(a,b)=>b==-1?0:a%b,(a,b)=>Math.floor((a>>>0)/(b>>>0)),(a,b)=>(a>>>0)%(b>>>0),0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,0,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>a>>>(b&31),(a,b)=>a==b,(a,b)=>a<b,(a,b)=>(a>>>0)<(b>>>0)];
function run(p,n){
const Q=p.length,ds=new Int32Array(256),cs=new Int32Array(64),mm=new Int32Array(256),ob=new Uint8Array(65536);
let dp=0,cp=0,ol=0,ix=0,pc=0,st=0;
const fin=e=>[ob.slice(0,ol),e];
for(;;){
if(st===1e6)return fin(10);
if(pc<0||pc>=Q)return fin(9);
const k=p[pc],c=OC.charCodeAt(k)-48;
if(!c)return fin(5);
const m=IM[c]|0;
if(pc+m>=Q)return fin(9);
st++;
const nx=pc+1+m,pp=PP[c]|0;
if(dp<pp)return fin(2);
const ph=PH[c]|0;
if(dp-pp+ph>256)return fin(3);
pc=nx;
switch(c){
case 1:return fin(0);
case 2:ds[dp++]=(p[nx-1]<<24)>>24;break;
case 3:ds[dp++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
case 4:dp--;break;
case 5:ds[dp]=ds[dp-1];dp++;break;
case 6:[ds[dp-1],ds[dp-2]]=[ds[dp-2],ds[dp-1]];break;
case 7:ds[dp]=ds[dp-2];dp++;break;
case 8:[ds[dp-3],ds[dp-2],ds[dp-1]]=[ds[dp-2],ds[dp-1],ds[dp-3]];break;
case 9:{const b=ds[dp-1],a=ds[dp-2],j=k-16-(k>31);
if(j>2&&j<7&&!b)return fin(4);
dp-=2;ds[dp++]=AL[j](a,b);break;}
case 10:ds[dp-1]=-ds[dp-1]|0;break;
case 11:ds[dp-1]=~ds[dp-1];break;
case 12:case 13:case 14:{
const r=(p[nx-2]|p[nx-1]<<8)<<16>>16;
let v=0;if(c>12)v=ds[--dp];if(c<13||(c==13)==(v==0))pc=nx+r;break;}
case 15:
if(cp>63)return fin(7);
cs[cp++]=nx;pc=p[nx-2]|p[nx-1]<<8;break;
case 16:
if(!cp)return fin(8);
pc=cs[--cp];break;
case 17:{const a=ds[dp-1];
if(a>>>0>=256)return fin(6);
ds[dp-1]=mm[a];break;}
case 18:{const a=ds[dp-1],v=ds[dp-2];
if(a>>>0>=256)return fin(6);
dp-=2;mm[a]=v;break;}
case 19:{const s=String(ds[dp-1]);
if(ol+s.length>65536)return fin(11);
dp--;for(const h of s)ob[ol++]=h.charCodeAt();break;}
case 20:
if(ol+1>65536)return fin(11);
ob[ol++]=ds[--dp]&255;break;
case 21:ds[dp++]=ix<n.length?n[ix++]:-1;break;
case 22:return fin(ds[--dp]&255);
default:return fin(5);
}
}
}
const{MAKEFUN_INPUT_DIR:ID="/input",MAKEFUN_OUTPUT_DIR:OD="/output"}=process.env;
function wr(id,so,e){
K(OD+"/"+id,{recursive:true});
S(OD+"/"+id+"/stdout.bin",so);
S(OD+"/"+id+"/exit.txt",e+"\n");
}
for(const id of L(ID).sort()){
try{
wr(id,...run(G(ID+"/"+id+"/program.bin"),G(ID+"/"+id+"/input.bin")));
}catch{
try{wr(id,new Uint8Array,9);}catch{}
}
}
