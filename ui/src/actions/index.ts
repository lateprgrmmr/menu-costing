type Method = "GET" | "POST" | "PUT" | "DELETE";

const API_BASE_PATH = 'http://localhost:5005';

const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return {
        Authorization: `Bearer ${token}`,
        'X-Refresh-Token': refreshToken || '',
    }
}

// generic method to make a request to the API
const makeRequest = async <T, D extends Record<string, unknown> = Record<string, unknown>>(
    endpoint: string,
    method: Method,
    data?: D,
    headersOverride?: Record<string, string>,
): Promise<T> => {

    const defaultHeaders: HeadersInit = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
    }
    const headers = {
        ...defaultHeaders,
        ...headersOverride,
    }

    const options: RequestInit = {
        method,
        headers,
    }

    if (data) {
        options.body = JSON.stringify(data);
    }
    try {
        const response = await fetch(`${API_BASE_PATH}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// generic method to make a GET request
export const makeGetRequest = async <T>(url: string, headers?: Record<string, string>): Promise<T> => {
    return makeRequest(url, 'GET', undefined, headers);
};

// generic method to make a POST request
export const makePostRequest = async <T>(
    url: string,
    data: Record<string, unknown>,
    headers?: Record<string, string>,
): Promise<T> => {
    return makeRequest(url, 'POST', data, headers);
};

// generic method to make a PUT request
export const makePutRequest = async <T>(
    url: string,
    data: Record<string, unknown>,
    headers?: Record<string, string>,
): Promise<T> => {
    return makeRequest(url, 'PUT', data, headers);
};

// generic method to make a DELETE request
export const makeDeleteRequest = async <T>(url: string, headers?: Record<string, string>): Promise<T> => {
    return makeRequest(url, 'DELETE', undefined, headers);
};
