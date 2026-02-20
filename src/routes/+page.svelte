<script>
	import bannerDate from '$cms/banners.json';
	import BannerCarousel from '$lib/Section/Banner/BannerCarousel.svelte';
	import Collection from '$lib/Components/Collection/Collection.svelte';
	import exemplo from '$cms/exemplo.json'

</script>

<BannerCarousel banners={bannerDate.banners} />
<Collection titleCollection = {exemplo.nameCollection} products = {exemplo.products}  />
