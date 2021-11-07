import { useEffect, useRef } from "react";
import colorArr from "./colorArr";
import styles from "./Solver.module.css";

function findPos(obj) {
  let offsetTop = 0,
    offsetLeft = 0;
  while (obj) {
    offsetTop += obj.offsetTop;
    offsetLeft += obj.offsetLeft;
    obj = obj.offsetParent;
  }
  // console.log({ x: offsetLeft, y: offsetTop });
  return { x: offsetLeft, y: offsetTop };
}

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
  const colorString = ((r << 16) | (g << 8) | b).toString(16);
  console.log(colorString);
  return colorString;
}

const getColorName = (r, g, b) => {
  let index;
  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < colorArr.length; ++i) {
    const temp =
      (r - colorArr[i][0]) ** 2 +
      (g - colorArr[i][1]) ** 2 +
      (b - colorArr[i][2]) ** 2;

    if (temp < min) {
      index = i;
      min = temp;
    }
  }
  return colorArr[index];
  // console.log(index);
  // switch (index) {
  //   case 0:
  //     console.log("red");
  //     break;
  //   case 1:
  //     console.log("green");
  //     break;
  //   case 2:
  //     console.log("blue");
  //     break;

  //   case 3:
  //     console.log("orange");
  //     break;
  // }
};

const Solver = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let ctx;
  function draw() {
    ctx.drawImage(videoRef.current, 0, 0, ctx.canvas.width, ctx.canvas.height);
    requestAnimationFrame(draw);
  }

  useEffect(() => {
    let ratio;
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
      ratio = stream.getVideoTracks()[0].getSettings().aspectRatio;
      ctx = canvasRef.current.getContext("2d");
      ctx.canvas.width = videoRef.current.clientWidth;
      ctx.canvas.height = videoRef.current.clientHeight;
      // ctx.canvas.width = 400 * ratio;
      // ctx.canvas.height = 400;
    });
    setTimeout(() => {
      ctx.canvas.width = videoRef.current.clientWidth;
      ctx.canvas.height = videoRef.current.clientHeight;
    }, 1000);
  }, []);

  const handleClick = () => {
    var position = findPos(canvasRef.current);
    const boxes = document.getElementsByClassName("box");
    const colors = document.getElementsByClassName("color");
    for (let i = 0; i < boxes.length; ++i) {
      const box = boxes[i];
      var boxPosition = findPos(box);
      var x = boxPosition.x - position.x - 65; // idk why I have to subtract ... spend a lot of time to figute out
      var y = boxPosition.y - position.y - 65; // subtract value changes on changing grid gap
      var p = ctx.getImageData(x, y, 1, 1).data;
      var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
      // console.log("nx:", x, "ny:", y);
      const colorArr = getColorName(p[0], p[1], p[2]);
      colors[
        i
      ].style.backgroundColor = `rgb(${colorArr[0]},${colorArr[1]},${colorArr[2]})`;
      // getColorName(p[0], p[1], p[2]);
    }
  };
  return (
    <div>
      <video
        onPlaying={() => {
          draw();
        }}
        ref={videoRef}
        autoPlay
        className={styles.video}
      ></video>
      <div className={styles.canvasContainer}>
        <canvas
          onClick={(e) => {
            const colors = document.getElementsByClassName("color");

            var position = findPos(e.target);
            var x = e.pageX - position.x;
            var y = e.pageY - position.y;
            var p = ctx.getImageData(x, y, 1, 1).data;
            var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
            // console.log("x:", x, "y:", y);

            colors[0].style.backgroundColor = hex;
            // getColorName(p[0], p[1], p[2]);
          }}
          ref={canvasRef}
          className={styles.canvas}
        ></canvas>
        <div className={styles.boxesContainer}>
          <div className="box">1</div>
          <div className="box">2</div>
          <div className="box">3</div>
          <div className="box">4</div>
          <div className="box">5</div>
          <div className="box">6</div>
          <div className="box">7</div>
          <div className="box">8</div>
          <div className="box">9</div>
        </div>
      </div>
      <button onClick={handleClick}>ll</button>
      <br />
      <div className={`${styles.color} color`}></div>
      <div className={`${styles.color} color`}></div>
      <div className={`${styles.color} color`}></div>
      <br />
      <div className={`${styles.color} color`}></div>
      <div className={`${styles.color} color`}></div>
      <div className={`${styles.color} color`}></div>
      <br />
      <div className={`${styles.color} color`}></div>
      <div className={`${styles.color} color`}></div>
      <div className={`${styles.color} color`}></div>
    </div>
  );
};

export default Solver;
