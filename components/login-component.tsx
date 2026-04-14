import { Show, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export default function LoginComponent() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="text-5xl font-bold flex gap-2 items-center justify-center">
                bAppoint.ie
            </h1>
            <p className="text-2xl pb-2.5">
                Admin page
            </p>

            <Show when="signed-in">
                <div className="flex flex-row gap-2.5">
                    <Button asChild className="font-sans">
                        <Link href="/bookings">
                            Bookings
                        </Link>
                    </Button>
                </div>

            </Show>
            <Show when="signed-out">
                <div className="flex gap-2 items-center justify-center">
                    <Button asChild size="lg" className=" font-sans cursor-pointer">
                        <SignInButton />
                    </Button>
                </div>
            </Show>
        </div>

    )
}