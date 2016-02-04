<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Voxbone Click2Call</title>

    <!--     Styles and Fonts/Icons-->
    <link rel="stylesheet" href="css/fontello.css">
    <!--[if IE 7]><link rel="stylesheet" href="css/fontello-ie7.css"><![endif]-->
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="shortcut icon" type="image/x-icon" href="https://www.voxbone.com/images/favicon.png">
    <link rel="icon" type="video/x-png" href="https://www.voxbone.com/images/favicon.png">

    <!-- Scripts -->
    <script src="auth" type="text/javascript"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
    <script src="https://webrtc.voxbone.com/js/jssip-0.7.9-vox.js" type="text/javascript"></script>
    <script src="https://webrtc.voxbone.com/js/voxbone-0.0.3.js" type="text/javascript"></script>
    <script src="js/stopwatch.js" type="text/javascript"></script>
    <script src="js/call.js" type="text/javascript"></script>

</head>
<!-- invoke init() method when page is initializing -->
<body onLoad="init();">
    <form>
        <img src="assets/profile.png" id="picture" alt="">
        <hr>
        <p class="name" id="name"></p>
        <!-- input text which holds the number to dial -->
        <input type='text' id='number' value='' disabled="disabled"/>
        <!-- place a call using voxbone webrtc js lib -->
        <button type='button' id='dial' onClick="makeCall();">
            <i id="phone-dial" class="icon-phone"></i>
        </button>
        <!-- hangup the current call in progress -->
        <button type='button' id='hangup' class="options" onClick='voxbone.WebRTC.hangup();'>
            <i class="icon-phone"></i>
        </button>
        <!-- toggle mute ON/OFF -->
        <button id="mute" type="button" id="mute" class="options" onclick="toggleMute()">
            <i class="icon-mute"></i>
        </button>
        <br>
        <p class="disclaimer">You are now calling Voxbone using Voxbone's <a href="http://www.ucstrategies.com/unified-communications-expert-views/voxbone-offers-global-webrtc.aspx">Voxbone's WebRTC service</a>.   Calls are routed internationally using Voxbone's global data network.   Please note that the quality of this call is dependent of the quality of your internet connection and your microphone.</p>
        <a href="https://github.com/voxbone" class="branding"></a>
    </form>
</body>
</html>
