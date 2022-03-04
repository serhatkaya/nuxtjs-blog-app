<template>
  <div>
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav" />
    <TheSidenav :show="displaySidenav" @close="setSideNavState" />
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from '~/components/navigation/TheHeader.vue'
import TheSidenav from '~/components/navigation/TheSidenav.vue'
export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
    TheSidenav,
  },
  data() {
    return {
      displaySidenav: false,
    }
  },
  methods: {
    setSideNavState(state) {
      this.displaySidenav = state
    },
  },
}
</script>
