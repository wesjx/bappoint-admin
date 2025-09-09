import { ArrowLeft, Car, Save } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type SettingsHeaderProps = {
  onSave: () => void
}


export default function SettingsHeader({ onSave }: SettingsHeaderProps) {

    return (
        <>
            <header className="px-4 lg:px-6 h-16 flex items-center bg-white border-b border-slate-200">
                <div className="flex items-center">
                    <Link href="/admin" className="flex items-center mr-4">
                        <ArrowLeft className="h-5 w-5 text-slate-600 hover:text-blue-600" />
                    </Link>
                    <Car className="h-8 w-8 text-blue-600" />
                    <span className="ml-2 text-xl font-bold text-slate-900">CleanCar Pro</span>
                    <Badge variant="secondary" className="ml-3 bg-green-100 text-green-800">
                        Settings
                    </Badge>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                    <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700">
                        <Save className="mr-2 h-4 w-4" />
                        Save Settings
                    </Button>
                    <Avatar>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                </div>
            </header>
        </>
    )
}