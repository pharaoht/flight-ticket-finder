import axios from 'axios';

//Will go and refact once project is completed, any methods used more than once will go in here 
export const locationAPIRequest = async (location, val) => {

    if (location === '') {
        return [];
    };

    const url_1 = 'https://tequila-api.kiwi.com/locations/query?term=';
    const url_2 = '&locale=en-US&location_types=airport&limit=10&active_only=true';

    const config = {
        headers: {
            "accept": "application/json",
            "apikey": "SLxN9_Q0EiAp-Lr7hLb-efLH7T1bIlOd"
        }
    };

    let loco = await axios.get(`${url_1}${location}${url_2}`, config);

    try {

        return loco.data.locations

    }
    catch (err) {
        console.log(err)
        throw new Error(err)
    }

};