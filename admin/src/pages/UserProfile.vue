<template>
  <div class="content">
    <div class="md-layout">
      <!-- <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form data-background-color="green"> </edit-profile-form>
      </div> -->
    </div>
    <div class="md-layout-item md-medium-size-100 md-size-33">
      <user-card> </user-card>
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
