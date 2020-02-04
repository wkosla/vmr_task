<template>
  <div id="user">
    <b-card no-body>
      <b-row no-gutters>
        <b-col sm="3">
          <b-card-img :src="user.avatar" v-if="user.avatar"></b-card-img>
        </b-col>
        <b-col sm="9">
          <b-card-body
            :title="user | nameFilter"
            :sub-title="user.id | idFilter"
          >
            <b-button :href="'mailto:' + user.email">
              {{ user.email }}
            </b-button>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>

    <b-button class="mt-3" @click="$router.go(-1)">
      Go back
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'user',
  computed: {
    user() {
      return this.$store.getters.getCurrUser;
    },
  },
  filters: {
    nameFilter(val) {
      return `${val.first_name} ${val.last_name}`;
    },
    idFilter(val) {
      return `user ID: ${val}`;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch('GET_USER', to.params.id);
    });
  },
};
</script>
