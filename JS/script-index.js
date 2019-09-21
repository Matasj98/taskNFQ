const ul = document.querySelector("#list");
const saveList = document.getElementById("userButton");
const input = document.getElementById("userInput");
const inputStorage = document.getElementById("saveDataInLocalStorage");
const specialistas = document.querySelector("select");
const alert = document.querySelector(".alert");

let obj;


//išsaugoma localStorage
const saveToLocalStorage = () =>{
    window.localStorage.setItem('users', JSON.stringify(obj));
    
    window.localStorage.setItem('time', new Date())

    alert.innerHTML = "Užregistruoti klientai sėkmingai išsaugoti localStorage"
}

//atvaiduojamas prideto kliento vardas
const createListElement = () => {

    let big_nr = 0;

    obj.map(data =>{

        if(data.specialistas === specialistas.value){
            data.klientai.map(klientas => {
                if(klientas.nr > big_nr){
                    big_nr = klientas.nr;
                }
            })
        }
    })

    obj.map(data => {
        if(data.specialistas === specialistas.value){
            data.klientai.push({"nr": big_nr+1, "uniqueNr":big_nr+1, "name": input.value, "status":false, "time":""});
        }
    })

    let li = document.createElement("li");
	li.appendChild(document.createTextNode("Vardas " + input.value + ". Kliento numeris: "+(big_nr+1)));
    ul.appendChild(li);

    alert.innerHTML = "Klientas užregistruotas sėkmingai <br> Išsaugokite duomenis į localStorage"

    big_nr=0;
    input.value = "";
}

// funkcija tikrina ar laukas nera tuščias ir ar event = 13 (13 - ENTER paspaudimas)
const addListAfterKeypress = (event) => {
	if (input.value.length > 0 && event.keyCode === 13) {
		createListElement();
	}
}

const addListAfterClick = () =>{
    if(input.value.length > 0){
        createListElement();
    }
}
//paimami duomenys is klientai.json failo ir prilyginami kintamajui "obj"
const takeDataFromJson = () =>{
    fetch("./klientai.json")
    .then(resp=> resp.json())
    .then(data => {
        obj = data
    }).catch(() => alert.innerHTML = "Nepavyko nuskaityti klientų duomenų");
}

//pats pirmas veiksmas. iskvieciama funkcija, kad iškart nuskaitytu duomenis.
takeDataFromJson();

saveList.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);
inputStorage.addEventListener("click", saveToLocalStorage);

// specialistas.addEventListener("change", ))

