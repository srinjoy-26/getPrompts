
import Prompt from "@/models/prompt"
import { connectToDB } from "@/utils/database"

//GET to read the request

export const GET = async (request , {params}) => {
  try{
    await connectToDB()
    
   const prompt = await Prompt.findById(params.id).populate('creator')

    if(prompt) {
      return new Response( JSON.stringify(prompt) , {status : 200}) 
    }
       return new Response('prompt not found' , {status : 404})
  }catch(err){
    return new Response('some error occured' , {status: 500})
  }
}

//PATCH to update a prompt

export const PATCH = async (request , {params} ) => {
  const {prompt , tag} = await request.json()

  try{
    await connectToDB()

    const existingPrompt = await Prompt.findById(params.id)

    if(existingPrompt) {
      existingPrompt.prompt = prompt
      existingPrompt.tag = tag

      await existingPrompt.save()
      return new Response( JSON.stringify(existingPrompt) , {status : 200}) 
    }
       return new Response('prompt not found' , {status : 404})

  }catch(err){

    return new Response('failed to update prompt' , {status: 500})

  }

}

//DELETE to delete a prompt

export const DELETE = async (request , {params}) =>{
  try{
    await connectToDB()

    const deletePrompt = await Prompt.findByIdAndDelete(params.id)

    return new Response('prompt successfully deleted' , {status: 200})
  }catch(err){
    return new Response('failed to delete prompt' , {status : 500})
  }
}