
// marquee
const marquee = document.getElementById('marquee');
if (marquee) {
  const words = 'WORSHIP ✦ HOPE ✦ FAITH ✦ GLORY ✦ ANOINTED GOSPEL MUSIC ✦ PRINCESS MUSIC STUDIO ✦ BOOKINGS OPEN ✦ ';
  marquee.innerHTML = (words + words).replace(/✦/g,'<span>✦</span>').replace(/PRINCESS/g,'<span class="p">PRINCESS</span>');
}

// mobile nav
const burger=document.getElementById('burger'),navLinks=document.getElementById('navLinks');
if (burger && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  };
  burger.onclick=()=>{
    const isOpen = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  };
  navLinks.querySelectorAll('a').forEach(a=>a.onclick=closeMenu);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  window.addEventListener('resize',()=>{if(window.innerWidth>840)closeMenu()});
}

// booking form -> WhatsApp
const bookingForm = document.getElementById('bookForm');
if (bookingForm) {
  bookingForm.addEventListener('submit',function(e){
    e.preventDefault();
    const g=id=>document.getElementById(id).value.trim();
    const text=`Hello Princess Music! 🌸%0A%0A*Booking Request*%0A👤 Name: ${g('name')}%0A📞 Phone: ${g('phone')}%0A📧 Email: ${g('email')||'-'}%0A🎤 Event: ${g('etype')}%0A📅 Date: ${g('edate')||'-'}%0A📍 Location: ${g('eloc')||'-'}%0A📝 Message: ${g('msg')||'-'}`;
    window.open('https://wa.me/27713048968?text='+text,'_blank');
    const formNote = document.getElementById('formNote');
    if (formNote) formNote.style.display='block';
    this.reset();
  });
}

// Event photo details dialog
const eventPhotoTriggers = document.querySelectorAll('.event-photo-trigger');
if (eventPhotoTriggers.length) {
  const dialog = document.createElement('dialog');
  dialog.className = 'event-photo-dialog';
  dialog.setAttribute('aria-labelledby', 'eventPhotoTitle');
  dialog.innerHTML = `
    <div class="event-photo-dialog-content">
      <img class="event-photo-dialog-image" alt="">
      <div class="event-photo-dialog-details">
        <button class="event-photo-dialog-close" type="button" aria-label="Close event details">&times;</button>
        <span class="event-kicker"></span>
        <h2 id="eventPhotoTitle"></h2>
        <p class="event-photo-dialog-location"></p>
        <span class="event-photo-dialog-entry"></span>
      </div>
    </div>`;
  document.body.append(dialog);

  const dialogImage = dialog.querySelector('.event-photo-dialog-image');
  const dialogKicker = dialog.querySelector('.event-kicker');
  const dialogTitle = dialog.querySelector('#eventPhotoTitle');
  const dialogLocation = dialog.querySelector('.event-photo-dialog-location');
  const dialogEntry = dialog.querySelector('.event-photo-dialog-entry');
  const closeButton = dialog.querySelector('.event-photo-dialog-close');

  eventPhotoTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const event = trigger.closest('.events')?.querySelector('.event');
      if (!event) return;

      const image = trigger.querySelector('img');
      const date = event.querySelector('.event-kicker')?.textContent.trim();
      const title = event.querySelector('h3')?.textContent.trim();
      const location = event.querySelector('.event-details p')?.textContent.trim();
      const entry = event.querySelector('.event-entry')?.textContent.trim();
      if (!image || !title || !date || !location || !entry) return;

      dialogImage.src = image.currentSrc || image.src;
      dialogImage.alt = image.alt;
      dialogKicker.textContent = date;
      dialogTitle.textContent = title;
      dialogLocation.textContent = location;
      dialogEntry.textContent = entry;
      dialog.showModal();
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
}

// scroll reveal
if ('IntersectionObserver' in window) {
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
}
