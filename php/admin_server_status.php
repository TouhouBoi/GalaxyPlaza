<?php
require_once('inc/connect.php');

requireAuth();

$username = $_GET['username'];

if (!isset($username))
{
	exit("Error: Username Not Provided!");
}

if ($_SESSION['level'] > 1)
{
	$title = 'Admin - Server Status';
	require_once('inc/header.php');
	
	if(!empty($_SESSION['username'])) {
		$row = initUser($_SESSION['username'], true);
	} else {
		$is_general = true;
		require_once('elements/user-sidebar.php');
	}
	
	$stats_lib = new ServerStats;
	$stat = $stats_lib->GetServerStats();
?>
	<div class="main-column">
		<div class="post-list-outline">
			<h2 class="label">Admin - Server Status</h2>
			<section id="post-content" class="post post-subtype-default">
				<ul class="list list-content-with-icon-and-text arrow-list">
					<p><?php print(SITE_NAME); ?> Version: <?php print(getServerVersion()); ?></p>
					<br/>
					<p>Server Total Disk Space: <?php print($stat['hdd_total']." GB"); ?></p>
					<p>Server Disk Space Used: <?php print($stat['hdd_used']." GB"); ?></p>
					<p>Server Disk Space Free: <?php print($stat['hdd_free']." GB"); ?></p>
					<br/>
					<p><?php print '<input type="button" onclick="window.location.href=\'/admin/manage/'.$username.'\';" style="width: 150px;" class="black-button sidebar-social-container" value="Back">'; ?></p>
				</ul>
			</section>
		</div>
	</div>
<?php
	require_once('inc/footer.php');
}
else
{
    require_once('403.php');
}
?>