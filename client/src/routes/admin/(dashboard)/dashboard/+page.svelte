<script lang="ts">
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
  import { jwtToken } from "../../../store";

  let defaultModal = false;

  async function loadOrders() {
    const response = await fetch("http://localhost:5000/api/admin/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${$jwtToken}`,
      },
    });
    const data = await response.json();
    return { data };
  }

  let itemOrders = [];
  onMount(async () => {
    const result = await loadOrders();
    console.log(result);
    itemOrders = result.data;
  });

  async function loadTechnician() {
    const response = await fetch("http://localhost:5000/api/admin/technician", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${$jwtToken}`,
      },
    });
    const data = await response.json();
    return { data };
  }

  let itemTechnicians = [];
  onMount(async () => {
    const result = await loadTechnician();
    console.log(result);
    itemTechnicians = result.data;
  });

  async function loadStores() {
    const response = await fetch("http://localhost:5000/api/admin/store", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${$jwtToken}`,
      },
    });
    const data = await response.json();
    return { data };
  }

  let itemStores = [];
  onMount(async () => {
    const result = await loadStores();
    console.log(result);
    itemStores = result.data;
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
            {#each itemOrders as item}
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
        <Table>
          <TableHead>
            <TableHeadCell class="!p-1" />
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each itemTechnicians as item}
              <TableBodyRow>
                <TableBodyCell class="!p-1">
                  <!-- <Checkbox /> -->
                </TableBodyCell>
                <TableBodyCell>{item.technician_id}</TableBodyCell>
                <TableBodyCell>{item.name}</TableBodyCell>
                <TableBodyCell>{item.phone}</TableBodyCell>
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
      <TabItem title="Stores">
        <!-- Untuk Tabel Stores-->
        <Table>
          <TableHead>
            <TableHeadCell class="!p-1" />
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Address</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each itemStores as item}
              <TableBodyRow>
                <TableBodyCell class="!p-1">
                  <!-- <Checkbox /> -->
                </TableBodyCell>
                <TableBodyCell>{item.id}</TableBodyCell>
                <TableBodyCell>{item.name}</TableBodyCell>
                <TableBodyCell>{item.address}</TableBodyCell>
                <TableBodyCell>{item.phone}</TableBodyCell>
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
    </Tabs>
  </Card>
</div>
