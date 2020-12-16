<template>
  <div>

    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CRow>
                <CCol lg="3" class="text-left mt-3">
                  <h3>Servis Listesi</h3>

                </CCol>
                <CCol lg="9" class="text-right mt-3">
                  <CButton color="success" @click="addProductModal">
                    <CIcon :content="$options.freeSet.cilPlus" name="cil-plus"/>&nbsp;Ürün Ekle
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <template>
              <CCardBody>
                <div>
                  <CAlert color="success" :show="isSuccess">
                    Ürün başarıyla kaydedildi.
                  </CAlert>

                </div>

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

                  <template #serviceSituation="{item}">
                    <td>
                      <CBadge :color="getBadge(item.serviceSituation)">{{item.serviceSituation}}</CBadge>
                    </td>
                  </template>

                  <template #actions="{ item, index }">
                    <td class="py-2">

                      <CButtonGroup class="mx-1 d-sm-down-none">
                        <CButton @click="getCarPagination(item.uuid)" variant="outline" color="dark">Servis Detay</CButton>
                        <CButton color="primary" >İşlem Yap</CButton>

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


    <CModal
        :show.sync="showAddProduct"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="showAddProduct">
              <template>
                <CCardBody>
                  <div>
                    <CAlert color="success" :show="isSuccessCar">
                      Ürün başarıyla kaydedildi.
                    </CAlert>

                    <CAlert
                        v-for="item in errorsCar"
                        :key="item.message"
                        color="danger"
                        :show="isError"
                    >
                      E-mail: {{ item }}
                    </CAlert>
                  </div>


                  <CRow>


                    <CCol lg="6">
                      <CInput
                          label="Barkod Numarası"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.barcode_number"

                      />
                      <CInput
                          label="Ürün Adı."
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.name"

                      />
                      <CInput
                          label="Net Ücret"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.netPrice"
                          type="number"

                      />
                      <CInput
                          label="KDV Oranı(%)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.taxRate"
                          type="number"

                      />


                    </CCol>
                    <CCol lg="6">
                      <CSelect
                          :options="selectCategories"
                          label="Üst Kategori"
                          v-model="product.categories"
                          :value.sync="product.categories"

                      />

                      <CInput
                          label="Stok"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.quantity"
                          type="number"


                      />

                      <CInput
                          label="Raf Numarası"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.shelf"

                      />
                      <CInputFile
                          label="Resim Ekle"
                          horizontal
                          @change="getBase64"
                          custom
                          multiple
                          :placeholder="selectedFile"

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
        <h6 class="modal-title">Ürün EKle</h6>
        <CButtonClose @click="showAddProduct = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="categoryUpdateModal = false" color="danger">Kapat</CButton>
        <CButton @click="addProduct()" color="success">Kaydet</CButton>
      </template>
    </CModal>


  </div>
</template>

<script>

import CustomerService from "@/services/customer.service";

import Category from "@/models/category";
import Product from "@/models/product";
import product from "@/models/product";
import {freeSet} from '@coreui/icons'
import Service from "@/models/service";
import ServiceService from "@/services/service.service";

export default {
  name: "ServiceList",
  freeSet,


  data() {

    return {

      fieldsTable: [
        {key: 'serviceType', label: "Servis Tipi", _style: "min-width:200px"},
        {key: "plate", label: "Plaka"},
        {key: "serviceKM", label: "KM"},
        {key: "serviceSituation", label: "Durum"},
        {key: "serviceman", label: "Usta"},
        {key: "creationDate", label: "Tarih"},
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
      categories: [],
      selectCategories: [],
      categoryUpdateModal: false,
      showUpdateCategory: true,
      product: new Product("", "", "", "", "", "", "", "", "", "",""),
      products: [],
      category: new Category("", "", "0"),
      categoryUpdate: new Category("", "", "0"),
      isSuccess: false,
      isSuccessCar: false,
      isError: false,
      x: '',
      selectedFile: "Dosya Seçiniz",


      details: [],
      errors: [],
      errorsCar: [],

      collapseDuration: 0,
      darkModal: false,
      carModal: false,
      show: true,
      showAddCar: true,
      horizontal: {label: "col-3", input: "col-9"},

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
      showAddProduct: false,
      service: new Service(),
      services:[]
    };
  },

  methods: {
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    getBadge(status) {
      switch (status) {
        case "Tamamlandı":
          return "success";
        case "İşlem Bekleniyor":
          return "secondary";
        case "Müşteri Onayı Bekleniyor":
          return "warning";
        case "Banned":
          return "danger";
        case "İşlemde":
          return "info";
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

    deneme() {
      console.log("ghg", this.category)
    },

    getBase64(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event[0]);
      console.log("sdsd", product)
      this.selectedFile = event.length + ' dosya seçildi'
      var x = this
      reader.onload = function () {
        x.product.productImages = reader.result


      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };


      this.product.productImages = x
    }
    ,

    async getServiceList() {

      let response = await new ServiceService().getServicesList();
      console.log(response)

      this.services = response.data.data

    },



    updateCategoryModal(categoryId) {


      this.categoryUpdateModal = true
      this.categoryUpdate.id = categoryId
      this.categoryUpdate.parent = 5


    },

    addProductModal() {

      this.showAddProduct = true
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

     intervalFetchData: async function () {
      setInterval(() => {
        this.getServiceList();

      }, 10000);
    }



  },

  watch: {},

  created() {


  },
   mounted() {
    this.getServiceList()
     this.intervalFetchData()

  },
  computed: {

    computedItems() {

      return this.services.map(item => {
        return {
          ...item,


        }
      })
    }
  }

};
</script>
