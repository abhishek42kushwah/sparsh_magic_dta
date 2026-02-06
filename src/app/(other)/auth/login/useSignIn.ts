import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as yup from 'yup'

import { useAuthContext } from '@/context/useAuthContext'
import { useNotificationContext } from '@/context/useNotificationContext'
import { BASE_URL } from '@/types/validationSchema'

const useSignIn = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { saveSession } = useAuthContext()
  const { showNotification } = useNotificationContext()


  const loginFormSchema = yup.object({
    work_email: yup.string().required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
  })


  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      work_email: '',
      password: '',
    },
  })


  const redirectUser = () => {
    const redirectLink = searchParams.get('redirectTo')

    if (redirectLink) {
      navigate(redirectLink)
    } else {
      navigate('/dashboard/ecommerce')
    }
  }


  const login = handleSubmit(async (values) => {
    setLoading(true)

    try {
      const response = await fetch(`${BASE_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

     
      if (!response.ok || !data.access_token) {
        throw new Error('Invalid email or password')
      }

     
      const sessionData = {
        token: data.access_token,
        tokenType: data.token_type,
      }

      saveSession(sessionData as any)

      showNotification({
        message: 'Login successful! Redirecting...',
        variant: 'success',
      })

      redirectUser()
    } catch (error: any) {
      showNotification({
        message: error.message || 'Login failed. Please try again.',
        variant: 'danger',
      })
    } finally {
      setLoading(false)
    }
  })

  return {
    loading,
    login,
    control,
  }
}

export default useSignIn
