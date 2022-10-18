<template>
  <div>
    <v-card
      class="header-card"
    >
      <v-row>
        <v-col
          cols="6"
        >
          {{
            user.username
          }}
        </v-col>
        <v-col
          cols="6"
          class="text-align-right"
        >
          Logout
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          {{
            user.email
          }}
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    const user = localStorage.getItem('authUser');
    this.user = JSON.parse(user)[0];
  }
}
</script>