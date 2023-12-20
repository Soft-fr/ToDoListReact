import React from 'react';
import { useState } from 'react';

function TodoItem({ id, texte, termine, onToggleTermine, onSupprimer, onStartEdit, onSaveEdit, isEditing }) {
    // Utilisation de l'état local pour gérer le texte modifié en cours d'édition
    const [texteModifie, setTexteModifie] = useState(texte);
    // Détermination de la classe CSS en fonction de l'état "termine"
    const tacheClasse = termine ? "list-group-item d-flex justify-content-between align-items-center bg-success" : "list-group-item d-flex justify-content-between align-items-center";

    return (
        <li className={tacheClasse}>
      {isEditing === id ? ( // Si l'élément est en cours d'édition
        <div>
        {/* Champ de texte pour l'édition */}
          <input
            type="text"
            className="form-control me-2"
            value={texteModifie}
            onChange={(e) => setTexteModifie(e.target.value)}
          />
          {/* Bouton pour sauvegarder l'édition */}
          <button
            onClick={() => onSaveEdit(id, texteModifie)}
            className="btn btn-success btn-sm me-2"
          >
            Enregistrer
          </button>
        </div>
      ) : ( // Si l'élément n'est pas en cours d'édition
        <div className="d-flex align-items-center">
        {/* Texte de la tâche */}
          <span className={termine ? "text-muted me-2" : "me-2"}>
            {texte}
          </span>
          {/* Bouton pour commencer l'édition */}
          <button onClick={() => onStartEdit(id)} className="btn btn-secondary btn-sm me-2">
            Modifier
          </button>
          {/* Bouton pour basculer l'état "termine" */}
          <button
            onClick={() => onToggleTermine(id)}
            className={termine ? "btn btn-warning btn-sm me-2" : "btn btn-success btn-sm me-2"}
          >
            {termine ? 'Réactiver' : 'Terminer'}
          </button>
          {/* Bouton pour supprimer la tâche */}
          <button onClick={() => onSupprimer(id)} className="btn btn-danger btn-sm">
            Supprimer
          </button>
        </div>
      )}
    </li>
  );
}


export default TodoItem;
