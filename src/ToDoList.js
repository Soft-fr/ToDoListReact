// Importation des dépendances React et du composant TodoItem
import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
  // Déclaration de l'état local pour les tâches et pour la nouvelle tâche à ajouter
  const [taches, setTaches] = useState([]);
  const [nouvelleTache, setNouvelleTache] = useState('');
  const [filtre, setFiltre] = useState('toutes'); // 'toutes', 'actives', 'terminees'
  const [tacheEnCoursDeModification, setTacheEnCoursDeModification] = useState(null);


  // Fonction pour ajouter une nouvelle tâche
  const ajouterTache = (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)
    if (nouvelleTache.trim() !== '') { // Vérifie que le texte n'est pas vide
      const nouvelleTacheObj = {
        id: Date.now(), // Utilise le timestamp actuel comme identifiant unique
        texte: nouvelleTache, // Texte de la tâche
        termine: false  // État initial non terminé pour la nouvelle tâche
      };
      setTaches([...taches, nouvelleTacheObj]); // Ajoute la nouvelle tâche à l'état des tâches
      setNouvelleTache(''); // Réinitialise le champ de saisie
    }
  };

  const filtrerTaches = () => {
    switch (filtre) {
      case 'actives':
        return taches.filter(tache => !tache.termine);
      case 'terminees':
        return taches.filter(tache => tache.termine);
      default:
        return taches;
    }
  };  

  const commencerModification = (id) => {
    setTacheEnCoursDeModification(id);
  };
  
  const enregistrerModification = (id, nouveauTexte) => {
    setTaches(taches.map(tache => {
      if (tache.id === id) {
        return {...tache, texte: nouveauTexte};
      }
      return tache;
    }));
    setTacheEnCoursDeModification(null); // Termine le mode de modification
  };  
  
  // Fonction pour basculer l'état terminé d'une tâche
  const toggleTermine = (id) => {
    setTaches(taches.map(tache => {
      if (tache.id === id) {
        return {...tache, termine: !tache.termine}; // Bascule l'état termine de la tâche
      }
      return tache;
    }));
  };  

  // Fonction pour supprimer une tâche
  const supprimerTache = (id) => {
    setTaches(taches.filter(tache => tache.id !== id)); // Filtre les tâches pour enlever celle avec l'ID spécifié
  };  

  // Fonction pour gérer le changement de valeur dans le champ de saisie
  const handleInputChange = (event) => {
    setNouvelleTache(event.target.value); // Met à jour l'état avec la nouvelle valeur
  };

  // Rendu du composant TodoList
  return (
    <div className="container mt-5">
        <h1 className="text-center mb-4">To Do List</h1>
        <form onSubmit={ajouterTache} className="mb-3">
            <input
                type="text"
                value={nouvelleTache}
                onChange={handleInputChange}
                placeholder="Ajouter une nouvelle tâche"
                className="form-control mb-2"
            />
            <button type="submit" className="btn btn-primary w-100">Ajouter</button>
        </form>
        {/* Boutons de filtrage */}
        <div className="btn-group mb-3">
          <button onClick={() => setFiltre('toutes')} className="btn btn-secondary">Toutes</button>
          <button onClick={() => setFiltre('actives')} className="btn btn-secondary">Actives</button>
          <button onClick={() => setFiltre('terminees')} className="btn btn-secondary">Terminées</button>
        </div>
        <ul className="list-group">
        {filtrerTaches().map((tache) => (
                <TodoItem
                key={tache.id}
                id={tache.id}
                texte={tache.texte}
                termine={tache.termine}
                onToggleTermine={toggleTermine}
                onSupprimer={supprimerTache}
                onStartEdit={commencerModification}
                onSaveEdit={enregistrerModification}
                isEditing={tacheEnCoursDeModification}
                />
            ))}
        </ul>
    </div>
  );
}

export default TodoList;
