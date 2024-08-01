"use client"
import Image from "next/image"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname , useRouter } from "next/navigation"

const Promptcard = ({post  , handleClick , handleEdit , handleDelete }) => {
  const [copied , setCopied] = useState(false)

  const HandleCopy = ()=>{
    setCopied(true)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(false) , 3000)
  }

  const {data : session} = useSession();

  const pathname = usePathname()
  const router = useRouter()

  const getProfile = () => {
    if(session?.user.id == post.creator._id){
      router.push('/profile')
    }else{
      router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
      
    }
  }
  
  

  return (
    <div className="shadow-lg w-full md:w-[360px] rounded-md flex flex-col gap-4 p-3 ">
       <div className="flex justify-between items-start">
         <div className="flex items-center gap-3 cursor-pointer" onClick={getProfile}>
          <Image
           src={post.creator.image}
           alt="profile-img"
           width={40}
           height={40}
           className="rounded-full cursor-pointer"
          />

         <div className="flex flex-col">
          <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username.toLowerCase()}</h3>
          <p className="font-inter text-sm text-slate-600">{post.creator.email}</p>
         </div>
         </div>

         <div className="copy_btn" onClick={HandleCopy}>
            <Image
              src={copied ? '/assets/icons/tick.svg' :  '/assets/icons/copy.svg' }
              alt="copy"
              width={12}
              height={12}
               />
         </div>
         
       </div>

       <div className="flex flex-col gap-3">
        <h3 className="font-satoshi text-sm text-gray-500">{post.prompt}</h3>
        <span className="font-satoshi text-sm text-blue-500 cursor-pointer" onClick={() => handleClick(post.tag)}>#{post.tag}</span>
       </div>
        
        {session?.user.id === post.creator._id && pathname === '/profile' && 
          <div className="flex gap-2">
            <button className="py-1.5 px-3 rounded-md shadow-sm shadow-blue-500 text-blue-500 text-sm font-satoshi" onClick={()=>handleEdit(post)}>Edit</button>
            <button className="py-1.5 px-3 rounded-md shadow-sm shadow-red-500 text-red-500 text-sm font-satoshi" onClick={()=>handleDelete(post)}>Delete</button>
          </div>
        }
       
    </div>
  )
}

export default Promptcard
