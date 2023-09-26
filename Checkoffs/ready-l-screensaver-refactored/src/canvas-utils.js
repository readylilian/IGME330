import {getRandomColor,getRandomInt} from "./utils.js";
let ctx = document.querySelector("canvas").getContext("2d");

const drawRectangle = (x,y,width,height,fillStyle="black",lineWidth = 0,strokeStyle="black") =>
{
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.rect(x,y,width,height);
    ctx.fill();
    if(lineWidth > 0)
    {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }
    ctx.closePath();
    ctx.restore();
}
const drawLine = (x1,y1,x2,y2,lineWidth = 1,strokeStyle="black") =>
{
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}
export const drawArc = (x,y,radius,fillStyle="black",lineWidth = 0,strokeStyle="black",startAngle=0,endAngle=2*Math.PI) =>
{
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.arc(x,y,radius,startAngle,endAngle);
    ctx.fill();
    if(lineWidth > 0)
    {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }
    ctx.closePath();
    ctx.restore();
}
//Draw line functions
export const drawRandomLine = (width=640) =>
{
    drawLine(
        getRandomInt(0,width), getRandomInt(0,width), getRandomInt(0,width),
        getRandomInt(0,width), getRandomInt(1,20),getRandomColor());
}

//Draw rect functions
export const drawRandomRect = (width=640,height=480) =>
{
    drawRectangle(
        getRandomInt(0,width), getRandomInt(0,height), getRandomInt(10,90),
        getRandomInt(10,90), getRandomColor(),getRandomInt(2,12),
        getRandomColor());
}
//Draw arc functions
export const drawRandomArc = (circle = false,width=640,height=480) =>
{
    if(circle)
    {
        drawArc(
            getRandomInt(0,width), getRandomInt(0,height),getRandomInt(10,90),
            getRandomColor(), getRandomInt(2,12), getRandomColor());
    }
    else
    {
        drawArc(
            getRandomInt(0,width), getRandomInt(0,height), getRandomInt(10,90),
            getRandomColor(), getRandomInt(2,12), getRandomColor(),
            getRandomInt(0, 2 * Math.PI), getRandomInt(0, 2 * Math.PI));
    }
}