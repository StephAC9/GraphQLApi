<template>
    <div class="ownerPage">
        <v-dialog
          hide-overlay
          persistent
          width="500" 
          v-model="houseAddingDialog">
          <v-card>
            <v-card-title style="text-align:center">ADD NEW HOUSE</v-card-title>
              <v-text-field
                style="margin:30px"
                v-model="address"
                color="dark"
                label="House Address"
                name="homeAddress"
                type="text" >
              </v-text-field>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn @click="houseAddingDialog = false" color="grey darken-1">Cancel</v-btn>
                <v-btn @click="addHouse" color="red darken-1">Confirm</v-btn>
                <v-overlay :value="overlay">
                <v-progress-circular indeterminate size="64">{{overlayText}}</v-progress-circular>
            </v-overlay>
            </v-card-actions>
          </v-card>       
        </v-dialog>
        <v-dialog
        v-model="houseRemovalDialog" 
        persistent 
        max-width="290">
        <v-card>
            <v-card-title class="headline">DELETION NOTICE</v-card-title>
            <v-card-text>This room with all the devices in it will be completely removed <span style="font-size:25px; color:red;font-style:bold">!!!</span></v-card-text>
            <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="grey darken-1" text @click="houseRemovalDialog = false">Cancel</v-btn>
            <v-btn color="red darken-1" text @click="removeHouse">Delete</v-btn>
            <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64">{{overlayText}}</v-progress-circular>
            </v-overlay>
            </v-card-actions>
        </v-card>
        </v-dialog>
        <template>
          <div class="profile">
            <v-card
            class="user-board"
              style="background:rgb(233, 233, 233,1); min-width:50%"
                :loading="loading"
            >
            <div class="part1">
              <div class="pic">
                <img src="../assets/steph.jpg" alt="">
              </div>
          
              <v-card-title><strong>Personal Details</strong></v-card-title>

              <v-card-text style="color:grey">
                <strong>{{getCurrentOwner.name}}</strong> 
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
             <v-menu
                transition="slide-y-transition"
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="purple"
                    color="primary"
                    dark
                    v-on="on"
                  >
                  Manage User
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

            </div>

            <div class="part2">
              <v-card-title class="title"><strong>VISIT A HOUSE</strong></v-card-title>
                <div
                height="50"
              
              >
                <div class="h" style="text-align: center"
                v-for="(house, i) in ownerListOfHouses"
                  :key="i"
                > 
                   <HouseItem
                  class="houseItem"  
                  :house="house"
                  @removeHouseDialog="removeHouseDialog"
                  @goInHouse="goInHouse" 
                  >
                  </HouseItem> 
                </div>
                <v-divider></v-divider>
                  <div class="my-2" style="text-align: center;  margin:20px">
                    <v-btn @click="openAddHouseDialog" large color="transparent"><strong>ADD A NEW HOUSE</strong></v-btn>
                  </div>
              </div>

            </div>

            </v-card>
           </div>
        </template> 
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import HouseItem from './HouseItem'
import HouseManagementBtn from './HouseManagementBtn'
import HouseManage from './HouseManage'


  export default {
    components:{
      HouseItem,
      HouseManagementBtn,
      HouseManage,
      
    },
    data: () => ({
      loading: false,
      selection: 1,
      selectedImage: null,
      selectedHouse: {},
      houses:[],
      address:'',
      houseAddingDialog: false,
      houseRemovalDialog: false,
      loadingDialog :false,
      loadingDialogText:'',
      displayHousemanage: false,
      houseId:'',
      items: [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ],
        overlay: false,
        overlayText:'',
        
    }),
    computed:{
      ...mapGetters('owner',['getCurrentOwner','isTokenExpired']),
      ...mapGetters('house',['ownerListOfHouses'])
    },
    created(){
      this.$store.dispatch('house/setHouses')
    },

    mounted(){
      console.log(this.ownerListOfHouses)
    },

      methods: {
       displayHouseManage(houseId){
         this.displayHousemanage = true
         this.houseId = houseId
         console.log('HouseId: '+this.houseId)
       },
      goInHouse (houseId) {
        this.overlayText = 'Wait...'
        this.overlay = !this.overlay
        console.log('Going into house with id: '+houseId)
        this.selectedHouse = this.ownerListOfHouses.find(house => house.id === houseId)
        console.log('Selected house: ',this.selectedHouse)
        this.$store.dispatch('room/setRooms',{houseId: houseId})
        this.$store.dispatch('device/setFavorites',{houseId: houseId})
        this.$store.dispatch('house/setHouseID',{houseId: houseId})
        this.$router.push({name: 'houseBoard', params: {id: houseId} })
      },
      addHouse(){
        this.overlayText = 'Adding new house...'
        this.overlay = !this.overlay
        console.log('Provided address: '+this.address)
        this.loadingDialogText='Adding house'
        this.loadingDialog = true
        this.$store.dispatch('house/addHouse',{address: this.address})
        this.houseAddingDialog = false
      },
        removeHouse(){
          this.overlay = !this.overlay
          this.overlayText = 'Removing house...'
          this.$store.dispatch('house/removeHouse',{houseId: this.houseId})
          this.houseRemovalDialog = false
      },
      openAddHouseDialog(){
        console.log('opendialog')
        this.houseAddingDialog = true
      },
      removeHouseDialog(houseId){
        this.houseRemovalDialog = true
        this.houseId = houseId
      },
    } ,
    
    watch:{
      isTokenExpired(val){
        console.log('in ownerpage')
        console.log('isTokenExpired: '+val)
      },
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },     
    },
  }
</script>
<style scoped>
.user-board{
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
  .houseItem{
    background: rgb(233,233,233);
    margin: 5px;
  }
  .part1{
    flex-basis: 40%;
    min-width: 200Px;
  }
  .part2{
    flex-basis: 60%;
    min-width: 200px;
  }
 
  .pic{
    width: 100px;
    margin: 5px;
  }
   @media screen and (max-width: 600px) {
  .title{
    font-size: 7px;
  }
  .part1{
    flex-basis: 100%;
  }
  .part2{
    flex-basis: 90%;
  }
  .houseItem{
    width: 100%
  }
} 
</style>