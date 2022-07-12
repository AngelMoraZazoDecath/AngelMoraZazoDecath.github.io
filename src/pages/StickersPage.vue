<template>
    <div>
        <div v-if="!sticker">
            <h1>Espere por favor...</h1>
        </div>
        <div v-else>
            <h1>¿De quien es este sticker?</h1>
            <StickerImage :stickerId="sticker.id" :showSticker="showStickers" :imagen="sticker.urlSticker" />
            <StickerList :stickers="stickersArray" @selection="checkAnswer($event)" />
            <template v-if="respuesta">
                <h1>{{respuesta}}</h1>
                <button id="botonNewgame" @click="newGame()">New Game</button>
                
                <h1 id="vidas">Vidas {{aciertos}} </h1>
                
            </template>
        </div>
    </div>

</template>

<script>
import StickerImage from '../components/StickerImage.vue'
import StickerList from '../components/StickerList.vue'
import getListStickers from '@/helpers/getListStickers'


export default {
    components:{
        StickerImage,
        StickerList
    },
    data(){
        return{
stickersArray:[],
sticker: null,
showStickers: false,
aciertos:null
        }

    },
    methods: {
        async mixStickerArray() {
this.stickersArray = await getListStickers()
const randomInt = Math.floor(Math.random() * 3)
this.sticker = this.stickersArray[randomInt]
        },
        checkAnswer(stickerId) {
this.showStickers = true
if (stickerId == this.sticker.id) {
    this.respuesta = " Has acertado el Sticker. Enhorabuena!", this.aciertos++ } 
    else { 
        this.respuesta=`Lo siento. Es ${this.sticker.name}` ,
        this.aciertos-- 
} 
        }, 
        
        newGame() { 

this.stickersArray=[], 
this.sticker=null,
this.showStickers=false, 
this.respuesta=null, 
this.mixStickerArray() 
        } 
    }, 

        
    mounted() { 
        this.mixStickerArray()
    } 
}


</script>

<style>

@import url('http://fonts.cdnfonts.com/css/arcade-classic');
#vidas {
    font-family: 'ArcadeClassic', sans-serif;
    color: red;
    transform: translateX(calc((-100vw + 100%)/ 2));
}
h1{
    font-family: 'ArcadeClassic', sans-serif;
        transform: translateX(calc((-100vw + 100%)/ 2));
}
</style>
