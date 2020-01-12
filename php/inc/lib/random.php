<?php
class RandomLib
{
	function gen_random_num($min = 1, $max = 20)
	{
		if (function_exists('random_int')):
			return random_int($min, $max); // more secure
		elseif (function_exists('mt_rand')):
			return mt_rand($min, $max); // faster
		endif;
		return rand($min, $max); // old	
	}

	function gen_random_id()
	{
		$id_length = 20;

		$alfa = "abcdefghijklmnopqrstuvwxyz1234567890";
		$token = "";
		for($i = 1; $i < $id_length; $i ++)
		{
			@$token .= $alfa[rand(1, strlen($alfa))];
		}  
  
		return $token;
	}
}