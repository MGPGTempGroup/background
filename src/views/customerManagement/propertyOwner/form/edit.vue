<template>
  <div class="property-owners-edit" >
    <el-row :gutter="48" >
      <el-col v-bind="{ xs: 24, sm: 24, md: 6, lg: 6, xl: 6 }" >
        <img style="width: 100%;" src="https://www.melbournerealestate.com.au/wp-content/uploads/2015/03/Ella-2.png" alt="">
      </el-col>
      <el-col v-bind="{ xs: 24, sm: 24, md: 18, lg: 18, xl: 18 }">
        <el-form :model="dataEditionForm" >
          <el-row :gutter="36" >
            <el-col v-bind="layoutProps" >
              <el-form-item :label="$t('owner.surname')" >
                <el-input v-model="dataEditionForm.surname" />
              </el-form-item>
            </el-col>
            <el-col v-bind="layoutProps" >
              <el-form-item :label="$t('owner.name')" >
                <el-input v-model="dataEditionForm.name" />
              </el-form-item>
            </el-col>
            <el-col v-bind="layoutProps" >
              <el-form-item :label="$t('owner.email')" >
                <el-input v-model="dataEditionForm.email" />
              </el-form-item>
            </el-col>
            <el-col v-bind="layoutProps" >
              <el-form-item :label="$t('owner.wechat')" >
                <el-input v-model="dataEditionForm.wechat" />
              </el-form-item>
            </el-col>
            <el-col v-bind="layoutProps" >
              <el-form-item :label="$t('owner.idCardNum')" >
                <el-input v-model="dataEditionForm.idCardNum" />
              </el-form-item>
            </el-col>
            <el-col v-bind="layoutProps" >
              <el-form-item :label="$t('owner.address')" >
                <el-cascader
                  :options="addressOpts"
                  v-model="dataEditionForm.address"
                  expand-trigger="hover"
                  @change="() => null"/>
              </el-form-item>
            </el-col>
            <el-col v-bind="layoutProps" >
              <el-form-item :label="$t('owner.identity')" >
                <el-select v-model="dataEditionForm.identity" multiple >
                  <el-option
                    v-for="(item, index) in availableIdentity"
                    :key="index"
                    :label="$t(`owner.${item.value}`)"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-bind="layoutProps" >
              <el-form-item :label="$t('owner.agent')" >
                <el-select
                  v-model="dataEditionForm.agent"
                  :remote-method="searchByAgent"
                  multiple
                  filterable
                  remote
                  reserve-keyword />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 提交相关按钮 -->
          <div class="property-owners-edit__form-actions" >
            <el-button type="info">
              {{ $t('reset') }}
            </el-button>
            &nbsp;
            <el-button type="primary">
              {{ $t('create') }}
            </el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('propertyOwner')
export default {
  name: 'PropertyOwnersEditForm',
  data() {
    return {
      layoutProps: { xs: 24, sm: 12, md: 12, lg: 8, xl: 8 }
    }
  },
  computed: {
    ...mapState(['dataEditionForm', 'availableIdentity'])
  },
  '$store.state.app.language': function() {
    this.setOpts()
  },
  created() {
    this.setOpts()
  },
  methods: {
    searchByAgent(queryString, callback) {},
    setOpts() {
      this.addressOpts = [{
        label: this.$t('address.australia'),
        value: 'australia',
        children: [
          {
            label: this.$t('address.vic'),
            value: 'vic',
            children: [
              {
                label: this.$t('address.melbourne'),
                value: 'melbourne',
                children: [
                  {
                    label: this.$t('address.mooneePonds'),
                    value: 'mooneePonds',
                    children: [
                      {
                        label: this.$t('address.margaretStreet'),
                        value: 'Margaret Street'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }]
    },
    beforeAvatarUpload(file) {},
    handleAvatarSuccess(res, file) {},
    handleImageFileUploadControlChange({ dataURL }) {
      this.imagecropperShow = true
    },
    cropSuccess() {},
    close() {}
  }
}
</script>

<style lang="scss" scoped >
  .property-owners-edit {
    &__form-actions {
      display: flex;
      justify-content: flex-end;
    }
  }
  .el-cascader {
    width: 100%;
  }
</style>

