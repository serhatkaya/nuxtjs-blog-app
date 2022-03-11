import GET_ALL_POSTS_QUERY from '~/apollo/queries/getAllPosts.gql'
import GET_POST_BY_SLUG_QUERY from '~/apollo/queries/getPostBySlug.gql'
export const state = () => {
  return { loadedPosts: [], loadedPost: null }
}

export const mutations = {
  setPosts(state, posts) {
    state.loadedPosts = posts
  },
  setPost(state, post) {
    state.loadedPost = post
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
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  },
}

export const actions = {
  async nuxtServerInit({ commit }, { store }) {
    await store.dispatch('getAllPosts')
  },
  getAllPosts(vuexContext) {
    const apollo = this.app.apolloProvider.defaultClient
    return apollo
      .query({
        query: GET_ALL_POSTS_QUERY,
      })
      .then((r) => {
        vuexContext.commit('setPosts', r.data.postCollection.items)
      })
  },
  getPost(vuexContext, slug) {
    const apollo = this.app.apolloProvider.defaultClient
    return apollo
      .query({
        query: GET_POST_BY_SLUG_QUERY,
        variables: {
          slug,
        },
      })
      .then((r) => {
        if (
          r.data.postCollection.items &&
          r.data.postCollection.items.length > 0
        ) {
          vuexContext.commit('setPost', r.data.postCollection.items[0])
        }
      })
  },
  setPosts(vuexContext, posts) {
    vuexContext.commit('setPosts', posts)
  },
  setPost(vuexContext, post) {
    vuexContext.commit('setPost', post)
  },
  addPost(vuexContext, post) {
    const postForCreate = { ...post, updatedDate: new Date() }
    return this.$axios
      .post(`/posts.json?auth=${vuexContext.state.token}`, postForCreate)
      .then((r) => {
        vuexContext.commit('addPost', { ...postForCreate, id: r.data.name })
      })
      .catch((e) => console.log(e))
  },
  editPost(vuexContext, editedPost) {
    return this.$axios
      .put(
        `/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`,
        editedPost
      )
      .then(() => vuexContext.commit('editPost', editedPost))
  },
}

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts
  },
  loadedPost(state) {
    return state.loadedPost
  },
}
