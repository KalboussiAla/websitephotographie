<?php
// Activer l'affichage des erreurs pour le débogage
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Tableau pour stocker les demandes
$requests = [];

// Vérifier si le dossier data existe
if (!file_exists('data')) {
    // Renvoyer un tableau vide si le dossier n'existe pas
    header('Content-Type: application/json');
    echo json_encode($requests);
    exit;
}

// Scan du dossier data
$files = scandir('data');

foreach ($files as $file) {
    // Ne prendre que les fichiers request_.*.txt
    if (strpos($file, 'request_') === 0 && pathinfo($file, PATHINFO_EXTENSION) === 'txt') {
        $filepath = 'data/' . $file;
        
        // Vérifier si le fichier existe et est lisible
        if (file_exists($filepath) && is_readable($filepath)) {
            $content = file_get_contents($filepath);
            $lines = explode("\n", $content);
            
            // Initialisation de la demande
            $request = [];
            
            // Parcourir chaque ligne pour extraire les infos
            foreach ($lines as $line) {
                if (empty($line)) continue;
                
                $parts = explode(": ", $line, 2);
                if (count($parts) == 2) {
                    $key = strtolower(str_replace(' ', '_', $parts[0]));
                    $value = $parts[1];
                    
                    $request[$key] = $value;
                }
            }
            
            // Récupérer l'ID du nom de fichier
            $id = str_replace(['request_', '.txt'], '', $file);
            $request['id'] = $id;
            
            // Ajouter à la liste des demandes seulement si on a les informations essentielles
            if (isset($request['nom']) && isset($request['email'])) {
                $requests[] = $request;
            }
        }
    }
}

// Trier par date de demande (la plus récente d'abord)
if (count($requests) > 0) {
    usort($requests, function($a, $b) {
        return isset($a['date_de_demande']) && isset($b['date_de_demande']) 
            ? strtotime($b['date_de_demande']) - strtotime($a['date_de_demande'])
            : 0;
    });
}

// Renvoyer les demandes au format JSON
header('Content-Type: application/json');
echo json_encode($requests);
?>