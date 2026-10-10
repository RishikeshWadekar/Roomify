const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas or local database instance with clean error handling
 */
const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri || uri.includes('<db_username>')) {
    console.warn('\n⚠️ [MongoDB Atlas] Placeholder detected in MONGO_URI.');
    console.warn('   Please replace "<db_username>" in backend/.env with your actual MongoDB Atlas database username.');
    console.warn('   Example: MONGO_URI=mongodb+srv://myuser:uu5jxn7508bk5jRG@roomifydata.1axwvbo.mongodb.net/roomify?retryWrites=true&w=majority&appName=Roomifydata\n');
    return null;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // Timeout early rather than hanging
    });
    console.log(`\n✅ [MongoDB Atlas] Connected successfully to host: ${conn.connection.host} (DB: ${conn.connection.name})`);
    return conn;
  } catch (error) {
    console.error(`\n❌ [MongoDB Atlas] Connection Error: ${error.message}`);
    if (error.message.includes('Authentication failed') || error.message.includes('bad auth')) {
      console.error('   Hint: Please verify your MongoDB Atlas username and password in backend/.env.');
    } else if (error.message.includes('querySrv ENOTFOUND') || error.message.includes('querySrv ESERVFAIL')) {
      console.error('   Hint: DNS resolution issue. Verify your internet connection or network DNS servers.');
    }
    return null;
  }
};

module.exports = connectDB;
