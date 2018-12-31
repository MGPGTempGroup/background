<template>
  <div class="multiple-datepicker" >
    <div
      v-for="(item, index) in datetime"
      :key="index"
      class="multiple-datepicker__item">
      <el-date-picker
        v-model="datetime[index]"
        :range-separator="$t('to')"
        :start-placeholder="$t('startDate')"
        :end-placeholder="$t('endDate')"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        align="right" />
      <el-button
        type="danger"
        size="mini"
        class="multiple-datepicker__delete-btn"
        @click="handleDelete(index)">
        <i class="fa fa-trash" />
      </el-button>
    </div>
    <el-button
      type="primary"
      class="multiple-datepicker__add-btn"
      @click="handleAdd">
      {{ $t('add') }}
    </el-button>
  </div>
</template>

<script>
import local from './local'
export default {
  name: 'MultipleDatePicker',
  model: {
    prop: 'datetime',
    event: 'input'
  },
  props: {
    datetime: {
      type: Array,
      default: () => [[]]
    }
  },
  created() {
    this.$i18n.mergeLocaleMessage('en', local.en)
    this.$i18n.mergeLocaleMessage('zh', local.zh)
  },
  methods: {
    handleAdd() {
      this.$emit('input', this.datetime.concat([[]]))
    },
    handleDelete(index) {
      this.$emit('input', this.datetime.filter((item, i) => i !== index))
    }
  }
}
</script>

<style scoped lang="scss" >
  .multiple-datepicker {
    position: relative;
    display: inline-block;
    margin-top: -7px;
    &__item {
      margin-top: 7px;
    }
    &__add-btn {
      margin-top: 10px;
    }
    &__delete-btn {
    }
  }
</style>
