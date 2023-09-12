import {randomElement} from "./utils.js";

let words1;
let words2;
let words3;

//Generate babble
const generateTechno = (num) =>
{
    document.querySelector("#output").innerHTML = "";
    for(let i = 0; i < num; i++)
    {
        document.querySelector("#output").innerHTML += 
        `<p>
            ${words1[randomElement(words1.length)]} 
            ${words2[randomElement(words2.length)]} 
            ${words3[randomElement(words3.length)]}
        </p>`;
    }
        
}

//Load the babble from the json file
const loadBabble = () =>
{
    const url = "data/babble-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => 
    {
        babbleLoaded(e);
    }
    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("GET", url);
    xhr.send();
}

//Once loaded parse and set up the app
const babbleLoaded = (e) =>
{
    console.log(`In onload - HTTP Status Code = ${e.target.status}`);
            
    const json = e.target.responseText;
    //Parse the JSON and add to the arrays
    let parsed;
    try{
        parsed = JSON.parse(json);
    }catch
    {
        document.querySelector("#output").innerHTML = "JSON is null";
        return;
    }
    words1 = parsed.words1;
    words2 = parsed.words2;
    words3 = parsed.words3;

    //Initialize button click events
    document.querySelector("#button-1").onclick = () => {generateTechno(1)};
    document.querySelector("#button-5").onclick = () => {generateTechno(5)};

    //Call another function to display startup babble
    generateTechno(1);
}

//Try to load the babble
window.onload = () =>
{
    loadBabble();
}