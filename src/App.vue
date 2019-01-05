<template>
  <div id="app">
    <router-view/>
    <!-- 备注组件：由于大部分路由组件都使用到，所以在App.vue中渲染 -->
    <remark />
  </div>
</template>

<script>
import Remark from '@/components/Remark'
export default{
  name: 'App',
  components: {
    Remark
  }
}
</script>
