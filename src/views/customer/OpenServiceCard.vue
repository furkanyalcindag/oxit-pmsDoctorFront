<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Servis
              <div class="card-header-actions">
                <CLink href="#" class="card-header-action btn-setting">
                  <CIcon name="cil-settings"/>
                </CLink>
                <CLink
                    class="card-header-action btn-minimize"
                    @click="formCollapsed = !formCollapsed"
                >
                  <CIcon
                      :name="`cil-chevron-${formCollapsed ? 'bottom' : 'top'}`"
                  />
                </CLink>
                <CLink
                    href="#"
                    class="card-header-action btn-close"
                    v-on:click="show = !show"
                >
                  <CIcon name="cil-x-circle"/>
                </CLink>
              </div>
            </CCardHeader>
            <CCollapse :show="formCollapsed">
              <CCardBody>
                <div>
                  <CAlert color="success" :show="isSuccess">
                    Servis kartı başarıyla kaydedildi.
                  </CAlert>

                  <CAlert
                      v-for="(value,key) in errors"
                      :key="value.message"
                      color="danger"
                      :show="isError"
                  >
                    {{ key }}: {{ value[0] }}
                  </CAlert>
                </div>
                <CRow></CRow>
                <CRow>
                  <CCol lg="4">

                    <CSelect
                        :options="serviceTypes"
                        label="Servis Tipi"
                        v-model="service.serviceType"
                        :value.sync="service.serviceType"

                    />


                    <CInput
                        label="Araç KM"
                        description=""
                        autocomplete="autocomplete"
                        v-model="service.serviceKM"
                        type="number"
                    />
                  </CCol>

                  <CCol lg="4">
                    <CInput
                        label="Teslim Eden Kişi"
                        description=""
                        autocomplete="autocomplete"
                        v-model="service.responsiblePerson"
                    />
                    <CSelect
                        :options="servicemen"
                        label="Usta"
                        v-model="service.serviceman"
                        :value.sync="service.serviceman"

                    />


                  </CCol>

                  <CCol lg="4">
                    <CTextarea
                        :rows="5"
                        label="Şikayet"
                        description=""
                        autocomplete="autocomplete"
                        v-model="service.complaint"
                    />


                  </CCol>


                </CRow>

                <div class="form-actions">
                  <CButton type="submit" color="primary" @click="addOpenServiceCard"
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
                    :items="computedItems"
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

                  <template #actions="{ item, index }">
                    <td class="py-2">

                      <CButtonGroup class="mx-1 d-sm-down-none">
                        <CButton @click="getCarPagination(item.uuid)" color="primary">Araç</CButton>
                        <CButton @click="addCarModal(item.uuid)" color="info">Araç Ekle</CButton>
                        <CButton color="success">Cari</CButton>
                        <CButton color="danger">Sil</CButton>
                        <CButton color="warning">Güncelle</CButton>
                      </CButtonGroup>


                    </td>
                  </template>
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




  </div>
</template>

<script>
import Customer from "../../models/customer";
import CustomerService from "@/services/customer.service";

import axios from "axios";
import authHeader from "@/services/auth-header";
import Car from "@/models/car";
import CarService from "@/services/car.service";
import Service from "@/models/service";
import GeneralService from "@/services/general.service";
import ServiceService from "@/services/service.service";
import StaffService from "@/services/staff.service";


export default {
  name: "OpenServiceCard",

  data() {
    return {
      fieldsTable: [
        {key: 'nameSurname', label: "Ad Soyad", _style: "min-width:200px"},
        {key: "firmName", label: "Firma"},
        {key: "mobilePhone", label: "Telefon"},
        {key: "actions", label: "İşlemler"},
      ],
      fieldsTableCar: [
        {key: 'plate', label: "Plaka", _style: "min-width:100px"},
        {key: "brand", label: "Marka"},
        {key: "model", label: "Model"},
        {key: "year", label: "Yıl"},
        {key: "chassisNumber", label: "Şase No"},
        {key: "engineNumber", label: "Motor No"},
        {key: "actions", label: "İşlemler"}
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
      servicemen: [],
      cars: [],

      service: new Service(),
      customer: new Customer("", "", "", "", "", "", "", ""),
      car: new Car("", "", "", "", "", "", "", "", "", "", ""),
      isSuccess: false,
      isSuccessCar: false,
      isError: false,


      details: [],
      errors: [],
      errorsCar: [],
      isCorporate: false,
      collapseDuration: 0,
      darkModal: false,
      serviceTypes: [],

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
      console.log(this.isCorporate);
      this.isCorporate = !this.isCorporate;
      this.customer.isCorporate = this.isCorporate;
    },
    addCarModal(profileUuid) {

      console.log("uuid", profileUuid)
      this.carModal = true
      this.car.profileUuid = profileUuid
      console.log("car", this.car)

    },

    errorHide() {
      setTimeout(() => (this.isError = false), 5000);
    },
    successHide() {
      setTimeout(() => (this.isSuccess = false), 5000);
      console.log("naber");
    },
    errorHideCar() {
      setTimeout(() => (this.isErrorCar = false), 5000);
    },
    successHideCar() {
      setTimeout(() => (this.isSuccessCar = false), 5000);
      console.log("naber");
    },


    async getServiceType() {
      let response = await new ServiceService().getServiceType();

      this.serviceTypes = response.data
    },

    async getServicemanSelect() {
      let response = await new StaffService().getServicemanSelect();

      this.servicemen = response.data
    },


    goService() {
      this.$router.push({name: '/customer/open-service', params: {userId: "bar"}});
    },

    async addOpenServiceCard() {
      this.service.carUUID = this.$route.params.carId
      let a = await new ServiceService().addService(this.service);
      console.log("status", a);
      if (a.status === 200) {
        this.isSuccess = false;
        this.isSuccess = true;
        this.successHide();
       // this.getStaffs();
      } else if (a.response.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        console.log("error", a.response.data)
        this.errors = a.response.data;
        this.errorHide();
      }
    }

  },

  watch: {},

  created() {
    this.isCorporateControl();

  },
  mounted() {
    this.getServiceType()
    this.getServicemanSelect()
    console.log(this.$route.params.carId)


  },
  computed: {
  /*  computedItems() {

      return this.customers.map(item => {
        return {
          ...item,
          userUsername: item.user.username,
          nameSurname: item.user.first_name + ' ' + item.user.last_name

        }
      })
    } */

  }

};
</script>
