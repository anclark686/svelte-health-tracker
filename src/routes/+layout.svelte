<script>
import {
  onMount
} from "svelte";
import Navbar from "../components/Navbar.svelte";
import LoadingSpinner from "../components/LoadingSpinner.svelte";
import PageHeader from "../components/PageHeader.svelte";

export let data

console.log(data)

let loading = true
let darkmode = data.darkmode
let cookies

const setDarkModeCookie = (darkOrLight) => {
  cookies = document.cookie.split(';')
  cookies = cookies.filter((cookie) => {
    !cookie.includes("darkmode")
  })
  cookies.push(`darkmode=${darkOrLight}`)

  document.cookie = cookies.join('; ')
}

onMount(() => {
  if (!data.darkmodeInCookie) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      darkmode = true
      setDarkModeCookie("dark")
    } else {
      darkmode = false
      setDarkModeCookie("light")
    }
  }

  loading = false
})
</script>

<div class={darkmode ? "main app-dark" : "main app-light"} id="app">
    <Navbar />

    {#if !loading}
    <div class="content">
        <slot />
    </div>
    {:else}
    <div class="content">
        <PageHeader title="Great things to come!" dashboard={false} other={{}}/>
        <LoadingSpinner pageOrSection="page" />
    </div>
    {/if}

</div>

<style>
:global(:root) {
  --pretty-much-white: #ebf2f3;
  --light-sky-blue: #dcf9fa;
  --sky-blue: #5ce1e6;
  --med-sky-blue: #0097b2;
  --dark-sky-blue: #16536e;
  --darkest-of-blues: #0a242f;
  --error-dark-red: #b60833;
  --error-pink: #ffb6c1;
}

:global(.app-light) {
  --nav-color: var(--med-sky-blue);
  --nav-link: var(--light-sky-blue);
  --background-color: var(--pretty-much-white);
  --text-color: var(--darkest-of-blues);
  --section-background: var(--light-sky-blue);
  --box-shadow: gray;
  --btn-color: var(--sky-blue);
  --gradient: linear-gradient(to right, var(--med-sky-blue), var(--sky-blue), var(--med-sky-blue));
  --error-color: var(--error-dark-red);
  --error-text: var(--pretty-much-white);
  --header-color: var(--sky-blue);
  --border-color: var(--sky-blue);
  --content-link: var(--dark-sky-blue);
  --table-header: var(--sky-blue);
  --table-every-other: var(--background-color);
  --date-switcher-background: var(--sky-blue);
  --checkbox-color: var(--sky-blue);
}

:global(.app-dark) {
  --nav-color: var(--dark-sky-blue);
  --nav-link: var(--sky-blue);
  --background-color: var(--darkest-of-blues);
  --text-color: var(--pretty-much-white);
  --section-background: var(--dark-sky-blue);
  --box-shadow: black;
  --btn-color: var(--med-sky-blue);
  --gradient: linear-gradient(to right, var(--dark-sky-blue), var(--med-sky-blue), var(--dark-sky-blue));
  --error-color: var(--error-pink);
  --error-text: var(--darkest-of-blues);
  --header-color: var(--med-sky-blue);
  --border-color: var(--med-sky-blue);
  --content-link: var(--sky-blue);
  --table-header: var(--med-sky-blue);
  --table-every-other: var(--background-color);
  --date-switcher-background: var(--med-sky-blue);
  --checkbox-color: var(--med-sky-blue);
}

:global(html),
:global(body) {
  height: 100%;
}

:global(body) {
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-family: 'Josefin Sans', sans-serif;
  color: var(--text-color);
}

.main {
  display: flex;
  flex-direction: column;
  height: 100%;
}

:global(body::-webkit-scrollbar) {
  width: 1rem;
}

:global(body::-webkit-scrollbar-track) {
  background: var(--darkest-of-blues);
}

:global(body::-webkit-scrollbar-thumb) {
  background: var(--med-sky-blue)
}

:global(h2) {
  color: var(--text-color);
}

:global(input[type="checkbox"]) {
  accent-color: var(--checkbox-color);
}


.content {
  margin-left: 5rem;
  background-color: var(--background-color);
  color: var(--text-color);
  flex-grow: 1;
}

:global(.page-image) {
  width: 20rem;
  margin: 2rem auto 1rem auto;
}

:global(.sub-image) {
  width: 10rem;
  margin: .5rem auto;
}

:global(.dashboard-btn-container) {
  text-align: center;
}

:global(.header-btn) {
  background-color: var(--btn-color);
  color: var(--text-color);
  border: none;
  border-radius: 5px;
  padding: .5rem .75rem;
  margin: .5rem 1rem;
  width: fit-content;
  box-shadow: 0 0 10px var(--box-shadow);
  font-size: 1.2rem;
}

:global(.content-box) {
  background-color: var(--section-background);
  border-radius: 10px;
  box-shadow: 0 0 10px var(--box-shadow);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem auto;
  width: 60%;
}

:global(.content-header) {
  text-align: center;
  background: var(--gradient);
  margin: 0;
  padding: 1.5rem;
  border-radius: 10px 10px 0 0;
  color: var(--text-color);
}

:global(.btn-container) {
  text-align: center;
}

:global(.content-nav-btn),
:global(.btn) {
  background-color: var(--btn-color);
  color: var(--text-color);
  border: none;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;
  cursor: pointer;
  font-size: 1.5rem;
  font-family: 'Josefin Sans', sans-serif;
  box-shadow: 0 0 10px var(--box-shadow);
  width: 200px;
}

:global(.small-btn) {
  background-color: var(--btn-color);
  color: var(--text-color);
  border: none;
  border-radius: 5px;
  padding: .5rem;
  margin: 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Josefin Sans', sans-serif;
  box-shadow: 0 0 10px var(--box-shadow);
  width: 125px;
}

:global(.content-link) {
  color: var(--content-link);
}

:global(.form-content) {
  display: flex;
  flex-direction: column;
  margin: 2rem;
  text-align: center;
}

:global(.form-label) {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-top: .5rem;
}

:global(.form-input) {
  font-size: 1.2rem;
  margin: .5rem auto;
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 5px var(--box-shadow);
  width: 50%;
}

:global(.input-error) {
  border: 2px solid var(--error-color);
}

:global(.error-message) {
  color: var(--error-color);
  margin-top: 0;
}

:global(.medium-image) {
  width: 5rem;
}

@media (max-width: 800px) {
  :global(.content-box) {
    width: 80%;
  }
}

@media (max-width: 600px) {
  .content {
    margin-left: 0;
    margin-top: 5rem;
  }

  :global(.page-image) {
    width: 10rem;
    margin-top: 6rem;
  }

  :global(.content-box) {
    width: 90%;
  }

  :global(.header-btn) {
    margin: .5rem;
    font-size: 1rem;
    padding: .25rem;
    white-space: nowrap;
  }

  :global(.form-content) {
    margin: 1rem;
  }

  :global(.form-input) {
    width: 80%;
  }
}
</style>
