<template>
  <div>
    <Header></Header>
    <v-container>
      <v-row
        class="mt-5"
      >
        <v-col>
          <SearchBox
            @setVideoList="setVideoList"
          />
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        v-if="!video_detail"
      >
        <v-col
          v-for="(video, video_index) in video_list"
          :key="`video_${video_index}`"
          lg="4"
          md="6"
          cols="12"
        >
          <v-card
            class="mx-auto"
            max-width="400"
          >
            <v-img
              class="white--text align-end"
              height="200px"
              :src="video.snippet.thumbnails.medium.url"
            />
            <v-card-title>{{ video.snippet.title }}</v-card-title>
            <v-card-subtitle class="pb-0">
              {{ video.snippet.channelTitle }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ video.snippet.description }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="orange"
                text
                @click="showVideoDetails(video.id.videoId)"
              >
                Detalhes do vídeo
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div
        v-if="video_detail"
        class="mt-5"
      >     
        <v-row
          class="pb-5"
        >  
          <v-col
            cols="3"
            lg="1"
            md="2"
            sm="3"
            class="pointer"
            @click="hideVideoDetails"
          >
            <v-icon
              size="50"
            >
              mdi-arrow-left-bold-circle-outline
            </v-icon>
          </v-col>
          <v-col
            cols="9"
            lg="11"
            md="10"
            sm="9"
            class="pt-5 pl-0 text-align-center"
          >   
            <h2>{{ video_detail.snippet.title }}</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="text-align-center"
          >
            <iframe
              :src="`http://www.youtube.com/embed/${video_detail.id}`"
              class="video-iframe"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </v-col>
        </v-row>
        <v-row
          class="py-5"
        >
          <v-col
            cols="8"
          >
            <h3>
              <em>{{ video_detail.snippet.channelTitle }}</em>
            </h3>
          </v-col>
          <v-col
            cols="4"
            class="float-right"
            style="display: flex; justify-content: space-between;"
          >
            <span>
              <v-icon>
                mdi-thumb-up
              </v-icon>
              {{ video_detail.statistics.likeCount }}
            </span>
            <span>
              <v-icon>
                mdi-thumb-down
              </v-icon>
              {{ video_detail.statistics.dislikeCount || 0 }}
            </span>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row
          class="py-5"
        >
          <v-col>
            <p class="text--primary">
              <div>{{ video_detail.snippet.description }}</div>
            </p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row
          class="py-5"
        >
          <v-col>
            <p class="text--primary">
              <b>{{ video_detail.statistics.viewCount }} Views</b>
            </p>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Header from '../components/Header.vue';
import SearchBox from '../components/SearchBox.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    Header,
    SearchBox,
  },

  data() {
    return {
      video_id: null,
      api_key: "AIzaSyD04dlDjG532FMvw7WDJzAc-HzwpDl4byo",
      video_list: [],
      video_detail: null,
    }
  },

  methods: {
    setVideoList(videos) {
      this.video_list = videos;
    },
    async setVideoDetail() {
      let response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${this.video_id}&part=snippet,statistics&key=${this.api_key}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      response = await response.json();
      this.video_detail = response.items[0];
    },
    showVideoDetails(id) {
      this.video_id = id;
      this.setVideoDetail();
    },
    hideVideoDetails() {
      this.video_detail = null
    }
  }
});
</script>
