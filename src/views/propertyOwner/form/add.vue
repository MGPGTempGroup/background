<template>
  <div class="property-owners-add" >
    <el-form
      :model="dataCreationForm"
      label-position="top" >
      <el-row :gutter="36" >
        <el-col v-bind="formItemLayoutProps" >
          <el-form-item :label="$t('owner.surname')" >
            <el-input v-model="dataCreationForm.surname" />
          </el-form-item>
        </el-col>
        <el-col v-bind="formItemLayoutProps" >
          <el-form-item :label="$t('owner.name')" >
            <el-input v-model="dataCreationForm.name" />
          </el-form-item>
        </el-col>
        <el-col v-bind="formItemLayoutProps" >
          <el-form-item :label="$t('owner.email')" >
            <el-input v-model="dataCreationForm.email" />
          </el-form-item>
        </el-col>
        <el-col v-bind="formItemLayoutProps" >
          <el-form-item :label="$t('owner.wechat')" >
            <el-input v-model="dataCreationForm.wechat" />
          </el-form-item>
        </el-col>
        <el-col v-bind="formItemLayoutProps" >
          <el-form-item :label="$t('owner.idCardNum')" >
            <el-input v-model="dataCreationForm.idCardNum" />
          </el-form-item>
        </el-col>
        <el-col v-bind="formItemLayoutProps" >
          <el-form-item :label="$t('owner.address')" >
            <el-cascader
              :options="addressOpts"
              v-model="dataCreationForm.address"
              expand-trigger="hover"
              @change="() => null"/>
          </el-form-item>
        </el-col>
        <el-col v-bind="formItemLayoutProps" >
          <el-form-item :label="$t('owner.identity')" >
            <el-select v-model="dataCreationForm.identity" multiple >
              <el-option
                v-for="(item, index) in availableIdentity"
                :key="index"
                :label="$t(`owner.${item.value}`)"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-bind="formItemLayoutProps" >
          <el-form-item :label="$t('owner.agent')" >
            <el-select
              v-model="dataCreationForm.agent"
              :remote-method="searchByAgent"
              multiple
              filterable
              remote
              reserve-keyword />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="property-owners-add__form-actions" >
        <el-button type="info">
          {{ $t('reset') }}
        </el-button>
        &nbsp;
        <el-button type="primary">
          {{ $t('create') }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('propertyOwner')

export default {
  name: 'PropertyOwnersAddForm',
  data() {
    return {
      formItemLayoutProps: { xs: 24, sm: 12, md: 12, lg: 8, xl: 8 }
    }
  },
  computed: {
    ...mapState(['dataCreationForm', 'availableIdentity'])
  },
  watch: {
    '$store.state.app.language': function() {
      this.setOpts()
    }
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
    }
  }
}
</script>

<style scoped lang="scss" >
  .property-owners-add {
    &__form-actions {
      display: flex;
      justify-content: flex-end;
    }
  }
  .el-cascader {
    width: 100%;
  }
</style>

<style>

</style>

