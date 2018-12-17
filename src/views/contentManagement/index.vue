<template>
  <div class="service__container" >
    <!-- 服务类别选择 -->
    <div
      class="service__selector">
      <h2>{{ $t('selectPage') }}</h2>
      <el-radio-group v-model="currServiceName" >
        <el-radio-button
          v-for="(item, index) in availabelServiceNames"
          :key="index"
          :label="item" >
          {{ $t(`${snakeCase2CamelCase(item)}`) }}
        </el-radio-button>
      </el-radio-group>
    </div>
    <!-- 内容编辑预览 -->
    <div class="service">
      <!-- 编辑轮播图：boradcast_pictures -->
      <h2>{{ $t('contentMGT.editImage') }}</h2>
      <div class="service__upload-image-wrapper">
        <upload-image :image-list.sync="imageList" :max-count="10" />
      </div>
      <!-- 编辑当前服务的联系人 -->
      <div class="service__select-contacts-wrapper" >
        <h2>{{ $t('contentMGT.selectContacts') }}</h2>
        <el-select
          v-model="selectedMembersId"
          :remote-method="searchMembers"
          :loading="searchLoading"
          multiple
          filterable
          remote
          default-first-option>
          <el-option
            v-for="item in searchMemberResults"
            :key="item.id"
            :label="`${item.name} ${item.surname}`"
            :value="item.id"/>
        </el-select>
      </div>
      <!-- 编辑服务正文内容 -->
      <div class="service__rich-editor-wrapper" >
        <h2 style="margin-top: 30px;" >{{ $t('contentMGT.editMainContent') }}</h2>
        <tinymce ref="tinymce" :height="600" v-model="content"/>
      </div>
      <!-- 动作 -->
      <div class="service__actions" >
        <el-button type="info" @click="handleReset" >{{ $t('reset') }}</el-button>
        <!-- <el-button type="info" @click="updateHistoricalContent({ dialogVisible: true })" >{{ $t('contentMGT.historicalContent') }}</el-button> -->
        &nbsp;
        <el-button type="primary" @click="handleUpdate" >{{ $t('update') }}</el-button>
      </div>
      <!-- 历史内容对话框 -->
      <!-- <historical-content-dialog /> -->
    </div>
  </div>
</template>

<script>
import { searchMembersByFullName } from '@/api/company'
import { uploadImage as uploadImageAPI } from '@/api/upload'

import UploadImage from '@/components/UploadImage'
import Tinymce from '@/components/Tinymce'
import HistoricalContentDialog from './historicalContentDialog'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('content')

import { snakeCase2CamelCase } from '@/utils'
export default {
  name: 'ServiceContent',
  components: { UploadImage, Tinymce, HistoricalContentDialog },
  data() {
    return {
      content: '',
      imageList: [],
      selectedMembersId: [],
      searchMemberResults: [],
      searchLoading: false,
      contacts: []
    }
  },
  computed: {
    ...mapState([
      'availabelServiceNames',
      'currentServiceName'
    ]),
    ...mapGetters([
      'currentServiceData'
    ]),
    currServiceName: {
      get() {
        return this.currentServiceName
      },
      set(serviceName) {
        this.setCurrentServiceName(serviceName)
      }
    }
  },
  watch: {
    // 监听当前选择的服务名称，改变时重新拉取当前服务内容数据
    currentServiceName(newVal) {
      this.fetchService(newVal)
    },
    // 监听当前编辑预览的服务数据
    currentServiceData: {
      handler(data) {
        this.formatData(data)
      },
      deep: true
    }
  },
  created() {
    this.fetchService()
  },
  methods: {
    ...mapMutations([
      'setCurrentServiceName'
    ]),
    ...mapActions([
      'fetchServiceData',
      'updateService'
    ]),
    /**
     * 通过调用fetchServiceData Action拉取数据
     */
    fetchService() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.fetchServiceData({
        include: 'content'
      }).catch(() => {
        console.log('error')
      }).finally(() => {
        loading.close()
      })
    },
    // 搜索成员
    async searchMembers(queryString) {
      this.searchLoading = true
      try {
        const members = (await searchMembersByFullName(queryString)).data
        this.searchMemberResults = members.data
      } catch (err) {
        this.$message({
          type: 'error',
          message: this.$t('searchFailed')
        })
      } finally {
        this.searchLoading = false
      }
    },
    /**
     * 处理更新
     */
    handleUpdate() {
      this.$confirm(this.$t('contentMGT.confirmUpdateTips'), this.$t('tips'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel')
      }).then(async() => {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const uploadPromises = this.imageList.map((item, index) => {
          if (/^http/.test(item.dataURL)) {
            return {
              index,
              url: item.dataURL
            }
          }
          return new Promise((resolve, reject) => {
            uploadImageAPI(
              item.file
            ).then(res => {
              resolve({
                index,
                url: res.headers.location
              })
            }).catch(res => {
              reject()
            })
          })
        })
        let broadcastPictures = []
        try {
          broadcastPictures = await Promise.all(uploadPromises)
        } catch (err) {
          this.$message({
            type: 'error',
            message: this.$t('uploadFailed')
          })
          loading.close()
          return
        }
        this.updateService(
          {
            service: {
              members: this.selectedMembersId
            },
            content: {
              broadcast_pictures: broadcastPictures,
              content: this.content
            }
          }
        ).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('updateSuccess')
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: this.$t('updateFailed')
          })
        }).finally(() => {
          loading.close()
        })
      }).catch(action => {})
    },
    /**
     * 处理表单重置
     */
    handleReset() {
      this.formatData(this.currentServiceData)
    },
    /**
     * 格式化服务内容数据
     */
    formatData(serviceData) {
      if (!serviceData) {
        this.selectedMembersId = []
        this.searchMemberResults = []
        this.imageList = []
        this.content = ''
        this.$refs.tinymce.setContent('')
        return
      }
      serviceData = JSON.parse(JSON.stringify(serviceData))
      this.searchMemberResults = serviceData.members.data
      // 设置定时器防止el-select无法自动选择
      setTimeout(() => {
        this.selectedMembersId = serviceData.members.data.map(item => item.id)
      }, 0)
      if (!serviceData.content) {
        this.imageList = []
        this.content = ''
        this.$refs.tinymce.setContent('')
        return
      }
      const content = serviceData.content
      content.imageList = content.broadcast_pictures.map(item => ({ dataURL: item.url }))
      this.$refs.tinymce.setContent(content.content)
      this.imageList = content.imageList
      this.content = content.content
    },
    /**
     * 命名转换
     */
    snakeCase2CamelCase: val => snakeCase2CamelCase(val)
  }
}
</script>

<style lang="scss" scoped >
  @import './common.scss';
</style>

<style lang="scss" >
  .service {
    .el-select {
      width: 50%;
      min-width: 300px;
    }
  }
</style>
