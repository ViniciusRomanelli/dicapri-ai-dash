"use client";

import { useState } from 'react';
import BackButton from '@/components/BackButton';

export default function ImageCreator() {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/crews/image-creator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Ocorreu um erro ao gerar a imagem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6">Image Creator</h1>
      <p className="mb-6 text-gray-600">
        Crie imagens a partir de descrições textuais.
      </p>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="prompt" className="block mb-2 font-medium">
            Descrição da Imagem
          </label>
          <textarea
            id="prompt"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Ex: Um gato laranja usando óculos de sol na praia..."
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
          {loading ? 'Gerando...' : 'Gerar Imagem'}
        </button>
      </form>

      {imageUrl && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Imagem Gerada</h2>
          <div className="flex justify-center">
            <img 
              src={imageUrl} 
              alt="Imagem gerada" 
              className="rounded-lg max-h-96 object-contain" 
            />
          </div>
        </div>
      )}
    </div>
  );
}
