<?php
require_once('inc/connect.php');

$title = 'Contact Us';
require_once('inc/header.php');

if(!empty($_SESSION['username'])) {
    $row = initUser($_SESSION['username'], true);
} else {
    $is_general = true;
    require_once('elements/user-sidebar.php');
}
?>
	<div class="main-column">
		<div class="post-list-outline">
			<h2 class="label">Contact Us W.I.P</h2>
			<section id="post-content" class="post post-subtype-default">
				<ul class="list list-content-with-icon-and-text arrow-list">
					<p>Contact Me Here: <a href="mailto:touhouboi@protonmail.com">touhouboi@protonmail.com</a></p>
				</ul>
			</section>
		</div>
	</div>
<?php
require_once('inc/footer.php');
?>