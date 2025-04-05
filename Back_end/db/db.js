import mongoose from "mongoose";
const connectTodatabase=async() => {
    try {
await mongoose.connect("mongodb://wassima:wassima2002@pfa-shard-00-00.a8w2b.mongodb.net:27017,pfa-shard-00-01.a8w2b.mongodb.net:27017,pfa-shard-00-02.a8w2b.mongodb.net:27017/?replicaSet=atlas-6s05p3-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=PFA&tlsAllowInvalidCertificates=true");
      
    } catch (error) {
       console.log(error) 
    }
}
export default connectTodatabase;
