<?php
require_once('inc/connect.php');
if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    showJSONError(405, 6969696, 'You must use a POST request.');
}
if(empty($_SESSION['username'])) {
    showJSONError(401, 0000000, 'You must log in to view this page.');
}
if(!isset($_POST['body'])) {
    showJSONError(400, 1216969, 'You must add a body.');
}
$_POST['body'] = trim($_POST['body']);
if(empty($_POST['body'])) {
    showJSONError(400, 1216970, 'Your body is empty.');
}
if(mb_strlen($_POST['body']) > 2000) {
    showJSONError(400, 1219309, 'Your body is too long.');
}
if(empty($_POST['conversation'])) {
    showJSONError(400, 1229309, 'Please specify the conversation.');   
} else {
    $stmt = $db->prepare("SELECT id, target, source FROM conversations WHERE id = ?");
    $stmt->bind_param('i', $_POST['conversation']);
    if($stmt->error) {
        showError(500, 1693091, 'An error occurred while grabbing your conversation from the database.');
    }
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    if($result->num_rows === 0) {
        showJSONError(404, 1210309, 'The conversation couldn\'t be found.');
    }

    if($row['target'] !== $_SESSION['id'] & $row['source'] !== $_SESSION['id']) {
        showJSONError(403, 4203091, 'You don\'t have the permission to message this user.');
    }

    if($row['target'] == $_SESSION['id']) {
        $other = $row['source'];
    } else {
        $other = $row['target'];
    }

    if(checkBlocked($_SESSION['id'], $other, true)) {
        showJSONError(403, 4203091, 'You don\'t have the permission to message this user.');
    }

    $stmt = $db->prepare("SELECT message_prefs FROM users WHERE id = ?");
    $stmt->bind_param('i', $other);
    $stmt->execute();
    if($stmt->error) {
        showJSONError(500, 5820094, 'There was an error while grabbing the other user\'s message preferences.');
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    /*if($row['message_prefs'] === 2) {
        showJSONError(403, 4203091, 'You don\'t have the permission to message this user.');
    } elseif($row['message_prefs'] === 0) {
        $stmt = $db->prepare("SELECT COUNT(*) FROM follows WHERE source = ? AND target = ?");
        $stmt->bind_param('ii', $other, $_SESSION['id']);
        $stmt->execute();
        $cr = $stmt->get_result();
        $crow = $cr->fetch_assoc();
        if($crow['COUNT(*)'] === 0) {
            showJSONError(403, 4203091, 'You don\'t have the permission to message this user.');
        }
    }*/
}
if(empty($_POST['feeling_id']) || $_POST['feeling_id'] > 5 || $_POST['feeling_id'] < 0) {
    $_POST['feeling_id'] = 0;
}
if(!empty($_POST['image'])) {
    $image = uploadImage(base64_decode($_POST['image']));
    if($image === null) {
        showJSONError(500, 2310924, 'An error occurred while uploading the image.');
    }
}
$stmt = $db->prepare('SELECT COUNT(*) FROM messages WHERE created_by = ? AND created_at > NOW() - INTERVAL 15 SECOND');
$stmt->bind_param('i', $_SESSION['id']);
$stmt->execute();
if($stmt->error) {
    showJSONError(500, 5820094, 'There was an error while grabbing your recent messages.');
}
$result = $stmt->get_result();
$row = $result->fetch_assoc();
if($row['COUNT(*)'] > 0) {
    showJSONError(403, 1203005, 'You\'re making too many messages in quick succession. Please try again in a moment.');
}

$stmt = $db->prepare("INSERT INTO messages (created_by, feeling, body, image, conversation) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param('iissi', $_SESSION['id'], $_POST['feeling_id'], $_POST['body'], $image, $_POST['conversation']);
$stmt->execute();
if($stmt->error) {
    showJSONError(500, 9999998, 'There was an error while inserting the message into the database.');
}

$stmt = $db->prepare("SELECT messages.id, created_by, messages.created_at, feeling, body, image, username, nickname, avatar, has_mh, level FROM messages LEFT JOIN users ON created_by = users.id WHERE created_by = ? ORDER BY messages.id DESC LIMIT 1");
$stmt->bind_param('i', $_SESSION['id']);
$stmt->execute();
if($stmt->error) {
    showJSONError(500, 7654321, 'There was an error while fetching the message from the database.');
}
$result = $stmt->get_result();
$row = $result->fetch_array();
require('elements/message.php');
