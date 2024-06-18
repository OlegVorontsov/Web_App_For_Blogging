import { sendRequestWithToken, ACCOUNT_URL } from './commonService';

export async function GetUser(){
    var user = await sendRequestWithToken(ACCOUNT_URL, 'GET');
    return user;
}

export async function UpdateUser(){
    var newUser = await sendRequestWithToken(ACCOUNT_URL, 'PATCH', user);
    return newUser;
}

