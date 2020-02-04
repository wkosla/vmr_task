<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'users',
  mounted() {
    this.$store.dispatch('GET_USERS');
  },
};
</script>
