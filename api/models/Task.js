const getPath = require("path").resolve;
const SQL = require(getPath("database/database.js"));

class TaskModel {

  async create({
    task_name,
    description,
    date,
    hour,
    is_all_day,
    belongs_to
  }) {
    
    return await SQL`
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
    return await SQL`
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
    return await SQL`
      SELECT *
      FROM tasks
      WHERE tasks.task_id = ${id}
    `;
  }

  async delete(taskId) {
    return await SQL`
      DELETE 
      FROM tasks
      WHERE tasks.task_id = ${taskId.toString()}
    `;
  }
}


module.exports = { TaskModel: new TaskModel() }