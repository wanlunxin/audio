$(document).ready(function() {

    var audio;
    var playlist;
    var tracks;
    var current;
    init();

    function init() {
        current = 0;
        audio = $('audio');
        playlist = $('#playlist');
        tracks = playlist.find('.file');
        len = tracks.length - 1;
        audio[0].volume = .5;
        // don't delete this audio[0].play();
        // audio[0].play();

        playlist.find('.file').click(function (e) {
            e.preventDefault();
            link = $(this);
            current = link.index();
            $("#play").children().removeClass("fa-play").addClass("fa-pause");
            console.log("file index (clicked): " + current);
            $(".audioinfotext").text("playing");
            run(link, audio[0]);
        });

        audio[0].addEventListener('ended', function (e) {
            var loop = $("#loop").attr("val");
            if (loop === 'true') {
                this.currentTime = 0;
                this.play();
                return false;
            }
            current++;
            if (current > len) {
                current = 0;
                link = playlist.find('.file')[0];
                console.log("file index (current > len): " + current);
            } else {
                link = playlist.find('.file')[current];
                console.log("file index (current > len - else): " + current);
            }
            run($(link), audio[0]);
        });
    }

    $("#play-next").on("click", function() {
        current++;
        console.log(current);
         if (current > len) {
            current = 0;
            link = playlist.find('.file')[0];
         } else {
            link = playlist.find('.file')[current];
         }
         run($(link), audio[0]);
         $("#play").children().removeClass("fa-play").addClass("fa-pause");
        
    });

    $("#play-prev").on("click", function() {
        current--;
        if (current < 0) {
            current = 0;
            audio[0].load();
            audio[0].pause();
            $("#play").children().removeClass("fa-pause").addClass("fa-play");
            $(".audioinfotext").text("can't go backward anymore");
            return false;
        } else {
            link = playlist.find('.file')[current];
        }
        run($(link), audio[0]);
    });

    function run(link, player) {
        player.src = link.attr('href');
        link.addClass('active').siblings().removeClass('active');
        audio[0].load();
        audio[0].play();
    }

    var loopclicked = 1;
    $("#loop").on("click", function(e) {
        e.preventDefault();
        if (loopclicked % 2 == 0) {
            $("#loop").attr("val", "false");
            $(this).children().removeClass("loop-true").addClass("loop-false");
        }
        if (Math.abs(loopclicked % 2) == 1) {
            $("#loop").attr("val", "true");
            $(this).children().removeClass("loop-false").addClass("loop-true");
        }
        loopclicked += 1;
        console.log("loop: " + $(this).attr("val"));
    });

    var playclicked = 1;
    $("#play").on("click", function(e) {
        e.preventDefault();
        if (playclicked == 1) {
            $('ul li:first').addClass('active');
        }
        playclicked += 1;
        if (audio[0].paused) {
            audio[0].play();
            $(".audioinfotext").text("playing");
            $(this).children().removeClass("fa-play").addClass("fa-pause");
        } else {
            audio[0].pause();
            $(".audioinfotext").text("paused");
            $(this).children().removeClass("fa-pause").addClass("fa-play");
        }
    });

    $("#mute").on("click", function() {
        console.log('muted');
        audio[0].muted = !audio.muted;
        $(this).hide();
        $("#unmute").show();
    });    

    $("#unmute").on("click", function() {
        console.log('unmute');
        audio[0].muted = audio.muted;
        $(this).hide();
        $("#mute").show();
    });  


    $("#volume").on("input", function() {
        $("#volume-value").val($(this).val());
        audio[0].volume = $(this).val();
    });

    $("#restart").on("click", function() {
        try {
            var oAudio = document.getElementById('myaudio');
            oAudio.currentTime = 0;
        } catch (e) {
            // Fail silently but show in F12 developer tools console
            if (window.console && console.error("Error:" + e));
        }
    });

    $("#rewind").on("click", function() {
        try {
            var oAudio = document.getElementById('myaudio');
            oAudio.currentTime -= 30.0;
        } catch (e) {
            // Fail silently but show in F12 developer tools console
            if (window.console && console.error("Error:" + e));
        }
    });

    $("#forward").on("click", function() {
        try {
            var oAudio = document.getElementById('myaudio');
            oAudio.currentTime += 30.0;
        } catch (e) {
            // Fail silently but show in F12 developer tools console
            if (window.console && console.error("Error:" + e));
        }
    });
});

/**/

//display and update progress bar
function progressBar() {
    var oAudio = document.getElementById('myaudio');
    //get current time in seconds
    var elapsedTime = Math.round(oAudio.currentTime);
    //update the progress bar
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        //clear canvas before painting
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        ctx.fillStyle = "#4caf50";
        var fWidth = (elapsedTime / oAudio.duration) * (canvas.clientWidth);
        if (fWidth > 0) {
            ctx.fillRect(0, 0, fWidth, canvas.clientHeight);
        }
    }
}

//Rewinds the audio file by 30 seconds.
function rewindAudio() {
    try {
        var oAudio = document.getElementById('myaudio');
        oAudio.currentTime -= 30.0;
    } catch (e) {
        // Fail silently but show in F12 developer tools console
        if (window.console && console.error("Error:" + e));
    }
}
//Fast forwards the audio file by 30 seconds.
function forwardAudio() {
    try {
        var oAudio = document.getElementById('myaudio');
        oAudio.currentTime += 30.0;
    } catch (e) {
        // Fail silently but show in F12 developer tools console
        if (window.console && console.error("Error:" + e));
    }
}
//Restart the audio file to the beginning.
function restartAudio() {
    try {
        var oAudio = document.getElementById('myaudio');
        oAudio.currentTime = 0;
    } catch (e) {
        // Fail silently but show in F12 developer tools console
        if (window.console && console.error("Error:" + e));
    }
}
//added events
function initEvents() {
    var canvas = document.getElementById('canvas');
    var oAudio = document.getElementById('myaudio');
    //set up event to update the progress bar
    oAudio.addEventListener("timeupdate", progressBar, true);
    //set up mouse click to control position of audio
    canvas.addEventListener("click", function (e) {
        //this might seem redundant, but this these are needed later - make global to remove these
        var oAudio = document.getElementById('myaudio');
        var canvas = document.getElementById('canvas');
        if (!e) {
            e = window.event;
        } //get the latest windows event if it isn't set
        try {
            //calculate the current time based on position of mouse cursor in canvas box
            oAudio.currentTime = oAudio.duration * (e.offsetX / canvas.clientWidth);
        } catch (err) {
            // Fail silently but show in F12 developer tools console
            if (window.console && console.error("Error:" + err));
        }
    }, true);
}

//this event gets fired when a page has loaded
window.addEventListener("DOMContentLoaded", initEvents, false);


// Duration
var audio = document.getElementById('myaudio');

function readableDuration(seconds) {
    sec = Math.floor(seconds);    
    min = Math.floor(sec / 60);
    min = min >= 10 ? min : '0' + min;    
    sec = Math.floor(sec % 60);
    sec = sec >= 10 ? sec : '0' + sec; 
    return min + ':' + sec;
}

audio.addEventListener('timeupdate',function(){
    var duration = audio.duration;

    if (isNaN(duration)) {
        $(".duration").text("00:00");
    } else {
        $(".duration").text(readableDuration(duration));
    }
    
}, false);

// Countdown
/*
audio.addEventListener("timeupdate", function() {
    var timeleft = document.getElementById('timeleft'),
        duration = parseInt( audio.duration ),
        currentTime = parseInt( audio.currentTime ),
        timeLeft = duration - currentTime,
        s, m;

    s = timeLeft % 60;
    m = Math.floor( timeLeft / 60 ) % 60;
    
    s = s < 10 ? "0"+s : s;
    m = m < 10 ? "0"+m : m;

    // console.log(timeleft = m+":"+s);
    
}, false);
*/

// Countup
audio.addEventListener("timeupdate", function() {
    var timeline = document.getElementById('duration');
    var s = parseInt(audio.currentTime % 60);
    var m = parseInt((audio.currentTime / 60) % 60);
    if (m < 10) {
        if (s < 10) {
            $(".time-left").text(timeline = '0' + m + ':0' + s);
        }
        else {
            $(".time-left").text(timeline = '0'+ m + ':' + s);
        }
    } else {
        if (s < 10) {
            $(".time-left").text(timeline = '0' + m + ':0' + s);
        }
        else {
            $(".time-left").text(timeline = '0'+ m + ':' + s);
        }
    }
    
}, false);



