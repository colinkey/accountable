<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card raised>
          <v-card-text>
            <v-form>
              <v-text-field
                v-if="newUser"
                label="Name"
                v-model="name"
                type="text"
                prepend-icon="person"
              />
              <v-text-field label="Email" v-model="email" type="email" prepend-icon="email" />
              <v-text-field
                type="password"
                label="Password"
                prepend-icon="lock"
                v-model="password"
              />
              <v-text-field
                v-if="newUser"
                type="password"
                label="Confirm Password"
                prepend-icon="lock"
                v-model="passwordConfirmation"
              />
              <v-card-actions>
                <v-btn
                  raised
                  color="primary"
                  @click="handleAuthAction"
                >{{ newUser ? 'Sign Up' : 'Sign In' }}</v-btn>
                <v-btn
                  :text="true"
                  @click="toggleNewUser"
                >{{ newUser ? 'Back to Sign In' : 'Switch to Sign Up' }}</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import { apiRequest } from "@/utils";

export default {
  data() {
    return {
      email: "",
      password: "",
      passwordConfirmation: "",
      newUser: false,
      name: ""
    };
  },
  methods: {
    toggleNewUser() {
      this.newUser = !this.newUser;
    },
    handleAuthAction() {
      const path = this.newUser ? "/auth" : "/auth/sign_in";
      const body = {
        email: this.email,
        password: this.password
      };

      if (this.newUser) {
        body.password_confirmation = this.passwordConfirmation;
        body.name = this.name;
      }

      apiRequest("POST", path, body, false)
        .then(resp => {
          this.$store.commit("setUser", resp.data);
          this.$router.push("/");
        })
        .catch(error => {
          console.log("error");
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>