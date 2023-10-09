import data from "@begin/data";

export const createDeposit = async (deposit) => {
  return await data.set({ table: "deposits", ...deposit });
};
