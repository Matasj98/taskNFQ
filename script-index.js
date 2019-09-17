const ul = document.querySelector("#list");
const saveList = document.getElementById("userButton");
const input = document.getElementById("userInput");
const inputStorage = document.getElementById("saveDataInLocalStorage");

let obj;

const saveToLocalStorage = () =>{
    window.localStorage.setItem('users', JSON.stringify(obj));
}

function createListElement() {
	let li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    obj.push({"name": input.value});
	input.value = "";
}

const takeDataFromJson = () =>{
    fetch("./klientai.json")
    .then(resp=> resp.json())
    .then(data => {
        obj = data
    });
}

takeDataFromJson();

console.log(obj)

saveList.addEventListener("click", createListElement);
inputStorage.addEventListener("click", saveToLocalStorage);

