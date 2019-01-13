<template>
  <el-dialog
    :title="$t('leaveMessage.messages')"
    :visible.sync="dialogVisible">
    <el-table :data="messagesDialogData" >
      <el-table-column :label="$t('leaveMessage.content')" prop="content" />
      <el-table-column :label="$t('createdAt')" prop="created_at" />
    </el-table>
  </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('leaveMessage')
export default {
  name: 'LeaveMessagesDialog',
  computed: {
    ...mapState([
      'messagesDialogVisible',
      'messagesDialogData'
    ]),
    dialogVisible: {
      get() {
        return this.messagesDialogVisible
      },
      set(visible) {
        this.setMessagesDialogVisible(visible)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setMessagesDialogVisible'
    ])
  }
}
</script>

<style scoped lang="scss" >

</style>
