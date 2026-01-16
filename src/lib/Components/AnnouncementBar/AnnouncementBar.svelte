<script lang="ts">
	import IconeAmouncementBar from "../Icons/IconeAmouncementBar.svelte";

	interface Props {
		messages: string[];
		speed?: number;
	}

	let { messages = ['teste', 'teste'], speed = 50 }: Props = $props();

	const repeatedMessages = [...messages, ...messages, ...messages, ...messages];
</script>

<section class="relative w-full overflow-hidden uppercase bg-red-700 py-5 text-sm font-medium text-amber-100">
	<div class="flex whitespace-nowrap ">
        {#each Array(2)}
            <div class="flex items-center animate-marquee gap-12 " style="animation-duration:{speed}s">
            {#each repeatedMessages as message, index}
                <span class="inline-flex items-center gap-5">{message} 
                    {#if index !== repeatedMessages.length - 1}
                        <IconeAmouncementBar/>
                    {/if}
                </span>

            {/each}
        </div>
        {/each}
    </div>
</section>
<style>
    .animate-marquee{
        animation: marquee linear infinite;
    }
    
    @keyframes marquee {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-100%);
        }
    }
   
</style>