<template>
  <CCardBody>

    <CDataTable
        :items="accountLists"
        :fields="fieldsTableCheckingAccount"
        :border="true"
        :items-per-page="5"
        :activePage="4"
        hover
        pagination
        :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
        clickableRows

    >


      <template #protocolId="{ item, index }">
        <td class="py-2">
          <tr v-if="item.protocolId !== null">
            {{ item.protocolId }}
          </tr>

        </td>
      </template>


      <template #taxRate="{ item, index }">
        <td class="py-2">
          <tr v-if="item.taxRate !== null">
            {{ item.protocolTaxRate.substring(0,2) }}
          </tr>

        </td>
      </template>


      <template #discount="{ item, index }">
        <td class="py-2">
          <tr v-if="item.discount !== null">
            {{ item.discount }}
          </tr>
          <tr v-else>
            -
          </tr>
        </td>
      </template>


      <template #paymentSituation="{ item, index }">
        <td class="py-2">
          <CBadge :color="getBadge(item.paymentSituation)">{{ item.paymentSituation }}</CBadge>
        </td>
      </template>

      <template #buttons="{ item, index }">
        <td class="py-2">
          <CDropdown
              color="link"
              size="lg"
              :caret="false"
              placement="top-start"
          >
            <template #toggler-content>
              &#x1F4C2;<span class="sr-only">sss</span>
            </template>
            <CDropdownItem>
              <CButton size="sm" @click="getPaymentMovementsList(item.checkingAccountUUID)"> İşlem Bilgi</CButton>
            </CDropdownItem>
            <CDropdownItem>
              <CButton size="sm" @click="setMakePaymentModal(item.checkingAccountUUID)">Ödeme Yap</CButton>
            </CDropdownItem>
            <CDropdownItem>
              <CButton size="sm" @click="setMakeDiscountModal(item.checkingAccountUUID)">İndirim Yap</CButton>
            </CDropdownItem>
          </CDropdown>


        </td>
      </template>


    </CDataTable>

    <CModal
        :show.sync="showMakePayment"
        :no-close-on-backdrop="true"
        :centered="true"
        :draggable="false"
        title="Modal title 2"
        :backdrop="true"
        size="sm"
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


                </CCardBody>
              </template>

            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Ödeme Yap</h6>
        <CButtonClose @click="showMakePayment = false" class="text-white"/>
      </template>

      <template #footer>
        <CButton @click="showMakePayment = false" color="danger">Kapat</CButton>

        <CButton @click="addPayment" color="success">
          <c-spinner v-show="loading" size="sm"></c-spinner>
          Kaydet
        </CButton>

      </template>
    </CModal>

    <CModal
        :show.sync="paymentsModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >

      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="paymentsModal">
              <template>
                <CCardBody>

                  <CDataTable
                      :items="paymentMovements"
                      :fields="fieldsTablePaymentMovement"
                      :items-per-page="5"
                      :activePage="4"
                      pagination
                      :border="true"
                      :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
                      clickableRows
                  >
                  </CDataTable>
                </CCardBody>
              </template>
            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Ödeme Hareketleri</h6>

        <CButtonClose @click="paymentsModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="paymentsModal = false" color="danger">Kapat</CButton>

      </template>
    </CModal>

    <CModal
        :show.sync="discountModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="discountModal">
              <template>
                <CCardBody>
                  <!--                  <div>-->


                  <!--                    <CAlert-->
                  <!--                        v-for="(value,key) in errors"-->
                  <!--                        :key="value.message"-->
                  <!--                        color="danger"-->
                  <!--                        :show="isError"-->
                  <!--                    >-->
                  <!--                      {{ key }}: {{ value[0] }}-->
                  <!--                    </CAlert>-->
                  <!--                  </div>-->
                  <CRow>
                    <CCol lg="12">
                      <CInput
                          label="Ödeme Miktarı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="discount.paymentAmount"
                          type="number"

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
        <CButtonClose @click="discountModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="discountModal = false" color="danger">Kapat</CButton>


        <CButton @click="makeDiscount" color="success">
          <c-spinner v-show="loading" size="sm"></c-spinner>
          Kaydet
        </CButton>


      </template>
    </CModal>
  </CCardBody>

</template>


<script>
import CheckingAccountService from "@/services/managementServices/checkingAccount.service";
import Payment from "@/models/payment";
import Discount from "@/models/discount";

export default {
  name: "CheckingAccount",

  data() {
    return {
      fieldsTableCheckingAccount: [
        {key: "protocolId", label: "Protokol Numarası"},
        {key: "total", label: "Net Ücret"},
        {key: "taxRate", label: "KDV"},
        {key: "remainingDebt", label: "Kalan Ücret"},
        {key: "discount", label: "İndirim"},
        {key: "paymentSituation", label: "Ödeme Durumu"},
        {key: "buttons", label: "İşlemler"},


      ],
      fieldsTablePaymentMovement: [
        {key: "date", label: "Tarih"},
        {key: "paymentAmount", label: "Ödeme Miktarı"},
        {key: "paymentTypeDesc", label: "Ödeme Türü"},


      ],
      checkinAccountItems: [],
      selectPaymentTypes: [],
      checkingAccountUUID: 0,
      paymentMovements: [],
      checkingAccounts: [],
      paymentsModal: false,
      payment: new Payment("", "", "", ""),
      discount: new Discount("", "", ""),
      total: 0,
      showMakePayment: false,
      paymentModal: false,
      discountModal: false,
      loading: false,
      show: false


    }
  },
  props: {
    accountLists: {
      type: Array,
    }
  },
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





    setMakePaymentModal(id) {
      this.showMakePayment = true
      this.checkingAccountUUID = id
    },
    setMakeDiscountModal(id) {
      this.discountModal = true
      this.checkingAccountUUID = id
    },

    async getPaymentType() {
      let response = await new CheckingAccountService().getPaymentType();
      this.selectPaymentTypes = response.data
      const tempArr = this.selectPaymentTypes
      const temp = this.selectPaymentTypes.splice(this.selectPaymentTypes.findIndex(v => v.label === 'İndirim'), 1)[0]
      const indexOf = tempArr.indexOf(temp)
      if (indexOf > -1) {
        tempArr.splice(indexOf, 1)
        this.selectPaymentTypes = tempArr
      }

    },


    async getPaymentMovementsList(id) {
      console.log("hjshjs")
      this.checkingAccountUUID = id
      let response = await new CheckingAccountService().getPaymentMovement(id);
      console.log("res", response.data.data)


      this.paymentMovements = response.data.data

      this.paymentsModal = true

    },


    async addPayment() {
      if (this.payment.paymentType === "") {
        this.payment.paymentType = this.selectPaymentTypes[0].value
      }
      this.loading = true
      this.payment.checkingAccountUUID = this.checkingAccountUUID

      let a = await new CheckingAccountService().addPayment(this.payment);
      if (a.status === 200) {
        this.loading = false
        this.showMakePayment = false
        await this.getCheckingAccountList()
        this.successHide();
        this.$toast.success({
          title: 'Bilgi',
          message: 'Ödeme şekli başarıyla eklendi'
        })
      } else {
        this.loading = false
      }
    },


    async makeDiscount() {
      this.discount.checkingAccountUUID = this.checkingAccountUUID
      this.loading = true
      let response = await new CheckingAccountService().makeDiscount(this.discount);
      if (response.status === 200) {
        this.loading = false
        this.discountModal = false
        await this.getCheckingAccountList()
        this.$toast.success({
          title: 'Başarılı',
          message: 'İndirim işlemi başarıyla gerçekleştirilmiştir'
        })

      } else {
        this.loading = false
      }

    }


  },
  async created() {
    await this.getCheckingAccountList()
    await this.getPaymentType()
  }

}
</script>

<style scoped>

</style>