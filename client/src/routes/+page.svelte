<script lang="ts">
  // import { CarouselTransition } from 'flowbite-svelte'
  // import { images } from './imageData/+server.js';
  import { Rating } from "flowbite-svelte";
  import { HeroHeader } from "flowbite-svelte-blocks";
  import { ArrowRight } from "svelte-heros";
  import { ContentWithImage } from "flowbite-svelte-blocks";
  import { FeatureDefault, FeatureItem } from "flowbite-svelte-blocks";
  import {
    Home,
    PresentationChartLine,
    AcademicCap,
    Cog,
    Briefcase,
    CurrencyDollar,
    Bolt,
  } from "svelte-heros";
  import {
    Card,
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Button,
    Input,
  } from "flowbite-svelte";
  import {
    Footer,
    FooterBrand,
    FooterCopyright,
    FooterIcon,
    FooterLink,
    FooterLinkGroup,
  } from "flowbite-svelte";
  import { jwtToken } from "./store";
  import "../app.postcss";

  function handleLogout() {
    jwtToken.set("");
    alert("Berhasil logout");
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
    {#if $jwtToken === ""}
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

<section class="mx-10 my-20">
  <div class="flex justify-center items-center p-10">
    <div class="mr-auto place-self-center lg:col-span-7">
      <HeroHeader
        h1Class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
        pClass="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
      >
        <svelte:fragment slot="h1"
          >Payments tool for software companies</svelte:fragment
        >
        <svelte:fragment slot="paragraph">
          From checkout to global sales tax compliance, companies around the
          world use Flowbite to simplify their payment stack.
        </svelte:fragment>
        <a href="/order"
          ><button class="inline-flex items-center justify-center mr-3">
            Order<ArrowRight size="18" class="ml-2 -mr-1" />
          </button>
        </a>
        <a href="/track"
          ><button class="inline-flex items-center justify-center">
            Track order
          </button>
        </a>
      </HeroHeader>
    </div>
    <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
      <img
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
        alt="mockup"
        width="500"
        height="600"
      />
    </div>
  </div>
</section>

<section class="mx-10 my-30">
  <div class="flex justify-center items-center p-10">
    <ContentWithImage>
      <svelte:fragment slot="h2">We didn't reinvent the wheel</svelte:fragment>
      <p class="mb-4">
        We are strategists, designers and developers. Innovators and problem
        solvers. Small enough to be simple and quick, but big enough to deliver
        the scope you want at the pace you need. Small enough to be simple and
        quick, but big enough to deliver the scope you want at the pace you
        need.
      </p>
      <p>
        We are strategists, designers and developers. Innovators and problem
        solvers. Small enough to be simple and quick.
      </p>

      <svelte:fragment slot="image">
        <img
          class="w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
          alt="office content 1"
        />
        <img
          class="mt-4 w-full lg:mt-10 rounded-lg"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
          alt="office content 2"
        />
      </svelte:fragment>
    </ContentWithImage>
  </div>
</section>

<section class="mx-10 my-40">
  <div class="flex justify-center items-center mb-0">
    <ContentWithImage>
      <svelte:fragment slot="h2">Testimonies</svelte:fragment>
    </ContentWithImage>
  </div>
  <div>
    <div class="flex justify-center items-center p-10">
      <div class="mx-5">
        <Card padding="sm">
          <div class="flex flex-col items-center pb-4">
            <h5 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Bonnie Green
            </h5>
            <Rating class="mb-4" id="example-3" total={5} rating={3.4} />
            <span class="text-center text-sm text-gray-500 dark:text-gray-400"
              >lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum
              dolor</span
            >
          </div>
        </Card>
      </div>
      <div class="mx-5">
        <Card padding="sm">
          <div class="flex flex-col items-center pb-4">
            <h5 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Bonnie Green
            </h5>
            <Rating class="mb-4" id="example-3" total={5} rating={3.4} />
            <span class="text-center text-sm text-gray-500 dark:text-gray-400"
              >lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum
              dolor</span
            >
          </div>
        </Card>
      </div>
      <div class="mx-5">
        <Card padding="sm">
          <div class="flex flex-col items-center pb-4">
            <h5 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Bonnie Green
            </h5>
            <Rating class="mb-4" id="example-3" total={5} rating={3.4} />
            <span class="text-center text-sm text-gray-500 dark:text-gray-400"
              >lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum
              dolor</span
            >
          </div>
        </Card>
      </div>
      <div class="mx-5">
        <Card padding="sm">
          <div class="flex flex-col items-center pb-4">
            <h5 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Bonnie Green
            </h5>
            <Rating class="mb-4" id="example-3" total={5} rating={3.4} />
            <span class="text-center text-sm text-gray-500 dark:text-gray-400"
              >lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum
              dolor</span
            >
          </div>
        </Card>
      </div>
    </div>
  </div>
</section>

<section class="flex justify-center items-center p-10 mx-10 my-10">
  <div class="flex justify-center items-center p-10">
    <ContentWithImage>
      <svelte:fragment slot="h2">Our Services</svelte:fragment>
    </ContentWithImage>
  </div>
  <div class="flex justify-center items-center p-10">
    <FeatureDefault>
      <FeatureItem>
        <svelte:fragment slot="icon"
          ><PresentationChartLine
            class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
          /></svelte:fragment
        >
        <svelte:fragment slot="h3">Marketing</svelte:fragment>
        <svelte:fragment slot="paragraph"
          >Plan it, create it, launch it. Collaborate seamlessly with all the
          organization and hit your marketing goals every month with our
          marketing plan.</svelte:fragment
        >
      </FeatureItem>
      <FeatureItem>
        <svelte:fragment slot="icon"
          ><AcademicCap
            class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
          /></svelte:fragment
        >
        <svelte:fragment slot="h3">Legal</svelte:fragment>
        <svelte:fragment slot="paragraph"
          >Protect your organization, devices and stay compliant with our
          structured workflows and custom permissions made for you.</svelte:fragment
        >
      </FeatureItem>
      <FeatureItem>
        <svelte:fragment slot="icon"
          ><Briefcase
            class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
          /></svelte:fragment
        >
        <svelte:fragment slot="h3">Business Automation</svelte:fragment>
        <svelte:fragment slot="paragraph"
          >Auto-assign tasks, send Slack messages, and much more. Now power up
          with hundreds of new templates to help you get started.</svelte:fragment
        >
      </FeatureItem>
      <FeatureItem>
        <svelte:fragment slot="icon"
          ><CurrencyDollar
            class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
          /></svelte:fragment
        >
        <svelte:fragment slot="h3">Finance</svelte:fragment>
        <svelte:fragment slot="paragraph"
          >Audit-proof software built for critical financial operations like
          month-end close and quarterly budgeting.</svelte:fragment
        >
      </FeatureItem>
      <FeatureItem>
        <svelte:fragment slot="icon"
          ><Bolt
            class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
          /></svelte:fragment
        >
        <svelte:fragment slot="h3">Enterprise Design</svelte:fragment>
        <svelte:fragment slot="paragraph"
          >Craft beautiful, delightful experiences for both marketing and
          product with real cross-company collaboration.</svelte:fragment
        >
      </FeatureItem>
      <FeatureItem>
        <svelte:fragment slot="icon"
          ><Cog
            class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
          /></svelte:fragment
        >
        <svelte:fragment slot="h3">Operations</svelte:fragment>
        <svelte:fragment slot="paragraph"
          >Keep your company’s lights on with customizable, iterative, and
          structured workflows built for all efficient teams and individual.</svelte:fragment
        >
      </FeatureItem>
    </FeatureDefault>
  </div>
</section>

<section class="mx-10 my-20">
  <div class="flex justify-center items-center p-10">
    <Card class="text-center" size="lg" padding="xl">
      <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        Try our sevices
      </h5>
      <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        Get in touch with our professional today, and get your gadgets back up
        and running.
      </p>
      <div
        class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"
      >
        <Button href="/order">Order now</Button>
      </div>
    </Card>
  </div>
</section>

<Footer>
  <FooterCopyright href="/" by="Flowbite™" year={2022} />
  <FooterLinkGroup
    ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
  >
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
