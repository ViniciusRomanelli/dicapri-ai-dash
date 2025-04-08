interface CrewCardProps {
  title: string;
  description: string;
  icon: string;
}

const CrewCard = ({ title, description, icon }: CrewCardProps) => {
  return (
    <div className="card h-full">
      <div className="p-6">
        <div className="text-4xl mb-4">{icon}</div>
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default CrewCard;
