export const state = () => {
  return { loadedPosts: [] }
}

export const mutations = {
  setPosts(state, posts) {
    state.loadedPosts = posts
  },
  addPost(state, post) {
    state.loadedPosts.push(post)
  },
  editPost(state, editedPost) {
    const postIndex = state.loadedPosts.findIndex(
      (post) => post.id == editedPost.id
    )
    if (postIndex > -1) {
      state.loadedPosts[postIndex] = editedPost
    }
  },
}

export const actions = {
  nuxtServerInit({ commit, context }, { $axios }) {
    return $axios.get('/posts.json').then((res) => {
      const posts = []
      for (const key in res.data) {
        posts.push({ ...res.data[key], id: key })
      }

      commit('setPosts', posts)
    })
  },
  setPosts({ commit }, posts) {
    commit('setPosts', posts)
  },
  addPost({ commit }, post) {
    const postForCreate = { ...post, updatedDate: new Date() }
    return this.$axios
      .post('/posts.json', postForCreate)
      .then((r) => {
        commit('addPost', { ...postForCreate, id: r.data.name })
      })
      .catch((e) => console.log(e))
  },
  editPost({ commit }, editedPost) {
    return this.$axios
      .put(`/posts/${editedPost.id}.json`, editedPost)
      .then(() => commit('editPost', editedPost))
  },
}

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts
  },
}
