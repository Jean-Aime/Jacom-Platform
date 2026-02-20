const bcrypt = require('bcryptjs');

const hash = bcrypt.hashSync('admin123', 10);
const sql = `INSERT INTO User (id, email, password, name, role, createdAt, updatedAt) VALUES ('admin1', 'admin@jacom.com', '${hash}', 'Admin', 'admin', NOW(), NOW());`;

console.log(sql);
