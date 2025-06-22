// frontend/src/pages/LanguageSelectionPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LanguageSelectionPage.css';

// puxa as imagens do assets
import jpFlag from '../assets/jp.png';
import gbFlag from '../assets/gb.png';
import cnFlag from '../assets/cn.png';
import krFlag from '../assets/kr.png';

// adiciona id nos idiomas
const languages = [
    { id: 'japones', name: 'Japonês', flag: jpFlag },
    { id: 'ingles', name: 'Inglês', flag: gbFlag },
    { id: 'chines', name: 'Chinês', flag: cnFlag },
    { id: 'coreano', name: 'Coreano', flag: krFlag },
];

function LanguageSelectionPage() {
    const navigate = useNavigate();

    const handleSelectLanguage = (langId) => {
        navigate(`/learn/${langId}`);
    };

    return(
        <div className="language-selection-container">
            <h2>Selecione o seu Idioma</h2>
            <div className="language-grid">
                {languages.map((lang) => (
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