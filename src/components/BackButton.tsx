import Link from 'next/link';

const BackButton = () => {
  return (
    <Link href="/" className="btn-secondary inline-block mb-6">
      ← Voltar ao Menu
    </Link>
  );
};

export default BackButton;
