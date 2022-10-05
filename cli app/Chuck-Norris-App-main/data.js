import axios from 'axios';

export function getCategories (url) {
    return new Promise(res => {
        res(axios.get(url));
    }    
)}

export function getJoke (url) {
    return new Promise(res => {
        res(axios.get(url));
    })
}