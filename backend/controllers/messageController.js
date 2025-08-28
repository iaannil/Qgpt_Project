import axios from 'axios'
import Chat from "../models/Chat.js"
import User from "../models/User.js"
import imagekit from '../configs/imageKit.js'


//Text based Ai chat message controller
export const textMessageController = async ( req,res) =>{
    try {
        const userId = req.user._id

        //Check credits
        if(req.user.credits < 1 ){
            return res.json({success:false,message:"You don't have enough credits to use this feature"})
        }

        const[chatId, prompt] = req.body

        const chat = await Chat.findOne({userId, _id: chatId})
        chat.messages.push({role:"user",content:prompt,timestamp:Date.now(),isImage:false})

//openai code

        const {choices} = client.chat.completions.create({
    model:"gemini-2.5-flash",
    messages:[
        {
            role: "user",
            content: prompt
        }
    ]
    })
    const reply = {...choices[0].message , timestamp:Date.noe(),isImage:false}
    
    res.json({success:true, reply})

    chat.messages.push(reply)
    await chat.save()
    
    await User.updateOne({_id:userId},{$inc:{credits: -1}})


    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

//image generation message controller

export const imageMessageController = async (req,res) => {
    try {
        const userId = req.user._id;
        //check credits
        if(req.user.credits < 2){
            return res.json({
                success : false,message:"You don't have enough credits to use this feature"
            })
            
        }
        const {prompt, chatId,isPublished} = req.body
            //find chat
        const chat = await Chat.findOne({userId, _id:chatId})
       
        //push user message
        chat.messages.push({
            role:"user",content:prompt, timestamp:Date.now(),
            isImage:false
        })

        //Encode the Prompt
        const encodedPrompt = encodeURIComponent(prompt)

        //constructed imagekit Ai generation

        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/Qgpt/${Date.now()}.png?tr=w-800,h-800` ;
//trigger generation by fetching from imagekit
        const aiImageResponse = await axios.get(generatedImageUrl, {responseType:"arraybuffer"})

        //conver to base64

        const base64Image =`data:image/png;base64,${Buffer.from(aiImageResponse.data,'binary').toString('base64')}`;

        //upload iagekit to media library
        
        const uploadResponse = await imagekit.upload({
            file:base64Image,
            filaName: `${Date.now()}.png`,
            folder:"Qgpt"
        })

        const reply = {role:'assistant',content:uploadResponse.url , timestamp:Date.noe(),isImage:true,isPublished}
        res.json({success:true, reply})

        chat.messages.push(reply)
        await chat.save()

        await User.updateOne({_id:userId},{$inc:{credits: -2}})


    } catch (error) {
        res.json({success:false,message:error.message})
    }
}