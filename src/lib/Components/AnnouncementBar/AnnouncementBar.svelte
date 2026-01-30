<script lang="ts">
    import { cn } from '$lib/Utils/utils';
    

    interface Props {
        active?: boolean;
        messages?: string[];
        speed?: number; // Duração em segundos
        className?: string;
    }

    let {
        active = true,
        messages = [
            'Nova',
            'Oferta por tempo limitado!',
            'Transforme seu workflow hoje funcionalidade disponível!'
        ],
        speed = 20,
        className
    }: Props = $props();

    // Repete as mensagens várias vezes para garantir cobertura em telas super largas
    const repeatCount = 12;
    const displayMessages = $derived(Array(repeatCount).fill(messages).flat());
</script>

{#if active}
    <div
        class={cn(
            'relative flex h-10 w-full items-center overflow-hidden bg-[#941711] text-[#F6ECC9] shadow-sm',
            className
        )}
    >
        <div
            class="animate-marquee flex items-center whitespace-nowrap"
            style="animation-duration: {speed}s; width: max-content;"
        >
            {#each displayMessages as message}
                <span class="px-10 font-mono text-sm font-semibold tracking-wider uppercase">
                    {message}
                </span>
              <samp> x </samp>
            {/each}
        </div>
    </div>
{/if}

<style>
    @keyframes marquee {
        0% {
            transform: translateX(0);
        }
        100% {
            /* Move by exactly one full set of messages */
            transform: translateX(calc(-100% / 12));
        }
    }

    .animate-marquee {
        animation: marquee linear infinite;
    }
</style>