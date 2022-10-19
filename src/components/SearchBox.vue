<template>
  <div>
    <v-text-field
      v-model="search_text"
      label="PESQUISAR"
      append-inner-icon="mdi-magnify"
      @click:append-inner="search"
      @keyup.enter="search"
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
        search_term: "",
        previous_page: null,
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
        if (this.search_text !== this.search_term) {
          this.$emit("clear-videos");
          this.nextPageToken = null;
        }
        if(this.search_text !== "") {
          this.search_term = this.search_text
          let url = "";
          if (!this.nextPageToken) {
            url = `https://www.googleapis.com/youtube/v3/search?maxResults=6&type=video&part=snippet&q=${this.search_term}&key=${this.api_key}`;
          } else {
            url = `https://www.googleapis.com/youtube/v3/search?maxResults=6&type=video&pageToken=${this.nextPageToken}&part=snippet&q=${this.search_term}&key=${this.api_key}`;
          }
          if (!this.previous_page || this.previous_page != this.nextPageToken){
            fetch(url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(async (response) => {
              response = await response.json();
              this.previous_page = !this.previous_page ? this.nextPageToken : this.previous_page;
              this.nextPageToken = response.nextPageToken;
              this.videos = response.items || response;
              this.$emit("setVideoList", this.videos);
              this.$emit("show-loading",false);
              this.is_loading = false;
            })
          }
        } else {
          this.$toast.show(`Por favor, digite uma palavra-chave.`, {
            type: 'error',
            position: 'top'
          });
          return;
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
          }
        }
      },
    }
  }
</script>