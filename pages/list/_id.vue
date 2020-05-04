<template>
  <div>
    <h1>{{ listName }}</h1>
    <grocery-list
      :groceries="groceriesArray"
      :avatar-size="48"
      @valueChanged="valueChanged"
    />
    <v-btn
      absolute
      dark
      fab
      bottom
      right
      color="green"
      @click="updateListGroceries"
      ><v-icon>mdi-check</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GroceryList from '~/components/GroceryList';

export default {
  name: 'ListGroceries',
  components: {
    GroceryList
  },

  async fetch() {
    await Promise.all([
      this.$store.dispatch('getUserList', { id: this.listId }),
      this.$store.dispatch('getGroceries')
    ]);
    this.goceriesState = this.listGroceries[this.listId].reduce(
      (acc, groceryRef) => ({
        ...acc,
        [groceryRef.groceryId]: {
          ...this.groceries[groceryRef.groceryId],
          ...groceryRef
        }
      }),
      {}
    );
  },
  data() {
    return {
      goceriesState: {}
    };
  },
  computed: {
    ...mapState(['groceries', 'lists', 'listGroceries']),
    listId() {
      return this.$route.params.id;
    },
    listName() {
      return this.lists[this.listId] ? this.lists[this.listId].name : '';
    },
    groceriesArray() {
      return Object.keys(this.goceriesState).map(id => this.goceriesState[id]);
    }
  },
  methods: {
    valueChanged({ groceryId, diff }) {
      const grocery = this.goceriesState[groceryId];
      if (grocery.amount + diff >= 0)
        this.$set(grocery, 'amount', grocery.amount + diff);
    },
    updateListGroceries() {
      // const groceries = this.groceriesArray.map(
      //   ({ amount, groceryId, userListId }) => ({
      //     amount,
      //     groceryId,
      //     userListId
      //   })
      // );
      // this.$store.dispatch('updateUserList', groceries);
      this.$store.dispatch('updateUserList');
    }
  }
};
</script>

<style lang="scss" scoped></style>
