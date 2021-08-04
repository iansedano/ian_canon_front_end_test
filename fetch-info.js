/**
 * @typedef {Object} BlogCardInfo
 * @property {String} date
 * @property {String} link
 * @property {String} thumbnail
 * @property {String} title
 * @property {String} author
 * @property {String} authorLink
 * @property {String} category
 * @property {String} topic
 */

/**
 * @returns {BlogCardInfo[]}
 */
export async function fetchBlogInfo(){
    let resp
    try {
        resp = await fetch(
            "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json"
        )
    } catch (e) {
        console.log(e)
        throw "someting went wrong with the request"
    }
    const json = await resp.json()
    
    return filterBlogData(json)
}

/**
 * @param {Object} data - the json response
 * @returns {BlogCardInfo}
 */
function filterBlogData(data) {
    return data.map(item => {
        
        // Search for category and topic
        let category, topic;
        // The try catch block is used here to break out of the forEach once
        // the terms have been found, reducing the change of them being
        // overwritten.
        try {
            item._embedded["wp:term"].forEach(termArray => {
                termArray.forEach(term => {
                    if (term.taxonomy === "category") {
                        category = term.name
                    } else if (term.taxonomy === "topic") {
                        topic = term.name
                    }
                    
                    if (category && topic) throw "category and topic found"
                })
            })
        } catch (e) {console.log(e)} 
        
        if (!topic) {
            console.log("topic not found, searching for post_tag instead")
            item._embedded["wp:term"].forEach(termArray => {
                termArray.forEach(term => {
                    if (term.taxonomy === "post_tag") {
                        topic = term.name
                    }
                })
            })
            if (!topic) {
                throw "No post_tag found!"
            } else console.log("post_tag found")
        }
        
        const singularizeDict = {
            "Articles" : "Article"
            // ... To be filled with other categories...
        }
        
        if (singularizeDict.hasOwnProperty(category)) {
            category = singularizeDict[category]
        }
        
        return {
            "date": item.date,
            "link": item.link,
            "thumbnail": item.featured_media,
            "title": item.title.rendered,
            "author": item._embedded.author[0].name,
            "authorLink": item._embedded.author[0].link,
            "category": category,
            "topic": topic,
        }
    })
}