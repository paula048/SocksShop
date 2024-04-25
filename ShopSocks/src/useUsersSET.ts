import React, { useState, useEffect } from "react";

// export type ResultJson = {
//     id: string,
//     name: string,
//     surname: string,
//     password: string
// }

// type FetchResultsHookResult = {
//     error: boolean,
//     loading: boolean,
//     jsonResponse: ResultJson[] | undefined;
// }

const useUsersSET = async (name: string, surname: string, email: string, password: string) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://192.168.164.84:3000/users");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    const body = JSON.stringify({
        name: name,
        surname: surname,
        email: email,
        password: password
    });

    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Obsługa sukcesu
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };

    xhr.onerror = () => {
        console.log("Request failed");
    };

    try {
        xhr.send(body);
    } catch (error) {
        console.log("An error occurred:", error);
    }
}

export default useUsersSET;

