<template>
  <v-app dark>
    <v-content>
      <v-container class="fill-height" fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  beforeCreate() {
    const loggedIn = this.$store.getters.loggedIn;
    const page = this.$route.name;

    if (!loggedIn && !['index', 'login', 'register'].includes(page)) {
      this.$router.push({ name: 'login' });
    } else if (loggedIn && ['index', 'login', 'register'].includes(page)) {
      this.$router.push({ name: 'list' });
    }
  }
};
</script>

<style lang="scss" scoped></style>
