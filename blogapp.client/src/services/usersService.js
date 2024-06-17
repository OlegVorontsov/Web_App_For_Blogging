import { sendRequestWithToken, ACCOUNT_URL } from './commonService';

export async function GetUser(){
    var user = await sendRequestWithToken(ACCOUNT_URL, 'GET');
    return user;
}

