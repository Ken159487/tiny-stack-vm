// Tiny Stack VM (37 opcodes, Node 22). Input MAKEFUN_INPUT_DIR,
// output MAKEFUN_OUTPUT_DIR. Deterministic, builtins only.
import{readdirSync as L,readFileSync as G,writeFileSync as S,mkdirSync as K}from"node:fs";
import{join as J}from"node:path";
const SM=256,CM=64,MM=256,OM=65536;
const U=2,O=3,D=4,B=5,M=6,CD=7,RE=8,PC=9,ST=10,OU=11;
const OC="12345678000000009999999:999;99909990000000000000<=>?@00000000000AB00000000000000CDEF";
const PP="x0001122321101100121101",PH="x0110223311100000100010",IM="x0140000000022220000000";
const AL=[(a,b)=>(a+b)|0,(a,b)=>(a-b)|0,Math.imul,(a,b)=>a===-2147483648&&b===-1?a:(a/b)|0,(a,b)=>b===-1?0:a%b|0,(a,b)=>Math.floor((a>>>0)/(b>>>0))|0,(a,b)=>(a>>>0)%(b>>>0)|0,0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,0,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>(a>>>(b&31))|0,(a,b)=>+(a===b),(a,b)=>+(a<b),(a,b)=>+((a>>>0)<(b>>>0))];
function run(p,n){
const Q=p.length,ds=new Int32Array(SM);
let dp=0;const cs=new Int32Array(CM);let cp=0;
const mm=new Int32Array(MM),ob=new Uint8Array(OM);
let ol=0,ix=0,pc=0,st=0;
const fin=e=>({stdout:ob.slice(0,ol),exit:e});
for(;;){
if(st===1e6)return fin(ST);
if(pc<0||pc>=Q)return fin(PC);
const k=p[pc],c=OC.charCodeAt(k)-48;
if(!c)return fin(B);
const m=IM[c]|0;
if(pc+m>=Q)return fin(PC);
st++;
const nx=pc+1+m,pp=PP[c]|0;
if(dp<pp)return fin(U);
const ph=PH[c]|0;
if(dp-pp+ph>SM)return fin(O);
pc=nx;
switch(c){
case 1:return fin(0);
case 2:ds[dp++]=(p[nx-1]<<24)>>24;break;
case 3:ds[dp++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
case 4:dp--;break;
case 5:ds[dp]=ds[dp-1];dp++;break;
case 6:{const t=ds[dp-1];ds[dp-1]=ds[dp-2];ds[dp-2]=t;break;}
case 7:ds[dp]=ds[dp-2];dp++;break;
case 8:{const a=ds[dp-3];ds[dp-3]=ds[dp-2];ds[dp-2]=ds[dp-1];ds[dp-1]=a;break;}
case 9:{const b=ds[dp-1],a=ds[dp-2],j=k<32?k-16:k-17;
if(j>2&&j<7&&!b)return fin(D);
dp-=2;ds[dp++]=AL[j](a,b);break;}
case 10:ds[dp-1]=-ds[dp-1]|0;break;
case 11:ds[dp-1]=~ds[dp-1];break;
case 12:case 13:case 14:{
const r=((p[nx-2]|p[nx-1]<<8)<<16)>>16;
let tk=true;
if(c!==12){const v=ds[--dp];tk=c===13?v===0:v!==0;}
if(tk)pc=nx+r;break;}
case 15:
if(cp===CM)return fin(CD);
cs[cp++]=nx;pc=p[nx-2]|p[nx-1]<<8;break;
case 16:
if(!cp)return fin(RE);
pc=cs[--cp];break;
case 17:{const a=ds[dp-1];
if(a<0||a>=MM)return fin(M);
ds[dp-1]=mm[a];break;}
case 18:{const a=ds[dp-1],v=ds[dp-2];
if(a<0||a>=MM)return fin(M);
dp-=2;mm[a]=v;break;}
case 19:{const s=String(ds[dp-1]);
if(ol+s.length>OM)return fin(OU);
dp--;for(let i=0;i<s.length;i++)ob[ol++]=s.charCodeAt(i);break;}
case 20:
if(ol+1>OM)return fin(OU);
ob[ol++]=ds[--dp]&255;break;
case 21:ds[dp++]=ix<n.length?n[ix++]:-1;break;
case 22:return fin(ds[--dp]&255);
default:return fin(B);
}
}
}
const ID=process.env.MAKEFUN_INPUT_DIR??"/input";
const OD=process.env.MAKEFUN_OUTPUT_DIR??"/output";
function wr(id,so,e){
K(J(OD,id),{recursive:true});
S(J(OD,id,"stdout.bin"),so);
S(J(OD,id,"exit.txt"),`${e}\n`);
}
for(const id of L(ID).sort()){
try{
const{stdout,exit}=run(G(J(ID,id,"program.bin")),G(J(ID,id,"input.bin")));
wr(id,stdout,exit);
}catch{
try{wr(id,new Uint8Array(0),PC);}catch{}
}
}
