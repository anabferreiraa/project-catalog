<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import Fade from 'embla-carousel-fade';

	let options = { loop: true, align: 'center', containScroll: false };
	let plugins = [Autoplay(), Fade()];

	interface Images {
		name: string;
		alt: string;
		link: string;
	}
	interface Props {
		images?: Images[];
	}
	let {
		images = [
			{
				name: '/images/slide/banner-2.webp',
				alt: 'imagem de slide',
				link: ''
			},
			{
				name: '/images/slide/banner.webp',
				alt: 'imagem de slide',
				link: ''
			}
		]
	}: Props = $props();
</script>

<div class="embla" use:emblaCarouselSvelte={{ options, plugins }}>
	<div class="embla__container">
		{#each images as { name, alt, link }}
			<div class="embla__slide h-125 w-full bg-amber-200 lg:h-175">
				<a href="{link}"> <img class="h-full w-full" src={name} {alt} /> </a> 
			</div>
		{/each}
	</div>
</div>
 <div class="embla__controls">
        <div class="embla__dots"></div>
      </div>
<style>
	.embla {
		overflow: hidden;
	}
	.embla__container {
		display: flex;
	}
	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
	}
</style>
