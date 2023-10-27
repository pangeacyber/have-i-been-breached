import { CallbackParams, useAuth } from '@pangeacyber/react-auth'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthScreen from '@/components/ui/AuthScreen';


export default function Home() {
  const { user, authenticated, login } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if(authenticated) {
      router.push('/chat')
      console.log("ROUTUER PUSHED CHAT");
    }
  }, [user, authenticated])

  return (
    <AuthScreen login={login} />
  )
}