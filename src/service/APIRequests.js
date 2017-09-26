import axios from 'axios';

var api = axios.create({
    baseURL: 'http://sehati-project.net/assets/connection',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});

function getFaq() {
    return api.post('/get_faq.php').then(function (response) {
        return response;
    }).catch (function (error) {
        return error;
    })
}

export {getFaq};
