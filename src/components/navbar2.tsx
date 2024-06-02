import React from 'react';
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth'

export default function Navbar2() {
    const { data: session } = useSession();
    const user: User = session?.user
    return (
        <nav className='p-4 md:p-6 shadow-md w-full max-w-6xl mx-auto'>
        <div className="flex items-center  justify-between px-4  bg-white dark:bg-gray-800">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <span className="text-lg font-semibold">FYH our Homie</span>
            </Link>
            <div className="hidden md:flex gap-4 ">
                <Link href="/" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
                    Home
                </Link>
                <Link href="/about" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
                    About
                </Link>
                <Link href="/services" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
                    Services
                </Link>
                <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
                    Portfolio
                </Link>
                <Link href="/contact" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
                    Contact
                </Link>
                {
                    session ? (
                        <>
                            <Link href='/dashboard'>
                                <Button className="mr-4 w-full md:w-auto  bg-slate-900 text-white" >Dashboard</Button>
                            </Link>
                            {/* <Button className="w-full md:w-auto bg-slate-900 text-white" variant='outline' onClick={()=> signOut()}>Logout</Button> */}
                        </>
                    ) : (
                        <Link href='/sign-in'>
                            <Button className="w-full md:w-auto bg-slate-900 text-white" variant={'outline'}>Login</Button>

                        </Link>
                    )
                }
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="grid w-[200px] px-3 py-4">
                        <Link href="/" className="text-lg font-medium  hover:underline underline-offset-4" prefetch={false}>
                            Home
                        </Link>
                        <Link href="/about" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
                            About
                        </Link>
                        <Link href="/services" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
                            Services
                        </Link>
                        <Link href="/portfolio" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
                            Portfolio
                        </Link>
                        <Link href="/contact" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
                            Contact
                        </Link>
                        {
                            session ? (
                                <>
                                    <Link href='/dashboard'>
                                        <Button className="mr-4 w-full md:w-auto  bg-slate-900 text-white" >Dashboard</Button>
                                    </Link>
                                    {/* <Button className="w-full md:w-auto bg-slate-900 text-white" variant='outline' onClick={()=> signOut()}>Logout</Button> */}
                                </>
                            ) : (
                                <>
                                    <Link href='/sign-in'>
                                        <Button className="w-full md:w-auto bg-slate-900 text-white" variant={'outline'}>Login</Button>

                                    </Link>
                                    <div className="text-center mt-4">
                                        <p>
                                            Not a member yet?{' '}
                                            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                                                Sign up
                                            </Link>
                                        </p>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </SheetContent>
            </Sheet>
        </div>
        </nav>
    )
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}

