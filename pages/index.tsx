import React from 'react';
import database from "@/database/marcas.json"

const MeuComponente: React.FC = () => {
  console.log(database.marcas)
  return (
    <div>
      <h1>Olá, Mundo! Este é o Meu Componente React.</h1>
    </div>
  );
};

export default MeuComponente;