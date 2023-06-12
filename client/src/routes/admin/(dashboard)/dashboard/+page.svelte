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
  export let Technicians = [{ status: "Done" }];
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

  let clickOutsideModal = false;

  // Orders
  async function loadOrders() {
    const response = await fetch("http://localhost:5000/api/admin/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluMSIsImlhdCI6MTY4NjUwNzMyOCwiZXhwIjoxNjg2NTEwOTI4fQ.8caIIxKNzULCYlJnbZojKQKbVvRIx11X03woBOcMX_4",
      },
    });
    const dataOrders = await response.json();
    return { dataOrders };
  }

  let itemsOrders = [];
  onMount(async () => {
    const result = await loadOrders();
    console.log(result);
    itemsOrders = result.dataOrders;
  });

  //Technician
  async function loadTechnicians() {
    const response = await fetch("http://localhost:5000/api/admin/technician", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluMSIsImlhdCI6MTY4NjUwNzMyOCwiZXhwIjoxNjg2NTEwOTI4fQ.8caIIxKNzULCYlJnbZojKQKbVvRIx11X03woBOcMX_4",
      },
    });
    const dataTechnicians = await response.json();
    return { dataTechnicians };
  }

  let itemsTechnicians = [];
  onMount(async () => {
    const result = await loadTechnicians();
    console.log(result);
    itemsTechnicians = result.dataTechnicians;
  });

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
    {value:"Done", name: "Done"},
  ]

  let updateStatus: string = "";
</script>

<div class="flex justify-center items-center p-5 mx-auto w-full">
  <Card class="text-center mx-auto w-full" size="xl" padding="sm">
    <Tabs>
      <TabItem open title="Orders">
        <Table>
          <TableHead>
            <TableHeadCell class="!p-1" />
            <TableHeadCell>Actions</TableHeadCell>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Username</TableHeadCell>
            <TableHeadCell>Device type</TableHeadCell>
            <TableHeadCell>Brand</TableHeadCell>
            <TableHeadCell>Problem type</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Pick up address</TableHeadCell>
            <TableHeadCell>Drop off outlet</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Admin</TableHeadCell>
            <TableHeadCell>Order date</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each itemsOrders as item}
              <TableBodyRow>
                <TableBodyCell class="!p-1">
                  <!-- <Checkbox /> -->
                </TableBodyCell>
                <TableBodyCell>
                  <div class="flex justify-left">
                    <Button on:click={() => (clickOutsideModal = true)}
                      >Update</Button
                    >
                  </div>
                  <Modal
                    title="Update order ID: {item.id}"
                    bind:open={clickOutsideModal}
                    class="min-w-full"
                    autoclose 
                    outsideclose
                  >
                  <form on:submit={handleSubmit}>
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
                <TableBodyCell>{item.id}</TableBodyCell>
                <TableBodyCell>{item.user_username}</TableBodyCell>
                <TableBodyCell>{item.device}</TableBodyCell>
                <TableBodyCell>{item.device_brand}</TableBodyCell>
                <TableBodyCell>{item.problem_type}</TableBodyCell>
                <TableBodyCell>{item.problem_desc}</TableBodyCell>
                <TableBodyCell>{item.service_type}</TableBodyCell>
                <TableBodyCell>{item.pickup_address}</TableBodyCell>
                <TableBodyCell>{item.dropoff_address_id}</TableBodyCell>
                <TableBodyCell>{item.order_status}</TableBodyCell>
                <TableBodyCell>{item.total_price}</TableBodyCell>
                <TableBodyCell>{item.admin_username}</TableBodyCell>
                <TableBodyCell>{item.datetime}</TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
      </TabItem>
      <TabItem title="Technicians">
        <Table>
          <TableHead>
            <TableHeadCell class="!p-1" />
            <TableHeadCell>Actions</TableHeadCell>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each itemsTechnicians as item}
              <TableBodyRow>
                <TableBodyCell class="!p-1">
                  <!-- <Checkbox /> -->
                </TableBodyCell>
                <TableBodyCell>
                  <div class="flex justify-left">
                    <Button on:click={() => (clickOutsideModal = true)}
                      >Update</Button
                    >
                  </div>
                  <Modal
                    title="Update {item.name} Information"
                    bind:open={clickOutsideModal}
                    autoclose
                    outsideclose
                    class="min-w-full"
                  >
                  <form on:submit={handleSubmit}>
                    <div class="grid gap-4 mb-4 sm:grid-cols-2">
                      <div>
                        <Label for='price' class='mb-2'>Name</Label>
                        <Input type='text' id='price' placeholder={item.name} />
                      </div>
                      <div>
                        <Label for='price' class='mb-2'>Phone</Label>
                        <Input type='text' id='price' placeholder={item.phone} />
                      </div>
                    </div>
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
                <TableBodyCell>{item.id}</TableBodyCell>
                <TableBodyCell>{item.name}</TableBodyCell>
                <TableBodyCell>{item.phone}</TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
      </TabItem>
      <TabItem title="Stores">
        <!-- Untuk Tabel Stores-->
      </TabItem>
    </Tabs>
  </Card>
</div>
