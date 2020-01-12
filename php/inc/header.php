<?php
require_once('connect.php');
?><!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title><?=isset($title) ? htmlspecialchars($title) . ' - ' : ''?><?php print(SITE_NAME); ?></title>
        <meta http-equiv="content-style-type" content="text/css">
        <meta http-equiv="content-script-type" content="text/javascript">
        <meta name="format-detection" content="telephone=no">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
		<meta name="theme-color" content="#9900ff" />
        <meta name="apple-mobile-web-app-title" content="<?php print(SITE_NAME); ?>">
        <meta name="description" content="Galaxy Plaza is a service that lets you communicate with other users from around the world.">
        <meta name="keywords" content="Miiverse,clone,Galaxy,Plaza,GalaxyPlaza">
        <meta property="og:locale" content="en_US">
        <meta property="og:title" content="<?=isset($title) ? htmlspecialchars($title) . ' - ' : ''?>Galaxy Plaza">
        <meta property="og:type" content="article">
        <meta property="og:url" content="http<?=($_SERVER['HTTPS'] || HTTPS_PROXY) ? 's' : ''?>://<?=$_SERVER['SERVER_NAME']?>">
        <meta property="og:description" content="Galaxy Plaza is a service that lets you communicate with other users from around the world.">
        <meta property="og:site_name" content="Galaxy Plaza">
        <meta name="twitter:card" content="summary">
        <meta name="twitter:domain" content="<?=$_SERVER['SERVER_NAME']?>">
        <link rel="shortcut icon" href="/assets/img/favicon.ico">
        <link rel="apple-touch-icon" sizes="57x57" href="/assets/img/apple-touch-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/assets/img/apple-touch-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/assets/img/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/assets/img/apple-touch-icon-144x144.png">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="#9900ff">
		<meta name="mobile-web-app-capable" content="yes">
		<script src="/assets/js/complete-en.js"></script>
		<?php
		if (isset($_SESSION['username']) && isset($_SESSION['id']))
		{
			print("<script src=\"/assets/js/check_update.js\"></script>");
		}
		?>
		<?php
		if (isset($_SESSION['username']) && isset($_SESSION['id']))
		{
			global $db;
			
			$theme_query = $db->query("SELECT site_theme FROM users WHERE username = '".$_SESSION['username']."' AND id = '".$_SESSION['id']."'");
			
			$theme_row = $theme_query->fetch_assoc();
			
			if ($theme_row['site_theme'] == 0)
			{
				getTheme(0);
			}
			else if ($theme_row['site_theme'] == 1)
			{
				getTheme(1);
			}
		}
		else
		{
			getTheme(0);
		}
		//print '<link rel="stylesheet" type="text/css" href="/assets/css/offdevice.css">';
		//print '<link rel="stylesheet" type="text/css" href="/assets/css/offdevice-dark.css">';
		?>
    </head>
    <body class="<?php if(empty($_SESSION['username'])) echo 'guest '; if(!empty($class)) echo $class; if(isset($reborn)) echo '" id="miiverse-will-reborn'; echo '" data-token="' . $_SESSION['token']; ?>">
        <div id="wrapper">
            <div id="sub-body">
                <menu id="global-menu">
                    <li id="global-menu-logo">
                        <h1><a href="/"><img src="/assets/img/menu-logo.png" alt="Galaxy Plaza" width="165" height="30"></a></h1>
                    </li>
                    <?php if(empty($_SESSION['username'])) { ?><li id="global-menu-login">
                            <form id="login_form" action="/login" method="post">
                                <input type="image" alt="Sign in" src="/assets/img/en/signin_base.png">
                            </form>
                        </li>
                    <?php } else { ?><li id="global-menu-list">
                        <ul>
                            <li id="global-menu-mymenu"<?php if(!empty($selected) && $selected == 'mymenu') echo ' class="selected"'; ?>>
                                <a href="/users/<?=htmlspecialchars($_SESSION['username'])?>">
                                    <span class="icon-container">
                                        <img src="<?=getAvatar($_SESSION['avatar'], $_SESSION['has_mh'], 0)?>" alt="User Page">
                                    </span>
                                    <span>User Page</span>
                                </a>
                            </li>
                            <li id="global-menu-homepage"<?php if(!empty($selected) && $selected == 'feed') echo ' class="selected"'; ?>>
                                <a href="/" class="symbol">
                                    <span>Feed</span>
                                </a>
                            </li>
							<li id="global-menu-community"<?php if(!empty($selected) && $selected == 'community') echo ' class="selected"'; ?>>
                                <a href="/communities" class="symbol">
                                    <span>Communities</span>
                                </a>
                            </li>
                            <li id="global-menu-feed"<?php if(!empty($selected) && $selected == 'recommended') echo ' class="selected"'; ?>>
                                <a href="/discover" class="symbol">
                                    <span>Recommended</span>
                                </a>
                            </li>
							<li id="global-menu-message"<?php if(!empty($selected) && $selected == 'message') echo ' class="selected"'; ?>>
                                <a href="/news/messages" class="symbol">
                                    <span>Messages</span>
                                    <?php 
                                    //This is temporary until I figure out how fucking complete-en.js works.
                                    $stmt = $db->prepare('SELECT id, COUNT(*) FROM conversations WHERE (source = ? OR target = ?) AND id IN (SELECT conversation FROM messages WHERE seen = 0 AND conversation = conversations.id AND created_by != ?)');
                                    $stmt->bind_param('iii', $_SESSION['id'], $_SESSION['id'], $_SESSION['id']);
                                    $stmt->execute();
                                    $mcres = $stmt->get_result();
                                    $mcrow = $mcres->fetch_array();
                                    if($mcrow['COUNT(*)'] > 0 && (!isset($selected) || $selected != 'message')) { ?>
                                        <span class="badge" style="display: block;"><?=$mcrow['COUNT(*)']?></span>
                                    <?php }
                                ?>
                                </a>
                            </li>
                            <li id="global-menu-news"<?php if(!empty($selected) && $selected == 'news') echo ' class="selected"'; ?>>
                                <a href="/news/my_news" class="symbol">
									<span>Notifications</span>
								</a>
                            </li>
                            <li id="global-menu-my-menu">
                                <button class="symbol js-open-global-my-menu open-global-my-menu" id="my-menu-btn"></button>
                                <menu id="global-my-menu" class="invisible none">
                                    <li><a href="/settings/profile" class="symbol my-menu-profile-setting"><span>Profile Settings</span></a></li>
                                    <li><a href="/settings/account" class="symbol my-menu-miiverse-setting"><span>Account Settings</span></a></li>
                                    <li><a href="/my_blacklist" class="symbol my-menu-miiverse-setting"><span>Blocked Users</span></a></li>
                                    <li><a href="/info/rules" class="symbol my-menu-guide"><span>Site Rules</span></a></li>
                                    <li>
                                        <form action="/logout" method="post" id="my-menu-logout" class="symbol">
                                            <input type="hidden" name="token" value="<?=$_SESSION['token']?>">
                                            <input type="submit" value="Log Out">
                                        </form>
                                    </li>
                                </menu>
                            </li>
                    <?php } ?>
                </menu>
            </div>
            <div id="main-body">