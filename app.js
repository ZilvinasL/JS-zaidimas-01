document.addEventListener('DOMContentLoaded', () => {
    // Visas js kodas talpinamas į šį DOM event listener (panašiai kaip jQuery ready function)

    //blokų variantai, po 2 kopijas
    const cardArray = [
        {
            name: 'bread',
            img: '../img/bread.png'
        },
        {
            name: 'bread',
            img: '../img/bread.png'
        },
        {
            name: 'chicken',
            img: '../img/chicken.png'
        },
        {
            name: 'chicken',
            img: '../img/chicken.png'
        },
        {
            name: 'milkshake',
            img: '../img/milkshake.png'
        },
        {
            name: 'milkshake',
            img: '../img/milkshake.png'
        },
        {
            name: 'muffins',
            img: '../img/muffins.png'
        },
        {
            name: 'muffins',
            img: '../img/muffins.png'
        },
        {
            name: 'salmon',
            img: '../img/salmon.png'
        },
        {
            name: 'salmon',
            img: '../img/salmon.png'
        },
        {
            name: 'soup',
            img: '../img/soup.png'
        },
        {
            name: 'soup',
            img: '../img/soup.png'
        }
    ]

    // (PASKUTINIS DALYKAS)
    // Mums reikia pateikti blokus atsitiktine seka, kad galėtume žaisti dar kartą
    cardArray.sort(() => 0.5 - Math.random())

    // sukuriame lentelę

    // paimame iš HTML elementą su klase .grid ir dedame į js kintamąjį grid
    const grid = document.querySelector('.grid')

    // sukuriame resultDisplay, kad talpintume rezultatą
    const resultDisplay = document.querySelector('#result')
    
    //sukuriame pasirinktų blokų tuščią masyvą, id, teisingų atsakymų
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = [] 

    function createBoard() {
        for(let i = 0; i < cardArray.length; i++) { //naudojame for ciklą, kad pereitume per visus mūsų blokus ir sukurtume nuotraukas.
            var card = document.createElement('img')
            card.setAttribute('src', '../img/leaves.png') //kiekvieną bloką nustatysime kaip elementą ir nustatysime atributą, nurodydami kelią iki viršelio foto
            card.setAttribute('data-id', i) //taip pat suteiksime kiekvienam blokui id, nuo 0 iki 11, nes turime 12 iš viso
            card.addEventListener('click', flipCard) //tada pridėsime eventListener, kad nustatytume ar blokas buvo paspaustas ir iškviesime flipCard funkciją kuri apvers mūsų bloką. 
            grid.appendChild(card) //galiausiai pridėsime kiekvieną bloką į mūsų HTML .grid klasės vidų.
        }
    }

    function flipCard() { // apverčiame bloką
        var cardId = this.getAttribute('data-id') // paimame bloko ID iš createBoard funkcijos 
        cardsChosen.push(cardArray[cardId].name) // naudadami push funkciją į cardsChosen masyvą įdedame blokus iš cardArray masyvo pagal jų cardID. Kai radome bloką masyve, paimame pavadinimą.
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img) // dabar mūsų apverčiamas blokas jau yra funkcijoje, todėl su this atributu mes parenkame foto pagal turimą cardID
        if (cardsChosen.length === 2) { // į cardsChosen masyve norime dėti tik du blokus, todėl su if patikriname ar masyve yra du ir tuo atveju iškviečiame checkForMatch funkciją. setTimeout prideda uždelsimą, kad viskas nevyktų pernelyg greitai. Patikrinimas ar yra sutapimas pasirinkimuose trunka 500 milisekundžių
            setTimeout(checkForMatch, 500)
        }
    }

    // tikriname ar sutampa pasirinkimai
    function checkForMatch() {
        var cards = document.querySelectorAll('img') // pasirenkame visus blokus, kurie buvo sukurti pirmoje funkcijoje
        const optionOneId = cardsChosenId[0] // Bloko esančio pirmąjame indekse cardsChosen viduje id pridedame į kintamąjį optionOneId
        const optionTwoId = cardsChosenId[1] // Bloko esančio antrąjame indekse cardsChosen viduje id pridedame į kintamąjį optionTwoId
        if (optionOneId == optionTwoId) { // Jei pasirinktas tas pats blokas, priskiriame apverstą foto ir duodame pranešimą
            cards[optionOneId].setAttribute('src', '../img/leaves.png')
            cards[optionTwoId].setAttribute('src', '../img/leaves.png')
            alert('Pasirinkai tą patį bloką!')
        } else if (cardsChosen[0] === cardsChosen[1]) { // Jei blokai sutampa, rodome pranešimą ir abiems blokams priskiriame blank foto. 
            alert('Teisingai!')
            cards[optionOneId].setAttribute('src', '../img/blank.png')
            cards[optionTwoId].setAttribute('src', '../img/blank.png')
            cards[optionOneId].style.pointerEvents =  'none'; // spaudžiant tą patį bloką nebėra klaidos
            cards[optionTwoId].style.pointerEvents =  'none';
            cardsWon.push(cardsChosen) // Į cardsWon masyvą dedame pasirinktus blokus
        } else { // Jei blokai nesutampa, norime apversti blokus, kad jie vėl būtų žaidime ir parodome pranešimą, kad blogas spėjimas
            cards[optionOneId].setAttribute('src', '../img/leaves.png')
            cards[optionTwoId].setAttribute('src', '../img/leaves.png')
            alert('Neatspėjai! Bandyk dar kartą!')
        }
        cardsChosen = [] // Nepriklausomai nuo to ar spėjimas buvo teisingas ar ne, norime pravalyti cardsChosen ir cardsChosenId masyvus, kad galėtume vėl apversti blokus.
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length // Norime išspausdinti atnaujintą rezultatą vartotojui. Pasirenkame span elementą result ir talpiname į resultDisplay (viršuje iškart po const grid sukuriame) 
        // Skaičiuojame kiek kartų dėjome kažką į vieną masyvą. Taigi vienas taškas už vieną teisingą atsakymą.
        if (cardsWon.length === cardArray.length/2) { // Jei cardsWon ilgis sutampa su puse blokų masyvo ilgio, tuomet žinome, kad suradome visus įmanomus blokus, todėl pranešame vartotojui apie tai
            resultDisplay.textContent = "Sveikiname! Atspėjai visus blokus!"
            if(confirm("Žaisi dar kartą?")) {
                document.location.href = ""
            } else {
                resultDisplay.textContent = "Iki kito karto!"
            }
        }
    }

    // panaudojame šią funkciją
    createBoard()

})