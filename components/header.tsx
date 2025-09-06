import { Car } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function () {
    return (
        <header className="px-4 lg:px-6 h-16 flex items-center bg-white border-b border-slate-200">
        <div className="flex items-center">
          <Car className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-slate-900">CleanCar Pro</span>
          <Badge variant="secondary" className="ml-3 bg-blue-100 text-blue-800">
            Admin
          </Badge>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <span className="text-sm text-slate-600">Bem-vindo, Administrador</span>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </header>
    )
}