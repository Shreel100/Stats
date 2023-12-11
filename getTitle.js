require('dotenv').config()

const BASIC_AUTHORIZATION_HEADER = process.env.BASIC_AUTHORIZATION_HEADER
const INSTITUTION_NAME = process.env.INSTITUTION_NAME

let entries;

async function fetchTitle(){

    const apiEndpoint = `https://stats.figshare.com/${INSTITUTION_NAME}/top/views/article`
    const headers = {
        'Authorization': `Basic ${BASIC_AUTHORIZATION_HEADER}`,
        'Content-Type': 'application/json',
    };

    const response = await fetch(apiEndpoint, {headers})
    const data = await response.json()
    const keys = Object.keys(data.top)
    const values = Object.values(data.top)

    title_list = []

    for(let i=0; i<9; i++){

        const apiEndpoint_title = `https://api.figshare.com/v2/articles/${keys[i]}`
        const article_response = await fetch(apiEndpoint_title) 
        const article_response_json = await article_response.json()
        const title = article_response_json.title
        title_list.push(title)
    }
    console.log(title_list)
}

fetchTitle()