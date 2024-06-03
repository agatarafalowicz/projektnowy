import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from "./login.dto";
import { BookResponseDto } from "./book.dto";
import Cookies from "universal-cookie";
import {LoanResponseDto} from "./loan.dto";

const cookies = new Cookies();

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

            console.log('full response:', response);
            const token = response.data;

            if (token) {
                cookies.set('token', token);
                console.log('Token set:', token);
                this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                console.error('Token not found in response data');
            }

            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            console.error('Error during login:', error);
            const axiosError = error as AxiosError<Error>;

            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async getBooks(): Promise<ClientResponse<BookResponseDto[] | null>> {
        const token = cookies.get('token');
        if (token) {
            this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            console.error('No token found, user might not be authenticated');
            return {
                success: false,
                data: null,
                statusCode: 401,
            };
        }

        try {
            const response: AxiosResponse<BookResponseDto[]> = await this.client.get('/api/book/getAll');
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            console.error('Error while fetching books:', error);
            const axiosError = error as AxiosError<Error>;

            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async getLoans(): Promise<ClientResponse<LoanResponseDto[] | null>> {
        const token = cookies.get('token');
        if (token) {
            this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            console.error('No token found, user might not be authenticated');
            return {
                success: false,
                data: null,
                statusCode: 401,
            };
        }

        try {
            const response: AxiosResponse<LoanResponseDto[]> = await this.client.get('/api/loan/getAll');
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            console.error('Error while fetching loans:', error);
            const axiosError = error as AxiosError<Error>;

            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }
}
