export default function LineItems({ html, state }) {
  const generateRandomId = () => Math.random().toString(32).slice(2);

  const firstId = generateRandomId();

  let lineItems = [firstId];

  const addField = () => {
    lineItems = [...lineItems, generateRandomId()];
  };

  const removeField = () => {
    lineItems = lineItems.slice(0, lineItems.length - 1);
  };

  const inputClasses = `text-lg w-full rounded border border-gray-500 px-2 py-1`;

  const lineItemFormFields = lineItems
    .map((lineItemClientId, index) => {
      return html`
        <fieldset class="border-b-2 py-2">
          <div class="flex gap-2">
            <button
              type="button"
              title="Remove Line Item"
              onclick="${removeField()}"
            >
              <minus-icon></minus-icon>
            </button>
            <legend>Line Item ${index + 1}</legend>
          </div>
          <input value=${lineItemClientId} name="lineItemId" type="hidden" />
          <div class="flex flex-col gap-1">
            <div class="flex w-full gap-2">
              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-1">
                  <label-text>
                    <label
                      slot="label-text-children"
                      for="quantity-${lineItemClientId}"
                    >
                      Quantity:
                    </label>
                  </label-text>
                </div>
                <input
                  id="quantity-${lineItemClientId}"
                  name="quantity"
                  type="number"
                  class="${inputClasses}"
                />
              </div>
              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-1">
                  <label-text>
                    <label
                      slot="label-text-children"
                      for="unitPrice-${lineItemClientId}"
                    >
                      Unit Price:
                    </label>
                  </label-text>
                </div>
                <input
                  id="unitPrice-${lineItemClientId}"
                  name="unitPrice"
                  type="number"
                  min="1"
                  step="any"
                  class="${inputClasses}"
                />
              </div>
            </div>
            <div>
              <label-text
                class="text-[12px] font-medium uppercase leading-[24px] text-gray-400"
              >
                <label
                  slot="label-text-children"
                  for="description-${lineItemClientId}"
                >
                  Description:
                </label>
              </label-text>
              <input
                id="description-${lineItemClientId}"
                name="description"
                class="${inputClasses}"
              />
            </div>
          </div>
        </fieldset>
      `;
    })
    .join("\n");
  // need to find some way to dynamically render the above so that it picks up on labels. Might just need to hard code them.

  return html`
    <div class="flex flex-col gap-2">
      ${lineItemFormFields}

      <div class="mt-3 text-right">
        <button id="add-line-item" title="Add Line Item" type="button">
          <plus-icon></plus-icon>
        </button>
      </div>
    </div>
  `;
}
