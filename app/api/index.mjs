export async function get(req) {
  return {
    json: {
      path: req.path,
    },
  };
}
