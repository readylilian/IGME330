import * as storage from "./storage.js"
let items = ["???!!!"];


// I. declare and implement showItems()
// - this will show the contents of the items array in the <ol>
const showItems = () => {
  // loop though items and stick each array element into an <li>
  // use array.map()!
  // update the innerHTML of the <ol> already on the page
  document.querySelector(".ml-4").innerHTML = items.map(x =>`<li>${x}</li>`).join("");
};

// II. declare and implement addItem(str)
// - this will add `str` to the `items` array (so long as `str` is length greater than 0)
const addItem = str => {
  if(str)
  {
    items.push(str);
    storage.writeToLocalStorage("items",items);
    showItems();
  }
};

const setupUI = () =>
{
  document.querySelector("#btn-add").onclick = () =>
  {
    addItem(document.querySelector("#thing-text").value);
    document.querySelector("#thing-text").value = "";
  }
  document.querySelector("#btn-rm").onclick = () =>
  {
    items = [];
    storage.writeToLocalStorage("items",items);
    showItems();
  }
}

// Also:
// - call `addItem()`` when the button is clicked, and also clear out the <input>
// - and be sure to update .localStorage by calling `writeToLocalStorage("items",items)`

// When the page loads:
// - load in the `items` array from storage.js and display the current items
// you might want to double-check that you loaded an array ...
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
// ... and if you didn't, set `items` to an empty array
if(storage.readFromLocalStorage("items"))
{
  items = storage.readFromLocalStorage("items");
}
showItems();
setupUI();
// Got it working? 
// - Add a "Clear List" button that empties the items array
