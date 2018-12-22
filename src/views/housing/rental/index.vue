<template>
  <div class="lease__container" >
    <el-tabs type="border-card">
      <el-tab-pane :label="$t('house.houseManagement')">
        <rental-houses />
      </el-tab-pane>
      <el-tab-pane :label="$t('house.inspections')">
        <rental-house-inspections />
      </el-tab-pane>
    </el-tabs>
    <rental-house-details-dialog/>
  </div>
</template>

<script>
import RentalHouses from './houses/index'
import RentalHouseInspections from './inspections'
import RentalHouseDetailsDialog from './houses/details'
export default {
  name: 'Lease',
  components: {
    RentalHouses,
    RentalHouseInspections,
    RentalHouseDetailsDialog
  }
}
</script>

<style scoped lang="scss" >
  .lease {
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
