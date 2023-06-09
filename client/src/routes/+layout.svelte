<script lang='ts'>
  import "../app.postcss";
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
  import { jwtToken } from "./store";

  function handleLogout() {
    jwtToken.set('');
    alert('Berhasil logout');
    console.log($jwtToken);
  }
</script>

<Navbar let:hidden let:toggle>
  <NavBrand href="/">
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
    >
      SER<b>VVIZ</b>
    </span>
  </NavBrand>
  <div class="flex md:order-2">
    {#if $jwtToken === ''}
      <Button size="sm" href="/signin">Sign In</Button>
    {:else}
      <Button size="sm" href="/" on:click={handleLogout}>Sign Out</Button>
    {/if}
    <NavHamburger on:click={toggle} />
  </div>
  <NavUl {hidden} class="order-1">
    <NavLi href="/">Home</NavLi>
    <NavLi href="/order">Order</NavLi>
    <NavLi href="/track">Track Order</NavLi>
  </NavUl>
</Navbar>

<slot />

<Footer>

  <FooterCopyright href="/" by="Flowbite™" year={2022} />
  <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
    <!-- <FooterLink href="/">About</FooterLink>
    <FooterLink href="/">Privacy Policy</FooterLink>
    <FooterLink href="/">Licensing</FooterLink>
    <FooterLink href="/">Contact</FooterLink> -->
    <span
    class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
  >
    SER<b>VVIZ</b>
  </span>
  </FooterLinkGroup>
</Footer>