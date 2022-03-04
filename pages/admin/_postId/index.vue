<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submitNewPost="onEdit" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '~/components/admin/AdminPostForm.vue'
export default {
  name: 'AdminPostId',
  components: {
    AdminPostForm,
  },
  asyncData(context) {
    return context.$axios
      .get(`/posts/${context.params.postId}.json`)
      .then((r) => {
        return {
          loadedPost: { ...r.data, id: context.params.postId },
        }
      })
      .catch(() => context.error())
  },
  methods: {
    onEdit(post) {
      this.$store
        .dispatch('editPost', post)
        .then(() => this.$router.push('/admin'))
    },
  },
}
</script>
<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
