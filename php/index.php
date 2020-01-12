<?php
require_once("inc/connect.php");

if (empty($_SESSION["username"]))
{
    require_once("community-list.php");
}
else
{
    require_once("feed.php");
}
?>