import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


const DashboardPage = ()=>{
    return (
        <>
        <p>Dashboard page</p>
        <UserButton afterSignOutUrl="/"/>
        </>
    )
}

export default DashboardPage