<script>
    import "../../../../app.postcss";
    import { Card, Button, Label, Input} from "flowbite-svelte";
</script>
  
  <div class="flex justify-center items-center p-10">
    <Card class="w-full">
      <form class="flex flex-col space-y-6" action="/">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
          Sign up to our platform
        </h3>
        <Label class="space-y-2">
          <span>Username</span>
          <Input
            type="text"
            name="username"
            placeholder="Your username"
            required
          />
        </Label>
        <Label class="space-y-2">
          <span>Email</span>
          <Input
            type="email"
            name="email"
            placeholder="name@company.com"
            required
          />
        </Label>
        <Label class="space-y-2">
          <span>Your password</span>
          <Input type="password" name="password" placeholder="•••••" required />
        </Label>

        <Button type="submit" class="w-full">Create account</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Already have an account? <a
            href="/admin"
            class="text-primary-700 hover:underline dark:text-primary-500"
            >Sign In</a
          >
        </div>
      </form>
    </Card>
  </div>
  