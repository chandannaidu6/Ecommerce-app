import React from 'react'
import  Link  from 'next/link'
import { useSession,signOut } from 'next-auth/react'

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
    const {data:session} = useSession()

    return(
        <div className='flex flex-col min-h-screen'>
            <header className='bg-blue-600 text-white'>
                <nav  className='container mx-auto flex justify-between items-center p-4'>
                    <Link href='/'>
                        <span className="text-2xl font-bold cursor-pointer">MyStore</span>
                    </Link>
                    <div className='flex items-center'>
                        <Link href='/products'>
                        <span className="text-2xl font-bold cursor-pointer">MyStore</span>
                        </Link>
                        <div className='flex items-center'>
                            <Link href='/products'>
                                <span className="mr-4 cursor-pointer">Products</span>
                            </Link>
                            <Link href='/cart'>
                                <span className="mr-4 cursor-pointer">Cart</span>
                            </Link>

                            {session ? (
                                <>
                                    <Link href="/orders">
                                    <span className="mr-4 cursor-pointer">Orders</span>
                                    </Link>
                                    <Link href="/profile">
                                    <span className="mr-4 cursor-pointer">Profile</span>
                                    </Link>
                                    <button onClick={() => signOut()} className="text-red-300">
                                    Sign Out
                                    </button>
                                
                                </>
                            ):(
                                <Link href="/api/auth/signin">
                                <span className="cursor-pointer">Sign In</span>
                                </Link> 
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            <main className='flex-grow container mx-auto p-4'>{children}</main>

            <footer className='bg-gray-800 text-white text-center p-4'>
                &copy; {new Date().getFullYear()} MyStore
            </footer>
        </div>
    )
}

export default Layout