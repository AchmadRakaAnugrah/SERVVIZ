<script>
    // @ts-nocheck
    import "../../../../app.postcss";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, Card } from 'flowbite-svelte';
    import { Tabs, TabItem } from 'flowbite-svelte';
    //fetch dari database
    export let products = [
      {
        name: "Apple MacBook Pro 17\"",
        color: "Sliver",
        category: "Laptop",
        accessories: true,
        available: true,
        price: 2999,
        weight: 3.0,
      },
      {
        name: "Microsoft Surface Pro",
        color: "White",
        category: "Laptop PC",
        accessories: false,
        available: true,
        price: 1999,
        weight: 1.0,
      },
      {
        name: "Magic Mouse 2",
        color: "Black",
        category: "Accessories",
        accessories: true,
        available: false,
        price: 99,
        weight: 0.2,
      },
      {
        name: "Magic Mouse 2",
        color: "Black",
        category: "Accessories",
        accessories: true,
        available: false,
        price: 99,
        weight: 0.2,
      },
      {
        name: "Magic Mouse 2",
        color: "Black",
        category: "Accessories",
        accessories: true,
        available: false,
        price: 99,
        weight: 0.2,
      },
    ];
    </script>
    
    <div class="flex justify-center items-center p-10">
        <Card class="text-center" size="lg" padding='xl'>
    <Tabs>
        <TabItem open title="Orders">
            <Table>
                <TableHead>
                    <TableHeadCell class="!p-4">
                    <Checkbox />
                    </TableHeadCell>
                    <TableHeadCell>Product name</TableHeadCell>
                    <TableHeadCell>Color</TableHeadCell>
                    <!-- <TableHeadCell>Category</TableHeadCell>
                    <TableHeadCell>Accessories</TableHeadCell>
                    <TableHeadCell>Available</TableHeadCell>
                    <TableHeadCell>Price</TableHeadCell>
                    <TableHeadCell>Weight</TableHeadCell>
                    <TableHeadCell>Action</TableHeadCell> -->
                </TableHead>
                <TableBody class="divide-y">
                    {#each products as product}
                    <TableBodyRow>
                        <TableBodyCell class="!p-4">
                        <Checkbox />
                        </TableBodyCell>
                        <TableBodyCell>{product.name}</TableBodyCell>
                        <TableBodyCell>{product.color}</TableBodyCell>
                        <!-- <TableBodyCell>{product.category}</TableBodyCell>
                        <TableBodyCell>{product.accessories}</TableBodyCell>
                        <TableBodyCell>{product.available}</TableBodyCell>
                        <TableBodyCell>{product.price}</TableBodyCell>
                        <TableBodyCell>{product.weight}</TableBodyCell> -->
                        <TableBodyCell>
                        <a href="/tables/edit/{product.id}" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                            Edit
                        </a>
                        <a href="/tables/remove/{product.id}" class="font-medium text-red-600 hover:underline dark:text-red-500">
                            Remove
                        </a>
                        </TableBodyCell>
                    </TableBodyRow>
                    {/each}
                </TableBody>
            </Table>
        </TabItem>
        <TabItem title="Technicians">
            <Table>
                <TableHead>
                    <TableHeadCell class="!p-4">
                    <Checkbox />
                    </TableHeadCell>
                    <!-- <TableHeadCell>Product name</TableHeadCell>
                    <TableHeadCell>Color</TableHeadCell> -->
                    <TableHeadCell>Category</TableHeadCell>
                    <TableHeadCell>Accessories</TableHeadCell>
                    <TableHeadCell>Available</TableHeadCell>
                    <TableHeadCell>Price</TableHeadCell>
                    <!-- <TableHeadCell>Weight</TableHeadCell>
                    <TableHeadCell>Action</TableHeadCell> -->
                </TableHead>
                <TableBody class="divide-y">
                    {#each products as product}
                    <TableBodyRow>
                        <TableBodyCell class="!p-4">
                        <Checkbox />
                        </TableBodyCell>
                        <!-- <TableBodyCell>{product.name}</TableBodyCell>
                        <TableBodyCell>{product.color}</TableBodyCell> -->
                        <TableBodyCell>{product.category}</TableBodyCell>
                        <TableBodyCell>{product.accessories}</TableBodyCell>
                        <TableBodyCell>{product.available}</TableBodyCell>
                        <!-- <TableBodyCell>{product.price}</TableBodyCell>
                        <TableBodyCell>{product.weight}</TableBodyCell> -->
                        <TableBodyCell>
                        <a href="/tables/edit/{product.id}" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                            Edit
                        </a>
                        <a href="/tables/remove/{product.id}" class="font-medium text-red-600 hover:underline dark:text-red-500">
                            Remove
                        </a>
                        </TableBodyCell>
                    </TableBodyRow>
                    {/each}
                </TableBody>
                </Table>
        </TabItem>
        <TabItem title="Stores">
            <Table>
                <TableHead>
                    <TableHeadCell class="!p-4">
                    <Checkbox />
                    </TableHeadCell>
                    <!-- <TableHeadCell>Product name</TableHeadCell>
                    <TableHeadCell>Color</TableHeadCell>
                    <TableHeadCell>Category</TableHeadCell>
                    <TableHeadCell>Accessories</TableHeadCell>
                    <TableHeadCell>Available</TableHeadCell>
                    <TableHeadCell>Price</TableHeadCell> -->
                    <TableHeadCell>Weight</TableHeadCell>
                    <TableHeadCell>Action</TableHeadCell>
                </TableHead>
                <TableBody class="divide-y">
                    {#each products as product}
                    <TableBodyRow>
                        <TableBodyCell class="!p-4">
                        <Checkbox />
                        </TableBodyCell>
                        <!-- <TableBodyCell>{product.name}</TableBodyCell>
                        <TableBodyCell>{product.color}</TableBodyCell>
                        <TableBodyCell>{product.category}</TableBodyCell>
                        <TableBodyCell>{product.accessories}</TableBodyCell>
                        <TableBodyCell>{product.available}</TableBodyCell> -->
                        <TableBodyCell>{product.price}</TableBodyCell>
                        <TableBodyCell>{product.weight}</TableBodyCell>
                        <TableBodyCell>
                        <a href="/tables/edit/{product.id}" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                            Edit
                        </a>
                        <a href="/tables/remove/{product.id}" class="font-medium text-red-600 hover:underline dark:text-red-500">
                            Remove
                        </a>
                        </TableBodyCell>
                    </TableBodyRow>
                    {/each}
                </TableBody>
                </Table>
        </TabItem>
      </Tabs>
      </Card>
    </div>