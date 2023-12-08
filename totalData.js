async function totalData(){

    const apiEndpoint_views =  'https://stats.figshare.com/ryerson/timeline/year/views/group/35541?start_date=2023-05-01&end_date=2023-10-31'
    const apiEndpoint_downloads =  'https://stats.figshare.com/ryerson/timeline/year/downloads/group/35541?start_date=2023-05-01&end_date=2023-10-31'
    const headers = {
        'Authorization': 'Basic #############',
        'Content-Type': 'application/json',
    };
    
    // fetch views over last 6 months 
    const responseViews = await fetch(apiEndpoint_views, {headers})
    const dataViews = await responseViews.json()
    const resultViews = await dataViews.timeline

    // fetch downloads over last 6 months
    const responseDownloads = await fetch(apiEndpoint_downloads, {headers})
    const dataDownloads = await responseDownloads.json()
    const resultDownloads = await dataDownloads.timeline

    // Calculate total views and downloads over 6 months
    const downloads = Object.values(resultDownloads).reduce((acc, value) => acc + value, 0);
    const views = Object.values(resultViews).reduce((acc, value) => acc + value, 0);

    console.log('Views:',views)
    console.log('Downloads:',downloads);

}

totalData()

module.exports = totalData;