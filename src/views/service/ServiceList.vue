<template>
  <div>

    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CRow>
                <CCol lg="3" class="text-left mt-3">
                  <h3>Servis Listesi {{ this.message }}</h3>

                </CCol>

              </CRow>
            </CCardHeader>
            <template>
              <CCardBody>
                <div>
                  <CAlert color="success" :show="isSuccess">
                    Servis Durumu Başarıyla Değiştirildi
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
                      <CBadge :color="getBadge(item.serviceSituation)">{{ item.serviceSituation }}</CBadge>
                    </td>
                  </template>

                  <template #buttons="{ item, index }">
                    <td class="py-2">


                      <CDropdown
                          color="link"
                          size="lg"
                          :caret="false"
                      >
                        <template #toggler-content>
                          &#x1F4C2;<span class="sr-only">sss</span>
                        </template>
                        <!--<CDropdownItem @click="getServiceDetail(item.uuid)">Servis Detay</CDropdownItem> -->
                        <CDropdownItem v-for="button in item.buttons" :key="button"
                                       @click="generalService(item.uuid,button.buttonFunction)">{{
                            button.buttonName
                          }}
                        </CDropdownItem>

                      </CDropdown>


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
        :show.sync="showServiceDetail"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="showServiceDetail">
              <template>
                <CCardBody>
                  <h5>Müşteri : {{ carPlate }}</h5>
                  <hr>
                  <h5>Plaka : {{ serviceDetail.plate }}</h5>
                  <hr>
                  <h5>Servis Tipi : {{ serviceDetail.serviceType }}</h5>
                  <hr>
                  <h5>KM : {{ serviceDetail.serviceKM }} KM</h5>
                  <hr>
                  <h5>Servise Getiren Kişi : {{ serviceDetail.responsiblePerson }} </h5>
                  <hr>
                  <h5>Usta : {{ serviceDetail.serviceman }}</h5>
                  <hr>
                  <h5>Giriş Zamanı : {{ serviceDetail.creationDate }} </h5>
                  <hr>
                  <h5>Şikayet : {{ serviceDetail.complaint }} </h5>


                </CCardBody>
              </template>

            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Servis Detay</h6>
        <CButtonClose @click="showServiceDetail = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="showServiceDetail = false" color="danger">Kapat</CButton>

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
import CarService from "@/services/car.service";

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
        {key: "buttons", label: "İşlemler"},
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
      product: new Product("", "", "", "", "", "", "", "", "", "", ""),
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
      showServiceDetail: false,
      service: new Service(),
      services: [],
      serviceDetail: null,
      carPlate: ''
    };
  },

  props: ['message'],

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
        case "Müşteri Onayı Alındı":
          return "success";
        case "İptal Edildi":
          return "danger";
        default:
          return "warning";
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


    async getServiceDetail(id) {

      let response = await new ServiceService().getServiceDetail(id);
      console.log(response)


      this.serviceDetail = response.data
      let responsePlate = await new CarService().getCarApi(this.serviceDetail.carUUID);

      this.carPlate = responsePlate.data.profile.firmName + '-' + responsePlate.data.profile.user.first_name + ' ' + responsePlate.data.profile.user.last_name

      this.serviceDetailModal()

    },


    updateCategoryModal(categoryId) {


      this.categoryUpdateModal = true
      this.categoryUpdate.id = categoryId
      this.categoryUpdate.parent = 5


    },

    serviceDetailModal() {

      this.showServiceDetail = true
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
    },

    goServiceDetermation(serviceId) {
      this.$router.push({name: 'ServiceDetermination', params: {serviceId: serviceId}});
    },

    goServiceDetail(serviceId) {
      this.$router.push({name: 'ServiceDetail', params: {serviceId: serviceId}});
    },

    goServiceApprove(serviceId) {
      this.$router.push({name: 'ServiceApprove', params: {serviceId: serviceId}});
    },

    async serviceProcess(serviceId, situationNo) {

      let response = await new ServiceService().ServiceProcessing(serviceId, situationNo);
      //console.log(response)

      if (response.status === 200) {
        this.isSuccess = true
        this.successHide()
        await this.getServiceList()
      }

    },

    generalService(serviceId, functionName) {


      if (functionName === 'goServiceDetail') {
        this.goServiceDetail(serviceId)
      } else if (functionName === 'goServiceApprove') {

        this.goServiceApprove(serviceId)

      } else if (functionName === 'goServiceDetermination') {

        this.goServiceDetermation(serviceId)

      } else if (functionName === 'goServiceDetermination') {

        this.goServiceDetermation(serviceId)

      } else if (functionName === 'serviceGetProcess') {

        this.serviceProcess(serviceId,1)

      }
      else if (functionName === 'serviceProcessComplete') {

        this.serviceProcess(serviceId,2)

      }

      else if (functionName === 'serviceDeliver') {

        this.serviceProcess(serviceId,3)

      }



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
