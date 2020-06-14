<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="A simple and clean web audio player">
	<meta name="author" content="Setiadi">
	<title>Audio</title>
	<link rel="icon" href="images/favicon.ico" type="image/x-icon" />
	<link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="fontawesome/css/all.css">
	<link rel="stylesheet" type="text/css" href="css/audiox.css">
</head>

<body>
	<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
		<header class="masthead mb-4">
			<div class="inner container p-0">
				<a class="text-dark" href="/audio">
					<h3 class="masthead-brand">
						<i class="fas fa-headphones-alt text-danger"></i>
					</h3>
				</a>
				<!-- <nav class="nav nav-masthead justify-content-center"> 
					<a class="nav-link" href="/"><i class="fas fa-home-alt text-info"></i></a>
					<a class="nav-link text-danger" href="/audio/6p5.html" target="_blank">_p5js</a>
				</nav> -->
			</div>
		</header>
		<main role="main" class="inner cover p-0">
			<div class="container text-left p-0">
				<div class="row mt-5">
					<?php $json=file_get_contents( 'data/juz_30.json'); $arr=json_decode($json, true); ?>
					<div class="col-md-12">
						<h4 class="mb-4" style="color: #495057;"><?php echo ($arr['playlist']); ?></h4>
					</div>
					<div class="col-md-5 order-md-12 mr-0" style="margin-top: 9px;">
						<audio id="myaudio" type="audio/mpeg">
							<source type="audio/mp3" src="data/<?php echo ($arr['data'][0]['url']); ?>.mp3">Sorry, your browser does not support HTML5 audio.
						</audio>
						<div class="mb-4" id="controllers">
							<div class="inner-containers">
								<div class="player-image mb-4">
									<img src="images/buzzard.svg">
								</div>
								<i class="fal fa-sliders-h mb-4 d-none"></i>
								<div id="canvas-wrapper">
									<canvas id="canvas" class="progress-bar progress-bar-striped bg-warning mb-3" role="progressbar" height="10" width="214.5px"></canvas>
								</div>
								<div id="volume-controller">	<span id="mute"><i class="fal fa-volume-down"></i></span>
									<span id="unmute"><i class="fal fa-volume-mute"></i></span>
									<input id="volume" min="0" max="1" step="0.1" type="range" />
									<input id="volume-value" class="ml-2" type="text" value="0.5">
								</div>
								<div class="mt-3 d-flex">	
									<span id="play-prev" class="mr-1"><i class="fal fa-backward fa-border loop-false"></i></span>
									<span id="play" class="mr-1"><i class="far fa-play fa-border"></i></span>
									<span id="play-next" class="mr-1"><i class="fal fa-forward fa-border loop-false"></i></span>
									<span id="rewind" class="mr-1"><i class="far fa-fast-backward fa-border loop-false"></i></span>
									<span id="forward" class="mr-1"><i class="far fa-fast-forward fa-border loop-false"></i></span>
									<span id="restart" class="mr-1"><i class="far fa-retweet-alt fa-border loop-false"></i></span>
									<span id="loop" val="false"><i class="fas fa-repeat loop-false fa-border"></i></span>
								</div>
								<div class="mt-3 timer">	
									<i class="fal fa-clock mr-2"></i> 	
									<span class="time-left">00.00</span> / <span class="duration">00.00</span>
								</div>
								<div class="mt-3 audioinfo">	
									<i class="fal fa-exclamation-circle mr-2"></i> 	
									<span class="audioinfotext"></span>
								</div>
							</div>
						</div>

					</div>
					<div class="col-md-7 order-md-1 mb-4">
						<div class="album-tracks">
							<ul id="playlist" class="list-group list-group-flush">
								<?php foreach ($arr[ 'data'] as $key=>$val) { ?>
								<li class="file list-group-item pl-0 pt-2 pb-2" href="data/<?php echo $val['url']; ?>.mp3">
									<?php echo $val[ 'title']; ?>
								</li>
								<?php } ?>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</main>
		<footer class="mastfoot mt-auto">
			<div class="inner container p-0">
				<p>Audio template for <a href="http://dalle.id/" target="_blank">Dalle</a>, by <a href="https://www.instagram.com/terracodeindonesia" target="_blank">@terracodeindonesia</a></p>
			</div>
		</footer>
	</div>
</body>

<script src="js/jquery-3.3.1.slim.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/audio.js"></script>

</html>