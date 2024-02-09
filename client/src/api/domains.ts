import { Domain } from "../lib/definition";
import { privateFetch } from "./privateFetch";

export async function fetchAllDomain() {
  const data = await privateFetch("http://localhost:3000/api/domain/all");
  return data as Array<Domain>;
}
