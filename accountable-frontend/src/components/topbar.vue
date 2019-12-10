<template>
  <v-app-bar app color="primary" dark v-if="!hidden">
    <v-toolbar-title>{{ name ? `${name}'s Accounts` : 'Accounts'}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="signOut">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { apiRequest } from "@/utils";

export default {
  computed: {
    name() {
      return (
        this.$store.getters["currentUser"] &&
        this.$store.getters["currentUser"].name
      );
    },
    hidden() {
      return this.$route.meta.headerHidden;
    }
  },
  methods: {
    signOut() {
      apiRequest("DELETE", "/auth/sign_out").then(() => {
        this.$router.push("/sign-in");
      });
    }
  }
};
</script>