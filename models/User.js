const db = require('../config/database');

class User {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(username, password, name, email, phone) {
        const [result] = await db.query(
            'INSERT INTO users (username, password, name, email, phone) VALUES (?, ?, ?, ?, ?)',
            [username, password, name, email, phone]
        );
        return result.insertId;
    }

    static async update(id, username, password, name, email, phone) {
        const [result] = await db.query(
            'UPDATE users SET username=?, password=?, name=?, email=?, phone=? WHERE id=?',
            [username, password, name, email, phone, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM users WHERE id=?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = User;
