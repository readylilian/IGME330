import {getRandomColor,getRandomInt} from "./utils.js";
import {drawArc,drawRandomLine,drawRandomRect,drawRandomArc} from "./canvas-utils.js";

let ctx,canvas;
let paused,createArcs,createLines = false;
let createRectangles = true;
	
const init = () =>
{
	canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");
    update();
    setupUI();
}
// draw a random shape 
const drawRandomShape = () =>
{
    ctx.lineWidth = getRandomInt(2,12);
    ctx.strokeStyle = getRandomColor();
    ctx.fillStyle = getRandomColor();
    ctx.beginPath();
    //Pick a random shape to draw, and randomize the dimensions of each
    switch(getRandomInt(0, 3))
    {
        case 0:
            if(createRectangles){ drawRandomRect(canvas.width,canvas.height); }
            break;
        case 1:
            if(createArcs){ drawRandomArc(true,canvas.width,canvas.height); }
            break;
        case 2:
            if(createArcs){ drawRandomArc(false,canvas.width,canvas.height); }
            break;
        case 3:
            if(createLines){ drawRandomLine(canvas.width); }
            break;
    }
    ctx.closePath();
    ctx.fill();
    if(getRandomInt(0, 1)) { ctx.stroke(); }
}
const update = () =>
{
    requestAnimationFrame(update);
    if(!paused)
    {
        drawRandomShape();
    }
}
const setupUI = () =>
{
    document.querySelector("#btn-pause").onclick = () => {paused = true;};
    document.querySelector("#btn-play").onclick = () => {paused = false;};
    document.querySelector("#btn-clear").onclick = () =>
    {
        ctx.clearRect(0,0,640,480);
    };
    document.querySelector("#cb-rectangles").onclick = () => 
    {createRectangles = document.querySelector("#cb-rectangles").checked};
    document.querySelector("#cb-arcs").onclick = () => 
    {createArcs = document.querySelector("#cb-arcs").checked};
    document.querySelector("#cb-lines").onclick = () => 
    {createLines = document.querySelector("#cb-lines").checked};
    canvas.onclick = canvasClicked;
}
//Canvas handling
const canvasClicked = (e) =>
{
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;
    for(let i = 0; i < 10; i++)
    {
        let x = getRandomInt(-100,100) + mouseX;
        let y = getRandomInt(-100,100) + mouseY;
        let width = getRandomInt(20,50);
        let color = getRandomColor()
        drawArc(x,y,width,color);
    }
}
init();