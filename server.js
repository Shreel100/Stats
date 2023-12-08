const express = require('express');
const cors = require('cors');
const getDate = require('./getDate')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(cors());

app.use('/', async (req, res) => {
    
    var xlabels = getDate();

    try{
        const apiEndpoint_downloads = `https://stats.figshare.com/ryerson/timeline/month/downloads/group/35541?start_date=${xlabels[0]}-01&end_date=${xlabels[5]}-31`;
        const apiEndpoint_views = `https://stats.figshare.com/ryerson/timeline/month/views/group/35541?start_date=${xlabels[0]}-01&end_date=${xlabels[5]}-31`;
        const headers = {
            'Authorization': 'Basic #############',
            'Content-Type': 'application/json',
        };
        const responseViews = await fetch(apiEndpoint_views, { headers });
        const dataViews = await responseViews.json();
        const views = Object.values(dataViews.timeline);

        const responseDownloads = await fetch(apiEndpoint_downloads, { headers });
        const dataDownloads = await responseDownloads.json();
        const downloads = Object.values(dataDownloads.timeline);

        res.json({ views, downloads, xlabels });
    }catch(error) {
        console.error('Error during API request:', error);
        res.status(500).send('Internal Server Error');
    }

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

