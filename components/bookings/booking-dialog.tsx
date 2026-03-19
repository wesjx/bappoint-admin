"use client"


import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getStatusColor } from "@/app/utils/status";


type Props = {
    schedule?: any;
    onClose: () => void;
};


export function BookingDialog({ schedule, onClose }: Props) {
    return (
        <Dialog open={!!schedule} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Detalhes do Agendamento</DialogTitle>
                    <DialogDescription>Informações completas do schedule</DialogDescription>
                </DialogHeader>


                {schedule ? (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Customer Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="font-medium">{schedule.client.name}</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2 text-sm">{schedule.client.phone}</div>
                                        <div className="flex items-center space-x-2 text-sm">{schedule.client.email}</div>
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
                                        <div className="font-medium">{new Date(schedule.date).toLocaleDateString("en-GB")} at {schedule.time}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground">Status</div>
                                        <Badge className={getStatusColor(schedule.status)}>{schedule.status}</Badge>
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
                                            {schedule.services.map((s: string, i: number) => (
                                                <Badge key={i} variant="outline">{s}</Badge>
                                            ))}
                                        </div>
                                    </div>


                                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                                        <div>
                                            <div className="text-sm text-muted-foreground">Total</div>
                                            <div className="text-lg font-bold">€{schedule.total}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground">Deposit Paid</div>
                                            <div className="text-lg font-bold text-green-600">€{schedule.depositPaid}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground">Remaining</div>
                                            <div className="text-lg font-bold text-orange-600">€{schedule.total - schedule.depositPaid}</div>
                                        </div>
                                    </div>


                                    {schedule.notes && (
                                        <div>
                                            <div className="text-sm text-muted-foreground">Notes</div>
                                            <div className="text-sm bg-slate-50 p-2 rounded">{schedule.notes}</div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>


                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={onClose}>Close</Button>
                            <Button variant="outline"><Link href={`/admin/reschedule/${schedule.id}`}>Reschedule</Link></Button>
                            <Button>Confirm Appointment</Button>
                        </div>
                    </div>
                ) : null}
            </DialogContent>
        </Dialog>
    );
}