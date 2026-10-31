(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const setMenu = open => {
    toggle?.setAttribute('aria-expanded', String(open));
    toggle?.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    if(menu) menu.hidden = !open;
  };
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu?.addEventListener('click', e => { if(e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && toggle?.getAttribute('aria-expanded')==='true'){setMenu(false);toggle.focus();} });
  document.addEventListener('click', e => {if(!e.target.closest('.site-header')) setMenu(false);});

  const tabs = [...document.querySelectorAll('[data-class]')];
  function selectClass(tab, focus=false) {
    tabs.forEach(t => {
      const selected = t===tab;
      t.setAttribute('aria-selected',String(selected));
      t.tabIndex = selected ? 0 : -1;
      t.classList.toggle('selected',selected);
      document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
    });
    document.dispatchEvent(new CustomEvent('healer:classchange', { detail: { key: tab.dataset.class, index: tabs.indexOf(tab) } }));
    if(focus){tab.focus({preventScroll:true});const list=tab.parentElement;list.scrollTo({left:tab.offsetLeft-list.offsetLeft-(list.clientWidth-tab.clientWidth)/2});}
  }
  tabs.forEach((tab,i) => {
    tab.addEventListener('click',()=>selectClass(tab));
    tab.addEventListener('keydown', e=> {
      let index;
      if(e.key==='ArrowRight') index=(i+1)%tabs.length;
      if(e.key==='ArrowLeft') index=(i+tabs.length-1)%tabs.length;
      if(e.key==='Home') index=0;
      if(e.key==='End') index=tabs.length-1;
      if(index!==undefined){e.preventDefault();selectClass(tabs[index],true);}
    });
  });

  const dialog=document.getElementById('screenshot-dialog');
  document.querySelectorAll('[data-screenshot]').forEach(button => button.addEventListener('click', () => {
    const original=button.querySelector('img');
    const img=document.getElementById('dialog-image');
    img.src=original.src; img.alt=original.alt;
    dialog.showModal();document.body.classList.add('dialog-open');
  }));
  dialog?.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',e=>{if(e.target===dialog) dialog.close();});
  dialog?.addEventListener('close',()=>document.body.classList.remove('dialog-open'));

  let toastTimer;
  function toast(message){const t=document.getElementById('toast');t.textContent=message;t.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('visible'),4000);}
  async function copy(value) {
    try { await navigator.clipboard.writeText(value);toast('복사했습니다.');return true; }
    catch {toast('자동 복사가 어렵습니다. 표시된 내용을 직접 선택해 복사하십시오.');return false;}
  }
  document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>copy(b.dataset.copy)));
  const form=document.getElementById('deletion-form');
  if(form){
    const preview=document.getElementById('request-preview');
    const update=()=>{
      const f=new FormData(form);
      preview.value=`[나혼자 힐러 · Solo Healer]\n요청: ${f.get('scope')}\n\n연결한 Google 이메일: ${f.get('account')||'알 수 없음 / 연결하지 않음'}\n계정 확인에 도움이 되는 정보: ${f.get('info')||'필요한 확인 절차를 회신으로 안내해 주십시오.'}\n\n본인 소유 계정에 관한 요청입니다. 처리 결과는 이 이메일로 회신 부탁드립니다.`;
    };
    form.addEventListener('input',update);form.addEventListener('change',update);update();
    form.addEventListener('submit',e=>{
      e.preventDefault();update();
      const subject='[나혼자 힐러] '+new FormData(form).get('scope');
      window.location.href=`mailto:4ltree.service@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(preview.value)}`;
      document.getElementById('compose-status').textContent='이메일 앱에서 내용을 확인하고 직접 전송하십시오. 아직 웹사이트에서 접수된 요청은 없습니다. 앱이 열리지 않으면 요청문을 복사하여 메일로 보내십시오.';
    });
    document.getElementById('copy-request').addEventListener('click',async()=>{update();if(!await copy(preview.value)){preview.focus();preview.select();}});
  }
})();
