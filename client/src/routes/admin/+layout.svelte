<script lang='ts'>
  import "../../app.postcss";
  import {
    Navbar,
    NavBrand,
    NavHamburger,
    Button,
  } from "flowbite-svelte";
  import { jwtToken } from "../store";

  function handleLogout() {
    jwtToken.set('');
    alert('Berhasil logout');
    console.log($jwtToken);
  }
</script>

<Navbar let:hidden let:toggle>
  <NavBrand>
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
    >
      SER<b>VVIZ</b>/admin
    </span>
  </NavBrand>
  <div class="flex md:order-2">
    {#if $jwtToken === ''}
      <!-- <Button size="sm" href="/signin">Sign In</Button> -->
    {:else}
      <Button size="sm" href="/admin" on:click={handleLogout}>Sign Out</Button>
    {/if}
    <NavHamburger on:click={toggle} />
  </div>
</Navbar>

<slot />

