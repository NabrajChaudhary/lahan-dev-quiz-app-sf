interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
}

export default function HowItWorksStep({
  number,
  title,
  description,
}: HowItWorksStepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4 bg-gradient-to-r from-purple-500 to-pink-500">
        {number}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
