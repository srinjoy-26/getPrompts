//we'll use the same code as create prompt with minor changes  since during update prompt we need the previous prompt data too

"use client"

import { useState  , useEffect , Suspense} from "react"

import { useRouter , useSearchParams } from "next/navigation"
import Form from "@/components/Form"

const Editprompt = () => {
  
  const [submitting , setSubmitting] = useState(false);
  const[post , setPost] = useState({
    prompt: '',
    tag: '',
  })
  
  const router = useRouter()
  const searchParams = useSearchParams()

  const promptId = searchParams.get('id') ; 

  useEffect(()=>{
    const getPromptDetails = async () => {
       const response = await fetch(`/api/prompt/${promptId}`);
       const data = await response.json();
       
       setPost({
        prompt: data.prompt,
        tag: data.tag,
       })
    }
    
    promptId && getPromptDetails()
  },[promptId])

  const Updateprompt = async (e) => {
    !promptId && alert('promptID not found')
      e.preventDefault()
      setSubmitting(true)

      try{
        const response = await fetch(`/api/prompt/${promptId}` , {
          method: 'PATCH',
          body: JSON.stringify({
            prompt : post.prompt,
            tag: post.tag,
          })
        })

        if(response.ok){
          router.push('/');
        }
      }catch(err){
      console.log(err)
  }finally{
    setSubmitting(false)
  }
}


  return (
   <Form
     type = 'Edit'
     post = {post}
     setPost = {setPost}
     submitting = {submitting}
     handleSubmit = {Updateprompt}
   />
  )
}

const EditPromptPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Editprompt />
  </Suspense>
);

export default EditPromptPage;