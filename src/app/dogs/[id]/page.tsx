import { notFound } from 'next/navigation';
import Image from 'next/image';

interface DogDetailProps {
  params: {
    id: string;
  };
}

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

export default async function DogDetail({ params }: DogDetailProps) {
  const dogId = parseInt(params.id, 10); // Extract the dog ID from the URL

  // Fetch data using a relative URL
  let dogsData;
  try {
    const res = await fetch(`http://localhost:3000/api/dogs`); // Fetch data from your API
    if (!res.ok) {
      console.error("Failed to fetch data from the API");
      return notFound(); // Return a 404 page if the fetch fails
    }
    dogsData = await res.json(); // Parse JSON data from the response
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    return notFound(); // Return a 404 page if there's a fetch error
  }

  // Check if the ID is valid
  if (isNaN(dogId) || dogId < 0 || dogId >= dogsData.length) {
    console.error("Invalid dog ID or ID does not exist:", dogId);
    return notFound(); // If invalid ID, return 404 page
  }

  const { image, description } = dogsData[dogId]; // Extract image and description for the specific dog

  // Render the Dog detail page
  return (
    <div className="text-center p-6">
      <h1 className="text-4xl font-bold mb-4">{description}</h1>
      <Image
        src={image}
        alt={`Dog ${dogId}`}
        className="rounded shadow-lg mx-auto mb-4"
        width={400} // Set width
        height={400} // Set height
        style={{ objectFit: 'cover' }} // Make sure the image maintains aspect ratio
      />
      <p className="text-lg">
        Dogs are known as man’s best friend due to their loyalty and companionship. 
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
