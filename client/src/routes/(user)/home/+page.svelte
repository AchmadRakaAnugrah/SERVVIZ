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
        customer: 'Alphabet Inc.',
        title: 'Hardware',
        description:
          'Flowbite helps you connect with friends, family and communities of people who share your interests.',
        href: '/order',
        linkTitle: 'Order'
      },
      {
        customer: 'Microsoft Corp.',
        title: 'Software',
        description:
          'Flowbite helps you connect with friends, family and communities of people who share your interests.',
        href: '/order',
        linkTitle: 'Order'
      },
      {
        customer: 'Adobe Inc.',
        title: 'Maintenance',
        description:
          'Flowbite helps you connect with friends, family and communities of people who share your interests.',
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
          pClass="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
        >
          <svelte:fragment slot="h1"
            >Ideal solution for your computer needs</svelte:fragment
          >
          <svelte:fragment slot="paragraph">
            From checkout to global sales tax compliance, companies around the
            world use Flowbite to simplify their payment stack.
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
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
          alt="mockup"
          width="500"
          height="600"
        />
      </div>
    </div>
  </section>
  
  <section class="mx-10 my-20">
    <div class="flex justify-center items-center p-10">
      <ContentWithImage>
        <svelte:fragment slot="h2">Let us help you</svelte:fragment>
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
  