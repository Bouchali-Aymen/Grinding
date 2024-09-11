const { default: axiosClient } = require("./axiosClient");

const addToCart = (data) => axiosClient.post("/carts",data)

const getCartProducts = (email) => axiosClient.get(`/carts?populate[products][populate]=image&filters[email][$eq]=${email}`)

const removeFromCart = (id) => axiosClient.delete(`/carts/${id}`)

export default {
    addToCart,
    getCartProducts,
    removeFromCart
}