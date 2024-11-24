let color = document.querySelector("#clr");
let slider = document.querySelector("#slider");
let thicknessDisplay = document.querySelector("#pen-thickness");
let reset = document.querySelector("#reset");
let canvas = document.querySelector("canvas");
let btndraw = document.querySelector("#draw");
let btnerase = document.querySelector("#erase");

let drawing = false;
let erasing = false;

btndraw.addEventListener("click", () => {
    erasing = false;
    btnerase.style.boxShadow = "5px 5px 0px 0px black";
    btnerase.style.backgroundColor = "white";
});

btnerase.addEventListener("click", () => {
    erasing = true;
    btnerase.style.boxShadow = "0px 0px 0px 0px black";
    btnerase.style.backgroundColor = "rgb(125, 229, 87)";
});

slider.addEventListener("input", () => {
    thicknessDisplay.innerHTML = "<strong>" + slider.value + "</strong>";
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    console.log("rect left: " + rect.left);
    console.log("rect top: " + rect.top);
    console.log("client x: " + e.clientX);
    console.log("client y: "+ e.clientY);
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    let mousePos = getMousePos(canvas, e);
    c.lineCap = "round";
    c.lineWidth = slider.value;
    if (erasing) {
        c.globalCompositeOperation = 'destination-out';
        c.lineWidth = slider.value * 10;
    } else {
        c.globalCompositeOperation = 'source-over';
        c.strokeStyle = color.value;
    }
    c.beginPath();
    c.moveTo(mousePos.x, mousePos.y);
    drawDot(mousePos.x, mousePos.y);
});

function drawDot(x, y) {
    c.beginPath();
    c.arc(x, y, c.lineWidth / 10, 0, Math.PI * 2);
    c.fillStyle = c.strokeStyle;
    c.fill();
    c.closePath();
}

canvas.addEventListener("mouseup", () => {
    if (drawing) {
        c.stroke();
        c.closePath();
        drawing = false;
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (drawing) {
        let mousePos = getMousePos(canvas, e);
        c.lineTo(mousePos.x, mousePos.y);
        c.stroke();
    }
});

reset.addEventListener("click", () => {
    c.clearRect(0, 0, canvas.width, canvas.height);
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});