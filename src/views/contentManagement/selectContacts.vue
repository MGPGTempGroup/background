<template>
  <div class="select-contacts" >
    <h2>{{ $t('contentMGT.selectContacts') }}</h2>
    <div class="select-contacts__input-wrapper" >
      <span>{{ $t('contentMGT.searchContacts') }}：</span>
      <el-select
        v-model="agents"
        :remote-method="remoteMethod"
        multiple
        filterable
        remote
        reserve-keyword />
    </div>
    <el-row :gutter="12" tag="ul" class="select-contacts__selected-agents-list">
      <el-col v-bind="agentsItemLayoutProps" tag="li" class="select-contacts__selected-agents-item" >
        <el-card :header="'Jerry'" shadow="hover" >
          <img src="https://www.melbournerealestate.com.au/wp-content/uploads/2015/03/Ella-2.png" alt="">
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'SelectContacts',
  data() {
    return {
      agentsItemLayoutProps: { xs: 12, sm: 12, md: 8, lg: 6, xl: 4 },
      agents: []
    }
  },
  methods: {
    remoteMethod(queryString) {
      // change options
    }
  }
}
</script>

<style lang="scss" scoped >
  @import './common.scss';
  .select-contacts {
    &__selected-agents-list {
      padding: 0px;
      list-style: none;
    }
    &__selected-agents-item {
      cursor: pointer;
    }
  }
  img {
    width: 100%;
  }
</style>

<style lang="scss" >
  .el-select {
    width: 280px;
  }
</style>

