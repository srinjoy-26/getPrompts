import { connectToDB } from "@/utils/database"
import Prompt from "@/models/prompt";


export const POST =  async (req , res) =>{
  const {userId , prompt , tag} = await req.json()

  try{
    await connectToDB();
    const newprompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    })

    await newprompt.save();
    return new Response(JSON.stringify(newprompt , {status : 201}))
  }catch(err){
    return new Response(`${err}` , {status: 500})


  }
  }
