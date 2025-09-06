
import { getBooking } from "@/data/getBooking"
import RescheduleForm from "./reschedule-form"

export default async function RescheduleBooking({
    params
}: {
    params: Promise<{ id: string }>
}) {

    const paramsValue = await params
    const id = Number(paramsValue.id)

    const book = await getBooking(id)

    return (
        <RescheduleForm booking={book} />
    )
}