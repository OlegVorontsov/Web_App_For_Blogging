const ACCOUNT_URL = "account";
const USERS_URL = "users";
const NEWS_URL = "news";

const BASE_URL = "login";

function sendRequest(url, successAction, errorAction) {
    fetch(url)
    .then(response => {
        if (response.status === 401) {
            window.location.href = BASE_URL;
        }
        else{
            successAction();
        }
    })
    .catch(error => {
        errorAction();
    });
}

export async function getToken(login, password){
    const url = ACCOUNT_URL + '/token';
    const token = sendAuthenticatedRequest(url, 'POST', login, password);
    console.log(token);
}

function sendAuthenticatedRequest(url, method, username, password, data) {
    const headers = new Headers();
    headers.set('Authorization', 'Basic' + btoa(username + ':' + password));

    if(data) {
        headers.set('Content-Type', 'application/json');
    }

    var requestOptions = {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : undefined
    }

    return fetch(url, requestOptions)
    .then(function(response) {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Ошибка', response.status + ':' + response.statusText);
        }
    });
}

