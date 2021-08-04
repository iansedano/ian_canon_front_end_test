import { fetchBlogInfo } from './fetch-info.js'
import { createCard } from './card.js'


async function main() {
    const cards = await fetchBlogInfo()
    
    console.log(cards)
    
    const cardContainer = document.getElementById('card-container')
    
    // This while loop is to handle more than 3 cards
    // 3 cards per row
    let i = 0;
    while (i < cards.length) {
        const row = document.createElement('div')
        row.classList.add('row')
        
        let cardCount = 0
        while (cardCount !== 3 && i < cards.length) {
            row.append(createCard(cards[i]))
            cardCount ++
            i ++
        }
        cardContainer.append(row)
    }
}

main()





