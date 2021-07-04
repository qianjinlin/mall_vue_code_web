import axios from 'axios';
import QS from 'qs';

axios.interceptors.request.use((configure) => {
    if (configure.method === 'post') {
        configure.data = QS.stringify(configure.data);
    }
    return configure;
}, (error) => {
    console.info("request error", error);
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.info('response error', error);
    return Promise.reject(error);
});

export default axios;

