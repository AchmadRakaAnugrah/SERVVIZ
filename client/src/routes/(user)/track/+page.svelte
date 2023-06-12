<script lang="ts">
  import { Card, Button, Label, Input, Modal } from "flowbite-svelte";
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";

  let clickOutsideModal = false;

  let idInput: string;
  let username: string;

  interface OrderData {
    id: number;
    user_username: string;
    unique_code: string | null;
    service_type: string;
    pickup_address: string;
    dropoff_address_id: string | null;
    device: string;
    device_brand: string;
    problem_type: string;
    problem_desc: string;
    datetime: string;
    order_status: string;
    admin_username: string;
    total_price: number | null;
    name: string;
  }

  let order: OrderData;
  let totalPrice: number;

  export async function handleSubmit(event: Event) {
    const idValue = idInput;
    const usernameValue = username;

    const response = await fetch(
      `http://localhost:5000/api/orders/${usernameValue}/${idValue}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    const responseData = await response.json();
    console.log(responseData);

    if (response.status === 200) {
      // The request was successful
      order = responseData;
      totalPrice = responseData?.total_price ?? '-';
    } else if (response.status === 404) {
      // The request failed
      // throw new Error(`The request failed with status code ${response.status}`);
      alert("Data tidak ditemukan");
    } else {
      alert("Kesalahan back-end");
    }
  }
</script>

<section class="my-20">
  <div class="flex justify-center items-center p-10">
    <Card class="mb-10">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Track your order
      </h5>
      <div>
        <p
          class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight"
        >
          Check how your order is going, and see your order
        </p>
        <Label class="space-y-2 mb-3">
          <Input
            type="text"
            name="username"
            placeholder="Enter your username"
            required
            bind:value={username}
          />
        </Label>
        <Label class="space-y-2 mb-3">
          <Input
            type="text"
            name="username"
            placeholder="Enter your order code"
            required
            bind:value={idInput}
          />
        </Label>
        <Button
          on:click={() => (clickOutsideModal = true)}
          class="w-fit"
          on:click={handleSubmit}
        >
          Track <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 ml-2"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            /></svg
          >
        </Button>
      </div>
    </Card>
  </div>
</section>

<Modal
  title="Your order progress"
  bind:open={clickOutsideModal}
  autoclose
  outsideclose
>
  <div>
    <Card class="text-center" size="lg" padding="xl">
      <Table>
        <TableHead
          class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
        >
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Service Type</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
        </TableHead>
        <TableBody>
          <TableBodyRow>
            <TableBodyCell>{order && order.user_username}</TableBodyCell>
            <TableBodyCell>{order && order.service_type}</TableBodyCell>
            <TableBodyCell>{order && order.order_status}</TableBodyCell>
          </TableBodyRow>
        </TableBody>
        <tfoot>
          <tr class="font-semibold text-gray-900 dark:text-white">
            <th scope="row" class="py-3 px-6 text-base">Total price</th>
            <td class="py-3 px-6" />
            <td class="py-3 px-6">{totalPrice}</td>
          </tr>
        </tfoot>
      </Table>
    </Card>
  </div>

  <svelte:fragment slot="footer">
    <Button on:click={() => alert('Handle "success"')}>Contact us</Button>
  </svelte:fragment>
</Modal>
