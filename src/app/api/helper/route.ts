import { dbConnect } from "@/lib/dbConnector";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // 1. Secure the endpoint using a secret token
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Connect using your custom connector
    await dbConnect();

    // 3. Issue a database ping command to trigger active traffic
    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().command({ ping: 1 });
    } else {
      throw new Error("Database instance not initialized properly");
    }

    return NextResponse.json({ success: true, message: 'Database pinged successfully' });
  } catch (error: any) {
    console.error('Database keep-alive ping failed:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
