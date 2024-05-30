import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import {LoginDto, LoginResponseDto} from "./login.dto";
import {BookDto, BookResponseDto} from "./book.dto";

export type ClientResponse<T> = {
    success: boolean;
    data: T;
    statusCode: number;
};

export class LibraryClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:8081',
        });
    }

    public async login(
        data: LoginDto,
    ): Promise<ClientResponse<LoginResponseDto | null>> {
        try {
            const response: AxiosResponse<LoginResponseDto> = await this.client.post(
                '/login',
                data,
            );

            this.client.defaults.headers.common['Authorization'] =
                `Bearer ${response.data.token}`;

            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;

            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async getBooks(data: BookDto,): Promise<ClientResponse<BookResponseDto[] | null>> {
        const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

        if (token) {
            this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            return {
                success: false,
                data: null,
                statusCode: 401, // Unauthorized if no token found
            };
        }

        try {
            const response: AxiosResponse<BookResponseDto[]> = await this.client.get('/api/books'); // Adjust the endpoint as needed
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;

            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }
}
