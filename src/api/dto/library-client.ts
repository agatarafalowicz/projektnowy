import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from "./login.dto";
import { BookResponseDto } from "./book.dto";
import Cookies from "universal-cookie";
import {LoanResponseDto} from "./loan.dto";
import {UserResponseDto} from "./user.dto";


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
    public async getUserById(userId: number): Promise<UserResponseDto | null> {
        const token = cookies.get('token');
        if (!token) {
            console.error('No token found, user might not be authenticated');
            return null;
        }
        try {
            const response: AxiosResponse<UserResponseDto> = await this.client.get(
                `/api/user/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error while fetching user:', error);
            return null;
        }
    }

    public async addBook(newBook: { isbn: string; title: string; author: string; publisher: string; yearOfPublication: number; availableCopies: number; }): Promise<ClientResponse<BookResponseDto | null>> {
        const token = cookies.get('token');
        if (!token) {
            console.error('No token found, user might not be authenticated');
            return {
                success: false,
                data: null,
                statusCode: 401,
            };
        }

        try {
            const response: AxiosResponse<BookResponseDto> = await this.client.post('/api/book/add', newBook, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            console.error('Error while adding book:', error);
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async addLoan(newLoan: { bookId: number; userId: number; loanDate: string; dueDate: string; }): Promise<ClientResponse<LoanResponseDto | null>> {
        const token = cookies.get('token');
        if (!token) {
            console.error('No token found, user might not be authenticated');
            return {
                success: false,
                data: null,
                statusCode: 401,
            };
        }

        try {
            const response: AxiosResponse<LoanResponseDto> = await this.client.post('/api/loan/add', newLoan, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            console.error('Error while adding loan:', error);
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }


    public async getCurrentUser(): Promise<ClientResponse<UserResponseDto | null>> {
        const token = cookies.get('token');
        if (!token) {
            console.error('No token found, user might not be authenticated');
            return {
                success: false,
                data: null,
                statusCode: 401,
            };
        }

        try {
            const response: AxiosResponse<UserResponseDto> = await this.client.get('/api/user/current', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            console.error('Error while fetching user:', error);
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }}

    public async getUsers(): Promise<ClientResponse<UserResponseDto[] | null>> {
        const token = cookies.get('token');
        if (!token) {
            console.error('No token found, user might not be authenticated');
            return {
                success: false,
                data: null,
                statusCode: 401,
            };
        }

        try {
            const response: AxiosResponse<UserResponseDto[]> = await this.client.get('/api/user/getAll', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            console.error('Error while fetching users:', error);
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async addUser(newUser: { login: string; userPassword: string; role: string; email: string; name: string; }): Promise<ClientResponse<UserResponseDto | null>> {
        const token = cookies.get('token');
        if (!token) {
            console.error('No token found, user might not be authenticated');
            return {
                success: false,
                data: null,
                statusCode: 401,
            };
        }

        try {
            const response: AxiosResponse<UserResponseDto> = await this.client.post('/api/user/add', newUser, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            console.error('Error while adding user:', error);
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async logout(): Promise<boolean> {
        try {
            const confirmLogout = window.confirm("Are you sure you want to logout?");
            if (confirmLogout) {
                cookies.remove('token');
                this.client.defaults.headers.common['Authorization'] = undefined;
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error during logout:', error);
            return false;
        }
    }


}
