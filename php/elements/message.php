<div id="<?=$row['id']?>" class="post" tabindex="0">
        <a href="/users/<?=htmlspecialchars($row['username'])?>" class="icon-container<?=$row['level'] > 0 ? ' official-user' : ''?>">
        <img src="<?=getAvatar($row['avatar'], $row['has_mh'], $row['feeling'])?>" class="icon">
    </a>
    <p class="user-name"><a href="/users/<?=htmlspecialchars($row['username'])?>"><?=htmlspecialchars($row['nickname'])?></a></p>
    <p class="timestamp-container">
        <a class="timestamp"><?=getTimestamp($row['created_at'])?></a>
    </p>
    <div class="body post-content"><p class="post-content-text"><?=nl2br(htmlspecialchars($row['body']))?></p>
    <?php if(!empty($row['image'])) { ?>
        <br class="screenshot-container video none">
            <div class="screenshot-container still-image">
                <img src="<?=htmlspecialchars($row['image'])?>">
            </div>
    <?php } ?>
    </div>
</div>