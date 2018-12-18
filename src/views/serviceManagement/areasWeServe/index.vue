<template>
  <div class="areas" >
    <div class="areas__header" >
      <h2 class="areas__title" >{{ $t('contentMGT.editServiceAreas') }}</h2>
      <el-button type="primary" class="areas__add-btn" @click="createAreaDialogVisible = true" >
        {{ $t('create') }}
      </el-button>
    </div>
    <!-- 列表 -->
    <el-row
      v-if="areasWeServe.length"
      :gutter="12"
      tag="ul"
      class="areas__list" >
      <el-col
        v-for="(item, index) in areasWeServe"
        :key="index"
        v-bind="itemLayoutProps"
        tag="li"
        class="areas__item">
        <el-card
          class="areas__item-card"
          shadow="hover"
          body-style="padding: 0px;">
          <img :src="item.picture" class="areas__item-img" alt="">
          <div style="padding: 14px;" >
            <p style="margin: 5px; display: inline-block; vertical-align: center;" >{{ item.name }}</p>
            <div class="areas__item-actions" >
              <el-button
                type="text"
                @click="handleEditArea(item)">
                {{ $t('edit') }}
              </el-button>
              <el-button
                type="text"
                @click="showDetails(item)">
                {{ $t('details') }}
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <h3
      v-else
      style="text-align: center; letter-spacing: 1px; margin-top: 30px; color: rgba(0,0,0,.3)">
      {{ $t('noData') }}
    </h3>
    <!-- 创建Dialog -->
    <el-dialog
      :title="$t('contentMGT.createServiceArea')"
      :visible.sync="createAreaDialogVisible"
      fullscreen>
      <h2>{{ $t('contentMGT.areaName') }}</h2>
      <el-input style="width: 200px;" />
      <h2 style="margin-top: 20px;" >{{ $t('contentMGT.editImage') }}</h2>
      <div class="content__upload-img-wrapper" >
        <upload-image :image-list.sync="imageList" />
      </div>
      <h2 style="margin-top: 30px;" >{{ $t('contentMGT.editMainContent') }}</h2>
      <div class="content__editor-wrapper" >
        <tinymce :height="600" v-model="createAreaContent" />
      </div>
      <div class="content__actions" >
        <el-button type="primary" >
          {{ $t('create') }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 编辑 dialog -->
    <el-dialog
      :visible.sync="editAreaDialogVisible"
      :title="$t('contentMGT.editServiceAreaDetails')"
      fullscreen>
      <h2>{{ $t('contentMGT.editImage') }}</h2>
      <div class="content__upload-img-wrapper" >
        <upload-image :image-list.sync="imageList" />
      </div>
      <h2 style="margin-top: 30px;" >{{ $t('contentMGT.editMainContent') }}</h2>
      <div class="areas__editor-wrapper" >
        <tinymce :height="600" v-model="content" />
      </div>
      &nbsp;&nbsp;
      <!-- <div class="areas__item-actions" >
        <el-button type="info" >{{ $t('reset') }}</el-button>
        <el-button type="primary" @click="onUpdate" >{{ $t('update') }}</el-button>
      </div> -->
    </el-dialog>
    <!-- 详情 dialog -->
    <details-dialog/>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import UploadImage from '@/components/UploadImage'
import detailsDialog from './details'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('service')
export default {
  name: 'AreasList',
  components: {
    Tinymce, UploadImage, detailsDialog
  },
  data() {
    return {
      itemLayoutProps: { xs: 12, sm: 12, md: 8, lg: 6, xl: 4 },
      areaDetailsCurrEditId: null,
      content: this.editorContent,
      imageList: [],
      createAreaContent: '',
      editAreaContent: '',
      editAreaDialogVisible: false,
      createAreaDialogVisible: false
    }
  },
  computed: {
    ...mapState([
      'areasWeServe'
    ])
  },
  created() {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.fetchAreasWeServe()
      .finally(() => {
        loading.close()
      })
  },
  methods: {
    ...mapMutations([
      'setServiceAreaDetailsDialogVisible',
      'setServiceAreaDetailsData'
    ]),
    ...mapActions([
      'fetchAreasWeServe'
    ]),
    handleEditArea(id) {
      this.editAreaContent = ''
      this.editAreaDialogVisible = true
    },
    onUpdate() {
      this.$confirm(this.$t('contentMGT.confirmUpdateTips'), this.$t('tips'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel')
      }).then(() => {}).catch(action => { })
    },
    createArea() {
      this.createAreaDialogVisible = true
    },
    showDetails(areaData) {
      console.log(areaData)
      this.setServiceAreaDetailsData(areaData)
      this.setServiceAreaDetailsDialogVisible(true)
    }
  }
}
</script>

<style lang="scss" scoped >
.areas {
  @import '../common.scss';
  padding: 20px;
  &__header {
    position: relative;
  }
  &__select-contacts-wrapper {
    margin-top: 30px;
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  &__add-btn {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
  }
  &__list {
    list-style: none;
    margin: 0px;
    padding: 0px;
  }
  &__item {
    margin-bottom: 30px;
    cursor: pointer;
    &-actions {
      display: flex;
      justify-content: flex-end;
    }
  }
  &__item-img {
    width: 100%;
  }
}
</style>

