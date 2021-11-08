import { useEffect, useRef, useState } from "react";
import colorArr from "./colorArr";
import Face from "./Face/Face";
import styles from "./Solver.module.css";

function findPos(obj) {
  let offsetTop = 0,
    offsetLeft = 0;
  while (obj) {
    offsetTop += obj.offsetTop;
    offsetLeft += obj.offsetLeft;
    obj = obj.offsetParent;
  }
  return { x: offsetLeft, y: offsetTop };
}

// function rgbToHex(r, g, b) {
//   if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
//   const colorString = ((r << 16) | (g << 8) | b).toString(16);
//   return colorString;
// }

const getColorIndex = (r, g, b) => {
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
  return index;
};

let ctx;
const Solver = () => {
  const [sides, setSides] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  function draw() {
    ctx.drawImage(videoRef.current, 0, 0, ctx.canvas.width, ctx.canvas.height);
    requestAnimationFrame(draw);
  }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
      ctx = canvasRef.current.getContext("2d");
      ctx.canvas.width = videoRef.current.clientWidth;
      ctx.canvas.height = videoRef.current.clientHeight;
      setTimeout(() => {
        ctx.canvas.width = videoRef.current.clientWidth;
        ctx.canvas.height = videoRef.current.clientHeight;
        videoRef.current.style.display = "none";
      }, 1000);
    });
  }, []);

  const handleClick = () => {
    var position = findPos(canvasRef.current);
    const boxes = document.getElementsByClassName("box");
    let tempSide = [];
    for (let i = 0; i < boxes.length; ++i) {
      const box = boxes[i];
      var boxPosition = findPos(box);
      var x = boxPosition.x - position.x - 65; // idk why I have to subtract ... spend a lot of time to figute out
      var y = boxPosition.y - position.y - 65; // subtract value changes on changing grid gap
      var p = ctx.getImageData(x, y, 1, 1).data;
      // var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
      const colorIndex = getColorIndex(p[0], p[1], p[2]);
      tempSide.push(colorIndex);
    }
    setSides([...sides, tempSide]);
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
        <canvas ref={canvasRef} className={styles.canvas}></canvas>
        <div className={styles.boxesContainer}>
          <div className="box" />
          <div className="box" />
          <div className="box" />
          <div className="box" />
          <div className="box" />
          <div className="box" />
          <div className="box" />
          <div className="box" />
          <div className="box" />
        </div>
      </div>
      <button onClick={handleClick}>ll</button>
      {sides.map((side) => {
        return <Face key={Math.random()} side={side} />;
      })}
    </div>
  );
};

export default Solver;
