import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png';
import './MinhasDuvidasDetalhe.css'; 
const MinhasDuvidasDetalhe = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da dúvida da URL

  const [duvidaDetalhada, setDuvidaDetalhada] = useState(null);

  useEffect(() => {
    const fetchDuvida = () => {
      setDuvidaDetalhada({
        id: id,
        titulo: 'Como faço para usar o React?',
        descricao: 'Descrição detalhada sobre como usar o React...',
        autor: 'João Silva',
        data: '2025-02-05',
      });
    };

    fetchDuvida();
  }, [id]);

  const handleVoltar = () => {
    navigate('/minhas-duvidas'); 
  };

  if (!duvidaDetalhada) {
    return <div>Carregando...</div>; // Exibe uma mensagem de carregando enquanto os dados não chegam
  }

  return (
    <div className="minhas-duvidas-detalhe">
      <header className="app-home-header">
        <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-cadasroDuvidas" />
        <button onClick={handleVoltar} className="app-home-btn-voltar">Voltar</button>
      </header>

      <main>
        <div className="duvida-detalhada">
          <h2>{duvidaDetalhada.titulo}</h2>
          <p><strong>Autor:</strong> {duvidaDetalhada.autor}</p>
          <p><strong>Data:</strong> {duvidaDetalhada.data}</p>
          <p><strong>Descrição:</strong> {duvidaDetalhada.descricao}</p>
        </div>
      </main>
    </div>
  );
};

export default MinhasDuvidasDetalhe;
