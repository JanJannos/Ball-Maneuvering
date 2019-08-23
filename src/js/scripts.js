// piece object
const piece = (function() {
  let el = null;
  const init = function(el) {
    this.el = el;
  };
  const moveDelta = function(dx, dy) {
    const pos = this.el.getBoundingClientRect();
    this.el.style.left = `${pos.left + dx}px`;
    this.el.style.top = `${pos.top + dy}px`;
  };
  return {
    init,
    moveDelta
  };
})();

function handleClick(ev) {
  piece.moveDelta(parseInt(this.dataset.dx), parseInt(this.dataset.dy));
}

reset = () => {
  const thePiece = document.getElementById("piece");
  thePiece.style.left = "50%";
  thePiece.style.top = "100px";
  thePiece.style.right = "0px";
  thePiece.style.bottom = "0px";
};

random = () => {
  const thePiece = document.getElementById("piece");
  var divsize = (Math.random() * 100 + 50).toFixed();

  var x = Math.random() * 1000;
  x = Math.round(x);
  var y = Math.random() * 500;
  y = Math.round(y);
  thePiece.style.left = x + "px";
  thePiece.style.top = y + "px";
  thePiece.style.right = "0px";
  thePiece.style.bottom = "0px";
};

function init() {
  const $btnUp = document.getElementById("btn-up");
  $btnUp.dataset.dx = 0;
  $btnUp.dataset.dy = -100;
  $btnUp.addEventListener("click", handleClick);
  const $btnRight = document.getElementById("btn-right");
  $btnRight.dataset.dx = 100;
  $btnRight.dataset.dy = 0;
  $btnRight.addEventListener("click", handleClick);
  const $btnDown = document.getElementById("btn-down");
  $btnDown.dataset.dx = 0;
  $btnDown.dataset.dy = 100;
  $btnDown.addEventListener("click", handleClick);
  const $btnLeft = document.getElementById("btn-left");
  $btnLeft.dataset.dx = -100;
  $btnLeft.dataset.dy = 0;
  $btnLeft.addEventListener("click", handleClick);
}

window.addEventListener("DOMContentLoaded", event => {
  piece.init(document.getElementById("piece"));
  init();
});
