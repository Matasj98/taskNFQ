const list = document.getElementById("container");
const ul = document.getElementById("list");

const obj = JSON.parse(window.localStorage.getItem('users'));
       
obj.map(data => {
    data.klientai.sort((a, b) => a.nr - b.nr)
    let h1 = document.createElement("h1")
    h1.appendChild(document.createTextNode(data.specialistas))
    ul.appendChild(h1)
    data.klientai.filter(klientas => klientas.nr > 0).map(klientas => {
        let li = document.createElement("li")
            li.appendChild(document.createTextNode("Numeris eilėje: "+klientas.nr+ ". Vardas: " + klientas.name))
            ul.appendChild(li)
    })
})