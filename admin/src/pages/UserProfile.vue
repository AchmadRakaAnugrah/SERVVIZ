<template>
  <div class="content">
    <div class="container">
      <div class="md-layout">
        <!-- <div class="md-layout-item md-medium-size-100 md-size-66">
          <edit-profile-form data-background-color="green"></edit-profile-form>
        </div> -->
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card></user-card>
      </div>
    </div>
  </div>
</template>

<script>
// import { EditProfileForm, UserCard } from "@/pages";
import { UserCard } from "@/pages";

export default {
  components: {
    // EditProfileForm,
    UserCard,
  },
};
</script>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>