<template>
  <section class="post-list">
    <PostPreview
      v-for="post in posts"
      :id="post.slug"
      :key="Math.random() + post.slug"
      :is-admin="isAdmin"
      :preview-text="post.previewText"
      :thumbnail="post.thumbnail.url"
      :title="post.title"
    />
  </section>
</template>
<script>
import PostPreview from '~/components/posts/PostPreview.vue'
export default {
  name: 'PostList',
  components: {
    PostPreview,
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    posts: {
      type: Array,
      required: true,
    },
  },
}
</script>
<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
