import * as jwt from 'jsonwebtoken'
import { User } from '../../entities'
import { UnauthorizedError } from '../../errors'
import { UserDatabaseHandle } from '../../databseHandle'


export interface AuthUser {
    id: number
    email: string
    role: Role
}

export enum Role {
    user = 'user',
    admin = 'admin'
}

export interface Authenticator {
    validate(token: string): Promise<AuthUser>
    authenticate(user: User):string
}

export class JWTAuthenticator implements Authenticator  {
    private userHandle: UserDatabaseHandle
    private secret: string

    constructor(userHandle: UserDatabaseHandle){
        this.userHandle = userHandle
        this.secret = process.env.SECRET_KET || 'secret'
    }
    //检验签名
    public async validate(token: string): Promise<AuthUser> {
        try{
            const decode: any = jwt.verify(token,this.secret)
            const user = await this.userHandle.findByEmail(decode.email)

            return {
                id: user.id,
                email: user.email,
                role: user.role as Role
            }
        }catch(err){
            throw new UnauthorizedError(err)
        }
    }
    //生成签名
    public authenticate(user:User): string {
        return jwt.sign(
            { id: user.id,email:user.email,role: user.role },
            this.secret,
            {
                expiresIn: 60 * 60
            }
        )
    }
}