const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
});


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async insertNewUser(userEntity) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users SET ?";

                connection.query(query, userEntity, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            console.log(insertId)
            return {
                id: insertId,
                name: userEntity.name,
                email: userEntity.email
            };
        } catch (error) {
            console.log(error);
        }
    }

    async getAllUsers() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getUSerById(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE id = ?;";

                connection.query(query, [id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateUserById(id, userData) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE users SET ? WHERE id = ?";

                connection.query(query, [userData, id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteUserById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM users WHERE id = ?";

                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async CheckNewUSersInDay() {
        try {
            // Get the current date
            const today = new Date();
            const currentDate = today.toISOString().split('T')[0];

            // Construct the SQL query to count new users added today
            const sql = `SELECT COUNT(*) AS new_users_count FROM users WHERE DATE(created_at) = ?`;

            // Execute the query
            connection.query(sql, [currentDate], (error, results) => {
                if (error) {
                    console.error('Error executing query: ' + error.message);
                    return;
                }
                // Extract the count of new users added today from the results
                const newUsersCount = results[0].new_users_count;
                console.log(`Number of new users added today: ${newUsersCount}`);
                return {
                    newUsersCount: newUsersCount
                };
            });

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;