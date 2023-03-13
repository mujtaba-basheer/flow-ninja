// https://boards-api.greenhouse.io/v1/boards/klaratechnologies/embed/jobs
// job test collection id 6378c7a9faa87462f0e1661a


// Test Site API KEY: 9436eb4555946be81f361da13b6f8bc114a79d87752dd8af1fc60662673f8688

const testToken = '9436eb4555946be81f361da13b6f8bc114a79d87752dd8af1fc60662673f8688';
const testCollectionId = '63989083499fb209ceb2dc57';


const api_url = 'https://boards-api.greenhouse.io/v1/boards/klaratechnologies/jobs';



const fetch = require('node-fetch');


function getApiData() {
    const response = fetch(api_url)
    const data = response.json()

    return data;
}

const deleteOptions = {
    method: 'DELETE',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${testToken}`
    }
};

async function deleteItem(itemId) {
    const response = await fetch(`https://api.webflow.com/collections/${testCollectionId}/items/${itemId}?live=false`, deleteOptions)
    const res = await response.json();

    return res;
}

const getOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${testToken}`
    }
};

async function getCmsItems() {
    const response = await fetch(`https://api.webflow.com/collections/${testCollectionId}/items`, getOptions)
    const res = await response.json();
    return res;
}

async function createItem(item) {
    let postOptions = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: `Bearer ${testToken}`
        },
        body: JSON.stringify({
            fields: {
                slug: `${item.id}`,
                name: `${item.title}`,
                _archived: false,
                _draft: false,
                location: item.location.name,
                'url-absolute': item.absolute_url
            }
        })
    };

    await fetch(`https://api.webflow.com/collections/${testCollectionId}/items`, postOptions)
        .then(response => response.json())
        .catch(err => console.error(err));
}

getCmsItems()
    .then(res => {
        res.items.forEach((job, index) => {
            setTimeout(function () {
                deleteItem(job._id)
            }, 500 * index)
        })
        return res.items.length;
    })
    // .then(function (waitingTime) {
    //     setTimeout(function () {
    //         getApiData().then(
    //             data => {
    //                 data.jobs.forEach((job,index) => {
    //                     setTimeout(function() {
    //                         createItem(job);
    //                     }, 500 * index)
    //                 })
    //             })
    //     }, (waitingTime + 1) * 500)
    // })