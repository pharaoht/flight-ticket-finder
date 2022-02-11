import React, {useState, useCallback} from 'react';
import axios from 'axios';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, callback) =>{
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                requestConfig.url, 
                {
                    method: requestConfig.method,
                    headers: requestConfig.headers,
                    body: JSON.stringify(requestConfig.body)
                }
            );

            if(!response.ok){
                throw new Error('Request failed');
            }

            const data = await response.json();

            callback(data);
        }
        catch (error) {
            setError(err.message || 'Something went wrong');
        }

        return {isLoading, error, sendRequest,}

    },[]);
};

export default useHttp;