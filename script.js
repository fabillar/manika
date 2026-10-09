document.documentElement.classList.add('js');

// Mobile menu
const nav=document.querySelector('.nav'),burger=document.querySelector('.burger');
if(burger)burger.addEventListener('click',()=>{const o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o)});

// Scroll reveal: fade + rise as things come into view (staggered inside each group)
(function(){
  const groups=['.acards>.acard','.loves>.love','.polaroids>.pol','.gallery-page>.pol','.chips>.chip','.love-big>.box','.adv-item','.fcol'];
  const single=['.about-photo','.about-text h2','.about-text h3','.about-text p','.note','.sh','.f-brand','.contact-card','.prose'];
  const items=[];
  groups.forEach(g=>document.querySelectorAll(g).forEach((el,i)=>{el.style.setProperty('--d',(i*0.09)+'s');items.push(el)}));
  single.forEach((g,gi)=>document.querySelectorAll(g).forEach(el=>{if(!items.includes(el)){el.style.setProperty('--d',(gi*0.05)+'s');items.push(el)}}));
  items.forEach(el=>el.classList.add('rv'));
  if(!('IntersectionObserver' in window)){items.forEach(el=>el.classList.add('in'));return}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  items.forEach(el=>io.observe(el));
})();

// Lightbox
const lb=document.querySelector('.lightbox');
if(lb){
  const img=lb.querySelector('img');const items=[...document.querySelectorAll('[data-lb]')];let i=0;
  const show=n=>{i=(n+items.length)%items.length;img.src=items[i].dataset.lb;img.alt=items[i].dataset.alt||'';lb.classList.add('on')};
  items.forEach((el,n)=>el.addEventListener('click',()=>show(n)));
  lb.querySelector('.lb-x').onclick=()=>lb.classList.remove('on');
  lb.querySelector('.lb-p').onclick=e=>{e.stopPropagation();show(i-1)};
  lb.querySelector('.lb-n').onclick=e=>{e.stopPropagation();show(i+1)};
  lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('on')});
  document.addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;
    if(e.key==='Escape')lb.classList.remove('on');if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});
}

// Contact: parent email link. Change the address in contact.html (data-email).
const mail=document.querySelector('[data-email]');
if(mail){const a=mail.dataset.email;mail.href='mailto:'+a+'?subject='+encodeURIComponent('Hello Manika!')}

// Back to top: appears after scrolling down
(function(){
  const b=document.querySelector('.to-top');if(!b)return;
  const t=()=>b.classList.toggle('show',window.scrollY>400);
  window.addEventListener('scroll',t,{passive:true});t();
  b.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'}));
})();
