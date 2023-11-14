const SUN_URL = "https://api.sunrise-sunset.org/json?";
const NASA_URL = "https://api.nasa.gov/planetary/apod?";
const NASA_KEY = "xodsnbtiJqcWwR7hiMvBfyeABMAV3yWMIUamfg4f";
let locationAllowed = false;
let lat,long;

const position = (pos) =>
{
    lat = pos.coords.latitude;
    long = pos.coords.longitude;
}
const findLocation = (date) =>
{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position);
        locationAllowed = true;
        //1 new XHR object
        let xhr = new XMLHttpRequest();
        //2 set onload handler
        xhr.onload = sunDataLoaded;
        //3 set onerror handler
        xhr.onerror = () => {console.log("An error occurred");};
        //4 get open and sent request
        xhr.open("GET", SUN_URL+ "lat=" + lat + "&lng=" + long + "&date="+ date);
        xhr.send();
    }
    else
    {
        document.querySelector("#location").innerHTML = "Unable to access location data. Please allow chrome to access your location."
    }
}
const sunDataLoaded = (e) =>
{
    let xhr = e.target;
    let obj = JSON.parse(xhr.responseText);
    //8 if no response print and return
    if(!obj.results.sunrise || obj.results.sunrise == 0){
        document.querySelector("#location").innerHTML = "No times found for your location";
        return;
    }
    else{
        document.querySelector("#location").innerHTML = `Your location is: '${long}','${lat}'<br>Sunrise is at: '${obj.results.sunrise}' UTC Sunset is at: '${obj.results.sunset}' UTC`;
    }
}

const dateSelected = (date) =>
{
    //1 new XHR object
    let xhr = new XMLHttpRequest();
    //2 set onload handler
    xhr.onload = imgDataLoaded;
    //3 set onerror handler
    xhr.onerror = () => {console.log("An error occurred");};
    //4 get open and sent request
    xhr.open("GET", NASA_URL + "api_key=" + NASA_KEY + "&date=" + date);
    xhr.send();
}

const imgDataLoaded = (e) =>
{
    let xhr = e.target;
    let obj = JSON.parse(xhr.responseText);

    let body = document.querySelector('body');
    //8 if no response print and return
    if(!obj.date || obj.date == 0){
        document.querySelector("#pod").innerHTML = "<b>No results found for '" +  + "'</b>";
        return;
    }
    else 
    {
        if (obj.media_type == "image")
        {
            let image = "<img";
            //get the hd version
            image += ` src = '${obj.hdurl}' alt = '${obj.title}'/> `;
            document.querySelector('#pod-image').innerHTML = image;

            //make background
            body.style.background = `#03122b url(${obj.hdurl}) no-repeat 0px 50% fixed`;
            body.style.backgroundSize = "300% auto";
        }
        else if (obj.media_type == "video")
        {
            let vid = "<iframe width = '100%'";
            vid += `src="${obj.url}"></iframe>`
            document.querySelector('#pod-image').innerHTML = vid;
        }
        //add description
        document.querySelector('#description').innerHTML = `<h2>${obj.title}</h2><p>${obj.explanation}</p>`;
    }
}

export {dateSelected,findLocation,locationAllowed}