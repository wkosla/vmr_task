<template>
  <div id="users">
    <b-table
      hover
      bordered
      responsive
      :items="users"
      :fields="fields">
      <template v-slot:cell(avatar)="data">
        <b-img rounded fluid :src="data.item.avatar"></b-img>
      </template>
      <template v-slot:cell(details)="data">
        <b-button :to="'/user/' + data.item.id" size="sm">
          Details
        </b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currPage"
      :total-rows="total"
      :per-page="perPage"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  name: 'users',
  data: () => ({
    fields: [
      { key: 'id', sortable: true },
      { key: 'avatar', label: 'Avatar' },
      { key: 'first_name', sortable: true },
      { key: 'last_name', sortable: true },
      { key: 'email', sortable: true },
      { key: 'details', label: '' },
    ],
  }),
  computed: {
    users() {
      return this.$store.getters.getUsers;
    },
    currPage: {
      get() {
        return this.$store.getters.getCurrPage;
      },
      set(page) {
        this.$store.dispatch('GET_USERS', page);
      },
    },
    perPage() {
      return this.$store.getters.getPerPage;
    },
    total() {
      return this.$store.getters.getTotal;
    },
  },
  mounted() {
    this.$store.dispatch('GET_USERS', this.currPage);
  },
};
</script>

<style lang="scss" scoped>
.img-fluid {
  max-width: 36px;
}
</style>
