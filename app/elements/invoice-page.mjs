export default function InvoicePage({ html, state }) {
  const { overdueAmount, dueSoonAmount } = state.store;

  const hundo = dueSoonAmount + overdueAmount;
  const dueSoonPercent = Math.floor((dueSoonAmount / hundo) * 100);

  return html`
    <div class="relative">
      <div class="flex items-center justify-between gap-4">
        <invoices-info
          label="Overdue"
          amount="${String(overdueAmount)}"
        ></invoices-info>
        <div class="flex h-4 flex-1 overflow-hidden rounded-full">
          <div class="bg-yellow-brand flex-1"></div>
          <div class="bg-green-brand" style="width: ${dueSoonPercent}%"></div>
        </div>
        <invoices-info
          label="Due Soon"
          amount="${dueSoonAmount}"
          right
        ></invoices-info>
      </div>
      <div class="h-4"></div>
      <label-text label="Invoice List"></label-text>
      <div class="h-2"></div>
      <invoice-list>
        <div slot="details">
          <slot name="invoice-details" as="div" class="w-full"></slot>
        </div>
      </invoice-list>
    </div>
  `;
}
