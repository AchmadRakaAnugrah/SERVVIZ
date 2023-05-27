<template>
  <div>
    <md-table v-model="users" @md-selected="onSelect">
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        md-selectable="multiple"
        md-auto-select
      >
        <md-table-cell>{{ item.name }}</md-table-cell>
        <md-table-cell>
          <md-button class="md-just-icon md-simple md-primary" @click="editUser(item)">
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Edit</md-tooltip>
          </md-button>
          <md-button class="md-just-icon md-simple md-danger" @click="closeUser(item)">
            <md-icon>close</md-icon>
            <md-tooltip md-direction="top">Close</md-tooltip>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    
    <md-button class="md-raised md-primary" @click="addUser">
      Add
    </md-button>
  </div>
</template>

<script>
export default {
  name: "nav-tabs-table",
  data() {
    return {
      selected: [],
      users: [
        {
          name: 'Sign contract for "What are conference organizers afraid of?"',
        },
        {
          name: "Lines From Great Russian Literature? Or E-mails From My Boss?",
        },
        {
          name: "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
        },
      ],
    };
  },
  methods: {
    onSelect(items) {
      this.selected = items;
    },
    editUser(user) {
      // Handle edit functionality for the clicked user
      console.log('Editing user:', user);
      // Add your logic to perform the edit action
    },
    closeUser(user) {
      // Handle close functionality for the clicked user
      console.log('Closing user:', user);
      // Add your logic to perform the close action
    },
    addUser() {
      // Add functionality for adding a new user
      console.log('Adding user');
      // Add your logic to perform the add action
    },
  },
};
</script>
