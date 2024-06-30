<?php
$code = $argv[1];
file_put_contents('temp.php', $code);
$output = shell_exec('php temp.php');
echo $output;
