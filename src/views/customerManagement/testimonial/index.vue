<template>
  <div class="testimonials">
    <el-card>
      <div slot="header" class="property-owners__list-header" >
        <h2 style="margin: 0px;" >
          <i class="fa fa-list" />
          &nbsp;
          {{ $t('testimonial.tableTitle') }}
        </h2>
      </div>
      <el-table
        v-loading="testimonialsTableLoading"
        :data="testimonials.data">
        <el-table-column :label="$t('id')" prop="id" />
        <el-table-column :label="$t('surname')" prop="surname" >
          <template slot-scope="scope" >
            {{ scope.row.surname || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('name')" prop="name" >
          <template slot-scope="scope" >
            {{ scope.row.name || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('phone')" prop="phone" >
          <template slot-scope="scope" >
            {{ scope.row.phone || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('email')" prop="email" >
          <template slot-scope="scope" >
            {{ scope.row.email || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('testimonial.comment')" prop="comment" >
          <template slot-scope="scope" >
            {{ scope.row.comment || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('testimonial.starLevel')" prop="comment" >
          <template slot-scope="scope" >
            {{ scope.row.star_level || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('customerIdentity.identity')" prop="identity" >
          <template slot-scope="scope" >
            {{ scope.row.identity ? $t(`customerIdentity.${scope.row.identity.name.toLowerCase()}`) : $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('testimonial.comment')" prop="comment" >
          <template slot-scope="scope" >
            {{ scope.row.comment || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('createdAt')" prop="created_at" >
          <template slot-scope="scope" >
            {{ scope.row.created_at || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('updatedAt')" prop="updatedAt" >
          <template slot-scope="scope" >
            {{ scope.row.updated_at || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('testimonial.displayState') + ` (${$t('testimonial.clickToggleStatus')})`"
          prop="is_show"
          align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleUpdateDisplayState(scope.row)" >
              {{ scope.row.is_show ? $t('show') : $t('hide') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('serviceTestimonial')
export default {
  name: 'Testimonial',
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'testimonials',
      'testimonialsTableLoading'
    ])
  },
  async created() {
    try {
      await this.fetchTestimonials()
    } catch (err) {
      this.$message({
        type: 'error',
        message: this.$t('getDataError')
      })
    }
  },
  methods: {
    ...mapMutations([
      'setTestimonialsTableLoading'
    ]),
    ...mapActions([
      'fetchTestimonials',
      'updateTestimonialDisplayState'
    ]),
    /**
     * 切换推荐信显示状态
     */
    async handleUpdateDisplayState(testimonial) {
      console.log(testimonial)
      this.setTestimonialsTableLoading(true)
      try {
        await this.updateTestimonialDisplayState({
          id: testimonial.id,
          is_show: !testimonial.is_show
        })
        this.$message({
          type: 'success',
          message: this.$t('updateSuccess')
        })
      } catch (err) {
        this.$message({
          type: 'error',
          message: this.$t('updateError')
        })
      } finally {
        this.setTestimonialsTableLoading(false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .testimonials {
    padding: 20px;
    &__list-header {
      position: relative;
    }
  }
</style>
