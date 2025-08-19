export const imageUrl = (id) => process.env.VUE_APP_PROTOCOL +
    process.env.VUE_APP_HOST +
    ":" + process.env.VUE_APP_PORT + `/page-image/${id}`

export async function recent(){
    const url = process.env.VUE_APP_PROTOCOL +
        process.env.VUE_APP_HOST +
        ":" + process.env.VUE_APP_PORT +'/api/recent';
    console.log(url);
    const r = await fetch(url, {method:'GET', headers: {'Access-Control-Allow-Origin': '*'}});
    return r.json();
}
export async function documentList(){
    const url = process.env.VUE_APP_PROTOCOL +
        process.env.VUE_APP_HOST +
        ":" + process.env.VUE_APP_PORT +'/api/list/documents';
    console.log(url);
    const r = await fetch(url, {method:'GET', headers: {'Access-Control-Allow-Origin': '*'}});
    return r.json();
}

export async function search(q){
    const url = process.env.VUE_APP_PROTOCOL +
        process.env.VUE_APP_HOST +
        ":" + process.env.VUE_APP_PORT +'/api/search?q=' + encodeURIComponent(q);
    console.log(url);
    const r = await fetch(url, {headers: {'Access-Control-Allow-Origin': '*'}});
    return r.json();
}

export async function pageDetail(id){
    const url = process.env.VUE_APP_PROTOCOL +
        process.env.VUE_APP_HOST +
        ":" + process.env.VUE_APP_PORT +'/api/page/';
    console.log(url);
    const r = await fetch(url + id, {headers: {'Access-Control-Allow-Origin': '*'}});
    return r.json();
}

export async function uploadPdf(file){
    const fd = new FormData();
    fd.append('pdf', file);
    const url = process.env.VUE_APP_PROTOCOL +
        process.env.VUE_APP_HOST +
        ":" + process.env.VUE_APP_PORT +'/api/upload';
    console.log(url);
    const r = await fetch(url, { method:'POST', headers: {'Access-Control-Allow-Origin': '*'}, body: fd});
    return r.json();
}