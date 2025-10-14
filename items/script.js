var topZ = 10; // sets active move element to this + increment

function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  // ✅ Use class-based header if present
  const header = elmnt.querySelector(".fotoheader");
  const handle = header || elmnt;

  handle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    elmnt.style.zIndex = ++topZ;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

$(function () {
  // make each popup draggable
  $(".fotopopup").each(function () {
    dragElement(this);
  });
  

  // random starting positions (keep inside viewport)
  $(".randompos").each(function () {
    const $el = $(this);
    const divWidth = $el.outerWidth();
    const divHeight = $el.outerHeight();
    const maxLeft = Math.max(0, $(window).width() - divWidth);
    const maxTop = Math.max(0, $(window).height() - divHeight);
    $el.css({
      left: Math.floor(Math.random() * maxLeft) + "px",
      top: Math.floor(Math.random() * maxTop) + "px",
    });
  });
});

const toggleImages = [
    {
      primary: "../images/tc2.png",
      secondary: "../images/tc3.png"
    },
    {
      primary: "../images/tc4.png",
      secondary: "../images/tc5.png"
    },
    {
      primary: "../images/tc6.png",
      secondary: "../images/tc7.png"
    },
    {
      primary: "../images/tc8.png",
      secondary: "../images/tc9.png"
    },
    {
        primary: "../images/tc10.png",
        secondary: "../images/tc11.png"
      },
    {
        primary: "../images/tc12.png",
        secondary: "../images/tc13.png"
      },
    {
        primary: "../images/tc14.png",
        secondary: "../images/tc15.png"
      },
    {
        primary: "../images/tc16.png",
        secondary: "../images/tc17.png"
      },
    {
        primary: "../images/tc18.png",
        secondary: "../images/tc19.png"
      },
    {
        primary: "../images/tc20.png",
        secondary: "../images/tc21.png"
      },

      {
        primary: "../images/tc22.png",
        secondary: "../images/tc23.png"
      },

      {
        primary: "../images/tc24.png",
        secondary: "../images/tc25.png"
      },

      {
        primary: "../images/tc26.png",
        secondary: "../images/tc27.png"
      },

      {
        primary: "../images/tc28.png",
        secondary: "../images/tc29.png"
      },
      {
        primary: "../images/tc30.png",
        secondary: "../images/tc31.png"
      },
  ];
  
  // Apply toggling to each popup’s image
  document.querySelectorAll(".fotopopup img").forEach((img, index) => {
    const pair = toggleImages[index];
    if (!pair) return; // Skip if no mapping provided
    let toggled = false;
  
    img.addEventListener("click", () => {
      toggled = !toggled;
      img.src = toggled ? pair.secondary : pair.primary;
    });
  });