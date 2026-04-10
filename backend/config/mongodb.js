import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error("MONGODB_URI is not set in backend/.env");
        }

        mongoose.connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        });

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000
        });

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        if (
            error.message.includes("whitelist") ||
            error.message.includes("Could not connect to any servers")
        ) {
            console.error(
                "Atlas network access issue: add your current IP in Atlas > Network Access, or temporarily allow 0.0.0.0/0 for testing."
            );
        }
        if (
            error.message.includes("querySrv ETIMEOUT") ||
            error.message.includes("ENOTFOUND")
        ) {
            console.error(
                "DNS/network issue reaching Atlas. Check internet/firewall/VPN and verify the cluster hostname in MONGODB_URI."
            );
        }
        process.exit(1); // stops server clearly
    }
};

export default connectDB;
