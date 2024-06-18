import { sendRequestWithToken, ACCOUNT_URL, PROFILE_URL } from './commonService';

export async function GetUser(){
    var user = await sendRequestWithToken(ACCOUNT_URL, 'GET');
    return user;
}

export async function updateUser(user){
    user.photo = user.photo.toString();
    var newUser = await sendRequestWithToken(ACCOUNT_URL, 'PATCH', user);
    window.location.href = PROFILE_URL;
    return newUser;
}

