<template>
  <v-container>
    <v-row>
      <v-col>      
        <v-row>
          <v-col>
            <h2>
              LOGO
            </h2>          
          </v-col>
        </v-row>
        <v-form v-model="valid">
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="username"
                label="Nome do usuário"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
            >
            <v-text-field
              v-model="password"
              :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_password ? 'text' : 'password'"
              counter
              @click:append="show_password = !show_password"
            ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                depressed
                color="primary"
              >
                ENTRAR
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, email } from "@vuelidate/validators";

import UsersModel from "@/models/UserModel";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      }
    }
  },

  methods: {
    async login() {
      this.$vuetify.$touch();
      if (this.$vuetify.$error) {
        return;
      }

      let user = await UserModel.params({ email: this.form.email }).get();

      if (!user || !user[0] || !user[0].email){
        return;
      }

      localStorage.setItem('authUser', JSON.stringify(user));
      this.$router.push({ name: 'home' })
    }
  },  

  validators: {
    form: {
      email: {
        required,
        email,
      }
    }
  }
}

</script>
  