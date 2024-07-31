import { connectToDB } from "@/utils/database"
import Prompt from "@/models/prompt";

export const GET = async (request) =>{
  try{
    await connectToDB();
    const prompts = await Prompt.find({}).populate('creator'); 
    
    //The populated creator field allows us to access the properties of the user who created the prompt.Else the creator field will only have the object id of the referred documents. Not the access to detailed properties of the documents (example here the User document , check prompt model !)

    return new Response(JSON.stringify(prompts) , {status: 200})
  }catch(error){
    console.log(error)
     return new Response('prompt couldnot be fetched' , {status: 500})
  }
}
