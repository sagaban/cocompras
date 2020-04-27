<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon dark>mdi-cart</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title v-text="list.name"></v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'UserListItemItem',
  props: {
    list: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
