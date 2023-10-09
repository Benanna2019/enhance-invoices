import data from "@begin/data";
import { validator } from "@begin/validator";
import { buildInvoices, buildInvoice } from "./helpers.mjs";
import { createId } from "@paralleldrive/cuid2";

export const getAllInvoiceData = async () => {
  const invoices = await data.get({ table: "invoices" });
  const customers = await data.get({ table: "customers" });
  const lineItems = await data.get({ table: "lineItems" });
  const deposits = await data.get({ table: "deposits" });

  const builtInvoices = buildInvoices({
    invoices,
    customers,
    lineItems,
    deposits,
  });

  return builtInvoices;
};

export const getInvoiceData = async (invoiceId) => {
  let key = invoiceId;
  const invoice = await data.get({ table: "invoices", key });
  const customers = await data.get({ table: "customers" });
  const lineItems = await data.get({ table: "lineItems" });
  const deposits = await data.get({ table: "deposits" });

  const builtInvoice = buildInvoice({
    invoice,
    customers,
    lineItems,
    deposits,
  });

  return builtInvoice;
};

export const addInvoice = async (invoice) => {
  const { lineItems, ...newInvoice } = invoice;
  const createdInvoice = await data.set({ table: "invoices", ...newInvoice });

  const createdLineItems = await Promise.all(
    lineItems.map((lineItem) => {
      let newLineItem = {
        key: createId(),
        created_at: new Date().toISOString(),
        invoice_id: createdInvoice.key,
        ...lineItem,
      };

      return data.set({ table: "lineItems", ...newLineItem });
    })
  );

  return { createdInvoice, createdLineItems };
};
