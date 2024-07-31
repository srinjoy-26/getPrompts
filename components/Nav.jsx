'use client'

import Link from "next/link"
import Image from "next/image"
import { useState , useEffect } from "react"
import {signIn , signOut , useSession , getProviders} from 'next-auth/react'
 
import { useRouter } from "next/navigation"

const Nav = () => {
  const {data: session} = useSession();

  const [providers , setProviders] = useState(null);

  const [toggle , setToggle] = useState(false)

  

  useEffect(()=>{
    const setproviders = async () =>{
      const response = await getProviders();

      setProviders(response)
    }

    setproviders();
  } , [])

  

  return (
    <div className="flex-between pt-3 mb-12 w-full">
    <Link href='/' className="flex gap-2">
      <Image
       src='/assets/images/logo.svg'
       width={30}
       height={30}
       alt="logo"
      />
       <p className="logo_text">getprompts</p>
    </Link>

    <div className="sm:flex hidden">
      {
        session?.user ?( 
        <div className="flex gap-3 md:gsp-5">
           <Link href='/create-prompt' className="black_btn">
            Create Post
           </Link>
           <button type="button" className="outline_btn" onClick={signOut}>
            Sign Out
           </button>
           <Link href='/profile'>
            <Image 
            src={session?.user.image}
            width={37}
            height={37}
            alt="profile"
            className="rounded-full" />
           </Link>
        </div>):(
          <>
            {providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id) }
              className="black_btn"
              >
                Sign In
              </button>
            ))}
          </>
        )
      }
    </div>

    {/* mobile navigation */}

    <div className="sm:hidden flex relative">
         {
          session?.user ? (
            <>
            <Image 
            src={session?.user.image}
            width={37}
            height={37}
            alt="profile" 
            onClick={()=>{setToggle((prev) => !prev)}}/> 
            {toggle && ( <div className="dropdown">
                <Link className="dropdown_link" href='/profile' onClick={()=>{setToggle(false)}} >
                  My Profile
               </Link>
               <Link className="dropdown_link" href='/create-prompt' onClick={()=>{setToggle(false)}} >
                  Create Prompt
               </Link>
               <button type="button" className="black_btn w-full mt-3" onClick={signOut}>
            Sign Out
           </button>
              </div> )
            }</>
          ):(
            <>
            {providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)}
              className="black_btn"
              >
                Sign In
              </button>
            ))}
          </>
          )
         }
    </div>
     
    </div>
  )
}

export default Nav
