export function changeLocation(location) {
    return {
        type: 'LOCATION_CHANGE',
        payload: location
    };
}