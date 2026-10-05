(function(root){
const key=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
function holidays(y){
// Gregorian Easter (Meeus/Jones/Butcher).
const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,n=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*n+114)/31),day=(h+l-7*n+114)%31+1;
const result={};for(const [md,name] of [['01-01','Año Nuevo'],['04-11','Día de Juan Santamaría'],['05-01','Día del Trabajo'],['07-25','Anexión del Partido de Nicoya'],['08-02','Virgen de los Ángeles'],['08-15','Día de la Madre'],['08-31','Día de la Persona Negra y la Cultura Afrocostarricense'],['09-15','Día de la Independencia'],['12-01','Abolición del Ejército'],['12-25','Navidad']])result[`${y}-${md}`]=name;
result[key(new Date(y,mo-1,day-3))]='Jueves Santo';result[key(new Date(y,mo-1,day-2))]='Viernes Santo';return result;
}
function metrics(y,m,visits,excluded,target=55,minimum=50){const nonwork=new Set([...excluded,...Object.keys(holidays(y))]);let work=0;for(let d=1;d<=new Date(y,m+1,0).getDate();d++){const dt=new Date(y,m,d);if(dt.getDay()!=0&&dt.getDay()!=6&&!nonwork.has(key(dt)))work++;}const prefix=`${y}-${String(m+1).padStart(2,'0')}-`;const n=new Set(visits.filter(x=>x.startsWith(prefix))).size;return {work,n,percent:work?n/work*100:0,goal:work?Math.floor(work*target/100)+1:0,minGoal:work?Math.floor(work*minimum/100)+1:0};}
const api={key,metrics,holidays};if(typeof module!=='undefined')module.exports=api;else root.OfficeLogic=api;
})(globalThis);
