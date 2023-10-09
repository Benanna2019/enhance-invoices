export default function CustomersPage({ html, state }) {
  let { customers, path } = state.store;

  let newCustomerMatches =
    path === "/sales/customers/new"
      ? "block border-b-4 border-gray-100 py-3 px-4 hover:bg-gray-50 bg-gray-100"
      : "block border-b-4 border-gray-100 py-3 px-4 hover:bg-gray-50 ";

  let customersList = customers
    .map((customer) => {
      let isActive =
        path === `/sales/customers/${customer.key}`
          ? `block border-b border-gray-50 py-3 px-4 hover:bg-gray-50 bg-gray-100`
          : `block border-b border-gray-50 py-3 px-4 hover:bg-gray-50`;

      return html`
        <a href="/sales/customers/${customer.key}" class="${isActive}">
          <div
            class="flex justify-between text-[length:14px] font-bold leading-6"
          >
            <div>${customer.name}</div>
          </div>
          <div
            class="flex justify-between text-[length:12px] font-medium leading-4 text-gray-400"
          >
            <div>${customer.email}</div>
          </div>
        </a>
      `;
    })
    .join("\n");

  return html`
    <div class="flex overflow-hidden rounded-lg border border-gray-100">
      <div class="w-1/2 border-r border-gray-100">
        <a href="/sales/customers/new" class="${newCustomerMatches}">
          <span class="flex gap-1">
            <fileplus-icon></fileplus-icon> <span>Create new customer</span>
          </span>
        </a>
        <div class="max-h-96 overflow-y-scroll">${customersList}</div>
      </div>
      <div class="flex w-1/2 flex-col justify-between">
        <slot name="customer-details" as="div"></slot>
        <small class="p-2 text-center">
          Note: this is arbitrarily slow to demonstrate pending UI.
        </small>
      </div>
    </div>
  `;
}
