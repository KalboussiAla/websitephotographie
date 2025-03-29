<?php
// Récupération de l'ID à supprimer
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'ID manquant']);
    exit;
}

$id = $data['id'];
$filename = 'data/request_' . $id . '.txt';

// Vérification de l'existence du fichier
if (!file_exists($filename)) {
    http_response_code(404);
    echo json_encode(['status' => 'error', 'message' => 'Demande non trouvée']);
    exit;
}

// Suppression du fichier
if (unlink($filename)) {
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Demande supprimée']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la suppression']);
}
?>