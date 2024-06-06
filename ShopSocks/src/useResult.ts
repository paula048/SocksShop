import React, { useState, useEffect } from "react";
import { Double } from "react-native/Libraries/Types/CodegenTypes";



const config = require('./config'); 

export type ResultJson = {
    id: string,
    category: string,
    color: string,
    brand: string,
    image: string,
    price: Double

}

type FetchResultsHookResult = {
    error: boolean,
    loading: boolean,
    jsonResponse: ResultJson[] | undefined;
}

const useResult = (): FetchResultsHookResult => {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [jsonResponse, setJsonResponse] = useState<ResultJson[] | undefined>(undefined);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {


            const url = `http://${config.localhost}:3000`;
  
            

            console.log("START connect Server^^^^^^^^^^^^");
            const response = await fetch(url);
            
            console.log("------------");
            console.log(response);
            console.log("------------");
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const json = await response.json();
            
            console.log("============");
            console.log(json);
            console.log("============");
            
            setJsonResponse(json);
        } catch (error) {
            console.error("Error occurred during fetch:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }
    
    return { error, loading, jsonResponse };
    
}




export default useResult;


