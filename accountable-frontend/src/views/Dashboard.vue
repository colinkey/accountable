<template>
  <v-container fluid>
    <v-row v-if="newAccount.visible" align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-text>
            <v-text-field label="Account Name" v-model="newAccount.name" />
            <v-text-field label="Description" v-model="newAccount.description" />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn text color="primary" @click="createNewAccount">Add Account</v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="red" @click="showNewAccount(false)">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <template v-else>
      <v-row align="center" justify="center" v-for="account in accounts" :key="account.id">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-list-item>
              <v-list-item-content>
                <v-card-title class="headline">{{ account.name }}</v-card-title>
                <v-card-subtitle align="left">{{ account.description }}</v-card-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>${{ account.balance }}</v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn link text color="primary" :to="`/account/${account.id}`">Go to Account</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon color="red" @click="removeAccount(account.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-btn class="mx 2" fixed bottom right fab dark color="accent" @click="showNewAccount(true)">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
  </v-container>
</template>

<script>
import { apiRequest, checkForUser } from "@/utils";

export default {
  data() {
    return {
      accounts: [],
      newAccount: {
        description: "",
        name: "",
        visible: false
      }
    };
  },
  mounted() {
    const loggedIn = checkForUser();

    if (loggedIn) {
      /* eslint-disable no-console */
      apiRequest("GET", "/user", null, true).then(({ user }) => {
        this.$store.commit("setUser", user);
        this.$store.dispatch("loadApp");
        apiRequest("GET", "/accounts", null, true).then(data => {
          /* eslint-disable no-console */
          console.log(data);
          this.accounts = data;
        });
      });
    } else {
      this.$router.push("/sign-in");
    }
  },
  methods: {
    createNewAccount() {
      apiRequest(
        "POST",
        "/accounts",
        {
          account: {
            name: this.newAccount.name,
            description: this.newAccount.description
          }
        },
        true
      )
        .then(({ account }) => {
          const combinedAccts = [...this.accounts, account];
          this.accounts = combinedAccts;
          this.newAccount = {
            name: "",
            description: "",
            visible: false
          };
        })
        .catch(e => console.log(e));
    },
    removeAccount(id) {
      apiRequest("DELETE", `/accounts/${id}`)
        .then(resp => {
          console.log(resp);
          const removedAccts = this.accounts.filter(a => a.id !== id);
          this.accounts = removedAccts;
        })
        .catch(e => console.log(e));
    },
    showNewAccount(val) {
      this.newAccount.visible = val;
    }
  }
};
</script>
