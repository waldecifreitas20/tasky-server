const { sql } = require('../../database/database.js');

class TaskModel {

  async create({
    task_name,
    description,
    date,
    hour,
    is_all_day,
    belongs_to
  }) {

    return await sql`
      INSERT INTO tasks( 
          task_name, 
          description,
          date, 
          hour, 
          is_all_day, 
          belongs_to
      ) VALUES (
          ${task_name.toString()},
          ${description.toString()},
          ${date.toString()},
          ${hour.toString()},
          ${is_all_day},
          ${belongs_to.toString()}  
      );`;
  }

  async getByOwner(email) {
    return await sql`
      SELECT 
        task_id AS id, 
        task_name AS name,
        description AS desc, 
        TO_CHAR(tasks.date::DATE, 'yyyy-mm-dd') AS date, 
        hour,
        is_all_day AS full_day 
      FROM tasks
      WHERE tasks.belongs_to = ${email.toString()}
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

  async delete(taskId) {
    return await sql`
      DELETE 
      FROM tasks
      WHERE tasks.task_id = ${taskId.toString()};
    `;
  }

  async update(taskId, owner, updates) {
    const columns = Object.keys(updates);

    return await sql`
      UPDATE tasks
      SET ${sql(updates, columns)}
      WHERE task_id = ${taskId.toString()}
      AND belongs_to = ${owner.toString()};
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