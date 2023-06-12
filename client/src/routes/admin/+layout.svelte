<script lang='ts'>
  import "../../app.postcss";
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Button,
  } from "flowbite-svelte";
  import { Footer, FooterCopyright, FooterLinkGroup } from "flowbite-svelte"
  import { jwtToken, usernameStore } from "../store";

  function handleLogout() {
    jwtToken.set('');
    usernameStore.set('');
    alert('Berhasil logout');
    console.log($jwtToken);
  }
</script>

<Navbar let:hidden let:toggle>
  <NavBrand href="/home">
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
    >
      SER<b>VVIZ</b> / admin
    </span>
  </NavBrand>
  <div class="flex md:order-2">
    {#if $jwtToken === ''}
      <Button size="sm" href="/admin/signin">Sign In</Button>
    {:else}
      <Button size="sm" href="/admin/signin" on:click={handleLogout}>Sign Out</Button>
    {/if}
    <NavHamburger on:click={toggle} />
  </div>
</Navbar>

<slot />

<Footer>

  <FooterCopyright href="/home" by="Flowbite™" year={2023} />
  <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
    <span
    class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
  >
    SER<b>VVIZ</b> / admin
  </span>
  </FooterLinkGroup>
</Footer>