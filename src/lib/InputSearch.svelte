<script>
import SearchIcon from '../assets/search.svg'

let inputProps = {
	...$$restProps,
}
export let value
export let placeholder = 'Search'
export let width = 'fit-content'
export let variant = 'search-primary'
export let showIcon = false
</script>

<div class="{`input-paper ${variant}`}" style="{`width:${width}`}">
	{#if showIcon}
		<img src="{SearchIcon}" alt="Search" aria-hidden="true" />
	{/if}
	<input
		class="{`solo-input`}"
		bind:value="{value}"
		on:input
		{...inputProps}
		placeholder="{placeholder}" />
</div>

<style >
.search-primary {
	background: var(--background-linear);
	border-radius: 28px;
	height: 56px;
	padding: 16px 56px;
	flex-grow: 0.5;
}
.search-default {
	border: 1px solid #54a40b;
	background: #ffffff !important;
	border-radius: 4px;
	padding: 3px;
}
.input-paper {
	display: flex;
	align-items: center;
}
:global(.input-paper > *) {
	background-color: unset;
	display: inline-block;
	margin: 0 8px;
}
:global(.solo-input) {
	flex-grow: 1;
	color: var(--mdc-theme-on-surface, #000);
	margin: 0 6px 0 0;
	border: 0;
	outline: 0;
	height: 24px;
}
:global(.solo-input::placeholder) {
	color: #001f2466;
	font-style: italic;
	opacity: 0.6;
}
:global(.solo-fab) {
	flex-shrink: 0;
}
</style>
