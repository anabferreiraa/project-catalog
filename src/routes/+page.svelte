<script>
	import bannerDate from '$cms/banners.json'
	import BannerCarousel from '$lib/Section/Banner/BannerCarousel.svelte';
</script>

<BannerCarousel banners = {bannerDate.banners}        />


