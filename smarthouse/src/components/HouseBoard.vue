<template>
  <div class="houseBoard"> 
        <div class="top-display">
          <FavoritesBtn :currentHouseId="houseId"></FavoritesBtn>
       </div>
        <div style="margin-top:40px">
            <Rooms :currentHouseId="houseId"></Rooms>
        </div>
        </div>
</template>

<script>
import  {mapGetters} from 'vuex'
import Rooms from './Rooms'
import FavoritesBtn from './FavoritesBtn'

  export default {
    name: 'HouseBoard',
    components:{
        Rooms,
        FavoritesBtn      
    },
    data(){
      return{
        houseId:'',
      }
    },

    computed:{
         ...mapGetters('house',['currentHouseId']),
     },

    created(){
      this.houseId = this.$route.params.id
      console.log('currentHouseId: '+this.currentHouseId)
    },

  }

</script>

<style scoped>

  .houseBoard{
      display: flex;
      flex-direction: column;
      justify-content: space-between
  }
  .top-display{
    margin: auto 0;
  }

</style>