import { User } from '../entities'
import { ValidationError } from '../errors'
import { Authenticator } from '../lib/authenication'
import { Hasher } from '../lib/hasher'
import { UserDatabaseHandle } from '../databseHandle'


export class UserManager {
    private userHandle: UserDatabaseHandle
    private hasher: Hasher
    private auth: Authenticator

    constructor(userHandle:UserDatabaseHandle,hasher:Hasher,auth:Authenticator){
        this.userHandle = userHandle
        this.hasher = hasher
        this.auth = auth
    }

    public async findByEmail(email: string):Promise<User> {
        return this.userHandle.findByEmail(email)
    }

    public async create(user: User): Promise<User> {
        const hasPassword = await this.hasher.hasPassword(user.password)
        user.password = hasPassword
        return this.userHandle.insert(user)
    }

    public async login(email: string,password:string):Promise<string>{
        const user = await this.userHandle.findByEmail(email)
        if(await this.hasher.verifyPassword(password,user.password)){
            return this.auth.authenticate(user)
        }

        throw new ValidationError('Wrong credentials')
    }

    public update(user: User): Promise<User> {
        return this.userHandle.update(user)
    }

    public  async changePassword(
        email: string,
        newPassword: string,
        oldPassword: string
    ):Promise<void>{
        const user = await this.userHandle.findByEmail(email)
        const validPassword = await this.hasher.verifyPassword(oldPassword,
            user.password)

        if(!validPassword){
            throw new ValidationError(' old password is not correct')
        }
        const hasPassword = await this.hasher.hasPassword(newPassword)
        return this.userHandle.changePassword(email,hasPassword)
    }

    public delete(userId: number) :Promise<void>{
        return this.userHandle.delete(userId)
    }
}