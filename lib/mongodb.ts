import mongoose from 'mongoose';

const connectDB = async (URL?: string) => {
    try {
        const dbURL = URL || process.env.MONGODB_URI;
        if (!dbURL) {
            throw new Error('MongoDB URI is not provided');
        }

        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // Other options if needed
        } as any;

        await mongoose.connect(dbURL, options);
        console.log('Database Connected Successfully');
    } catch(error) {
        console.log('Error db connectivity: ', error);
    }
};

export default connectDB;
