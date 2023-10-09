export default function NewInvoice({ html, state }) {
  let { customers } = state.store;

  const inputClasses = `text-lg w-full rounded border border-gray-500 px-2 py-1`;

  const submitButtonClasses = `w-full rounded bg-green-500 py-2 px-4 text-white hover:bg-green-600 focus:bg-green-400`;

  let customerSelect = customers
    .map((customer) => {
      return html`<option value=${customer.key}>${customer.name}</option>`;
    })
    .join("\n");

  return html`
    <div class="relative p-10">
      <h2 class="font-display mb-4">New Invoice</h2>
      <form action="/sales/invoices" method="POST" class="flex flex-col gap-4">
        <div class="relative">
          <div class="flex flex-wrap items-center gap-1">
            <label-text>
              <label slot="label-text-children" for="customers"
                >Customer</label
              ></label-text
            >

            <select name="customerId" id="customerId">
              ${customerSelect}
            </select>
          </div>
        </div>
        <div>
          <div class="flex flex-wrap items-center gap-1">
            <label-text
              ><label slot="label-text-children" for="dueDate"
                >Due Date</label
              ></label-text
            >
          </div>
          <input
            id="dueDate"
            name="dueDateString"
            class="${inputClasses}"
            type="date"
            required
          />
          <input hidden readonly name="intent" value="create" />
        </div>
        <line-items></line-items>
        <div>
          <button type="submit" class="${submitButtonClasses}">
            Create Invoice
          </button>
        </div>
      </form>
    </div>
  `;
}
