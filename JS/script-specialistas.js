const ul = document.getElementById("list")
const filter = document.querySelectorAll("input")

const obj = JSON.parse(window.localStorage.getItem('users'));

let start = new Date();
let end;

const trackTime = () =>{
    end = new Date() - start;
    start = new Date();

    var seconds = Math.round(end / 1000);
    var minutes = Math.round(seconds / 60);
    var hours = Math.round(minutes / 60);

    end = `${hours}h ${minutes}min ${seconds}sec`;
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
                    trackTime();

                    let span = document.createElement("span")
                    span.appendChild(document.createTextNode("Aptarnautas per " + end))
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
                    span.appendChild(document.createTextNode("Aptarnautas"));
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