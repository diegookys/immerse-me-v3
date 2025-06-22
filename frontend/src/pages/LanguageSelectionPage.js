// frontend/src/pages/LanguageSelectionPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LanguageSelectionPage.css';

// 1. Importe as imagens diretamente do seu diretório de assets
import jpFlag from '../assets/jp.png';
import gbFlag from '../assets/gb.png';
import cnFlag from '../assets/cn.png';
import krFlag from '../assets/kr.png';

// 2. Adicionamos um 'id' para cada idioma. Este id será usado na URL.
const languages = [
    { id: 'japones', name: 'Japonês', flag: jpFlag },
    { id: 'ingles', name: 'Inglês', flag: gbFlag },
    { id: 'chines', name: 'Chinês', flag: cnFlag },
    { id: 'coreano', name: 'Coreano', flag: krFlag },
];

function LanguageSelectionPage() {
    const navigate = useNavigate();

    // 3. A função agora navega usando o 'id' do idioma.
    const handleSelectLanguage = (langId) => {
        navigate(`/learn/${langId}`);
    };

    return (
        <div className="language-selection-container">
            <h2>Selecione o seu Idioma</h2>
            <div className="language-grid">
                {languages.map((lang) => (
                    // 4. O evento de clique agora passa o 'lang.id'.
                    <div key={lang.id} className="language-card" onClick={() => handleSelectLanguage(lang.id)}>
                        <img src={lang.flag} alt={`Bandeira de ${lang.name}`} />
                        <span>{lang.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LanguageSelectionPage;