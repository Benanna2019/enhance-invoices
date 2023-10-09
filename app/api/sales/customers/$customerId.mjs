import {
  getCustomerInfo,
  getAllCustomers,
} from "../../../models/customers.mjs";
import { currencyFormatter } from "../../../models/helpers.mjs";

export async function get(req) {
  const { customerId } = req.pathParameters;
  const { customerInfo, customerDetails } = await getCustomerInfo(customerId);
  const customers = await getAllCustomers();

  return {
    json: {
      path: req.path,
      customers,
      customerInfo,
      customerDetails,
      currencyFormatter,
    },
  };
}
