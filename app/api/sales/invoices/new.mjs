import { getAllCustomers } from "../../../models/customers.mjs";

import { getAllInvoiceData } from "../../../models/invoices.mjs";
import { currencyFormatter } from "../../../models/helpers.mjs";
export async function get(req) {
  const invoices = await getAllInvoiceData();
  const customers = await getAllCustomers();

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
      currencyFormatter,
      dueSoonAmount,
      customers,
      overdueAmount,
    },
  };
}
