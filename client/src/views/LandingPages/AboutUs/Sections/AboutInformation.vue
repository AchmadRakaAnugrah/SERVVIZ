<script setup>
// example components
import DefaultInfoCard from "../../../../examples/cards/infoCards/DefaultInfoCard.vue";
import CenteredBlogCard from "../../../../examples/cards/blogCards/CenteredBlogCard.vue";
</script>
<template>
  <section id="abc" class="py-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-8">
          <div class="row justify-content-start">
            <DefaultInfoCard
              color="info"
              icon="laptop"
              title="LAPTOP"
              description="We provide several services ranging from BIOS damage, Motherboard Damage, Processor Damage and others"
            />
            <DefaultInfoCard
              color="info"
              icon="tablet"
              title="SMART PHONE"
              description="We provide several services ranging from broken screen replacement, battery repair, internal component repair,
               software repair, and others"
            />
          </div>
          <div class="row justify-content-start mt-4">
            <DefaultInfoCard
              color="info"
              icon="apps"
              title="KOMPUTER"
              description="We provide several services ranging from BIOS damage, Motherboard Damage, Processor Damage and others"
            />
          </div>
        </div>
        <div class="col-lg-4 ms-auto mt-lg-0 mt-6">
          <CenteredBlogCard
            image="https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            title="Best service"
            description="With our extensive experience and expertise, we are here to help fix any issues you encounter with your device."
          />
        </div>
      </div>
    </div>
  </section>
</template>

