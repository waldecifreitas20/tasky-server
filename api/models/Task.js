const { sql } = require('../../database/database.js');

class TaskModel {

  async create({
    task_name,
    description,
    date,
    hour,
    is_all_day
  }, userId) {

    return await sql`
      INSERT INTO tasks( 
          task_name, 
          description,
          date, 
          hour, 
          is_all_day, 
          belongs_to
      ) VALUES (
          ${task_name},
          ${description},
          ${date},
          ${hour},
          ${is_all_day},
          ${userId}  
      );`;
  }

  async getByOwner(userId) {
    return await sql`
      SELECT 
        task_id AS id, 
        task_name AS name,
        description AS desc, 
        TO_CHAR(tasks.date::DATE, 'yyyy-mm-dd') AS date, 
        hour,
        is_all_day AS full_day 
      FROM tasks
      WHERE tasks.belongs_to = ${userId}
      ORDER BY tasks.date DESC;
    `;

  }

  async getById(id) {
    return await sql`
      SELECT *
      FROM tasks
      WHERE tasks.task_id = ${id};
    `;
  }

  async delete(taskId, userId) {
    return await sql`
      DELETE 
      FROM tasks
      WHERE tasks.task_id = ${taskId}
      AND tasks.belongs_to = ${userId};
    `;
  }

  async update(taskId, owner, updates) {
    const columns = Object.keys(updates);

    return await sql`
      UPDATE tasks
      SET ${sql(updates, columns)}
      WHERE task_id = ${taskId}
      AND belongs_to = ${owner};
    `;
  }

  async isOwner(taskId, userEmail) {
    const result = await sql`
    SELECT *
    FROM users
    INNER JOIN tasks
    ON tasks.belongs_to = users.email
    WHERE tasks.belongs_to = ${userEmail}
    AND tasks.task_id = ${taskId};
    `;

    return result.length !== 0;
  }

}


module.exports = { TaskModel: new TaskModel() }