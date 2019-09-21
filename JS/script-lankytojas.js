const specialistas = document.querySelector("select");
const userInput = document.querySelector("input");
const button = document.querySelector("button");
const print = document.getElementById("print")

const obj = JSON.parse(window.localStorage.getItem('users'));

const calculateTime = (time) =>{

    var seconds = Math.round(time / 1000);
    var minutes = Math.round(seconds / 60);
    while(seconds > 60){
        seconds -= 60;
    }
    var hours = Math.round(minutes / 60);

    if(isNaN(time)){
        return "Nepavyko nustatyti"
    }
    return `${hours}h ${minutes}min ${seconds}sec`;
}

const search = () =>{
    
    let answer = "";
    let time = 0;
    let count = 0;
    let klientoNrCheck;

    obj.map(data =>{
        data.klientai.map(klientas =>{
            if(klientas.time > 0){
                count++;
                time += klientas.time;
            }
            if((klientas.uniqueNr === Number(userInput.value)) && (data.specialistas === specialistas.value)){
                answer = `Numeris eilėje: ${klientas.nr} <br> Vardas: ${klientas.name} <br> Kliento unikalus numeris: ${klientas.uniqueNr} <br>`;
                klientoNrCheck = klientas.nr;
            }
        })
    })
    if(klientoNrCheck === "-"){
        print.innerHTML = "Klientas aptarnautas."
    }else if(answer != ""){
        print.innerHTML = answer + `Kiek liko laukti: ${calculateTime(time/count)}`
    }else{
        print.innerHTML = "Klientas nerastas. Patikslinkite įvestus duomenis."
    }

}

button.addEventListener("click", search)