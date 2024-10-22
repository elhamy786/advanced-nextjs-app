import { notFound } from 'next/navigation';

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

export default function DogDetail({ params }: DogDetailProps) {
  const dogId = parseInt(params.id, 10); // Extract the dog ID from the URL

  if (isNaN(dogId) || dogId >= dogDescriptions.length) {
    return notFound();
  }

  // Generate the dog image URL dynamically (replace with actual API data if necessary)
  const dogImageUrl = `https://dog.ceo/api/breeds/image/random/${dogId}`;

  const dogInfo = `
    The breed is known for its loyalty.
    It has a lifespan of 10-15 years.
    They are great with families and children.
    The breed is highly trainable.
    They require regular exercise to stay healthy.
    Grooming needs depend on the breed.
    They are known to be friendly and social.
    Their origin dates back to several centuries.
    This breed is highly intelligent.
    They often participate in agility and sports events.
  `;

  return (
    <div className="text-center p-6">
      <h1 className="text-4xl font-bold mb-4">{dogDescriptions[dogId]}</h1>
      <img
        src={dogImageUrl}
        alt={`Dog ${dogId}`}
        className="rounded shadow-lg mx-auto mb-4"
        style={{ width: '400px', height: '400px', objectFit: 'cover' }}
      />
      <p className="text-lg">
        {dogInfo.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>
    </div>
  );
}
