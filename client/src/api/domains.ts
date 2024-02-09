import { Domain } from "../lib/definition";
import { privateFetch } from "./privateFetch";

export async function fetchAllDomain(page = 1) {
  const data = await privateFetch(`http://localhost:3000/api/domain/${page}`);
  return data as { maxPages: number; result: Array<Domain> };
}
