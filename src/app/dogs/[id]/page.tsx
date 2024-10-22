import { notFound } from 'next/navigation';
import Image from 'next/image';

interface DogDetailProps {
  params: {
    id: string;
  };
}

export default async function DogDetail({ params }: DogDetailProps) {
  const dogId = parseInt(params.id, 10); // Extract the dog ID from the URL
  console.log("Dog ID from params:", dogId); // Debug: Check if dogId is correctly extracted

  let dogsData;

  // Try fetching dog data from the API
  try {
    const res = await fetch(`http://localhost:3000/api/dogs`); // Fetch data from your API
    if (!res.ok) {
      console.error("Failed to fetch data from the API");
      return notFound(); // Return a 404 page if the fetch fails
    }
    dogsData = await res.json(); // Parse JSON data from the response
    console.log("API Response:", dogsData); // Debug: Log the API response to see the data
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
  console.log("Selected Dog Data:", { image, description }); // Debug: Check if the correct dog data is selected

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
        Dogs are known as man&rsquo;s best friend due to their loyalty and companionship. 
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
