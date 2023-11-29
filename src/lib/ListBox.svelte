<script>
    import { createEventDispatcher, onMount } from 'svelte'

    import CheckIcon from '../assets/CheckIcon.svelte'
    import InputSearch from './InputSearch.svelte'

    import { clickOutside } from '../utils/clickOutside.jsx'
    import { debounce, searchInObjectValues } from '../utils/common.js'

    export let items = []

    export let toggle = false
    export let value = ''
    export let isSearch = true
    export let defaultSelectedIndex = 0

    let filterData = items

    let selected = items[defaultSelectedIndex]
    let dropdownVisible = false
    let focusedIndex = 0
    let dispatch = createEventDispatcher()

    onMount(() => {
        const handleKeydown = (event) => {
            console.log(event)
            if (dropdownVisible) {
                if (event.key === 'ArrowDown') {
                    event.preventDefault()
                    focusedIndex = (focusedIndex + 1) % items.length
                } else if (event.key === 'ArrowUp') {
                    event.preventDefault()
                    focusedIndex = (focusedIndex - 1 + items.length) % items.length
                } else if (event.key === 'Tab') {
                    event.preventDefault()
                } else if (event.key === 'Enter') {
                    event.preventDefault()
                    selectItem(items[focusedIndex])
                }
            }
        }

        window.addEventListener('keydown', handleKeydown)
        return () => {
            window.removeEventListener('keydown', handleKeydown)
        }
    })

    const handleClickOutside = () => {
        dropdownVisible = false
    }

    function toggleDropdown() {
        dropdownVisible = !dropdownVisible
    }

    function selectItem(item) {
        selected = item
        dropdownVisible = false
        value = item
        dispatch('select', item)
    }
    function search(items, text) {
        filterData = searchInObjectValues(items, text)
    }

    $: {
        filterData = items
    }
    $: console.log(items)
    function handleFilter(e) {
        debounce(() => search(items, e.target.value), 200)
    }
</script>

<div
        class="{$$restProps.class + ' dropdown'}"
        use:clickOutside
        on:click_outside="{handleClickOutside}">
    <button
            tabindex="0"
            on:click="{toggleDropdown}"
            aria-haspopup="true"
            aria-label="Actions"
            aria-expanded="true"
            aria-controls="listbox:{items.length + 1}">
        <slot name="trigger" selected="{selected}" />
        {#if toggle}<span class="material-icons">expand_more</span>{/if}</button>

    {#if dropdownVisible}
        <ul
                id="listbox:{items.length + 1}"
                role="listbox"
                tabindex="0"
                aria-multiselectable="false"
                aria-activedescendant="listbox:{items.indexOf(selected) + 1}">
            {#if isSearch}
                <li id="listbox:{0}" class="search" on:click="{(e) => e.stopPropagation()}">
                    <InputSearch
                            on:input="{handleFilter}"
                            width="100%"
                            autofocus
                            variant="search-default"
                            showIcon
                            placeholder="Search" />
                </li>
            {/if}
            {#each filterData as item, i (item)}
                <li
                        id="listbox:{i + 1}"
                        tabindex="-1"
                        aria-selected="{selected === item}"
                        role="option"
                        on:mouseenter="{() => (focusedIndex = i)}"
                        on:click="{() => selectItem(item)}"
                        class:focused="{i === focusedIndex}">
                    {#if selected === item}
						<span class="check">
							<CheckIcon />
						</span>
                    {/if}
                    <slot name="item" item="{item}" />
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    .dropdown {
        position: relative;
    }
    .dropdown ul {
        position: absolute;
        width: 100%;
        min-width: max-content;
        list-style: none;
        margin: 0;
        padding: 0;
        background: white;
        border: 1px solid var(--primary-color80);
        border-radius: 4px;
        box-shadow: var(--shadow);
        z-index: 99999;
        font-size: var(--f12);
        line-height: 1.5;
        user-select: none;
        height: auto;
        max-height: 400px;
        overflow: auto;
    }
    .search {
        position: sticky;
        top: 0;
        z-index: 1;
        background-color: #ffffff;
        padding: 10px;
    }
    .dropdown ul li:not(.search) {
        padding: 10px 10px 10px 40px;
        position: relative;
    }

    .dropdown ul li:not(:last-child, .search) {
        border-bottom: 1px solid #c4c4c4;
    }
    .dropdown ul li.focused {
        background: var(--primary-bg);
        cursor: default;
    }

    .check {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        padding-left: 0.75rem; /* You can adjust this as needed */
        color: #ffaa00;
    }

    button {
        background-color: unset;
        padding: 6px 16px;
        border: 1px solid var(--primary-color80);
        border-radius: 4px;
        width: 100%;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 1.5;
    }
    .material-icons {
        padding-left: 10px;
        color: var(--primary-color);
    }
</style>
