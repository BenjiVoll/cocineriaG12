import React from 'react';
import '@styles/Home.css';

const Home = () => {
  return (
    <div className="main-container">
      <div className="table-container">
        <h1>Bienvenido a la Intranet de Cocina</h1>
        <p>
          Encuentra toda la información y herramientas necesarias para tu trabajo en este sistema.
        </p>
        <ul className="menu-list">
          <li><a href="/platos">📋 Menú</a></li>
          <li><a href="/orders">📦 Pedidos</a></li>
          <li><a href="/asistencia">✅ Asistencia</a></li>
          <li><a href="/personal">👨‍🍳 Personal</a></li>
          <li><a href="/historial">📜 Historial</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Home;