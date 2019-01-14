import * as Joi from 'joi'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as Router from 'koa-router'
import { ServiceContainer } from '../../container'
import * as middleware from '../middlewares'
import { Role } from '../../lib/authenication'
import * as validators from './validators'
import { UserController } from './controller'

export function init(server: Koa, container: ServiceContainer): void {
    const router = new Router({ prefix: '/api/v1/users' })
    const controller = new UserController(container.managers.user)

    router.get('/',
        bodyParser(),
        controller.helloWorld.bind(controller)
    )
    //获取用户信息
    router.get('/me',
        middleware.authenication(container.lib.authenticator),
        middleware.authorization([Role.user, Role.admin]),
        controller.get.bind(controller)
    )
    //注册
    router.post('/',
        bodyParser(),
        middleware.validate({ request: { body: validators.createUser } }),
        controller.create.bind(controller)
    )
    //登录
    router.post('/login',
        bodyParser(),
        middleware.validate({ request: { body: validators.login } }),
        controller.login.bind(controller)
    )
    //修改用户信息
    router.put('/',
        bodyParser(),
        middleware.authenication(container.lib.authenticator),
        middleware.authorization([Role.user, Role.admin]),
        middleware.validate({ request: { body: validators.updateUser } }),
        controller.update.bind(controller)
    )
    //修改密码
    router.put('/password',
        bodyParser(),
        middleware.authenication(container.lib.authenticator),
        middleware.authorization([Role.user, Role.admin]),
        middleware.validate({
            request: {
                body: validators.changePassword
            }
        }),
        controller.changePassword.bind(controller)
    )

    router.delete(
        '/:id',
        middleware.authenication(container.lib.authenticator),
        middleware.authorization([Role.admin]),
        middleware.validate({
            params: { id: Joi.number().required() }
        }),
        controller.delete.bind(controller)
    )


    server.use(router.routes())
}