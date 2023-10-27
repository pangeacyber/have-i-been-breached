import { Kanit } from 'next/font/google'
import BreachCheck from '@/components/BreachCheck'
import BreachInfo from '@/components/BreachInfo'
import { useState } from 'react'
import { Toaster } from '@/components/ui/toaster'
import Link from 'next/link'
import { useAuth } from '@pangeacyber/react-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const kanit = Kanit({ weight: '400', subsets: ['latin'] })

export interface breachedDataType {
  name?: Set<string>;
  phone?: Set<string>;
  dob?: Set<string>;
  address?: Set<string>;
  email?: Set<string>;
  plaintext_password?: Set<string>;
  ip_address?: Set<string>;
}

export default function Chat() {
  const [breachCount, setBreachCount] = useState(0);
  const [breachData, setBreachData] = useState({
    "name": new Set(),
    "phone": new Set(),
    "dob": new Set(),
    "address": new Set(),
    "email": new Set(),
    "password_plaintext": new Set(),
    "ip_address": new Set()
  })

  const {authenticated, login, logout, user} = useAuth();
  const router = useRouter();

  

  useEffect(() => {
    if(!authenticated) {
      router.push('/')
    }
  }, [user, authenticated])
 

  return (
    <>
    {authenticated ? (
      <main
        className={`min-h-screen justify-between p-24 ${kanit.className}`}
      >
        <div className='flex flex-row'>
          <BreachCheck setBreachCount={setBreachCount} setBreachData={setBreachData} breachData={breachData} />
          <BreachInfo breachCount={breachCount} breachData={breachData} />
        </div>
        <Toaster />
        <div className='flex-grow flex items-end justify-center pb-4'>
            <p className='text-center font-bold mt-8'>Powered by <Link href="https://pangea.cloud/" className='text-indigo-700'>Pangea</Link></p>
        </div>
      </main>
    ): (
      <></> 
    )}
    </>
  )
}
