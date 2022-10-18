<template>
  <div>
    <v-card
      class="header-card"
    >
      <v-row>
        <v-col
          cols="6"
          class="font-weight-bold"
        >
          Bem-vindo,
          {{
            user.username
          }}!
        </v-col>
        <v-col
          cols="6"
          class="text-align-right font-weight-bold pointer"
          @click="logout"
        >
          <v-icon>
            mdi-logout
          </v-icon>
          Logout
        </v-col>
      </v-row>
      <v-row>
        <v-col
          class="subtitle-2 font-weight-light"
        >
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
  },
  
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: 'login'});
    }
  }
}
</script>