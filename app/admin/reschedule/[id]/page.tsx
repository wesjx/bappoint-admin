import { notFound } from "next/navigation";

import RescheduleForm from "./reschedule-form";

type RescheduleBookingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function RescheduleBooking({
  params,
}: RescheduleBookingPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return <RescheduleForm appointmentId={id} />;
}
