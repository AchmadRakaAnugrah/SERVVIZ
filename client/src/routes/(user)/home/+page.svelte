<script lang="ts">
    import { Rating } from "flowbite-svelte";
    import { HeroHeader } from "flowbite-svelte-blocks";
    import { ArrowRight } from "svelte-heros";
    import { ContentWithImage } from "flowbite-svelte-blocks";
    import {
      Card,
      Button,
    } from "flowbite-svelte"
    import { Toggle } from "flowbite-svelte";
    let vCard = false;
    import image from '../../../myImage.png'
  </script>
  
  <body class="body">
  <section class="mx-10 my-10">
    <div class="flex justify-center items-center p-10">
      <div class="mr-auto place-self-center lg:col-span-7">
        <HeroHeader
          h1Class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
          pClass="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 mx-10 m"
        >
          <svelte:fragment slot="h1"
            >Ideal solution for your computer needs</svelte:fragment
          >
          <svelte:fragment slot="paragraph">
            SERVVIZ is a computer device repair service provider. Specializing in Hardware, Software and 
            Maintainence. We strive to deliver exceptional service and customer satisfaction, ensuring 
            your computer devices are in the best possible condition.
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
      <div class="hidden lg:mb-10 lg:col-span-5 lg:flex">
        <img
          src="{image}"
          alt="mockup"
          width="500"
          height="600"
        />
      </div>
    </div>
  </section>
  
  <section class="section mx-10 my-20">
    <div class="flex justify-center items-center mb-0">
      <ContentWithImage>
        <svelte:fragment slot="h2">Our Services</svelte:fragment>
      </ContentWithImage>
    </div>
  <div class="flex justify-center items-center p-10">
    <div class="mr-5 ml-5">
    <Card img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.txXXPMC7oGgK3gvVdIfBlAHaFM%26pid%3DApi&f=1&ipt=67a8209d7f558a7588757ca88e081da05e205bfc264882fd9ccc2395997038f8&ipo=images">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hardware Services</h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
        We diagnose and repair hardware issues, upgrade components for improved performance, replace faulty parts, and optimize hardware configurations
      </p>
    </Card>
  </div>
  <div class="mr-5 ml-5">
    <Card img="https://www.howtogeek.com/wp-content/uploads/2018/08/img_5b68e80f77e33.png?height=200p&trim=2,2,2,2" reverse=" true">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Software Services</h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Our experts resolve software-related problems, install and configure operating systems and software applications, remove malware and viruses, and offer data recovery and backup solutions.
      </p>
    </Card>
  </div>
  <div class="mr-5 ml-5">
    <Card img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP._4_dMowc0PGLaBJbjmomlgHaE8%26pid%3DApi&f=1&ipt=3f401cf7f29b6271d6e50898997335e8a0e82e65ef33e3a02a71e191b3db736a&ipo=images">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Maintenance Services</h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
        We provide regular system check-ups to detect and prevent potential issues, optimize systems for better speed and performance, apply security patches and updates, and offer expert advice on computer maintenance best practices.
      </p>
    </Card>
  </div>
</div>
</section>

  <section class="section mx-10 my-20">
    <div class="flex justify-center items-center p-10">
      <ContentWithImage>
        <svelte:fragment slot="h2">Let us help you</svelte:fragment>
        <p class="mb-4 mx-10">
         Our computer service offerings are designed to cater to your specific needs. Whether it's troubleshooting, 
         hardware repairs, software installations, or system optimization, we have a dedicated team of experts ready 
         to assist you.
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
                John Green
              </h5>
              <Rating class="mb-4" id="example-3" total={5} rating={4.7} />
              <span class="text-center text-sm text-gray-500 dark:text-gray-400"
                >"Their expert services saved my laptop. Fast and professional hardware and software solutions."</span
              >
            </div>
          </Card>
        </div>
        <div class="mx-5">
          <Card padding="sm">
            <div class="flex flex-col items-center pb-4">
              <h5 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">
                Sarah Sydney
              </h5>
              <Rating class="mb-4" id="example-3" total={5} rating={5} />
              <span class="text-center text-sm text-gray-500 dark:text-gray-400"
                >"They surpassed expectations with reliable software solutions. Highly recommended!""</span
              >
            </div>
          </Card>
        </div>
        <div class="mx-5">
          <Card padding="sm">
            <div class="flex flex-col items-center pb-4">
              <h5 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">
                David Fischer
              </h5>
              <Rating class="mb-4" id="example-3" total={5} rating={4.6} />
              <span class="text-center text-sm text-gray-500 dark:text-gray-400"
                >"I trust their exceptional maintenance services. Proactive, prompt, reliable. Overall Amazing!"</span
              >
            </div>
          </Card>
        </div>
        <div class="mx-5">
          <Card padding="sm">
            <div class="flex flex-col items-center pb-4">
              <h5 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">
                Bonnie Locksmith
              </h5>
              <Rating class="mb-4" id="example-3" total={5} rating={4.7} />
              <span class="text-center text-sm text-gray-500 dark:text-gray-400"
                >"Their friendly support team swiftly fixed my computer. Professionalism and outstanding service."</span
              >
            </div>
          </Card>
        </div>
      </div>
    </div>
  </section>
  

  
  <section class="mx-10 my-0">
    <div class="flex justify-center items-center p-10">
      <Card class="text-center mb-0" size="lg" padding="xl">
        <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Try our sevices
        </h5>
        <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Join our satisfied customers who have experienced the difference firsthand. Let us handle your computer repair needs and discover the peace of mind that comes with having a reliable, efficient, and trustworthy partner by your side.
        </p>
        <div
          class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"
        >
          <Button href="/order">Order now</Button>
        </div>
      </Card>
    </div>
  </section>
  </body>
