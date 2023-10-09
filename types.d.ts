export type DerivedInvoiceDataParams = {
  dueDate: string;
  lineItems: Array<{ quantity: number; unitPrice: number }>;
  deposits: Array<{ amount: number }>;
};
