<template>
  <div class="home-page">
    <section class="intro">
      <input type="text" placeholder="Search" />
    </section>
    <PostList :posts="loadedPosts" />
  </div>
</template>
<script>
export default {
  name: 'IndexPage',
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    },
  },
}
</script>

<style scoped lang="scss">
.intro {
  height: 200px;
  position: relative;
  padding: 30px;
  background-image: url('~assets/images/main-bg.jpeg');
  box-sizing: border-box;
  background-position: center;
  background-size: cover;

  input {
    position: absolute;
    top: 35%;
    left: 5%;
    width: 90%;
    font-size: 1.5rem;
    color: #fff;
    padding: 10px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.14);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(3.1px);
    -webkit-backdrop-filter: blur(3.1px);
    border: 1px solid rgba(255, 255, 255, 0.13);
    &::placeholder {
      color: #f9f3f3;
    }
  }
}

@media (min-width: 768px) {
  .intro input {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
