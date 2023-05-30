<script setup>
import { onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";

//example components
import DefaultNavbar from "../../../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../../examples/footers/DefaultFooter.vue";

//image
import bg0 from "@/assets/img/k1.jpg";

//dep
import Typed from "typed.js";

//sections
import Information from "./Sections/AboutInformation.vue";
import AboutTeam from "./Sections/AboutTeam.vue";
import BuiltByDevelopers from "../../Presentation/Components/BuiltByDevelopers.vue";


const body = document.getElementsByTagName("body")[0];
//hooks
onMounted(() => {
  body.classList.add("about-us");
  body.classList.add("bg-gray-200");

  if (document.getElementById("typed")) {
    // eslint-disable-next-line no-unused-vars
    var typed = new Typed("#typed", {
      stringsElement: "#typed-strings",
      typeSpeed: 90,
      backSpeed: 0,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
    });
  }
});

onUnmounted(() => {
  body.classList.remove("about-us");
  body.classList.remove("bg-gray-200");
});
</script>
<template>
  <DefaultNavbar
    transparent
  />
  <header class="bg-gradient-dark">
    <div
      class="page-header min-height-600 min-vh-75"
      :style="{ backgroundImage: `url(${bg0})` }"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h1 class="text-white">
              We Can <span class="text-white" id="typed"></span>
            </h1>
            <div id="typed-strings">
              <h1>Repair Your Devices</h1>
              <h1>Upgrade Softwares</h1>
              <h1>Maintain Your Devices</h1>
              <h1>Upgrade Hardwares</h1>
              <h1>Replace Parts</h1>
              
            </div>
            <p class="lead mb-4 text-white opacity-8">
              Our team is here to help you with all your repair and service needs, ensuring that your devices are in optimal condition to support your endeavors.
            </p>

            <a
            role="button"
              class="btn bg-white text-dark"
              id="dropdownMenuPages"
              @click="$router.push({ name: 'author' })"
            >
              Track Your Order
            </a>

            <h6 class="text-white mb-2 mt-5">Find us on</h6>
            <div class="d-flex justify-content-center">
              <a href="javascript:;"
                ><i class="fab fa-facebook text-lg text-white me-4"></i
              ></a>
              <a href="javascript:;"
                ><i class="fab fa-instagram text-lg text-white me-4"></i
              ></a>
              <a href="javascript:;"
                ><i class="fab fa-twitter text-lg text-white me-4"></i
              ></a>
              <a href="javascript:;"
                ><i class="fab fa-google-plus text-lg text-white"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
    <BuiltByDevelopers />
    <div class="container">
      <div class="row">
        <div class="row justify-content-center text-center my-sm-5">
          <div class="col-lg-6 ">
            <MaterialBadge color="success" class="mb-3"
            >Infinite combinations</MaterialBadge
            >
            
            <h2 class="text-dark mb-0">SERVVIZ</h2>
            <p class="lead">
              SERVVIZ is an online platform providing repair services and offering warranty coverage for repair or replacement of parts.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Information />
    <AboutTeam />
  </div>
  <DefaultFooter />
</template>


