<script lang="ts">
    import {
      TeamWrapper,
      TeamHeader,
      TeamBody,
      TeamItem,
      Facebook,
      Github,
      Twitter
    } from 'flowbite-svelte-blocks';
  
    let members = [
      {
        href: '/',
        src: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png',
        alt: 'Raka',
        name: 'Raka',
        jobTitle: 'CEO & Web Developer',
        description: 'Bonnie drives the technical strategy of the flowbite platform and brand.'
      },
      {
        href: '/',
        src: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
        alt: 'Raffi',
        name: 'Raffi',
        jobTitle: 'CTO',
        description: 'Jese drives the technical strategy of the flowbite platform and brand.'
      },
      {
        href: '/',
        src: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png',
        alt: 'Dylan',
        name: 'Dylan',
        jobTitle: 'Senior Front-end Developer',
        description: 'Michael drives the technical strategy of the flowbite platform and brand'
      },
      {
        href: '/',
        src: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png',
        alt: 'Raihan',
        name: 'Raihan',
        jobTitle: 'Marketing & Sale',
        description: 'Lana drives the technical strategy of the flowbite platform and brand.'
      }
    ];
  </script>
  
  <TeamWrapper>
    <TeamHeader>
      <svelte:fragment slot="label">Our Team</svelte:fragment>
      <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
        Explore the whole collection of open-source web components and elements built with the utility
        classes from Tailwind
      </p>
    </TeamHeader>
    <TeamBody>
      {#each members as { href, src, alt, name, jobTitle, description }}
      <TeamItem {href} {src} {alt} {name} {jobTitle}>
        <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{description}</p>
        <svelte:fragment slot="social">
          <Facebook href="/" />
          <Github href="/" />
          <Twitter href="/" />
        </svelte:fragment>
      </TeamItem>
      {/each}
    </TeamBody>
  </TeamWrapper>