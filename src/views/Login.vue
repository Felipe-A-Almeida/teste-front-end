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
                  v-model="form.email"
                  label="E-mail"
                  :rules="emailRules"
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
                    class="background-primary"
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
        email: "",
      },
    }
  },

  computed: {
    usernameRules() {
      return [
        v => !!v || 'Por favor, preencha seu nome de usuário.',
      ]
    },  
    emailRules(){
      return [
        v => !!v || 'Por favor, preencha seu e-mail.',
      ]
    },
  },

  methods: {
    async login() {
      const validation = await this.$refs.form.validate();
      if (validation.valid) {
        let user = await UsersModel.params({ email: this.form.username, email: this.form.email }).get();

        if (!user || !user[0] || !user[0].username){
          this.$toast.show(`Nome de usuário ou e-mail errados.`, {
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
