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

resetBall = () => {
  const thePiece = document.getElementById("piece");
  thePiece.style.left = "50%";
  thePiece.style.top = "100px";
  thePiece.style.right = "0px";
  thePiece.style.bottom = "0px";
};

randomizeBallLocation = () => {
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
  // changeBallLocation2("btn-random", x, y);
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
    .then(colorPicked => {
      const pieceId = document.getElementById("piece");
      piece.init(pieceId);
      pieceId.style.backgroundColor = colorPicked;
      setNewColorRule(colorPicked);
      init();
    });
};

changeBallLocation = (elementId, dx, dy) => {
  $("#" + elementId).click(function() {
    var width = $(window).width();
    var height = $(window).height();
    var currPos = $("#piece").position().left;
    var currPosY = $("#piece").position().top;
     // Right

    var chosenXmovement = null;
    var chosenYmovement = null;

    if ((elementId === "btn-right") && (width - currPos <= 100)){
      chosenXmovement = width;
      $("#" + elementId).click(function() {
        $("#piece").animate(
          {
            left: "=" + width
          },
          "fast"
        );
      });
    } 

    // Left
    else if ((elementId === "btn-left") && (currPos <= 50)){
      chosenXmovement = 0;
      $("#" + elementId).click(function() {
        $("#piece").animate(
          {
            left: "=" + 0
          },
          "fast"
        );
      });
    }

    // Up
    else if ((elementId === "btn-up") && (currPosY <= 0)){
      $("#" + elementId).click(function() {
        $("#piece").animate(
          {
            top: "=" + height
          },
          "fast"
        );
      });
    }

    // Down
    else if ((elementId === "btn-down") && (height - currPosY <= 100)){
      $("#" + elementId).click(function() {
        $("#piece").animate(
          {
            top: "=" + 0
          },
          "fast"
        );
      });
    }
    
    // General case
    else {
      $("#piece").animate(
        {
          top: "+=" + dx,
          left: "+=" + dy
        },
        "fast"
      );
    }
  });
};

changeBallLocation2 = (elementId, dx, dy) => {
  $("#" + elementId).click(function() {
    $("#piece").animate(
      {
        top: dx,
        left: dy
      },
      "slow"
    );
  });
};

function init() {
  changeBallLocation("btn-up", -100, 0);
  changeBallLocation("btn-right", 0, 100);
  changeBallLocation("btn-down", 100, 0);
  changeBallLocation("btn-left", 0, -100);
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

getTemperature();
