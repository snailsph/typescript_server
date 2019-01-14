import { Context } from 'koa'
import { IMiddleware } from 'koa-router'
import { Authenticator } from '../../lib/authenication'

export function authenication(authenticator: Authenticator): IMiddleware {
    return async (ctx: Context, next: () => Promise<any>) => {
        const token = ctx.headers.authenication
        const user = await authenticator.validate(token)

        ctx.state.user = user

        await next()
    }
}