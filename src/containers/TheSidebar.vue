<template>
  <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <img v-if="minimize" class="menu-icon" v-bind:src="settings.icon"/>
      <img v-else class="menu-logo" v-bind:src="settings.logo"/>
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="$options.nav"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'

export default {
  data(){
    return{
      settings: null,
    }
  },
  name: 'TheSidebar',
  nav,
  computed: {
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  },
    mounted(){
      this.$store.dispatch('getSettings').then(result=>{
        this.settings = result
    })
  },
}
</script>

<style scoped>
.menu-logo{
  width: 125px;
}
.menu-icon{
  width: 35px;
}
</style>