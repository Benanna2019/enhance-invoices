// place files you want to import through the `$lib` alias in this folder.
export function validateAmount(amount) {
  if (amount <= 0) return "Must be greater than 0";
  if (Number(amount.toFixed(2)) !== amount) {
    return "Must only have two decimal places";
  }
  return null;
}

export function validateDepositDate(date) {
  if (Number.isNaN(date.getTime())) {
    return "Please enter a valid date";
  }
  return null;
}
export function validateCustomerId(customerId) {
  // the database won't let us create an invoice without a customer
  // so all we need to do is make sure this is not an empty string
  return customerId === "" ? "Please select a customer" : null;
}

export function validateDueDate(date) {
  if (Number.isNaN(date.getTime())) {
    return "Please enter a valid date";
  }
  return null;
}

export function validateLineItemQuantity(quantity) {
  if (quantity <= 0) return "Must be greater than 0";
  if (Number(quantity.toFixed(0)) !== quantity) {
    return "Fractional quantities are not allowed";
  }
  return null;
}

export function validateLineItemUnitPrice(unitPrice) {
  if (unitPrice <= 0) return "Must be greater than 0";
  if (Number(unitPrice.toFixed(2)) !== unitPrice) {
    return "Must only have two decimal places";
  }
  return null;
}

export function validateEmail(email) {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export function asUTC(date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

export function parseDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  //@ts-ignore
  return asUTC(new Date(year, month - 1, day));
}

export const inputClasses =
  "text-lg w-full rounded border border-gray-500 px-2 py-1";

export const submitButtonClasses =
  "w-full rounded bg-green-500 py-2 px-4 text-white hover:bg-green-600 focus:bg-green-400";

export const dangerButtonClasses =
  "w-full rounded bg-red-600 py-2 px-4 text-white hover:bg-red-700 focus:bg-red-500";

export const lineItemClassName =
  "flex justify-between border-t border-gray-100 py-4 text-[14px] leading-[24px]";
