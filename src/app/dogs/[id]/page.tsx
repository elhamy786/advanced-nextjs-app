// src/app/dogs/[id]/page.tsx
import { notFound } from 'next/navigation';

interface DogDetailProps {
  params: {
    id: string;
  };
}

export default async function DogDetail({ params }: DogDetailProps) {
  const dogId = parseInt(params.id, 10); // Extract the dog ID from the URL

  // Fetch dog data from the API
  const res = await fetch(`http://localhost:3000/api/dogs`); // Adjust the URL as needed
  const dogsData = await res.json();

  // If the ID is invalid or doesn't exist, return a 404 page
  if (isNaN(dogId) || dogId >= dogsData.length) {
    return notFound();
  }

  const { image, description } = dogsData[dogId]; // Get dog info from the fetched data

  return (
    <div className="text-center p-6">
      <h1 className="text-4xl font-bold mb-4">{description}</h1>
      <img
        src={image}
        alt={`Dog ${dogId}`}
        className="rounded shadow-lg mx-auto mb-4"
        style={{ width: '400px', height: '400px', objectFit: 'cover' }}
      />
      <p className="text-lg">
        Dogs are known as man's best friend due to their loyalty and companionship. 
        They have been domesticated for thousands of years, serving various roles 
        such as working animals, service companions, and beloved pets. 
        With a wide range of breeds, dogs vary greatly in size, appearance, and temperament. 
        They are highly social animals, thriving on interaction with humans and other dogs. 
        Regular exercise and mental stimulation are essential for their well-being. 
        Dogs communicate through barks, growls, and body language, allowing them 
        to express their feelings and needs. Training is crucial for good behavior 
        and can enhance the bond between dogs and their owners. 
        Whether as loyal companions or skilled working animals, dogs enrich our lives 
        with their unwavering love and loyalty.
      </p>
    </div>
  );
}
