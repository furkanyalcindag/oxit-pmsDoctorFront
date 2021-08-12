<template>
  <CRow>
    <CCol lg="9">
      <CRow>
        <CCol lg="12">
          <GeneralInfo></GeneralInfo>
        </CCol>
        <CCol lg="12">
          <About></About>
        </CCol>
        <CCol lg="12">
          <ContactInfo></ContactInfo>
        </CCol>
        <CCol lg="12">
          <EducationInfo></EducationInfo>
        </CCol>
        <CCol lg="12">
          <Prize></Prize>
        </CCol>
        <CCol lg="12">
          <Article></Article>
        </CCol>
         <CCol lg="12">
          <Media></Media>
        </CCol>
      </CRow>
    </CCol>
    <CCol lg="3">
      <CRow>
        <CCol lg="12">
          <CCard>
            <ArticleTimeline></ArticleTimeline>
          </CCard>
        </CCol>
        <CCol lg="12">
          <MediaCarousel></MediaCarousel>
        </CCol>
      </CRow>


    </CCol>

  </CRow>


</template>

<script>
import GeneralInfo from "@/views/pms-doctor/doctor/GeneralInfo";
import ContactInfo from "@/views/pms-doctor/doctor/ContactInfo";
import About from "@/views/pms-doctor/doctor/About";


import Article from "@/views/pms-doctor/doctor/Article";
import ArticleTimeline from "@/views/pms-doctor/doctor/ArticleTimeline";
import EducationInfo from "@/views/pms-doctor/doctor/EducationInfo";
import Prize from "@/views/pms-doctor/doctor/Prize";
import MediaCarousel from "@/views/pms-doctor/doctor/MediaCarousel";
import Media from "@/views/pms-doctor/doctor/Media";


export default {
  name: "DoctorProfile",
  components: {
    GeneralInfo,
    ContactInfo,
    About,
    EducationInfo,
    Prize,
    Article,
    ArticleTimeline,
    MediaCarousel,
    Media


  }

}
</script>