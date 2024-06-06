import React, { useState, useEffect } from "react";

const config = require('./config'); 

const useSizesUPDATE = async (sock_id: string, size: string, quantity: string) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `http://${config.localhost}:3000/sizes`);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    const body = JSON.stringify({
        sock_id: sock_id,
        size: size,
        quantity: quantity
    });

    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("User updated successfully");
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

export default useSizesUPDATE;
