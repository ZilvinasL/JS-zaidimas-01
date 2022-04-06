document.addEventListener('DOMContentLoaded', () => {
  

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

   
    cardArray.sort(() => 0.5 - Math.random())

  
    const grid = document.querySelector('.grid')

  
    const resultDisplay = document.querySelector('#result')
    
   
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = [] 

    function createBoard() {
        for(let i = 0; i < cardArray.length; i++) { 
            var card = document.createElement('img')
            card.setAttribute('src', '../img/leaves.png') 
            card.setAttribute('data-id', i) 
            card.addEventListener('click', flipCard) 
            grid.appendChild(card) 
        }
    }

    function flipCard() {
        var cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name) 
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img) 
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }

    
    function checkForMatch() {
        var cards = document.querySelectorAll('img') 
        const optionOneId = cardsChosenId[0] 
        const optionTwoId = cardsChosenId[1] 
        if (optionOneId == optionTwoId) { 
            cards[optionOneId].setAttribute('src', '../img/leaves.png')
            cards[optionTwoId].setAttribute('src', '../img/leaves.png')
            alert('Pasirinkai tą patį bloką!')
        } else if (cardsChosen[0] === cardsChosen[1]) { 
            alert('Teisingai!')
            cards[optionOneId].setAttribute('src', '../img/blank.png')
            cards[optionTwoId].setAttribute('src', '../img/blank.png')
            cards[optionOneId].style.pointerEvents =  'none'; 
            cards[optionTwoId].style.pointerEvents =  'none';
            cardsWon.push(cardsChosen) 
        } else { 
            cards[optionOneId].setAttribute('src', '../img/leaves.png')
            cards[optionTwoId].setAttribute('src', '../img/leaves.png')
            alert('Neatspėjai! Bandyk dar kartą!')
        }
        cardsChosen = [] 
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length 
        
        if (cardsWon.length === cardArray.length/2) { 
            resultDisplay.textContent = "Sveikiname! Atspėjai visus blokus!"
            if(confirm("Žaisi dar kartą?")) {
                document.location.href = ""
            } else {
                resultDisplay.textContent = "Iki kito karto!"
            }
        }
    }

    createBoard()

})
