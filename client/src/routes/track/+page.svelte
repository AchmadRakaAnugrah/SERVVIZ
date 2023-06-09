<script>
import {Card, Button, Label, Input, Indicator, Modal} from 'flowbite-svelte';
import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from 'flowbite-svelte';

let clickOutsideModal = false;

export let orders = [
      {
        name: "John Die",
        type: "Software Update",
        status: "Done",
        price: "Rp 150.000",
      },
];
</script>

<div class="flex justify-center items-center p-10">
    <Card>
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



<Modal title="Your order progress" bind:open={clickOutsideModal} autoclose outsideclose>
    <div>
        <ol class="flex justify-center items-center">
            <li class="relative w-full mb-6">
                <div class="flex items-center">
                    <Indicator size="xl" color="none" class="bg-primary-200 dark:bg-primary-900 z-10 ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0">
                        <svg aria-hidden="true" class="w-4 h-4 text-primary-600 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </Indicator>
                    <div class="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div class="mt-3">
                    <h3 class="font-medium text-gray-900 dark:text-white">Step 1</h3>
                </div>
            </li>

            <li class="relative w-full mb-6">
                <div class="flex items-center">
                    <Indicator size="xl" color="none" class="bg-primary-200 dark:bg-primary-900 z-10 ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0">
                        <svg aria-hidden="true" class="w-4 h-4 text-primary-600 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </Indicator>
                    <div class="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div class="mt-3">
                    <h3 class="font-medium text-gray-900 dark:text-white">Step 2</h3>
                </div>
            </li>
            <li class="relative w-full mb-6">
                <div class="flex items-center">
                    <Indicator size="xl" color="none" class="bg-primary-200 dark:bg-primary-900 z-10 ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0">
                        <svg aria-hidden="true" class="w-4 h-4 text-primary-600 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </Indicator>
                    <div class="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div class="mt-3">
                    <h3 class="font-medium text-gray-900 dark:text-white">Step 3</h3>
                </div>
            </li>
            <li class="relative w-full mb-6">
                <div class="flex items-center">
                    <Indicator size="xl" color="none" class="bg-primary-200 dark:bg-primary-900 z-10 ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0">
                        <svg aria-hidden="true" class="w-4 h-4 text-primary-600 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </Indicator>
                    <div class="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div class="mt-3">
                    <h3 class="font-medium text-gray-900 dark:text-white">Step 4</h3>
                </div>
            </li>
            <li class="relative w-full mb-6">
                <div class="flex items-center">
                    <Indicator size="xl" color="none" class="bg-primary-200 dark:bg-primary-900 z-10 ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0">
                        <svg aria-hidden="true" class="w-4 h-4 text-primary-600 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </Indicator>
                    <div class="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div class="mt-3">
                    <h3 class="font-medium text-gray-900 dark:text-white">Step 4</h3>
                </div>
            </li>
            <li class="relative w-full mb-6">
                <div class="flex items-center">
                    <Indicator size="xl" color="gray" class="dark:bg-gray-700 z-10 ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0">
                        <svg aria-hidden="true" class="w-3 h-3 text-gray-800 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </Indicator>
                </div>
                <div class="mt-3">
                    <h3 class="font-medium text-gray-900 dark:text-white">Step 5</h3>
                </div>
            </li>
        </ol>
    </div>

    <div>
   <Card class="text-center" size="lg" padding='xl'>
    <Table>
        <TableHead
          class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
        >
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Service Type</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each orders as order}
            <TableBodyRow>
                <TableBodyCell>{order.name}</TableBodyCell>
                <TableBodyCell>{order.type}</TableBodyCell>
                <TableBodyCell>{order.status}</TableBodyCell>
            </TableBodyRow>
            {/each}
        </TableBody>
        <tfoot>
          <tr class="font-semibold text-gray-900 dark:text-white">
            <th scope="row" class="py-3 px-6 text-base">Total price</th>
            <td class="py-3 px-6"> </td>
            {#each orders as order}
            <td class="py-3 px-6">{order.price}</td>
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

