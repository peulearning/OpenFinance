'use client';

import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage(){

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  return (

    <h1>Testando</h1>

  );

}