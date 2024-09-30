import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import db from '@repo/db'

export const authOptions:NextAuthOptions = {
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!
        }),
        
    ],
    adapter:PrismaAdapter(db),

    callbacks:{
        async jwt({token,account,profile}){;
            if(account){
                token.accessToken = account.access_token;
                token.idToken = account.id_token;
            }
            return token;
        },
        async session({session,token,user}:any){
            session.accessToken = token.accessToken;
            session.user.id = token.id 
            return session
        }


    }
} 
export default NextAuth(authOptions)