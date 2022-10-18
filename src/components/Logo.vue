<template>
  <v-row>
    <v-col>
      <v-img
        :src="url"
        class="my-3"
        contain
        :height="height"
      />
    </v-col>
  </v-row>
</template>

<script>
  export default {
    props: ["height", "url"]
  }
</script>