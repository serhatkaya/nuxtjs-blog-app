<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from '~/components/posts/PostList.vue'

export default {
  name: 'PostsPage',
  components: {
    PostList,
  },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    },
  },

  created() {
    // this.$store.dispatch('setPosts', this.loadedPosts)
  },
}
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
