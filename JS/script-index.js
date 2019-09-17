const ul = document.querySelector("#list");
const saveList = document.getElementById("userButton");
const input = document.getElementById("userInput");
const inputStorage = document.getElementById("saveDataInLocalStorage");

let obj;

//išsaugoma localStorage
const saveToLocalStorage = () =>{
    window.localStorage.setItem('users', JSON.stringify(obj));
}

//atvaiduojamas prideto kliento vardas
const createListElement = () => {
	let li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    obj.push({"name": input.value});
	input.value = "";
}

// funkcija tikrina ar laukas nera tuščias ir ar event = 13 (13 - ENTER paspaudimas)
const addListAfterKeypress = (event) => {
	if (input.value.length > 0 && event.keyCode === 13) {
		createListElement();
	}
}
//paimami duomenys is klientai.json failo ir prilyginami kintamajui "obj"
const takeDataFromJson = () =>{
    fetch("./klientai.json")
    .then(resp=> resp.json())
    .then(data => {
        obj = data
    });
}

//pats pirmas veiksmas. iskvieciama funkcija, kad iškart nuskaitytu duomenis.
takeDataFromJson();

saveList.addEventListener("click", createListElement);
input.addEventListener("keypress", addListAfterKeypress);
inputStorage.addEventListener("click", saveToLocalStorage);

