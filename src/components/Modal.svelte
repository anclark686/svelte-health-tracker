<script>
	export let showModal;
  export let buttonConfig // {primaryText, secondaryText, onPrimaryClick, onSecondaryClick}

  let {primaryText, secondaryText, onPrimaryClick, onSecondaryClick} = buttonConfig

  if (onPrimaryClick === "close") {
    onPrimaryClick = () => {
			console.log(showModal) 
			showModal = false; 
			console.log(showModal) 
			dialog.close()
		}
  }

  if (onSecondaryClick === "close") {
    onSecondaryClick = () => { 
			console.log(showModal) 
			showModal = false; 
			console.log(showModal) 
			dialog.close()
		}
  }
	let dialog;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
		
    <div class="btn-container">
      {#if secondaryText}
      <button class="small-btn" on:click|preventDefault={onSecondaryClick}>{secondaryText}</button>
      {/if}
      {#if onPrimaryClick === "submit"}
			<input type="submit" value={primaryText} class="small-btn" />
			{:else}
      <button class="small-btn" on:click|preventDefault={onPrimaryClick}>{primaryText}</button>
			{/if}
    </div>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 10px;
		border: none;
		padding: 0;
    box-shadow: 0 0 10px var(--box-shadow);
    background-color: var(--section-background);
		width: 50%;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
