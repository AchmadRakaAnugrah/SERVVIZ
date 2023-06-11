<script lang="ts">
  // @ts-nocheck
  import "../../../../app.postcss";
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Checkbox,
    Card,
  } from "flowbite-svelte";
  import { Tabs, TabItem } from "flowbite-svelte";
  //fetch dari database
  export let Orders = [{ status: "Done" }];
  export let Technicians = [];
  export let Stores = [];

  //CRUD Modal
  import {
    Modal,
    Button,
    Input,
    Label,
    Select,
    Textarea,
  } from "flowbite-svelte";
  import { onMount } from "svelte";

  let defaultModal = false;

  async function load() {
    const response = await fetch("http://localhost:5000/api/admin/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImpvaG5kb2UiLCJpYXQiOjE2ODY0OTY0NzksImV4cCI6MTY4NjUwMDA3OX0.OG0iMI8xjeWjR_oHPm1cRBhOEWCWzqHDjjWCcjZm8Vk",
      },
    });
    const data = await response.json();
    return { data };
  }

  let items = [];
  onMount(async () => {
    const result = await load();
    console.log(result);
    items = result.data;
  });

  const handleUpdate = () => {
    alert("Clicked update.");
  };
  const handleDelete = () => {
    alert("Clicked delete.");
  };
</script>

<div class="flex justify-center items-center p-5 mx-auto w-full">
  <Card class="text-center mx-auto w-full" size="xl" padding="sm">
    <Tabs>
      <TabItem open title="Orders">
        <Table>
          <TableHead>
            <TableHeadCell class="!p-1" />
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Username</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Admin</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each items as item}
              <TableBodyRow>
                <TableBodyCell class="!p-1">
                  <!-- <Checkbox /> -->
                </TableBodyCell>
                <TableBodyCell>{item.id}</TableBodyCell>
                <TableBodyCell>{item.user_username}</TableBodyCell>
                <TableBodyCell>{item.service_type}</TableBodyCell>
                <TableBodyCell>{item.order_status}</TableBodyCell>
                <TableBodyCell>{item.admin_username}</TableBodyCell>
                <TableBodyCell>
                  <div class="flex justify-left">
                    <Button on:click={() => (defaultModal = true)}
                      >Update</Button
                    >
                  </div>
                  <Modal
                    title="Update"
                    bind:open={defaultModal}
                    autoclose
                    class="min-w-full"
                  >
                    <div class="flex items-center space-x-4">
                      <Button
                        type="submit"
                        class="w-fit"
                        on:click={handleUpdate}
                      >
                        Update product
                      </Button>
                      <Button
                        type="submit"
                        class="w-fit"
                        outline
                        color="red"
                        on:click={handleDelete}
                      >
                        Delete
                      </Button>
                    </div>
                  </Modal>
                </TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
      </TabItem>
      <TabItem title="Technicians">
        <!-- Untuk Tabel Technician -->
      </TabItem>
      <TabItem title="Stores">
        <!-- Untuk Tabel Stores-->
      </TabItem>
    </Tabs>
  </Card>
</div>
