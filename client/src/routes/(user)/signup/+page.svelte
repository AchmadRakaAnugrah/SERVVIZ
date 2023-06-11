<script lang="ts">
  import { Card, Button, Label, Input} from "flowbite-svelte";
  import { jwtToken } from "../../store";
  import { goto } from "$app/navigation";

  let name: string = "";
  let username: string = "";
  let email: string = "";
  let phone: string = "";
  let password: string = "";
  let confirmPassword: string = "";

  const passwordMatch = () => password === confirmPassword;
  const passwordLength = () => password.length >= 6;
  function validateName(input: string): boolean {
    const regex = /^[a-zA-Z\s\-]{1,50}$/;
    return regex.test(input);
  }
  function validateUsername(input: string): boolean {
    const regex = /^[a-zA-Z0-9]{1,10}$/;
    return regex.test(input);
  }
  function validatePhone(input: string): boolean {
    const regex = /^08.{0,13}$/;
    return regex.test(input);
  }

  async function registerUser() {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        name: name,
        username: username,
        phone: phone,
        password: password,
      }),
    });

    return response;
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();

    if (!validateName(name)) {
      alert("Format nama tidak sesuai");
    } else if (!validateUsername(username)) {
      alert("Format username tidak sesuai");
    } else if (!validatePhone(phone)) {
      alert("Format nomor telepon selular tidak sesuai");
    } else if (!passwordMatch) {
      alert("Password tidak sama");
    } else if (!passwordLength) {
      alert("Password minimum dari 6 karakter");
    } else {
      try {
        const response = await registerUser();

        if (response.status === 201) {
          alert("Berhasil register, silahkan login");
          goto("/signin");
        } else if (response.status === 409) {
          alert("Username atau email sudah terdaftar, gunakan yang lain");
        } else {
          alert("Terjadi error, coba lagi di lain waktu");
        }
      } catch (error) {
        alert("Terjadi error, coba lagi di lain waktu");
      }
    }
  }
</script>

<div class="flex justify-center items-center p-10">
  <Card class="w-full">
    <form class="flex flex-col space-y-6" action="/">
      <h3 class="text-xl font-medium text-gray-900 dark:text-white">
        Sign up to our platform
      </h3>
      <Label class="space-y-2">
        <span>Full name</span>
        <Input
          type="text"
          name="name"
          placeholder="Your name"
          required
          bind:value={name}
        />
      </Label>
      <Label class="space-y-2">
        <span>Username</span>
        <Input
          type="text"
          name="username"
          placeholder="Your username"
          required
          bind:value={username}
        />
      </Label>
      <Label class="space-y-2">
        <span>Email</span>
        <Input
          type="email"
          name="email"
          placeholder="name@example.com"
          required
          bind:value={email}
        />
      </Label>
      <Label class="space-y-2">
        <span>Phone</span>
        <Input
          type="tel"
          name="phone"
          placeholder="08xxx"
          required
          bind:value={phone}
        />
      </Label>
      <Label class="space-y-2">
        <span>Your password</span>
        <Input
          type="password"
          name="password"
          placeholder="•••••"
          required
          bind:value={password}
        />
      </Label>
      <Label class="space-y-2">
        <span>Repeat your password</span>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="•••••"
          required
          bind:value={confirmPassword}
        />
      </Label>

      <Button type="submit" on:click={handleSubmit} class="w-full"
        >Create account</Button
      >
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        Already have an account? <a
          href="/signin"
          class="text-primary-700 hover:underline dark:text-primary-500"
          >Sign In</a
        >
      </div>
    </form>
  </Card>
</div>
