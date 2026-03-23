<script>
	import bannerDate from '$cms/banners.json';
	import BannerCarousel from '$lib/Section/Banner/BannerCarousel.svelte';
	import Collection from '$lib/Components/Collection/Collection.svelte';
	import { allCollections } from '$lib/cms';
</script>

<svelte:head>
	<title>Início</title>
</svelte:head>
<BannerCarousel banners={bannerDate.banners} />

{#each allCollections as collection}
	<Collection titleCollection={collection.nameCollection} products={collection.products} />
{/each}
