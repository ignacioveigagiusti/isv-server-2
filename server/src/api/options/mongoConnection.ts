import mongoose, { ConnectOptions } from "mongoose";

async function mongoConnection(mongoURL: string) {
    try {
        // Connection
        const URL = mongoURL
        mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions)
    } catch (err) {
        throw err
    }
}

export default mongoConnection;