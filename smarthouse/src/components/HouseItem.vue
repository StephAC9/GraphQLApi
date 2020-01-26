<template>
     <div class="container-houseItem" > 
            <v-card 
            class="houseItem"
            > 
            <div class="house" >
                <div style="text-align:start;">
                    <img v-if="house.image.imageUrl !== null" :src="require(`@/assets/${house.image.imageUrl}.jpg`)" alt="House" style="flex-basis:40%; height:50px;  margin:20px;">
                </div>
                <div style="flex-basis:60%; text-align:left; margin:20px 0 0 20px; color:grey">
                    <b>{{house.address}}</b>
                </div> 
            </div >
            <div class="house-manage">
                <v-icon 
                class="icon"
                 @click="goInHouse(house.id)"
                style="margin-end:10px;backgroud:rgb(200,200,255)">
                {{ icons.mdiHome }}
                </v-icon>
                <v-icon 
                class="icon"
                 @click="showDeleteDialog(house.id)" 
                style="backgroud:rgb(255,200,200)">
                {{ icons.mdiDelete }}
                </v-icon>
        </div>
        </v-card>
    </div>
</template>
<script>    
import { mdiDelete,mdiHome} from '@mdi/js'
export default {
    name:'HouseItem',
    props:['house'],
    data(){
        return{
            icons: {
              mdiDelete,
              mdiHome
            },
            items: [
                { title: 'Click Me' },
                { title: 'Click Me' },
            ],
            offset: true,
                }
    },

    methods:{
        goInHouse(houseId){
            console.log('goInHouse: Params= '+houseId)
            this.$emit('goInHouse',houseId)
        },
        showDeleteDialog(houseId){
            this.$emit('removeHouseDialog',houseId)
        }
    }
}
</script>

<style scoped>
.container-houseItem{
    background: white;
}
.house{
    display: flex;
    background: rgb(233, 233, 233);
    flex-basis: 40%;
    justify-content: start;
    text-align: center;
}
.houseItem{
    display: flex;
    flex-direction: column;
}
 .house-manage{
     padding: 10px;
    text-align: end;
} 
.icon :hover{
 color: rgb(87, 84, 84);
}



</style>