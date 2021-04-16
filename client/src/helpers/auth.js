import cookie from 'js-cookie'

// Set in Cookie
export const setCookie = (key, value) => {
    if (window !== 'undefiend') {
        cookie.set(key, value, {
            // 1 Day
            expires: 1
        }) 
    }
}

// remove from cookie
export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
};

// Get token from cookie
// send token when making request to server
export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key);
    }
};

// Set user info in localstorage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// Remove from localstorage
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

// Set cookie and localstorage during signin
export const authenticate = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN', response);
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};

// Access user info from localstorage
// {"_id":"607a0105e91ba50aa9e8f2ef","email":"lugepei1993@gmail.com","name":"Frank LU"}
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};

// clear localStorage and cookie when signout
export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};

// update localStorage when update user info
export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};