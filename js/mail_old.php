<?php

	header("Content-Type: text/html; charset=utf-8");
	
	if(isset($_SERVER["HTTP_X_REQUESTED_WITH"]) && strtolower($_SERVER["HTTP_X_REQUESTED_WITH"]) === "xmlhttprequest") {
	
		if(!isset($_POST["name"]) || !isset($_POST["email"]) || !isset($_POST["phone"]) || !isset($_POST["message"])) {

			die();

		}
	
		function send_form($message) {
	
			$mail_to = "arman1231@yandex.ru"; // Адрес, куда отправляем письма
			$subject = "Новая заявка с artlizloft.ru"; // Тема письма
			$headers = "MIME-Version: 1.0\r\n";
			$headers .= "Content-type: text/html; charset=utf-8\r\n";
			$headers .= "From: Система уведомлений <no-reply@".$_SERVER['HTTP_HOST'].">\r\n";

			mail($mail_to, $subject, $message, $headers);
		
		}

		$name = strip_tags($_POST["name"]); // Имя
        $email = strip_tags($_POST["email"]); // E-mail
        $phone = strip_tags($_POST["phone"]);
		$mess = strip_tags($_POST["message"]); // Сообщение

		if(!preg_match("|^([a-z0-9_.-]{1,20})@([a-z0-9.-]{1,20}).([a-z]{2,4})|is", strtolower($email))) { // Если e-mail пустой или невалиден

			echo "E-mail указан некорректно.";

			die();

		}

		if($mess == "") { // Если сообщение пустое

			echo "Не указан текст сообщения.";

			die();

		}

		if($name == "") { // Если имя не указано

			$name = "Не указано";

        }
        if($phone == "") { // Если телефон не указано

			$phone = "Не указано";

		}

		$message = <<<HTML

            <b>Имя отправителя</b>: {$name}<br>
            <b>Телефон</b>: {$phone}<br><br>
			

HTML;

		send_form($message); // Если ранее описанных ошибок нет - отправляем сообщение
		
		echo "Сообщение успешно отправлено!";

	} else {

		die();

	}

?>