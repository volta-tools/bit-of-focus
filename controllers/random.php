<?php
/*
 *
 */
declare(strict_types=1);
require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php';

/**
 * @see https://www.brainyquote.com/topics/coding-quotes
 * @see https://www.goodreads.com/quotes/tag/software-development
 * @see https://www.brainyquote.com/topics/developers-quotes
 * @see https://dzone.com/articles/best-programming-jokes-amp-quotes
 */
$messages = [
    "<blockquote>There is always one more bug to fix.<cite>Ellen Ullman</cite></cite></blockquote>",
    "<blockquote>If debugging is the process of removing bugs,then programming must be the process of putting them in.<cite>Sam Redwine</cite> </blockquote>",
    "<blockquote>There is always one more bug to fix.<cite>Ellen Ullman</cite></blockquote>",
    "<blockquote>Talk is cheap. Show me the code.<cite>Linus Torvalds</cite></blockquote>",
    "<blockquote>Java is to JavaScript what car is to Carpet.<cite>Chris Heilmann</cite></blockquote>",
    "<blockquote>Any fool can write code that a computer can understand.\nGood programmers write code that humans can understand.<cite>Martin Fowler</cite></blockquote>",
    "<blockquote>Before software can be reusable it first has to be usable.<cite>Ralph Johnson</cite></blockquote>",
    "<blockquote>Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.<cite>John Wood</cite></blockquote>",
    "<blockquote>Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program.<cite>Linus Torvalds</cite></blockquote>",
    "<blockquote>When I wrote this code, only God and I understood what I did. Now only God knows.<cite>Anonymous</cite></blockquote>",
];

echo json_encode(["message" => $messages[array_rand($messages)]]);


//
//<blockquote>
//The Joel Test:
//<ol>
//<li>Do you use source control?</li>
//<li>Can you make a build in one step?</li>
//<li>Do you make daily builds?</li>
//<li>Do you have a bug database?</li>
//<li>Do you fix bugs before writing new code?</li>
//<li>Do you have an up-to-date schedule?</li>
//<li>Do you have a spec?</li>
//<li>Do programmers have quiet working conditions?</li>
//<li>Do you use the best tools money can buy?</li>
//<li>Do you have testers?</li>
//<li>Do new candidates write code during their interview?</li>
//<li>Do you do hallway usability testing?</li>
//</ol>
//</blockquote>
