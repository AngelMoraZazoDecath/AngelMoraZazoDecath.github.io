import stickerApi from "@/api/stickerApi";

const getSticker = () => {

    const stickersArray = Array.from(Array(30))
    return stickersArray.map((_, index) => index + 1)

}

const getListStickers = async () => {

    const randomArray = getSticker().sort(() => Math.random() - 0.5)
    const stickers = await getStickerName(randomArray.splice(0, 4))
    console.log(stickers)

    return stickers

}

const getStickerName = async ([a, b, c, d] = randomArray) => {

    const promiseArray = [
        stickerApi.get(`/${a}`),
        stickerApi.get(`/${b}`),
        stickerApi.get(`/${c}`),
        stickerApi.get(`/${d}`)

    ]
    const [p1, p2, p3, p4] = await Promise.all(promiseArray).then()

    const arrayStrickers = [p2.data.name, p3.data.name, p4.data.name]
    if (!arrayStrickers.includes(p1.data.name)) {
        getListStickers();
    }

    return [
        { name: p1.data.name, id: p1.data.id, urlSticker: p1.data.urlSticker, pistaData: p1.data.pistaData },
        { name: p2.data.name, id: p2.data.id, urlSticker: p2.data.urlSticker, pistaData: p2.data.pistaData },
        { name: p3.data.name, id: p3.data.id, urlSticker: p3.data.urlSticker, pistaData: p3.data.pistaData },
        { name: p4.data.name, id: p4.data.id, urlSticker: p4.data.urlSticker, pistaData: p4.data.pistaData }
    ]


}

export default getListStickers
