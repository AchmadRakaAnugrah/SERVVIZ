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
        src: 'https://i.pinimg.com/236x/ab/35/4d/ab354dadcf2cea17ed6e589fd5fb65fe.jpg',
        alt: 'Raka',
        name: 'Raka',
        jobTitle: 'Front-end',
        description: 'responsible for creating an attractive and easy-to-use interface, and ensuring that the app runs well.'
      },
      {
        href: '/',
        src: 'https://i.pinimg.com/236x/f9/9b/91/f99b910443c7c4c15a4024d1709c2b6a.jpg',
        alt: 'Raffi',
        name: 'Raffi',
        jobTitle: 'UI/UX',
        description: 'Responsible for a comprehennsive user experiences, intuitive interfaces, and visually stunning designs.'
      },
      {
        href: '/',
        src: 'https://i.pinimg.com/236x/a6/bd/0b/a6bd0bb143610f3b574a29dba7933590.jpg',
        alt: 'Dylan',
        name: 'Dylan',
        jobTitle: 'Project Manager - WebDeveloper',
        description: 'Designed and oversought the application development, mainly front-end, database, application flow design'
      },
      {
        href: '/',
        src: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png',
        alt: 'Raihan',
        name: 'Raihan',
         jobTitle: 'Backend Engineer',
        description: 'responsible for developing applications or websites that focus on managing servers, databases and APIs and everything.'
      }
    ];
  </script>
  
  <TeamWrapper>
    <TeamHeader>
      <svelte:fragment slot="label">Our Team</svelte:fragment>
      <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
       Meet our team
      </p>
    </TeamHeader>
    <TeamBody>
      {#each members as { href, src, alt, name, jobTitle, description }}
      <TeamItem {href} {src} {alt} {name} {jobTitle}>
        <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{description}</p>
      </TeamItem>
      {/each}
    </TeamBody>
  </TeamWrapper>