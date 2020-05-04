<template>
  <div>
    <user-lists v-if="listsArray.length" :user-lists="listsArray" />
    <div v-else>
      No hay ninguna lista. Creá una con el botón "+" de abajo a la derecha
    </div>
    <nuxt-link to="/list/new">
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
  computed: {
    ...mapState(['lists']),
    listsArray() {
      return Object.keys(this.lists).map(id => this.lists[id]);
    }
  }
};
</script>

<style lang="scss" scoped>
.add-new-list-btn {
  margin-bottom: 1rem;
}
</style>
