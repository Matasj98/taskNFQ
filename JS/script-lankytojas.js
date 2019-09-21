const specialistas = document.querySelector("select");
const userInput = document.querySelector("input");
const button = document.querySelector("button");
const print = document.getElementById("print")

let interval;

const obj = JSON.parse(window.localStorage.getItem('users'));

const search = () =>{
    clearInterval(interval)

    let answer = "";//atsakymas kuris bus spausdinamas ekrane
    let time = 0; // skaičiuojamas laikas visu klientu praleidusiu pas specialista
    let count = 0; //skaiciuojama kiek klientu buvo pas specialista, kad butu galima suskaičiuoti laiko vidurki
    let klientoNrCheck; //tikrinama ar klientas buvo pas specialista ar ne

    //einama pro visus duomenis
    obj.map(data =>{
        data.klientai.map(klientas =>{
            // ir mums rupi kliento duomenys
            //jei kliento laikas daugiau nei 0,reiskia jis buvo pas specialista ir jo laika galima naudoti vidurkio skaiciavimui
            if(klientas.time > 0 && data.specialistas === specialistas.value){
                count++;
                time += klientas.time;
            }
            //tikrinamas numeris, kuris buvo ivestas ieskant kliento ir tikranamas pasirinktas specialistas
            if((klientas.uniqueNr === Number(userInput.value)) && (data.specialistas === specialistas.value)){
                //saugomas atsakymas
                answer = `Numeris eilėje: ${klientas.nr} <br> Vardas: ${klientas.name} <br> Kliento unikalus numeris: ${klientas.uniqueNr} <br>`;
                klientoNrCheck = klientas.nr;
            }
        })
    })

    if(klientoNrCheck === "-"){
        print.innerHTML = "Klientas aptarnautas."
    }else if(answer != ""){
        //laikas dalinamas is 1000, kad suskaiciuoti kiek yra sekundziu ir is aptarnautu klientu skaiciaus. Tada dauginam is eiles numerio
        //kad suzinotume kiek reikia laukti klientui priklausomai nuo jo numerio eileje.
        time =(Math.round(time/1000)/count)*klientoNrCheck;
        let a = 0; //skaicius kuris atims po 5 sekundes is laiko, 5s prisikiriamos veliau
    
        const printAnswer = () =>{
            time = time - a;
            
            //funkcija apskaiciuoti laikui
            String.prototype.toHHMMSS = function () {
                var sec_num = parseInt(this, 10);
                var hours   = Math.floor(sec_num / 3600);
                var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
                var seconds = sec_num - (hours * 3600) - (minutes * 60);
            
                if (hours   < 10) {hours   = "0"+hours;}
                if (minutes < 10) {minutes = "0"+minutes;}
                if (seconds < 10) {seconds = "0"+seconds;}
                return hours + ':' + minutes + ':' + seconds;
            }
            
            //jei sekantis laikas atemus 5 seundes bus maziau uz 0, tai kliento eile atejo
            if(time - 5 < 0){
                print.innerHTML = answer + "Atėjo jūsų eilė!";
                clearInterval(interval)
            }else{
                print.innerHTML = answer + `Kiek liko laukti: ~${JSON.stringify(time).toHHMMSS()}`
            }

            a=5
        }

        if(isNaN(time)){
            print.innerHTML = answer + "Kiek liko laukti: nepavyko nustatyti"
        }else{
            printAnswer()
            interval = setInterval(printAnswer,5000)
        }

    }else{
        print.innerHTML = "Klientas nerastas. Patikslinkite įvestus duomenis."
    }

}

button.addEventListener("click", search)