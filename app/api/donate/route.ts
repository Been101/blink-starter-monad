import { ACTIONS_CORS_HEADERS } from "@solana/actions";
import list from "./list.json";

export const GET = async () => {
  return Response.json(list, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = GET;
