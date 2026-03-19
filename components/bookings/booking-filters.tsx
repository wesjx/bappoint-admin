"use client"


import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


type Props = {
search: string;
onSearch: (v: string) => void;
status: string;
onStatusChange: (v: string) => void;
};


export function BookingsFilters({ search, onSearch, status, onStatusChange }: Props) {
return (
<div className="flex flex-col sm:flex-row gap-4">
<div className="flex-1 relative">
<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
<Input placeholder="Search customer..." value={search} onChange={(e) => onSearch((e.target as HTMLInputElement).value)} className="pl-8" />
</div>


<Select value={status} onValueChange={onStatusChange}>
<SelectTrigger className="w-[180px]">
<SelectValue placeholder="Status" />
</SelectTrigger>
<SelectContent>
<SelectItem value="all">All Statuses</SelectItem>
<SelectItem value="pending">Pending</SelectItem>
<SelectItem value="confirmed">Confirmed</SelectItem>
<SelectItem value="completed">Completed</SelectItem>
<SelectItem value="canceled">Canceled</SelectItem>
</SelectContent>
</Select>
</div>
);
}