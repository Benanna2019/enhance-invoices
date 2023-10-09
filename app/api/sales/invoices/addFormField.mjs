export async function post(req) {
  let lineItems = req.session.lineItems || [];

  const generateRandomId = () => Math.random().toString(32).slice(2);
  lineItems = [...lineItems, generateRandomId()];

  return {
    session: {
      lineItems,
    },
    location: req.path,
  };
}
