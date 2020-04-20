<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Login</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="username"
              label="Username"
              name="username"
              prepend-icon="mdi-account"
              type="text"
            />

            <v-text-field
              v-model="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
            />
            <v-text-field
              label="Repeat your password"
              name="password2"
              prepend-icon="mdi-lock"
              type="password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
      <div class="register-msg">
        Already registered?
        <nuxt-link to="/register">
          Login!
        </nuxt-link>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'clean',
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    login() {
      console.log(this.username);
      console.log(this.password);
    }
  }
};
</script>

<style lang="scss" scoped>
.register-msg {
  padding: 0.5rem;
}
</style>
