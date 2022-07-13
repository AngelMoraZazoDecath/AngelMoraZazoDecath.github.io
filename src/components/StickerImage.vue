<template>
<center>
    <div class="sticker-container">
        <img v-if="!showSticker" class="hidden-sticker" :src="StickerImage" alt="" />
        <img v-else class="fade-in" :src="StickerImage" alt="" />
    </div><br>
</center>
</template>

<script>

import { computed } from '@vue/reactivity';
export default {
    props: {
        stickerId: {
            type: Number,
            required: true

        },
        showSticker: {
            type: Boolean,
            required: true,
            default: false
        },
        imagen:{
            type: String,
            required:true
        }

    },
    computed: {
        StickerImage() {
            const urlSticker = this.imagen
            
            return urlSticker

        }
    },
    methods: {
        changeToTrue() {
            return this.showStickers = true
        }
    }
}
</script>

<style>







@import url('http://fonts.cdnfonts.com/css/arcade-classic');

#vidas{
    font-family: 'ArcadeClassic', sans-serif;
    color: red;
    transform: translateX(calc((-100vw + 100%)/ 2));
}

.sticker-container {
    height: 200px;
}

img {
    height: 200px;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
  
}

.hidden-sticker {
    filter: brightness(0);
}
</style>