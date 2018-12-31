<template>
  <div v-if="dataEditionForm" class="property-owners-edit" >
    <el-form
      ref="form"
      :model="dataEditionForm"
      :rules="formRules"
      label-position="top" >
      <el-row :gutter="36" >
        <el-col v-bind="layoutProps" >
          <el-form-item :label="$t('owner.surname')" prop="surname" >
            <el-input v-model="dataEditionForm.surname" />
          </el-form-item>
        </el-col>
        <el-col v-bind="layoutProps" >
          <el-form-item :label="$t('owner.name')" prop="name" >
            <el-input v-model="dataEditionForm.name" />
          </el-form-item>
        </el-col>
        <el-col v-bind="layoutProps" >
          <el-form-item :label="$t('owner.email')" prop="email" >
            <el-input v-model="dataEditionForm.email" />
          </el-form-item>
        </el-col>
        <el-col v-bind="layoutProps" >
          <el-form-item :label="$t('owner.phone')" prop="phone" >
            <el-input v-model="dataEditionForm.phone" />
          </el-form-item>
        </el-col>
        <el-col v-bind="layoutProps" >
          <el-form-item :label="$t('owner.wechat')" prop="wechat" >
            <el-input v-model="dataEditionForm.wechat" />
          </el-form-item>
        </el-col>
        <el-col v-bind="layoutProps" >
          <el-form-item :label="$t('owner.idCardNum')" prop="id_card" >
            <el-input v-model="dataEditionForm.id_card" />
          </el-form-item>
        </el-col>
        <el-col v-bind="layoutProps" >
          <el-form-item :label="$t('owner.address')" prop="address" >
            <el-cascader
              :options="areaData"
              v-model="dataEditionForm.address"
              expand-trigger="hover"
              @change="() => null"/>
          </el-form-item>
        </el-col>
        <el-col v-bind="layoutProps" >
          <el-form-item :label="$t('customerIdentity.identity')" prop="identity_id" >
            <el-select v-model="dataEditionForm.identity_id" >
              <el-option
                v-for="(item) in availableIdentity"
                :key="item.id"
                :label="$t(`customerIdentity.${item.label}`)"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 提交相关按钮 -->
      <div class="property-owners-edit__form-actions" >
        <el-button type="info" @click="handleReset" >
          {{ $t('reset') }}
        </el-button>
        &nbsp;
        <el-button type="primary" @click="handleSubmit" >
          {{ $t('update') }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validateEmail, requiredWithoutAll } from '@/utils/validate'
import { filterObjEmptyVal } from '@/utils'
import { createNamespacedHelpers } from 'vuex'
import areaDataStorage from '@/utils/areaDataStorage'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('propertyOwner')
export default {
  name: 'PropertyOwnersEditForm',
  data() {
    return {
      layoutProps: { xs: 24, sm: 12, md: 12, lg: 8, xl: 8 },
      formRules: {
        surname: [
          {
            validator: (rule, val, callback) => {
              if (!requiredWithoutAll(val, this.dataEditionForm.name)) {
                callback(new Error(this.$t('owner.requiredSurname')))
              }
              callback()
            }
          }
        ],
        email: [
          {
            validator: (rule, val, callback) => {
              const form = this.dataEditionForm
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
              const form = this.dataEditionForm
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
              const form = this.dataEditionForm
              if (!requiredWithoutAll(val, form.email, form.wechat)) {
                callback(new Error(this.$t('owner.requiredPhone')))
              }
              callback()
            }
          }
        ]
      },
      areaData: areaDataStorage()
    }
  },
  computed: {
    ...mapState(['dataEditionForm', 'availableIdentity'])
  },
  methods: {
    ...mapActions([
      'updateOwner'
    ]),
    ...mapMutations([
      'setDataEditionDialogVisible',
      'setDataEditionForm'
    ]),
    handleReset() {
      // this.$refs.form.resetFields()
      const originOwnerData = this.$store.state.propertyOwner.owners.data.find(item => {
        return item.id === this.dataEditionForm.id
      })
      this.setDataEditionForm(originOwnerData)
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          let formData = JSON.parse(JSON.stringify(this.dataEditionForm))
          formData = filterObjEmptyVal(formData, [null, ''])
          this.updateOwner(formData).finally(() => {
            this.$message({
              message: this.$t('updateSuccess'),
              type: 'success'
            })
            this.setDataEditionDialogVisible({ visible: false })
            loading.close()
          })
        }
      })
    }
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
