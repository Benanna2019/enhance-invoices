// import data from "@begin/data";
import { addInvoice, getAllInvoiceData } from "../../models/invoices.mjs";
import { createId } from "@paralleldrive/cuid2";
import invariant from "tiny-invariant";
import {
  parseDate,
  validateCustomerId,
  validateDueDate,
} from "../../lib/index.mjs";

export const post = [upsertPost];

export async function get(req) {
  const invoices = await getAllInvoiceData();

  const dueSoonAmount = invoices.reduce((sum, li) => {
    if (li.dueStatus !== "due") {
      return sum;
    }
    const remainingBalance = Number(li.totalAmount) - li.totalDeposits;
    return sum + remainingBalance;
  }, 0);
  const overdueAmount = invoices.reduce((sum, li) => {
    if (li.dueStatus !== "overdue") {
      return sum;
    }
    const remainingBalance = Number(li.totalAmount) - li.totalDeposits;
    return sum + remainingBalance;
  }, 0);

  return {
    json: {
      path: req.path,
      invoices,
      dueSoonAmount,
      overdueAmount,
    },
  };
}

export async function upsertPost(req) {
  const formData = req.body;
  const session = req.session;

  const intent = formData.intent;
  switch (intent) {
  case "create": {
    const customerId = formData.customerId;
    const dueDateString = formData.dueDateString;
    invariant(typeof customerId === "string", "customerId is required");
    invariant(typeof dueDateString === "string", "dueDate is required");
    const dueDate = parseDate(dueDateString);
    // console.log("due date", getTime(dueDate));

    // make the below plural when I support for multiple line items
    const lineItemId = formData.lineItemId;
    const lineItemQuantity = Number(formData.quantity);
    const lineItemUnitPrice = Number(formData.unitPrice);
    const lineItemDescription = formData.description;

    invariant(typeof lineItemQuantity === "number", "quantity is required");
    invariant(typeof lineItemUnitPrice === "number", "unitPrice is required");
    invariant(
      typeof lineItemDescription === "string",
      "description is required"
    );
    const lineItems = [];
    lineItems.push({
      quantity: lineItemQuantity,
      unit_price: lineItemUnitPrice,
      description: lineItemDescription,
    });
    // for (let i = 0; i < lineItemQuantities.length; i++) {
    //   // @ts-ignore
    //   const quantity = +lineItemQuantities[i];
    //   // @ts-ignore
    //   const unitPrice = +lineItemUnitPrices[i];
    //   const description = lineItemDescriptions[i];
    //   invariant(typeof quantity === "number", "quantity is required");
    //   invariant(typeof unitPrice === "number", "unitPrice is required");
    //   invariant(typeof description === "string", "description is required");

    //   lineItems.push({ quantity, unitPrice, description });

    const errors = {
      customerId: validateCustomerId(customerId),
      dueDate: validateDueDate(dueDate),
      // lineItems: lineItems.reduce((acc, lineItem, index) => {
      //   const id = lineItemIds[index];
      //   invariant(typeof id === "string", "lineItem ids are required");
      //   acc[id] = {
      //     quantity: validateLineItemQuantity(lineItem.quantity),
      //     unitPrice: validateLineItemUnitPrice(lineItem.unitPrice),
      //   };
      //   return acc;
      // }, {}),
    };

    const customerIdHasError = errors.customerId !== null;
    const dueDateHasError = errors.dueDate !== null;
    // const lineItemsHaveErrors = Object.values(errors.lineItems).some(
    //   (lineItem) => Object.values(lineItem).some(Boolean)
    // );
    const hasErrors = dueDateHasError || customerIdHasError;
    if (hasErrors) {
      return {
        json: {
          errors,
        },
      };
    }

    const data = {
      key: createId(),
      created_at: new Date().toISOString(),
      due_date: dueDate.getTime(),
      invoice_date: new Date().getTime(),
      customer_id: customerId,
      lineItems,
    };

    const { createdInvoice, createdLineItems } = await addInvoice(data);

    return {
      location: `/sales/invoices/${createdInvoice.key}`,
    };
  }
  }
}
