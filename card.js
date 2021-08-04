/**
 * @param {Element} parent DOM element of parent
 * @param {BlogCardInfo} blogCardInfo 
 */
export function createCard(blogCardInfo) {
    const card = document.createElement('div')
    card.classList.add("p-card--highlighted", "col-4", "card")
    
    card.append(
        Object.assign(
            document.createElement('div'),{ classList: ["rectangle"] }
        ),
        Object.assign(
            document.createElement('h4'),
            {
                textContent: blogCardInfo.topic,
                classList: ["p-muted-heading"]
            }
        ),
        Object.assign(
            document.createElement('hr'), { classList: ["dotted"] }
        ),
        ImageElementWithLink(blogCardInfo.thumbnail, blogCardInfo.link),
        CardTitle(blogCardInfo.title, blogCardInfo.link),
        AuthorDateTag(blogCardInfo.author, blogCardInfo.authorLink, blogCardInfo.date),
        Object.assign(
            document.createElement('hr'), { classList: ["dotted"] }
        ),
        Object.assign(
            document.createElement('p'), { textContent: blogCardInfo.category }
        )
    )
    
    return card
}

function ImageElementWithLink(src, href){
    const imageLink = document.createElement('a')
    imageLink.href = href
    const thumbnail = document.createElement('img')
    thumbnail.src = src
    imageLink.append(thumbnail)
    return imageLink
}

function CardTitle(title, link){
    const titleElement = document.createElement('h3')
    const titleLink = document.createElement('a')
    titleLink.href = link
    titleLink.innerText = title
    titleElement.append(titleLink)
    titleElement.classList.add("p-card__title")
    return titleElement
}

function AuthorDateTag(author, linkToAuthor, date){
    const authorLink = document.createElement('a')
    authorLink.innerText = author
    authorLink.href = linkToAuthor
    
    const articleDate = new Date(date)
    const articleDateString =  
        articleDate.getDate() + ' ' + 
        articleDate.toLocaleString('default', { month: 'long', year: 'numeric'})
    
    const authorDate = document.createElement('i')
    authorDate.append("By ", authorLink, ` on ${articleDateString}`)
    authorDate.classList.add("p-card__content", "end")
    return authorDate
}