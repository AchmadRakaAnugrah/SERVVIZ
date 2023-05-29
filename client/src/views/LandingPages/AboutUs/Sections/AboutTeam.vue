<script setup>
// example component
import HorizontalTeamCard from "@/examples/cards/teamCards/HorizontalTeamCard.vue";

// images
import Raka from "@/assets/img/Raka.png";
import Rafi from "@/assets/img/Rafi.jpeg";
import Dylan from "@/assets/img/Dylan.jpg";
import marquez from "@/assets/img/ivana-square.jpg";
</script>

<template>
  <section class="pb-5 position-center  bg-gradient-dark mx-auto" style="border-radius: 15px; width: 98%;">
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-start mb-5 mt-5">
          <h3 class="text-white z-index-1 position-relative">
            Our Team
          </h3>
          <p class="text-white opacity-8 mb-0">
            Here are our hard working members.
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-4"
            :image="Raka"
            :profile="{ name: 'Achmad Raka Anugrah', link: 'javascript:;' }"
            :position="{ label: 'Front-End', color: 'success' }"
            description="Responsible for the appearance composition of a website and application."
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5"
            :image="Rafi"
            :profile="{ name: 'Raffi Auliya Agfika', link: 'javascript:;' }"
            :position="{ label: 'Database', color: 'success' }"
            description="Responsible for handling, implementing, maintaining and repairing databases."
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-4 z-index-2"
            :image="Dylan"
            :profile="{ name: 'Dylan Hikma', link: 'javascript:;' }"
            :position="{ label: 'Front-End dan Database', color: 'success' }"
            description="Responsible for the composition of the appearance of a website and application, 
            as well as designing and building the appearance of the website"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5 z-index-2"
            :image="marquez"
            :profile="{ name: 'Muhammad Raihan Widagdo', link: 'javascript:;' }"
            :position="{ label: 'Back-End', color: 'success' }"
            description="Responsible for storing and managing data, as well as making sure things on the client side work and don't have problems."
          />
        </div>
      </div>

    </div>
  </section>
</template>

