"use client";

import { useSession } from "next-auth/react";

export default function Account() {
  const {data: session, status} = useSession();
  if(status === 'loading') {
    return <p>Please wait...</p>
  }
  return (
    <>
    <div>
        Bem-vindo(a),{session?.user?.name}
    </div>
    </>
  )
}