<?php
  // Для декодирования JSON
  // Для FormData при fetch эта строка не нужна, иначе NULL
  $_POST = json_decode(file_get_contents("php://input"), true);
  echo var_dump($_POST);
?>