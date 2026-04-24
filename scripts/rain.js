const c=document.getElementById('MatrixCanvas'),ctx=c.getContext('2d');
let w,h,cols,drops=[],chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#%&@!?/\\|*+=-~:;<>あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

const SPEED = 0.3;
const LENGHT = 0.03;
const FONT_SIZE = 14;

function resize(){
  w=innerWidth;h=innerHeight;
  c.width=w;c.height=h;
  cols=Math.floor(w/18);
  drops=Array(cols).fill(1);
}
resize();

function rain(){
  ctx.fillStyle=`rgba(0,0,0, ${LENGHT})`;
  ctx.fillRect(0,0,w,h);
  ctx.fillStyle='#0f0';
  ctx.font=`${FONT_SIZE}px monospace`;
  for(let i=0;i<cols;i++){
    ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*18,drops[i]*18);
    if(drops[i]*18>h&&Math.random()>0.98)drops[i]=0;
    if (Math.random() > SPEED) drops[i]++;
  }
  requestAnimationFrame(rain);
}
rain();
window.onresize=resize;