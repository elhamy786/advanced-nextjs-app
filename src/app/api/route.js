// src/app/api/route.js
import { NextResponse } from 'next/server';

const dogDescriptions = [
  // dog descriptions
];

export async function GET() {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/image/random/20');

    if (!res.ok) {
      console.error("Failed to fetch from Dog API:", res.statusText);
      return NextResponse.error();
    }

    const data = await res.json();

    if (!data.message || !Array.isArray(data.message)) {
      console.error("Unexpected data format:", data);
      return NextResponse.error();
    }

    const dogsWithInfo = data.message.map((image, index) => ({
      image,
      description: dogDescriptions[index % dogDescriptions.length],
    }));

    return NextResponse.json(dogsWithInfo);
  } catch (error) {
    console.error("Error fetching dog data:", error);
    return NextResponse.error();
  }
}
