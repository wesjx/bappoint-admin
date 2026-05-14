"use client"
import { Settings } from "lucide-react";
import { Badge } from "./ui/badge";
import { Show, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function () {
  const usePathName = usePathname();
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-white border-b border-slate-200">
      <div className="flex items-center">
        <span className="ml-2 text-xl font-bold text-slate-900">bAppoint.ie</span>
        <Badge variant="secondary" className="ml-3 bg-blue-100 text-blue-800">
          Admin
        </Badge>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <div>
          <Show when="signed-out">
          </Show>
          <Show when="signed-in">
            <UserButton showName appearance={{
              elements: {
                userButtonBox: "max-w-[140px]"
              }
            }} />
          </Show>
        </div>
        {usePathName === "/admin" && (
          <Button size="icon">
            <Link href='/admin/settings'>
              <Settings />
            </Link>
          </Button>
        )}
      </div>
    </header>
  )
}