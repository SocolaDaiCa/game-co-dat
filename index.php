<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Game Cờ Đặt</title>
	<link rel="stylesheet" type="text/css" href="public/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<br>
	<div class="container" id="app">
		<div class="row">
			<h1 class="text-center">Game Cờ Đặt</h1>
		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">
				<div style="position: relative;">
					<template v-for="(rowIndex, row) in game.points">
						<template v-for="(colIndex, point) in row">
							<div class="node" :style="{left: ((colIndex - 1) * game.size / 6) + 'px', top: ((rowIndex - 1) * game.size / 6) + 'px', background: (point.player == 1 ? 'black' : (point.player == 2 ? 'red' : ''))}" @click="clickPoint(rowIndex, colIndex)"></div>
						</template>
					</template>
					<canvas id="game_box"></canvas>
				</div>
			</div>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<p><strong>Current Player:</strong> {{currentTurn}}</p>
				<p><strong>Current Step:</strong> {{step}}</p>
				<p>move: from ({{preState.rowIndex}}, {{preState.colIndex}}) to ({{nextState.rowIndex}}, {{nextState.colIndex}})</p>
				<p>Player 1</p>
				<canvas id="play1_box"></canvas>
				<p>Player 2</p>
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