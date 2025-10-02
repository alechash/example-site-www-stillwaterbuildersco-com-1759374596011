// Dark mode toggle with localStorage
(function(){
  const btn=document.getElementById('dark-toggle');
  if(!btn)return;
  const root=document.documentElement;
  function setDark(dark){
    if(dark){root.classList.add('dark');localStorage.setItem('theme','dark');}
    else{root.classList.remove('dark');localStorage.setItem('theme','light');}
  }
  // Init
  const stored=localStorage.getItem('theme');
  if(stored==='dark'||(!stored&&window.matchMedia('(prefers-color-scheme: dark)').matches))setDark(true);
  btn.addEventListener('click',()=>setDark(!root.classList.contains('dark')));
})();
// Sticky header shrink on scroll
(function(){
  const header=document.getElementById('site-header');
  const inner=document.getElementById('header-inner');
  if(!header||!inner)return;
  let last=0;
  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    if(y>40){header.classList.add('shadow-lg');inner.classList.add('py-2','lg:py-3');inner.classList.remove('py-4','lg:py-6');}
    else{header.classList.remove('shadow-lg');inner.classList.remove('py-2','lg:py-3');inner.classList.add('py-4','lg:py-6');}
    last=y;
  });
})();
// Mobile nav
(function(){
  const open=document.getElementById('mobile-nav-toggle');
  const close=document.getElementById('mobile-nav-close');
  const nav=document.getElementById('mobile-nav');
  if(!open||!close||!nav)return;
  function show(){nav.classList.remove('scale-95','opacity-0','pointer-events-none');nav.classList.add('scale-100','opacity-100');document.body.style.overflow='hidden';}
  function hide(){nav.classList.add('scale-95','opacity-0','pointer-events-none');nav.classList.remove('scale-100','opacity-100');document.body.style.overflow='';}
  open.addEventListener('click',show);
  close.addEventListener('click',hide);
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',hide));
})();
// FAQ accordion
(function(){
  const faqs=document.querySelectorAll('.faq-item');
  faqs.forEach(item=>{
    const btn=item.querySelector('.faq-q');
    const panel=item.querySelector('.faq-a');
    if(!btn||!panel)return;
    btn.addEventListener('click',()=>{
      const open=btn.getAttribute('aria-expanded')==='true';
      btn.setAttribute('aria-expanded',!open);
      panel.hidden=open;
    });
    btn.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();btn.click();}});
  });
})();
// Testimonials carousel
(function(){
  const wrap=document.querySelector('.testimonials-carousel');
  if(!wrap)return;
  const slides=wrap.querySelectorAll('.testimonial-slide');
  if(slides.length<2)return;
  let idx=0,interval=null,paused=false;
  function show(i){slides.forEach((s,j)=>{s.classList.toggle('hidden',j!==i);});}
  function next(){idx=(idx+1)%slides.length;show(idx);}
  function start(){interval=setInterval(()=>{if(!paused)next();},4000);}
  function stop(){clearInterval(interval);}
  wrap.addEventListener('mouseenter',()=>{paused=true;});
  wrap.addEventListener('mouseleave',()=>{paused=false;});
  wrap.querySelectorAll('.carousel-dot').forEach((dot,i)=>{
    dot.addEventListener('click',()=>{idx=i;show(idx);});
  });
  show(idx);start();
})();
// Tabs/filter logic
(function(){
  document.querySelectorAll('[data-tabs]').forEach(tabWrap=>{
    const tabs=tabWrap.querySelectorAll('[data-tab]');
    const panels=tabWrap.querySelectorAll('[data-panel]');
    tabs.forEach(tab=>{
      tab.addEventListener('click',()=>{
        const t=tab.getAttribute('data-tab');
        tabs.forEach(tb=>tb.classList.toggle('active',tb===tab));
        panels.forEach(p=>p.hidden=p.getAttribute('data-panel')!==t);
      });
    });
    // Init
    if(tabs[0])tabs[0].click();
  });
})();