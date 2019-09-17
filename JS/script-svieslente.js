const list = document.getElementById("container");
const ul = document.getElementById("list");

const obj = JSON.parse(window.localStorage.getItem('users'));

obj.map(data => {
    let sort = data.klientai
    sort.sort((a, b) => (a.nr > b.nr) ? 1 : -1)
    let h1 = document.createElement("h1")
    h1.appendChild(document.createTextNode(data.specialistas))
    ul.appendChild(h1)
    sort.map(klientas => {
        let li = document.createElement("li")
        li.appendChild(document.createTextNode("Numeris eilėje: "+klientas.nr+ ". Vardas: " + klientas.name))
        ul.appendChild(li)
    })
})

window.localStorage.setItem('users', JSON.stringify(obj));