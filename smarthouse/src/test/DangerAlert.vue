<template>
    <v-alert v-if="alertFire == 1" type="error">
      Fire
    </v-alert>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name:'Alert-Danger',
    data(){
      return{
        alertFire: 0
      }
    },
    computed:{
      ...mapGetters('house',['fireAlarm'])
    },
    watch:{
      fireAlarm(val){
        if(val !== null || val !== undefined){
          this.alertFire = this.fireAlarm.status
          console.log('Fire: '+this.alertFire)
        }
      }
    }
}
</script>

<style scoped>
    
</style>