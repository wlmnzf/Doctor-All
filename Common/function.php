<?php
// function escape($str) {
// 		preg_match_all ( "/[\xc2-\xdf][\x80-\xbf]+|[\xe0-\xef][\x80-\xbf]{2}|[\xf0-\xff][\x80-\xbf]{3}|[\x01-\x7f]+/e", $str, $r );
// 		//匹配utf-8字符， 
// 		$str = $r [0];
// 		$l = count ( $str );
// 		for($i = 0; $i < $l; $i ++) {
// 			$value = ord ( $str [$i] [0] );
// 			if ($value < 223) {
// 				$str [$i] = rawurlencode ( utf8_decode ( $str [$i] ) );
// 			//先将utf8编码转换为ISO-8859-1编码的单字节字符，urlencode单字节字符. 
// 			//utf8_decode()的作用相当于iconv("UTF-8","CP1252",$v)。 
// 			} else {
// 				$str [$i] = "%u" . strtoupper ( bin2hex ( iconv ( "UTF-8", "UCS-2", $str [$i] ) ) );
// 			}
// 		}
// 		return join ( "", $str );
// 	}



//这个escape函数有问题，不要用


function unescape($str) {
		$ret = '';
		$len = strlen ( $str );
		for($i = 0; $i < $len; $i ++) {
			if ($str [$i] == '%' && $str [$i + 1] == 'u') {
				$val = hexdec ( substr ( $str, $i + 2, 4 ) );
				if ($val < 0x7f)
					$ret .= chr ( $val );
				else if ($val < 0x800)
					$ret .= chr ( 0xc0 | ($val >> 6) ) . chr ( 0x80 | ($val & 0x3f) );
				else
					$ret .= chr ( 0xe0 | ($val >> 12) ) . chr ( 0x80 | (($val >> 6) & 0x3f) ) . chr ( 0x80 | ($val & 0x3f) );
				$i += 5;
			} else if ($str [$i] == '%') {
				$ret .= urldecode ( substr ( $str, $i, 3 ) );
				$i += 2;
			} else
				$ret .= $str [$i];
		}
		return $ret;
	}