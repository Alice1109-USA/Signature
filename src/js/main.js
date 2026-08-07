(function () {
  var toggle = document.getElementById("menuToggle");
  var menu = document.getElementById("mobileMenu");
  var bar1 = toggle && toggle.querySelector('[data-bar="1"]');
  var bar2 = toggle && toggle.querySelector('[data-bar="2"]');
  var bar3 = toggle && toggle.querySelector('[data-bar="3"]');
  var open = false;

  function setOpen(next) {
    open = next;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");

    if (open) {
      menu.classList.remove("pointer-events-none");
      menu.classList.remove("opacity-0");
      document.body.style.overflow = "hidden";
      bar1.style.translate = "0 0";
      bar1.style.transform = "rotate(45deg)";
      bar2.style.opacity = "0";
      bar3.style.translate = "0 0";
      bar3.style.transform = "rotate(-45deg)";
      var links = menu.querySelectorAll(".mobile-link");
      links.forEach(function (el, i) {
        setTimeout(function () {
          el.classList.remove("translate-y-8", "opacity-0");
        }, 120 + i * 60);
      });
    } else {
      menu.classList.add("opacity-0");
      document.body.style.overflow = "";
      bar1.style.translate = "0 -4px";
      bar1.style.transform = "rotate(0deg)";
      bar2.style.opacity = "1";
      bar3.style.translate = "0 4px";
      bar3.style.transform = "rotate(0deg)";
      var links2 = menu.querySelectorAll(".mobile-link");
      links2.forEach(function (el) {
        el.classList.add("translate-y-8", "opacity-0");
      });
      setTimeout(function () {
        menu.classList.add("pointer-events-none");
      }, 500);
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setOpen(!open);
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }

  var nav = document.getElementById("siteNav");
  function onScroll() {
    if (window.scrollY > 12) {
      nav.classList.add("shadow-soft-sm");
      nav.classList.remove("shadow-none");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  document.querySelectorAll("details.group").forEach(function (d) {
    d.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        setTimeout(function () {
          d.removeAttribute("open");
        }, 50);
      }
    });
    document.addEventListener("click", function (e) {
      if (!d.contains(e.target)) d.removeAttribute("open");
    });
  });
})();
