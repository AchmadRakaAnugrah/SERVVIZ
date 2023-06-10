<script>
    // @ts-nocheck
    import "../../../../app.postcss";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, Card } from 'flowbite-svelte';
    import { Tabs, TabItem } from 'flowbite-svelte';
    //fetch dari database
    export let Orders = [
        {status: "Done"},
    ];
    export let Technicians = [
    ];
    export let Stores = [
    ];

    //CRUD Modal
    import { Modal, Button, Input, Label, Select, Textarea } from 'flowbite-svelte'
    let defaultModal = false;
    const handleUpdate = () => {
        alert('Clicked update.');
    };
    const handleDelete = () => {
        alert ('Clicked delete.');
    };


    </script>
    
    <div class="flex justify-center items-center p-10">
        <Card class="text-center" size="lg" padding='xl'>
    <Tabs>
        <TabItem open title="Orders">
            <Table>
                <TableHead>
                    <TableHeadCell class="!p-4">
                    </TableHeadCell>
                    <TableHeadCell>Status</TableHeadCell>
                </TableHead>
                <TableBody class="divide-y">
                    {#each Orders as order}
                    <TableBodyRow>
                        <TableBodyCell class="!p-4">
                        <Checkbox />
                        </TableBodyCell>
                        <TableBodyCell>{order.status}</TableBodyCell>
                        <TableBodyCell>
                            <div class="flex justify-center m-5">
                                <Button on:click={() => (defaultModal = true)}>Update</Button>
                            </div>
                            <Modal title="Update" bind:open={defaultModal} autoclose class="min-w-full">
                                <div class="flex items-center space-x-4">
                                    
                                    <Button type="submit" class="w-fit" on:click={handleUpdate}>
                                      Update product
                                    </Button>
                                    <Button type="submit" class="w-fit" outline color='red' on:click={handleDelete}>
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

