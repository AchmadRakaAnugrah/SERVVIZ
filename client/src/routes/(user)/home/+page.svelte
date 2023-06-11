<script lang="ts">
    import { Rating } from "flowbite-svelte";
    import { HeroHeader } from "flowbite-svelte-blocks";
    import { ArrowRight } from "svelte-heros";
    import { ContentWithImage } from "flowbite-svelte-blocks";
    import {
      Card,
      Button,
    } from "flowbite-svelte";
  
    //untuk our services
    import { Portfolio, PortfolioItem } from 'flowbite-svelte-blocks';
    const portfolios = [
      {
        title: 'Hardware',
        description:
         ' Our services provide reliable and efficient hardware solutions to repair and enhance the performance of your hardware.',
        href: '/order',
        linkTitle: 'Order'
      },
      {
        title: 'Software',
        description:
          'We provide comprehensive software services, from installation, updating, to problem solving.',
        href: '/order',
        linkTitle: 'Order'
      },
      {      
        title: 'Maintenance',
        description:
          'we provide routine maintenance and periodical maintenance to keep your system performance and reliability.',
        href: '/order',
        linkTitle: 'Order'
      }
    ];
  </script>
  
  <section class="mx-10 my-20">
    <div class="flex justify-center items-center p-10">
      <div class="mr-auto place-self-center lg:col-span-7">
        <HeroHeader
          h1Class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
          pClass="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 mr-10"
        >
          <svelte:fragment slot="h1"
            >Ideal solution for your computer needs</svelte:fragment
          >
          <svelte:fragment slot="paragraph">
            SER<b>VVIZ</b> is a computer device repair services provider. We handle various issues, from hardware, software to maintenance.
          </svelte:fragment>
          <a href="/order"
          ><button color="red" class="inline-flex items-center justify-center mr-3">
            Order<ArrowRight size="18" class="ml-2 -mr-1" />
          </button>
        </a>
        <a href="/track"
          ><button color="light" class="inline-flex items-center justify-center">
            Track order
          </button>
        </a>
        </HeroHeader>
      </div>
      <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img
          src="https://img.freepik.com/free-photo/working-code_1098-19858.jpg?size=626&ext=jpg"
          alt="mockup"
          width="500"
          height="600"
          class="ml-10 rounded-lg"
        />
      </div>
    </div>
  </section>
  
  <section class="mx-10 my-20">
    <div class="flex justify-center items-center p-10">
      <ContentWithImage>
        <svelte:fragment slot="h2">Let us help you</svelte:fragment>
        <p class="mb-4 mx-10">
         Our computer service offerings are designed to cater to your specific needs. Whether it's troubleshooting, 
         hardware repairs, software installations, or system optimization, we have a dedicated team of experts ready to assist you.
        </p>
        <p class="mx-10">
          We are ready to repair starting from computers, laptops and cellphones.
        </p>
  
        <svelte:fragment slot="image">
          <img
            class="w-full rounded-lg"
            src="https://img.freepik.com/free-photo/woman-working-call-center-holding-pair-headphones_23-2149256146.jpg?size=626&ext=jpg"
            alt="office content 1"
          />
          <img
            class="mt-4 w-full lg:mt-10 rounded-lg"
            src="https://img.freepik.com/free-photo/confident-call-center-operator-talking-with-client_74855-4059.jpg?size=626&ext=jpg"
            alt="office content 2"
          />
        </svelte:fragment>
      </ContentWithImage>
    </div>
  </section>
  
  <section class="mx-10 my-20">
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
  
  
  <section class="flex justify-center items-center mx-10 my-20">
    <div class="flex flex-col justify-center items-center p-10">
      <div class="flex justify-center items-center mb-0">
        <ContentWithImage>
          <svelte:fragment slot="h2">Our Services</svelte:fragment>
        </ContentWithImage>
      </div>
      <Portfolio>
        {#each portfolios as item}
        <PortfolioItem {item} />
        {/each}
      </Portfolio>
    </div>
  </section>
  
  <section class="mx-10 my-0">
    <div class="flex justify-center items-center p-10">
      <Card class="text-center mb-40" size="lg" padding="xl">
        <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Try our sevices
        </h5>
        <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Get in touch with our professionals and try out our services.
        </p>
        <div
          class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"
        >
          <Button href="/order">Order now</Button>
        </div>
      </Card>
    </div>
  </section>
  