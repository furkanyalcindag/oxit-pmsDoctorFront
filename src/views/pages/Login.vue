<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm name="login-form" >
                  <h1>Giriş Yap</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CInput
                    placeholder="E-mail"
                    autocomplete="username email"
                    v-model="user.username"
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
                      <CButton color="link" class="px-0">Şifremi Unuttum</CButton>
                      <CButton color="link" class="d-lg-none">Register now!</CButton>
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
                <h2>OXIT BİLİŞİM TEKNOLOJİLERİ</h2>
                <p>Servis Yazılımı</p>

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

export default {
  name: 'Login',
  data(){
    return {
      user: new User("","","","","",""),
      loading: false,
      message:''
    };
  },
  computed:{
    loggedIn(){
      if(this.$store.state.auth!=null&&this.$store.state.auth.status!=null)
        return this.$store.state.auth.status.loggedIn;
      else
        return null
    }
  },
  created() {
   /* if (this.loggedIn) {
      this.$router.push('/dashboard');
    }*/
  },
  methods: {
    handleLogin() {
      //console.log(this.$store);
      this.loading = true;

        if (this.user.username && this.user.password) {
        
          
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/dashboard');
            },
            error => {
              console.log(error.response);
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
     
    }
  }
};

</script>
