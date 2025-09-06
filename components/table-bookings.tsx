"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Phone,
  Mail,
} from "lucide-react"
import { scheduleDate, getStatusColor } from "@/public/mocks/statisticsMock"
import Link from "next/link"
import { CustomerSelected } from "@/types/CostumerSelected"

const getStatusIcon = (status: string) => {
  switch (status) {
    case "confirmed":
      return <CheckCircle className="h-4 w-4" />;
    case "pending":
      return <AlertCircle className="h-4 w-4" />;
    case "completed":
      return <CheckCircle className="h-4 w-4" />;
    case "canceled":
      return <XCircle className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

export default function TableBookings() {
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [search, setSearch] = useState<string>("")
  const [scheduleSelected, setScheduleSelected] = useState<CustomerSelected | undefined>()

  const appointmentsFiltered = scheduleDate.filter((schedule) => {
    const matchStatus = filterStatus === "all" || schedule.status === filterStatus
    const matchSearch =
      search === "" ||
      schedule.client.name.toLowerCase().includes(search.toLowerCase()) ||
      schedule.vehicle.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">

      <div className="flex-1 flex">
        <main className="flex-1 p-6">

          <Tabs defaultValue="lista" className="space-y-6">

            <TabsContent value="lista" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search costumer..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Appointments ({appointmentsFiltered.length})</CardTitle>
                  <CardDescription>Manage all your business's appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date/Time</TableHead>
                        <TableHead>Services</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointmentsFiltered.map((schedule) => (
                        <TableRow key={schedule.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage
                                  src={schedule.client.avatar || "/placeholder.svg"}
                                  alt={schedule.client.name}
                                />
                                <AvatarFallback>
                                  {schedule.client.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{schedule.client.name}</div>
                                <div className="text-sm text-muted-foreground">{schedule.client.phone}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {new Date(schedule.date).toLocaleDateString("pt-PT")}
                              </div>
                              <div className="text-sm text-muted-foreground">{schedule.time}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {schedule.services.map((service, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{schedule.vehicle}</div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">€{schedule.total}</div>
                              <div className="text-sm text-muted-foreground">Deposit: €{schedule.depositPaid}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(schedule.status)}>
                              {getStatusIcon(schedule.status)}
                              <span className="ml-1 capitalize">{schedule.status}</span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setScheduleSelected({ ...schedule, services: [...schedule.services] })}>
                                  See Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>Confirm</DropdownMenuItem>
                                <DropdownMenuItem >
                                  <Link href={`/admin/reschedule/${schedule.id}`}>
                                    Reschedule
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <Dialog open={!!scheduleSelected} onOpenChange={() => setScheduleSelected(undefined)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Agendamento</DialogTitle>
            <DialogDescription>Informações completas do schedule</DialogDescription>
          </DialogHeader>
          {scheduleSelected && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {scheduleSelected.client.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{scheduleSelected.client.name}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4" />
                        <span>{scheduleSelected.client.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4" />
                        <span>{scheduleSelected.client.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Appointment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Date and Time</div>
                      <div className="font-medium">
                        {new Date(scheduleSelected.date).toLocaleDateString("en-GB")} at {scheduleSelected.time}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Status</div>
                      <Badge className={getStatusColor(scheduleSelected.status)}>
                        {scheduleSelected.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Services and Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Selected Services</div>
                      <div className="space-y-1">
                        {scheduleSelected.services.map((service: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div>
                        <div className="text-sm text-muted-foreground">Total</div>
                        <div className="text-lg font-bold">€{scheduleSelected.total}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Deposit Paid</div>
                        <div className="text-lg font-bold text-green-600">€{scheduleSelected.depositPaid}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Remaining</div>
                        <div className="text-lg font-bold text-orange-600">
                          €{scheduleSelected.total - scheduleSelected.depositPaid}
                        </div>
                      </div>
                    </div>
                    {scheduleSelected.notes && (
                      <div>
                        <div className="text-sm text-muted-foreground">Notes</div>
                        <div className="text-sm bg-slate-50 p-2 rounded">{scheduleSelected.notes}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setScheduleSelected(undefined)}>
                  Close
                </Button>
                <Button variant="outline">
                  <Link href={`/admin/reschedule/${scheduleSelected.id}`}>
                    Reschedule
                  </Link>
                </Button>
                <Button>Confirm Appointment</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div >
  )
}
