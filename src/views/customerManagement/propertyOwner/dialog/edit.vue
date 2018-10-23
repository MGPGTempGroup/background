<template>
  <el-dialog
    :title="$t('edit')"
    :visible.sync="visible"
    width="60%">
    <edit-form />
  </el-dialog>
</template>

<script>
import editForm from '../form/edit'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('propertyOwner')
export default {
  name: 'PropertyOwnersEditionDialog',
  components: { editForm },
  data() {
    return {}
  },
  computed: {
    visible: {
      get() {
        return this.$store.state.propertyOwner.dataEditionDialogVisible
      },
      set(visible) {
        this.updateDataEditionDialogVisible({ visible })
      }
    }
  },
  watch: {},
  methods: {
    ...mapMutations([
      'updateDataEditionDialogVisible'
    ])
  }
}
</script>

<style lang="scss" scoped >

</style>

