(() => {
  const body = document.body;
  const hero = document.querySelector('.hero');
  const motionButton = document.querySelector('[data-motion]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let paused = false;
  let heroVisible = true;
  const motionAllowed = () => !paused && !reduced.matches && !document.hidden;
  function syncMotion() {
    body.classList.toggle('motion-off', paused || reduced.matches);
    document.documentElement.classList.toggle('motion-off', paused || reduced.matches);
    motionButton.disabled = reduced.matches;
    motionButton.setAttribute('aria-pressed', String(paused || reduced.matches));
    motionButton.textContent = reduced.matches ? '움직임 줄임' : paused ? '움직임 켜기' : '움직임 끄기';
    if (!motionAllowed()) {
      hero.style.setProperty('--pointer-x', '0px');
      hero.style.setProperty('--pointer-y', '0px');
      hero.style.setProperty('--hero-shift', '0px');
    }
  }
  motionButton.addEventListener('click', () => { paused = !paused; syncMotion(); });
  reduced.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', () => {
    body.classList.toggle('page-hidden', document.hidden);
    syncMotion();
  });
  syncMotion();

  let pointerFrame = 0;
  hero.addEventListener('pointermove', e => {
    if (!motionAllowed() || !finePointer.matches || !heroVisible || pointerFrame) return;
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - .5;
    const y = (e.clientY - rect.top) / rect.height - .5;
    pointerFrame = requestAnimationFrame(() => {
      hero.style.setProperty('--pointer-x', `${x * 12}px`);
      hero.style.setProperty('--pointer-y', `${y * 8}px`);
      pointerFrame = 0;
    });
  }, { passive: true });
  hero.addEventListener('pointerleave', () => {
    if(pointerFrame) cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    hero.style.setProperty('--pointer-x', '0px');
    hero.style.setProperty('--pointer-y', '0px');
  });

  const header = document.querySelector('.site-header');
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  header.append(progress);
  const chapters = [...document.querySelectorAll('[data-section]')];
  let scrollFrame = 0;
  function updateScroll() {
    const top = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${height > 0 ? Math.min(1, top / height) : 0})`;
    header.classList.toggle('has-scrolled', top > 20);
    if (heroVisible && motionAllowed()) {
      const offset = Math.max(0, -hero.getBoundingClientRect().top);
      hero.style.setProperty('--hero-shift', `${Math.min(70, offset * (finePointer.matches ? .14 : .05))}px`);
    }
    let active = '';
    for (const item of chapters) {
      const section = document.getElementById(item.dataset.section);
      if (section.getBoundingClientRect().top <= window.innerHeight * .42) active = item.dataset.section;
    }
    chapters.forEach(link => {
      const selected = link.dataset.section === active;
      link.classList.toggle('active', selected);
      selected ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current');
    });
    scrollFrame = 0;
  }
  function scheduleScroll() { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); }
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleScroll, { passive: true });
  updateScroll();

  // Keep section titles below both sticky navigation rows.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = new URL(link.href, location.href);
    const id = url.hash.slice(1);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !['story','classes','gameplay','release'].includes(id)) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const offset = header.offsetHeight + document.querySelector('.chapter-nav').offsetHeight + 14;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    if (location.hash !== url.hash) history.pushState(null, '', url.hash);
    window.scrollTo({top, behavior: motionAllowed() ? 'smooth' : 'instant'});
    if (event.detail === 0) {
      const heading = target.querySelector('h2');
      heading?.setAttribute('tabindex', '-1');
      heading?.focus({preventScroll: true});
    }
  });

  if ('IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(entries => {
      heroVisible = entries[0].isIntersecting;
      hero.classList.toggle('outside-viewport', !heroVisible);
    });
    heroObserver.observe(hero);
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('.reveal, .class-tabs, .class-stage, .showcase-tabs, .showcase-stage').forEach(el => {
      el.classList.add('reveal-ready');
      revealObserver.observe(el);
    });
  }

  const classTabs = [...document.querySelectorAll('[data-class]')];
  document.addEventListener('healer:classchange', e => {
    document.getElementById('class-count').textContent = String(e.detail.index + 1).padStart(2, '0');
  });
  document.querySelectorAll('[data-class-step]').forEach(button => button.addEventListener('click', () => {
    const index = classTabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
    const next = (index + Number(button.dataset.classStep) + classTabs.length) % classTabs.length;
    classTabs[next].click();
    const list = classTabs[next].parentElement;
    list.scrollTo({left: classTabs[next].offsetLeft - list.offsetLeft - (list.clientWidth - classTabs[next].clientWidth) / 2, behavior: motionAllowed() ? 'smooth' : 'instant'});
  }));

  const sceneTabs = [...document.querySelectorAll('[data-scene]')];
  const dialog = document.getElementById('screenshot-dialog');
  const dialogImage = document.getElementById('dialog-image');
  let sceneIndex = 0;
  function updateLightbox() {
    const panel = document.getElementById(sceneTabs[sceneIndex].getAttribute('aria-controls'));
    const image = panel.querySelector('.phone-frame img');
    dialogImage.src = image.src;
    dialogImage.alt = image.alt;
    document.getElementById('lightbox-count').textContent = `${String(sceneIndex + 1).padStart(2,'0')} / 03`;
  }
  function selectScene(index, focus = false) {
    sceneIndex = (index + sceneTabs.length) % sceneTabs.length;
    sceneTabs.forEach((tab, i) => {
      const selected = i === sceneIndex;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
    });
    document.getElementById('scene-count').textContent = `${String(sceneIndex + 1).padStart(2,'0')} / 03`;
    if (focus) sceneTabs[sceneIndex].focus({preventScroll: true});
    if (dialog.open) updateLightbox();
  }
  sceneTabs.forEach((tab,index) => {
    tab.addEventListener('click', () => selectScene(index));
    tab.addEventListener('keydown', e => {
      let next;
      if(e.key === 'ArrowRight') next = index + 1;
      if(e.key === 'ArrowLeft') next = index - 1;
      if(e.key === 'Home') next = 0;
      if(e.key === 'End') next = sceneTabs.length - 1;
      if(next !== undefined) { e.preventDefault(); selectScene(next, true); }
    });
  });
  document.querySelectorAll('[data-scene-step]').forEach(b => b.addEventListener('click', () => selectScene(sceneIndex + Number(b.dataset.sceneStep))));
  document.querySelectorAll('[data-gallery-link]').forEach(a => a.addEventListener('click', () => selectScene(sceneTabs.findIndex(t => t.dataset.scene === a.dataset.galleryLink))));
  document.querySelectorAll('[data-open-scene]').forEach(b => b.addEventListener('click', () => {
    const panel = document.getElementById(`scene-${b.dataset.openScene}`);
    panel.querySelector('[data-screenshot]').click();
  }));
  document.querySelectorAll('[data-screenshot]').forEach(b => b.addEventListener('click', () => {
    selectScene(sceneTabs.findIndex(t => t.dataset.scene === b.dataset.screenshot));
    updateLightbox();
  }));
  document.querySelectorAll('[data-lightbox-step]').forEach(b => b.addEventListener('click', () => selectScene(sceneIndex + Number(b.dataset.lightboxStep))));
  dialog.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault(); selectScene(sceneIndex + (e.key === 'ArrowLeft' ? -1 : 1));
    }
  });
})();
