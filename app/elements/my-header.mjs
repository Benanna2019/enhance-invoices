export default function MyHeader({ html, state }) {
  let { path } = state.store;

  let salesMatches = path.includes("/sales");

  let activePath = salesMatches
    ? `my-1 py-1 px-2 pr-16 text-[length:14px] bg-gray-200 rounded-md`
    : `my-1 py-1 px-2 pr-16 text-[length:14px]`;

  return html`
    <div class="relative flex h-screen rounded-lg bg-white text-gray-600">
      <div class="border-r border-gray-100 bg-gray-50">
        <div class="p-4">
          <div class="flex flex-wrap items-center gap-1">
            <a href="." class="my-1 py-1 px-2 pr-16 text-[length:14px]">
              <slot name="logo"></slot>
            </a>
          </div>
          <div class="h-7"></div>
          <div class="flex flex-col font-bold text-gray-800">
            <a href="/" class="my-1 py-1 px-2 pr-16 text-[length:14px]">
              Dashboard
            </a>
            <a href="/sales" class="${activePath}"> Sales </a>
          </div>
        </div>
      </div>
      <slot class="flex-1" name="sales-nav" as="div"></slot>
    </div>
  `;
}

// add this for sign in

// //     {#if $page.data.session}
// 	<button on:click={() => signOut()}>Sign Out</button>
// {:else}
// 	<button on:click={() => signIn('github')}>Sign in</button>
// {/if}
