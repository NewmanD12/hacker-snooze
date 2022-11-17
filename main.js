let allStoriesDiv = document.querySelector('#allStoriesWrapper')
let baseUrl = 'https://hacker-news.firebaseio.com/v0/'
let allStoriesUrl = 'topstories.json?print=pretty'

let topstories = async () => {
    let res = await (fetch(baseUrl + allStoriesUrl))

    let data = await res.json()
    // console.log(data)
    for(let i = 0; i < 20; i++){
        let res2 = await (fetch(`${baseUrl}item/${data[i]}.json?print=pretty`))
        let story = await res2.json()
        let storyDiv = document.createElement('div')
        let storyTitle = document.createElement('p')
        let rank = document.createElement('p')
        let author = document.createElement('p')
        let score = document.createElement('p')
        storyTitle.innerHTML = `<a href=${story.url} id='title'>${story.title}</a>`
        rank.innerText = `Ranked: #${i + 1}`
        author.innerText = `Author: ${story.by}`
        score.innerText = `Score: ${story.score}`
        console.log(story)
        storyDiv.appendChild(rank)
        storyDiv.appendChild(storyTitle)
        storyDiv.appendChild(author)
        storyDiv.appendChild(score)
        allStoriesDiv.appendChild(storyDiv)


    }
}

topstories()
