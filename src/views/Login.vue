<template>
  <v-container>
    <v-row>
      <v-col>
        <Logo 
          :url="require('../assets/logo.png')"
          height="200"
        />    
        <v-row>
          <v-col
            class="d-flex justify-center"
          >
            <v-form 
              ref="form"
              class="sign-form"
            >
              <v-row
                class="d-flex justify-center"
              >
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="form.username"
                    label="Nome do usuário"
                    :rules="usernameRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                >
                <v-text-field
                  v-model="form.password"
                  :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_password ? 'text' : 'password'"
                  :rules="passwordRules"
                  counter
                  @click:append="show_password = !show_password"
                ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  class="d-flex justify-center"
                >
                  <v-btn
                    depressed
                    color="primary"
                    @click="login"
                  >
                    ENTRAR
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  class="d-flex justify-center"
                >
                  <v-btn
                    depressed
                    @click="goToRegister"
                  >
                    CADASTRE-SE
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UsersModel from "@/models/UserModel";
import Logo from "@/components/Logo";

export default {

  components: {
    Logo
  },
  
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      show_password: false,
    }
  },

  computed: {
    usernameRules() {
      return [
        v => !!v || 'Username required',
      ]
    },  
    passwordRules(){
      return [
        v => !!v || 'Password required',
      ]
    },
  },

  methods: {
    async login() {
      const validation = await this.$refs.form.validate();
      if (validation.valid) {
        let user = await UsersModel.params({ email: this.form.username, password: this.form.password }).get();

        if (!user || !user[0] || !user[0].username){
          this.$toast.show(`WRONG USERNAME OR PASSWORD`, {
            type: 'error',
            position: 'top'
          });
          return;
        }

        localStorage.setItem('authUser', JSON.stringify(user));
        this.$router.push({ name: 'home' })
      }
      return;
    },
    goToRegister() {
      this.$router.push({ name: 'register'});
    }
  }
}


</script>
