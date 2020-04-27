<template>
  <v-list-item-group>
    <user-list-item v-for="list in userLists" :key="list.id" :list="list" />
  </v-list-item-group>
</template>

<script>
import UserListItem from '~/components/UserListItem';

export default {
  name: 'UserLists',
  components: {
    UserListItem
  },
  props: {
    userLists: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped></style>
