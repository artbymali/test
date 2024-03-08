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
      setTimeout(function () {
        gsap.to("#bg-img", { opacity: 1, duration: 0.4 });
      }, 200);
      setTimeout(function () {
        gsap.to("#boy-img", { opacity: 1, duration: 0.8, });
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


  // --- SETUP START ---
  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true }) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.defaults({ scroller: "#main" });
  // --- SETUP END ---

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
init();

setTimeout(() => {
  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    counter.innerHTML = '0'

    const updateCounter = () => {
      const target = +counter.getAttribute('data-target')
      const c = +counter.innerText;

      const increment = target / 1800;

      if (c < target) {
        counter.innerText = `${Math.ceil(c + increment)}`;
        setTimeout(updateCounter, 10)
      }
    };
    updateCounter()
  })
}, 3000) 