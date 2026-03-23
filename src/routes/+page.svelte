<script>
	import bannerDate from '$cms/banners.json';
	import BannerCarousel from '$lib/Section/Banner/BannerCarousel.svelte';
	import Collection from '$lib/Components/Collection/Collection.svelte';
	import exemplo from '$cms/exemplo.json';
</script>

<svelte:head>
	<title>Início</title>
</svelte:head>
<BannerCarousel banners={bannerDate.banners} />

<Collection titleCollection={exemplo.nameCollection} products={exemplo.products} />

<Collection titleCollection={exemplo.nameCollection} products={exemplo.products} />
