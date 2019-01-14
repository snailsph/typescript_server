import * as Joi from 'joi'

export const createUser:Joi.SchemaMap = {
    email: Joi.string()
        .email()
        .trim()
        .required(),
    password: Joi.string()
        .trim()
        .required(),
    firstName: Joi.string().required(),
    lastNaame: Joi.string().required()
}

export const updateUser: Joi.SchemaMap = {
    firstName: Joi.string().required(),
    lastNaame: Joi.string().required()
}

export const changePassword: Joi.SchemaMap = {
    newPassword: Joi.string().required(),
    oldPassword: Joi.string().required()
}

export const login: Joi.SchemaMap = {
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required()
}