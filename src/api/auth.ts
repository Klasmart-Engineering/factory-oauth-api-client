import { useOauthApiClient } from "../core";
import {
    BaseRequest,
    BaseResponse,
    RequestConfigQueryOptions,
} from "./shared";
import {
    AxiosInstance
    ,
    AxiosRequestConfig,
} from "axios";
import {
    QueryKey,
    useQuery,
} from "react-query";

// #region POST /oauth2/auth

export interface OauthAuthRequest extends BaseRequest {}

export interface OauthAuthResponse extends BaseResponse {}

export async function postOauthAuth (client: AxiosInstance, request: OauthAuthRequest, config?: AxiosRequestConfig) {
    const resp = await client.post<OauthAuthResponse>(`/oauth2/auth`, {
        ...config,
        params: {
            ...request,
            ...config?.params,
        },
    });
    return resp.data;
}

export const POST_OAUTH_AUTH_QUERY_KEY: QueryKey = `postOauthAuth`;

export function usePostOauthAuth (request: OauthAuthRequest, options?: RequestConfigQueryOptions<OauthAuthResponse>) {
    const { axiosClient } = useOauthApiClient();
    return useQuery([ POST_OAUTH_AUTH_QUERY_KEY, request ], () => postOauthAuth(axiosClient, request, options?.config), options?.queryOptions);
}

// #endregion POST /oauth2/auth

// #region POST /oauth2/token

export interface OauthTokenRequest extends BaseRequest {}

export interface OauthTokenResponse extends BaseResponse {}

export async function postOauthToken (client: AxiosInstance, request: OauthTokenRequest, config?: AxiosRequestConfig) {
    const resp = await client.post<OauthTokenResponse>(`/oauth2/token`, {
        ...config,
        params: {
            ...request,
            ...config?.params,
        },
    });
    return resp.data;
}

export const POST_OAUTH_TOKEN_QUERY_KEY: QueryKey = `postOauthToken`;

export function usePostOauthToken (request: OauthTokenResponse, options?: RequestConfigQueryOptions<OauthTokenResponse>) {
    const { axiosClient } = useOauthApiClient();
    return useQuery([ POST_OAUTH_TOKEN_QUERY_KEY, request ], () => postOauthToken(axiosClient, request, options?.config), options?.queryOptions);
}

// #endregion POST /oauth2/token
