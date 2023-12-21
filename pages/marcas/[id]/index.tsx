import { GetStaticPaths, GetStaticProps } from 'next';
import marcaData from '@/database/marcas.json'; // Substitua com o caminho correto

interface MarcaType {
  id: number,
  tipo: number,
  name: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const marcaIds = marcaData.marcas.map((marca: MarcaType) => String(marca.id));

  const paths = marcaIds.map((id) => ({ params: { id } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id || params.id === undefined) {
    return {
      notFound: true,
    };
  }

  const marca = marcaData.marcas.find((marca: any) => {
    return marca.id == params.id
  });

  if (marca === undefined) {
    return {
      notFound: true,
    };
  }

  return { props: { marca } };
};

const MarcaPage: React.FC<{ marca: MarcaType }> = ({ marca }) => {
  return (
    <div>
      <h1>{marca.name}</h1>
      {/* Renderizar outras informações da marca conforme necessário */}
    </div>
  );
};

export default MarcaPage;
