<template>
  <v-list-item-group>
    <nuxt-link
      v-for="list in userLists"
      :key="list.id"
      :to="'/list/' + list.id"
    >
      <user-list-item :list="list" />
    </nuxt-link>
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

<style lang="scss" scoped>
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
}
</style>
