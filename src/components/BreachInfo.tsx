// components/BreachInfo.js
import React, { useEffect } from 'react';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "./ui/table"  
import { breachedDataType } from '@/pages';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';


interface BreachInfoProps {
    breachCount: number,
    breachData: breachedDataType
}

const BreachInfo = ({breachCount, breachData}: BreachInfoProps) => {

  const { toast } = useToast()


  const geolocateIP = async (ip: string) => {

      await fetch('/api/lookup/geolocate', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ip: ip,
        }),
        })
        .then(response => response.json()) 
        .then(data => {
            toast({
                title: `city: ${data.city}`,
                description: `country: ${data.country}`
            })
        })
        .catch((error) => console.error('Error:', error));
  }

  const isVPN = async (ip: string) => {

    await fetch('/api/lookup/geolocate', {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          ip: ip,
          vpn: true
      }),
      })
      .then(response => response.json()) 
      .then(data => {
          toast({
              title: `VPN: ${data}`,
          })
      })
      .catch((error) => console.error('Error:', error));
}

  return (
    <div className="w-1/2">
      <h2 className="text-xl font-semibold mb-4">Breach Information</h2>

      {/* Display credit score UI here */}
      <div className="mb-4">
        <p className='text-md font-light'>Breach Count: {breachCount}</p>
        <Progress value={breachCount} />
      </div>

      {/* Display previous passwords and other breach data here */}
      <div>
      <Tabs defaultValue="name" className="w-full">
        <TabsList>
            <TabsTrigger value="email">Emails</TabsTrigger>
            <TabsTrigger value="name">Names</TabsTrigger>
            <TabsTrigger value="phone">Phone Numbers</TabsTrigger>
            <TabsTrigger value="address">Addresses</TabsTrigger>
            <TabsTrigger value="dob">Date of Birth</TabsTrigger>
            <TabsTrigger value="password_plaintext">Plaintext Password</TabsTrigger>
            <TabsTrigger value="ip_address">IP Adds</TabsTrigger>
        </TabsList>
        
        {Object.keys(breachData).map((field, index) => (
            <TabsContent value={field} key={index}>
                <Table>
                    <TableBody>
                        { [...(breachData as any)[field]].map((labelFound: any, bindex) => (
                            <TableRow key={bindex}>
                            {field === "password_plaintext" ? (
                                    <>
                                        <TableCell className="font-medium">{labelFound.password}</TableCell>
                                        <TableCell className="font-medium">{labelFound.password_type}</TableCell>
                                    </>
                                ) : field === "ip_address" ? (
                                    <>
                                        <TableCell className="font-medium">{labelFound}</TableCell>
                                        <TableCell className="font-medium"><Button onClick={() => {
                                            geolocateIP(labelFound);
                                        }}>Geolocate</Button></TableCell>
                                        <TableCell className="font-medium"><Button onClick={() => {
                                            isVPN(labelFound);
                                        }}>VPN? 🤷‍♂️</Button></TableCell>
                                    </>
                                ) : (
                                    <TableCell className="font-medium">{labelFound}</TableCell>
                                )}
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TabsContent>
        ))}
        </Tabs>

      </div>
    </div>
  );
};

export default BreachInfo;