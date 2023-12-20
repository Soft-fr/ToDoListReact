import React from 'react';
import { useState } from 'react';
import './TodoItem.css';

function TodoItem({ id, texte, termine, onToggleTermine, onSupprimer, onStartEdit, onSaveEdit, isEditing }) {

    const [texteModifie, setTexteModifie] = useState(texte);
    const tacheClasse = termine ? "list-group-item d-flex justify-content-between align-items-center bg-terminer" : "list-group-item d-flex justify-content-between align-items-center";

    return (
        <li className={tacheClasse}>
      {isEditing === id ? (
        <div>
          <input
            type="text"
            className="form-control me-2"
            value={texteModifie}
            onChange={(e) => setTexteModifie(e.target.value)}
          />
          <button
            onClick={() => onSaveEdit(id, texteModifie)}
            className="btn btn-success btn-sm me-2"
          >
            Enregistrer
          </button>
        </div>
      ) : (
        <div className="d-flex align-items-center">
          <span className={termine ? "text-muted me-2" : "me-2"}>
            {texte}
          </span>
          <button onClick={() => onStartEdit(id)} className="btn btn-secondary btn-sm me-2">
            Modifier
          </button>
          <button
            onClick={() => onToggleTermine(id)}
            className={termine ? "btn btn-warning btn-sm me-2" : "btn btn-success btn-sm me-2"}
          >
            {termine ? 'Réactiver' : 'Terminer'}
          </button>
          <button onClick={() => onSupprimer(id)} className="btn btn-danger btn-sm">
            Supprimer
          </button>
        </div>
      )}
    </li>
  );
}


export default TodoItem;
