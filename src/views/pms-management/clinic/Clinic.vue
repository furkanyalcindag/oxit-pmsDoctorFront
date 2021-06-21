<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Klinik İşlemleri
              <div class="card-header-actions">

                <CLink
                    class="card-header-action btn-minimize"
                    @click="formCollapsed = !formCollapsed"
                >
                  <CIcon
                      :name="`cil-chevron-${formCollapsed ? 'bottom' : 'top'}`"
                  />
                </CLink>

              </div>
            </CCardHeader>
            <CCollapse :show="formCollapsed">
              <CCardBody>
                <div>
                </div>
                <CRow></CRow>
                <CRow>
                  <CCol lg="6">
                    <CInput
                        label="Klinik Adı (Zorunlu Alan)"
                        description=""
                        autocomplete="autocomplete"
                        v-model="clinic.clinicName"
                    />

                    <CInput
                        label="Vergi Numarası (Zorunlu Alan)"
                        description=""
                        autocomplete="autocomplete"
                        v-model="clinic.taxNumber"
                    />

                    <CInput
                        label="Vergi Dairesi (Zorunlu Alan)"
                        description=""
                        v-model="clinic.taxOffice"
                    />

                    <CInput
                        label="Telefon Numarası (Zorunlu Alan)"
                        description=""
                        autocomplete="autocomplete"
                        v-model="clinic.telephoneNumber"
                    />
                  </CCol>

                  <CCol lg="6">

                    <CInput
                        label="Email (Zorunlu Alan)"
                        description=""
                        type="email"
                        autocomplete="email"
                        prepend="@"
                        v-model="clinic.email"
                    />


                    <CSelect
                        :options="cities"
                        label="İl (Zorunlu Alan)"
                        v-model="clinic.cityId"
                        :value.sync="clinic.cityId"

                        @change="getDistrict(clinic.cityId)"

                    />

                    <CSelect
                        :options="districts"
                        label="İlçe (Zorunlu Alan)"
                        v-model="clinic.districtId"
                        :value.sync="clinic.districtId"


                    />

                    <CTextarea
                        :rows="3"
                        label="Adres"
                        description=""
                        autocomplete="autocomplete"
                        v-model="clinic.address"
                    />

                  </CCol>


                </CRow>

                <div class="form-actions">
                  <CButton type="submit" color="primary" @click="addClinic"
                  >Kaydet
                  </CButton>

                </div>
              </CCardBody>
            </CCollapse>
          </CCard>
        </transition>
      </CCol>
    </CRow>


    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <template>
              <CCardBody>

                <CDataTable
                    :items="clinics"
                    :fields="fieldsTable"
                    column-filter
                    :border="true"
                    :items-per-page="5"
                    :activePage="4"
                    hover
                    sorter
                    pagination
                    :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
                    clickableRows

                >


                  <template #details="{ item }">
                    <CCollapse
                        :show="Boolean(item._toggled)"
                        :duration="collapseDuration"
                    >

                    </CCollapse>
                  </template>
                </CDataTable>


              </CCardBody>
            </template>
          </CCard>
        </transition>
      </CCol>
    </CRow>


    <CModal
        title="Modal title"
        color="danger"
        :show.sync="deleteModel"
    >
      Personeli silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
        <CButton @click="deleteStaff" color="success">Evet</CButton>
      </template>


    </CModal>


    <CModal
        :show.sync="staffUpdateModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="staffUpdateModal">
              <template>
                <CCardBody>

                  <div>
                    <!--                    <CAlert color="success" :show="isSuccessCar">-->
                    <!--                      Personel başarıyla kaydedildi.-->
                    <!--                    </CAlert>-->


                    <!--                    <CAlert-->
                    <!--                        v-for="(value,key) in errorsStaff"-->
                    <!--                        :key="value.message"-->
                    <!--                        color="danger"-->
                    <!--                        :show="isErrorStaffUpdate"-->
                    <!--                    >-->
                    <!--                      {{ key }}: {{ value[0] }}-->
                    <!--                    </CAlert>-->


                  </div>


                  <CRow>
                    <CCol lg="6">
                      <CInput
                          label="Ad (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="staffUpdate.firstName"
                      />

                      <CInput
                          label="Soyad (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="staffUpdate.lastName"
                      />

                      <CInput
                          label="Email (Zorunlu Alan)"
                          description=""
                          type="email"
                          autocomplete="email"
                          prepend="@"
                          v-model="staffUpdate.username"
                      />
                    </CCol>

                    <CCol lg="6">
                      <CInput
                          label="Telefon Numarası (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="staffUpdate.mobilePhone"
                      />


                      <CSelect
                          :options="groups"
                          label="Grup (Zorunlu Alan)"
                          v-model="staffUpdate.group"
                          :value.sync="staffUpdate.group"

                      />

                      <CTextarea
                          :rows="3"
                          label="Adres"
                          description=""
                          autocomplete="autocomplete"
                          v-model="staffUpdate.address"
                      />

                    </CCol>


                  </CRow>


                </CCardBody>
              </template>
            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Personel Güncelle</h6>
        <CButtonClose @click="staffUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="staffUpdateModal = false" color="danger">Kapat</CButton>
        <CButton @click="updateStaffFunc" color="success">Güncelle</CButton>
      </template>
    </CModal>


  </div>
</template>

<script>


import Car from "@/models/car";

import Staff from "@/models/Staff";
import StaffService from "@/services/staff.service";

import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import Customer from "@/models/customer";
import UserService from "@/services/managementServices/user.service";
import Clinic from "@/models/pms/clinic";
import GeneralService from "@/services/managementServices/general.service";
import ClinicService from "@/services/managementServices/clinic.service";


export default {
  name: "Group",

  data() {
    return {
      fieldsTable: [
        {key: 'clinicName', label: "Klinik Adı", _style: "min-width:200px"},
        {key: "taxNumber", label: "Vergi No"},
        {key: "taxOffice", label: "Vergi Dairesi"},
        {key: "email", label: "Email"},
        {key: "telephoneNumber", label: "Telefon Numarası"},
        {key: "city", label: "İl"},
        {key: "district", label: "İlçe"},


      ],

      pageLabel: {label: 'sasasa', external: true,},
      page: 1,
      numberOfPages: 0,
      selected: [],
      rowsPerPageItems: [5],
      search: '',
      total: 0,
      loading: false,
      pagination: {external: true},
      customers: [],
      cities: [],
      districts: [],
      staffs: [],
      staff: new Staff("", "", "", "", "", ""),
      clinic: new Clinic("", "", "", "", "", "", "", ""),
      staffUpdate: new Customer("", "", "", "", "", "", "", ""),
      customer: new Customer("", "", "", "", "", "", "", ""),
      car: new Car("", "", "", "", "", "", "", "", "", "", ""),
      isSuccess: false,
      isSuccessCar: false,
      isError: false,
      errorsStaff: [],
      isErrorCustomerUpdate: false,
      groups: [],
      staffUpdateModal: false,
      details: [],
      errors: [],
      errorsCar: [],
      isCorporate: false,
      collapseDuration: 0,
      darkModal: false,
      carModal: false,
      show: true,
      showAddCar: true,
      horizontal: {label: "col-3", input: "col-9"},
      options: ["Option 1", "Option 2", "Option 3"],
      selectOptions: [
        "Option 1",
        "Option 2",
        "Option 3",
        {
          value: "some value",
          label: "Selected option",
        },
      ],
      selectedOption: "some value",

      formCollapsed: true,
      checkboxNames: [
        "Checkboxes",
        "Inline Checkboxes",
        "Checkboxes - custom",
        "Inline Checkboxes - custom",
      ],
      radioNames: [
        "Radios",
        "Inline Radios",
        "Radios - custom",
        "Inline Radios - custom",
      ],
      deleteModel: false,
      deleteId: '',
      clinics: []
    };
  },

  methods: {
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    getBadge(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
        default:
          "primary";
      }
    },
    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },

    isCorporateControl() {
      this.isCorporate = !this.isCorporate;
      this.customer.isCorporate = this.isCorporate;
    },
    addCarModal(profileUuid) {

      this.carModal = true
      this.car.profileUuid = profileUuid

    },


    setDeleteModal(id) {

      this.deleteId = id
      this.deleteModel = true

    },


    async deleteStaff() {

      let a = await new StaffService().deleteStaff(this.deleteId);
      if (a.status === 200) {

        this.deleteModel = false;
        this.successHide();
        this.getStaffs()
        this.$toast.success({
          title: 'Başarılı',
          message: "Başarıyla Silindi"
        });

      } else if (a.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        this.$toast.error({
          title: 'Hata',
          message: "Yetkiniz bulunmamaktadır"
        });
      }
    },

    errorHide() {
      setTimeout(() => (this.isError = false), 5000);
    },
    successHide() {
      setTimeout(() => (this.isSuccess = false), 5000);
    },
    errorHideCar() {
      setTimeout(() => (this.isErrorCar = false), 5000);
    },
    successHideCar() {
      setTimeout(() => (this.isSuccessCar = false), 5000);
    },


    async getSingleStaff(id) {

      let response = await new StaffService().getStaff(id);
      this.staffUpdate = response.data
      this.staffUpdateModal = true

    },


    async getStaffs() {
      let response = await new UserService().getStaffs();
      console.log(response)
      this.staffs = response.data
    },
    async getGroups() {
      let response = await new UserService().getGroups();

      this.groups = response.data
    },

    async getClinics() {
      let response = await new ClinicService().getClinics();

      this.clinics = response.data
    },


    async getCity() {
      let response = await new GeneralService().getCity()

      this.cities = response.data
    },


    async getDistrict(id) {

      let response = await new GeneralService().getDistrict(id)

      this.districts = response.data
    },

    async addClinic() {
      let a = await new ClinicService().addClinic(this.clinic);
      if (a.status === 200) {
        this.isSuccess = false;
        this.isSuccess = true;
        this.successHide();
        this.getStaffs();
        this.$toast.success({
          title: 'Başarılı',
          message: "Personel başarıyla eklendi"
        })
        this.staff.firstName = ''
        this.staff.lastName = ''
        this.staff.username = ''
        this.staff.mobilePhone = ''
        this.staff.address = ''
        this.staff.group = ''
      } else if (a.response.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        this.$toast.error({
          title: 'Hata',
          message: "Yetkiniz bulunmamaktadır"
        })
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errors = a.response.data;
        for (const [key, value] of Object.entries(this.errors)) {
          this.$toast.error({
            title: 'Hata',
            message: `${key}: ${value}`
          })
        }
        this.errorHide();
      }
    },


    async updateStaffFunc() {
      let a = await new StaffService().updateStaff(this.staffUpdate);
      if (a.status === 200) {
        this.isSuccess = false;
        this.$toast.success({
          title: 'Başarılı',
          message: "Personel başarıyla güncellendi"
        });
        this.staffUpdateModal = false
        this.getStaffs();
        this.customer = new Customer()
      } else if (a.response.status === 401) {
        this.isErrorCustomerUpdate = false;
        this.isErrorCustomerUpdate = true;
        this.errorHideUpdateCustomer();
        await this.$router.push("/pages/login");
      } else {
        this.isErrorCustomerUpdate = false;
        this.isErrorCustomerUpdate = true;
        this.errors = a.response.data
        // this.$toast.err({
        //   title: 'Hata',
        //   message: a.response.data
        // });
        for (const [key, value] of Object.entries(this.errors)) {
          this.$toast.error({
            title: 'Hata',
            message: `${key}: ${value}`
          })
        }


      }

    }
  },

  watch: {},

  created() {
    this.isCorporateControl();

  },
  mounted() {
    this.getGroups()
    this.getStaffs()
    this.getCity()
    this.getClinics()


  },
  computed: {
    computedItems() {

      return this.staffs.map(item => {
        return {
          ...item,
          userUsername: item.email,
          nameSurname: item.firstName + ' ' + item.lastName,
          userGroup: item.groupName

        }
      })
    }
  }

};
</script>
