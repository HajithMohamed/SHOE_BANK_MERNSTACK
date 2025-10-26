const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URI}/Shoe-Bankk`);
        console.log('Database connected successfully!!');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectToDB;