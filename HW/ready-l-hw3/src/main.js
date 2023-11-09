let day;
let locationText;
let lat;
let long;
let calendar;
let calInput;
let dayList  = [];
const prefix = "lr4631-";
const dateKey = prefix + "dates";
let storedDates = localStorage.getItem(dateKey);

const findLocation = () =>
{
    console.log("Trying to find location");
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position);
    }
}
const position = (pos) =>
{
    lat = pos.coords.latitude;
    long = pos.coords.longitude
    locationInformation(day);
}
const returnToday = () =>
{
    let formDate = "";
    let date = new Date();
    let todayDate = date.getDate();
    if(todayDate < 10)
    {
        todayDate = `0${todayDate}`;
    }
    formDate += `${date.getFullYear()}-${date.getMonth() + 1}-${todayDate}`;
    console.log(formDate);
    return formDate;
}

const locationInformation = (date) =>
{
    const SUN_URL = "https://api.sunrise-sunset.org/json?";
    let sun_url = SUN_URL+ "lat=" + lat + "&lng=" + long + "&date="+date;
    console.log(sun_url);
    locationText = document.querySelector("#location");
    getSunData(sun_url);
}

const dateSelected = (date) =>
{
   
    console.log("dateSelected() called");
    const NASA_URL = "https://api.nasa.gov/planetary/apod?";
    let NASA_KEY = "xodsnbtiJqcWwR7hiMvBfyeABMAV3yWMIUamfg4f";
    let nasa_url = NASA_URL + "api_key=" + NASA_KEY + "&date=" + date;
    //Update UI
    console.log(nasa_url);
    getImgData(nasa_url);
    
}
//Actually get the url
const getImgData = (url) =>
{
    //1 new XHR object
    let xhr = new XMLHttpRequest();
    //2 set onload handler
    xhr.onload = imgDataLoaded;
    //3 set onerror handler
    xhr.onerror = dataError;
    //4 get open and sent request
    xhr.open("GET", url);
    xhr.send();
}

const getSunData = (url) =>
{
    //1 new XHR object
    let xhr = new XMLHttpRequest();
    //2 set onload handler
    xhr.onload = sunDataLoaded;
    //3 set onerror handler
    xhr.onerror = dataError;
    //4 get open and sent request
    xhr.open("GET", url);
    xhr.send();
}

const imgDataLoaded = (e) =>
{
    //5 event.target is the xhr object
    let xhr = e.target;
    let image;
    //6 xhr.responseText is the file downloaded
    console.log(xhr.responseText);
    //7 turn text into Javascript object
    let obj = JSON.parse(xhr.responseText);

    let body = document.querySelector('body');
    let pod = document.querySelector('#pod');
    //8 if no response print and return
    if(!obj.date || obj.date == 0){
        document.querySelector("#pod").innerHTML = "<b>No results found for '" +  + "'</b>";
        return;
    }
    else 
    {
        if (obj.media_type == "image")
        {
            image = "<img";
            //get the hd version
            image += ` src = '${obj.hdurl}' alt = '${obj.title}'/> `;
            document.querySelector('#pod').innerHTML += image;

            //make background
            body.style.background = `#03122b url(${obj.hdurl}) no-repeat 0px 50% fixed`;
            body.style.backgroundSize = "300% auto";


            //body.style.opacity = "1";
        }
        else if (obj.media_type == "video")
        {
            image = "<iframe width = '100%'";
            image += `src="${obj.url}"></iframe>`
            pod.innerHTML += image;

            body.style.background = "";
            body.style.backgroundSize = "";

        }
        //add description
        document.querySelector('#description').innerHTML = `<h2>${obj.title}</h2><p>${obj.explanation}</p>`;
    }
    //setupUI();
}
const sunDataLoaded = (e) =>
{
    let xhr = e.target;
    //6 xhr.responseText is the file downloaded
    console.log(xhr.responseText);
    //7 turn text into Javascript object
    let obj = JSON.parse(xhr.responseText);
    //8 if no response print and return
    if(!obj.results.sunrise || obj.results.sunrise == 0){
        locationText.innerHTML = "No times found for your location";
        return;
    }
    else{

        locationText.innerHTML = `Your location is: '${long}','${lat}'<br>Sunrise is at: '${obj.results.sunrise}' UTC Sunset is at: '${obj.results.sunset}' UTC`
        //locationText.innerHTML = ;
        
    }
}
const dataError = (e) =>
{
    console.log("An error occurred");
}
const prevDay = () =>
{
    let yesterday = new Date(`${day} 00:00`);
    yesterday.setDate(yesterday.getDate() - 1);
    
    let formDate = `${yesterday.getFullYear()}-`;
    
    if((yesterday.getMonth() + 1) <10)
    {
        formDate += `0${yesterday.getMonth() + 1}-`;
    }
    else{formDate += `${yesterday.getMonth() + 1}-`;}

    if(yesterday.getDate()<10)
    {
        formDate += `0${yesterday.getDate()}`;
    }
    else{formDate += `${yesterday.getDate()}`;}
    console.log(formDate);
    calInput.value = formDate;
    day = calInput.value;
    checkDate();
    //dateSelected(day);
    locationInformation(day);
}
const nextDay = () =>
{
    let tomorrowCheck = new Date(`${day} 00:00`);
    tomorrowCheck.setDate(tomorrowCheck.getDate() + 1);

    let formDate = `${tomorrowCheck.getFullYear()}-`;

    if((tomorrowCheck.getMonth() + 1) <10)
    {
        formDate += `0${tomorrowCheck.getMonth() + 1}-`;
    }
    else{formDate += `${tomorrowCheck.getMonth() + 1}-`;}

    if(tomorrowCheck.getDate()<10)
    {
        formDate += `0${tomorrowCheck.getDate()}`;
    }
    else{formDate += `${tomorrowCheck.getDate()}`;}
    calInput.value = formDate;
    day = calInput.value;
    checkDate();
    //dateSelected(day);
    locationInformation(day);
}
//Date validation
const checkDate = () =>
{
    //Is tomorrow past today? If yes, no next button only previous
    //Set up our buttons
    document.querySelector('#pod').innerHTML ="";
    let pod = document.querySelector('#pod');

    //Dont go past the oldest, or past today
    let check = new Date(`${day} 00:00`);
    check.setDate(check.getDate() -1);
    if(check >= new Date(1995,6,16))
    {
        let prevButton = document.createElement("button");
        prevButton.innerHTML = "Previous";
        prevButton.onclick = () => {prevDay()};
        prevButton.id = "prev";
        pod.appendChild(prevButton);
    }
    check = new Date(`${day} 00:00`);
    check.setDate(check.getDate()  + 1);
    if(check < new Date())
    {
        let nextButton = document.createElement("button");
        nextButton.innerHTML = "Next";
        nextButton.onclick = () => {nextDay();};
        nextButton.id = "next";
        pod.appendChild(nextButton);
    }
    dateSelected(document.querySelector('#input-cal').value);
    
}

const dateLinkClick = (date) =>
{
    day = date;
    calInput.value = day;
    checkDate();
}

const setupUI = () =>
{
    //Set up location
    let locButton = document.querySelector("#locbutton");
    locButton.onclick = findLocation;

    if(storedDates)
    {
        dayList = storedDates.split(",");
        //document.querySelector("#prev-dates").innerHTML +=`${storedDates}`;
        document.querySelector("#prev-dates").innerHTML = `Previously Searched For Dates:`;
        document.querySelector("#prev-dates").innerHTML += dayList.map(x => `<div>${x}</div>`).join("");
    }

    //Set up the calendar
    day = today;
    calInput = document.querySelector('#input-cal');
    calInput.value = `${today}`;
    calInput.max = `${today}`;
    calInput.onchange = () =>
    {
        day = calInput.value;
        checkDate();
        dayList.push(day);
        localStorage.setItem(dateKey, `${dayList}`);
        storedDates = localStorage.getItem(dateKey);
        document.querySelector("#prev-dates").innerHTML = `Previously Searched For Dates:`;
        document.querySelector("#prev-dates").innerHTML += dayList.map(x => `<div>${x}</div>`).join("");
    };

    dateSelected(document.querySelector('#input-cal').value);
    checkDate();
}

//Onload get the image of today
//Assign background and sunset timer to watch for calendar changes 
//function to get day and set sunset and image
//function get the image and data from each api
//probably just load image as it's grabbed
let today = returnToday();
//window.addEventListener("load", createCal);
//window.addEventListener("load", createPrevDates);
//window.addEventListener("load", checkDate);
window.onload = () => {setupUI();};