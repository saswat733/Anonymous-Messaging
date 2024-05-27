import mongoose, { Connection } from "mongoose";

/*
nextjs is ontime application which runs the backend when the request is made not like simple mern stack app where backend runs continuosly
firstly check wheteher there is already a database conncection if it is not then make a new connection
*/



// check for the connection
type ConnectionObject={
    isConnected?:number
}

const connection: ConnectionObject={}

async function dbConnect(): Promise<void>{

    //check for the connection of database
    if(connection.isConnected){
        console.log('already connected to database')
        return
    }

    // incase if DB is not connected
    try {
        const db=await mongoose.connect(process.env.MONGODB_URI || '',{})

        //we exxtract first value from connection array which is in ready state
        connection.isConnected=db.connections[0].readyState

        console.log('DB connected successfully');

    } catch (error) {
        console.log('database connection failed:',error);
        process.exit(1)
    }
}


export default dbConnect