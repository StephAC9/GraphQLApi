<template>
    <div>
        <div class="btn" style="text-align:start" v-if="!inWlcPage" @click="onClickButtonBack">
            <v-btn class="ma-2 btn" style="background:rgb(114, 114, 112)">
                <v-icon class="icon" dark left>mdi-arrow-left</v-icon>Previous
            </v-btn>
        </div>
        <div class="btn" style="text-align:start" v-if="inWlcPage" @click="onClickButtonForward">
            <v-btn class="ma-2 btn" style="background:rgb(114, 114, 112)">
                <div>To house -> </div>
            </v-btn>
        </div>
        
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name:'NavigationBtn',

    computed:{
        ...mapGetters('owner',['inWlcPage'])
    },


    methods:{
        onClickButtonBack () {
            this.$emit('goBack')
        },
        onClickButtonForward () {
            this.$emit('goIn')
        }
  
    }
}
</script>

<style scoped>

    @media screen and (max-width: 660px) {
        .btn{
            font-size: 6px;
            width: 50px;
        }

        .icon{
            max-width: 2px;
            max-height: 2px;
        }
   
    }

</style>