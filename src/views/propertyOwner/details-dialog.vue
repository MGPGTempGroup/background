<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="$t('owner.details')"
    width="60%" >
    <el-row :gutter="48" >
      <el-col v-bind="{ xs: 24, sm: 24, md: 6, lg: 8, xl: 8 }" >
        <img style="width: 100%;" src="https://www.melbournerealestate.com.au/wp-content/uploads/2015/03/Ella-2.png" alt="">
      </el-col>
      <el-col v-bind="{ xs: 24, sm: 24, md: 18, lg: 16, xl: 16 }">
        <el-row :gutter="36" >
          <el-col v-bind="infoLayoutProps" >
            <dl>
              <dt>{{ $t('owner.name') }}</dt>
              <dd>Jerry Smith</dd>
            </dl>
          </el-col>
          <el-col v-bind="infoLayoutProps" >
            <dl>
              <dt>{{ $t('owner.surname') }}</dt>
              <dd>Smith</dd>
            </dl>
          </el-col>
          <el-col v-bind="infoLayoutProps" >
            <dl>
              <dt>{{ $t('owner.phone') }}</dt>
              <dd>173****4331</dd>
            </dl>
          </el-col>
          <el-col v-bind="infoLayoutProps" >
            <dl>
              <dt>{{ $t('owner.email') }}</dt>
              <dd>********@gmail.com</dd>
            </dl>
          </el-col>
          <el-col v-bind="infoLayoutProps" >
            <dl>
              <dt>{{ $t('owner.idCardNum') }}</dt>
              <dd>***********</dd>
            </dl>
          </el-col>
          <el-col v-bind="infoLayoutProps" >
            <dl>
              <dt>{{ $t('owner.wechat') }}</dt>
              <dd>xxxxx</dd>
            </dl>
          </el-col>
          <el-col v-bind="infoLayoutProps" >
            <dl>
              <dt>{{ $t('owner.address') }}</dt>
              <dd>x</dd>
            </dl>
          </el-col>
          <el-col v-bind="infoLayoutProps" >
            <dl>
              <dt>{{ $t('owner.identity') }}</dt>
              <dd>{{ $t(`owner.landlord`) }}</dd>
            </dl>
          </el-col>
          <el-col v-bind="infoLayoutProps" >
            <dl>
              <dt>{{ $t('owner.agent') }}</dt>
              <dd>Jerry</dd>
            </dl>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="dialogVisible = false">{{ $t('close') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('propertyOwner')
export default {
  name: 'PropertyOwnerDetailsDialog',
  data() {
    return {
      infoLayoutProps: {
        xs: 24, sm: 12, md: 12, lg: 8, xl: 8
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.$store.state.propertyOwner.detailsDialogVisible
      },
      set(visible) {
        this.updateDetailsDialogVisible({ visible })
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateDetailsDialogVisible'
    ])
  }
}
</script>

<style lang="scss" scoped >
  @import '@/styles/dl.scss';
</style>

