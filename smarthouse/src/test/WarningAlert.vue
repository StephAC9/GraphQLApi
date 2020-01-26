<template>
    <v-alert v-if="wlAlarm" type="warning">

      I'm an error alert.
    </v-alert>
</template>

<script>
import {mapGetters} from 'vuex'
import { watch } from 'fs'
export default {
    name:'Alert-Warning',

    data(){
        return{
            wlAlarm: 0,
            alertMessage: null,
            }        
    },

    computed:{
      ...mapGetters('house',['waterLeakageAlarm'])
    },

    watch:{
        waterLeakageAlarm(val){
            if(val !== null || val !== undefined){
                this.wlAlarm = this.waterLeakageAlarm.status  
            }

        }
    }

    
}
</script>

<style scoped>
    
</style>