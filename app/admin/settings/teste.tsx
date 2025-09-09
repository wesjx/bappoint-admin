"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Car, Settings, Clock, CalendarX, Bell, Save, Plus, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

type SettingsHeaderProps = {
  onSave: () => void
}

// Initial settings
const initialSettings = {
  businessHours: {
    monday: { active: true, start: "08:00", end: "18:00" },
    tuesday: { active: true, start: "08:00", end: "18:00" },
    wednesday: { active: true, start: "08:00", end: "18:00" },
    thursday: { active: true, start: "08:00", end: "18:00" },
    friday: { active: true, start: "08:00", end: "18:00" },
    saturday: { active: true, start: "08:00", end: "16:00" },
    sunday: { active: false, start: "08:00", end: "18:00" },
  },
  appointmentInterval: 30, // minutes
  daysOff: [
    { id: 1, date: "2024-12-25", reason: "Christmas", type: "holiday" },
    { id: 2, date: "2024-01-01", reason: "New Year", type: "holiday" },
    { id: 3, date: "2024-02-15", reason: "Maintenance", type: "maintenance" },
  ],
  services: [
    { id: 1, name: "Simple Wash", price: 15, duration: 30, active: true },
    { id: 2, name: "Complete Wash", price: 25, duration: 45, active: true },
    { id: 3, name: "Premium Wash", price: 40, duration: 60, active: true },
    { id: 4, name: "Full Detailing", price: 65, duration: 90, active: true },
  ],
  notifications: {
    customerEmail: true,
    customerSMS: true,
    adminEmail: true,
    reminderAdvance: 24, // hours
  },
  payment: {
    depositPercentage: 50,
    acceptedMethods: ["card", "pix", "cash"],
  },
  company: {
    name: "CleanCar Pro",
    phone: "+351 912 345 678",
    email: "contact@cleancar.pt",
    address: "123 Flower Street - Lisbon",
    maxCancellationTime: 2, // hours
  },
}

const weekDays = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState(initialSettings)
  const [newOffDate, setNewOffDate] = useState<Date | undefined>()
  const [offDateReason, setOffDateReason] = useState("")
  const [offDateType, setOffDateType] = useState("holiday")
  const [offDateDialogOpen, setOffDateDialogOpen] = useState(false)
  

  // Log settings whenever there's a change
  useEffect(() => {
    console.log("🔧 Settings updated:", settings)
  }, [settings])

  const updateBusinessHours = (day: string, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day as keyof typeof prev.businessHours],
          [field]: value,
        },
      },
    }))
  }

  const addOffDay = () => {
    if (!newOffDate || !offDateReason) return

    const newOffDay = {
      id: Date.now(),
      date: newOffDate.toISOString().split("T")[0],
      reason: offDateReason,
      type: offDateType,
    }

    setSettings((prev) => ({
      ...prev,
      daysOff: [...prev.daysOff, newOffDay],
    }))

    setNewOffDate(undefined)
    setOffDateReason("")
    setOffDateType("holiday")
    setOffDateDialogOpen(false)
  }

  const removeOffDay = (id: number) => {
    setSettings((prev) => ({
      ...prev,
      daysOff: prev.daysOff.filter((day) => day.id !== id),
    }))
  }

  const updateService = (id: number, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      services: prev.services.map((service) => (service.id === id ? { ...service, [field]: value } : service)),
    }))
  }

  const updateNotifications = (field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value,
      },
    }))
  }

  const updatePayment = (field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        [field]: value,
      },
    }))
  }

  const updateCompany = (field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value,
      },
    }))
  }

  const saveSettings = () => {
    console.log("💾 Saving settings:", settings)
    // Here you would make the API call to save
    alert("Settings saved successfully!")
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white border-b border-slate-200">
        <div className="flex items-center">
          <Link href="/" className="flex items-center mr-4">
            <ArrowLeft className="h-5 w-5 text-slate-600 hover:text-blue-600" />
          </Link>
          <Car className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-slate-900">CleanCar Pro</span>
          <Badge variant="secondary" className="ml-3 bg-green-100 text-green-800">
            Settings
          </Badge>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button onClick={saveSettings} className="bg-blue-600 hover:bg-blue-700">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">System Settings</h1>
            <p className="text-slate-600">Manage schedules, services and general business settings</p>
          </div>

          <Tabs defaultValue="hours" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="hours">
                <Clock className="mr-2 h-4 w-4" />
                Hours
              </TabsTrigger>
              <TabsTrigger value="daysoff">
                <CalendarX className="mr-2 h-4 w-4" />
                Days Off
              </TabsTrigger>
              <TabsTrigger value="services">
                <Car className="mr-2 h-4 w-4" />
                Services
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="general">
                <Settings className="mr-2 h-4 w-4" />
                General
              </TabsTrigger>
            </TabsList>

            {/* Business Hours */}
            <TabsContent value="hours" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                  <CardDescription>Configure operating hours for each day of the week</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {weekDays.map((day) => {
                    const hours = settings.businessHours[day.key as keyof typeof settings.businessHours]
                    return (
                      <div key={day.key} className="flex items-center space-x-4 p-4 border border-slate-200 rounded-lg">
                        <div className="w-32">
                          <Label className="font-medium">{day.label}</Label>
                        </div>
                        <Switch
                          checked={hours.active}
                          onCheckedChange={(checked) => updateBusinessHours(day.key, "active", checked)}
                        />
                        {hours.active && (
                          <>
                            <div className="flex items-center space-x-2">
                              <Label className="text-sm">Start:</Label>
                              <Input
                                type="time"
                                value={hours.start}
                                onChange={(e) => updateBusinessHours(day.key, "start", e.target.value)}
                                className="w-32"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Label className="text-sm">End:</Label>
                              <Input
                                type="time"
                                value={hours.end}
                                onChange={(e) => updateBusinessHours(day.key, "end", e.target.value)}
                                className="w-32"
                              />
                            </div>
                          </>
                        )}
                        {!hours.active && (
                          <Badge variant="secondary" className="bg-red-100 text-red-800">
                            Closed
                          </Badge>
                        )}
                      </div>
                    )
                  })}

                  <div className="pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <Label className="font-medium">Appointment interval:</Label>
                      <Select
                        value={settings.appointmentInterval.toString()}
                        onValueChange={(value) =>
                          setSettings((prev) => ({ ...prev, appointmentInterval: Number.parseInt(value) }))
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 min</SelectItem>
                          <SelectItem value="30">30 min</SelectItem>
                          <SelectItem value="45">45 min</SelectItem>
                          <SelectItem value="60">60 min</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Days Off */}
            <TabsContent value="daysoff" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Days Off and Holidays</CardTitle>
                      <CardDescription>Manage days when the business will be closed</CardDescription>
                    </div>
                    <Dialog open={offDateDialogOpen} onOpenChange={setOffDateDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Day Off
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Day Off</DialogTitle>
                          <DialogDescription>Select a date and reason for closure</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Date</Label>
                            <Calendar
                              mode="single"
                              selected={newOffDate}
                              onSelect={setNewOffDate}
                              className="rounded-md border"
                              disabled={(date) => date < new Date()}
                            />
                          </div>
                          <div>
                            <Label>Reason</Label>
                            <Input
                              value={offDateReason}
                              onChange={(e) => setOffDateReason(e.target.value)}
                              placeholder="e.g. Christmas, Maintenance, Vacation..."
                            />
                          </div>
                          <div>
                            <Label>Type</Label>
                            <Select value={offDateType} onValueChange={setOffDateType}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="holiday">Holiday</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                <SelectItem value="vacation">Vacation</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button onClick={addOffDay} className="w-full">
                            Add
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {settings.daysOff.map((day) => (
                      <div
                        key={day.id}
                        className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{new Date(day.date).toLocaleDateString("en-US")}</div>
                          <div className="text-sm text-slate-600">{day.reason}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={
                              day.type === "holiday"
                                ? "bg-red-100 text-red-800"
                                : day.type === "maintenance"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-blue-100 text-blue-800"
                            }
                          >
                            {day.type}
                          </Badge>
                          <Button variant="ghost" size="sm" onClick={() => removeOffDay(day.id)}>
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services */}
            <TabsContent value="services" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Management</CardTitle>
                  <CardDescription>Configure offered services, prices and durations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {settings.services.map((service) => (
                      <div key={service.id} className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Switch
                              checked={service.active}
                              onCheckedChange={(checked) => updateService(service.id, "active", checked)}
                            />
                            <Input
                              value={service.name}
                              onChange={(e) => updateService(service.id, "name", e.target.value)}
                              className="font-medium"
                            />
                          </div>
                          <Badge variant={service.active ? "default" : "secondary"}>
                            {service.active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm">Price (€)</Label>
                            <Input
                              type="number"
                              value={service.price}
                              onChange={(e) => updateService(service.id, "price", Number.parseFloat(e.target.value))}
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Duration (min)</Label>
                            <Input
                              type="number"
                              value={service.duration}
                              onChange={(e) => updateService(service.id, "duration", Number.parseInt(e.target.value))}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure how and when notifications are sent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Customer Email</Label>
                        <p className="text-sm text-slate-600">Send email confirmations</p>
                      </div>
                      <Switch
                        checked={settings.notifications.customerEmail}
                        onCheckedChange={(checked) => updateNotifications("customerEmail", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Customer SMS</Label>
                        <p className="text-sm text-slate-600">Send SMS reminders</p>
                      </div>
                      <Switch
                        checked={settings.notifications.customerSMS}
                        onCheckedChange={(checked) => updateNotifications("customerSMS", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Admin Email</Label>
                        <p className="text-sm text-slate-600">Receive new appointment notifications</p>
                      </div>
                      <Switch
                        checked={settings.notifications.adminEmail}
                        onCheckedChange={(checked) => updateNotifications("adminEmail", checked)}
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <Label className="font-medium">Reminder advance time:</Label>
                      <Select
                        value={settings.notifications.reminderAdvance.toString()}
                        onValueChange={(value) => updateNotifications("reminderAdvance", Number.parseInt(value))}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 hour</SelectItem>
                          <SelectItem value="2">2 hours</SelectItem>
                          <SelectItem value="6">6 hours</SelectItem>
                          <SelectItem value="12">12 hours</SelectItem>
                          <SelectItem value="24">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Company Name</Label>
                      <Input value={settings.company.name} onChange={(e) => updateCompany("name", e.target.value)} />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input value={settings.company.phone} onChange={(e) => updateCompany("phone", e.target.value)} />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input value={settings.company.email} onChange={(e) => updateCompany("email", e.target.value)} />
                    </div>
                    <div>
                      <Label>Address</Label>
                      <Textarea
                        value={settings.company.address}
                        onChange={(e) => updateCompany("address", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Deposit Percentage (%)</Label>
                      <Input
                        type="number"
                        value={settings.payment.depositPercentage}
                        onChange={(e) => updatePayment("depositPercentage", Number.parseInt(e.target.value))}
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <Label>Maximum cancellation time (hours)</Label>
                      <Input
                        type="number"
                        value={settings.company.maxCancellationTime}
                        onChange={(e) => updateCompany("maxCancellationTime", Number.parseInt(e.target.value))}
                        min="0"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
