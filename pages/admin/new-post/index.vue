<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submitNewPost="onSubmitted" />
    </section>
  </div>
</template>
<script>
import AdminPostForm from '~/components/admin/AdminPostForm.vue'
export default {
  name: 'NewPostPage',
  components: {
    AdminPostForm,
  },
  middleware: ['check-auth', 'auth'],
  methods: {
    onSubmitted(data) {
      this.$store
        .dispatch('addPost', data)
        .then(() => this.$router.push('/admin'))
    },
  },
}
</script>
<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
