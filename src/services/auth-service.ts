import { apiRequest } from "@/lib/api";
import { ICreateAccount, IValidateAccount, IAuthResponse, IRegisterCreator } from "@/lib/auth";

export async function createAccount(dtoCreateAccount: ICreateAccount) {
  return apiRequest<IAuthResponse>('POST', `/sign-up`, dtoCreateAccount);
}

export async function validateAccount(dtoValidateAccount: IValidateAccount) {
  return apiRequest<IAuthResponse>('POST', `/sign-in`, dtoValidateAccount);
}

export async function fetchingAllUser() {
  return apiRequest<IAuthResponse>('GET', `/users`);
}

export async function registerCreator(dtoRegisterCreator: IRegisterCreator) {
  return apiRequest<IAuthResponse>('POST', `/sign-up-creator`, dtoRegisterCreator);
}