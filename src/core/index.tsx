import {
    DeleteClientRequest,
    DeleteClientResponse,
    GetClientRequest,
    GetClientResponse,
    getClients,
    GetClientsRequest,
    GetClientsResponse,
    PostClientsRequest,
    PostClientsResponse,
    PutClientRequest,
    PutClientResponse,
} from "../api/admin";
import {
    OauthAuthRequest,
    OauthAuthResponse,
    OauthTokenRequest,
    OauthTokenResponse,
} from "../api/auth";
import { RequestConfigOptions } from "../api/shared";
import axios,
{
    AxiosDefaults,
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";
import React,
{
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react";
import {
    DefaultOptions,
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
    QueryClientProviderProps,
} from "react-query";

interface OauthApiActions {
    getClients: (request: GetClientsRequest, options?: RequestConfigOptions) => Promise<GetClientsResponse>;
    postClients: (request: PostClientsRequest, options?: RequestConfigOptions) => Promise<PostClientsResponse>;
    getClient: (request: GetClientRequest, options?: RequestConfigOptions) => Promise<GetClientResponse>;
    putClient: (request: PutClientRequest, options?: RequestConfigOptions) => Promise<PutClientResponse>;
    deleteClient: (request: DeleteClientRequest, options?: RequestConfigOptions) => Promise<DeleteClientResponse>;
    postOauthAuth: (request: OauthAuthRequest, options?: RequestConfigOptions) => Promise<OauthAuthResponse>;
    postOauthToken: (request: OauthTokenRequest, options?: RequestConfigOptions) => Promise<OauthTokenResponse>;
}

interface OauthApiClient {
    queryClient: QueryClient;
    axiosClient: AxiosInstance;
    updateHttpConfig: (config: Partial<AxiosDefaults>) => void;
    actions: OauthApiActions;
}
interface ProviderProps extends Partial<QueryClientProviderProps> {
    children: React.ReactNode;
    config: AxiosRequestConfig;
    responseInterceptors?: {
        onFulfilled?: ((value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>) | undefined;
        onRejected?: ((error: AxiosError) => any) | undefined;
    }[];
    requestInterceptors?: {
        onFulfilled?: ((value: AxiosRequestConfig<any>) => AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>>) | undefined;
        onRejected?: ((error: AxiosError) => any) | undefined;
    }[];
    queryOptions?: {
        queryCache?: QueryCache;
        mutationCache?: MutationCache;
        defaultOptions?: DefaultOptions;
    };
}
class OauthApiClientNoProviderError extends Error {
    constructor () {
        super (`useOauthApiClient must be used within a OauthApiClientContext.Provider`);
        this.name = `NO_PROVIDER`;
    }
}

const OauthApiClientContext = createContext<OauthApiClient>({
    queryClient: (null as unknown) as QueryClient,
    axiosClient: (null as unknown) as AxiosInstance,
    updateHttpConfig: () => { throw new OauthApiClientNoProviderError(); },
    actions: {
        getClients: () => { throw new OauthApiClientNoProviderError(); },
        postClients: () => { throw new OauthApiClientNoProviderError(); },
        getClient: () => { throw new OauthApiClientNoProviderError(); },
        putClient: () => { throw new OauthApiClientNoProviderError(); },
        deleteClient: () => { throw new OauthApiClientNoProviderError(); },
        postOauthAuth: () => { throw new OauthApiClientNoProviderError(); },
        postOauthToken: () => { throw new OauthApiClientNoProviderError(); },
    },
});

export function OauthApiClientProvider (props: ProviderProps) {
    const {
        children,
        config,
        queryOptions,
        responseInterceptors,
        requestInterceptors,
        ...rest
    } = props;

    const queryClient = useMemo(() => new QueryClient(queryOptions), [ queryOptions ]);
    const axiosClient = useMemo(() => {
        const client = axios.create(config);

        for (const interceptor of requestInterceptors ?? []) {
            client.interceptors.request.use(interceptor.onFulfilled, interceptor.onRejected);
        }

        for (const interceptor of responseInterceptors ?? []) {
            client.interceptors.response.use(interceptor.onFulfilled, interceptor.onRejected);
        }

        return client;
    }, [
        config,
        responseInterceptors,
        requestInterceptors,
    ]);

    const updateHttpConfig = useCallback((config: Partial<AxiosDefaults>) => {
        queryClient.cancelMutations();
        queryClient.cancelQueries();
        axiosClient.defaults = {
            ...axiosClient.defaults,
            ...config,
        };
        queryClient.clear();
    }, [ axiosClient, queryClient ]);

    const updatedProps = {
        client: queryClient,
        ...rest,
    };

    const getClientsAction = useCallback((request: GetClientsRequest, options?: RequestConfigOptions) => {
        return getClients(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const postClientsAction = useCallback((request: PostClientsRequest, options?: RequestConfigOptions) => {
        return getClients(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const getClientAction = useCallback((request: GetClientRequest, options?: RequestConfigOptions) => {
        return getClients(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const putClientAction = useCallback((request: PutClientRequest, options?: RequestConfigOptions) => {
        return getClients(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const deleteClientAction = useCallback((request: DeleteClientRequest, options?: RequestConfigOptions) => {
        return getClients(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const postOauthAuthAction = useCallback((request: OauthAuthRequest, options?: RequestConfigOptions) => {
        return getClients(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const postOauthTokenAction = useCallback((request: OauthTokenRequest, options?: RequestConfigOptions) => {
        return getClients(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const actions = useMemo(() => {
        return {
            getClients: getClientsAction,
            postClients: postClientsAction,
            getClient: getClientAction,
            putClient: putClientAction,
            deleteClient: deleteClientAction,
            postOauthAuth: postOauthAuthAction,
            postOauthToken: postOauthTokenAction,
        };
    }, [
        getClientsAction,
        postClientsAction,
        getClientAction,
        putClientAction,
        deleteClientAction,
        postOauthAuthAction,
        postOauthTokenAction,
    ]);

    return (
        <OauthApiClientContext.Provider
            value={{
                queryClient,
                axiosClient,
                updateHttpConfig,
                actions,
            }}
        >
            <QueryClientProvider {...updatedProps}>
                {children}
            </QueryClientProvider>
        </OauthApiClientContext.Provider>
    );
}

export const useOauthApiClient = () => {
    const context = useContext(OauthApiClientContext);
    if (!context) {
        throw new OauthApiClientNoProviderError();
    }
    return context;
};
