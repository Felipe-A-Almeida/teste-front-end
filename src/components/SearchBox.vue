<template>
  <div>
    <v-text-field
      v-model="search_text"
      label="PESQUISAR"
      append-inner-icon="mdi-magnify"
      @click:append-inner="search"
    />
    <div class="display-position">
      
    </div>
  </div>
</template>

<script>
  export default {
    props: ["video_id"],
    data() {
      return {
        search_text: "",
        api_key: "AIzaSyD04dlDjG532FMvw7WDJzAc-HzwpDl4byo",
        videos: [],
        nextPageToken: null,
        is_loading: false,
      }
    },

    created() {
      window.addEventListener('scroll', this.handleScroll);
    },

    methods: {
      async search() {
        if(this.search_text !== "") {
          let url = "";
          if (!this.nextPageToken) {
            url = `https://www.googleapis.com/youtube/v3/search?maxResults=9&part=snippet&q=${this.search_text}&key=${this.api_key}`;
          } else {
            url = `https://www.googleapis.com/youtube/v3/search?maxResults=9&pageToken=${this.nextPageToken}&part=snippet&q=${this.search_text}&key=${this.api_key}`;
          }
          let response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          response = await response.json();
          this.nextPageToken = response.nextPageToken;
          this.videos = response.items || response;
          this.$emit("setVideoList", this.videos);
        }
      },
      handleScroll() {
        if(!this.is_loading && !this.video_id){
          const scroll = window.scrollY;
          const max_scroll=(document.documentElement.scrollHeight - document.documentElement.clientHeight);
          if (scroll == max_scroll) {
            this.is_loading = true;
            this.$emit("show-loading",true);
            this.search();
            setTimeout(() => {
              this.$emit("show-loading",false);
              this.is_loading = false;
            }, 1000);
          }
        }
      },
    }
  }
</script>