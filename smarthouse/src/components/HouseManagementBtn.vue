<template>
  <div style="background:rgb(233,233,233)">
     <v-expansion-panels class="mb-6">
      <v-expansion-panel>
        <v-expansion-panel-header expand-icon="mdi-menu-down"><h3>Manage my houses</h3></v-expansion-panel-header>
        <v-expansion-panel-content class="m" @click="openAddHouseDialog">
            <span @click="openAddHouseDialog"><strong>Add house</strong></span>
        </v-expansion-panel-content>
        <v-expansion-panel-content class="m" @click="removeHouseDialog">
            <span @click="removeHouseDialog"><strong>Remove house</strong></span>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
  export default {
      name:'HouseManagementBtn',
    data: () => ({
      panel: [0, 1],
      readonly: false,
    }),
    methods:{
        openAddHouseDialog(){
            console.log('opendialog')
            this.$emit('openAddHouseDialog')
        },
        removeHouseDialog(){
            this.$emit('removeHouseDialog')
        }
    }
  }
</script>
<style scoped>
    .m{
        cursor: pointer;
        color:grey
    }
    .m :hover{
        color: rgb(170, 165, 165);
    }
</style>