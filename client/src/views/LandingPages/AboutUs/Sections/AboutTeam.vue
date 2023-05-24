<script setup>
// example component
import HorizontalTeamCard from "@/examples/cards/teamCards/HorizontalTeamCard.vue";

// images
import emma from "@/assets/img/team-5.jpg";
import william from "@/assets/img/bruce-mars.jpg";
import ivana from "@/assets/img/ivana-squares.jpg";
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
            :image="emma"
            :profile="{ name: 'Achmad Raka Anugrah', link: 'javascript:;' }"
            :position="{ label: 'Front-End', color: 'success' }"
            description="Bertanggung jawab atas komposisi tampilan sebuah website dan aplikasi."
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5"
            :image="william"
            :profile="{ name: 'Raffi Auliya Agfika', link: 'javascript:;' }"
            :position="{ label: 'Database', color: 'success' }"
            description="Bertanggung jawab terhadap penanganan, pelaksanaan, pemeliharaan dan perbaikan database"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-4 z-index-2"
            :image="ivana"
            :profile="{ name: 'Dylan Hikma', link: 'javascript:;' }"
            :position="{ label: 'Front-End dan Database', color: 'success' }"
            description="Bertanggung jawab atas komposisi tampilan sebuah website dan aplikasi, dan juga merancang dan membangun tampilan website"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5 z-index-2"
            :image="marquez"
            :profile="{ name: 'Muhammad Raihan Widagdo', link: 'javascript:;' }"
            :position="{ label: 'Back-End', color: 'success' }"
            description="Bertanggung jawab dalam menyimpan dan mengatur data, serta memastikan hal yang ada pada sisi klien berfungsi dan tidak bermasalah."
          />
        </div>
      </div>

    </div>
  </section>
</template>

