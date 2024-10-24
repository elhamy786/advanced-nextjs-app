import { NextResponse } from 'next/server';

const dogDescriptions = [
  "Dogs are known for their loyalty and companionship, often referred to as 'man's best friend.'",
  "They have been domesticated for thousands of years and serve various roles, including working animals, service companions, and beloved pets.",
  "Dogs come in a wide range of breeds, each varying in size, appearance, and temperament.",
  "Highly social animals, dogs thrive on interaction with both humans and other dogs.",
  "Regular exercise and mental stimulation are essential for a dog's well-being.",
  "Dogs communicate through barks, growls, and body language, expressing their feelings and needs.",
  "Training is crucial for good behavior and helps strengthen the bond between dogs and their owners.",
  "Whether as loyal companions or skilled working animals, dogs enrich our lives with their unwavering love."
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
