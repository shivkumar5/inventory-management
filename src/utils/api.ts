import axios from "axios";
export const fetchInventory = async () => {
  const response = await axios.get(
    "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
  );
  return response.data;
};
