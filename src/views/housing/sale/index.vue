<template>
  <div class="sale__container" >
    <el-tabs type="border-card">
      <el-tab-pane :label="$t('house.houseManagement')">
        <sale-houses />
      </el-tab-pane>
      <el-tab-pane :label="$t('house.inspections')">
        <sale-house-inspections />
      </el-tab-pane>
    </el-tabs>
    <sale-house-details-dialog/>
  </div>
</template>

<script>
import SaleHouses from './houses/index'
import SaleHouseInspections from './inspections'
import SaleHouseDetailsDialog from './houses/details'
export default {
  name: 'Sale',
  components: {
    SaleHouses,
    SaleHouseInspections,
    SaleHouseDetailsDialog
  }
}
</script>

<style scoped lang="scss" >
  .sale {
    &__container {
      padding: 22px;
    }
  }
</style>

<style lang="scss" >
  input[type=number] {
    -moz-appearance: textfield;
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
</style>

