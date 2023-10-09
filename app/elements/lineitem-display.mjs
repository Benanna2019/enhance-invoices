export default function LineItemDisplay({ html, state }) {
  const { currencyFormatter, invoiceDetails } = state.store;

  const lineItemClassName = `flex justify-between border-t border-gray-100 py-4 text-[14px] leading-[24px]`;

  const lineItems = invoiceDetails.lineItems
    .map((item) => {
      console.log("item", item);
      const { quantity, unitPrice } = item;

      const quantityDisplay =
        quantity === 1
          ? html`<div></div>`
          : html`<div class="text-[10px]">(${quantity}x)</div>`;

      return html`
        <div class="${lineItemClassName}">
          <div>${item.description}</div>

          <!-- if quantity equals one don't display else display -->

          ${quantityDisplay}

          <div>${currencyFormatter.format(unitPrice)}</div>
        </div>
      `;
    })
    .join("\n");

  return html` ${lineItems} `;
}
