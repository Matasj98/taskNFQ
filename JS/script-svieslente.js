const list = document.getElementById("container");
const ul = document.getElementById("list");

const obj = JSON.parse(window.localStorage.getItem('users'));

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

const timeRemaining = (klientai) =>{
    let time = 0;
    let count = 0;
    klientai.filter(klientas => klientas.time > 0).map(klientas => {
        time += klientas.time;
        if(klientas.time > 0){
            count++;
        }
    })
    time = Math.round(time/1000)/count;
    if(isNaN(time)){
        return "-"
    }
    return JSON.stringify(time).toHHMMSS();
}

obj.map(data => {
    data.klientai.sort((a, b) => a.nr - b.nr)
    let h1 = document.createElement("h1")
    let h3 = document.createElement("h3")
    h1.appendChild(document.createTextNode(data.specialistas))
    h3.appendChild(document.createTextNode("Liko laukti: " + timeRemaining(data.klientai)))
    ul.appendChild(h1)
    ul.appendChild(h3)

    data.klientai.filter(klientas => klientas.nr > 0).filter(klientas => klientas.nr < 5).map(klientas => {
        let li = document.createElement("li")
            li.appendChild(document.createTextNode("Numeris eilėje: "+klientas.nr+ ". Vardas: " + klientas.name + ". Kliento numeris: " + klientas.uniqueNr))
            if(klientas.nr === 1){
                li.setAttribute("class", "pirmas")
            }
            ul.appendChild(li)
    })
})
