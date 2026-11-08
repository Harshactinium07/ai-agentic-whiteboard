"use client"
import { UserDetailContext } from "@/context/UserDetailContext";
import React,{useEffect,useState} from 'react'
import axios from 'axios'

function provider({children}: {children: React.ReactNode}) {
    const [userDetail, setUserDetail] = useState<any>()
    useEffect(() => {
        CreateNewUser()
    }, [])  
    const CreateNewUser = async () => {
        const result = await axios.POST("/api/users")
        console.log(result.data)
        setUserDetail(result.data)
    }
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  )
}

export default provider