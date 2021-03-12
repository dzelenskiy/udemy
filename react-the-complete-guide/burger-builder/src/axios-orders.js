import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dz-reactcompguide-myburger-default-rtdb.firebaseio.com/'
});

export default instance;