export interface TokenResponse {
  token: string;
  expires: Date;
}

export interface AuthTokensResponse {
  access: TokenResponse;
  refresh?: TokenResponse;
}

export interface ResponseModel {
  success: boolean;
  message: string;
  data?: any;
}
