<template>
    <div>
        <div v-if="!sticker">
          <div style="display: flex; justify-content: center;">
        <div class="vtmn-loader vtmn-loader_size--medium"></div>
  </div>
        </div>
        <div v-else>
            <h1>Acumula 20 vidas para completar la partida! </h1><br>
            <h1>¿De quien es este sticker?</h1>
            <StickerImage :stickerId="sticker.id" :showSticker="showStickers" :imagen="sticker.urlSticker" />
            <StickerList :stickers="stickersArray" @selection="checkAnswer($event)" />
            <button class="vtmn-btn vtmn-btn_variant--primary vtmn-btn_size--medium" id="buttonPista" v-if="!respuesta" @click="askPista()">Pedir pista!</button>
            <div class="vtmn-card" id="pista">{{pista}}</div>
                 
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
            pista:null,
            endMessage:null
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
                this.pista = null 
        if (stickerId == this.sticker.id) {
                this.respuesta = " CORRECTO!", this.aciertos++ } 
            else { 
                this.respuesta=`Lo siento. Es ${this.sticker.name}` ,
                this.aciertos-- 
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
            this.pista = null 
        },
        
        askPista(){
       
            console.log(this.sticker.name)
            if(this.sticker.name == "Rugen Ugal"){
            this.pista  = "Su sueño es tener un MAC y untarlo con tomate"
            }else if(this.sticker.name =="Domenico Negro"){
             this.pista  = '"Yes, yes,sure...but, what do you think about S..."'   
            }else if(this.sticker.name =="Rocio"){
                 this.pista  = '"Me vais a ver en todos los proyectos que se cancelen"'
            }else if(this.sticker.name =="Carles Casademont"){
                 this.pista  = "Mi perro sale en más meets que yo"
            }else if(this.sticker.name ==="Adrian Castro"){
                 this.pista  = '"Buenas equipo, prometo ser breve. Desde el equipo dispo stock os queremos hacer llegar estas buenas noticias. Gracias a todo el esfuerzo que hemos hecho estos últimos meses, podemos decir que finalmente nuestro soporte supera incluso al de Francia. Además, hemos recuperado 2847923847924€ de gap de stock gracias al trabajo que han hecho... Error, mail demasiado largo, por favor vuelva a intentarlo en otro momento."'
            }else if(this.sticker.name =="Mattia Sacchi"){
                 this.pista  = "Soy el chico que corre"
            }else if(this.sticker.name =="Marco Parreira"){
                 this.pista  = "Puto twist, fodase"
            }else if(this.sticker.name =="Lucas"){
                 this.pista  = "Yo iba para futbolista de élite, pero acabé en decathlon"
            }else if(this.sticker.name =="Angel Mora"){
                 this.pista  = '"Si esto de desarrollar no sale bien, me meto a vender kebabs."'
            }else if(this.sticker.name =="Mattia Bianucci"){
                 this.pista  = "Itinsell y la pizza con piña para mi son lo mismo"
            }else if(this.sticker.name=="Marc Cinca"){
                  this.pista  = '"Por mis venas fluye tanta química que con una gota de mi sangre se podría iluminar Andorra "'
            }else if(this.sticker.name=="Diego Riesco"){
                  this.pista  = "Dicen que logró romper el suelo con solo una mano, pero el problema fue que él tambien se rompió."
            }else if(this.sticker.name=="Giacomo Di Palo"){
                  this.pista  = "La causa de nuestro colesterol"
            }else if(this.sticker.name=="Fernando Cuba"){
                  this.pista  = '"Si cierras las luces, no me vas a ver, pero si me haces sonreir seguramente si"'
            }else if(this.sticker.name=="Raul Gallardo"){
                  this.pista  = '"Dicen que JK ROWLING le contactó cuando terminó cierto manual de usuario..."'
            }else if(this.sticker.name=="Rafa Vela"){
                  this.pista  = '"Si fallas soibretodo no te rindas"'
            }else if(this.sticker.name=="Diogo Florido"){
                  this.pista  = '"He entrenado a la Helpdesk, les he convertido en unos maestros de SAP ECOM y he vivido para contarlo"'
            }else if(this.sticker.name=="Nieves"){
                  this.pista  = '"Con mucha yo en la sierra, habrá abundancia en la tierra"'
            }else if(this.sticker.name=="Sossio"){
                  this.pista  = '"Es culpa de SAP"'
            }else if(this.sticker.name=="Adrian Garcia"){
                  this.pista  = '"No veo el final de todo esto, no porque no entienda, si no porque no veo una mierda"'
            }


        }
    }, 

        
    mounted() { 
        this.mixStickerArray()
    } 
}


</script>
<style>

@import url('http://fonts.cdnfonts.com/css/arcade-classic');

#respuesta{
    font-size: 30px;
     font-family: 'ArcadeClassic', sans-serif;
        transform: translateX(calc((-100vw + 100%)/ 2));
}

#vidas {
    font-family: 'ArcadeClassic', sans-serif;
    font-size: 30px;
    color: red;
    transform: translateX(calc((-100vw + 100%)/ 2));
}
h1{
    font-family: 'ArcadeClassic', sans-serif;
        transform: translateX(calc((-100vw + 100%)/ 2));
}
#buttonPista{
    float:right;
    margin-right:15%;
    text-align: center;
    clear: both;

   
}
#pista{
    font-family: 'Verdana', sans-serif;
    display: flex; 
    justify-content: center;
    clear: both;
    width: auto;
    margin-left:25%;
    margin-right:25%;
}

</style>
