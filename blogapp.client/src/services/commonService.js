export const ACCOUNT_URL = 'account';
export const USERS_URL = 'users';
export const NEWS_URL = '/news';

const BASE_URL = 'login';
const TOKEN_NAME = 'Token';
const ISONLINE_NAME = 'Online';
export const SIGNUP_URL = '/signup';
export const LOGIN_URL = '/login';
export const PROFILE_URL = '/profile';

export async function getToken(login, password){
    const url = ACCOUNT_URL + '/token';
    const token = await sendAuthenticatedRequest(url, 'POST', login, password);
    localStorage.setItem(TOKEN_NAME, token.accessToken);
    localStorage.setItem(ISONLINE_NAME, '1');
    window.location.href = PROFILE_URL;
}

async function sendAuthenticatedRequest(url, method, username, password, data) {
    const headers = new Headers();
    headers.set('Authorization', 'Basic' + btoa(username + ':' + password));

    if(data) {
        headers.set('Content-Type', 'application/json');
    }

    var requestOptions = {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : undefined
    };

    var fetchResult = await fetch(url, requestOptions);

    if(fetchResult.ok)
        {
            try{
                const result = await fetchResult.json();
                return result;
            }
            catch{
                return;
            }
        }
    else
        {
            errorRequest(fetchResult.status);
        }
}

export async function sendRequestWithToken(url, method, data, withToken = true) {
    const headers = new Headers();

    if(withToken){
        const token = localStorage.getItem(TOKEN_NAME);
        headers.set('Authorization', `Bearer ${token}`);
    }

    if(data) {
        headers.set('Content-Type', 'application/json');
    }

    var requestOptions = {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : undefined
    };

    var fetchResult = await fetch(url, requestOptions);

    if(fetchResult.ok)
        {
            const result = await fetchResult.json();
            return result;
        }
    else
        {
            errorRequest(fetchResult.status);
        }
}

function errorRequest(status){
    if(status === 401) {
        window.location.href = BASE_URL;
        cleareStorage();
    }
}

export function cleareStorage(){
    localStorage.clear();
}

export function isUserOnline(){
    if(localStorage.getItem(ISONLINE_NAME === '1')){
        return true;
    }
    return false;
}

