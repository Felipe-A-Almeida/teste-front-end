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
        <v-form ref="form" v-model="valid">
          <v-row>
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
                type="password"
                required
                :rules="passwordRules"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="confirm_password"
                type="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-btn
                depressed
                color="primary"
                @click="register"
              >
                CADASTRAR
              </v-btn>
            </v-col>
            <v-col
              cols="12"
            >
              <v-btn
                depressed
                @click="goToLogin"
              >
                VOLTAR
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import UsersModel from "@/models/UserModel";

  export default {
    data: () => {
      return {
        form: {
          username: "",
          password: "",
        },
        confirm_password: "",
        confirmationPasswordRules: [],
        valid: true,
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
          v => v.length >= 6 || 'Password must contain at least 6 characters'
        ]
      },
    },
    

    methods: {
      async register() {
        const validation = await this.$refs.form.validate();
        if (validation.valid) {
          if (this.form.password !== this.confirm_password){
            this.$toast.show(`PASSWORDS MUST MATCH!`, {
              type: 'error',
              position: 'top'
            });
            return;
          }
          const UserModel = new UsersModel(this.form);
          UserModel.save();
        }
      },
      goToLogin() {
        this.$router.push({ name: 'login'});
      }
    },
  }
</script>