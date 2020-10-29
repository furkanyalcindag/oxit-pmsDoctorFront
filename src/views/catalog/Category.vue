<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Müşteri
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
                    Müşteri başarıyla kaydedildi.
                  </CAlert>

                  <CAlert
                      v-for="item in errors"
                      :key="item.message"
                      color="danger"
                      :show="isError"
                  >
                    E-mail: {{ item }}
                  </CAlert>
                </div>
                <CRow></CRow>
                <CRow>
                  <CCol lg="5">
                    <CInput
                        label="İsim"
                        description=""
                        autocomplete="autocomplete"

                    />


                  </CCol>

                  <CCol lg="5">
                    <CSelect
                        :options="selectCategories"
                        label="Telefon Numarası"


                    />




                  </CCol>

                  <CCol lg="2">

                    <div class="form-actions" style="margin-top: 29px">
                      <CButton type="submit" color="primary" @click="addCustomer"
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
                    :items="computedItemsCategory"
                    :fields="fieldsTableCategory"
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
                        <CButton  color="primary">Araç</CButton>
                        <CButton  color="info">Araç Ekle</CButton>
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

import CustomerService from "@/services/customer.service";
import Vuetify from "vuetify/lib";
import axios from "axios";
import authHeader from "@/services/auth-header";

import CarService from "@/services/car.service";
import Category from "@/models/category";


export default {
  name: "Category",
  vuetify: new Vuetify(),
  data() {
    return {

      fieldsTableCategory: [
        {key: 'name', label: "Kategori Adı", _style: "min-width:100px"},
        {key: "parentPath", label: "Üst Kategori"},
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
      categories: [],
      selectCategories:[],

      category: new Category("", ""),
      isSuccess: false,
      isSuccessCar: false,
      isError: false,


      details: [],
      errors: [],
      errorsCar: [],

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


    async addCustomer() {
      let a = await new CustomerService().customerAdd(this.customer);
      console.log("status", a);
      if (a.status === 200) {
        this.isSuccess = false;
        this.isSuccess = true;
        this.successHide();
        this.getCustomersPagination();
      } else if (a.response.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errors = a.response.data["username"];
        this.errorHide();
      }
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
    async getCustomers() {
      let customersRes = await new CustomerService().customerGet('', '', '');
      this.customers = customersRes;
    },

    getCategories() {

      // get by search keyword
      console.log("search", this.search)
      console.log("pagination", this.pagination.page)
      console.log("pagination", this.pagination.rowsPerPage)
      this.loading = true;
      const {page, itemsPerPage} = this.options;
      let pageNumber = page;


      axios.get(process.env.VUE_APP_API_URL + "/car-service/category-api/", {headers: authHeader()})
          .then(res => {
            this.categories = res.data;
            console.log("ssa", res)
            this.total = res.data.recordsTotal;
            this.numberOfPages = 2;

          })
          .catch(err => console.log(err.response.data))
          .finally(() => this.loading = false);
      this.loading = false
    },
    getSelectCategories() {

      // get by search keyword

      this.loading = true;
      const {page, itemsPerPage} = this.options;
      let pageNumber = page;


      axios.get(process.env.VUE_APP_API_URL + "/car-service/category-select-api/", {headers: authHeader()})
          .then(res => {
            this.selectCategories = res.data;
            console.log("ssa", res)


          })
          .catch(err => console.log(err.response.data))
          .finally(() => this.loading = false);
      this.loading = false
    },

     getCarPagination(uuid) {

      this.darkModal = true

      // get by search keyword
      console.log("search", this.search)
      console.log("pagination", this.pagination.page)
      console.log("pagination", this.pagination.rowsPerPage)
      this.loading = true;
      const {page, itemsPerPage} = this.options;
      let pageNumber = page;
      console.log("uuid", uuid)
      axios.get(`http://localhost:8000/car-service/car-api/?uuid=${uuid}`, {headers: authHeader()})
          .then(res => {
            this.cars = res.data;
            //this.total = res.data.recordsTotal;
            //this.numberOfPages = 2;
            console.log(this.cars)

          })
          .catch(err => console.log(err.response.data))
          .finally(() => this.loading = false);
      this.loading = false
    },

    async addCar() {


      console.log("car", this.car)
      let a = await new CarService().carAdd(this.car);
      console.log("status", a);
      if (a.status === 200) {
        this.isSuccessCar = false;
        this.isSuccessCar = true;
        this.successHideCar();
        //this.getCustomersPagination();
      } else if (a.response.status === 401) {
        this.isErrorCar = false;
        this.isErrorCar = true;
        this.errorHideCar();
        await this.$router.push("/pages/login");
      } else {
        this.isErrorCar = false;
        this.isErrorCar = true;
        this.errorsCar = a.response.data["username"];
        this.errorHideCar();
      }


    }

  },

  watch: {},

  created() {


  },
  async mounted() {
    await this.getCategories();
    await this.getSelectCategories();

  },
  computed: {

    computedItemsCategory() {

      return this.categories.map(item => {
        return {
          ...item,


        }
      })
    }
  }

};
</script>
