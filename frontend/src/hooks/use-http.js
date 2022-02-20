import React, {useState, useCallback} from 'react';
import axios from 'axios';

const useHttp = (requestConfig, callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const sendRequest = async () =>{
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                requestConfig.url, 
                {
                    method: requestConfig.method ?  requestConfig.method : null ,
                    headers: requestConfig.headers ? requestConfig.headers : {} ,
                    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
                }
            );
            
            console.log(response.data.locations)

            if(response.status !== 200){ throw new Error('Request failed') }

            callback(response.data.locations);
            setIsLoading(false);
        }
        catch (err) { setError(err.message || 'Something went wrong'); }
    };

    return {isLoading, error, sendRequest,}
};

export default useHttp;