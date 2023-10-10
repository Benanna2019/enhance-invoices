/**
 *
 * @param {import("../../types.d.ts").DerivedInvoiceDataParams;} invoice
 * @returns
 */

export function getInvoiceDerivedData(invoice) {
  const daysToDueDate = getDaysToDueDate(invoice.due_date);
  const totalAmount = invoice.lineItems.reduce(
    (acc, item) => acc + item.quantity * item.unit_price,
    0
  );

  const totalDeposits = invoice.deposits.reduce(
    (acc, deposit) => acc + deposit.amount,
    0
  );

  const dueStatus =
    totalAmount === totalDeposits
      ? "paid"
      : totalDeposits > totalAmount
        ? "overpaid"
        : daysToDueDate < 0
          ? "overdue"
          : "due";

  const dueStatusDisplay =
    dueStatus === "paid"
      ? "Paid"
      : dueStatus === "overpaid"
        ? "Overpaid"
        : dueStatus === "overdue"
          ? "Overdue"
          : daysToDueDate === 0
            ? "Due today"
            : daysToDueDate === 1
              ? `Due tomorrow`
              : `Due in ${daysToDueDate} days`;

  return {
    totalAmount,
    totalDeposits,
    daysToDueDate,
    dueStatus,
    dueStatusDisplay,
  };
}

function asUTC(date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

const getDaysToDueDate = (date) => {
  //   const slicedDate = date.substring(0, date.length - 1);
  return Math.ceil(
    (date - asUTC(new Date()).getTime()) / (1000 * 60 * 60 * 24)
  );
};

export const buildInvoices = (data) => {
  const { invoices, customers, lineItems, deposits } = data;

  const builtInvoices = [];

  for (const invoice of invoices) {
    const customer = customers.find(
      (customer) => customer.key === invoice.customer_id
    );
    const invoiceLineItems = lineItems.filter(
      (item) => item.invoice_id === invoice.key
    );
    const invoiceDeposits = deposits.filter(
      (deposit) => deposit.invoice_id === invoice.key
    );

    const derivedData = getInvoiceDerivedData({
      ...invoice,
      customer,
      lineItems: invoiceLineItems,
      deposits: invoiceDeposits,
    });

    builtInvoices.push({
      ...invoice,
      customer,
      lineItems: invoiceLineItems,
      deposits: invoiceDeposits,
      ...derivedData,
    });
  }

  return builtInvoices;
};

export const buildInvoice = (data) => {
  const { invoice, customers, lineItems, deposits } = data;
  const customer = customers.find(
    (customer) => customer.key === invoice.customer_id
  );
  const invoiceLineItems = lineItems.filter(
    (item) => item.invoice_id === invoice.key
  );
  const invoiceDeposits = deposits.filter(
    (deposit) => deposit.invoice_id === invoice.key
  );

  const derivedData = getInvoiceDerivedData({
    ...invoice,
    customer,
    lineItems: invoiceLineItems,
    deposits: invoiceDeposits,
  });

  return {
    ...invoice,
    customer,
    lineItems: invoiceLineItems,
    deposits: invoiceDeposits,
    ...derivedData,
  };
};

export const buildCustomerData = (data) => {
  const { customer, customerInvoices, lineItems, deposits } = data;

  const invoiceDetails = customerInvoices.map((invoice) => {
    const invoiceLineItems = lineItems?.filter(
      (item) => item.invoice_id === invoice.key
    );

    const invoiceDeposits = deposits?.filter(
      (deposit) => deposit.invoice_id === invoice.key
    );

    const derivedData = getInvoiceDerivedData({
      ...invoice,
      customer,
      lineItems: invoiceLineItems,
      deposits: invoiceDeposits,
    });

    return {
      id: invoice.key,
      number: invoice.number,
      ...derivedData,
    };
  });

  return {
    invoiceDetails,
  };
};

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});
