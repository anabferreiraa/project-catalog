<script>
	import bannerDate from '$cms/banners.json';
	import BannerCarousel from '$lib/Section/Banner/BannerCarousel.svelte';
	import Footer from '$lib/Section/Footer/Footer.svelte';
	import generalConfigurationData from '$cms/general-configuration.json';
</script>

<BannerCarousel banners={bannerDate.banners} />

<Footer
	company={ generalConfigurationData.companyInformation }
/>
