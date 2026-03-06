<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import AnnouncementBar from "$lib/Components/AnnouncementBar/AnnouncementBar.svelte";
	import AnnouncementData from "$cms/announcement-bar.json"
	import BrandBar from '$lib/Components/BrandBar/BrandBar.svelte';
	import GeneralConfigurationData from '$cms/general-configuration.json'
	import Footer from '$lib/Section/Footer/Footer.svelte';
	let { children } = $props();
	//
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<AnnouncementBar messages = { AnnouncementData.announcementBar } />
<BrandBar images = {{
    name: GeneralConfigurationData.companyInformation.companyBrand.brand,
    alt: `Logo marca da empresa ${GeneralConfigurationData.companyInformation.companyName}`
  }}/>
{@render children()}

<Footer company= {GeneralConfigurationData.companyInformation}/>