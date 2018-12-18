<template>
  <div class="areas" >
    <div class="areas__header" >
      <h2 class="areas__title" >{{ $t('contentMGT.editServiceAreas') }}</h2>
      <el-button type="primary" class="areas__add-btn" @click="createArea" >
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
                @click="showEditDialog(item)">
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
    <!-- 详情 dialog -->
    <details-dialog/>
    <!-- 编辑 dialog -->
    <edit-dialog/>
    <!-- 创建dialog -->
    <create-dialog/>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import UploadImage from '@/components/UploadImage'
import DetailsDialog from './details'
import EditDialog from './edit'
import CreateDialog from './create'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('service')
export default {
  name: 'AreasList',
  components: {
    Tinymce, UploadImage, DetailsDialog, EditDialog, CreateDialog
  },
  data() {
    return {
      itemLayoutProps: { xs: 12, sm: 12, md: 8, lg: 6, xl: 4 },
      areaDetailsCurrEditId: null,
      content: this.editorContent,
      imageList: [],
      createAreaContent: '',
      editAreaContent: '',
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
      'setServiceAreaDetailsData',
      'setEditServiceAreaDialogVisible',
      'setEditServiceAreaData',
      'setCreateServiceAreaDialogVisible'
    ]),
    ...mapActions([
      'fetchAreasWeServe'
    ]),
    createArea() {
      this.setCreateServiceAreaDialogVisible(true)
    },
    showEditDialog(areaData) {
      this.setEditServiceAreaData(areaData)
      this.setEditServiceAreaDialogVisible(true)
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

