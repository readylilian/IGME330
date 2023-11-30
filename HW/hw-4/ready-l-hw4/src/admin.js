import * as fire from "./firebase.js";


const updateUI = (snapshot) =>
{
    document.querySelector("#park-list").innerHTML = "";
    snapshot.forEach(park =>
    {
        const childData = park.val();
        console.log(childData);
        document.querySelector("#park-list").innerHTML += `<li></b>${childData.park}(${childData.id})</b> - Likes: ${childData.likes}</li>`;
    });
}

fire.onValue(fire.parksRef,updateUI);