import React from 'react';

const Home = () => {
  return (
    <div>
      <p>Esta es la página principal de la intranet donde podrás encontrar toda la información y herramientas necesarias para tu trabajo.</p>
      <ul>
        <li><a href="/menu">Menú</a></li>
        <li><a href="/orders">Pedidos</a></li>
        <li><a href="/asistencia">Asistencia</a></li>
        <li><a href="/personal">Personal</a></li>
      </ul>
    </div>
  );
};

export default Home;