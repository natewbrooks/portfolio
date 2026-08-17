<script lang="ts">
  import { getContext } from "svelte";
  import IconSend from "~icons/mdi/send";
  import IconHome from "~icons/mdi/home";

  const navigateToHome = getContext<() => void>("navigateToHome");

  let name = $state("");
  let email = $state("");
  let subject = $state("");
  let message = $state("");
  
  let sending = $state(false);
  let sent = $state(false);
  let error = $state("");

  async function handleSubmit(e: Event) {
    e.preventDefault();
    
    if (!name || !email || !message) {
      error = "Please fill in all required fields";
      window.umami?.track("contact-invalid");
      return;
    }

    sending = true;
    error = "";

    try {
      const res = await fetch("/api/mail/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      sent = true;
      window.umami?.track("contact-sent", { hasSubject: !!subject });
      name = "";
      email = "";
      subject = "";
      message = "";
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to send message";
      window.umami?.track("contact-failed", { reason: error });
    } finally {
      sending = false;
    }
  }

  function resetForm() {
    sent = false;
    error = "";
  }
</script>

<div class="relative py-4 px-4 h-full flex flex-col space-y-4">
  <div class="sticky top-0 w-full flex items-center justify-between bg-darkest py-2 z-10">
    <span class="text-purple font-bold">send me a message</span>
    <button 
      onclick={() => navigateToHome?.()}
      class="text-pink hover:text-pink/80 transition-colors flex items-center space-x-1 cursor-pointer"
      aria-label="Return to home"
    >
      <IconHome class="w-5 h-5" />
      <span class="hidden sm:inline text-sm">return</span>
    </button>
  </div>

  {#if sent}
    <div class="flex flex-col items-center justify-center py-16 space-y-4">
      <div class="text-green text-6xl">✓</div>
      <h2 class="text-xl text-green font-bold">Message Sent!</h2>
      <p class="text-white/60 text-center">Thanks for reaching out. I'll get back to you soon.</p>
      <button 
        onclick={resetForm}
        class="mt-4 flex items-center justify-center space-x-2 px-4 py-3 bg-purple text-darkest font-bold rounded hover:bg-purple/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send another message
      </button>
    </div>
  {:else}
    <form onsubmit={handleSubmit} class="flex flex-col space-y-4 max-w-lg mx-auto w-full">
      {#if error}
        <div class="text-pink text-sm bg-pink/10 px-3 py-2 rounded border border-pink/30">
          {error}
        </div>
      {/if}

      <div class="flex flex-col space-y-1">
        <label for="name" class="text-green text-sm">name <span class="text-pink">*</span></label>
        <input 
          type="text" 
          id="name"
          bind:value={name}
          class="bg-light border border-light focus:border-orange outline-none px-3 py-2 rounded text-white text-base"
          placeholder="your name"
          required
        />
      </div>

      <div class="flex flex-col space-y-1">
        <label for="email" class="text-green text-sm">email <span class="text-pink">*</span></label>
        <input 
          type="email" 
          id="email"
          bind:value={email}
          class="bg-light border border-light focus:border-orange outline-none px-3 py-2 rounded text-white text-base"
          placeholder="your@email.com"
          required
        />
      </div>

      <div class="flex flex-col space-y-1">
        <label for="subject" class="text-green text-sm">subject</label>
        <input 
          type="text" 
          id="subject"
          bind:value={subject}
          class="bg-light border border-light focus:border-orange outline-none px-3 py-2 rounded text-white text-base"
          placeholder="what's this about?"
        />
      </div>

      <div class="flex flex-col space-y-1">
        <label for="message" class="text-green text-sm">message <span class="text-pink">*</span></label>
        <textarea 
          id="message"
          bind:value={message}
          rows="6"
          class="bg-light border border-light focus:border-orange outline-none px-3 py-2 rounded text-white text-base resize-none"
          placeholder="your message..."
          required
        ></textarea>
      </div>

      <button 
        type="submit"
        disabled={sending}
        class="flex items-center justify-center space-x-2 px-4 py-3 bg-purple text-darkest font-bold rounded hover:bg-purple/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {#if sending}
          <span>Sending...</span>
        {:else}
          <IconSend class="w-5 h-5" />
          <span>Send Message</span>
        {/if}
      </button>

      <p class="text-white/40 text-xs text-center">
        Or email me directly at <a href="mailto:natewbrooks@gmail.com" data-umami-event="mailto-click" class="text-purple hover:underline">natewbrooks@gmail.com</a>
      </p>
    </form>
  {/if}
</div>

<style>
    label {
        font-weight: bold;
    }
</style>