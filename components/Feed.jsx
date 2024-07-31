"use client"

import { useEffect, useState } from "react"
import Promptcard from "./Promptcard"

const Feed = () => {
  const [searchText , setSearchText] = useState('')
  const [post , setPost] = useState([])
  useEffect(() => {
    const fetchPost = async () =>{
      const Response = await fetch('api/prompt');
      const data = await Response.json();

      setPost(data)
    }

    fetchPost()
  },[])

  const HandleSearch = (e) =>{
     setSearchText(e.target.value)
  }

  const handleTagClick = (tag)=>{
    setSearchText(tag)
  }

  
  return (
    <>
    <div className="feed ">
      <form className="relative flex-center w-full">
        <input
         type="text"
         value={searchText}
         placeholder="enter a tag or username"
         onChange={(e) => HandleSearch(e)}
         required
         className="search_input peer"
        />
      </form>

      
    </div>

    <div className="mt-16 flex gap-3 w-full flex-col justify-start items-center lg:flex-row lg:items-start lg:flex-wrap pb-6">
         {post.filter((p)=> {
            if(searchText === ''){
              return p
            }else{
              return p.prompt.includes(searchText) || p.tag.includes(searchText) || p.creator.username.includes(searchText)
            }
         }).map((p) => (
          <Promptcard key={p._id} post = {p} handleClick = {handleTagClick}/>
         ))}
      </div>
    </>
  )
}

export default Feed
