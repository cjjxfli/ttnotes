<?php
/**
 * Created by PhpStorm.
 * User: lixiongfeng
 * Date: 16/7/30
 * Time: 上午11:24
 */

/**
 * 验证是否登录
 * @return bool
 */
function check_login_by_tb(){
    $user_id = session('user_id');
    if(empty($user_id)){
        return false;
    }
    return true;
}

/**
 * 验证验证码
 * @param $code
 * @param string $id
 * @return bool
 */
function check_verify($code, $id = ''){
    $verify = new \Think\Verify();
    return $verify->check($code, $id);
}

//function send_email($to,$subject = '', $body = '', $attachment = null){
//    $msg = toubao_send_mail($to,$to,$subject,$body,$attachment);
//    return $msg;
//}

/**
 *
 * @param $url 要生成二维码的数据
 * @param bool|true $logo
 * 如果您希望生成的二维码中间带logo，请填写您的logo完整地址 大小建议在30*30左右
 * @param string $size
 * 图片每个黑点的像素
 * @param string $level 纠错级别， 纠错级别越高，生成图片会越大
 * L水平    7%的字码可被修正
 * M水平    15%的字码可被修正
 * Q水平    25%的字码可被修正
 * H水平    30%的字码可被修正
 * @param int $padding
 * 图片填充白色区域的大小 默认为2
 */
function qrcode($url,$logo=true,$size='4',$level='L',$padding=2){
    $text = $url;
    $size = $size;
    $level = $level;
    $logo = $logo;
    $padding = $padding;
    $path = './Uploads/qrcode/';
    $QR = $path.'qrcode.png';
    $file_img = "/Uploads/qrcode/qrcode.png";
    vendor("phpqrcode.phpqrcode");
    //生成图片 第二个参数：是否保存成文件 如需要保存文件，第二个参数改为文件名即可,如：'qrcode.png'
    QRcode::png($text,$QR,$level, $size,$padding);
    if($logo!== false){
        $QR= imagecreatefromstring(file_get_contents($QR));
        $logo= imagecreatefromstring(file_get_contents($logo));
        $QR_width= imagesx($QR);
        $QR_height= imagesy($QR);
        $logo_width= imagesx($logo);
        $logo_height= imagesy($logo);
        $logo_qr_width= $QR_width / 5;
        $scale= $logo_width / $logo_qr_width;
        $logo_qr_height= $logo_height / $scale;
        $from_width= ($QR_width - $logo_qr_width) / 2;
        imagecopyresampled($QR,$logo, $from_width,$from_width, 0, 0,$logo_qr_width, $logo_qr_height, $logo_width, $logo_height);
    }
    header("Content-Type:image/jpg");
    imagepng($QR);
    return $file_img;
}