<template>
  <div>
    <user-lists :user-lists="lists" />
    <nuxt-link to="/newList">
      <v-btn
        absolute
        dark
        fab
        bottom
        right
        color="indigo"
        class="add-new-list-btn"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import UserLists from '~/components/UserLists';
export default {
  components: {
    UserLists
  },
  fetch() {
    return this.$store.dispatch('getUserLists');
  },
  computed: mapState(['lists'])
};
</script>

<style lang="scss" scoped>
.add-new-list-btn {
  margin-bottom: 1rem;
}
</style>
