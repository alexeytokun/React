import {SERVER_URL} from "./constants";
import axios from "axios/index";

export function updateLots(props) {
    axios.get(SERVER_URL + 'lots')
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
            props.saveError(err);
        });
}

export function filterLots(lots, filter) {
    if (!lots || !filter) return;
    const unsortedLots = [...lots];

    let sortedLots;

    switch (filter) {
        case 1:
            return unsortedLots;
        case 2:
            return sortedLots = unsortedLots.sort(
                (a,b) => a.lot_name > b.lot_name
            );
        case 3:
            return sortedLots = unsortedLots.sort(
                (a,b) => a.price - b.price
            );
        case 4:
            return sortedLots = unsortedLots.sort(
                (a,b) => b.price - a.price
            );
        case 5:
            console.log(unsortedLots);
            return sortedLots = unsortedLots.sort(
                (a,b) => new Date(a.start_time) - new Date(b.start_time)
            );
        case 6:
            console.log(unsortedLots);
            return sortedLots = unsortedLots.sort(
                (a,b) => new Date(a.end_time) - new Date(b.end_time)
            );
        default:
            return
    }
}

