import { agendamentosData } from "@/public/mocks/statisticsMock"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { date, time } = await req.json();
    const { id } = await params;

    const mutableData = [...agendamentosData];
    const index = mutableData.findIndex(
      (b) => b.id === Number(id) // agora funciona sem erro
    );

    console.log(mutableData)

    if (index === -1) {
      return NextResponse.json({ error: "Agendamento não encontrado" }, { status: 404 });
    }

    // Atualiza o item
    mutableData[index] = {
      ...mutableData[index],
      data: date,
      horario: time,
    }

    return NextResponse.json({
      success: true,
      booking: mutableData[index],
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    )
  }
}
