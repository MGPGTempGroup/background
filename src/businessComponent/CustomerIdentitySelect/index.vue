<template>
  <div class="customer-identity-select" >
    <el-select
      v-model="values"
      :placeholder="$t('selectByIdentityPlaceholder')"
      v-bind="extraElSelectOpts"
      filterable>
      <el-option
        v-for="(item, index) in availableIdentities"
        :key="index"
        :label="$t(`customerIdentity.${item.label}`)"
        :value="item.value" />
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'CustomerIdentitySelect',
  model: {
    prop: 'identities',
    event: 'change'
  },
  props: {
    identities: {
      required: true,
      validator(value) {
        if (value instanceof Array || ['string', 'number', 'undefined'].includes(typeof value)) {
          return true
        }
        return false
      }
    },
    extraElSelectOpts: {
      type: Object,
      default: () => ({
        multiple: true
      })
    }
  },
  data() {
    return {
      availableIdentities: [
        { label: 'landlord', value: 1 },
        { label: 'vendor', value: 4 },
        { label: 'other', value: 5 },
        { label: 'tenant', value: 2 },
        { label: 'purchaser', value: 3 }
      ]
    }
  },
  computed: {
    values: {
      get() {
        return this.identities
      },
      set(identities) {
        this.$emit('change', identities)
      }
    }
  },
  watch: {
    values: {
      handler(identities) {
        this.$emit('change', identities)
      }
    }
  }
}
</script>
