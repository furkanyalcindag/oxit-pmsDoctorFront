<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CAlert color="danger" :show="isError">
                   Bu bilgilerle aktif bir hesap bulunamadı
                </CAlert>
                <CForm name="login-form" >
                  <h1>Giriş Yap</h1>
                  <CInput
                    placeholder="E-mail"
                    autocomplete="username email"
                    v-model="user.username"
                    required
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                    placeholder="Şifre"
                    type="password"
                    autocomplete="curent-password"
                    v-model="user.password"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton @click="handleLogin" color="primary" class="px-4">Giriş</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton @click="redirectUser" color="link" class="px-0">Şifremi Unuttum</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <img class="menu-logo" v-bind:src="settings.logo">
      
                  <div class="info">
                    <span class="mr-1">Powered by</span>
                    <a class="text-white font-weight-bold" href="https://www.oxit.com.tr" target="_blank">OXIT</a>
                  </div>
                </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>              
      </CRow>
    </CContainer>
  </div>
</template>

<script>

import User from '../../models/user';
import ServiceService from "@/services/service.service";
import AuthService from "@/services/auth.service";
import UserService from "../../services/UserService"
import { mapState } from 'vuex'
export default {
  name: 'Login',
  data(){
    return {
      user: new User("","","","","",""),
      loading: false,
      settings:null,
      message:'',
      isError:false,
    };
  },
  computed:{
    loggedIn(){
      if(this.$store.state.auth!=null&&this.$store.state.auth.status!=null)
        return this.$store.state.auth.status.loggedIn;
      else
        return null
    },
  },
  mounted(){
      this.$store.dispatch('getSettings').then(result=>{
        this.settings = result
    })
  },
  created() {
   /* if (this.loggedIn) {
      this.$router.push('/dashboard');
    }*/
  },
  methods: {
    errorHide() {
      setTimeout(() => (this.isError = false), 5000);
    },
    handleLogin() {
      //console.log(this.$store);
      const user_group = UserService.getUserGroup()
      const groups = {
          admin:"Admin",
          serviceman:"Tamirci",
          customer:"Customer",
          accountant:"Muhasebe"
      }

      var dashboard_link = ""
      switch (user_group) {
          case groups.admin:
              dashboard_link = "admin-dashboard"
              break;
          case groups.customer:
              dashboard_link = "customer-dashboard"
              break;
          case groups.serviceman:
              dashboard_link = "serviceman-dashboard"
              break;
          case groups.accountant:
              dashboard_link = "accountant-dashboard"
              break;
          
          default:
              break;
      }

      this.loading = true;

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push(`/${dashboard_link}`);
            },
            error => { 
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.isError = false;
              this.isError = true;
              this.errorHide();
              
            }
          );
        }
     
    },
    redirectUser(){
      this.$router.push("/pages/forgot-password")
    }
  }
};

</script>
<style scoped>
.menu-logo{
  width: 270px;
}
.info{
  margin-left: auto;
  padding-top: 30px;
}
</style>