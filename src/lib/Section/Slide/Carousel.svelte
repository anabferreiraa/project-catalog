<script lang="ts">
  import emblaCarouselSvelte from 'embla-carousel-svelte'
  import Autoplay from 'embla-carousel-autoplay'
  import Fade from 'embla-carousel-fade'

  let options = { loop: true, align: 'center',
  containScroll: false }
  let plugins = [Autoplay(), Fade() ]

interface Images {
    name: string;
		alt: string;
    link: string
	}
   interface Props {
		images?: Images[];
	}
	let {
		images = [
       {
			name: '/images/slide/banner-2.webp',
      alt:'imagem de slide',
      link:''
		    },
      {
      name: '/images/slide/banner.webp',
      alt:'imagem de slide',
      link:''
    }

    ] 
	}: Props = $props();

</script>

<div class="embla" use:emblaCarouselSvelte="{{ options, plugins,  }}">
  <div class="embla__container">
      {#each images as {name,alt,link} }
      <div class="embla__slide bg-amber-200 w-full h-125 lg:h-175">
        <img class="w-full h-full"  src="{name}" alt="{alt}">
        </div>
      {/each}
  </div>
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