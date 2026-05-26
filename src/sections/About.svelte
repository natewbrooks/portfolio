<script lang="ts">
    const BIRTHDAY = new Date("2004-07-01T00:00:00");
    function calcAge(now: Date): number {
        let age = now.getFullYear() - BIRTHDAY.getFullYear();
        const m = now.getMonth() - BIRTHDAY.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < BIRTHDAY.getDate())) age--;
        return age;
    }
    const age = calcAge(new Date());
</script>

<div class="">
    <p class="pb-4">
        Hello! I'm {age} years old and have been passionate about programming from a young age. I approach every project as an opportunity to learn something new and hold myself to a high standard. I’m especially drawn to designing elegant <span class="text-purple font-bold">UI/UX</span> and <span class="text-blue font-bold">system architecture</span> problems that scale effectively.
        <br /><br />
        <span class="text-pink font-bold">My long-term goal is to build software that has a lasting, positive impact on real people.</span>
    </p>
</div>
