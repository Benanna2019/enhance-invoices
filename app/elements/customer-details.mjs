export default function CustomerDetailsPage({ html, state }) {
  let { customerDetails, customerInfo, currencyFormatter } = state.store;

  const lineItemClassName = `flex justify-between border-t border-gray-100 py-4 text-[14px] leading-[24px]`;

  const customerDetailsList = customerDetails.invoiceDetails
    .map((detail) => {
      return html`
        <tr class="${lineItemClassName}">
          <td>
            <a
              class="text-blue-600 underline"
              href="/sales/invoices/${detail.id}"
            >
              ${detail.number}
            </a>
          </td>
          <td
            class=${"text-center uppercase" +
            " " +
            (detail.dueStatus === "paid"
              ? "text-green-brand"
              : detail.dueStatus === "overdue"
              ? "text-red-brand"
              : "")}
          >
            ${detail.dueStatusDisplay}
          </td>
          <td class="text-right">
            ${currencyFormatter.format(detail.totalAmount)}
          </td>
        </tr>
      `;
    })
    .join("\n");

  return html`
    <div class="relative p-10">
      <div class="text-[length:14px] font-bold leading-6">
        ${customerInfo.email}
      </div>
      <div class="text-[length:32px] font-bold leading-[40px]">
        ${customerInfo.name}
      </div>
      <div class="h-4"></div>
      <div class="text-m-h3 font-bold leading-8">Invoices</div>
      <div class="h-4"></div>
      <!-- Handle deferred data loading here -->
      <table class="w-full">
        <tbody>
          ${customerDetailsList}
        </tbody>
      </table>
    </div>
  `;
}
