export default async function callUrl(url, method, accessToken, body = null) {
    let result = [];
    let error = "";

    // Not a good practice to send auth tokens without https, but this is only meant as a local project 
    const response = await fetch(url,
        {
            method: method,
            mode: 'cors', // no-cors,
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
                
            },
            body: body
        });

    if (response.ok) {
        result = await response.json();
    } else {
        error = response.status + " " + response.statusText;
    }

    return {
        result: result,
        error: error
    }
}