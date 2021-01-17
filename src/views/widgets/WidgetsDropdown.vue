<template>
<div>



 <CRow>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon
          header="180.000 TL"
          text="CARİ (AYLIK)"
          color="primary"
          :icon-padding="false"
        >
          <CIcon name="cil-settings" class="mx-2 " width="24"/>
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon
           header="80.000 TL"
          text="CARİ (HAFTALIK)"
          color="info"
          :icon-padding="false"
        >
          <CIcon name="cil-laptop" class="mx-2 " width="24"/>
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon
           header="10.000 TL"
          text="CARİ (GÜNLÜK)"
          color="warning"
          :icon-padding="false"
        >
          <CIcon name="cil-moon" class="mx-2 " width="24"/>
          <template #footer>
            <CCardFooter class="card-footer px-3 py-2">
              <CLink
                class="font-weight-bold font-xs btn-block text-muted"
                href="https://coreui.io/"
              >
                View more
                <CIcon name="cil-arrowRight" class="float-right" width="16"/>
              </CLink>
            </CCardFooter>
          </template>
        </CWidgetIcon>
      </CCol>




    <CCol col="12" sm="6" lg="3">
        <CWidgetIcon
           header="44.000 TL"
          text="VADESİ GEÇMİŞ"
          color="danger"
          :icon-padding="false"
        >
          <CIcon name="cil-people" class="mx-2 " width="24"/>
          <template #footer>
            <CCardFooter class="card-footer px-3 py-2">
              <CLink
                class="font-weight-bold font-xs btn-block text-muted"
                href="https://coreui.io/"
              >
                View more
                <CIcon name="cil-arrowRight" class="float-right" width="16"/>
              </CLink>
            </CCardFooter>
          </template>
        </CWidgetIcon>
      </CCol>


    </CRow>



    <CRow>
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
          header="155"
          text="FİRMA SAYISI"
          color="info"
          inverse
          :value="100"
        >
          <CIcon name="cil-people" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
          header="385"
          text="ARAÇ SAYISI"
          color="success"
          inverse
        >
          <CIcon name="cil-userFollow" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
          header="5"
          text="DEVAM EDEN İŞLER"
          color="warning"
          inverse
        >
          <CIcon name="cil-basket" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
          header="2"
          text="ONAY BEKLEYEN İŞLER"
          color="primary"
          inverse
        >
          <CIcon name="cil-chartPie" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
          header="954"
          text="ÜRÜN SAYISI"
          color="danger"
          inverse
        >
          <CIcon name="cil-speedometer" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
          header="15"
          text="STOK BİTENLER"
          color="info"
          inverse
        >
          <CIcon name="cil-speech" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
    </CRow>






   


 <CRow>
      <CCol col="12" sm="6" lg="4">
        <CWidgetIcon
          header="5"
          text="TAMAMLANAN İŞ (GÜNLÜK)"
          color="primary"
          :icon-padding="false"
        >
          <CIcon name="cil-settings" class="mx-2 " width="24"/>
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="6" lg="4">
        <CWidgetIcon
           header="36"
          text="TAMAMLANAN İŞ (HAFTALIK)"
          color="info"
          :icon-padding="false"
        >
          <CIcon name="cil-laptop" class="mx-2 " width="24"/>
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="6" lg="4">
        <CWidgetIcon
           header="63"
           text="TAMAMLANAN İŞ (AYLIK)"
          color="warning"
          :icon-padding="false"
        >
          <CIcon name="cil-moon" class="mx-2 " width="24"/>
          <template #footer>
            <CCardFooter class="card-footer px-3 py-2">
              <CLink
                class="font-weight-bold font-xs btn-block text-muted"
                href="https://coreui.io/"
              >
                View more
                <CIcon name="cil-arrowRight" class="float-right" width="16"/>
              </CLink>
            </CCardFooter>
          </template>
        </CWidgetIcon>
      </CCol>
    </CRow>



</div>




</template>