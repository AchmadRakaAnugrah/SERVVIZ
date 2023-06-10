<script lang='ts'>
  import "../../app.postcss";
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Button,
    Input,
  } from "flowbite-svelte";
  import { Footer, FooterBrand, FooterCopyright, FooterIcon, FooterLink, FooterLinkGroup } from "flowbite-svelte"
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
       <Button size="sm" href="/admin" on:click={handleLogout}>Sign Out</Button>
    {:else}
       <!-- <Button size="sm" href="/signin">Sign In</Button> -->
    {/if}
    <NavHamburger on:click={toggle} />
  </div>
</Navbar>

<slot />

