<template>
  <div class="property-owners-add" >
    <!-- 基础表单 -->
    <el-form
      ref="form"
      :model="dataCreationForm"
      :rules="formRules"
      label-position="top" >
      <el-row :gutter="36" >
        <el-col v-bind="formItemLayoutProps" >
          <el-form-item :label="$t('owner.surname')" prop="surname" >
            <el-input v-model="dataCreationForm.surname" />
          </el-form-item>
        </el-col>
        <el-col v-bind="formItemLayoutProps" >
          <el-form-item :label="$t('owner.name')" prop="name" >
            <el-input v-model="dataCreationForm.name" />
          </el-form-item>
        </el-col>
        <el-col v-bind="formItemLayoutProps" >
          <el-form-item :label="$t('owner.email')" prop="email" >
            <el-input v-model="dataCreationForm.email" />
          </el-form-item>
        </el-col>
        <el-col v-bind="formItemLayoutProps" >
          <el-form-item :label="$t('owner.phone')" prop="phone" >
            <el-input v-model="dataCreationForm.phone" />
          </el-form-item>
        </el-col>
        <el-col v-bind="formItemLayoutProps" >
          <el-form-item :label="$t('owner.wechat')" prop="wechat" >
            <el-input v-model="dataCreationForm.wechat" />
          </el-form-item>
        </el-col>
        <el-col v-bind="formItemLayoutProps" >
          <el-form-item :label="$t('owner.idCardNum')" prop="id_card" >
            <el-input v-model="dataCreationForm.id_card" />
          </el-form-item>
        </el-col>
        <el-col v-bind="formItemLayoutProps" >
          <el-form-item :label="$t('owner.address')" prop="address" >
            <el-cascader
              :options="areaData"
              v-model="dataCreationForm.address"
              change-on-select
              expand-trigger="hover" />
          </el-form-item>
        </el-col>
        <el-col v-bind="formItemLayoutProps" >
          <el-form-item :label="$t('customerIdentity.identity')" prop="identity" >
            <customer-identity-select v-model="dataCreationForm.identity_id" :extra-el-select-opts="{ multiple: false }" />
            <!-- <el-select v-model="dataCreationForm.identity_id" >
              <el-option
                v-for="(item) in availableIdentity"
                :key="item.id"
                :label="$t(`customerIdentity.${item.label}`)"
                :value="item.value" />
            </el-select> -->
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 提交相关按钮 -->
      <div class="property-owners-add__form-actions" >
        <el-button type="info" @click="hendleReset" >
          {{ $t('reset') }}
        </el-button>
        &nbsp;
        <el-button type="primary" @click="handleSubmit" >
          {{ $t('create') }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import CustomerIdentitySelect from '@/businessComponent/CustomerIdentitySelect'
import { filterObjEmptyVal } from '@/utils'
import { validateEmail, requiredWithoutAll } from '@/utils/validate'
import areaDataStorage from '@/utils/areaDataStorage'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('propertyOwner')

export default {
  name: 'PropertyOwnersAddForm',
  components: {
    CustomerIdentitySelect
  },
  data() {
    return {
      formItemLayoutProps: { xs: 24, sm: 12, md: 12, lg: 8, xl: 8 },
      areaData: areaDataStorage(),
      formRules: {
        surname: [
          {
            validator: (rule, val, callback) => {
              if (!requiredWithoutAll(val, this.dataCreationForm.name)) {
                callback(new Error(this.$t('owner.requiredSurname')))
              }
              callback()
            }
          }
        ],
        email: [
          {
            validator: (rule, val, callback) => {
              const form = this.dataCreationForm
              if (!requiredWithoutAll(val, form.wechat, form.phone)) {
                callback(new Error(this.$t('owner.requiredEmail')))
              }
              callback()
            },
            trigger: 'blur'
          },
          {
            validator: (rule, val, callback) => {
              if (val !== '' && !validateEmail(val)) {
                callback(new Error(this.$t('owner.illegalEmailAddress')))
              }
              callback()
            },
            trigger: 'blur'
          }
        ],
        wechat: [
          {
            validator: (rule, val, callback) => {
              const form = this.dataCreationForm
              if (!requiredWithoutAll(val, form.email, form.phone)) {
                callback(new Error(this.$t('owner.requiredWechat')))
              }
              callback()
            },
            trigger: 'blur'
          },
          {
            pattern: /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/, message: this.$t('owner.illegalWechat')
          }
        ],
        phone: [
          {
            validator: (rule, val, callback) => {
              const form = this.dataCreationForm
              if (!requiredWithoutAll(val, form.email, form.wechat)) {
                callback(new Error(this.$t('owner.requiredPhone')))
              }
              callback()
            }
          }
        ]
      }
    }
  },
  computed: {
    ...mapState(['dataCreationForm'])
  },
  methods: {
    ...mapActions([
      'createOwner'
    ]),
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.createOwner(
            filterObjEmptyVal(this.dataCreationForm)
          ).then(res => {
            this.$message({
              message: this.$t('createSuccess'),
              type: 'success'
            })
            this.hendleReset()
          })
        } else {
          return false
        }
      })
    },
    hendleReset() {
      this.$refs.form.resetFields()
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
    &__form-upload {
      width: 150px;
      &-title {
        font-size: 14px;
        font-weight: bold;
      }
      &-btn {
        width: 100%;
        height: 150px;
      }
    }
  }
  .el-cascader {
    width: 100%;
  }
</style>

<style>

</style>

