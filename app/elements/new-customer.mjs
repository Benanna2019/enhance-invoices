export default function NewCustomer({ html }) {
  const inputClasses =
    "text-lg w-full rounded border border-gray-500 px-2 py-1";

  const submitButtonClasses = `w-full rounded bg-green-500 py-2 px-4 text-white hover:bg-green-600 focus:bg-green-400`;

  return html`
    <div class="relative p-10">
      <h2 class="font-display mb-4">New Customer</h2>
      <form method="POST" action="/sales/customers" class="flex flex-col gap-4">
        <div>
          <label-text>
            <label slot="label-text-children" for="name">name</label>
          </label-text>
          <input id="name" name="name" class="${inputClasses}" type="text" />
        </div>
        <div>
          <label-text
            ><label slot="label-text-children" for="email"
              >Email</label
            ></label-text
          >
          <input id="email" name="email" class="${inputClasses}" type="email" />
        </div>
        <input hidden readonly name="intent" value="create" />
        <div>
          <button type="submit" class="${submitButtonClasses}">
            Create Customer
          </button>
        </div>
      </form>
    </div>
  `;
}
