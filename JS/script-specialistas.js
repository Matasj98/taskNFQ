const ul = document.getElementById("list")
const filter = document.querySelectorAll("input")

const obj = JSON.parse(window.localStorage.getItem('users'));

const trackTime = () =>{
    let start = new Date();
    let oldTime = new Date(window.localStorage.getItem('time'))
    let end = start - oldTime;
    window.localStorage.setItem('time', new Date())

    return end
}

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

const printSpecialistas = (value) =>{

    ul.innerHTML = "";
    obj.map(data => {
        
        let sort = data.klientai
        sort.sort((a, b) => a.nr - b.nr)
        sort.sort((a,b)=> a.status - b.status)
        if(value === data.specialistas || value === "Visi"){
            let h1 = document.createElement("h1")
            h1.appendChild(document.createTextNode(data.specialistas))
            ul.appendChild(h1)
            sort.map(klientas => {
            
                let li = document.createElement("li")
                li.appendChild(document.createTextNode("Numeris eilėje: "+klientas.nr+ ". Vardas: " + klientas.name))
                ul.appendChild(li)

                const aptarnavimas = (evt) =>{
                    klientas.time = trackTime();
                    let time = JSON.stringify(klientas.time/1000).toHHMMSS()

                    let span = document.createElement("span")
                    span.appendChild(document.createTextNode("Aptarnautas per " + time))
                    evt.target.parentElement.appendChild(span)
                
                    evt.target.remove();
        
                    setStatus();
                }
        
                const setStatus = () =>{
                klientas.status = true;
                changeNumbers();
                klientas.nr = "-";
                window.localStorage.setItem('users', JSON.stringify(obj));
                }
        
                const changeNumbers = () =>{
                    sort.map(klientas1 => {
                        if(klientas1.nr > klientas.nr){
                            klientas1.nr--;
                        }
                    })
                }
        
                if(klientas.status === false){
                    let button = document.createElement("button");
                    button.appendChild(document.createTextNode("Aptarnauti"));
                    li.appendChild(button);
                    
                    button.onclick = aptarnavimas;
                }else{
                    let span = document.createElement("span");
                    span.appendChild(document.createTextNode("Aptarnautas per " + (JSON.stringify(klientas.time/1000).toHHMMSS())));
                    li.appendChild(span);
                }
        
            })
        }
        
    })
}

for(let i = 0; i < filter.length; i++){
    filter[i].addEventListener("change", () => printSpecialistas(filter[i].value))
}

printSpecialistas(filter[0].value)