<script lang="ts">
  import {
    Card,
    Button,
    Label,
    Select,
    Dropzone,
    Textarea,
    Modal,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { Contact } from "flowbite-svelte-blocks";
  import { Truck } from "svelte-heros";
  import { usernameStore, jwtToken } from "../../store";

  let serviceTypeSelected: string = "";
  let methodSelected: string = "";
  let storeSelected: string = "";
  let deviceTypeSelected: string = "";
  let problemTypeSelected: string = "";
  let deviceBrandSelected: string = "";
  let addressSelected: string = "";
  let descriptionSelected: string = "";

  //untuk dropwdown
  let services = [
    { value: "Hardware", name: "Hardware" },
    { value: "Software", name: "Software" },
    { value: "Maintainence", name: "Maintainence" },
  ];
  let methods = [
    { value: "Pick up", name: "Pick up" },
    { value: "Drop off", name: "Drop off" },
  ];
  let stores = [
    { value: "SERVVIZ A", name: "SERVVIZ A" },
    { value: "SERVVIZ B", name: "SERVVIZ B" },
    { value: "SERVVIZ C", name: "SERVVIZ C" },
    { value: "SERVVIZ D", name: "SERVVIZ D" },
  ];
  let device_types = [
    { value: "Laptop", name: "Laptop" },
    { value: "Personal Compputer", name: "Personal Compputer" },
    { value: "Smartphone", name: "Smartphone" },
  ];
  let problem_types = [
    { value: "Screen", name: "Screen" },
    { value: "Battery", name: "Battery" },
    { value: "Storage", name: "Storage" },
    {
      value: "Update Operating System/Software",
      name: "Update Operating System/Software",
    },
    {
      value: "Operating System Installment/Reinstall",
      name: "Operating System Installment/Reinstall",
    },
    { value: "Software Installment", name: "Software Installment" },
    { value: "Cleaning", name: "Cleaning" },
    { value: "Optimization", name: "Optimization" },
    { value: "Hardware Cleaning", name: "Hardware Cleaning" },
    { value: "PC Build", name: "PC Build" },
  ];
  let device_brands = [
    { value: "Lenovo", name: "Lenovo" },
    { value: "Asus", name: "Asus" },
    { value: "Personal computer", name: "Personal computer" },
    { value: "Samsung", name: "Samsung" },
    { value: "Xiaomi", name: "Xiaomi" },
    { value: "Other", name: "Other" },
  ];

  //Untuk Dekripsi
  let addresstextareaprops = {
    id: "address",
    name: "message1",
    label: "Your message",
    rows: 4,
    placeholder: "Your address...",
  };
  let descriptiontextareaprops = {
    id: "description",
    name: "message2",
    label: "Your message",
    rows: 4,
    placeholder: "Give us the description of the problem...",
  };

  //Untuk upload file
  // const dropHandle = (
  //   /** @type {{ preventDefault: () => void; dataTransfer: { files: any; }; }} */ event: Event
  // ) => {
  //   event.preventDefault();
  //   const files = event.dataTransfer.files;
  //   if (files.length > 0) {
  //     const fileName = files[0].name;
  //     alert("You dropped " + fileName);
  //   }
  // };

  // const handleChange = (/** @type {{ target: { files: any; }; }} */ event) => {
  //   const files = event.target.files;
  //   if (files.length > 0) {
  //     const fileName = files[0].name;
  //     alert("You selected " + fileName);
  //   }
  // };

  //untuk modal
  let clickOutsideModal1 = false;
  let clickOutsideModal2 = false;
  //tabel dalam modal
  let order = {
    service_type: serviceTypeSelected,
    device: deviceTypeSelected,
    device_brand: deviceBrandSelected,
    problem_type: problemTypeSelected,
    // Service_Method: methodSelected,
    dropoff_address: storeSelected || "",
    pickup_address: addressSelected || "",
    problem_desc: descriptionSelected,
  };

  let orderDetails = [];

  async function confirm(event: Event) {
    orderDetails = [
      {
        service_type: serviceTypeSelected,
        device: deviceTypeSelected,
        device_brand: deviceBrandSelected,
        problem_type: problemTypeSelected,
        // Service_Method: methodSelected,
        dropoff_address: storeSelected || "",
        pickup_address: addressSelected || "",
        problem_desc: descriptionSelected,
      },
    ];
    order = {
      service_type: serviceTypeSelected,
      device: deviceTypeSelected,
      device_brand: deviceBrandSelected,
      problem_type: problemTypeSelected,
      // Service_Method: methodSelected,
      dropoff_address: storeSelected || "",
      pickup_address: addressSelected || "",
      problem_desc: descriptionSelected,
    };
    console.log(orderDetails);
  }

  let newData = {};

  async function handleSubmit(event: Event) {
    const response = await fetch(`http://localhost:5000/api/orders/${$usernameStore}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$jwtToken}`,
      },
      body: JSON.stringify(order),
    });

    const responseData = await response.json();
    console.log(responseData);

    if (response.status === 201) {
      // The request was successful
      newData = {
        id: responseData.order,
      };
    } else {
      alert("Terjadi kesalahan");
    }
  }
</script>

<div class="flex justify-center items-center p-10">
  <Card size="xl" padding="xl">
    <form class="space-y-100">
      <Contact>
        <svelte:fragment slot="h2">Order</svelte:fragment>
        <svelte:fragment slot="paragraph">
          Got issues on your computer? Sit back, relax. Let us do the hard part.
        </svelte:fragment>
      </Contact>

      <div class="grid gap-6 md:grid-cols-3">
        <div class="mb-6">
          <Label
            >Select a service type
            <Select
              class="mt-2"
              items={services}
              bind:value={serviceTypeSelected}
            />
          </Label>
        </div>
        <div class="mb-6">
          <Label
            >Select the device type
            <Select
              class="mt-2"
              items={device_types}
              bind:value={deviceTypeSelected}
            />
          </Label>
        </div>
        <div class="mb-6">
          <Label
            >Select the problem type
            <Select
              class="mt-2"
              items={problem_types}
              bind:value={problemTypeSelected}
            />
          </Label>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <div class="mb-6">
          <Label
            >Select device brand
            <Select
              class="mt-2"
              items={device_brands}
              bind:value={deviceBrandSelected}
            />
          </Label>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="mb-6">
          <Label
            >Select a service method
            <Select class="mt-2" items={methods} bind:value={methodSelected} />
          </Label>
        </div>
        {#if methodSelected === "Drop off"}
          <div class="mb-6">
            <Label
              >Select the SERVVIZ store
              <Select class="mt-2" items={stores} bind:value={storeSelected} />
            </Label>
          </div>
        {:else if methodSelected === "Pick up"}
          <div class="mb-6">
            <Label
              >Address
              <Textarea
                class="mt-2"
                bind:value={addressSelected}
                {...addresstextareaprops}
              />
            </Label>
          </div>
        {/if}
      </div>
      <div class="mb-6">
        <Label
          >Description
          <Textarea
            class="mt-2"
            bind:value={descriptionSelected}
            {...descriptiontextareaprops}
          />
        </Label>
      </div>
      <!-- <div class="mb-8">
        <Label class="pb-2">Upload your problem phothos (optional)</Label>
        <Dropzone
          id="dropzone"
          on:drop={dropHandle}
          on:dragover={(event) => {
            event.preventDefault();
          }}
          on:change={handleChange}
        >
          <svg
            aria-hidden="true"
            class="mb-3 w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            /></svg
          >
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            PNG or JPG (MAX. 800x400px)
          </p>
        </Dropzone>
      </div> -->
    </form>
    <div class="flex justify-center items-center">
      <Button class="w-fit mr-80" href="https://wa.me/+6282329044553"
        >Consult</Button
      >
      <Button
        type="submit"
        class="w-fit ml-80"
        on:click={() => (clickOutsideModal1 = true)}
        on:click={confirm}>Order</Button
      >
    </div>
  </Card>
</div>

<Modal
  title="Your order"
  bind:open={clickOutsideModal1}
  autoclose
  outsideclose
  class="min-w-full"
>
  <div>
    <Card class="text-center" size="lg" padding="xl">
      <Table>
        <TableHead
          class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
        >
          <TableHeadCell>Service type</TableHeadCell>
          <TableHeadCell>Device type</TableHeadCell>
          <TableHeadCell>Device Brand</TableHeadCell>
          <TableHeadCell>Problem Type</TableHeadCell>
          <TableHeadCell>Drop off store</TableHeadCell>
          <TableHeadCell>Pick up address</TableHeadCell>
          <TableHeadCell>Description</TableHeadCell>
        </TableHead>
        <TableBody>
          {#each orderDetails as item}
            <TableBodyRow>
              <TableBodyCell>{item.service_type}</TableBodyCell>
              <TableBodyCell>{item.device}</TableBodyCell>
              <TableBodyCell>{item.device_brand}</TableBodyCell>
              <TableBodyCell>{item.problem_type}</TableBodyCell>
              <TableBodyCell>{item.dropoff_address}</TableBodyCell>
              <TableBodyCell>{item.pickup_address}</TableBodyCell>
              <TableBodyCell>{item.problem_desc}</TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>
    </Card>
  </div>

  <svelte:fragment slot="footer">
    <Button on:click={() => (clickOutsideModal2 = true)} on:click={handleSubmit}
      >Confirm</Button
    >
    <Button on:click={() => alert('Handle "Order cancled')}>Cancel</Button>
  </svelte:fragment>
</Modal>

<Modal title="Order code" bind:open={clickOutsideModal2} autoclose outsideclose>
  <div>
    <Card class="text-center" size="lg" padding="xl">
      <h6>Your Order Code</h6>
      <h6>{newData.id}</h6>
    </Card>
  </div>
</Modal>
