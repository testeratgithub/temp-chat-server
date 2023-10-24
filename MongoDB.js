

const urls = "mongodb+srv://testtesty:Passw0rd@clusterdemo.p664txi.mongodb.net/?retryWrites=true&w=majority"



class MongoDB{
    constructor(uri){
        const {MongoClient} = require('mongodb')
        this.o_id = require('mongodb').ObjectId
        const client = new MongoClient(uri)
        try{
            client.connect()
        }
        catch{
            console.log("DB Connection isuess")
            client.connect()
        }
                
        this.connection = client.db('Chat_app').collection('userdata')
    
        console.log("Connection Establised")
        this.end_con = ()=>{
            client.close()
            console.log('Send')
        }
    }
    async insert(data){
        await this.connection.insertOne(data)
    }
    async update(id,data){
        await this.connection.updateOne({_id:new this.o_id(id)},{$set:{foodName:data}})
    }
    async delete(id){
        await this.connection.deleteOne({_id:new this.o_id(id)})
    }
    async find(q){
        const data = await this.connection.find(q).toArray()
        return data    
    }
    async end(){
        await this.end_con()
    }

}

const mongo = new MongoDB(urls)
// mongo.find().then((data)=>{console.log(data[0].Username)})
module.exports=mongo;