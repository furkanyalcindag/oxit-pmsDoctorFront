<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CAlert color="success" :show="isSuccess">
                    Yeni Parolanız mail adresinize başarıyla gönderildi
                  </CAlert>

                  <CAlert color="danger" :show="isError">
                    Bu e-mail ile kayıtlı kullanıcı bulunamadı
                  </CAlert>
                <CForm name="login-form" >
                  <h1>Yeni Şifre Al</h1>
                  <p>Lütfen Sisteme Kayıtlı Hesabınızın E-posta Adresini Giriniz.</p>
                  <CInput
                    placeholder="E-mail"
                    autocomplete="username email"
                    v-model="email"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton @click="handlePasswordRegen" color="primary" class="px-4">Onayla</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton @click="redirectUser" color="link" class="px-0">Giriş Yap</CButton>
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
import AuthService from "@/services/auth.service";
export default {
  name: 'Login',
  data(){
    return {
      email:null,
      loading: false,
      isError:false,
      isSuccess:false,
      settings:null,
    };
  },
  mounted(){
      this.$store.dispatch('getSettings').then(result=>{
        this.settings = result
    })
  },
  methods: {
    errorHide() {
      setTimeout(() => (this.isError = false), 5000);
    },
    successHide() {
      setTimeout(() => (this.isSuccess = false), 5000);
    },
     async handlePasswordRegen(){
      const response = (await AuthService.regeneratePassword(this.email));
      if(response.status == 200){
        this.isSuccess = false;
        this.isSuccess = true;
        this.successHide();
      } else {
        this.isError = false;
        this.isError = true;
        this.errorHide();
      }
    },
    redirectUser(){
      this.$router.push("/pages/login")
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