import axios from "axios";
//axios - библиотека, чтобы делать запросы к серверу

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments', {
            params: {
                _limit: limit,
                _page: page
            }
        })
        return response;
    }
}
