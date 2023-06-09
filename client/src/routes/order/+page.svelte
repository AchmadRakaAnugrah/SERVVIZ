<script>

  import {Card, Button, Label, Select, Dropzone , Textarea, Input} from "flowbite-svelte";

//untukk dropdown box
    /**
   * @type {any}
   */
    let selected;

    let countries = [
        {value:"us", name: "United States"},
        {value:"ca", name: "Canada"},
        {value:"fr", name: "France"},
    ]
//Untuk Dekripsi
let textareaprops = {
    id: 'message',
    name: 'message',
    label: 'Your message',
    rows: 4,
    placeholder: 'Leave a comment...',
  };

//Untuk upload file
const dropHandle = (/** @type {{ preventDefault: () => void; dataTransfer: { files: any; }; }} */ event) => { 
    event.preventDefault(); 
    const files = event.dataTransfer.files; 
    if (files.length > 0) { 
      const fileName = files[0].name; 
      alert('You dropped ' + fileName); 
    }
  }

  const handleChange = (/** @type {{ target: { files: any; }; }} */ event) => {
    const files = event.target.files; 
    if (files.length > 0) { 
      const fileName = files[0].name; 
      alert('You selected ' + fileName); 
    }
  }
</script>


<div class="flex justify-center items-center p-10">
    <Card size="xl" padding='xl'>
        <form>
            <h5 class="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Order</h5>
            <div class="mb-6">
                <Label for='default-input' class='block mb-2'>Default input</Label>
                <Input id='default-input' class="mt-2"  placeholder="Default input" />
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-6">
                <div class='mb-6'>
                    <Label>Select an option
                        <Select class="mt-2" items={countries} bind:value={selected} />
                    </Label>
                </div>
            </div>
            <div class='mb-6'>
                <Label>Description
                    <Textarea class="mt-2" {...textareaprops} />
                </Label>
            </div>
            <div class='mb-8'>
                <Label class="pb-2">Upload file</Label>
                <Dropzone id='dropzone' 
                on:drop={dropHandle} 
                on:dragover={(event) => { event.preventDefault() }}
                on:change={handleChange}
                >
                <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </Dropzone>
            </div>
        </form>
        <Button type="submit" class="w-full">order</Button>
    </Card>
</div>