import axios from "axios";

const stickerApi = axios.create({
    baseURL: 'https://my-json-server.typicode.com/AngelMoraZazoDecath/AngelMoraZazoDecath.github.io/stickers',
    timeout: 3000
})

export default stickerApi