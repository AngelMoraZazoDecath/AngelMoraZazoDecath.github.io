<template>
    <div>
        <div v-if="!sticker">
        <div style="display: flex; justify-content: center;">
        <div class="vtmn-loader vtmn-loader_size--medium"></div>
    </div>
        </div>
        <div v-else>
            <h1>Acumula 20 vidas para ganar la partida! </h1><br>
            <h1>¿De quien es este sticker?</h1>
            <StickerImage :stickerId="sticker.id" :showSticker="showStickers" :imagen="sticker.urlSticker" :pista ="sticker.pistaData" />
            <StickerList v-if="cnt < 1" :stickers="stickersArray" @selection="checkAnswer($event)"/>
            <div style="display: flex; justify-content: center;">
            <button class="vtmn-btn vtmn-btn_variant--primary vtmn-btn_size--medium" id="buttonPista" v-if="!respuesta" @click="askPista($event)" >Pedir pista!</button>
            </div>
            <div class="vtmn-card" id="pista">{{pistaToShow}}</div>
            <template v-if="respuesta">
                <div id="respuesta">{{respuesta}}</div>
                <div style="display: flex; justify-content: center">
                <button class="vtmn-btn vtmn-btn_variant--primary vtmn-btn_size--medium vtmn-items-center"  @click="newGame()">Siguiente</button>
                </div>
                <h1 id="vidas">Vidas {{aciertos}} </h1>
            </template>
        </div>
    </div>
    <div id="end">{{endMessage}}</div>
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
            aciertos:null,
            pistaToShow:null,
            endMessage:null,
            cnt:0,
            pistaClick:false
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
            this.pistaToShow = null 
            if (stickerId == this.sticker.id) {
                this.respuesta = " CORRECTO!",
                (this.pistaClick) ? this.aciertos+=0.5 : this.aciertos++,
                this.cnt++ } 
            else { 
                this.respuesta=`Lo siento. Es ${this.sticker.name}` ,
                this.aciertos-- ,
                this.cnt++
            } 
            if(this.aciertos >19){
                this.respuesta = false
                this.endMessage = "VIDAS: "+this.aciertos+"! ENHORABUENA, HAS GANADO LA PARTIDA!!"
            }else if(this.aciertos <1){
                this.respuesta = false
                this.endMessage ="HAS PERDIDO, MEJOR DEDÍCATE A OTRA COSA!!"
            }
        }, 
                
        newGame() { 

            this.stickersArray=[], 
            this.sticker=null,
            this.showStickers=false, 
            this.respuesta=null,
            this.mixStickerArray(), 
            this.pistaToShow = null 
            this.pistaClick=false
            this.cnt=0
        },
        
        askPista(event){
            this.pistaToShow = this.sticker.pistaData

            if(event){
                this.pistaClick=true
            }
            

        }
    }, 

    mounted() { 
        this.mixStickerArray()
    } 
}


</script>
<style>








@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

#respuesta{
    font-size: 12px;
    font-family: 'Press Start 2P', cursive;
    transform: translateX(calc((-100vw + 100%)/ 2));
}

#vidas {
    font-family: 'Press Start 2P', cursive;
    font-size: 15px;
    color: red;
    transform: translateX(calc((-100vw + 100%)/ 2));
}
h1{
    font-family: 'Press Start 2P', cursive;
        transform: translateX(calc((-100vw + 100%)/ 2));
}
#buttonPista{
    clear: both;
    margin-top:1%;
   
}
   
#pista{
    font-family: 'Press Start 2P', cursive;
    display: flex; 
    justify-content: center;
    clear: both;
    width: auto;
    margin: 1% 25% 0% 25%;
    font-size: 12px;
    color:#007CBD;
}

#end{
    font-family: 'Press Start 2P', cursive;
    font-size: 15px;
    color: red;
}


</style>
