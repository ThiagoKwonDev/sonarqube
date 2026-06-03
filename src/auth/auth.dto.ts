export class AuthDto {
  constructor(token: string, expireIn: number) {
    this.token = token;
    this.expireIn = expireIn;
  }
  token!: string;
  expireIn!: number;
}
