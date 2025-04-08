import Link from 'next/link';
import CrewCard from '@/components/CrewCard';

export default function Home() {
  const crews = [
    {
      id: 'content-planner',
      title: 'Content Planner',
      description: 'Planejamento de conteúdo automatizado',
      icon: '📝',
    },
    {
      id: 'dicapri-taco',
      title: 'DiCapri Taco',
      description: 'Assistente especializado',
      icon: '🌮',
    },
    {
      id: 'social-media',
      title: 'Social Media',
      description: 'Geração de conteúdo para redes sociais',
      icon: '📱',
    },
    {
      id: 'image-creator',
      title: 'Image Creator',
      description: 'Criação de imagens baseadas em prompts',
      icon: '🖼️',
    },
    {
      id: 'rag-creator',
      title: 'RAG Creator',
      description: 'Assistente com Retrieval Augmented Generation',
      icon: '🤖',
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-2">DiCapri AI Dashboard</h1>
      <p className="text-gray-600 text-center mb-8">Selecione uma equipe de IA especializada</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crews.map((crew) => (
          <Link href={`/crews/${crew.id}`} key={crew.id} className="no-underline">
            <CrewCard 
              title={crew.title} 
              description={crew.description} 
              icon={crew.icon} 
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
