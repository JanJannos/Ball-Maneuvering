var tempDesc = "";
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

getTemperature = () => {
  fetch(
    "http://api.apixu.com/v1/current.json?key=dda6e762ae4f41efb7e173552192204&q=tel%20aviv"
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log("Temperature : " + json.current.temp_c);
      const temp = json.current.temp_c;
      var color = "";
      switch (true) {
        case temp <= 10: {
          color = "blue";
          return color;
        }

        case temp >= 11 && temp <= 20: {
          color = "green";
          return color;
        }

        case temp >= 21 && temp <= 30: {
          color = "yellow";
          return color;
        }

        case temp > 30: {
          color = "red";
          return color;
        }
      }
    })
    .then(function(color) {
      // const pieceId = document.getElementById("piece");
      // piece.init(pieceId);
      // pieceId.style.backgroundColor = color;
      // // setNewColorRule(color);
      // init();
    });
};

setCoordinates = (element, dx, dy) => {
  element.dataset.dx = dx;
  element.dataset.dy = dy;
  element.addEventListener("click", handleClick);
};

//get user data
getTemperature();

function init() {
  getTemperature();
  const btnUp = document.getElementById("btn-up");
  setCoordinates(btnUp, 0, -100);

  const btnRight = document.getElementById("btn-right");
  setCoordinates(btnRight, 100, 0);

  const btnDown = document.getElementById("btn-down");
  setCoordinates(btnDown, 0, 100);

  const btnLeft = document.getElementById("btn-left");
  setCoordinates(btnLeft, -100, 0);
}

setNewColorRule = pickedColor => {
  var css = `.circle:hover{ background-color: #ffffff !important; border: 1px solid ${pickedColor}; }`;
  var style = document.createElement("style");

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  document.getElementsByTagName("head")[0].appendChild(style);
};


window.addEventListener("DOMContentLoaded", event => {
  
  var testColor = 'yellow';
  const pieceId = document.getElementById("piece");
  piece.init(pieceId);
  pieceId.style.backgroundColor = testColor;
  setNewColorRule(testColor);
  init();
});