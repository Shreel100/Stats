require('dotenv').config()

const BASIC_AUTHORIZATION_HEADER = process.env.BASIC_AUTHORIZATION_HEADER
const INSTITUTION_NAME = process.env.INSTITUTION_NAME

async function fetchTitle(){

    const apiEndpoint_title = `https://stats.figshare.com/${INSTITUTION_NAME}/top/views/article`
    const headers = {
        'Authorization': `Basic ${BASIC_AUTHORIZATION_HEADER}`,
        'Content-Type': 'application/json',
    };

    const response = await fetch(apiEndpoint_title, {headers})
    const data = await response.json()
    const data_top = data.top

    const entries = Object.entries(data_top);
    
    // Sort the array based on values in descending order
    const sortedEntries = entries.sort((a, b) => b[1] - a[1]);

    const values = []

    for (let i=0; i<10; i++){
        values.push(sortedEntries[i][1])
    }

    title_list = []

    for(let i=0; i<10; i++){

        const apiEndpoint_title = `https://api.figshare.com/v2/articles/${sortedEntries[i][0]}`
        const article_response = await fetch(apiEndpoint_title) 
        const article_response_json = await article_response.json()
        const title = article_response_json.title
        title_list.push(title)
    }

    let zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);
    array = zip(title_list, values)
    for (let i=0;i<10;i++){
        console.log(`'${array[i][0]}': '${array[i][1]}'`)
    }
}

fetchTitle()