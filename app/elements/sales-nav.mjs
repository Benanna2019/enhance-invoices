export default function SalesNav({ html, state }) {
  let { path } = state.store;

  let indexMatches = path === "/sales";
  let invoiceMatches = path.includes("/sales/invoices");
  let customerMatches = path.includes("/sales/customers");

  return html`
    <div class="relative w-full h-full p-10">
      <h1 class="font-display text-d-h3 text-black">Sales</h1>
      <div class="h-6"></div>
      <div
        class="flex gap-4  border-b border-gray-100 pb-4 text-[length:14px] font-medium text-gray-400"
      >
        <a href="/sales" class="${indexMatches ? `font-bold text-black` : ``}">
          Overview
        </a>
        <a href="/sales/subscriptions"> Subscriptions </a>

        <a
          href="/sales/invoices"
          class="${invoiceMatches ? `font-bold text-black` : ``}"
        >
          Invoices
        </a>

        <a
          href="/sales/customers"
          class="${customerMatches ? `font-bold text-black` : ``}"
        >
          Customers
        </a>
        <a href="/sales/deposits"> Deposits </a>
      </div>
      <div class="h-4"></div>
      <slot name="sales-content" as="div"></slot>
    </div>
  `;
}
