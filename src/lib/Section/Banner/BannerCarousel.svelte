<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import Fade from 'embla-carousel-fade';

	let options = { loop: true };
	let plugins = [Autoplay(), Fade()];
	let emblaApi: any = $state();

	// função pra navegação

	function carouselPrev() {
		if (emblaApi) emblaApi.carouselPrev;
	}
	function carouselNext() {
		if (emblaApi) emblaApi.carouselNext;
	}
	function onInit( event: any ) {
       emblaApi = event.detail
	}



	interface Banners {
		link?: string;
		blank: boolean;
		desktopImage: {
			src: string;
			alt: string;
		};
		mobileImage: {
			src: string;
			alt: string;
		};
	}
	interface Props {
		banners?: Banners[];
	}

	let {
		banners = [
			{
				link: '',
				blank: false,
				desktopImage: {
					src: 'test',
					alt: 'test'
				},
				mobileImage: {
					src: 'test',
					alt: 'test'
				}
			}
		]
	}: Props = $props();
</script>

<section class=" bg-amber-200 w-full h-auto">
    <div class="embla">
     <div class="embla__viewport" emblainit={onInit} use:emblaCarouselSvelte={{ options, plugins }}>
        <div class="embla__container">
           {#each banners as {link, blank, desktopImage , mobileImage } }
			<div class="embla__slide">
                {#if link != ''}
					<a href={link} target={blank ? '_blank' : '_self' } >
					
					<img class="w-full h-auto hidden lg:block " src={desktopImage.src} alt={desktopImage.alt}> 
					<img class="w-full h-auto lg:hidden  " src={mobileImage.src} alt={mobileImage.alt}> 
					</a>
					{:else}

					<img class="w-full h-auto hidden lg:block " src={desktopImage.src} alt={desktopImage.alt}> 
					<img class="w-full h-auto lg:hidden  " src={mobileImage.src} alt={mobileImage.alt}>
				{/if}
			</div>
		   {/each}
		</div>
	 </div>
	</div>
</section>

<style>
	.embla{
		position: relative;
	}
	.embla__viewport {
		overflow: hidden;
	}
	.embla__container{
		display: flex;
		gap: 0;
		touch-action: pan-y pinch-zoom
	}
	.embla__slide{
		flex: 0 0 100%;
        min-width: 0;
		height: 500px;
	}
</style>