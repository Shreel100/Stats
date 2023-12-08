async function fetchTitle(){

    const apiEndpoint = 'https://api.figshare.com/v2/articles/14652537'

    const response = await fetch(apiEndpoint)
    const data = await response.json()
    const title = await data.title
    console.log(title)
}

// async function fetchData_Countries() {

//     const apiEndpoint_countries = 'https://stats.figshare.com/ryerson/breakdown/year/views/group/35541?start_date=2022-05-01&end_date=2023-10-31';
//     const headers = {
//         'Authorization': 'Basic #############',
//         'Content-Type': 'application/json',
//     };

//     try {
//         const response = await fetch(apiEndpoint_countries, { headers });
//         const data = await response.json();
//         const result = await data.breakdown;

//         // Extract country names and total values
//         const countriesData = Object.entries(result).map(([year, countries]) => {
//             const countriesData = Object.entries(countries).map(([country, data]) => ({
//                 country,
//                 total: data.total
//             }));
//             return { year, countries: countriesData };
//         });

//         console.log(countriesData);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// fetchData_Countries();

async function fetchData_Countries() {
    const apiURL = 'https://stats.figshare.com/ryerson/breakdown/total/views/group/35541?start_date=2023-05-01&end_date=2023-10-31'
    const headers = {
    'Authorization': 'Basic #############',
    'Content-Type': 'application/json',
    };
    try{
        const response = await fetch(apiURL,{headers})
        const result = await response.json()
        const res = result.breakdown.total
        // console.log(res)

        const countriesData = Object.entries(res)

        const final = countriesData.reduce((final_arr, [country, countryData]) =>{
            final_arr[country] = countryData.total;
            return final_arr
        },{})

        const dataArray = Object.entries(final);
        let arr = []
        for(let i=0; i<9; i++){
            arr.push(dataArray[i])
        }

        console.log(arr[0])
    } catch(error) {
        console.error('Error fetching data:', error);
    }

}

fetchData_Countries()