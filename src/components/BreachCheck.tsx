// components/BreachCheck.js
import React, { ChangeEvent, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { breachedDataType } from '@/pages';
import { Checkbox } from './ui/checkbox';
import { useToast } from './ui/use-toast';

interface BreachCheckProps {
    setBreachCount: Function;
    setBreachData: Function;
    breachData: breachedDataType;
}

const BreachCheck = ({setBreachCount, setBreachData, breachData}: BreachCheckProps) => {
  const [email, setEmail] = useState('');
  const [termsChecked, setTermsChecked] = useState(true);
  const ref = React.useRef(null);
  const { toast } = useToast()

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const formatAddress = (datum: any) => {
    let address = "";
    if ("address_1" in datum) { address += (datum.address_1 + ", ") }
    if ("address_2" in datum) { address += (datum.address_2 + ", ") }
    if ("city" in datum) { address += (datum.city + ", ") }
    if ("state" in datum) { address += (datum.state + ", ") }
    if ("country" in datum) { address += (datum.country) }
    
    return address;
  }

  const appendIPs = (datum: any, currentSet: Set<string>) => {
    try {
        Object.values(datum.ip_addresses).forEach((currentSet as any).add, currentSet)
    } catch (e) {
        console.error(e);
    }

    return currentSet
  }
  

  const handleSubmit = async () => {
    if(termsChecked === true) {
      await fetch('/api/log', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
        }),
        })
        .then(response => response.json()) 
        .then(data => {
            toast({
                title: `Successfully enrolled in the Raffle 🎉`,
            })
        })
        .catch((error) => console.error('Error:', error));

    }

    setBreachData({
        "name": new Set(),
        "phone": new Set(),
        "dob": new Set(),
        "address": new Set(),
        "email": new Set(),
        "password_plaintext": new Set(),
        "ip_address": new Set()
    })

    await fetch('/api/lookup/user', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: email,
    }),
    })
    .then(response => response.json()) 
    .then(data => {
        setBreachCount(data.data.breach_count)

        if ("raw_data" in data && "results" in data.raw_data) {
            data.raw_data.results.forEach((datum: any) => {
                setBreachData((prevData: any) => ({
                    name: "full_name" in datum ? prevData.name.add(datum.full_name) : prevData.name,
                    phone: "phone" in datum ? prevData.phone.add(datum.phone) : prevData.phone,
                    dob: "dob" in datum ? prevData.dob.add(datum.dob) : prevData.dob,
                    address: formatAddress(datum) != "" ? prevData.address.add(formatAddress(datum)) : prevData.address,
                    email: "backup_email" in datum ? prevData.email.add(datum.backup_email) : prevData.email,
                    password_plaintext: "password_plaintext" in datum ? prevData.password_plaintext.add({
                        "password": datum.password ? datum.password : "",
                        "password_type": datum.password_type ? datum.password_type : ""
                    }) : prevData.password_plaintext,
                    ip_address: "ip_addresses" in datum ? appendIPs(datum, prevData.ip_address) : prevData.ip_address
                }))
            })
        }
    }) 
    .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="w-1/3 mr-4">
      <h2 className="text-xl font-semibold mb-4">Have I been breached?</h2>
      {/* <input
        type="text"
        placeholder="Enter your email"
        className="w-full p-2 mb-2 border rounded"

      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Check
      </button> */}
        <div className="flex w-full max-w-sm items-center space-x-2 mb-2">
            <Input type="email" placeholder="Email"
                    value={email}
                    onChange={handleEmailChange} />
            <Button type="submit"
            onClick={handleSubmit}>Check 🕵️‍♀️</Button>
        </div>
        <div className="items-top flex space-x-2">
      <Checkbox id="terms1" ref={ref} checked={termsChecked} onCheckedChange={checked => {
        setTermsChecked(!termsChecked)
      }} />
      <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Sign up for LEGO Raffle 🎟️
          </label>
          <p className="text-sm text-muted-foreground">
            You agree to let Pangea store your email for the purposes of the raffle.
          </p>
        </div>
      </div>


      {/* Display breach data here once available */}
      {/* {breachData && (
        <div className="mt-4">
        </div>
      )} */}
    </div>
  );
};

export default BreachCheck;