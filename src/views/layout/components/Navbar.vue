<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <error-log class="errLog-container right-menu-item"/>

        <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
          <screenfull class="screenfull right-menu-item"/>
        </el-tooltip>

        <lang-select class="international right-menu-item"/>

        <el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
          <theme-picker class="theme-switch right-menu-item"/>
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar || defaultAvatar" class="user-avatar">
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <router-link to="/personal/information">
            <el-dropdown-item divided>
              {{ $t('navbar.personalInfo') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <div @click="changePasswordDialogVisible = true" >{{ $t('navbar.changePassword') }}</div>
          </el-dropdown-item>
          <el-dropdown-item>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
      :title="$t('navbar.changePassword')"
      :visible.sync="changePasswordDialogVisible"
      width="350px"
      append-to-body
      custom-class="change-password-dialog"
      @closed="handleChangePasswordDialogClosed">
      <el-form :model="changePasswordForm" label-position="top" >
        <el-form-item :label="$t('oldPassword')" >
          <el-input v-model="changePasswordForm.old_pwd" :placeholder="$t('enterTheOldPassword')" type="password" clearable />
        </el-form-item>
        <el-form-item :label="$t('newPassword')" >
          <el-input v-model="changePasswordForm.new_pwd" :placeholder="$t('enterAtLeast6Characters')" type="password" clearable />
        </el-form-item>
        <el-form-item :label="$t('confirmPassword')" >
          <el-input v-model="changePasswordForm.new_pwd_confirmation" :placeholder="$t('confirmTheNewPassword')" type="password" clearable />
        </el-form-item>
        <div class="change-password-dialog__actions" >
          <el-button type="primary" @click="confirmChangePassword" >{{ $t('confirm') }}</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import defaultAvatar from '@/assets/defaultAvatar.png'
import { changePassword as changePasswordAPI } from '@/api/login'

const CHANGE_PASSWORD_FORM = () => ({
  old_pwd: '',
  new_pwd: '',
  new_pwd_confirmation: ''
})

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker
  },
  data() {
    return {
      defaultAvatar,
      changePasswordDialogVisible: false,
      changePasswordForm: CHANGE_PASSWORD_FORM()
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    handleChangePasswordDialogClosed() {
      this.changePasswordForm = CHANGE_PASSWORD_FORM()
    },
    async confirmChangePassword() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        await changePasswordAPI({
          old_pwd: this.changePasswordForm.old_pwd,
          new_pwd: this.changePasswordForm.new_pwd,
          new_pwd_confirmation: this.changePasswordForm.new_pwd_confirmation
        })
      } catch (err) {
        loading.close()
        this.$message({
          type: 'error',
          message: this.$t('updateFailed')
        })
        return
      }
      loading.close()
      this.$message({
        type: 'success',
        message: this.$t('changePasswordSuccessMessage')
      })
      this.changePasswordDialogVisible = false
      setTimeout(() => {
        this.$store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      }, 3000)
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.change-password-dialog {
  .el-dialog__body {
    padding-top: 8px !important;
  }
  &__actions {
    display: flex;
    justify-content: center;
    margin-top: 28px;
  }
}
</style>

