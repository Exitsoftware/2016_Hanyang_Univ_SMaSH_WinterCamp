<?php
    $url = $_POST["url"];
    $html = file_get_contents($url);
    preg_match('/<title>(.+)<\/title>/',$html,$matches);
    $title = $matches[1];
    echo $title;
?>