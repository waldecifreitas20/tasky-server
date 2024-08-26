const getPath = require("path").resolve;
const SQL = require(getPath("database/database.js"));

class TaskModel {

  async create(email, {
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


  async getByFk(email) {
    return await SQL`
      SELECT *
      FROM tasks
      WHERE tasks.belongs_to = '${email.toString()}';
    `;

  }


}


module.exports = { TaskModel: new TaskModel() }