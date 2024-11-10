const bcrypt = require('bcrypt');

const passwords = ['pass123', 'test123', 'guest123'];

async function hashPasswords() {
    try {
        for (const password of passwords) {
            console.log(`Hashing password: ${password}`);
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(`Password: ${password}, Hashed: ${hashedPassword}`);
        }
    } catch (error) {
        console.error('Error hashing passwords:', error);
    }
}

hashPasswords().then(() => console.log('Hashing complete.'));
