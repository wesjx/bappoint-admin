"use client"


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { getStatusColor, getStatusLabel } from "@/app/utils/status";



type Props = {
    schedule: any;
    onSeeDetails: (s: any) => void; 
};


export default function BookingRow({ schedule, onSeeDetails }: Props) {
    return (
        <tr className="border-t">
            <td className="p-3 align-top">
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage src={schedule.client.avatar || "/placeholder.svg"} alt={schedule.client.name} />
                        <AvatarFallback>{schedule.client.name.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{schedule.client.name}</div>
                        <div className="text-sm text-muted-foreground">{schedule.client.phone}</div>
                    </div>
                </div>
            </td>


            <td className="p-3 align-top">
                <div>
                    <div className="font-medium">{new Date(schedule.date).toLocaleDateString("pt-PT")}</div>
                    <div className="text-sm text-muted-foreground">{schedule.time}</div>
                </div>
            </td>


            <td className="p-3 align-top">
                <div className="space-y-1">
                    {schedule.services.map((service: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">{service}</Badge>
                    ))}
                </div>
            </td>


            <td className="p-3 align-top">{schedule.vehicle}</td>


            <td className="p-3 align-top">
                <div className="font-medium">€{schedule.total}</div>
                <div className="text-sm text-muted-foreground">Deposit: €{schedule.depositPaid}</div>
            </td>


            <td className="p-3 align-top">
                <Badge className={getStatusColor(schedule.status)}>
                    {getStatusLabel(schedule.status)} <span className="ml-1 capitalize">{schedule.status}</span>
                </Badge>
            </td>


            <td className="p-3 align-top">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onSeeDetails({ ...schedule, services: [...schedule.services] })}>See Details</DropdownMenuItem>
                        <DropdownMenuItem>Confirm</DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/admin/reschedule/${schedule.id}`}>Reschedule</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </td>
        </tr>
    );
}