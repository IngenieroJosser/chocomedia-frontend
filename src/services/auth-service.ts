import { apiRequest } from "@/lib/api";
import { ICreateAccount, IValidateAccount, IAuthResponse } from "@/lib/auth";

const endpoint = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || 'http://localhost:3001';
const endpointAccount = `${endpoint}/auth`

export async function createAccount(dtoCreateAccount: ICreateAccount) {
  return apiRequest<IAuthResponse>('POST', `${endpointAccount}/sign-up`, dtoCreateAccount);
}

export async function validateAccount(dtoValidateAccount: IValidateAccount) {
  return apiRequest<IAuthResponse>('POST', `${endpointAccount}/sign-in`, dtoValidateAccount);
}

export async function fetchingAllUser() {
  return apiRequest<IAuthResponse>('GET', `${endpointAccount}`);
}