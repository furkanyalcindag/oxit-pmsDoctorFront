<template>
  <div>
    <CCard>
      <CRow>
        <CCol class="col-lg-2 mt-4">
        </CCol>
        <CCol class="col-lg-8 mt-3">
          <CSelect :options="options">

          </CSelect>
        </CCol>
        <CCol class="col-lg-2">
          <CButton class="btn-outline-primary mt-3" type="submit">Kaydet</CButton>
        </CCol>
      </CRow>
    </CCard>
    <CRow>
      <CCol v-for="(item,index) in 8" :key="index" class="col-lg-3">
        <CCard border-color="primary">

            <CCardHeader><CIcon name="cilArrowRight"/>Deneme Modülü</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol class="col-lg-12">
                <CRow>
                  <CCol>
                    <span>Örnek yetki 1</span>
                  </CCol>
                  <CCol>
                    <CSwitch class="mx-1" color="primary" checked variant="3d"/>
                  </CCol>
                </CRow>
              </CCol>
              <CCol class="col-lg-12">
                <CRow>
                  <CCol>
                    <span>Örnek yetki 1</span>
                  </CCol>
                  <CCol>
                    <CSwitch class="mx-1" color="primary" checked variant="3d"/>
                  </CCol>
                </CRow>
              </CCol>
              <CCol class="col-lg-12">
                <CRow>
                  <CCol>
                    <span>Örnek yetki 1</span>
                  </CCol>
                  <CCol>
                    <CSwitch class="mx-1" color="primary" checked variant="3d"/>
                  </CCol>
                </CRow>
              </CCol>
              <CCol class="col-lg-12">
                <CRow>
                  <CCol>
                    <span>Örnek yetki 1</span>
                  </CCol>
                  <CCol>
                    <CSwitch class="mx-1" color="primary" variant="3d"/>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>

        </CCard>
      </CCol>
    </CRow>

  </div>
</template>

<script>

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

  methods: {},

  watch: {},

  created() {

  },
  mounted() {


  },
  computed: {}

};
</script>
