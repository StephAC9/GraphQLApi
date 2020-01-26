<template>
    <v-dialog persistent max-width="290">
        <v-card>
            <v-card-title class="headline">DELETION NOTICE</v-card-title>
            <v-card-text>This room with all the devices in it will be completely removed <span style="font-size:25px; color:red;font-style:bold">!!!</span></v-card-text>
            <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="grey darken-1">Cancel</v-btn>
            <v-btn color="red darken-1">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
   name:'DeleteNotice',
}
</script>