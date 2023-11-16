let day,calInput;
let dayList  = [];
const prefix = "lr4631-";
const dateKey = prefix + "dates";

let storedDates = localStorage.getItem(dateKey);
import * as load from './loader.js';

const prevDay = () =>
{
    let check = new Date(`${day} 00:00`);
    check.setDate(check.getDate() - 1);
    day = formatDate(check);
    checkDate();
    if(load.locationAllowed)
    {
        load.findLocation(day);
    }
}
const nextDay = () =>
{
    let check = new Date(`${day} 00:00`);
    check.setDate(check.getDate() + 1);
    day = formatDate(check);
    checkDate();
    if(load.locationAllowed)
    {
        load.findLocation(day);
    }
}
//Date validation
const checkDate = () =>
{
    //Set up our buttons
    //Dont go past the oldest, or past today
    let check = new Date(`${day} 00:00`);
    check.setDate(check.getDate() - 1);
    if(check >= new Date(1995,6,16))
    {
        document.querySelector("#prev-button").style.visibility = "visible";
    }
    else
    {
        document.querySelector("#prev-button").style.visibility = "hidden";
    }
    check = new Date(`${day} 00:00`);
    check.setDate(check.getDate() + 1);
    if(check < new Date())
    {
        document.querySelector("#next-button").style.visibility = "visible";
    }
    else
    {
        document.querySelector("#next-button").style.visibility = "hidden";
    }
    load.dateSelected(day);
    document.querySelector('#input-cal').value = day;
}

const formatDate = (date) =>
{
    let format = `${date.getFullYear()}-`;
    if((date.getMonth() + 1) < 10)
    {
        format += `0${date.getMonth() + 1}-`;
    }
    else{format += `${date.getMonth() + 1}-`;}

    if(date.getDate() < 10)
    {
        format += `0${date.getDate()}`;
    }
    else{format += `${date.getDate()}`;}

    return format;
}

const loopDateLinks = () =>
{
    if(storedDates)
    {
        dayList = storedDates.split(",");
        document.querySelector("#prev-dates").innerHTML = `Previously Searched For Dates:`;
        document.querySelector("#prev-dates").innerHTML += dayList.map(x => `<br><a id="date${x}">${x}</a>`).join("");
        dayList.forEach(e => {
            document.querySelector(`#date${e}`).onclick = () => 
            {
                day = e;
                document.querySelector('#input-cal').value = day;
                checkDate();
            };
        });
    }
}

const setupUI = () =>
{
    let today = formatDate(new Date());
    day = today;
    //This goes first so when the rest of UI setup fails the about doc, this still works
    const burgerIcon = document.querySelector('#burger');
    const navbarMenu = document.querySelector('#nav-links');

    burgerIcon.onclick = () => {
        navbarMenu.classList.toggle('is-active');
    };
    //Set up buttons
    document.querySelector("#loc-button").onclick = () => {load.findLocation(day)};
    document.querySelector("#prev-button").onclick = prevDay;
    document.querySelector("#next-button").onclick = nextDay;

    loopDateLinks();

    //Set up the calendar
    calInput = document.querySelector('#input-cal');
    calInput.value = `${today}`;
    calInput.max = `${today}`;
    calInput.onchange = () =>
    {
        day = calInput.value;
        if(!dayList.find((e)=> e == day))
        {
            dayList.push(day);
        }
        localStorage.setItem(dateKey, `${dayList}`);
        storedDates = localStorage.getItem(dateKey);
        loopDateLinks();
        checkDate();
    };

    load.dateSelected(document.querySelector('#input-cal').value);
    checkDate();
}

setupUI();