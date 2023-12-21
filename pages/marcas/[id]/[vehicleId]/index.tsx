import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import marcaData from '@/database/marcas.json'; // Substitua com o caminho correto
import vehicleData from "@/database/veiculos.json"

interface MarcaType {
  id: number,
  tipo: number,
  name: string
}

interface pathsByBrand {
  params: {
    id: string,
    vehicleId: string
  }
}

interface VehicleType {
      "id": string | number,
      "tipo": string | number,
      "id_modelo_ano": string | number,
      "fipe_codigo":string | number,
      "id_marca": string | number,
      "marca": string | number,
      "id_modelo": string | number,
      "modelo": string | string | number,
      "ano": string | number,
      "name": string | number,
      "combustivel": string | number,
      "preco": string | number
    }

export const getStaticPaths: GetStaticPaths = async () => {
  const marcaIds = marcaData.marcas.map((marca: MarcaType) => String(marca.id));

  let paths: pathsByBrand[] = [];

marcaIds.forEach((marca) => {
  const vehicles: VehicleType[] = vehicleData.vehicles
  
  const filter = vehicles.filter((veiculo: VehicleType) => String(veiculo.id_marca) == marca);

  const pathsByBrand = filter.map((x) => ({
    params: {
      id: String(x.id_marca),
      vehicleId: String(x.id),
    },
  }));

  paths = [...paths, ...pathsByBrand];
});

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id || params.id === undefined) {
    return {
      notFound: true,
    };
  }

  const vehicle = vehicleData.vehicles.find((vehicle: any) => {
    return vehicle.id == params.vehicleId
  });

  if (vehicle === undefined) {
    return {
      notFound: true,
    };
  }

  return { props: { vehicle: vehicle || null } };
};

const VehiclePage: React.FC<{ vehicle: VehicleType }> = ({ vehicle }) => {
  return(
    <div className="bg-gray-100 min-h-screen p-4">
      <Head>
        <title>{`${vehicle.marca} ${vehicle.modelo} ${vehicle.ano} - Descubra a Melhor Oferta`}</title>
        <meta
          name="description"
          content={`Explore o ${vehicle.marca} ${vehicle.modelo} ${vehicle.ano} - detalhes, preço competitivo e características destacadas. Descubra a melhor oferta agora.`}
        />
        <meta name="keywords" content={`${vehicle.marca}, ${vehicle.modelo}, ${vehicle.ano}, preço, detalhes, características`} />
        <meta name="author" content="Seu Nome" />
        <meta property="og:title" content={`${vehicle.marca} ${vehicle.modelo} ${vehicle.ano} - Descubra a Melhor Oferta`} />
        <meta property="og:description" content={`Explore o ${vehicle.marca} ${vehicle.modelo} ${vehicle.ano} - detalhes, preço competitivo e características destacadas. Descubra a melhor oferta agora.`} />
        <meta property="og:image" content="URL_DA_SUA_IMAGEM" />
      </Head>

      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">{`${vehicle.marca} ${vehicle.modelo}`}</h1>
        <p className="text-sm text-gray-500">Modelo: {`${vehicle.modelo} (${vehicle.ano})`}</p>
      </header>

      <section className="bg-white p-6 shadow-md rounded-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Descubra Seu Próximo Veículo</h2>

        <p className="text-gray-600"><strong>Preço:</strong> {vehicle.preco}</p>

        {/* Adicione mais detalhes conforme necessário */}
      </section>

      {/* Adicione outras seções conforme necessário */}

      <footer className="text-center mt-8 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Encontre seu veículo perfeito hoje.</p>
      </footer>
    </div>
  );
};

export default VehiclePage;
