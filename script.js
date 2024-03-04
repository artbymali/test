function loader() {
  let tl = gsap.timeline();

  tl.from("#loader h3", {
    x: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.1
  })

  tl.to("#loader h3", {
    opacity: 0,
    x: -30,
    duration: 1,
    stagger: .1
  })

  tl.to("#loader", {
    opacity: 0
  })

  tl.to("#loader", {
    display: "none",
    onComplete: function () {
      document.getElementById('loader').style.display = 'none';
      document.body.style.overflow = 'auto'
      setTimeout(function () {
        gsap.to("#bg-img", { opacity: 1, duration: 0.4 });
      }, 200);
      setTimeout(function () {
        gsap.to("#boy-img", { opacity: 1, duration: 0.8,});
      }, 500);
    }
  })

  document.getElementById('boy-img').style.opacity = 0;
  document.getElementById('bg-img').style.opacity = 0;
  document.body.style.overflow = 'hidden'
}
loader();

function TextReveal() {
  setTimeout(function () {
    gsap.from("#content-left h2", {
      x: -100,
      opacity: 0,
      ease: "power4.inOut",
      duration: 2,
      delay: 1.2, // Slight delay for h2
    });

    gsap.from("#content-left p", {
      x: -100,
      opacity: 0,
      ease: "power4.inOut",
      duration: 2,
      delay: 1.4, // Slight delay for p
    });

    gsap.from("#content-left button", {
      x: -100,
      opacity: 0,
      ease: "power4.inOut",
      duration: 2,
      delay: 1.6, // Slight delay for button
    });

  }, 1500);

  setTimeout(function () {
    gsap.from("#content-right-avard-first", {
      x: 50,
      opacity: 0,
      ease: "power4.inOut",
      duration: 2,
      delay: 1.1, // Slight delay for h2
    });

    gsap.from("#content-right-avard-second", {
      x: 50,
      opacity: 0,
      ease: "power4.inOut",
      duration: 2,
      delay: 1.3, // Slight delay for h2
    });

    gsap.from("#content-right-avard-third", {
      x: 50,
      opacity: 0,
      ease: "power4.inOut",
      duration: 2,
      delay: 1.5, // Slight delay for h2
    });
  }, 1500)
}
TextReveal();


function attachMouseMoveEvent() {
  const btn = document.querySelector('button');
  btn.onmousemove = function (e) {
    const x = e.pageX - btn.offsetLeft;
    const y = e.pageY - btn.offsetTop;

    btn.style.setProperty('--x', x + 'px');
    btn.style.setProperty('--y', y + 'px');
  }
}
attachMouseMoveEvent();

function init() {
  gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, 
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();
}

init();

