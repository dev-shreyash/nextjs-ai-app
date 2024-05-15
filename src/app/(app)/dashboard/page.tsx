import { useToast } from '@/components/ui/use-toast'
import { Message } from '@/model/user.model'
import { acceptMessages } from '@/schemas/acceptMessageSchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  const {toast} =useToast()

  const handleDeleteMessage = (messageId:string)=>{
    setMessages(messages.filter((message)=> message._id !== messageId))
  }

  const {data:session}=useSession()

  const form =useForm({
    resolver:zodResolver(acceptMessages)
  })

  const {register, watch, setValue}=form

  const AcceptMessages=watch('AcceptMessages')

  const fetchAcceptMessage =useCallback(async()=>{
    setIsSwitchLoading(true)
    try {
      const response =await axios.get<ApiResponse>('/api/accept-messages')

      setValue('AcceptMessages',response.data.isAcceptingMessages)
    } catch (error) {
      const  axiosError = error as AxiosError<ApiResponse>
      toast({
        title:axiosError.response?.data.message,
        description:'Failed to fetch messages',
        variant:"destructive"
      })
    }finally{
      setIsSwitchLoading(false)
    }
  },[setValue])


  const fetchMessages =useCallback(async(refresh:boolean =false)=>{
    setIsLoading(true)
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages')
      setMessages(response.data.messages || [])

      if (refresh) {
        toast({
          title:"Refreshed Messages",
          description:'Showing latest messages',
        })
      }
    } catch (error) {
      const  axiosError = error as AxiosError<ApiResponse>
      toast({
        title:axiosError.response?.data.message,
        description:'Failed to fetch messages',
        variant:"destructive"
      })
    }finally{
      setIsLoading(false)
      setIsSwitchLoading(false)
    }
  },[setIsLoading,setMessages])


  useEffect(()=>{
    if (!session || !session.user) return
      fetchMessages()
      fetchAcceptMessage()
    
  },[session,setValue, fetchAcceptMessage, fetchMessages])

  //switch change

  const handleSwitchChange= async()=>{
    try {
      const response= await axios.post<ApiResponse>('/api/accept-messages',{
        acceptMessages: !acceptMessages
      })
      setValue('acceptMessage',!acceptMessages)
      toast({
        title:response.data.message,
        description:'Messages accepted',
        variant:"default"
      })
    } catch (error) {
      const  axiosError = error as AxiosError<ApiResponse>
      toast({
        title:axiosError.response?.data.message,
        description:'Failed to fetch message setting',
        variant:"destructive"
      })
    }
  }

  

  if(!session || session.user){
    return <div>Please login</div>
  }

  return (
    <div>
      dashboard
    </div>
  )
}

export default Page
