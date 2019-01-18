<template>
  <el-dialog
    :title="$t('details')"
    :visible.sync="dialogVisible"
    width="50%"
    center
    lock-scroll
    top="40px"
    append-to-body>
    <div v-if="Object.keys(memberDetailsData).length" class="member-details" >
      <el-tabs tab-position="left" >
        <el-tab-pane :label="$t('company.basicInfo')" class="member-details__tab-content">
          <el-row
            :gutter="24"
            class="member-details__tab-content-inner member-details__basic-info">
            <el-col v-bind="layoutItemProps" tag="dl" >
              <dt>{{ $t('id') }}</dt>
              <dd>{{ memberDetailsData.id }}</dd>
              <dt>{{ $t('name') }}</dt>
              <dd>{{ memberDetailsData.name || $t('noData') }}</dd>
              <dt>{{ $t('surname') }}</dt>
              <dd>{{ memberDetailsData.surname || $t('noData') }}</dd>
              <dt>{{ $t('phone') }}</dt>
              <dd>{{ memberDetailsData.phone || $t('noData') }}</dd>
              <dt>{{ $t('email') }}</dt>
              <dd>{{ memberDetailsData.email || $t('noData') }}</dd>
              <dt>{{ $t('company.positions') }}</dt>
              <dd style="margin-left: -5px;" >
                <template v-if="memberDetailsData.positions.data.length" >
                  <el-tag
                    v-for="position in memberDetailsData.positions.data"
                    :key="position.id"
                    style="margin-left: 5px; margin-bottom: 5px;">
                    {{ position.name }}
                  </el-tag>
                </template>
                <template v-else >
                  {{ $t('noData') }}
                </template>
              </dd>
            </el-col>
            <el-col v-bind="layoutItemProps" tag="dl" >
              <dt>{{ $t('company.googlePlusHomePage') }}</dt>
              <dd>
                <a
                  v-if="memberDetailsData.google_plus_homepage"
                  :href="memberDetailsData.google_plus_homepage"
                  target="_blank">
                  {{ memberDetailsData.google_plus_homepage }}
                </a>
                <span v-else>{{ $t('noData') }}</span>
              </dd>
              <dt>{{ $t('company.linkinHomePage') }}</dt>
              <dd>
                <a
                  v-if="memberDetailsData.linkin_homepage"
                  :href="memberDetailsData.linkin_homepage"
                  target="_blank">
                  {{ memberDetailsData.linkin_homepage }}
                </a>
                <span v-else>{{ $t('noData') }}</span>
              </dd>
              <dt>{{ $t('createdAt') }}</dt>
              <dd>{{ memberDetailsData.created_at || $t('noData') }}</dd>
              <dt>{{ $t('updatedAt') }}</dt>
              <dd>{{ memberDetailsData.updated_at || $t('noData') }}</dd>
              <!-- <dt>{{ $t('AdministratorOrNot') }}</dt>
              <dd>
                <el-tag v-if="memberDetailsData.admin_user_id" type="primary" >
                  {{ $t('yes') }}
                </el-tag>
                <el-tag v-else type="warning" >
                  {{ $t('no') }}
                </el-tag>
              </dd> -->
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane :label="$t('company.introduction')" class="member-details__tab-content">
          <div
            class="member-details__tab-content-inner member-details__introduction"
            v-html="memberDetailsData.introduction">
            {{ $t('noData') }}
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('photo')" class="member-details__tab-content">
          <template v-if="memberDetailsData.photo" >
            <img :src="memberDetailsData.photo" alt="">
          </template>
          <template v-else >
            {{ $t('noData') }}
          </template>
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
const { mapState, mapMutations } = createNamespacedHelpers('company')
export default {
  name: 'MemberDetails',
  data() {
    return {
      layoutItemProps: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 }
    }
  },
  computed: {
    ...mapState([
      'memberDetailsDialogVisible',
      'memberDetailsData'
    ]),
    dialogVisible: {
      get() {
        return this.memberDetailsDialogVisible
      },
      set(visible) {
        this.setMemberDetailsDialogVisible(visible)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setMemberDetailsDialogVisible'
    ])
  }
}
</script>

<style scoped lang="scss" >
  @import '@/styles/dl.scss';
  .member-details {
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
