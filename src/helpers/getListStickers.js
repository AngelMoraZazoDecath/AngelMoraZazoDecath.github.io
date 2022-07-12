import stickerApi from "@/api/stickerApi";

const getSticker = () => {

    const stickersArray = Array.from(Array(20))
    return stickersArray.map((_, index) => index + 1)

}

const getListStickers = async () => {

    const randomArray = getSticker().sort(() => Math.random() - 0.5)
    const stickers = await getStickerName(randomArray.splice(0, 3))
    console.log(stickers)

    return stickers

}

const getStickerName = async ([a, b, c] = randomArray) => {

    const promiseArray = [
        stickerApi.get(`/${a}`),
        stickerApi.get(`/${b}`),
        stickerApi.get(`/${c}`)

    ]
    const [p1, p2, p3] = await Promise.all(promiseArray).then()
    return [
        { name: p1.data.name, id: p1.data.id, urlSticker: p1.data.urlSticker },
        { name: p2.data.name, id: p2.data.id, urlSticker: p2.data.urlSticker },
        { name: p3.data.name, id: p3.data.id, urlSticker: p3.data.urlSticker }
    ]


}

export default getListStickers