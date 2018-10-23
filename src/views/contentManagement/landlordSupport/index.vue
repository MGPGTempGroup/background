<template>
  <div class="landlord-support" >
    <div class="landlord-support__rich-editor-wrapper" >
      <tinymce :height="600" v-model="currRichEditorContent"/>
    </div>
    <div class="landlord-support__actions" >
      <el-button type="info" @click="historicalContentDialogVisible = true" >{{ $t('contentMGT.historicalContent') }}</el-button>
      &nbsp;
      <el-button type="primary" @click="confirmUpdateDialogVisible = true" >{{ $t('update') }}</el-button>
    </div>
    <el-dialog :visible.sync="historicalContentDialogVisible" title="收货地址">
      <el-table :data="historicalContent">
        <el-table-column property="date" label="日期" width="150" align="center"/>
        <el-table-column property="name" label="姓名" width="200" align="center"/>
        <el-table-column property="address" label="地址" align="center"/>
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="() => null">{{ $t('details') }}</el-button>
            <el-button type="text" size="small">{{ $t('apply') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 更新确认对话框 -->
    <el-dialog :title="$t('tips')" :visible.sync="confirmUpdateDialogVisible" >
      <strong>{{ $t('contentMGT.confirmUpdateTips') }}</strong>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirmUpdateDialogVisible = false">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="() => undefined">{{ $t('confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('content')
export default {
  name: 'LandlordSupport',
  components: { Tinymce },
  data() {
    return {
      confirmUpdateDialogVisible: false,
      historicalContentDialogVisible: false,
      historicalContent: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  computed: {
    // todo: 组件自身先维护一份富文本内容的数据（v-model的数据源也是这个），在update时再commit mutation同步到store
    currRichEditorContent: {
      get() {
        return this.$store.state.content.landlordSupport.currRichEditorContent
      },
      set(content) {
        this.updateCurrRichEditorContent({ content })
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateCurrRichEditorContent'
    ])
  }
}
</script>

<style lang="scss" scoped >
  .landlord-support {
    padding: 20px;
    &__rich-editor-wrapper {}
    &__actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
</style>

