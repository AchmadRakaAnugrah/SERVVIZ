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
              icon="public"
              title="Fully integrated"
              description="We get insulted by others, lose trust for those We get back
                  freezes"
            />
            <DefaultInfoCard
              color="info"
              icon="payments"
              title="Payments functionality"
              description="We get insulted by others, lose trust for those We get back
                  freezes"
            />
          </div>
          <div class="row justify-content-start mt-4">
            <DefaultInfoCard
              color="info"
              icon="apps"
              title="Prebuilt components"
              description="We get insulted by others, lose trust for those We get back
                  freezes"
            />
            <DefaultInfoCard
              color="info"
              icon="3p"
              title="Improved platform"
              description="We get insulted by others, lose trust for those We get back
                  freezes"
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

