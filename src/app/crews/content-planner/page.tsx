"use client";

import { useState } from 'react';
import BackButton from '@/components/BackButton';

export default function ContentPlanner() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/crews/content-planner', {
        method: 'POST'
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error generating content plan:', error);
      setResult('Ocorreu um erro ao gerar o planejamento de conteúdo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6">Content Planner</h1>
      <p className="mb-6 text-gray-600">
        Gere um planejamento de conteúdo completo automaticamente.
      </p>

      <button 
        onClick={handleGenerate} 
        className="btn-primary mb-8"
        disabled={loading}
      >
        {loading ? 'Gerando...' : 'Gerar Planejamento'}
      </button>

      {result && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Planejamento Gerado</h2>
          <div className="whitespace-pre-line">{result}</div>
        </div>
      )}
    </div>
  );
}
