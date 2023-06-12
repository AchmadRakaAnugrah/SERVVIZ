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
        Authorization: `Bearer ${$jwtToken}`,
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
        Authorization: `Bearer ${$jwtToken}`,
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
        Authorization: `Bearer ${$jwtToken}`,
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

  async function refresh() {
    const result1 = await loadOrders();
    itemOrders = result1.data;
    const result2 = await loadTechnician();
    itemTechnicians = result2.data;
    const result3 = await loadStores();
    itemStores = result3.data;
  }

  const handleUpdate = () => {
    alert("Clicked update.");
  };
  const handleDelete = () => {
    alert("Clicked delete.");
  };

  let status = [
    {value:"Validating data", name: "Validating data"},
    {value:"Verified", name: "Verified"},
    {value:"Picking up", name: "Picking up"},
    {value:"Waiting Drop off", name: "Waiting Drop off"},
    {value:"Wait Listed", name: "Wait Listed"},
    {value:"Processing", name: "Processing"},
    {value:"Haulted", name: "Haulted"},
    {value:"Waiting for payment", name: "Waiting for payment"},
    {value:"Canceled", name: "Canceled"},
    {value:"Done", name: "Done"},
  ]

  let updateStatus: string = '';
</script>

<div class="flex justify-center items-center p-5 mx-auto w-full">
  <Card class="text-center mx-auto w-full" size="xl" padding="sm">
    <Button
      on:click={refresh}>Refresh</Button
    >
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
                      <div class="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                          <Label>Current status: "{item.order_status}"
                            <Select class="mt-2" items={status} bind:value={updateStatus} />
                          </Label>
                        </div>
                        <div>
                          <Label for='price' class='mb-2'>Price</Label>
                          <Input type='text' id='price' placeholder={item.total_price} />
                        </div>
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
