<template>
  <div>
    <GeneralInfo></GeneralInfo>
    <ContactInfo></ContactInfo>
    <About></About>
  </div>


</template>

<script>
import GeneralInfo from "@/views/pms-doctor/doctor/GeneralInfo";
import ContactInfo from "@/views/pms-doctor/doctor/ContactInfo";
import About from "@/views/pms-doctor/doctor/About";

export default {
  name: "DoctorProfile",
  components: {
    GeneralInfo,
    ContactInfo,
    About


  }

}
</script>

<style scoped>

</style>