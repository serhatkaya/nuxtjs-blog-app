import Cookie from 'js-cookie'

export const state = () => {
  return { loadedPosts: [], token: null }
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
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
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
  setPosts(vuexContext, posts) {
    vuexContext.commit('setPosts', posts)
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
    console.log(vuexContext)
    return this.$axios
      .put(
        `/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`,
        editedPost
      )
      .then(() => vuexContext.commit('editPost', editedPost))
  },
  authenticateUser(vuexContext, authData) {
    const url = authData.isLogin
      ? process.env.FIREBASE_LOGIN_URL
      : process.env.FIREBASE_REGISTER_URL

    return this.$axios
      .$post(url, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      })
      .then((res) => {
        const token = res.idToken
        vuexContext.commit('setToken', token)
        localStorage.setItem('token', token)
        const expDate = new Date().getTime() + +res.expiresIn * 1000
        localStorage.setItem('tokenExpiration', expDate)
        Cookie.set('jwt', token)
        Cookie.set('expirationDate', expDate)
        return this.$axios.post('http://localhost:3000/api/track-data', {
          data: 'Authenticated',
        })
      })
  },
  logout(vuexContext) {
    vuexContext.commit('clearToken')
    Cookie.remove('jwt')
    Cookie.remove('expirationDate')
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiration')
  },

  setLogoutTimer(vuexContext, duration) {
    setTimeout(() => {
      vuexContext.commit('clearToken')
    }, duration)
  },
  initAuth(vuexContext, req) {
    let token, expirationDate
    if (req && req.headers.cookie) {
      const jwtCookie = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('jwt='))

      if (jwtCookie) {
        token = jwtCookie.split('=')[1]
        expirationDate = req.headers.cookie
          .split(';')
          .find((c) => c.trim().startsWith('expirationDate='))
          .split('=')[1]
      }
    } else if (process.client) {
      token = localStorage.getItem('token')
      expirationDate = localStorage.getItem('tokenExpiration')
    }

    if (token && expirationDate) {
      if (new Date().getTime() > +expirationDate || !token) {
        console.log('No token or invalid token')
        vuexContext.commit('logout')
      } else {
        vuexContext.commit('setToken', token)
      }
    }
  },
}

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts
  },
  isAuthenticated(state) {
    return state.token != null
  },
}
