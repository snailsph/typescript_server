import { Context } from 'koa'
import { User } from '../../entities'
// import { AuthUser } from '../../lib/authenication'
import { UserManager } from '../../managers'
import { CreateUser, UserModel } from './models'


export class UserController {
    private manager: UserManager

    constructor(manager: UserManager) {
        this.manager = manager
    }
    public helloWorld(ctx: Context) {
        ctx.body = "你好世界"
        ctx.status = 200
    }

    public async create(ctx: Context) {
        const userReq: CreateUser = ctx.request.body
        const newUser = await this.manager.create(userReq as User)

        ctx.body = new UserModel(newUser)
        ctx.status = 201
        ctx.set('location', "/api/v1/users/me")
    }

    public async login(ctx: Context) {
        ctx.body = {
            accessToken: await this.manager.login(
                ctx.request.body.email,
                ctx.request.body.password
            )
        }
    }

    public async update(ctx: Context) {
        const userReq = ctx.request.body
        const user = await this.manager.findByEmail(ctx.state.user.email)

        user.firstName = userReq.firstName
        user.lastName = userReq.lastName

        const updatedUser = await this.manager.update(user)

        ctx.body = new UserModel(updatedUser)
        ctx.status = 200
    }

    public async changePassword(ctx: Context) {
        const newPassword = ctx.request.body.newPassword
        const oldPassword = ctx.request.body.oldPassword

        await this.manager.changePassword(
            ctx.state.user.email,
            newPassword,
            oldPassword
        )
        ctx.status = 204
    }

    public async get(ctx: Context) {
        // const authUser: AuthUser = ctx.request.body.email
        const user = await this.manager.findByEmail(ctx.query.email)

        ctx.body = new UserModel(user)
        ctx.status = 200
    }

    public async delete(ctx: Context) {
        await this.manager.delete(ctx.params.id)
        ctx.status = 204
    }
}