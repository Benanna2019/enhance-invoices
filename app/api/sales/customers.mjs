import { getAllCustomers, upsertCustomer } from "../../models/customers.mjs";
import { createId } from "@paralleldrive/cuid2";

export async function get(req) {
  const customers = await getAllCustomers();

  return {
    json: {
      path: req.path,
      customers,
    },
  };
}

export async function postCustomer(req) {
  const session = req.session;
  const formData = req.body;

  const customer = {
    key: createId(),
    created_at: new Date().getTime(),
    ...formData,
  };

  let { problems, ...newSession } = session;

  try {
    const result = await upsertCustomer(customer);
    return {
      session: newSession,
      json: { customer: result },
      location: `/sales/customers/${result.key}`,
    };
  } catch (error) {
    return {
      session: { ...newSession, error: error.message },
      json: { error: error.message },
      location: "/sales/customers",
    };
  }
}

export const post = [postCustomer];
