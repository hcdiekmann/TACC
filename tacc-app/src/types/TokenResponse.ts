/**
 * Common properties shared by both GetTokenResponse and RefreshTokenResponse
 */
interface TokenResponseCommon {
  access_token: string;
  expires_in: number;
}

/**
 * Response type for fetching a new token
 */
export interface GetTokenResponse extends TokenResponseCommon {
  // Refresh token is provided when fetching a new token
  refresh_token: string;
}

/**
 * Response type for refreshing an existing token
 */
export interface RefreshTokenResponse extends TokenResponseCommon {
  // Additional properties specific to refreshing a token can go here
}
