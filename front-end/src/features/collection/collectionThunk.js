import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const createCollectionThunk = async (collection, thunkAPI) => {
  try {
    const resp = await customFetch.post("/sets/new-set", collection);
    console.log(resp);
  } catch (err) {
    return checkForUnauthorizedResponse(err, thunkAPI);
  }
};
