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

// #region GET /clients

export interface GetClientsRequest extends BaseRequest {
}

export interface GetClientsResponse extends BaseResponse {
    client_id: string;
    client_name: string;
    client_secret: string;
    jwks: {};
}

export async function getClients (client: AxiosInstance, request: GetClientsRequest, config?: AxiosRequestConfig) {
    const resp = await client.get<GetClientsResponse>(`/clients`, {
        ...config,
        params: {
            ...request,
            ...config?.params,
        },
    });
    return resp.data;
}

export const GET_CLIENTS_QUERY_KEY: QueryKey = `getClients`;

export function useGetClients (request: GetClientsRequest, options?: RequestConfigQueryOptions<GetClientsResponse>) {
    const { axiosClient } = useOauthApiClient();
    return useQuery([ GET_CLIENTS_QUERY_KEY, request ], () => getClients(axiosClient, request, options?.config), options?.queryOptions);
}

// #endregion GET /clients

// #region POST /clients
export interface PostClientsRequest extends BaseRequest {
    client_name: string;
    client_secret: string;
}

export interface PostClientsResponse extends BaseResponse {
    client_id: string;
    client_name: string;
    client_secret: string;
    jwks: {};
}

export async function postClients (client: AxiosInstance, request: PostClientsRequest, config?: AxiosRequestConfig) {
    const resp = await client.post<PostClientsResponse>(`/clients`, {
        ...config,
        params: {
            ...request,
            ...config?.params,
        },
    });
    return resp.data;
}

export const POST_CLIENTS_QUERY_KEY: QueryKey = `postClients`;

export function usePostClients (request: PostClientsRequest, options?: RequestConfigQueryOptions<PostClientsResponse>) {
    const { axiosClient } = useOauthApiClient();
    return useQuery([ POST_CLIENTS_QUERY_KEY, request ], () => postClients(axiosClient, request, options?.config), options?.queryOptions);
}
// #endregion POST /clients

// #region GET /clients/{client_id}

export interface GetClientRequest extends BaseRequest {
    client_id: string;
}

export interface GetClientResponse extends BaseResponse {
    client_id: string;
    client_name: string;
    client_secret: string;
    jwks: {};
}

export async function getClient (client: AxiosInstance, request: GetClientRequest, config?: AxiosRequestConfig) {
    const { client_id, ...rest } = request;
    const resp = await client.get<GetClientResponse>(`/clients/${client_id}`, {
        ...config,
        params: {
            ...rest,
            ...config?.params,
        },
    });
    return resp.data;
}

export const GET_CLIENT_QUERY_KEY: QueryKey = `getClient`;

export function useGetClient (request: GetClientRequest, options?: RequestConfigQueryOptions<GetClientResponse>) {
    const { axiosClient } = useOauthApiClient();
    return useQuery([ GET_CLIENT_QUERY_KEY, request ], () => getClient(axiosClient, request, options?.config), options?.queryOptions);
}

// #endregion GET /clients/{client_id}

// #region PUT /clients/{client_id}

export interface PutClientRequest extends BaseRequest {
    client_id: string;
}

export interface PutClientResponse extends BaseResponse {
    client_id: string;
    client_name: string;
    client_secret: string;
    jwks: {};
}

export async function putClient (client: AxiosInstance, request: PutClientRequest, config?: AxiosRequestConfig) {
    const { client_id, ...rest } = request;
    const resp = await client.put<PutClientResponse>(`/clients/${client_id}`, {
        ...config,
        params: {
            ...rest,
            ...config?.params,
        },
    });
    return resp.data;
}

export const PUT_CLIENT_QUERY_KEY: QueryKey = `putClient`;

export function usePutClient (request: PutClientRequest, options?: RequestConfigQueryOptions<PutClientResponse>) {
    const { axiosClient } = useOauthApiClient();
    return useQuery([ PUT_CLIENT_QUERY_KEY, request ], () => putClient(axiosClient, request, options?.config), options?.queryOptions);
}

// #endregion PUT /clients/{client_id}

// #region DELETE /clients/{client_id}

export interface DeleteClientRequest extends BaseRequest {
    client_id: string;
}

export interface DeleteClientResponse extends BaseResponse {
    client_id: string;
    client_name: string;
    client_secret: string;
    jwks: {};
}

export async function deleteClient (client: AxiosInstance, request: DeleteClientRequest, config?: AxiosRequestConfig) {
    const { client_id, ...rest } = request;
    const resp = await client.delete<DeleteClientResponse>(`/clients/${client_id}`, {
        ...config,
        params: {
            ...rest,
            ...config?.params,
        },
    });
    return resp.data;
}

export const DELETE_CLIENT_QUERY_KEY: QueryKey = `deleteClient`;

export function useDeleteClient (request: DeleteClientRequest, options?: RequestConfigQueryOptions<DeleteClientResponse>) {
    const { axiosClient } = useOauthApiClient();
    return useQuery([ PUT_CLIENT_QUERY_KEY, request ], () => deleteClient(axiosClient, request, options?.config), options?.queryOptions);
}

// #endregion DELETE /clients/{client_id}
