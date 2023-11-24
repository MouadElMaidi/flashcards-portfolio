import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const createCollectionThunk = async (collection, thunkAPI) => {
  try {
    const resp = await customFetch.post("/sets/new-set", collection);
    return resp.data.set.id;
  } catch (err) {
    return checkForUnauthorizedResponse(err, thunkAPI);
  }
};

export const fetchCollectionThunk = async (collectionId, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/sets/${collectionId}`);
    return resp.data.set;
  } catch (err) {
    return checkForUnauthorizedResponse(err, thunkAPI);
  }
};
