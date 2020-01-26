<template>
  <div class="favorite-devices"> 
      <div class="favorite-div-box">
          <div class="box-header">
            <span><h2 style="color:gray; margin-left:20px">My favorites</h2></span>
          </div>
          <div class="box">
              <div class="card">
                <div v-if="objet_state">
                  <img :src="require(`@/assets/${this.image_url2}.png`)" alt="Avatar">
                </div>
                <div v-else>
                  <img :src="require(`@/assets/${this.image_url1}.png`)" alt="Avatar">
                </div>
                <div class="container">
                    <v-switch color="yellow" @change="onChangeEventHandler" :input-value="objet_state"></v-switch>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
  export default {
      name: 'FavoriteDevices',

      data(){

          return{
            image_url1 :'lamp-off',
            image_url2 :'lamp-on',
            objet_state : false,
            command : 2,
          }
      },

}

</script>

<style scoped>
 .favorite-div-box{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin: 20px;
      padding: 10px;
      flex-wrap:wrap;
  }


  .box{
    width: 70px;
      display: flex;
      justify-content: space-between;
      margin: 20px;
      padding: 10px;
      flex-wrap:wrap;
      flex: 2;
  }
  .box-header{
    padding: 10px;
  }

  .card {
    width: 70px;
    background: rgb(100, 98, 98);
    font-size: 10px;  
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    flex-basis: 10%;
    text-align: center;
    padding: 4px;
    border-radius: 10px;
}

img{
  width: 50px;
  height: 50px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 2px 16px;
}
</style>