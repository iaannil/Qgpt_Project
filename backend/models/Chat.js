import mongoose from "mongoose"

const chatSchema =  new mongoose.Schema({
    userId : {type:String, ref:'user',required: true},
    userName : {type:String,required: true},
    name : {type:String,required: true},
    messages: [
        {
            isImage : {type:Boolean, required:true},
            isPublished : {type:Boolean, default:false},
            role : {type:String, required :true},
            content : {type:String, required :true},
            timestamp : {type:String, required :true},


        }
    ]
},{timestamp :true})

const Chat = mongoose.model('Chat',chatSchema)

export default Chat