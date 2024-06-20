import { sendRequestWithToken, ACCOUNT_URL, PROFILE_URL, LOGIN_URL, USERS_URL } from './commonService';

export async function GetUser(){
    var user = await sendRequestWithToken(ACCOUNT_URL, 'GET');
    return user;
}

export async function GetPublicUser(userId){
    var user = await sendRequestWithToken(`${USERS_URL}/${userId}`, 'GET');
    return user;
}

export async function updateUser(user){
    user.photo = user.photo.toString();
    var newUser = await sendRequestWithToken(ACCOUNT_URL, 'PATCH', user);
    window.location.href = PROFILE_URL;
    return newUser;
}

export async function createUser(user){
    user.photo = user.photo.toString();
    var newUser = await sendRequestWithToken(ACCOUNT_URL, 'POST', user, false);
    window.location.href = LOGIN_URL;
    return newUser;
}

export function exitFromProfile(){
    const userAnswer = window.confirm("Are you sure?");
    if(userAnswer){
        localStorage.clear();
        window.location.href = LOGIN_URL;
    }
}

