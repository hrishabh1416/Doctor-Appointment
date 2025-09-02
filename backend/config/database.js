import mongoose from 'mongoose'
export const connectDB=async function(){
const DBURL=process.env.ATLASDB_URL
try{
    await mongoose.connect(DBURL);
    console.log("DB connected")
}
catch(error) {
    console.log(error);
}
}