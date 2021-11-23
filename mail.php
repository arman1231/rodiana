<?php

$recepient = "arman1231@yandex.ru";
$sitename = "rodiana";

$phone = trim($_POST["phone"]);
$text = trim($_POST["code"]);

$pagetitle = "Новая заявка с сайта \"$sitename\"";
$message = "\nТелефон: $phone \nПромокод: $code";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

?>