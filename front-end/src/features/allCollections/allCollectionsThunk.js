import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllCollectionsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/sets");
    return resp.data.sets;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
