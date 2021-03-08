(function () {
  if (document.body.classList.contains('fullscreen')) {
    const wrapper = document.querySelector('.sliders');
    const slides = document.querySelectorAll('.slide');
    let spin_value = 0;
    let can_scroll = true;
    let timing = 1000;

    document.head.insertAdjacentHTML(
      'beforeend',
      `  <link rel="stylesheet" href="fs-style.css">`
    );
    wrapper.removeAttribute('style');

    // Set scroll action
    window.addEventListener('mousewheel', function (e) {
      if (can_scroll) {
        can_scroll = false;
        if (e.deltaY > 0) {
          //scroll down
          if (spin_value < slides.length - 1) ++spin_value;
        } else {
          //scroll up
          if (spin_value > 0) --spin_value;
        }
      }

      scroll_content(spin_value);

      setTimeout(function () {
        can_scroll = true;
      }, timing);
    });

    // Render navigator
    let nav = '';

    for (let slide of slides) {
      const header = slide.querySelector('.slide-heading').innerText;
      slide.id = header.toLowerCase();
      nav += `<li><a href="#${header.toLowerCase()}"></a><span>${header}</span></li>`;
    }
    document.body.insertAdjacentHTML(
      'beforeend',
      `<ul id="fs-navigation">${nav}</ul>`
    );

    const navs = document.querySelectorAll('#fs-navigation li');

    navs.forEach((el, i) => {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        removeActive();
        this.classList.add('active');
        spin_value = i;
        scroll_content(spin_value);
      });
    });

    // If have id
    if (location.hash) {
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        if (`#${slide.id}` === location.hash.toLowerCase()) {
          spin_value = i;
          scroll_content(spin_value);
          renderNav(i);
          break;
        }
      }
    } else {
      navs[0].classList.add('active');
    }

    function scroll_content(count) {
      wrapper.setAttribute(
        'style',
        `transform: translate3d(0, -${count * 100}vh, 0);
        -webkit-transform: translate3d(0, -${count * 100}vh, 0);
        -moz-transform: translate3d(0, -${count * 100}vh, 0);
        -ms-transform: translate3d(0, -${count * 100}vh, 0);
        -o-transform: translate3d(0, -${count * 100}vh, 0);`
      );
      renderNav(count);
    }

    function renderNav(index) {
      removeActive();
      navs[index].classList.add('active');
    }

    function removeActive() {
      try {
        document
          .querySelector('#fs-navigation li.active')
          .classList.remove('active');
      } catch (e) {}
    }
  }
})();
