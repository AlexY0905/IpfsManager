//在浏览器缓存用户信息
export const setUsername = (username) => {
    window.localStorage.setItem("lotusUsername", username)
};
export const getUsername = () => {
    return window.localStorage.getItem("lotusUsername")
};
export const removeUsername = () => {
    return window.localStorage.removeItem("lotusUsername")
}; 