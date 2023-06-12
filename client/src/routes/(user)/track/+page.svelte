<script>
import {Card, Button, Label, Input, Modal} from 'flowbite-svelte';
import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from 'flowbite-svelte';
import { onMount } from "svelte";
let clickOutsideModal = false;

export let Track = [{ status: "Done" }];

async function loadTrack() {
    const response = await fetch("http://localhost:5000/api/orders/:username/:order_id", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluMSIsImlhdCI6MTY4NjUwNzMyOCwiZXhwIjoxNjg2NTEwOTI4fQ.8caIIxKNzULCYlJnbZojKQKbVvRIx11X03woBOcMX_4",
      },
    });
    const dataTrack = await response.json();
    return { dataTrack };
  }

  let itemsTrack = [];
  onMount(async () => {
    const result = await loadTrack();
    console.log(result);
    itemsTrack = result.dataTrack;
  });
</script>

<section class="my-20">
<div class="flex justify-center items-center p-10">
    <Card class="mb-10">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Track your order</h5>
            <div>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
                    Check how your order is going, and see your order
                </p>
                <Label class="space-y-2 mb-3">
                    <Input
                      type="text"
                      name="username"
                      placeholder="Enter your order code"
                      required
                    />
                  </Label>
                <Button on:click={() => clickOutsideModal = true} class="w-fit">
                    Track <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Button>
            </div>
    </Card>
</div>
</section>


<Modal title="Your order progress" bind:open={clickOutsideModal} autoclose outsideclose>

    <div>
   <Card class="text-center" size="lg" padding='xl'>
    <Table>
        <TableHead
          class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
        >
          <TableHeadCell>Order Code</TableHeadCell>
          <TableHeadCell>Problem Type</TableHeadCell>
          <TableHeadCell>Order date</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each itemsTrack as order}
            <TableBodyRow>
                <TableBodyCell>{order.unique_code}</TableBodyCell>
                <TableBodyCell>{order.problem_type}</TableBodyCell>
                <TableBodyCell>{order.datetime}</TableBodyCell>
                <TableBodyCell>{order.order_status}</TableBodyCell>
            </TableBodyRow>
            {/each}
        </TableBody>
        <tfoot>
          <tr class="font-semibold text-gray-900 dark:text-white">
            <th scope="row" class="py-3 px-6 text-base">Total price</th>
            <td class="py-3 px-6"> </td>
            {#each itemsTrack as order}
            <td class="py-3 px-6">{order.total_price}</td>
            {/each}
          </tr>
        </tfoot>
      </Table>
    </Card>
</div>

    <svelte:fragment slot='footer'>
      <Button on:click={() => alert('Handle "success"')}>Contact us</Button>
    </svelte:fragment>
</Modal>

