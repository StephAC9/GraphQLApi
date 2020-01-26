<template>
  <div class="text-center">
    <v-btn
      class="white--text"
      @click="confirm"
    >ADD
    </v-btn>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
  export default {
      name:'Overlay',
    data: () => ({
      overlay: false,
    }),
    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
    methods:{
        confirm(){
            this.overlay = !this.overlay
            this.$emit('confirm')
        }
    }
  }
</script>