let body = document.querySelector('body')
let allStoriesDiv = document.querySelector('#allStoriesWrapper')
let baseUrl = 'https://hacker-news.firebaseio.com/v0/'
let allStoriesUrl = 'topstories.json?print=pretty'
let storyCount = document.querySelector('#story_count')
console.log(storyCount.value)

storyCount.addEventListener('change', () => {
    console.log(storyCount.value)
    allStoriesDiv.remove()
    allStoriesDiv = document.createElement('div')
    allStoriesDiv.setAttribute('id', 'allStoriesWrapper')
    body.appendChild(allStoriesDiv)
    topstories(storyCount.value)
})

let topstories = async (limit) => {
    let res = await (fetch(baseUrl + allStoriesUrl))

    let data = await res.json()
    // console.log(data)
    for(let i = 0; i < limit; i++){
        let res2 = await (fetch(`${baseUrl}item/${data[i]}.json?print=pretty`))
        let story = await res2.json()
        let storyDiv = document.createElement('div')
        let row = document.createElement('div')
        let col = document.createElement('div')
        storyDiv.setAttribute('class', 'container-fluid')
        row.setAttribute('class', 'row justify-content-center text-center m-1')
        col.setAttribute('class', 'col-md-6 shadow-lg bg-light bg-gradient rounded')
        let storyTitle = document.createElement('p')
        let rank = document.createElement('p')
        let author = document.createElement('p')
        author.setAttribute('id', 'author')
        let score = document.createElement('p')
        score.setAttribute('id', 'score')
        storyTitle.innerHTML = `<a href=${story.url} id='title'>${story.title}</a>`
        rank.innerText = `Ranked: #${i + 1}`
        author.innerText = `Author: ${story.by}`
        score.innerText = `Score: ${story.score}`
        // console.log(story)
        col.appendChild(rank)
        col.appendChild(storyTitle)
        col.appendChild(author)
        col.appendChild(score)
        row.append(col)
        storyDiv.appendChild(row)
        allStoriesDiv.appendChild(storyDiv)
    }
}

topstories(storyCount.value)
