import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' }
			},

			async authorize(credentials, req) {

                try {
                    const response = await fetch('http://localhost:8080/v1/user/login', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        })
                    })

                    console.log("Response: "+response)
    
                    const user = await response.json()
    
                    if (user && response.ok) {
                        return user
                    }
                } catch (error) {
                    throw new Error
                    return null
                }	
			},
		})
	],
    secret: process.env.NEXTAUTH_SECRET,
    debug: false,
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET
    },
    useSecureCookies: true,

    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user)
            return token
        },
        async session({ session, token }){
            session = token.user as any
            return session
        }
    },
        
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }