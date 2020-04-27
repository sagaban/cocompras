<template>
  <div>
    <user-lists :user-lists="lists" />
    <v-btn
      absolute
      dark
      fab
      bottom
      right
      color="pink"
      class="add-new-list-btn"
      @click="addNewList"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
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
  computed: mapState(['lists']),
  methods: {
    addNewList() {
      console.log('addNewList');
    }
  }
};
</script>

<style lang="scss" scoped>
.add-new-list-btn {
  margin-bottom: 1rem;
}
</style>
