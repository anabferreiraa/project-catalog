<script>
	import bannerDate from '$cms/banners.json';
	import BannerCarousel from '$lib/Section/Banner/BannerCarousel.svelte';
	import Footer from '$lib/Section/Footer/Footer.svelte';
	import generalConfigurationData from '$cms/general-configuration.json';
	import ProductCollection from '$lib/Section/ProductCollection/ProductCollection.svelte';
</script>

<BannerCarousel banners={bannerDate.banners} />
<ProductCollection/>
<Footer
	company={ generalConfigurationData.companyInformation }
/>
