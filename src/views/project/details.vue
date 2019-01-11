<template>
  <el-dialog
    :title="$t('project.details')"
    :visible.sync="dialogVisible"
    width="50%"
    center
    lock-scroll
    top="40px"
    append-to-body>
    <div v-if="Object.keys(projectDetailsData).length" class="project-details" >
      <el-tabs tab-position="left" >
        <el-tab-pane :label="$t('project.basicInformation')" class="project-details__tab-content">
          <el-row
            :gutter="24"
            class="project-details__tab-content-inner project-details__basic-info">
            <el-col v-bind="layoutItemProps" tag="dl" >
              <dt>{{ $t('id') }}</dt>
              <dd>{{ projectDetailsData.id }}</dd>
              <dt>{{ $t('project.name') }}</dt>
              <dd>{{ projectDetailsData.name || $t('noData') }}</dd>
              <dt>{{ $t('project.address') }}</dt>
              <dd>
                <template v-if="Array.isArray(projectDetailsData.address)" >
                  {{ projectDetailsData.address.join('/') }}
                </template>
                <template v-else >
                  {{ $t('noData') }}
                </template>
              </dd>
              <dt>{{ $t('project.location') }}</dt>
              <dd>{{ projectDetailsData.location || $t('noData') }}s</dd>
              <dt>{{ $t('project.description') }}</dt>
              <dd>{{ projectDetailsData.description || $t('noData') }}</dd>
              <dt>{{ $t('project.yearBuilt') }}</dt>
              <dd>{{ projectDetailsData.year_built || $t('noData') }}</dd>
              <dt>{{ $t('project.estimatedCompletionDate') }}</dt>
              <dd>{{ projectDetailsData.estimated_completion_date || $t('noData') }}</dd>
              <dt>{{ $t('project.price') }}</dt>
              <dd>
                ${{ projectDetailsData.min_price }} ~ ${{ projectDetailsData.max_price }}
              </dd>
              <dt>{{ $t('project.agents') }}</dt>
              <dd>
                <template v-if="projectDetailsData.agents.data.length" >
                  <el-tag
                    v-for="item in projectDetailsData.agents.data"
                    :key="item.id"
                    style="margin-right: 3px;">
                    {{ item.name + ' ' + item.surname }}
                  </el-tag>
                </template>
                <template v-else >
                  {{ $t('noData') }}
                </template>
              </dd>
              <dt>{{ $t('project.owner') }}</dt>
              <dd>
                <el-tag v-if="projectDetailsData.owner" >
                  {{ projectDetailsData.owner.name + ' ' + projectDetailsData.owner.surname }}
                </el-tag>
                <template v-else >
                  {{ $t('noData') }}
                </template>
              </dd>
            </el-col>
            <el-col v-bind="layoutItemProps" tag="dl" >
              <dt>{{ $t('project.productType') }}</dt>
              <dd>
                <template v-if="projectDetailsData.productTypes.data.length" >
                  <el-tag
                    v-for="item in projectDetailsData.productTypes.data"
                    :key="item.id"
                    style="margin-right: 3px;">
                    {{ item.name }}
                  </el-tag>
                </template>
                <template v-else >
                  {{ $t('noData') }}
                </template>
              </dd>
              <dt>{{ $t('project.status') }}</dt>
              <dd>
                <el-tag>
                  {{ projectStatus.find(item => item.value == projectDetailsData.status).label }}
                </el-tag>
              </dd>
              <dt>{{ $t('project.isNewDevelopment') }}</dt>
              <dd>
                <el-tag v-if="projectDetailsData.is_new_development" >
                  {{ $t('yes') }}
                </el-tag>
                <el-tag v-else >
                  {{ $t('no') }}
                </el-tag>
              </dd>
              <dt>{{ $t('project.isPastSuccess') }}</dt>
              <dd>
                <el-tag v-if="projectDetailsData.is_past_success" >
                  {{ $t('yes') }}
                </el-tag>
                <el-tag v-else >
                  {{ $t('no') }}
                </el-tag>
              </dd>
              <dt>{{ $t('project.creator') }}</dt>
              <dd>
                {{ projectDetailsData.creator.name }}
              </dd>
              <dt>{{ $t('createdAt') }}</dt>
              <dd>
                {{ projectDetailsData.created_at }}
              </dd>
              <dt>{{ $t('updatedAt') }}</dt>
              <dd>
                {{ projectDetailsData.updated_at }}
              </dd>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane :label="$t('project.introduction')" class="project-details__tab-content">
          <div
            class="project-details__tab-content-inner project-details__introduction"
            v-html="projectDetailsData.introduction">
            {{ $t('noData') }}
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('project.pictures')" class="project-details__tab-content">
          <el-row
            :gutter="24"
            class="project-details__tab-content-inner project-details__photo-and-video" >
            <template v-if="projectDetailsData.broadcast_pictures && projectDetailsData.broadcast_pictures.length" >
              <el-col
                v-for="item in projectDetailsData.broadcast_pictures"
                v-bind="{ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }"
                :key="item.index">
                <el-card
                  style="width: 100%; cursor: pointer;"
                  body-style="padding: 5px;"
                  shadow="hover" >
                  <img :src="item.url" style="width: 100%;" >
                </el-card>
              </el-col>
            </template>
            <template v-else >
              {{ $t('noData') }}
            </template>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">{{ $t('confirm') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('project')
export default {
  name: 'ProjectDetails',
  data() {
    return {
      layoutItemProps: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 }
    }
  },
  computed: {
    ...mapState([
      'projectDetailsDialogVisible',
      'projectDetailsData',
      'projectStatus'
    ]),
    dialogVisible: {
      get() {
        return this.projectDetailsDialogVisible
      },
      set(visible) {
        this.setProjectDetailsDialogVisible(visible)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setProjectDetailsDialogVisible'
    ])
  }
}
</script>

<style scoped lang="scss" >
  @import '@/styles/dl.scss';
  .project-details {
    &__tab-content {
      padding-left: 10px;
    }
    &__tab-title {
      margin: 10px 0px;
      font-size: 17px;
    }
    &__tab-content-inner {}
    &__basic-info {}
    &__photo-and-video {
      margin-top: 18px;
    }
    &__property-type-list {
      margin-right: -10px;
      &-item {
        margin-right: 10px;
      }
    }
  }
</style>
