<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Game Cờ Đặt</title>
	<link rel="stylesheet" type="text/css" href="public/bootstrap/css/bootstrap.min.css">
	<!-- Latest compiled and minified CSS & JS -->
	<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous"> -->
	<!-- <script src="//code.jquery.com/jquery.js"></script> -->
	<!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script> -->
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<br>
	<div class="container" id="app">
		<div class="row">
			<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
				<div style="position: relative;">
					<template v-for="(rowIndex, row) in game.points">
						<template v-for="(colIndex, point) in row">
							<div class="node" :style="{left: ((colIndex - 1) * game.size / 6) + 'px', top: ((rowIndex - 1) * game.size / 6) + 'px', background: (point.player == 1 ? 'black' : (point.player == 2 ? 'red' : ''))}" @click="clickPoint(rowIndex, colIndex)"></div>
						</template>
					</template>
					<div style="">
						<canvas id="game_box"></canvas>
					</div>
				</div>
			</div>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<p>Play 1</p>
				<canvas id="play1_box"></canvas>
				<p>Play 2</p>
				<canvas id="play2_box"></canvas>
			</div>
		</div>
	</div>
	<!-- development version, includes helpful console warnings -->
	<!-- <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script> -->
	<!-- production version, optimized for size and speed -->
	<!-- <script src="https://cdn.jsdelivr.net/npm/vue"></script> -->
	<script src="public/vue/vue.min.js"></script>
	<script src="script.js"></script>
</body>
</html>