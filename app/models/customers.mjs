import data from "@begin/data";
import { buildCustomerData } from "./helpers.mjs";

export const getAllCustomers = async () => {
  const customers = await data.get({ table: "customers" });
  return customers;
};

export const getCustomerInfo = async (customerId) => {
  const customer = await data.get({ table: "customers", key: customerId });
  const invoices = await data.get({ table: "invoices" });

  const customerInvoices = invoices.filter((invoice) => {
    return invoice.customer_id === customerId;
  });

  const lineItems = await data.get({ table: "lineItems" });
  const deposits = await data.get({ table: "deposits" });

  const customerDetails = buildCustomerData({
    customer,
    customerInvoices,
    lineItems,
    deposits,
  });

  return { customerInfo: customer, customerDetails };
};

export const upsertCustomer = async (customer) => {
  return await data.set({ table: "customers", ...customer });
};
