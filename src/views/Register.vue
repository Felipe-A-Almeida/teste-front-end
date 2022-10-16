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
                v-model="form.username"
                label="Nome do usuário"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="form.password"
                counter
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="form.confirm_password"
                counter
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                depressed
                color="primary"
                @click="register"
              >
                CADASTRAR
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { required, minLength, sameAs } from "@vuelidate/validators";

  import UsersModel from "@/models/UserModel";

  export default {
    data() {
      return {
        form: {
          username: "",
          password: "",
          confirm_password: "",
        },
        valid: true,
      }
    },

    methods: {
      register() {
        const UserModel = new UsersModel(this.form);
        UserModel.save();
      }
    },

    validations: {
      form: {
        username: {
          required,
        },

        password: {
          required,
          minLength: minLength(6)
        },

        confirm_password: {
          required,
          sameAsPassword: sameAs('password')
        }
      }
    }
  }
</script>