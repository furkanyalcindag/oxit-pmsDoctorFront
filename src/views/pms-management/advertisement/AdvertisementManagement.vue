<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Reklam Yönetimi
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
                  <CCol lg="4">
                    Reklam Adı <span class="text-danger">*</span>
                    <CSelect
                        description=""
                        autocomplete="autocomplete"
                        :options="options"
                    />
                  </CCol>
                  <CCol lg="4">
                    Firma Adı <span class="text-danger">*</span>
                    <CInput
                        description=""
                        autocomplete="autocomplete"
                    />
                  </CCol>
                  <CCol lg="4">
                    Reklam Yeri <span class="text-danger">*</span>
                    <CSelect
                        description=""
                        autocomplete="autocomplete"
                        :options="options"
                    />

                  </CCol>
                  <CCol lg="4">
                    Yayın Başlangıç Tarihi <span class="text-danger">*</span>
                    <CInput
                        type="date"

                    />
                  </CCol>
                  <CCol lg="4">
                    Yayın Bitiş Tarihi <span class="text-danger">*</span>
                    <CInput
                        type="date"
                    />
                  </CCol>
                  <CCol lg="4">
                    Fiyat <span class="text-danger">*</span>
                    <CInput
                        description=""
                        autocomplete="autocomplete"
                    />

                  </CCol>
                  <CCol lg="4" class="mt-3">
                    <div class="form-actions">
                      <CButton type="submit" color="primary"
                      >Kaydet
                      </CButton>

                    </div>
                  </CCol>
                </CRow>
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
                    :items="staffs"
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
        <CButton color="danger">Hayır</CButton>
        <CButton color="success">Evet</CButton>
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
                          description=""
                          autocomplete="autocomplete"
                      />
                      Grup Adı <span class="text-danger">*</span>
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
        <CButtonClose class="text-white"/>
      </template>
      <template #footer>
        <CButton color="danger">Kapat</CButton>
        <CButton color="success">Güncelle</CButton>
      </template>
    </CModal>


  </div>
</template>

<script>


import Car from "@/models/car";

import Staff from "@/models/Staff";
import StaffService from "@/services/staff.service";
import GeneralService from "@/services/general.service";
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import Customer from "@/models/customer";
import UserService from "@/services/managementServices/user.service";


export default {
  name: "Group",

  data() {
    return {
      fieldsTable: [
        {key: "advertisementLocation", label: "Reklam Yeri"},
        {key: "pixels", label: "Genişlik x Uzunluk"},
        {key: "price", label: "Fiyat"},
        {key: "showPopUp", label: "PopUp Gösterimi"},
        {key: "actions", label: "İşlemler"},

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
      cars: [],
      staffs: [],
      staff: new Staff("", "", "", "", "", ""),
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
      showPopUp: false

    };
  },

  methods: {
    popUpChange() {
      if (this.showPopUp) {
        console.log("if")
        this.showPopUp = false
      } else {
        console.log("else")
        this.showPopUp = false
      }
    }
  },

  watch: {},

  created() {

  },
  mounted() {


  },
  computed: {}

};
</script>
