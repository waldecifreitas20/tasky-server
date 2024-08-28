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

    console.log(date);
    
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


}


module.exports = { TaskModel: new TaskModel() }