<template>
  <div>
    <v-text-field
      v-model="search_text"
      label="PESQUISAR"
      append-inner-icon="mdi-magnify"
      @click:append-inner="search"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        search_text: "",
        api_key: "AIzaSyD04dlDjG532FMvw7WDJzAc-HzwpDl4byo",
        videos: []
      }
    },

    methods: {
      async search() {
        if(this.search_text !== "") {
          let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.search_text}&key=${this.api_key}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          response = await response.json();
          this.videos = response.items;
          console.log("----------------", this.videos);
          this.$emit("setVideoList", this.videos);
        }
      }
    }
  }
</script>