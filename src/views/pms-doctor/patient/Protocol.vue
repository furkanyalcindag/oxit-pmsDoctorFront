<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Hasta Bilgileri
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
                <CRow>
                  <CCol lg="2">
                    <h5>
                      İsim Soyisim:
                    </h5>
                  </CCol>
                  <CCol lg="3">
                    <h5>{{ patient.firstName }} {{ patient.lastName }}</h5>
                  </CCol>
                  <CCol lg="2">
                    <h5>
                      TC:
                    </h5>
                  </CCol>
                  <CCol lg="3">
                    <h5>{{ patient.identityNumber }}</h5>
                  </CCol>
                </CRow>
                <hr>
                <CRow>
                  <CCol lg="2">
                    <h5>
                      Doğum Tarihi:
                    </h5>
                  </CCol>
                  <CCol lg="3">
                    <h5>{{ patient.birthDate }}</h5>
                  </CCol>
                  <CCol lg="2">
                    <h5>
                      Adres:
                    </h5>
                  </CCol>
                  <CCol lg="3">
                    <h5>{{ patient.address }}</h5>
                  </CCol>
                </CRow>
                <hr>
                <CRow>
                  <CCol lg="2">
                    <h5>
                      Kan Grubu:
                    </h5>
                  </CCol>
                  <CCol lg="3">
                    <h5>{{ patient.bloodGroup.label }}</h5>
                  </CCol>
                  <CCol lg="2">
                    <h5>
                      Telefon Numarası:
                    </h5>
                  </CCol>
                  <CCol lg="3">
                    <h5>{{ patient.mobilePhone }}</h5>
                  </CCol>
                </CRow>
                <hr>
                <CRow>

                  <CCol lg="2">
                    <h5>
                      Cinsiyet:
                    </h5>
                  </CCol>
                  <CCol lg="3">
                    <h5>{{ patient.gender.label }}</h5>
                  </CCol>
                  <CCol lg="2">
                    <h5>
                      E-Mail
                    </h5>
                  </CCol>
                  <CCol lg="3">
                    <h5>{{ patient.email }}</h5>
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
                <CTabs>
                  <CTab title="Protokol Ekle" active>
                    <CCard class="mt-5">
                      <CCard>
                        <CCardHeader>
                          <div class="card-header-actions">
                            <CButton color="primary" size="sm" @click="protocolUpdateModal=true">Tahlil Ekle</CButton>

                          </div>
                        </CCardHeader>
                        <CCardBody>
                          <CRow>
                            <CCol lg="6">
                              <validation-observer ref="simpleRules">
                                <CRow>
                                  <CCol lg="12">
                                    <validation-provider
                                        #default="{errors}"
                                        rules="required|min:3|max:10000"
                                        name="Şikayet">
                                      Şikayet<span class="text-danger">*</span>
                                      <span class="text-danger">{{ errors[0] }}</span>
                                      <CTextarea

                                          description=""
                                          rows="4"
                                          autocomplete="autocomplete"
                                          v-model="protocol.description"
                                          :state="errors.length > 0 ? false:null"
                                      />
                                    </validation-provider>
                                  </CCol>
                                </CRow>
                              </validation-observer>
                            </CCol>

                            <CCol v-if="protocol.assays.length" lg="6">
                              <CCardSubtitle class="mt-2">İstenilen Tahliller
                              </CCardSubtitle>
                              <CListGroup>
                                <CListGroupItem>
                                  <CListGroup>
                                    <CListGroupItem v-for="(selected,index) in protocol.assays">
                                      <CRow>
                                        <CCol lg="10">
                                          {{ selected.name }} ({{ selected.price }} TL)
                                        </CCol>
                                        <CCol lg="2">
                                          <CButton class="btn-outline-danger" @click="minusSelectedAssay(selected)">
                                            <CIcon :content="$options.freeSet.cilMinus"
                                                   name="cil-minus"/>
                                          </CButton>
                                        </CCol>
                                      </CRow>
                                    </CListGroupItem>
                                  </CListGroup>
                                </CListGroupItem>
                              </CListGroup>
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol lg="6">
                              <CRow>
                                <CCol lg="4">
                                  <h6>
                                    Ücretli mi ? <span class="text-danger">*</span>
                                  </h6>
                                  <CSwitch
                                      class="mx-1"
                                      color="primary"
                                      name="switch1"
                                      :checked.sync="isPaid"
                                      v-model="isPaid"
                                  />
                                </CCol>
                                <CCol v-if="isPaid" lg="4">
                                  <h6>
                                    Ücret
                                  </h6>
                                  <CInput
                                      min="0"
                                      max="2000"
                                      type="number"
                                      v-model="protocol.price"
                                  />
                                </CCol>

                                <CCol v-if="isPaid" lg="4">
                                  <h6>
                                    KDV
                                  </h6>
                                  <CInput
                                      min="0"
                                      max="20"
                                      type="number"
                                      v-model="protocol.taxRate"
                                  />
                                </CCol>
                              </CRow>
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol lg="6">
                              <CButton @click="addProtocol" color="primary">
                                <c-spinner v-show="loading" size="sm"></c-spinner>
                                Kaydet
                              </CButton>
                            </CCol>
                          </CRow>
                        </CCardBody>
                      </CCard>
                    </CCard>
                  </CTab>
                  <CTab title="Protokoller">
                    <CCardBody>

                      <CDataTable
                          :items="protocols"
                          :fields="fieldsTable"
                          :border="true"
                          :items-per-page="5"
                          :activePage="4"
                          hover
                          pagination
                          :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
                          clickableRows

                      >
                        <template #patient="{ item, index }">
                          <td class="py-2">

                            {{ item.patient.label }}
                          </td>
                        </template>

                        <template #assayList="{ item, index }">
                          <td class="py-2">

                            <span v-for="assay in item.assayList">{{ assay.name }} - </span>
                          </td>
                        </template>


                        <template #actions="{ item, index }">
                          <td class="py-2">


                            <CButton @click="getSingleOldProtocol(item.uuid)" color="success">Görüntüle</CButton>
                          </td>
                        </template>
                      </CDataTable>
                    </CCardBody>
                  </CTab>
                  <CTab title="Muhasebe">
                    <CCard>
                      <CCardBody>

                        <CDataTable
                            :items="checkinAccountItems"
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
                                {{ item.protocolTaxRate.substring(0, 2) }}
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

                          <template #actions="{ item, index }">
                            <td class="py-2">
                              <CDropdown size="sm" color="dark" toggler-text="İşlemler">
                                <CDropdownItem>
                                  <CButton size="sm" @click="getPaymentMovementsList(item.checkingAccountUUID)"> İşlem
                                    Bilgi
                                  </CButton>
                                </CDropdownItem>
                                <CDropdownItem>
                                  <CButton size="sm" @click="setMakePaymentModal(item.checkingAccountUUID)">Ödeme Yap
                                  </CButton>
                                </CDropdownItem>
                                <CDropdownItem>
                                  <CButton size="sm" @click="setMakeDiscountModal(item.checkingAccountUUID)">İndirim
                                    Yap
                                  </CButton>
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
                            size="lg"
                            color="dark"
                        >
                          <CRow>
                            <CCol lg="12">
                              <transition name="fade">
                                <CCard v-if="showMakePayment">
                                  <template>
                                    <CCardBody>
                                      <validation-observer ref="simpleRules">
                                        <CRow>
                                          <CCol lg="12">
                                            <validation-provider
                                                #default="{errors}"
                                                rules="required"
                                                name="Ödeme Tutarı">
                                              Ödeme Tutarı (TL) <span class="text-danger">*</span>
                                              <span class="text-danger">{{ errors[0] }}</span>
                                              <CInput
                                                  description=""
                                                  autocomplete="autocomplete"
                                                  v-model="payment.paymentAmount"
                                                  :state="errors.length > 0 ? false:null"

                                              />
                                            </validation-provider>
                                          </CCol>
                                        </CRow>
                                      </validation-observer>
                                      <CRow>
                                        <CCol lg="12">
                                          Ödeme Tipi <span class="text-danger">*</span>
                                          <CSelect
                                              :options="selectPaymentTypes"
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

                            <CButton @click="validationFormPayment" color="success">
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
                            size="lg"
                            color="dark"
                        >
                          <CRow>
                            <CCol lg="12">
                              <transition name="fade">
                                <CCard v-if="discountModal">
                                  <template>
                                    <CCardBody>
                                      <validation-observer ref="simpleRules">
                                        <CRow>
                                          <CCol lg="12">
                                            <validation-provider
                                                #default="{errors}"
                                                rules="required|min:1|max:100"
                                                name="Ödeme Tutarı">
                                              Ödeme Tutarı(TL) <span class="text-danger">*</span>
                                              <span class="text-danger">{{ errors[0] }}</span>
                                              <CInput
                                                  v-model="discount.paymentAmount"
                                                  :state="errors.length > 0 ? false:null"
                                              />
                                            </validation-provider>
                                          </CCol>
                                        </CRow>
                                      </validation-observer>
                                    </CCardBody>
                                  </template>

                                </CCard>
                              </transition>
                            </CCol>
                          </CRow>
                          <template #header>
                            <h6 class="modal-title">İndirim İşlemleri</h6>
                            <CButtonClose @click="discountModal = false" class="text-white"/>
                          </template>
                          <template #footer>
                            <CButton @click="discountModal = false" color="danger">Kapat</CButton>


                            <CButton @click="validationFormDiscount" color="success">
                              <c-spinner v-show="loading" size="sm"></c-spinner>
                              Kaydet
                            </CButton>


                          </template>
                        </CModal>
                      </CCardBody>
                    </CCard>
                  </CTab>
                </CTabs>
              </CCardBody>
            </template>
          </CCard>
        </transition>
      </CCol>
    </CRow>


    <CModal
        :show.sync="showResultModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="showResultModal">
              <template>
                <CCardBody>
                  <CTableWrapper :items="getShuffledUsersData()" :fields="fieldsTableAssay">

                  </CTableWrapper>
                </CCardBody>
              </template>
            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Sonuçlar</h6>
        <CButtonClose @click="showResultModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="showResultModal = false" color="danger">Kapat</CButton>

      </template>


    </CModal>
    <CModal
        :show.sync="protocolUpdateModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="protocolUpdateModal">
              <template>
                <CCardBody>
                  <validation-observer ref="simpleRules">
                    <CRow>


                      <CCol lg="10">
                        Tahlil Adı
                        <CInput
                            placeholder="Tahlil Adı Girerek Arama Yapabilirsiniz"
                            v-model="assay.assayName"
                            @input="getAssays(page)"
                        />
                      </CCol>
                      <CCol lg="2" class="mt-3">
                        <CButton @click="getAssays(1)" color="success">Tüm Tahlilleri Görüntüle</CButton>

                      </CCol>

                    </CRow>
                  </validation-observer>
                  <hr>
                  <CRow>
                    <CCol lg="6">

                      <CListGroup>
                        <CListGroupItem v-for="assay in assayArray">
                          <CRow>
                            <CCol lg="10">
                              {{ assay.name }} ({{ assay.price }}TL)
                            </CCol>
                            <CCol lg="2">
                              <CButton class="btn-outline-success" @click="pushSelectedAssay(assay)">
                                <CIcon :content="$options.freeSet.cilPlus"
                                       name="cil-plus"/>

                              </CButton>
                            </CCol>
                          </CRow>


                        </CListGroupItem>
                        <CPagination
                            v-show="assayArray.length"
                            :activePage.sync="page"
                            :pages="pageCount"
                            size="sm"
                            align="center"
                            class="mt-2"
                        />
                      </CListGroup>
                    </CCol>
                    <CCol lg="6" v-if="selectedAssays.length">
                      <CCard>
                        <CListGroup>
                          <CListGroupItem v-for="selected in selectedAssays">{{ selected.name }}</CListGroupItem>
                        </CListGroup>
                      </CCard>
                      <p class="d-flex justify-content-end">Toplam Tutar: {{ totalPrice }} TL</p>
                    </CCol>
                    <CCol v-else>
                      <CCard>
                        <CCardBody>
                          Eklediğiniz tahliller burada listelenecektir
                        </CCardBody>
                      </CCard>

                    </CCol>
                  </CRow>
                </CCardBody>
              </template>
            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Tahlil Ekle</h6>
        <CButtonClose @click="closeModalAssay" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="closeModalAssay" color="danger">Kapat</CButton>
        <CButton @click="setAssayModal" color="success">
          Ekle
        </CButton>
      </template>
    </CModal>
    <CModal
        :show.sync="protocolNewUpdateModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="protocolNewUpdateModal">
              <template>
                <CCardBody>
                  <CRow>
                    <CCol lg="6">
                      <span class="text-uppercase text-dark">Şikayet</span>
                      <CTextarea
                          rows="10"
                          disabled
                          v-model="protocolUpdate.description"
                      />
                    </CCol>
                    <CCol v-if="patientAssays.length" lg="6">
                      <span v-if="patientAssays.length" class="text-uppercase text-dark">Tahliller</span>
                      <CListGroup v-if="patientAssays.length">

                        <CListGroupItem v-for="(selected,index) in patientAssays" :key="index">
                          <CRow>

                            <CCol lg="9">
                              {{ selected.label }}

                            </CCol>

                            <CCol lg="3">

                              <CButton @click="getSingleAssayResult(selected.value)" color="success">Görüntüle
                              </CButton>
                            </CCol>
                          </CRow>


                        </CListGroupItem>


                      </CListGroup>


                    </CCol>
                    <CCol v-else lg="6">
                      <CCard class="mt-4">
                        <CCardBody class="text-uppercase">Listelenecek Tahlil Yok</CCardBody>
                      </CCard>
                    </CCol>

                    <CCol lg="6">
                      <CButton class="btn-block" color="primary" @click="getSingleDiagnosis">Teşhis Ekle</CButton>
                    </CCol>
                  </CRow>

                </CCardBody>
              </template>
            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Protokol</h6>
        <CButtonClose @click="protocolNewUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="protocolNewUpdateModal = false" color="danger">Kapat</CButton>

      </template>
    </CModal>
    <CModal
        :show.sync="getDiagnosis"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="getDiagnosis">
              <template>
                <CCardBody>
                  <validation-observer ref="simpleRules">
                    <CRow v-if="showDiagnosis">

                      <CCol lg="12">
                        <validation-provider
                            #default="{errors}"
                            rules="required|min:3|max:10000"
                            name="Teşhis">
                          Teşhis <span class="text-danger">*</span>
                          <span class="text-danger">{{ errors[0] }}</span>
                          <CTextarea
                              rows="6"
                              v-model="diagnosis.diagnosis"
                              :state="errors.length > 0 ? false:null"
                          />
                        </validation-provider>
                      </CCol>
                      <CCol lg="6">
                        <CRow>
                          <CCol lg="6">
                            İlaç Adı
                            <CInput
                                placeholder="İlaç Adı Giriniz"
                                autocomplete="autocomplete"
                                v-model="medicineName"
                            />
                          </CCol>
                          <CCol class="mt-3" lg="6">
                            <CButton class="btn-outline-success" @click="pushSelectedMedicine(medicineName)">
                              <CIcon :content="$options.freeSet.cilPlus"
                                     name="cil-plus"/>
                            </CButton>
                          </CCol>
                        </CRow>
                      </CCol>
                      <CCol v-if="selectedMedicines.length" lg="6">
                        <span> Eklenen İlaçlar</span>
                        <CCard>


                          <CListGroup>
                            <CListGroupItem v-for="selected in selectedMedicines">
                              <CRow>
                                <CCol lg="10">
                                  {{ selected }}
                                </CCol>
                                <CCol lg="2">
                                  <CButton class="btn-outline-danger" @click="minusSelectedMedicine(selected)">
                                    <CIcon :content="$options.freeSet.cilMinus"
                                           name="cil-minus"/>
                                  </CButton>
                                </CCol>
                              </CRow>


                            </CListGroupItem>
                          </CListGroup>
                        </CCard>
                      </CCol>
                      <CCol class="d-flex justify-content-end" lg="12">
                        <CButton color="success" @click="validationForm">
                          <c-spinner v-show="loading" size="sm"></c-spinner>
                          Kaydet
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow v-else>
                      <CCol lg="8">
                        <CCard>
                          <CCardHeader class="d-flex justify-content-center text-uppercase" style="color:black">Teşhis
                          </CCardHeader>
                          <CCardBody>
                            {{ diagnosis.diagnosis }}
                          </CCardBody>
                        </CCard>
                      </CCol>
                      <CCol lg="4">
                        <CCard>
                          <CCardHeader class="d-flex justify-content-center text-uppercase" style="color: black">
                            İlaçlar
                          </CCardHeader>
                          <CListGroup>
                            <CListGroup v-for="(medicine,index) in patientMedicines">

                              <CListGroupItem v-if="(index%2)===0" color="dark"> {{ medicine.name }}</CListGroupItem>
                              <CListGroupItem v-else color="secondary">{{ medicine.name }}</CListGroupItem>

                            </CListGroup>
                          </CListGroup>
                        </CCard>
                      </CCol>
                    </CRow>
                  </validation-observer>
                </CCardBody>
              </template>


            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Teşhis</h6>
        <CButtonClose @click="clearDiagnosisModal" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="clearDiagnosisModal" color="danger">Kapat</CButton>
      </template>
    </CModal>


  </div>
</template>

<script>

import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import Clinic from "@/models/pms/clinic";
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {required, email, min, max} from 'validations'
import Doctor from "@/models/pms/doctor";
import Patient from "@/models/pms/patient";
import PatientService from "@/services/managementServices/patient.service";
import Protocol from "@/models/pms/protocol";
import VSimpleCheckbox from 'vuetify'
import ProtocolService from "@/services/managementServices/protocol.service";
import AssayService from "@/services/managementServices/assay.service";
import Assay from "@/models/pms/assay";
import {freeSet} from "@coreui/icons";
import CTableWrapper from '@/views/base/Table.vue'
import DiagnosisService from "../../../services/managementServices/diagnosis.service";
import Diagnosis from "../../../models/pms/diagnosis";
import MedicineService from "../../../services/managementServices/medicine.service";
import Payment from "@/models/payment";
import Discount from "@/models/discount";
import CheckingAccountService from "@/services/managementServices/checkingAccount.service";
import CheckingAccount from "@/views/checkingAccount/CheckingAccount";

export default {
  name: "Clinic",
  freeSet,
  components: {
    ValidationProvider,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    VSimpleCheckbox,
    CTableWrapper,
  },
  data() {
    return {
      fieldsTable: [
        {key: 'description', label: "Açıklama", _style: "min-width:200px"},
        {key: "patient", label: "Hasta"},
        {key: "situation", label: "Durum"},
        {key: "actions", label: "İşlemler"},
      ],
      fieldsTableAssay: [
        {key: 'assayName', label: "Açıklama", _style: "min-width:200px"},
        {key: "refNo", label: "Referans Değeri"},
        {key: "assayNo", label: "Tahlil Değeri"},
      ],

      fieldsTableCheckingAccount: [
        {key: "protocolId", label: "Protokol Numarası"},
        {key: "total", label: "Net Ücret"},
        {key: "taxRate", label: "KDV"},
        {key: "remainingDebt", label: "Kalan Ücret"},
        {key: "discount", label: "İndirim"},
        {key: "paymentSituation", label: "Ödeme Durumu"},
        {key: "actions", label: "İşlemler"},


      ],

      fieldsTablePayment: [
        {key: 'paymentAmount', label: "Ödeme Miktarı", _style: "min-width:200px"},
        {key: "paymentDate", label: "Tarih"},
        {key: "paymentTypeDesc", label: "Ödeme Tipi"},

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
      clinic: new Clinic("", "", "", "", "", "", "", "", "", ""),
      isSuccess: false,
      isSuccessCar: false,
      isError: false,
      errorsStaff: [],
      isErrorCustomerUpdate: false,
      groups: [],
      protocolUpdateModal: false,
      details: [],
      errors: [],
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
      clinics: [],
      city: '',
      district: '',
      cit: '',
      updateId: 0,
      updateModal: false,
      clinicUpdate: new Clinic("", "", "", "", "", "", "", "", "", ""),
      cityUpdate: '',
      districtUpdate: '',
      required,
      email,
      min,
      max,
      doctor: new Doctor("", "", "", "", "", "", "", ""),
      doctorUpdate: new Doctor("", "", "", "", "", "", "", ""),
      departments: [],
      doctors: [],
      patient: new Patient("", "", "", "", "", "", "", "", "", "",),
      genders: [],
      bloodgroups: [],
      patients: [],
      protocol: new Protocol("", [], "", false, "", "", 0, ""),
      protocolUpdate: new Protocol("", [], "", false, "", "", 0, ""),
      protocols: [],
      assays: [],
      isPaid: false,
      appointments: [],
      assayArray: [],
      assay: new Assay("",),
      assayUpdate: new Assay("",),
      selectedAssays: [],
      protocolNewUpdateModal: false,
      showResultModal: false,
      selectPaymentTypes: [],
      usersData: [
        {'assayName': 'Smjhjhjuhjh', 'refNo': '686876', 'assayNo': '87878', 'status': 'Active'},
        {'assayName': 'Estavan Lykos', 'refNo': '8787877', 'assayNo': '988787', 'status': 'Banned'},
        {'assayName': 'Chetan Mohamed', 'refNo': '8788787', 'assayNo': '878787', 'status': 'Inactive'},
        {'assayName': 'Derick Maximinus', 'refNo': '87878787', 'assayNo': '878787', 'status': 'Pending'},
        {'assayName': 'Friderik Dávid', 'refNo': '8887787', 'assayNo': '7877', 'status': 'Active'},
      ],
      patientAssays: [],
      diagnosis: new Diagnosis("", "", []),
      showDiagnosis: false,
      selectedMedicines: [],
      medicineName: '',
      protocolId: '',
      id: '',
      getDiagnosis: false,
      patientMedicines: [],
      remainCheckout: 0,
      totalCheckout: 0,
      checkingAccountUUID: '',
      showServiceDetail: false,
      showMakePayment: false,
      checkingAccounts: [],
      serviceDetail: null,
      carPlate: '',
      paymentMovements: [],
      paymentsModal: false,
      discountModal: false,
      showUpdateCategory: true,
      payment: new Payment("", "", "", ""),
      discount: new Discount("", "", ""),
      checkinAccountItems: [],
      fieldsTablePaymentMovement: [
        {key: "date", label: "Tarih"},
        {key: "paymentAmount", label: "Ödeme Miktarı"},
        {key: "paymentTypeDesc", label: "Ödeme Türü"},


      ],
      paymentModal: false,
      totalPrice: 0,
      pageCount: 0

    };

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

    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });

    },
    async getCheckingAccountList() {
      let response = await new CheckingAccountService().checkingAccountList(this.$route.params.patient);
      this.checkinAccountItems = response.data.data

    },
    clearDiagnosisModal() {
      this.diagnosis.diagnosis = ''
      this.selectedMedicines = []
      this.getDiagnosis = false

    },
    setAssayModal() {
      this.selectedAssays = []
      this.protocolUpdateModal = false
    },
    async getSingleOldProtocol(id) {
      this.protocolId = id
      this.protocolNewUpdateModal = true
      let response = await new ProtocolService().getSingleProtocol(id)
      this.id = response.data.protocolId
      await this.getPatientAssays(id)
      this.protocolUpdate = response.data

    },

    async getPatientAssays(id) {
      let response = await new AssayService().getSinglePatientAssay(id)
      this.patientAssays = response.data

    },
    closeModalAssay() {
      this.protocol.assays = []
      this.selectedAssays = []
      this.protocolUpdateModal = false
    },

    async getSingleAssayResult(id) {
      this.showResultModal = true
      this.protocolNewUpdateModal = false
      let response = await new ProtocolService().getResultAssay(id, this.$route.params.patient)
      this.assayUpdate = response.data
    },

    async minusSelectedAssay(index) {
      const deneme = this.protocol.assays.indexOf(index)
      if (deneme > -1) {
        this.protocol.assays.splice(deneme, 1)
      }
    },
    async minusSelectedMedicine(index) {
      const deneme = this.selectedMedicines.indexOf(index)
      if (deneme > -1) {
        this.selectedMedicines.splice(deneme, 1)
      }
    },
    isUniqeElementInArray(uuid, array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].uuid === uuid) {
          return false
        }

      }
      return true;
    },
    isUniqeElementInMedicineArray(name, array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].name === name) {
          return false
        }

      }
      return true;
    },


    async getSinglePatient() {
      let response = await new PatientService().getSinglePatient(this.$route.params.patient)
      this.patient = response.data
    },
    async getAssays(page) {
      let response = await new AssayService().getAssays(this.assay.assayName, page)
      this.assayArray = response.data.data
      this.pageCount = response.data.activePage
    },
    async pushSelectedAssay(assay) {
      let obj = {
        name: assay.name,
        uuid: assay.uuid,
        price: assay.price
      }
      if (this.isUniqeElementInArray(obj.uuid, this.selectedAssays)) {
        this.selectedAssays.push(obj)
        this.totalPrice += parseFloat(obj.price)
      }
      obj = {}

      this.protocol.assays = this.selectedAssays
    },
    async pushSelectedMedicine(medicine) {
      if (this.medicineName !== '') {
        if (this.isUniqeElementInMedicineArray(medicine, this.selectedMedicines)) {
          this.selectedMedicines.push(medicine)
        }
        this.diagnosis.medicines = this.selectedMedicines
        this.medicineName = ''
      } else {
        this.$toast.warn({
          title: 'Uyarı',
          message: "Lütfen Bir İlaç Adı Giriniz"
        })
      }

    },
    async addProtocol() {
      this.protocol.isPaid = this.isPaid
      if (!this.protocol.isPaid) {
        this.protocol.price = 0
        this.protocol.taxRate = 0
      }
      this.loading = true
      for (let i = 0; i < this.protocol.assays.length; i++) {
        this.protocol.assays[i] = this.protocol.assays[i].uuid
      }
      this.protocol.patient = this.$route.params.patient
      let response = await new ProtocolService().addProtocol(this.protocol)
      if (response.status === 200) {
        this.loading = false
        await this.getOldProtocols()
        await this.getCheckingAccountList()
        this.protocol.price = 0
        this.protocol.taxRate = 0
        this.protocol.description = ''
        this.protocol.assays = []
        this.isPaid = false
        this.$toast.success({
          title: 'Başarılı',
          message: "Protokol başarıyla eklendi"
        })
      } else {
        this.loading = false
      }
    },


    async getOldProtocols() {
      let response = await new ProtocolService().getPatientProtocols(this.$route.params.patient)
      this.protocols = response.data
    },
    async addDiagnosis() {
      this.loading = true
      this.diagnosis.protocolId = this.protocolId
      let response = await new DiagnosisService().addDiagnosis(this.diagnosis)
      if (response.status === 200) {
        this.showDiagnosis = false
        this.loading = false
        await this.getSingleDiagnosis()
        await this.getOldProtocols()
        this.$toast.success({
          title: 'Başarılı',
          message: "Teşhis başarıyla eklendi"
        })
      } else {
        this.loading = false
        this.isError = true;
        this.errors = response.response.data;
        for (const [key, value] of Object.entries(this.errors)) {
          this.$toast.error({
            title: 'Hata',
            message: `${key}: ${value}`
          })
        }
      }

    },
    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          await this.addDiagnosis()
        } else {
          this.loading = false
        }


      })
    },

    async getSingleDiagnosis() {
      this.getDiagnosis = true
      this.protocolNewUpdateModal = false
      let response = await new DiagnosisService().getDiagnosis(this.id)
      if (response.status === 200) {
        this.diagnosis = response.data
        this.showDiagnosis = false
        await this.getDiagnosisMedicines()
      } else {
        this.showDiagnosis = true
      }

    },
    async getDiagnosisMedicines() {
      let response = await new MedicineService().getMedicines(this.diagnosis.uuid)
      this.patientMedicines = response.data

    },
    setDeleteModal(id) {

      this.deleteId = id
      this.deleteModel = true
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
      this.checkingAccountUUID = id
      let response = await new CheckingAccountService().getPaymentMovement(id);


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
        this.$toast.warn({
          title: 'Uyarı',
          message: a.data
        })
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
        this.$toast.warn({
          title: 'Uyarı',
          message: response.data
        })
        this.loading = false
      }

    },
    validationFormDiscount() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          await this.makeDiscount()
        }
      })
    },
    validationFormPayment() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          await this.addPayment()
        }
      })
    }
  },

  watch: {

    page: function (val) {
      console.log(val)
      this.getAssays(this.page)

    },
  },

  async created() {
    await this.getCheckingAccountList()
    await this.getSinglePatient()
    await this.getOldProtocols()
    await this.getPaymentType()


  },
  async mounted() {

  },
  computed: {}

};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
