<?php
declare(strict_types=1);
require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php';

$messages = [
    "<pre><q>There is always one more bug to fix.</q>\n\nEllen Ullman</pre>",
    "<pre><q>If debugging is the process of removing bugs,\nthen programming must be the process of putting them in.</q>\n\nSam Redwine</pre>",
    "<pre><q>There is always one more bug to fix.</q>\n\nEllen Ullman</pre>",
    "<pre><q>Talk is cheap. Show me the code.</q>\n\nLinus Torvalds</pre>",
    "<pre>“<q>Java is to JavaScript what car is to Carpet.</q>\n\nChris Heilmann</pre>",
    "<pre><q>Any fool can write code that a computer can understand.\nGood programmers write code that humans can understand.</q>\n\nMartin Fowler</pre>",
    "<pre><q>Before software can be reusable it first has to be usable.</q>\n\nRalph Johnson</pre>",
    "<iframe src=\"https://giphy.com/embed/yYSSBtDgbbRzq\" width=\"480\" height=\"360\" frameBorder=\"0\" ></iframe><p><a href=\"https://giphy.com/gifs/frustrated-annoyed-programming-yYSSBtDgbbRzq\">via GIPHY</a></p>"
];


echo json_encode(
    ["message" => $messages[array_rand($messages)]]
);