<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    const BIRTHDAY = new Date("2004-07-01T00:00:00");
    const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

    function calcExactAge(): string {
        return ((Date.now() - BIRTHDAY.getTime()) / MS_PER_YEAR).toFixed(10);
    }

    let exactAge = $state(calcExactAge());
    let intervalId: ReturnType<typeof setInterval> | null = null;

    onMount(() => {
        intervalId = setInterval(() => {
            exactAge = calcExactAge();
        }, 30);
    });
    onDestroy(() => {
        if (intervalId) clearInterval(intervalId);
    });
</script>

<div class="">
    <p class="pb-4">
        Hello! I'm <span class="text-orange">{exactAge}</span> years old and have been passionate about programming since I was little. I approach every project as an opportunity to learn something new and hold myself to a high standard. I’m especially drawn to designing elegant <span class="text-purple font-bold">UI/UX</span> and <span class="text-blue font-bold">system architecture</span> problems that scale effectively.
        <br /><br />
        <span class="text-pink font-bold">My long-term goal is to build software that has a lasting, positive impact on real people.</span>
    </p>
</div>
