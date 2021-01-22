<template>
  <div>

    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CRow>
                <CCol lg="3" class="text-left mt-3">
                  <h2>Ürünler</h2>

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
                    :items="computedItemsProduct"
                    :fields="fieldsTableProduct"
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


                  <template #productImage="{ item, index }">
                    <td class="py-2">
                      <img :src="item.productImage" width="50px" alt=""/>
                    </td>
                  </template>
                  <template #actions="{ item, index }">
                    <td class="py-2">

                      <CButtonGroup class="mx-1 d-sm-down-none">
                        <CButton color="danger">Sil</CButton>
                        <CButton color="warning" @click="getSingleProduct(item.uuid)">Güncelle</CButton>
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
                        v-for="(value,key) in errorsCar"
                        :key="value.message"
                        color="danger"
                        :show="isError"
                    >
                      {{ key }}: {{ value[0] }}
                    </CAlert>
                  </div>


                  <CRow>


                    <CCol lg="6">
                      <CInput
                          label="Ürün Kodu (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.barcodeNumber"


                      />
                      <CInput
                          label="Ürün Adı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.name"

                      />

                      <CInput
                          label="Alış Fiyatı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.purchasePrice"
                          type="number"

                      />

                      <CInput
                          label="Satış Fiyatı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.netPrice"
                          type="number"

                      />
                      <CInput
                          label="KDV Oranı(%) (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.taxRate"
                          type="number"

                      />


                    </CCol>
                    <CCol lg="6">
                      <CSelect
                          :options="selectCategories"
                          label="Üst Kategori (Zorunlu Alan)"
                          v-model="product.categories"
                          :value.sync="product.categories"

                      />


                      <CSelect
                          :options="selectBrands"
                          label="Marka (Zorunlu Alan)"
                          v-model="product.brand"
                          :value.sync="product.brand"

                      />

                      <CInput
                          label="Stok (Zorunlu Alan)"
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
        <CButton @click="showAddProduct = false" color="danger">Kapat</CButton>
        <CButton @click="addProduct()" color="success">Kaydet</CButton>
      </template>
    </CModal>





    <CModal
        :show.sync="showUpdateProduct"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="showUpdateProduct">
              <template>
                <CCardBody>
                  <div>
                    <CAlert color="success" :show="isSuccessCar">
                      Ürün başarıyla kaydedildi.
                    </CAlert>

                    <CAlert
                        v-for="(value,key) in errorsCar"
                        :key="value.message"
                        color="danger"
                        :show="isError"
                    >
                      {{ key }}: {{ value[0] }}
                    </CAlert>
                  </div>


                  <CRow>


                    <CCol lg="6">
                      <CInput
                          label="Ürün Kodu (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.barcodeNumber"


                      />
                      <CInput
                          label="Ürün Adı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.name"

                      />

                      <CInput
                          label="Alış Fiyatı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.purchasePrice"
                          type="number"

                      />

                      <CInput
                          label="Satış Fiyatı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.netPrice"
                          type="number"

                      />
                      <CInput
                          label="KDV Oranı(%) (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.taxRate"
                          type="number"

                      />


                    </CCol>
                    <CCol lg="6">
                      <CSelect
                          :options="selectCategories"
                          label="Üst Kategori (Zorunlu Alan)"
                          v-model="product.categories"
                          :value.sync="product.categories"

                      />


                      <CSelect
                          :options="selectBrands"
                          label="Marka (Zorunlu Alan)"
                          v-model="product.brand"
                          :value.sync="product.brand"

                      />

                      <CInput
                          label="Stok (Zorunlu Alan)"
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
        <h6 class="modal-title">Ürün Güncelle</h6>
        <CButtonClose @click="showUpdateProduct = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="showUpdateProduct = false" color="danger">Kapat</CButton>
        <CButton @click="updateProduct()" color="success">Güncelle</CButton>
      </template>
    </CModal>



  </div>
</template>

<script>

import CustomerService from "@/services/customer.service";

import axios from "axios";
import authHeader from "@/services/auth-header";

import Category from "@/models/category";
import CategoryService from "@/services/category.service";
import Product from "@/models/product";
import {freeSet} from '@coreui/icons'
import ProductService from "@/services/product.service";
import product from "@/models/product";

export default {
  name: "ProductList",
  freeSet,


  data() {

    return {

      fieldsTableProduct: [
        {key: 'productImage', label: "Resim", _style: "min-width:100px"},
        {key: 'barcodeNumber', label: "Barkod", _style: "min-width:100px"},
        {key: 'shelf', label: "Raf", _style: "min-width:100px"},
        {key: "name", label: "Ürün Adı"},
        {key: "quantity", label: "Adet"},
        {key: "brandName", label: "Marka"},
        {key: "purchasePrice", label: "Alış Fiyatı"},
        {key: "netPrice", label: "Net Fiyat"},
        {key: "taxRate", label: "KDV"},
        {key: "totalProduct", label: "Toplam Fiyat"},
        {key: "isOpen", label: "Aktif"},
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
      selectCategories: [],
      selectBrands: [],
      categoryUpdateModal: false,
      showUpdateCategory: true,
      product: new Product("", "", "", "", "", "", "", "", "", "", "", "", ""),
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
      showUpdateProduct:false
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

    async addProduct() {



      this.product.isOpen = true

      let productResponse = await new ProductService().addProduct(this.product);

      if (productResponse.status === 200) {
        this.isSuccess = false;
        this.isSuccess = true;
        this.showAddProduct = false;
        this.successHide();
        this.getProducts();
        this.product = new Product()
      } else if (productResponse.response.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errorsCar = productResponse.response.data;
        this.errorHide();
      }


    },

    async updateProduct() {



      this.product.isOpen = true

      let productResponse = await new ProductService().updateProduct(this.product);

      if (productResponse.status === 200) {
        this.isSuccess = false;
        this.isSuccess = true;
        this.showUpdateProduct = false;
        this.successHide();
        this.getProducts();
        this.product = new Product()
      } else if (productResponse.response.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errorsCar = productResponse.response.data;
        this.errorHide();
      }


    },

    async getSingleProduct(uuid) {


      let response = await new ProductService().getProduct(uuid);
      console.log(response.data)

      this.product = response.data
      console.log("product",this.product)
      this.showUpdateProduct = true

    },

    async addCategory() {
      let a = await new CategoryService().categoryAdd(this.category);
      console.log("status", a);
      if (a.status === 200) {
        this.isSuccess = false;
        this.isSuccess = true;
        this.successHide();
        this.getCategories();
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

    getProducts() {

      // get by search keyword
      // console.log("search", this.search)
      //console.log("pagination", this.pagination.page)
      //console.log("pagination", this.pagination.rowsPerPage)
      this.loading = true;
      //const {page, itemsPerPage} = this.options;
      //let pageNumber = page;


      axios.get(process.env.VUE_APP_API_URL + "/car-service/product-api/", {headers: authHeader()})
          .then(res => {
            this.products = res.data;
            console.log("ürünler", this.products)
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
      //const {page, itemsPerPage} = this.options;
      // let pageNumber = page;


      axios.get(process.env.VUE_APP_API_URL + "/car-service/category-select-api/", {headers: authHeader()})
          .then(res => {
            this.selectCategories = res.data;
            console.log("ssa", res)


          })
          .catch(err => console.log(err.response.data))
          .finally(() => this.loading = false);
      this.loading = false
    },

    getSelectBrands() {

      // get by search keyword

      this.loading = true;
      //const {page, itemsPerPage} = this.options;
      // let pageNumber = page;


      axios.get(process.env.VUE_APP_API_URL + "/car-service/brand-select-api/", {headers: authHeader()})
          .then(res => {
            this.selectBrands = res.data;
            console.log("ssa", res)


          })
          .catch(err => console.log(err.response.data))
          .finally(() => this.loading = false);
      this.loading = false
    },


  },

  watch: {},

  created() {


  },
  async mounted() {
    await this.getProducts();
    await this.getSelectCategories();
    await this.getSelectBrands()

  },
  computed: {

    computedItemsProduct() {

      return this.products.map(item => {
        console.log("item", item)
        return {
          ...item,

          brandName: item.brand != null ? item.brand.name : "",


        }
      })
    }
  }

};
</script>
