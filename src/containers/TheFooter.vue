<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://coreui.io" target="_blank"></a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} oxitlabs.</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">Powered by</span>
      <a href="https://coreui.io/vue" target="_blank">OXIT</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
