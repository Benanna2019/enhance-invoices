import { currencyFormatter } from "../models/helpers.mjs";

export default function InvoiceDetails({ html, state }) {
  const { invoiceDetails } = state.store;

  const lineItemClassName =
    "flex justify-between border-t border-gray-100 py-4 text-[14px] leading-[24px]";
  return html`
    <div class="relative p-10">
      <a
        href="../../customers/${invoiceDetails.customer_id}"
        class="text-[length:14px] font-bold leading-6 text-blue-600 underline"
      >
        ${invoiceDetails.customerName}
      </a>
      <div class="text-[length:32px] font-bold leading-[40px]">
        ${currencyFormatter.format(invoiceDetails.totalAmount)}
      </div>
      <label-text>
        <span
          slot="label-text-children"
          class=${invoiceDetails.dueStatus === "paid"
    ? "text-green-brand"
    : invoiceDetails.dueStatus === "overdue"
      ? "text-red-brand"
      : ""}
        >
          ${invoiceDetails.dueDisplay}
        </span>
        • Invoiced ${invoiceDetails.invoiceDateDisplay}
      </label-text>
      <div class="h-4"></div>

      <lineitem-display></lineitem-display>

      <div class="${lineItemClassName} font-bold">
        <div>Net Total</div>
        <div>${currencyFormatter.format(invoiceDetails.totalAmount)}</div>
      </div>
      <div class="h-8"></div>
      <deposit-details
        invoiceId="${invoiceDetails.invoiceId}"
      ></deposit-details>
    </div>
  `;
}
