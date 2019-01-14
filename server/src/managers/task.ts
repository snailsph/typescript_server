import { Task } from '../entities'
import { TaskDatabaseHandle } from '../databseHandle'

export class TaskManager {
    private taskHandle: TaskDatabaseHandle
    constructor(taskHandle: TaskDatabaseHandle) {
        this.taskHandle = taskHandle
    }

    public find(userId: number, id: number): Promise<Task> {
        return this.taskHandle.find(userId, id)
    }

    public async findUserTasks(
        userId: number,
        limit: number,
        offset: number
    ): Promise<Task[]> {
        return this.taskHandle.findBuUser(userId, limit, offset)
    }

    public create(task: Task): Promise<Task> {
        return this.taskHandle.insert(task)
    }

    public update(task: Task): Promise<Task> {
        return this.taskHandle.update(task)
    }

    public delete(userId: number, taskId: number): Promise<void> {
        return this.taskHandle.delete(userId, taskId)
    }
}