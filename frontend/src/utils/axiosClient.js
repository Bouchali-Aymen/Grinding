const {default:axios} = require("axios");


const apiURL = "http://localhost:1337/api";
const apiKey = process.env.REST_API_KEY;


const axiosClient = axios.create({
    baseURL:apiURL,
    headers:{
        Authorization: ` Bearer  363d651bccd3bc2981b482e19ab73f76d25813dd450055602fdd0bac47d10889ec247fb61036fa91e64d4ed843a3d4542d642829338955fad01cdc40177d3f327b3fd256c0e43616b65bcc699517195d8b58de7777585f51c768f7ba221c96c50694adda8d6affa1300a41de5dc51a94701052d016b228f411afc2006b7ee6a8`
    }
})


export default axiosClient