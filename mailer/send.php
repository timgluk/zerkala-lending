<?php
// Ваш приватный ключ API reCAPTCHA
$secretKey = '6LeMvrgmAAAAALdwUDeETPqUnoprzZDZXG1cTPkL';

// Получаем ответ пользователя и IP-адрес отправителя
$response = $_POST['g-recaptcha-response'];
$remoteIp = $_SERVER['REMOTE_ADDR'];

// Формируем URL для проверки ответа на reCAPTCHA
$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = array(
    'secret'   => $secretKey,
    'response' => $response,
    'remoteip' => $remoteIp
);

$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$responseData = json_decode($result);

// Проверяем результат проверки
if ($responseData && $responseData->success) {
    // Результат reCAPTCHA действителен
    // Дальнейшая обработка формы или действия
    // Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

# проверка, что ошибки нет
if (!error_get_last()) {

    // Переменные, которые отправляет пользователь
    $name = $_POST['name'] ;
    $email = $_POST['contacts'];
    // $tel = $_POST['tel'];
    // $file = $_FILES['myfile'];
    
    
    // Формирование самого письма
    $title = "Контактные данные";
    $body = "
    <h2>Новое письмо</h2>
    <b>Имя:</b> $name<br>
    <b>Контакты:</b> $email<br><br>
    ";
    
    // Настройки PHPMailer
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    // $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['data']['debug'][] = $str;};
    
    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'dobromig18@gmail.com'; // Логин на почте
    $mail->Password   = 'ngfneniguaigrpzh'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('dobromig18@gmail.com', '0-potolok-0.ru'); // Адрес самой почты и имя отправителя
    
    // Получатель письма
    $mail->addAddress('dobromig18@gmail.com'); // Ещё один, если нужен
    
    // Прикрипление файлов к письму
    // if (!empty($file['name'][0])) {
    //     for ($i = 0; $i < count($file['tmp_name']); $i++) {
    //         if ($file['error'][$i] === 0) 
    //             $mail->addAttachment($file['tmp_name'][$i], $file['name'][$i]);
    //     }
    // }
    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;    
    
    // Проверяем отправленность сообщения
    if ($mail->send()) {
        $data['result'] = "success";
        $data['info'] = "Сообщение успешно отправлено!";
    } else {
        $data['result'] = "error";
        $data['info'] = "Сообщение не было отправлено. Ошибка при отправке письма";
        $data['desc'] = "Причина ошибки: {$mail->ErrorInfo}";
    }
    
    } else {
        $data['result'] = "error";
        $data['info'] = "В коде присутствует ошибка";
        $data['desc'] = error_get_last();
    }

    // Отправка результата
    header('Content-Type: application/json');
    echo json_encode($data);

    } else {
        // Результат reCAPTCHA недействителен
        // Обработка ошибки или отображение сообщения об ошибке
        echo "reCAPTCHA verification failed. Please try again.";
    }
?>
