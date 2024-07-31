'use client'
import Profile from "@/components/Profile"
import { useState , useEffect} from "react"
import { useSearchParams } from "next/navigation"

const Userprofile = ({params}) => {
  const [posts , setposts] = useState([])
  const searchparams = useSearchParams()
  const name = searchparams.get('name')

  useEffect(()=>{
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`)
      const data = await response.json()

      setposts(data)

    }

    params.id && fetchPosts()
  },[params])
  
  return (
    <Profile
     name={`${name}'s`}
     desc= {`welcome to ${name}'s personalized profile page. Explore ${name}'s exceptional prompts inspired by their imagination`}
     data= {posts}
     
     
    />
  )
}

export default Userprofile
