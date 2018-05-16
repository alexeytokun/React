import {SERVER_URL} from "./constants";
import axios from "axios/index";

export function updateLots(props) {
    axios.get(SERVER_URL + 'lots',
        {
            headers: { "User-Auth-Token": localStorage.getItem('jwt')}
        })
        .then(res => {
            let response = res.data;
            let sortedLots = [];
            for (let i = 0; i < response.categories.length; i++) {
                let filtered = response.lots.filter(lot => lot.category_id === response.categories[i].category_id);
                sortedLots.push(filtered);
            }
            props.saveLotsAndCategories({lots: response.lots, categories: response.categories, sortedLots: sortedLots});
        })
        .catch((err) => {
            const errorMessage = err.response ? err.response.data && err.response.data.message : err.message;
            props.saveError(errorMessage);
        });
}