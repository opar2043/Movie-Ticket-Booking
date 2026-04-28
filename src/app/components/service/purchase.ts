import api from "./api";

const getPurchase = async () => {
  const data = await api.get("/purchases");
  const res = data.data;
  return res;
};
const getSinglePurchase = async (id: string) => {
  const data = await api.get("/purchases/" + id);
  const res = data.data;
  return res;
};
const deletePurchase = async (id: string) => {
  const data = await api.delete("/purchases/" + id);
  const res = data.data;
  return res;
};
const updatePurchase = async (id: string) => {
  const data = await api.patch("/purchases/" + id);
  const res = data.data;
  return res;
};
const createPurchase = async () => {
  const data = await api.post("/purchases");
  const res = data.data;
  return res;
};

export const purchaseRoute = {
  getPurchase,
  getSinglePurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
};
