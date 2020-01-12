<?php
require_once('inc/connect.php');
requireAuth();

//Get user data n' stuff
$stmt = $db->prepare("SELECT id, username, nickname, avatar, has_mh, level, message_prefs FROM users WHERE username = ?");
$stmt->bind_param('s', $_GET['username']);
if($stmt->error) {
   	showError(500, 'An error occurred while grabbing the user data from the database.');
}
$stmt->execute();
$result = $stmt->get_result();
$urow = $result->fetch_assoc();

if($result->num_rows === 0) {
    showError(404, 'This user could not be found.');
}

if($urow['id'] === $_SESSION['id']) {
    showError(403, 'You can\'t message yourself.');
}

//Check to see if you can message this person.
if($urow['message_prefs'] === 2) {
    $can_message = false;
} elseif($urow['message_prefs'] === 1) {
    $can_message = true;
} elseif($urow['message_prefs'] === 0) {
    $stmt = $db->prepare("SELECT COUNT(*) FROM follows WHERE source = ? AND target = ?");
    $stmt->bind_param('ii', $urow['id'], $_SESSION['id']);
    $stmt->execute();
    $cr = $stmt->get_result();
    $crow = $cr->fetch_assoc();
    if($crow['COUNT(*)'] === 0) {
        $can_message = false;
    } else {
        $can_message = true;
    }
}
if(checkBlocked($_SESSION['id'], $urow['id'], true)) {
    $can_message = false;
}

//Get conversation
$stmt = $db->prepare("SELECT id, source, target FROM conversations WHERE (source = ? AND target = ?) OR (source = ? AND target = ?)");
$stmt->bind_param('iiii', $urow['id'], $_SESSION['id'], $_SESSION['id'], $urow['id']);
if($stmt->error) {
   	showError(500, 'An error occurred while grabbing your conversation from the database.');
}
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$conversations = $result->num_rows;

if($conversations === 0) {
    if(!$can_message) {
        showError(403, 'You don\'t have permission to message this user.');
    }

	$stmt = $db->prepare("INSERT INTO conversations (source, target) VALUES (?, ?)");
	$stmt->bind_param('ii', $_SESSION['id'], $urow['id']);
	if($stmt->error) {
	   	showError(500, 'An error occurred trying to insert a new conversation into the database.');
	}
	$stmt->execute();
	
	$stmt = $db->prepare("SELECT id, source, target FROM conversations WHERE (source = ? AND target = ?) OR (source = ? AND target = ?)");
	$stmt->bind_param('iiii', $urow['id'], $_SESSION['id'], $_SESSION['id'], $urow['id']);
	if($stmt->error) {
	   	showError(500, 'An error occurred while grabbing your conversation from the database.');
	}
	$stmt->execute();
	$result = $stmt->get_result();
	$row = $result->fetch_assoc();
}

$title = 'Message '.htmlspecialchars($urow['nickname']);
$selected = 'message';
require_once('inc/header.php');
$urow2 = initUser($_SESSION['username'], true);
?>
<div class="main-column messages">
    <div class="post-list-outline">
        <h2 class="label">Conversation with <?=htmlspecialchars($urow['nickname'])?></h2>
        <?php //if($can_message == true) { ?>
        <form id="post-form" method="post" action="/messages" class="for-identified-user folded" data-post-subtype="default">
            <input type="hidden" name="token" value="<?=$_SESSION['token']?>">
            <input type="hidden" name="conversation" value="<?=$row['id']?>">
            <div class="feeling-selector js-feeling-selector"><label class="symbol feeling-button feeling-button-normal checked"><input type="radio" name="feeling_id" value="0" checked><span class="symbol-label">normal</span></label><label class="symbol feeling-button feeling-button-happy"><input type="radio" name="feeling_id" value="1"><span class="symbol-label">happy</span></label><label class="symbol feeling-button feeling-button-like"><input type="radio" name="feeling_id" value="2"><span class="symbol-label">like</span></label><label class="symbol feeling-button feeling-button-surprised"><input type="radio" name="feeling_id" value="3"><span class="symbol-label">surprised</span></label><label class="symbol feeling-button feeling-button-frustrated"><input type="radio" name="feeling_id" value="4"><span class="symbol-label">frustrated</span></label><label class="symbol feeling-button feeling-button-puzzled"><input type="radio" name="feeling_id" value="5"><span class="symbol-label">puzzled</span></label></div>
            <div class="textarea-with-menu">
                <div class="textarea-container">
                    <textarea name="body" class="textarea-text textarea" maxlength="2000" placeholder="Share your thoughts in a message to <?=htmlspecialchars($urow['nickname'])?>." data-open-folded-form data-required></textarea>
                </div>
            </div>
            <label class="file-button-container">
                <span class="input-label">Image
                    <span>PNG, JPEG and GIF files are allowed.</span>
                </span>
                <input accept="image/*" type="file" class="file-button">
                <input type="hidden" name="image">
            </label>
            <div class="form-buttons">
                <input type="submit" class="black-button post-button disabled" value="Send" data-post-content-type="text" data-post-with-screenshot="nodata" disabled>
            </div>
        </form> <?php //} ?>
        <div class="body-content" id="community-post-list">
            <?php 
            if(empty($_GET['offset'])) {
                $_GET['offset'] = 0;
            }
            $stmt = $db->prepare("SELECT messages.id, created_by, messages.created_at, feeling, body, image, username, nickname, avatar, has_mh, level FROM messages LEFT JOIN users ON created_by = users.id WHERE conversation = ? AND messages.status = 0 ORDER BY messages.id DESC LIMIT 20 OFFSET ?");
            $stmt->bind_param('ii', $row['id'], $_GET['offset']);
            $stmt->execute();
            if($stmt->error) {
                showJSONError(500, 7654321, 'There was an error while fetching the messages from the database.');
            }
            $result = $stmt->get_result();
            if($result->num_rows === 0) {
                if($_GET['offset'] == 0) {
                    showNoContent('No messages. Why don\'t you say hi to them?');
                }
            } else {
                echo '<div class="list post-list js-post-list" data-next-page-url="?offset=' . ($_GET['offset'] + 20) . '">';
                while($row = $result->fetch_assoc()) {
                    require('elements/message.php');
                }
                echo '</div>';
            }
            ?>
        </div>
    </div>
</div>
<?php
showMiniFooter();
?>