const { v4: uuidv4 } = require('uuid');


exports.generateRandomUser = () => {
    const username = `user_${uuidv4().slice(0, 6)}`;
    const email = `${uuidv4().slice(0, 6)}@example.com`;
    const password = uuidv4().slice(0, 8);
  
    return { username, email, password };
  }