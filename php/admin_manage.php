<?php
require_once('inc/connect.php');

requireAuth();

if ($_SESSION['level'] > 1)
{
	$title = 'Admin - Manage';
	
	require_once('inc/header.php');
	
	$username = $_GET['username'];
	
	$row = initUser($username);
	
	$stmt = $db->prepare('SELECT COUNT(*) FROM bans WHERE user = ? AND NOW() < banned_at + INTERVAL length DAY');
    $stmt->bind_param('i', $row['id']);
    $stmt->execute();
	
    if (!$stmt->error)
	{
        $result = $stmt->get_result();
        $brow = $result->fetch_assoc();
        if($brow['COUNT(*)'] > 0) {
            $banned = true;
        }
		else
		{
            $banned = false;
        }
	}
?>
            <?php if($_SESSION['level'] > 1) { ?>
	<div class="main-column">
		<div class="post-list-outline">
			<h2 class="label">Admin - Manage</h2>
			<section id="post-content" class="post post-subtype-default">
				<ul>
                                <div class="form-buttons">
                                    <?php if($_SESSION['level'] > 1) { ?><input type="submit" class="post-button black-button sidebar-social-container" value="<?=$banned ? 'Unb' : 'B'?>an" data-modal-open="#manage-ban-page"><?php } ?>
                                    <input type="submit" class="post-button black-button sidebar-social-container" value="Purge" data-modal-open="#manage-purge-page">
                                    <input type="submit" class="post-button black-button sidebar-social-container" value="Delete" data-modal-open="#manage-delete-page">
									<input type="button" onclick="window.location.href='/communities/create';" class="black-button sidebar-social-container" value="Create Community">
									<?php if ($_SESSION['level'] > 1) {
										print '<input type="button" onclick="window.location.href=\'/admin/server_status/'.$username.'\';" style="width: 150px;" class="black-button sidebar-social-container" value="Server Information">';
									}
									?>
                                </div>
				</ul>
			</section>
		</div>
	</div>
                <div id="manage-ban-page" class="dialog none" data-modal-types="report<?=!$banned ? ' report-violator' : ''?>">
                    <div class="dialog-inner">
                        <div class="window">
                            <h1 class="window-title"><?=$banned ? 'Unb' : 'B'?>an User</h1>
                            <div class="window-body tleft">
                                <form method="post" action="/users/<?=htmlspecialchars(urlencode($row['username']))?>/manage">
                                    <input type="hidden" name="token" value="<?=$_SESSION['token']?>">
                                    <input type="hidden" name="action" value="2">
                                    <?php if($banned) { ?>
                                        <p class="description">Unban this user?</p>
                                    <?php } else { ?>
                                        <p class="description">How long should the user be banned for?</p>
                                        <select name="type">
                                            <option value selected>Select a ban length.</option>
                                            <option value="1">One Day</option>
                                            <option value="2">Two Days</option>
                                            <option value="3">Three Days</option>
                                            <option value="4">Four Days</option>
                                            <option value="5">Five Days</option>
                                            <option value="6">Six Days</option>
                                            <option value="7">One Week</option>
                                            <option value="14">Two Weeks</option>
                                            <option value="21">Three Weeks</option>
                                            <option value="30">One Month</option>
                                            <option value="90">Three Months</option>
                                            <option value="180">Six Months</option>
                                            <option value="365">One Year</option>
                                            <option value="-1">Permanent</option>
                                        </select><br><br>
                                        <p><label><input type="checkbox" name="purge" value="1"> Delete posts and replies</label></p>
                                    <?php } ?>
                                    <div class="form-buttons">
                                        <input type="button" class="olv-modal-close-button gray-button" value="Cancel">
                                        <input type="submit" class="post-button black-button" value="<?=$banned ? 'Unb' : 'B'?>an">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="manage-purge-page" class="dialog none" data-modal-types="report">
                    <div class="dialog-inner">
                        <div class="window">
                            <h1 class="window-title">Purge User</h1>
                            <div class="window-body">
                                <form method="post" action="/users/<?=htmlspecialchars(urlencode($row['username']))?>/manage">
                                    <input type="hidden" name="token" value="<?=$_SESSION['token']?>">
                                    <input type="hidden" name="action" value="1">
                                    <p class="description">Which would you like to purge? This cannot be undone.</p>
                                    <ul class="tleft">
                                        <li><label><input type="checkbox" name="posts" value="1"> Posts</label></li>
                                        <li><label><input type="checkbox" name="replies" value="1"> Comments</label></li>
                                        <li><label><input type="checkbox" name="empathies" value="1"> Yeahs</label></li>
                                        <li><label><input type="checkbox" name="follows" value="1"> Follows</label></li>
                                        <li><label><input type="checkbox" name="communities" value="1"> Communities</label></li>
                                        <li><label><input type="checkbox" name="community_favorites" value="1"> Favorites</label></li>
                                        <li><label><input type="checkbox" name="reports" value="1"> Reports</label></li>
                                        <li><label><input type="checkbox" name="blocks" value="1"> Blocks</label></li>
                                    </ul>
                                    <div class="form-buttons">
                                        <input type="button" class="olv-modal-close-button gray-button" value="Cancel">
                                        <input type="submit" class="post-button black-button" value="Purge">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="manage-delete-page" class="dialog none">
                    <div class="dialog-inner">
                        <div class="window">
                            <h1 class="window-title">Delete User</h1>
                            <div class="window-body tleft">
                                <p class="description">Are you sure you want to <strong>permanently</strong> delete this account and everything on it? This cannot be undone.</p>
                                <div class="form-buttons">
                                    <input type="button" class="olv-modal-close-button gray-button" value="Cancel">
                                    <input type="submit" class="post-button black-button" value="Delete" data-modal-open="#manage-delete-confirm-page">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="manage-delete-confirm-page" class="dialog none" data-modal-types="report">
                    <div class="dialog-inner">
                        <div class="window">
                            <h1 class="window-title">Are you sure?</h1>
                            <div class="window-body tleft">
                                <form method="post" action="/users/<?=htmlspecialchars(urlencode($row['username']))?>/manage">
                                    <input type="hidden" name="token" value="<?=$_SESSION['token']?>">
                                    <input type="hidden" name="action" value="3">
                                    <p class="description">Are you <em>really</em> sure you want this account deleted? Think about it! There is no turning back from this!</p>
                                    <p class="description">You can also mass-delete posts, comments and more by going back and entering the "Purge" menu. Account deletion is not always necessary.</p>
                                    <p class="description"><label>To confirm this action, please enter your password: <input type="password" name="password" placeholder="Password"></label></p>
                                    <div class="form-buttons">
                                        <input type="button" class="olv-modal-close-button gray-button" value="Cancel">
                                        <input type="submit" class="post-button black-button" value="Confirm" data-modal-open="#manage-delete-confirm-page">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            <?php }
}			?>