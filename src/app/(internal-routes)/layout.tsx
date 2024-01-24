
// import { getServerSession } from "next-auth/next";
// import { ReactNode } from "react";

// import { redirect } from "next/navigation";
// import { authOptions } from "../api/auth/[...nextauth]/route";

// interface PrivateLayoutProps{
//     children: ReactNode
// }

// export default async function PrivateLayout({children}: PrivateLayoutProps){
//     const session = await getServerSession(authOptions);

//     console.log("Sessão aqui "+session)

//     if(!session){
//         redirect('/login')
//     }

//     return <>{children}</>
// }