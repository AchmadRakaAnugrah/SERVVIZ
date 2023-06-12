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
  export let History = [{ status: "Done" }];
  export let Technicians = [{ status: "Done" }];
  export let Stores = [{ status: "Done" }];

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

  let clickOutsideModal1 = false;
  let clickOutsideModal2 = false;
  let clickOutsideModal3 = false;
  let clickOutsideModal4 = false;

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

  // Order History
  async function loadHistory() {
    const response = await fetch("http://localhost:5000/api/admin/orders/:username/:order_id/history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluMSIsImlhdCI6MTY4NjUwNzMyOCwiZXhwIjoxNjg2NTEwOTI4fQ.8caIIxKNzULCYlJnbZojKQKbVvRIx11X03woBOcMX_4",
      },
    });
    const dataHistory = await response.json();
    return { dataHistory };
  }

  let itemsHistory = [];
  onMount(async () => {
    const result = await loadHistory();
    console.log(result);
    itemsHistory = result.dataHistory;
  });

  //Technician
  async function loadTechnicians() {
    const response = await fetch("http://localhost:5000/api/admin/technician", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluMSIsImlhdCI6MTY4NjU0NTgwOCwiZXhwIjoxNjg2NTQ5NDA4fQ.GLRQiyOoStud47NsWMqFYyiCXdkx18WmxunFGrG5ezw",
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

  //Stores
  async function loadStores() {
    const response = await fetch("http://localhost:5000/api/admin/store", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluMSIsImlhdCI6MTY4NjU0NTgwOCwiZXhwIjoxNjg2NTQ5NDA4fQ.GLRQiyOoStud47NsWMqFYyiCXdkx18WmxunFGrG5ezw",
      },
    });
    const dataStores = await response.json();
    return { dataStores };
  }

  let itemsStores = [];
  onMount(async () => {
    const result = await loadStores();
    console.log(result);
    itemsStores = result.dataStores;
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
    {value:"Canceled", name: "Canceled"},
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
                    <Button on:click={() => (clickOutsideModal1 = true)}
                      >Update</Button
                    >
                  </div>
                  <Modal
                    title="Update order ID: {item.id}"
                    bind:open={clickOutsideModal1}
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
      <TabItem open title="Order History">
        <Table>
          <TableHead>
            <TableHeadCell class="!p-1" />
            <TableHeadCell>Actions</TableHeadCell>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Order ID</TableHeadCell>
            <TableHeadCell>Technician ID</TableHeadCell>
            <TableHeadCell>Technician ID</TableHeadCell>
            <TableHeadCell>Datetime</TableHeadCell>
            <TableHeadCell>Order Status</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each itemsHistory as item}
              <TableBodyRow>
                <TableBodyCell class="!p-1">
                  <!-- <Checkbox /> -->
                </TableBodyCell>
                <TableBodyCell>
                  <div class="flex justify-left">
                    <Button on:click={() => (clickOutsideModal2 = true)}
                      >Update</Button
                    >
                  </div>
                  <Modal
                    title="Update order ID: {item.id}"
                    bind:open={clickOutsideModal2}
                    class="min-w-full"
                    autoclose 
                    outsideclose
                  >
                  <form on:submit={handleSubmit}>
                    
                    <div class="grid gap-4 mb-4 sm:grid-cols-2">
                      <div>
                        <Label>Technician
                          <Select class="mt-2" items={technician_id} bind:value={item.technician_id} />
                        </Label>
                      </div>
                      <div>
                    <div class="flex items-center space-x-4">
                      <div class="sm:col-span-2">
                        <Label for="description" class="mb-2">Description</Label>
                        <Textarea id="description" placeholder="{item.description}" rows="4" name="description"/>
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
                <TableBodyCell>{item.id}</TableBodyCell>
                <TableBodyCell>{item.order_id}</TableBodyCell>
                <TableBodyCell>{item.technician_id}</TableBodyCell>
                <TableBodyCell>{item.datetime}</TableBodyCell>
                <TableBodyCell>{item.status}</TableBodyCell>
                <TableBodyCell>{item.description}</TableBodyCell>
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
                    <Button on:click={() => (clickOutsideModal3 = true)}
                      >Update</Button
                    >
                  </div>
                  <Modal
                    title="Update {item.name} Information"
                    bind:open={clickOutsideModal3}
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
        <Table>
          <TableHead>
            <TableHeadCell class="!p-1" />
            <TableHeadCell>Actions</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Address</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each itemsStores as item}
              <TableBodyRow>
                <TableBodyCell class="!p-1">
                  <!-- <Checkbox /> -->
                </TableBodyCell>
                <TableBodyCell>
                  <div class="flex justify-left">
                    <Button on:click={() => (clickOutsideModal4 = true)}
                      >Update</Button
                    >
                  </div>
                  <Modal
                    title="Update {item.name} Information"
                    bind:open={clickOutsideModal4}
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
                      <div class="sm:col-span-2">
                        <Label for="address" class="mb-2">Address</Label>
                        <Textarea id="address" placeholder="{item.phone}" rows="4" name="addresss"/>
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
                <TableBodyCell>{item.name}</TableBodyCell>
                <TableBodyCell>{item.address}</TableBodyCell>
                <TableBodyCell>{item.phone}</TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
      </TabItem>
    </Tabs>
  </Card>
</div>
