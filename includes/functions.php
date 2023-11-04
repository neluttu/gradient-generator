<?
function getTemplate($TFile) {
    global $Result;
    $File = "template/{$TFile}.html";

    if (file_exists($File) && is_readable($File)) {
        $fileContents = file_get_contents($File);
        if ($fileContents !== false) {
            $fileContents = str_replace('[-RESULT-]', $Result, $fileContents);
            return $fileContents;
        }
    }

    return '';
}

function getHeader() {
    $Page = getTemplate('Header');
    $FileDetails = stat('template/css/styles.css');
    $Page = str_replace('[-MT-]',dechex($FileDetails['mtime']),getTemplate('Header'));
    print $Page;
}

function getFooter() {
    $Page = getTemplate('Footer');
    print $Page;
}

function sendMail( $To, $ToEmail, $Subject, $Body ) {
  require_once "Mail.php";

  $headers = array( 'MIME-Version' => '1.0rn',
    'Content-Type' => "text/html; charset=UTF-8",
    'From' => "AboutFood <admin@aboutfood.ro>",
    'To' => $To . " <" . $ToEmail . ">",
    'Subject' => $Subject );

  $smtp = Mail::factory( 'smtp',
    array(
      'host' => 'mail.aboutfood.ro',
      'port' => '587',
      'auth' => true,
      'username' => 'admin@aboutfood.ro',
      'password' => '=#_?9SX%=%Ig',
      //'debug' => true
    )
  );
  $mail = $smtp->send( $To . " <" . $ToEmail . ">", $headers, $Body );

  if ( PEAR::isError( $mail ) ) return $mail->getMessage();
  else return true;
}