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
      primary: "../images/1.png",
      secondary: "../images/2.png"
    },
    {
      primary: "../images/3.png",
      secondary: "../images/4.png"
    },
    {
      primary: "../images/5.png",
      secondary: "../images/6.png"
    },
    {
      primary: "../images/7.png",
      secondary: "../images/8.png"
    },
    {
        primary: "../images/9.png",
        secondary: "../images/10.png"
      },
    {
        primary: "../images/11.png",
        secondary: "../images/12.png"
      },
    {
        primary: "../images/14.png",
        secondary: "../images/15.png"
      },
    {
        primary: "../images/16.png",
        secondary: "../images/17.png"
      },
    {
        primary: "../images/18.png",
        secondary: "../images/19.png"
      },
    {
        primary: "../images/13.png",
        secondary: "../images/20.png"
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