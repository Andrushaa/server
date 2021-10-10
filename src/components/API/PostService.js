import axios from "axios";
//axios - библиотека, чтобы делать запросы к серверу

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/comments')
            return response.data;
        } catch (e) {
            console.log(e);
        }

    }
}
