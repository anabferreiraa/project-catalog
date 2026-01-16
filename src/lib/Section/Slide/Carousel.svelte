<script>
  import emblaCarouselSvelte from 'embla-carousel-svelte'
  import Autoplay from 'embla-carousel-autoplay'

  let options = { loop: true }
  let plugins = [Autoplay()]

  
</script>

<div class="embla" use:emblaCarouselSvelte="{{ options, plugins }}">
  <div class="embla__container">
    <div class="embla__slide">
     <img src="/image/slide/banner-2.webp" alt="">
    </div>
    <div class="embla__slide">
     <img src="/image/slide/banner.webp" alt="">
    </div>
    <div class="embla__slide">
     <img src="/image/slide/banner-2.webp" alt="">
    </div>
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