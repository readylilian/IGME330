let day:string, calInput:HTMLInputElement;
let dayList: string[] = [];
const dateKey: string = `lr4631-dates`;

let storedDates: string|null = localStorage.getItem(dateKey);
import * as load from './loader';

const prevDay = () =>
{
    let check: Date = new Date(`${day} 00:00`);
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
    let check: Date = new Date(`${day} 00:00`);
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
    let check: Date = new Date(`${day} 00:00`);
    check.setDate(check.getDate() - 1);
    if(check >= new Date(1995,6,16))
    {
        (document.querySelector(`#prev-button`) as HTMLButtonElement).style.visibility = `visible`;
    }
    else
    {
        (document.querySelector(`#prev-button`) as HTMLButtonElement).style.visibility = `hidden`;
    }
    check = new Date(`${day} 00:00`);
    check.setDate(check.getDate() + 1);
    if(check < new Date())
    {
        (document.querySelector(`#next-button`) as HTMLButtonElement).style.visibility = `visible`;
    }
    else
    {
        (document.querySelector(`#next-button`) as HTMLButtonElement).style.visibility = `hidden`;
    }
    load.dateSelected(day);
    calInput.value = day;
}

const formatDate = (date:Date): string =>
{
    let format:string = `${date.getFullYear()}-`;
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
        dayList = storedDates.split(`,`);
        (document.querySelector(`#prev-dates`) as HTMLParagraphElement).innerHTML = `Previously Searched For Dates:`;
        (document.querySelector(`#prev-dates`) as HTMLParagraphElement).innerHTML += dayList.map(x => `<br><a id="date${x}">${x}</a>`).join("");
        dayList.forEach(e => {
            (document.querySelector(`#date${e}`) as HTMLLinkElement).onclick = () => 
            {
                day = e;
                calInput.value = day;
                checkDate();
            };
        });
    }
}

const setupUI = () =>
{
    let today: string = formatDate(new Date());
    day = today;
    //This goes first so when the rest of UI setup fails the about doc, this still works
    const burgerIcon = (document.querySelector('#burger') as HTMLLinkElement);
    const navbarMenu = (document.querySelector('#nav-links') as HTMLDivElement);

    burgerIcon.onclick = () => {
        navbarMenu.classList.toggle('is-active');
    };
    //Set up buttons
    (document.querySelector(`#loc-button`) as HTMLButtonElement).onclick = () => {load.findLocation(day)};
    (document.querySelector(`#prev-button`) as HTMLButtonElement).onclick = prevDay;
    (document.querySelector(`#next-button`) as HTMLButtonElement).onclick = nextDay;

    loopDateLinks();

    //Set up the calendar
    calInput = (document.querySelector('#input-cal') as HTMLInputElement);
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

    load.dateSelected(calInput.value);
    checkDate();
}

setupUI();