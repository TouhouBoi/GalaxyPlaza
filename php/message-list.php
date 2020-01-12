<?php
require_once('inc/connect.php');
requireAuth();
$title = 'Messages';
$selected = 'message';
require_once('inc/header.php');
$row = initUser($_SESSION['username'], true);
?><div class="main-column messages">
    <div class="post-list-outline">
        <h2 class="label">Messages</h2>
        <div class="list news-list">
      		<?php
      		$stmt = $db->prepare("SELECT id, created_at, source, target FROM conversations WHERE source = ? OR target = ? ORDER BY (SELECT created_at FROM messages WHERE conversation = conversations.id ORDER BY created_at DESC LIMIT 1) DESC LIMIT 50");
      		$stmt->bind_param('ii', $_SESSION['id'], $_SESSION['id']);
      		$stmt->execute();
      		if($stmt->error) {
      			echo '<div class="no-content"><p>There was an error while trying to get your conversations.</p></div>';
      		} else {
      			$result = $stmt->get_result();
      			if($result->num_rows === 0) {
      				echo '<div class="no-content"><p>No conversations yet.</p></div>';
      			} else {
      				while($row = $result->fetch_assoc()) {
      					if($row['target'] == $_SESSION['id']) {
      						$other = $row['source'];
      					} else {
      						$other = $row['target'];
      					}

      					$stmt = $db->prepare("SELECT id, username, nickname, avatar, has_mh, level, status FROM users WHERE id = ?");
      					$stmt->bind_param('i', $other);
      					$stmt->execute();
      					$uresult = $stmt->get_result();
      					$urow = $uresult->fetch_assoc();

                $stmt = $db->prepare("SELECT id, body, created_at, created_by, seen FROM messages WHERE conversation = ? AND status = 0 ORDER BY id DESC LIMIT 1");
                $stmt->bind_param('i', $row['id']);
                $stmt->execute();
                $mresult = $stmt->get_result();
                $mrow = $mresult->fetch_assoc();

      					echo '<div class="news-list-content trigger'.($mrow['seen'] === 0 & $mrow['created_by'] !== $_SESSION['id'] ? ' notify' : '');
                        echo '" id="' . $row['id'] . '" data-href="/messages/'.htmlspecialchars($urow['username']).'" tabindex="0"><a href="/users/' . htmlspecialchars($urow['username']);
                        echo '" class="icon-container';
                        if($urow['level'] > 0) {
                            echo ' official-user';
                        }
                        echo '"><img class="icon" src="'.getAvatar($urow['avatar'], $urow['has_mh']).'"></a><div class="body"><a href="/users/' . htmlspecialchars($urow['username']) . '" class="nick-name">' . htmlspecialchars($urow['nickname']) . '</a>'.($mresult->num_rows !== 0 ? '<p>'.htmlspecialchars($mrow['body']).'</p>' : '<p>You have not exchanged messages with this user yet.</p>');
                        if($mresult->num_rows !== 0) {
                          echo '<span class="timestamp">' . getTimestamp($mrow['created_at']) . '</span>';
                        }
                        echo '</div></div>';
      				}
      			}
      		}
          $stmt = $db->prepare("UPDATE messages SET seen = 1 WHERE conversation IN (SELECT id FROM conversations WHERE source = ? OR target = ?) AND created_by != ?");
          $stmt->bind_param('iii', $_SESSION['id'], $_SESSION['id'], $_SESSION['id']);
          $stmt->execute();
      		?>
        </div>
    </div>
</div><?php
require_once('inc/footer.php');
?>