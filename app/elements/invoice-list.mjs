export default function InvoiceList({ html, state }) {
  let { invoices, path, currencyFormatter } = state.store;

  const invoiceItems = invoices
    .map((invoice) => {
      const { key = "" } = invoice;

      let isActive =
        path === `/sales/invoices/${key}`
          ? `block border-b border-gray-50 py-3 px-4 hover:bg-gray-50 bg-gray-200`
          : `block border-b border-gray-50 py-3 px-4 hover:bg-gray-50`;

      let dueStatusStyles =
        invoice.dueStatus === "paid"
          ? "text-green-brand uppercase"
          : invoice.dueStatus === "overdue"
          ? "text-red-brand uppercase"
          : "uppercase";

      return html`
        <a href="/sales/invoices/${key}" class="${isActive}">
          <div
            class="flex justify-between text-[length:14px] font-bold leading-6"
          >
            <div>${invoice.customer.name}</div>
            <div>${currencyFormatter.format(invoice.totalAmount)}</div>
          </div>
          <div
            class="flex justify-between text-[length:12px] font-medium leading-4 text-gray-400"
          >
            <div>${invoice.number}</div>
            <div class="${dueStatusStyles}">${invoice.dueStatusDisplay}</div>
          </div>
        </a>
      `;
    })
    .join("\n");

  return html`
    <div class="flex overflow-hidden rounded-lg border border-gray-100">
      <div class="w-1/2 border-r border-gray-100">
        <div
          class="block border-b-4 border-gray-100 py-3 px-4 hover:bg-gray-50"
        >
          <a href="/sales/invoices/new">
            <span class="flex gap-1">
              <span>Create new invoice</span>
            </span>
          </a>
        </div>
        <div class="max-h-96 overflow-y-scroll">${invoiceItems}</div>
      </div>
      <div class="w-1/2">
        <slot name="details" as="div"></slot>
      </div>
    </div>
  `;
}
