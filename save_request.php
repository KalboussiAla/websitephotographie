<?php
// Activation des erreurs pour le débogage
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Enregistrement des erreurs dans un fichier log
ini_set('log_errors', 1);
ini_set('error_log', 'data/php_errors.log');

// Récupération des données envoyées
$raw_data = file_get_contents('php://input');
error_log("Données reçues: " . $raw_data);

$data = json_decode($raw_data, true);

// Vérification que les données sont complètes
if (!isset($data['id']) || !isset($data['name']) || !isset($data['email']) || 
    !isset($data['date_event']) || !isset($data['type']) || !isset($data['message'])) {
    
    error_log("Données incomplètes: " . print_r($data, true));
    
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Données incomplètes']);
    exit;
}

// Création du dossier data s'il n'existe pas
if (!file_exists('data')) {
    error_log("Tentative de création du dossier data");
    
    $result = mkdir('data', 0777, true);
    if (!$result) {
        error_log("Échec de la création du dossier data");
        
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Impossible de créer le dossier data']);
        exit;
    }
    
    error_log("Dossier data créé avec succès");
}

// Création du fichier texte avec les données
$filename = 'data/request_' . $data['id'] . '.txt';
$content = "ID: " . $data['id'] . "\n";
$content .= "Date de demande: " . $data['date'] . "\n";
$content .= "Nom: " . $data['name'] . "\n";
$content .= "Email: " . $data['email'] . "\n";
$content .= "Date événement: " . $data['date_event'] . "\n";
$content .= "Type: " . $data['type'] . "\n";
$content .= "Message: " . $data['message'] . "\n";

// Écriture dans le fichier
$result = file_put_contents($filename, $content);
if ($result) {
    error_log("Demande enregistrée avec succès: " . $filename);
    
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Demande enregistrée']);
} else {
    error_log("Échec de l'écriture du fichier: " . $filename);
    
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'écriture du fichier']);
}
?>