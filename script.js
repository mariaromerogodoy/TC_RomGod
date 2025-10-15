var topZ = 10; // sets active move element to this + increment

function dragElement(elmnt, container) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  const header = elmnt.querySelector(".fotoheader");
  const handle = header || elmnt;

  handle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    elmnt.style.zIndex = ++topZ;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // proposed new position
    let newTop  = elmnt.offsetTop  - pos2;
    let newLeft = elmnt.offsetLeft - pos1;

    // clamp inside container
    const maxLeft = container.clientWidth  - elmnt.offsetWidth;
    const maxTop  = container.clientHeight - elmnt.offsetHeight;

    newLeft = Math.max(0, Math.min(maxLeft, newLeft));
    newTop  = Math.max(0, Math.min(maxTop,  newTop));

    elmnt.style.top  = newTop  + "px";
    elmnt.style.left = newLeft + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


$(function () {
    const YG = document.querySelector(".YG"); // selects the element with class="YG"
    const hero = document.querySelector(".hero");
  
    // Observe when hero scrolls out of view
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            YG.classList.add("is-visible");   // show the header image
          } else {
            YG.classList.remove("is-visible"); // hide it while hero is visible
          }
        });
      },
      { threshold: 0.2 } // triggers when ~20% of hero is visible
    );
  
    io.observe(hero);
  });
  

$(function () {
  const feature = document.getElementById("feature");

  // Reveal .feature only after the hero is mostly off-screen
  const hero = document.querySelector(".hero");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          feature.classList.add("is-visible");
        } else {
          feature.classList.remove("is-visible");
        }
      });
    },
    { threshold: 0.2 } // when ~20% of hero is visible, keep hidden; show when below that
  );
  io.observe(hero);

  // Random starting positions INSIDE the feature, after images have sizes
  function randomizePositions() {
    const fw = feature.clientWidth;
    const fh = feature.clientHeight;

    $(".randompos").each(function () {
      const $el = $(this);
      const w = $el.outerWidth();
      const h = $el.outerHeight();
      const maxLeft = Math.max(0, fw - w);
      const maxTop  = Math.max(0, fh - h);
      $el.css({
        left: Math.floor(Math.random() * maxLeft) + "px",
        top:  Math.floor(Math.random() * maxTop)  + "px",
      });
    });
  }

  // Make each popup draggable WITHIN the feature
  $(".fotopopup").each(function () {
    dragElement(this, feature);
  });

  // Run after all assets load so sizes are correct
  $(window).on("load", function () {
    randomizePositions();
  });

  // Optional: re-pack on resize (keeps them inside if the box shrinks)
  $(window).on("resize", function () {
    randomizePositions();
  });
});

// ---- your toggle mapping stays the same ----
const toggleImages = [
  { primary: "../images/tc2.png",  secondary: "../images/tc3.png"  },
  { primary: "../images/tc4.png",  secondary: "../images/tc5.png"  },
  { primary: "../images/tc6.png",  secondary: "../images/tc7.png"  },
  { primary: "../images/tc8.png",  secondary: "../images/tc9.png"  },
  { primary: "../images/tc10.png", secondary: "../images/tc11.png" },
  { primary: "../images/tc12.png", secondary: "../images/tc13.png" },
  { primary: "../images/tc14.png", secondary: "../images/tc15.png" },
  { primary: "../images/tc16.png", secondary: "../images/tc17.png" },
  { primary: "../images/tc18.png", secondary: "../images/tc19.png" },
  { primary: "../images/tc20.png", secondary: "../images/tc21.png" },
  { primary: "../images/tc22.png", secondary: "../images/tc23.png" },
  { primary: "../images/tc24.png", secondary: "../images/tc25.png" },
  { primary: "../images/tc26.png", secondary: "../images/tc27.png" },
  { primary: "../images/tc28.png", secondary: "../images/tc29.png" },
  { primary: "../images/tc30.png", secondary: "../images/tc31.png" },
];

// Apply toggling to each popup’s image (order-based)
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fotopopup img").forEach((img, index) => {
    const pair = toggleImages[index];
    if (!pair) return;
    let toggled = false;
    img.addEventListener("click", () => {
      toggled = !toggled;
      img.src = toggled ? pair.secondary : pair.primary;
    });
  });
});
