<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import Fade from 'embla-carousel-fade';

	let options = { loop: true };
	let plugins = [Autoplay(), Fade()];

	let emblaApi: any;

	// bolinhas
	let scrollSnaps: any[] = $state( [] );
	let selectedSnap: number = $state( 0 )

	const goTo = (index: number) => emblaApi?.goTo(index);
	const setupSnaps = (emblaApi: any) => (scrollSnaps = emblaApi.snapList());
	const setActiveSnap = (emblaApi: any) => (selectedSnap = emblaApi.selectedSnap());

	const onInit = (event: any) => {
		emblaApi = event.detail;

		setupSnaps(emblaApi);
		setActiveSnap(emblaApi);

		emblaApi.on('reinit', setupSnaps);
		emblaApi.on('reinit', setActiveSnap);
		emblaApi.on('select', setActiveSnap);
	};

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

<section class=" h-auto w-full bg-amber-200">
	<div class="embla">
		<div class="embla__viewport" emblainit={onInit} use:emblaCarouselSvelte={{ options, plugins }}>
			<div class="embla__container">
				{#each banners as { link, blank, desktopImage, mobileImage }}
					<div class="embla__slide">
						{#if link != ''}
							<a href={link} target={blank ? '_blank' : '_self'}>
								<img
									class="hidden h-auto w-full lg:block"
									src={desktopImage.src}
									alt={desktopImage.alt}
								/>
								<img class="h-auto w-full lg:hidden" src={mobileImage.src} alt={mobileImage.alt} />
							</a>
						{:else}
							<img
								class="hidden h-auto w-full lg:block"
								src={desktopImage.src}
								alt={desktopImage.alt}
							/>
							<img class="h-auto w-full lg:hidden" src={mobileImage.src} alt={mobileImage.alt} />
						{/if}
					</div>
				{/each}
			</div>
		</div>
		<div class="embla__dots">
			{#each scrollSnaps as _, index}
				<button
					class="embla__dot h-4 w-3 rounded-full bg-amber-400"
					class:embla__dot--selected={index === selectedSnap}
					onclick={() => goTo(index)}
				>
					<!-- Button content -->
				</button>
			{/each}
		</div>
	</div>
</section>

<style>
	.embla {
		position: relative;
	}
	.embla__viewport {
		overflow: hidden;
	}
	.embla__container {
		display: flex;
		gap: 0;
		touch-action: pan-y pinch-zoom;
	}
	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
		height: 500px;
	}
	.embla__dot {
		opacity: 0.5;
	}

	.embla__dot--selected {
		opacity: 1;
	}
</style>
