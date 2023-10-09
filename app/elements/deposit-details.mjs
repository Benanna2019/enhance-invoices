export default function DepositDetails({ html, state }) {
  const { invoiceDetails, currencyFormatter } = state.store;
  const { invoiceid } = state.attrs;

  const inputClasses = `text-lg w-full rounded border border-gray-500 px-2 py-1`;

  const submitButtonClasses = `w-full rounded bg-green-500 py-2 px-4 text-white hover:bg-green-600 focus:bg-green-400`;

  const lineItemClassName = `flex justify-between border-t border-gray-100 py-4 text-[14px] leading-[24px]`;

  const depositItems = invoiceDetails.deposits
    .map((deposit) => {
      return html`
        <div class="${lineItemClassName}">
          <a
            href="/sales/deposits/${deposit.id}"
            class="text-blue-600 underline"
          >
            ${deposit.depositDateFormatted}
          </a>
          <div>${currencyFormatter.format(deposit.amount)}</div>
        </div>
      `;
    })
    .join("\n");

  return html`
    <div>
      <div class="font-bold leading-8">Deposits</div>

      ${depositItems}

      <form
        method="POST"
        action="/sales/invoices/${invoiceid}"
        class="grid grid-cols-1 gap-x-4 gap-y-2 lg:grid-cols-2"
        novalidate
      >
        <div class="min-w-[100px]">
          <div class="flex flex-wrap items-center gap-1">
            <label-text>
              <label slot="label-text-children" for="depositAmount"
                >Amount</label
              >
            </label-text>
          </div>
          <input
            id="depositAmount"
            name="amount"
            type="number"
            class="${inputClasses}"
            min="0.01"
            step="any"
            required
          />
        </div>
        <div>
          <div class="flex flex-wrap items-center gap-1">
            <label-text>
              <label slot="label-text-children" for="depositDate">Date</label>
            </label-text>
          </div>
          <input
            id="depositDate"
            name="depositDate"
            type="date"
            class="${inputClasses} h-[34px]"
            required
          />
        </div>
        <div class="grid grid-cols-1 gap-4 lg:col-span-2 lg:flex">
          <div class="flex-1">
            <label-text>
              <label slot="label-text-children" for="depositNote">Note</label>
            </label-text>
            <input
              id="depositNote"
              name="note"
              type="text"
              class="${inputClasses}"
            />
          </div>
          <div class="flex items-end">
            <input hidden readonly name="intent" value="create-deposit" />
            <input hidden readonly name="invoiceId" value="${invoiceid}" />
            <button type="submit" class="${submitButtonClasses}">Create</button>
          </div>
        </div>
      </form>
    </div>
  `;
}
