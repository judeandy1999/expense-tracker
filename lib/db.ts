import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log('connected');
    return;
  }

  if (connectionState === 2) {
    console.log('connecting');
    return;
  }

  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: 'restapifinance',
      bufferCommands: true
    });
    console.log('connected')
  } catch(error: any) {
    console.log(error);
    throw new Error("Error: ", error);
  }
};

export default connect;
