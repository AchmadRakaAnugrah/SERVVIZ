<script lang="ts">
  import { Card, Button, Label, Input, Checkbox } from "flowbite-svelte";
  import { jwtToken } from "../../store";
  import { goto } from "$app/navigation";
  import { error } from "@sveltejs/kit";

  export let username: string;
  export let password: string;

  async function handleSubmit(event: Event) {
    // Get the values of the input elements
    const usernameValue = username;
    const passwordValue = password;

    // Send the values to the server using an Ajax request
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameValue,
        password: passwordValue,
      }),
    });

    // Check the response status code
    if (response.status === 200) {
      // The request was successful
      const data = await response.json();
      jwtToken.set(data.token);
      console.log($jwtToken);
      alert("Berhasil login");
      goto("/home");
    } else {
      // The request failed
      // throw new Error(`The request failed with status code ${response.status}`);
      alert("Cek kembali username dan password anda");
    }
  }
</script>

<div class="flex justify-center items-center p-10">
  <Card class="w-full">
    <form class="flex flex-col space-y-6" action="/">
      <h3 class="text-xl font-medium text-gray-900 dark:text-white">
        Sign in to our platform
      </h3>
      <Label class="space-y-2">
        <span>Username</span>
        <Input
          type="text"
          name="username"
          placeholder="Your username"
          required
          bind:value={username}
        />
      </Label>
      <Label class="space-y-2">
        <span>Your password</span>
        <Input
          type="password"
          name="password"
          placeholder="•••••"
          required
          bind:value={password}
        />
      </Label>
      <div class="flex items-start">
        <Checkbox>Remember me</Checkbox>
        <a
          href="/"
          class="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
          >Lost password?</a
        >
      </div>
      <Button class="w-full" on:click={handleSubmit}
        >Login to your account</Button
      >
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered? <a
          href="/signup"
          class="text-primary-700 hover:underline dark:text-primary-500"
          >Create account</a
        >
      </div>
    </form>
  </Card>
</div>
