$(function () {
    var coins = 0;
    var damage = 1;
    var clics = 0;
    const viego = $("#viego");
    const carcoin = $("#coinss");
    const vida = $(".enemy__bars-life");
    const previda = $(".enemy__bars-life-pre");
    const stats = $(".coins__stats");
    const store = $(".store__items");
    const bg = $(".bg");
    const head_enemy = $(".head__enemy");
    stats.html(`
        <p class="stats">Stats</p>
        <br>
        <p class="p-stats">Damage: 1hp per click</p>
        <br>
        <br>
        <p class="p-stats">Total of clics: 0 clicks</p>
        <br>
        <br>
        <p class="p-stats">Weapon: Wooden sword</p>
    `);
    const items = [
        {
            name: "Stone sword",
            price: 150,
            id: 0,
            damage: 2 
        },
        {
            name: "Copper sword",
            price: 500,
            id: 1,
            damage: 4
        },
        {
            name: "Iron sword",
            price: 1500,
            id: 2,
            damage: 16
        },
        {
            name: "Golden sword",
            price: 10000,
            id: 3,
            damage: 32
        },
        {
            name: "Metal sword",
            price: 20000,
            id: 4,
            damage: 64
        },
        {
            name: "Diamond sword",
            price: 50000,
            id: 5,
            damage: 128
        },
        {
            name: "Neptunium sword",
            price: 100000,
            id: 6,
            damage: 256
        },
        {
            name: "Uranium sword",
            price: 200000,
            id: 7,
            damage: 508 
        },
    ]
    console.log(items);
    var id;
    var pcfor = [items[0].price.toString(),items[1].price.toString()]
    for (let t = 2; t < items.length; t++) {
        let newprice = items[t].price.toLocaleString('en-US')
        pcfor.push(newprice)
    }
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < items.length; i++){
        let item = document.createElement('div')
        item.setAttribute("class","store__item");
        item.innerHTML= `
            <div class="bg__item">
                <p class="price" id="${i}">${items[i].name}: $${pcfor[i]}</p>
            </div>
        `;
        fragment.append(item)
    }
    store.append(fragment);
    document.querySelectorAll(".price").forEach(el => {
        el.addEventListener("click", e =>{
            id = e.target.getAttribute("id")
            for (let i = 0; i < items.length; i++) {
                if (id == items[i].id) {
                    if (coins >= items[i].price) {
                        damage = items[i].damage;
                        head_enemy.html(`<p>You have bought: ${items[i].name}</p>`)
                        coins = coins - items[i].price
                        carcoin.html("Coins: " + coins)
                        stats.html(`
                            <p class="stats">Stats</p>
                            <br>
                            <p class="p-stats">Damage: ${damage}hp per click</p>
                            <br>
                            <br>
                            <p class="p-stats">Total of clics: ${clics} clicks</p>
                            <br>
                            <br>
                            <p class="p-stats">Weapon: ${items[i].name}</p>
                        `)
                        let cartel = el.parentNode.parentNode
                        cartel.parentNode.removeChild(cartel)
                        setTimeout(function (){
                            head_enemy.html("<p>Click on the enemy to damage him</p>")
                        },2000)
                    }else{
                        console.log("No tienes el dinero suficiente")
                    }
                }
            }
        })
    });
    head_enemy.html("<p>Click on the enemy to damage him</p>")
    viego.click(function dano() {
        bg.animate({
            opacity: '0.5'
        },80,function(){
            bg.animate({
                opacity: '1'
            },80) 
        })
        vida.css("width", `-=${damage*0.3}px`)
        var life = vida.css("width")
        console.log(life)
        previda.css("width", life)
        coins += (1*damage)
        console.log(coins)
        carcoin.html("Coins: " + coins)
        clics += 1
        if(id==null||id==undefined||id==NaN){
            stats.html(`
            <p class="stats">Stats</p>
            <br>
            <p class="p-stats">Damage: ${damage}hp per click</p>
            <br>
            <br>
            <p class="p-stats">Total of clics: ${clics} clicks</p>
            <br>
            <br>
            <p class="p-stats">Weapon: Wooden sword</p>
        `)
        }else{
        stats.html(`
            <p class="stats">Stats</p>
            <br>
            <p class="p-stats">Damage: ${damage}hp per click</p>
            <br>
            <br>
            <p class="p-stats">Total of clics: ${clics} clicks</p>
            <br>
            <br>
            <p class="p-stats">Weapon: ${items[id].name}</p>
        `)
        }
    });
});