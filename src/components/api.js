import React from 'react';
import axios from "axios";

const Api = () => {
    async function fetchPosts() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        console.log(response.data)
        return (
            <button onClick={fetchPosts}>Get Posts</button>
        );
    };
};


export default Api;