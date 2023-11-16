const SUN_URL: string = `https://api.sunrise-sunset.org/json?`;
const NASA_URL: string = `https://api.nasa.gov/planetary/apod?`;
const NASA_KEY: string = `xodsnbtiJqcWwR7hiMvBfyeABMAV3yWMIUamfg4f`;
let locationAllowed: Boolean = false;
let cords: coordinates = {lat:-1,long:-1};

interface coordinates {
    lat:number,
    long:number
}

const position = (pos:GeolocationPosition) =>
{
    cords = {lat:pos.coords.latitude, long: pos.coords.longitude};
}

const findLocation = (date:string) =>
{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position);
        locationAllowed = true;
        //1 new XHR object
        let xhr = new XMLHttpRequest();
        //2 set onload handler
        xhr.onload = sunDataLoaded;
        //3 set onerror handler
        xhr.onerror = () => {console.log(`An error occurred`);};
        //4 get open and sent request
        xhr.open(`GET`, `${SUN_URL}lat=${cords.lat}&lng=${cords.long}&date=${date}`);
        xhr.send();
    }
    else
    {
        (document.querySelector(`#location`) as HTMLDivElement).innerHTML = `Unable to access location data. Please allow chrome to access your location.`
    }
}
const sunDataLoaded = (e:any) =>
{
    let xhr = e.target;
    let obj = JSON.parse(xhr.responseText);
    //8 if no response print and return
    if(!obj.results.sunrise || obj.results.sunrise == 0){
        (document.querySelector(`#location`) as HTMLDivElement).innerHTML = `No times found for your location`;
    }
    else{
        (document.querySelector(`#location`) as HTMLDivElement).innerHTML = 
        `Your location is: '${cords.long}','${cords.lat}'<br>Sunrise is at: '${obj.results.sunrise}' UTC Sunset is at: '${obj.results.sunset}' UTC`;
    }
}

const dateSelected = (date:string) =>
{
    //1 new XHR object
    let xhr = new XMLHttpRequest();
    //2 set onload handler
    xhr.onload = imgDataLoaded;
    //3 set onerror handler
    xhr.onerror = () => {console.log(`An error occurred`);};
    //4 get open and sent request
    xhr.open(`GET`, `${NASA_URL}api_key=${NASA_KEY}&date=${date}`);
    xhr.send();
}

const imgDataLoaded = (e:any) =>
{
    let xhr = e.target;
    let obj = JSON.parse(xhr.responseText);

    let body = document.querySelector('body')!;
    //8 if no response print and return
    if(!obj.date || obj.date == 0){
        (document.querySelector(`#pod`) as HTMLDivElement).innerHTML = `<b>No results found.</b>`;
    }
    else 
    {
        if (obj.media_type == `image`)
        {
            (document.querySelector('#pod-image') as HTMLDivElement).innerHTML = 
            `<img src = '${obj.hdurl}' alt = '${obj.title}'/>`;

            //make background
            body.style.background = `#03122b url(${obj.hdurl}) no-repeat 0px 50% fixed`;
            body.style.backgroundSize = `300% auto`;
        }
        else if (obj.media_type == `video`)
        {
            (document.querySelector('#pod-image') as HTMLDivElement).innerHTML =
            `<iframe width = '100%' src="${obj.url}"></iframe>`;
        }
        //add description
        (document.querySelector('#description') as HTMLDivElement).innerHTML = `<h2>${obj.title}</h2><p>${obj.explanation}</p>`;
    }
}

export {dateSelected,findLocation,locationAllowed}