import * as fire from "./firebase.js";


const updateUI = (snapshot) =>
{
    document.querySelector("#park-list").innerHTML = "";
    console.log(snapshot);
    if(snapshot.size <= 0)
    {
        document.querySelector("#park-list").innerHTML = `<li>No park data</li>`
    }
    snapshot.forEach(park =>
    {
        const childData = park.val();
        console.log(childData);
        document.querySelector("#park-list").innerHTML += `<li><b>${childData.name}(${childData.id})</b> - Likes: ${childData.likes}</li>`;
    });
}

fire.onValue(fire.parksRef,updateUI);