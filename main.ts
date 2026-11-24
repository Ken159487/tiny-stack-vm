import{readdirSync as L,readFileSync as G,writeFileSync as S,mkdirSync as K}from"node:fs";
const T="x0001122321101100121101x0110223311100000100010x014000000002222000000012345678000000009999999:999;99909990000000000000<=>?@00000000000AB00000000000000CDEF";
function run(p,n){
const Q=p.length,ds=new Int32Array(256),cs=new Int32Array(64),mm=new Int32Array(256),ob=new Uint8Array(65536);
let dp=0,cp=0,ol=0,ix=0,pc=0,st=0;
const fin=e=>[ob.slice(0,ol),e];
for(;;){
if(st===1e6||pc<0||pc>=Q)return fin(st===1e6?10:9);
const k=p[pc],c=T.charCodeAt(69+k)-48;
if(!c)return fin(5);
const m=+T[46+c];
if(pc+m>=Q)return fin(9);
st++;
const nx=pc+1+m,pp=T[c];
if(dp<pp)return fin(2);
const ph=+T[23+c];
if(dp-pp+ph>256)return fin(3);
pc=nx;
switch(c){
case 1:return fin(0);
case 2:ds[dp++]=p[nx-1]<<24>>24;break;
case 3:ds[dp++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
case 4:dp--;break;
case 5:ds[dp]=ds[dp-1];dp++;break;
case 6:[ds[dp-1],ds[dp-2]]=[ds[dp-2],ds[dp-1]];break;
case 7:ds[dp]=ds[dp-2];dp++;break;
case 8:[ds[dp-3],ds[dp-2],ds[dp-1]]=[ds[dp-2],ds[dp-1],ds[dp-3]];break;
case 9:{const b=ds[dp-1],a=ds[dp-2],j=k-16-(k>31),A=a>>>0,B=b>>>0;
if(j>2&&j<7&&!b)return fin(4);
dp-=2;ds[dp++]=j<1?a+b:j<2?a-b:j<3?Math.imul(a,b):j<4?a/b:j<5?a%b:j<6?A/B:j<7?A%B:j<9?a&b:j<10?a|b:j<11?a^b:j<13?a<<(b&31):j<14?a>>(b&31):j<15?a>>>(b&31):j<16?a==b:j<17?a<b:A<B;break;}
case 10:ds[dp-1]=-ds[dp-1];break;
case 11:ds[dp-1]=~ds[dp-1];break;
case 12:case 13:case 14:{
const r=(p[nx-2]|p[nx-1]<<8)<<16>>16;
let v=c>12?ds[--dp]:0;if(c<13||c==13==(v==0))pc=nx+r;break;}
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
case 19:{const s=""+ds[dp-1];
if(ol+s.length>65536)return fin(11);
dp--;for(const h of s)ob[ol++]=h.charCodeAt();break;}
case 20:
if(ol>65535)return fin(11);
ob[ol++]=ds[--dp]&255;break;
case 21:ds[dp++]=ix<n.length?n[ix++]:-1;break;
case 22:return fin(ds[--dp]&255);
default:return fin(5);
}
}
}
const{MAKEFUN_INPUT_DIR:ID="/input",MAKEFUN_OUTPUT_DIR:OD="/output"}=process.env;
function wr(id,so,e){
const d=OD+"/"+id;
K(d,{recursive:true});
S(d+"/stdout.bin",so);
S(d+"/exit.txt",e+"");
}
for(const id of L(ID).sort()){
try{
wr(id,...run(G(ID+"/"+id+"/program.bin"),G(ID+"/"+id+"/input.bin")));
}catch{
try{wr(id,new Uint8Array,9);}catch{}
}
}
