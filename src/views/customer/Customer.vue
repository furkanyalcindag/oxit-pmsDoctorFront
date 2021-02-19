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
                    <CInput
                        label="Ad (Zorunlu Alan)"
                        description=""
                        autocomplete="autocomplete"
                        v-model="customer.firstName"
                    />

                    <CInput
                        label="Soyad (Zorunlu Alan)"
                        description=""
                        autocomplete="autocomplete"
                        v-model="customer.lastName"
                    />

                    <CInput
                        label="Email Adresi (Zorunlu Alan)"
                        description=""
                        type="email"
                        autocomplete="email"
                        prepend="@"
                        v-model="customer.username"
                    />
                  </CCol>

                  <CCol lg="4">
                    <CInput
                        label="Telefon Numarası (Zorunlu Alan)"
                        description=""
                        autocomplete="autocomplete"
                        v-model="customer.mobilePhone"
                    />
                    <CTextarea
                        :rows="5"
                        label="Adres"
                        description=""
                        autocomplete="autocomplete"
                        v-model="customer.address"
                    />

                    <!-- <CRow form class="form-group">
                       <CCol tag="label" sm="4" class="col-form-label">
                         Kurumsal
                       </CCol>

                       <CCol sm="8" :class="'form-inline'">
                         <CInputCheckbox
                             :label="'evet'"
                             :value="'true'"
                             :checked="isCorporate"
                             v-on:change="isCorporateControl"
                         />
                       </CCol>
                     </CRow>-->
                  </CCol>

                  <CCol lg="4">
                    <CInput
                        label="Firma Adı"
                        description=""
                        autocomplete="autocomplete"
                        v-model="customer.firmName"
                    />


                    <CInput
                        label="Vergi Dairesi"
                        description=""
                        autocomplete="autocomplete"
                        v-model="customer.taxOffice"
                    />

                    <CInput
                        label="Vergi Numarası"
                        description=""
                        autocomplete="autocomplete"
                        v-model="customer.taxNumber"
                    />


                  </CCol>
                </CRow>

                <div class="form-actions">
                  <CButton type="submit" color="primary" @click="addCustomer"
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
                        <CButton @click="getAccountList(item.uuid)" color="success">Cari</CButton>
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


    <CModal
        :show.sync="darkModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >

      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="show">
              <template>
                <CCardBody>

                  <CAlert color="success" :show="isSuccessCarDelete">
                    Araç başarıyla silindi.
                  </CAlert>

                  <CDataTable
                      :items="computedItemsCar"
                      :fields="fieldsTableCar"
                      column-filter


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
                          <CButton color="success" @click="goService(item.uuid)">Servis</CButton>

                          <CButton color="warning" @click="updateCarModalFunc(item.uuid)">Güncelle</CButton>
                          <CButton color="danger" @click="setDeleteModalCar(item.uuid)">Sil</CButton>
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
      <template #header>
        <h6 class="modal-title">Araçlar</h6>
        <CButtonClose @click="darkModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="darkModal = false" color="danger">Kapat</CButton>

      </template>
    </CModal>


    <CModal
        :show.sync="carModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="showAddCar">
              <template>
                <CCardBody>

                  <div>
                    <CAlert color="success" :show="isSuccessCar">
                      Araba başarıyla kaydedildi.
                    </CAlert>

                    <CAlert
                        v-for="(value,key) in errorsCar"
                        :key="value.message"
                        color="danger"
                        :show="isErrorCar"
                    >
                      {{ key }}: {{ value[0] }}
                    </CAlert>

                  </div>


                  <CRow>
                    <CCol lg="6">
                      <CInput
                          label="Plaka (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="car.plate"
                      />

                      <CInput
                          label="Marka (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="car.brand"
                      />

                      <CInput
                          label="Model (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="car.model"
                      />
                      <CInput
                          label="Yıl (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="car.year"
                      />

                      <CInput
                          label="Motor Tipi"
                          description=""
                          autocomplete="autocomplete"
                          v-model="car.engine"
                      />
                    </CCol>


                    <CCol lg="6">
                      <CInput
                          label="Yakıt"
                          description=""
                          autocomplete="autocomplete"
                          v-model="car.oilType"
                      />

                      <CInput
                          label="Şase Numarası (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="car.chassisNumber"
                      />

                      <CInput
                          label="KM (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="car.currentKM"
                      />
                      <CInput
                          label="Motor Numarası"
                          description=""
                          autocomplete="autocomplete"
                          v-model="car.engineNumber"
                      />

                      <CInput
                          label="Renk"
                          description=""
                          autocomplete="autocomplete"
                          v-model="car.color"
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
        <h6 class="modal-title">Araç Ekle</h6>
        <CButtonClose @click="carModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="carModal = false" color="danger">Kapat</CButton>
        <CButton @click="addCar()" color="success">Kaydet</CButton>
      </template>
    </CModal>


    <CModal
        title="Modal title"
        color="danger"
        :no-close-on-backdrop="true"
        :centered="true"
        :show.sync="deleteModal"
    >
      Araç silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModal = false" color="danger">Hayır</CButton>
        <CButton @click="deleteCar" color="success">Evet</CButton>
      </template>


    </CModal>


    <CModal
        :show.sync="carUpdateModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="carUpdateModal">
              <template>
                <CCardBody>

                  <div>
                    <CAlert color="success" :show="isSuccessCar">
                      Araba başarıyla kaydedildi.
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
                          label="Plaka (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="carUpdate.plate"
                      />

                      <CInput
                          label="Marka (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="carUpdate.brand"
                      />

                      <CInput
                          label="Model (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="carUpdate.model"
                      />
                      <CInput
                          label="Yıl (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="carUpdate.year"
                      />

                      <CInput
                          label="Motor Tipi"
                          description=""
                          autocomplete="autocomplete"
                          v-model="carUpdate.engine"
                      />
                    </CCol>


                    <CCol lg="6">
                      <CInput
                          label="Yakıt"
                          description=""
                          autocomplete="autocomplete"
                          v-model="carUpdate.oilType"
                      />

                      <CInput
                          label="Şase Numarası (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="carUpdate.chassisNumber"
                      />

                      <CInput
                          label="KM (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="carUpdate.currentKM"
                      />
                      <CInput
                          label="Motor Numarası"
                          description=""
                          autocomplete="autocomplete"
                          v-model="carUpdate.engineNumber"
                      />

                      <CInput
                          label="Renk"
                          description=""
                          autocomplete="autocomplete"
                          v-model="carUpdate.color"
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
        <h6 class="modal-title">Araç Güncelle</h6>
        <CButtonClose @click="carUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="carUpdateModal = false" color="danger">Kapat</CButton>
        <CButton @click="updateCar" color="success">Güncelle</CButton>
      </template>
    </CModal>


  </div>
</template>

<script>
import Customer from "../../models/customer";
import CustomerService from "@/services/customer.service";

import axios from "axios";
import authHeader from "@/services/auth-header";
import Car from "@/models/car";
import CarService from "@/services/car.service";
import CategoryService from "@/services/category.service";
import Category from "@/models/category";


export default {
  name: "Customer",
  props: {
    plate: String,
    customerName: String
  },
  data() {
    return {
      fieldsTable: [
        {key: 'nameSurname', label: "Ad Soyad", _style: "min-width:200px"},
        {key: "firmName", label: "Firma"},
        {key: "mobilePhone", label: "Telefon"},
        {key: "taxNumber", label: "VKN"},
        {key: "taxOffice", label: "Vergi Dairesi"},
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
      customers: [],
      cars: [],
      customer: new Customer("", "", "", "", "", "", "", "", ""),
      car: new Car("", "", "", "", "", "", "", "", "", "", ""),
      carUpdate: new Car("", "", "", "", "", "", "", "", "", "", ""),
      isSuccess: false,
      isSuccessCar: false,
      isError: false,
      errorsCarDelete: [],
      isErrorCarDelete: false,
      isSuccessCarDelete: false,


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
      deleteModal: false,
      deleteId: 0,
      lastCustomerUUid: '',
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
      carUpdateModal: false,
      carUpdateUUID:''
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
        this.errors = a.response.data;
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
    successHideCarDelete() {
      setTimeout(() => (this.isSuccessCarDelete = false), 5000);
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

    getCustomersPagination() {

      // get by search keyword
      console.log("search", this.search)
      console.log("pagination", this.pagination.page)
      console.log("pagination", this.pagination.rowsPerPage)
      this.loading = true;
      const {page, itemsPerPage} = this.options;
      let pageNumber = page;


      axios.get(process.env.VUE_APP_API_URL + `/car-service/customer-api/?search=${this.search}&page=1&per_page=10`, {headers: authHeader()})
          .then(res => {
            this.customers = res.data.data;
            console.log("ssa", res.data.data)
            this.total = res.data.recordsTotal;
            this.numberOfPages = 2;

          })
          .catch(err => console.log(err.response.data))
          .finally(() => this.loading = false);
      this.loading = false
    },

    setDeleteModalCar(id) {

      this.deleteId = id
      this.deleteModal = true

    },

    async deleteCar() {

      console.log(this.updateBrand)
      let a = await new CarService().deleteCar(this.deleteId);

      if (a.status === 200) {
        this.isSuccessCarDelete = false;
        this.isSuccessCarDelete = true;
        this.deleteModal = false;
        this.successHideCarDelete();
        await this.getCarPagination(this.lastCustomerUUid);


      } else if (a.status === 300) {
        this.isError = false;
        this.isError = true;
        let x = a.data
        this.errors = x;
        this.errorHide();
      } else if (a.status === 204) {
        this.isError = false;
        this.isError = true;
        let x = a.data
        this.errors = x;
        this.errorHide();
      } else if (a.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errors = a.data;
        this.errorHide();
      }
    },


    getCarPagination(uuid) {

      this.darkModal = true
      this.lastCustomerUUid = uuid

      // get by search keyword
      console.log("search", this.search)
      console.log("pagination", this.pagination.page)
      console.log("pagination", this.pagination.rowsPerPage)
      this.loading = true;
      const {page, itemsPerPage} = this.options;
      let pageNumber = page;
      console.log("uuid", uuid)

      axios.get(process.env.VUE_APP_API_URL + `/car-service/car-api/?uuid=${uuid}`, {headers: authHeader()})
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
        this.errorsCar = a.response.data;
        this.errorHideCar();
      }


    },

    goService(carId) {
      this.$router.push({name: 'OpenServiceCard', params: {carId: carId}});
    },

    getAccountList(uuid) {


      this.$router.push({name: 'CheckingAccountByCustomer', params: {customerId: uuid}});


    },

    async updateCarModalFunc(categoryId) {


      let response = await new CarService().getCarApi(categoryId)
      this.carUpdate = response.data
      console.log("xxx", this.carUpdate)
      this.carUpdateUUID=categoryId
      this.carUpdateModal = true



    },

    async updateCar() {

      let carResponse = await new CarService().carUpdate(this.carUpdate, this.carUpdateUUID);

      if (carResponse.status === 200) {
        this.isSuccess = false;
        this.isSuccess = true;
        this.carUpdateModal = false;

        this.getCarPagination(this.carUpdate.profileUuid)
        this.successHide();
        this.carModal =false
        this.carUpdate = new Car()
      } else if (carResponse.response.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errors = carResponse.response.data;
        this.errorHide();
      }


    },


  },

  watch: {},

  created() {
    this.isCorporateControl();

  },
  async mounted() {
    await this.getCustomersPagination();

  },
  computed: {
    computedItems() {

      return this.customers.map(item => {
        return {
          ...item,
          userUsername: item.user.username,
          nameSurname: item.user.first_name + ' ' + item.user.last_name

        }
      })
    },
    computedItemsCar() {

      return this.cars.map(item => {
        return {
          ...item,


        }
      })
    }
  }

};
</script>
