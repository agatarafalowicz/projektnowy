export class LoginDto {
    login: string | undefined;
    password: string | undefined;
}

export class LoginResponseDto {
    token: string | undefined;
    access_token: string | undefined;
    jwt: string | undefined;
}