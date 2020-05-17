import Axios from "axios";

const authToken = token => {
    if (token) {
        Axios.defaults.headers.common['Authorization'] = token;
    } else {
        Axios.defaults.headers.common['Authorization'] = '';
    }
}

export default authToken