<template>
  <v-col cols="12" class="fill-height col-container">
    <v-row justify="center">
      <h1>
        Welcome to the <br />
        Cocompras!
      </h1>
    </v-row>
    <v-row justify="center">
      <v-card class="info-card elevation-12">
        <v-card-text>
          To use this app you'll need to
          <nuxt-link to="/login">
            Login
          </nuxt-link>
          or
          <nuxt-link to="/register">
            Register
          </nuxt-link>
        </v-card-text>
      </v-card>
    </v-row>
  </v-col>
</template>

<script>
export default {
  layout: 'clean'
};
</script>

<style lang="scss" scoped>
.col-container {
  margin-top: 20%;
  text-align: center;
}
.info-card {
  margin-top: 2rem;
}
</style>
