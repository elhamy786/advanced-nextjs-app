import { notFound } from 'next/navigation';
import Image from 'next/image';

interface DogDetailProps {
  params: {
    id: string;
  };
}

export default async function DogDetail({ params }: DogDetailProps) {
  const dogId = parseInt(params.id, 10);  // Convert id to integer

  let dogsData: { image: string }[] | undefined;
  try {
    // Fetch data from your API route
    const res = await fetch(`https://dog.ceo/api/breeds/image/random/20`);
    
    if (!res.ok) {
      console.error("Failed to fetch data from the API:", res.status, res.statusText);
      return notFound();
    }

    const data = await res.json();  // Parse JSON response
    dogsData = data.message.map((image: string) => ({ image })); // Restructure the data
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    return notFound();  // Return notFound if the API call fails
  }

  if (isNaN(dogId) || dogId < 0 || !dogsData || dogId >= dogsData.length) {
    console.error("Invalid dog ID or ID does not exist:", dogId);
    return notFound();  // Return notFound for invalid ID
  }

  // Get the dog image
  const { image } = dogsData[dogId];

  return (
    <div className="text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Dog #{dogId + 1}</h1> {/* Example static description */}
      <Image
        src={image}
        alt={`Dog ${dogId}`}
        className="rounded shadow-lg mx-auto mb-4"
        width={400}
        height={400}
        style={{ objectFit: 'cover' }}
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
