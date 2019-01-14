import { Task } from '../../entities'
export interface CreateTask {
    name: string,
    description: string
}

export class TaskModel {
    public id?: number
    public name: string
    public desciption: string
    public done: boolean
    public created: Date
    public updated: Date

    constructor(task: Task) {
        this.id = task.id
        this.name = task.name
        this.desciption = task.description
        this.done = task.done
        this.created = task.created
        this.updated = task.updated
    }
}