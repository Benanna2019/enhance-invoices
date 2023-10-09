import {
  getInvoiceData,
  getAllInvoiceData,
} from "../../../models/invoices.mjs";
import { currencyFormatter } from "../../../models/helpers.mjs";
import { createId } from "@paralleldrive/cuid2";
import {
  parseDate,
  validateAmount,
  validateDepositDate,
} from "../../../lib/index.mjs";
import { createDeposit } from "../../../models/deposits.mjs";
import invariant from "tiny-invariant";

export const post = [upsertDeposit];

export async function get(req) {
  const invoiceId = req.pathParameters?.invoiceId;
  const invoiceInfo = await getInvoiceData(invoiceId);
  const invoices = await getAllInvoiceData();

  const invoiceDetails = {
    invoiceId: invoiceId,
    customerName: invoiceInfo.customer.name,
    customerId: invoiceInfo.customer.id,
    totalAmount: invoiceInfo.totalAmount,
    dueStatus: invoiceInfo.dueStatus,
    dueDisplay: invoiceInfo.dueStatusDisplay,
    invoiceDateDisplay: new Date(invoiceInfo.invoice_date).toLocaleDateString(),
    lineItems: invoiceInfo.lineItems.map((li) => ({
      id: li.key,
      description: li.description,
      quantity: li.quantity,
      unitPrice: li.unit_price,
    })),
    deposits: invoiceInfo.deposits.map((deposit) => ({
      id: deposit.key,
      amount: deposit.amount,
      depositDateFormatted: new Date(deposit.deposit_date).toLocaleDateString(),
    })),
  };

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
      invoiceDetails,
      invoices,
      currencyFormatter,
      dueSoonAmount,
      overdueAmount,
    },
  };
}

export async function upsertDeposit(req) {
  const formData = await req.body;

  const invoiceId = formData.invoiceId;
  if (typeof invoiceId !== "string") {
    throw new Error("This should be impossible.");
  }
  const intent = formData.intent;
  invariant(typeof intent === "string", "intent required");
  switch (intent) {
    case "create-deposit": {
      const amount = Number(formData.amount);
      const depositDateString = formData.depositDate;
      const note = formData.note;
      invariant(!Number.isNaN(amount), "amount must be a number");
      invariant(typeof depositDateString === "string", "dueDate is required");
      invariant(typeof note === "string", "dueDate is required");
      const deposit_date = parseDate(depositDateString);

      const errors = {
        amount: validateAmount(amount),
        depositDate: validateDepositDate(deposit_date),
      };
      const hasErrors = Object.values(errors).some(
        (errorMessage) => errorMessage
      );
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
        invoice_id: invoiceId,
        amount,
        deposit_date: deposit_date.getTime(),
        note,
      };

      await createDeposit(data);
      return {
        location: `/sales/invoices/${invoiceId}`,
      };
    }
    default: {
      return {
        json: {
          error: `Unsupported intent: ${intent}`,
        },
      };
    }
  }
}
