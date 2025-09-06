import { NextResponse } from 'next/server'
import availableTimes from '@/public/mocks/available-times.json'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')

  if (!date || typeof date !== 'string') {
    return NextResponse.json({ times: [] })
  }

  // Cache no lado do servidor por 5 minutos
  const response = await fetch('http://localhost:3000/mocks/available-times.json', {
    next: { revalidate: 300 }
  })

  const data = await response.json()
  const times = data[date] || []

  return NextResponse.json({ times })
}
