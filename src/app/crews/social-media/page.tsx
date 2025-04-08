"use client";

import { useState } from 'react';
import BackButton from '@/components/BackButton';

export default function SocialMedia() {
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/crews/social-media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error generating social media content:', error);
      setResult('Ocorreu um erro ao gerar o conteúdo para redes sociais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6">Social Media</h1>
      <p className="mb-6 text-gray-600">
        Crie conteúdo otimizado para suas redes sociais.
      </p>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="prompt" className="block mb-2 font-medium">
            Seu Prompt
          </label>
          <textarea
            id="prompt"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Ex: Crie uma postagem sobre reciclagem para Instagram..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn-primary"
          disabled={loading || !prompt.trim()}
        >
          {loading ? 'Gerando...' : 'Gerar Conteúdo'}
        </button>
      </form>

      {result && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Conteúdo Gerado</h2>
          <div className="whitespace-pre-line">{result}</div>
        </div>
      )}
    </div>
  );
}
