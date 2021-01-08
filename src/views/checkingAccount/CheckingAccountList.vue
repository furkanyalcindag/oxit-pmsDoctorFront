<template>
  <div>

    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CRow>
                <CCol lg="3" class="text-left mt-3">
                  <h3>Cari Liste {{ this.message }}</h3>

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

                  <template #paymentSituation="{item}">
                    <td>
                      <CBadge :color="getBadge(item.paymentSituation)">{{ item.paymentSituation }}</CBadge>
                      <CDropdown
                          color="link"
                          size="lg"
                          :caret="false"
                      >
                        <template #toggler-content>
                          &#x1F4C2;<span class="sr-only">sss</span>
                        </template>
                        <!--<CDropdownItem @click="getServiceDetail(item.uuid)">Servis Detay</CDropdownItem> -->
                        <CDropdownItem
                            @click="generalService(2121212121,'makePayment')">Ödeme Yap
                        </CDropdownItem>

                      </CDropdown>

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
                                       @click="generalService(item.uuid,'makePayment')">Ödeme Yap
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


    <CModal
        :show.sync="showMakePayment"
        :no-close-on-backdrop="true"
        :centered="true"
        :draggable="false"
        title="Modal title 2"
        :backdrop="true"
        size="s"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="showMakePayment">
              <template>
                <CCardBody>
                  <CRow>
                    <CCol lg="12">
                      <CInput
                          label="Ödeme Miktarı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="payment.paymentAmount"
                          type="number"

                      />
                    </CCol>
                  </CRow>


                  <CRow>
                    <CCol lg="12">
                      <CSelect
                          :options="selectPaymentTypes"
                          label="Ödeme Tipi (Zorunlu Alan)"
                          v-model="payment.paymentType"
                          :value.sync="payment.paymentType"

                      />
                    </CCol>
                  </CRow>

                  <CCol lg="2"></CCol>


                </CCardBody>
              </template>

            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Ödeme Yap</h6>
        <CButtonClose @click="showServiceDetail = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="showServiceDetail = false" color="danger">Kaydet</CButton>

      </template>
    </CModal>


  </div>
</template>

<script>

import CustomerService from "@/services/customer.service";

import Category from "@/models/category";

import {freeSet} from '@coreui/icons'
import Service from "@/models/service";
import ServiceService from "@/services/service.service";
import CarService from "@/services/car.service";
import CheckingAccountService from "@/services/checkingAccount.service";
import Payment from "@/models/payment";

export default {
  name: "CheckingAccountList",
  freeSet,


  data() {

    return {

      fieldsTable: [
        {key: 'customerName', label: "Müşteri", _style: "min-width:200px"},
        {key: "plate", label: "Plaka"},
        {key: "serviceDate", label: "Servis Tarihi"},
        {key: "totalPrice", label: "Toplam Ücret"},
        {key: "remainingPrice", label: "Kalan Ücret"},
        {key: "paymentSituation", label: "Ödeme Durumu"},
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
      selectPaymentTypes: [],
      categoryUpdateModal: false,
      showUpdateCategory: true,
      payment: new Payment("", "", "", ""),
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
      showMakePayment: false,
      service: new Service(),
      services: [],
      checkingAccounts: [],
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
        case "Ödendi":
          return "success";
        case "Kısmi Ödendi":
          return "warning";
        case "Ödenmedi":
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


    async getServiceList() {

      let response = await new ServiceService().getServicesList();


      this.services = response.data.data

    },

    async getCheckingAccountList() {

      let response = await new CheckingAccountService().checkingAccountList();

      this.checkingAccounts = response.data.data

    },

    async getPaymentType() {
      let response = await new CheckingAccountService().getPaymentType();

      this.selectPaymentTypes = response.data
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

    },
    errorHideCar() {
      setTimeout(() => (this.isErrorCar = false), 5000);
    },
    successHideCar() {
      setTimeout(() => (this.isSuccessCar = false), 5000);

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

      console.log("deneme")

      if (functionName === 'goServiceDetail') {
        this.goServiceDetail(serviceId)
      } else if (functionName === 'goServiceApprove') {

        this.goServiceApprove(serviceId)

      } else if (functionName === 'goServiceDetermination') {

        this.goServiceDetermation(serviceId)

      } else if (functionName === 'goServiceDetermination') {

        this.goServiceDetermation(serviceId)

      } else if (functionName === 'serviceGetProcess') {

        this.serviceProcess(serviceId, 1)

      } else if (functionName === 'serviceProcessComplete') {

        this.serviceProcess(serviceId, 2)

      } else if (functionName === 'serviceDeliver') {

        this.serviceProcess(serviceId, 3)

      } else if (functionName === 'makePayment') {

        this.showMakePayment = true

      }


    }


  },

  watch: {},

  created() {


  },
  mounted() {
    this.getCheckingAccountList()
    this.intervalFetchData()
    this.getPaymentType()


  },
  computed: {

    computedItems() {

      return this.checkingAccounts.map(item => {
        return {
          ...item,


        }
      })
    }
  }

};
</script>
