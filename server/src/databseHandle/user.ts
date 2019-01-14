import { User } from '../entities'
import { NotFoundError, ValidationError } from '../errors'
import { MySql } from '../lib/database'

export class UserDatabaseHandle {
    private readonly TABLE: string = 'user'
    private db: MySql
    constructor(db: MySql) {
        this.db = db
    }

    public async findByEmail(email: string): Promise<User> {
        const conn = await this.db.getConnection()
        const row = await conn.table(this.TABLE)
            .where({ email })
            .first()
        if (!row) {
            throw new NotFoundError('User does not exists')
        }
        return this.transform(row)
    }

    public async insert(user: User): Promise<User> {
        user.created = new Date()
        user.updated = new Date()

        const conn = await this.db.getConnection()
        try {
            const result = await conn.table(this.TABLE)
                .insert({
                    email: user.email,
                    password: user.password,
                    role: user.role,
                    first_name: user.firstName,
                    last_name: user.lastName,
                    created: user.created,
                    updated: user.updated
                })

            user.id = result[0]

            return user
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new ValidationError(`Email ${user.email} already exists`, err)
            }
            throw err
        }
    }

    public async update(user: User): Promise<User> {
        user.updated = new Date()
        const conn = await this.db.getConnection()
        await conn.table(this.TABLE)
            .update({
                first_name: user.firstName,
                last_name: user.lastName,
                password: user.password
            })
        return user
    }

    public async changePassword(email: string, newPassword: string): Promise<void> {
        const conn = await this.db.getConnection()
        await conn.table(this.TABLE)
            .update({
                password: newPassword,
                updated: new Date()
            })
            .where({ email })
    }

    public async delete(userId: number): Promise<void> {
        const trx = await this.db.getTransaction()

        try{
             await trx.from('task')
             .delete()
             .where({user_id: userId})

             await trx.from(this.TABLE)
             .delete()
             .where({id:userId})
             await trx.commit()
        }catch(error){
            trx.rollback(error)
            throw error
        }
    }

    private transform(row: any): User {
        return {
            id: row.id,
            email: row.email,
            password: row.password,
            role: row.role,
            firstName: row.first_name,
            lastName: row.last_name,
            created: row.created,
            updated: row.updated
        }
    }
}