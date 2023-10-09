import { getAllCustomers } from "../../../models/customers.mjs";

export async function get(req) {
  const customers = await getAllCustomers();
  const generateRandomId = () => Math.random().toString(32).slice(2);

  const firstId = generateRandomId();

  const lineItems = req.session.lineItems || [firstId];

  return {
    json: {
      path: req.path,
      customers,
      lineItems,
    },
  };
}
