<template>
  <div>
    <div style="text-align:center; font-size:16px; font-style:italic; color:black">
      <p style="padding:40px">
        <strong>
          A smart home is a residence that uses internet-connected devices to enable the remote monitoring and management of appliances and systems, such as lighting and heating.
          Smart home technology, also often referred to as home automation or domotics (from the Latin "domus" meaning home), provides homeowners security, comfort, convenience 
          and energy efficiency by allowing them to control smart devices, often by a smart home app on their smartphone or other networked device. 
        </strong>
      </p>
    </div>

   <!--  <v-carousel
      cycle
      height="300"
      hide-delimiter-background
      show-arrows-on-hover
    
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="require(`@/assets/${image[i]}.jpg`)" alt="Avatar"
      > 
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3">{{ slide }} Slide</div>
          </v-row>
       </v-carousel-item>
    </v-carousel> -->
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const {mapGetters} = createNamespacedHelpers('helper')
  export default {
    data () {
      return {
        image:[
          '',
          '',
          '',
          '',
          ''
        ],
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
      }
    },

    created(){
      this.$store.dispatch('owner/isInWelcomePage',{inWlc: true})
    },
    destroyed(){
      this.$store.dispatch('owner/isInWelcomePage',{inWlc: false})
    }

  
  }
</script>