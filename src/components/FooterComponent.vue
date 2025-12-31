<script setup lang="ts">
const year = new Date().getFullYear()
</script>
<template>
  <footer class="footer">
    <p>© {{ year }} My Report App. All rights reserved.</p>
  </footer>
</template>

<style lang="sass" scoped>
.footer
  background-color: $footer-bg-color
  color: $footer-text-color
  text-align: center
  padding: 10px 0
  position: relative
  bottom: 0
  width: 100%
  position: fixed
  bottom: 0
  font-size: 14px
</style>
