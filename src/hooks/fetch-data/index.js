import axios from 'axios';

export default (meal) => axios(`https://api.punkapi.com/v2/beers?food=${meal}`, {
        timeout: 10000,
        headers: {
        'Cache-Control': 'no-cache',
        },
    })
    .then(response => {
        if(response.status === 200)  {
            return response.data;
        }
        
        return Promise.reject(`Error fetching data: ${response.statusText}`);
    })
    .then(json => json.map(row => ({
            name: row.name,
            description: row.description,
            firstBrewed: row.first_brewed,
        }))
    )
    .catch(err => Promise.reject(err.message))
;  
