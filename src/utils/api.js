const API_ROUTE = import.meta.env.API_ROUTE;


export default async function (route, body = {}, method = 'GET') {

    return await fetch(API_ROUTE + route, {
        body: JSON.stringify(body),
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.error(err));
    
}