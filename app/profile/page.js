"use client"

import { useState , useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@/components/Profile"

const MyProfile = () => {
  const [posts , setPosts] = useState([]);
  const {data : session} = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () =>{
      const Response = await fetch(`api/users/${session?.user.id}/posts`);
      const data = await Response.json();

      setPosts(data)
    }

   session?.user.id && fetchPost()
  },[session])

  const handleEdit = (p) => {
     router.push(`/update-prompt?id=${p._id}`)
  }  

  const handleDelete = async (p) => {
     

    const hasConfirmed = confirm('are you sure you want to delete this post ?')

    if(hasConfirmed){
      try{
        await fetch(`/api/prompt/${p._id}` , {
        method: 'DELETE'
       });
        
       const filteredposts = posts.filter((post) => post._id !== p._id)

       setPosts(filteredposts)
       router.refresh();


     }catch(err){

      console.log(err)

     }
   }
}
 
  return (
    <Profile
     name="My"
     desc= "welcome to your personalized profile page"
     data= {posts}
     handleEdit= {handleEdit}
     handleDelete= {handleDelete}
    />
  )
}

export default MyProfile
