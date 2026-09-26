<?php
// Fallback for PHP hosting (GitHub Pages does not run PHP — use Formspree there instead).
header('Content-Type: application/json');
$to = 'eyabendanna@gmail.com';

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !empty($_POST['website'])) { // honeypot
    http_response_code(400); echo json_encode(['ok' => false]); exit;
}
$name    = trim(strip_tags($_POST['name'] ?? ''));
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$subject = trim(strip_tags($_POST['subject'] ?? ''));
$message = trim(strip_tags($_POST['message'] ?? ''));

if ($name === '' || !$email || $subject === '' || $message === '') {
    http_response_code(422); echo json_encode(['ok' => false, 'error' => 'Invalid input']); exit;
}
$headers = "From: Portfolio <no-reply@" . ($_SERVER['SERVER_NAME'] ?? 'localhost') . ">\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
$body = "From: $name <$email>\n\n$message";
$sent = mail($to, "Portfolio: $subject", $body, $headers);

http_response_code($sent ? 200 : 500);
echo json_encode(['ok' => $sent]);
