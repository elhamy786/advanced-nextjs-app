// src/app/api/dogs/route.ts
import { NextResponse } from 'next/server';

const dogDescriptions = [
  "Golden Retriever: A friendly, intelligent breed known for its gentle temperament.",
  "Labrador: An outgoing, even-tempered breed with a playful nature.",
  "German Shepherd: A courageous and confident breed, often used in police work.",
  "Poodle: An intelligent breed known for its hypoallergenic coat and graceful appearance.",
  "Beagle: A curious and friendly breed, known for its excellent sense of smell.",
  "Bulldog: A calm and courageous breed, known for its loose skin and distinctive pushed-in nose.",
  "French Bulldog: A playful and adaptable breed, known for its bat-like ears.",
  "Rottweiler: A confident and loyal breed, often used as a guard dog.",
  "Husky: An energetic breed with a striking appearance and friendly disposition.",
  "Dachshund: A playful and clever breed with a distinctive long body and short legs."
];

export async function GET() {
  const res = await fetch('https://dog.ceo/api/breeds/image/random/20');
  const data = await res.json();

  // Combine images with descriptions
  const dogsWithInfo = data.message.map((image: string, index: number) => ({
    image,
    description: dogDescriptions[index % dogDescriptions.length], // Use modulo to cycle through descriptions
  }));

  return NextResponse.json(dogsWithInfo);
}
