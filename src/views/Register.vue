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
                    v-model="form.email"
                    label="E-mail"
                    type="email"
                    required
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
                    color="primary"
                    @click="register"
                  >
                    CADASTRAR
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  class="d-flex justify-center"
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

    data: () => {
      return {
        form: {
          username: "",
          email: "",
        },
        valid: true,
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
          v => String(v)
                .toLowerCase()
                .match(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ) || 'E-mail inválido'
        ]
      },
    },
    

    methods: {
      async register() {
        const validation = await this.$refs.form.validate();
        if (validation.valid) {
          const UserModel = new UsersModel(this.form);
          UserModel.save();
          this.$router.push({ name: 'login'});
          return;
        }
        this.$toast.show(`Por favor, preencha os campos corretamente.`, {
          type: 'error',
          position: 'top'
        });
        return;
      },
      goToLogin() {
        this.$router.push({ name: 'login'});
      }
    },
  }
</script>
