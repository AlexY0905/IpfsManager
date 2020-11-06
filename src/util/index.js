//在浏览器缓存用户信息
export const setUsername = (username) => {
    window.localStorage.setItem("username", username)
};
export const getUsername = () => {
    return window.localStorage.getItem("username")
};
export const removeUsername = () => {
    return window.localStorage.removeItem("username")
}; 