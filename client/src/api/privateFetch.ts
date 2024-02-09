import store from "../redux/store";
import { userActions } from "../redux/userReducer";

export async function privateFetch(
  url: string,
  options: any = {},
  retry?: boolean,
): Promise<any> {
  const token = localStorage.getItem("token");

  const headers = {
    ...options?.headers,
    Authorization: token,
  };
  let statusCode: number | undefined;

  try {
    const response = await fetch(url, { ...options, headers });
    const data = await response.json();
    if (!response.ok) {
      statusCode = response.status;
      throw new Error();
    }
    return data;
  } catch (err: any) {
    if (statusCode && statusCode === 401) {
      if (!retry) {
        const newToken = await refresh();
        localStorage.setItem("token", newToken);

        const newRequest = await privateFetch(url, options, true);
        return newRequest;
      }

      logout();
    }
    throw new Error(err);
  }
}

function logout() {
  store.dispatch(userActions.logout());
  window.location.href = "/login";
}

async function refresh(): Promise<string> {
  try {
    const response = await fetch("http://localhost:3000/api/auth/refresh", {
      method: "GET",
      credentials: "include",
    });
    return (await response.json()) as string;
  } catch (err) {
    logout();
    return "";
  }
}
