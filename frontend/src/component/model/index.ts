export interface IUser {
    username: string,
    password: string,
}

export interface IAccess {
    access: string,
}

export interface Jwt extends IAccess{
    refresh: string,
}

export interface IRegisterUser extends IUser{
    username: string,
}

export interface IRegisterCustomer {
    user: IRegisterUser,
    bank_account: string,
}