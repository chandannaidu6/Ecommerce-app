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
        async jwt({token,account,user}){
            if(user){
                token.id = user.id
            }
            if(account){
                token.accessToken = account.access_token;
                token.idToken = account.id_token;
            }
            return token;
        },
        async session({session,token}:any){
            if(token){
                session.accessToken = token.accessToken as string;
                session.user.id = token.id as string;
                session.idToken = token.idToken as string;

            }
  
            return session
        }


    }
} 
export default NextAuth(authOptions)