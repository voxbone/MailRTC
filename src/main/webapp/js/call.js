// Register callbacks to desired call events
var eventHandlers = {

    'progress':   function(e){
                        $("#dial").html('<i id="phone-dial" class="icon-phone"></i> Calling');
                        $( "#phone-dial" ).toggleClass( "spin", true );
                        $( "#dial" ).toggleClass( "disabled", true );
                        $( "#dial" ).attr('disabled', 'disabled');
                        $( "#hangup" ).toggleClass( "disabled", false );
                        $( "#mute" ).toggleClass( "disabled", false );
                    },
    'failed':     function(e){
                        $( "#dial" ).html('Failed to Connect');
                        $( "#dial" ).toggleClass( "incall", true );
                        $( "#dial" ).attr('disabled', 'disabled');
                        $( "#hangup" ).toggleClass( "disabled", true );
                        $( "#mute" ).toggleClass( "disabled", true );
                        timeout = setTimeout(function() {
                            $("#dial").html('<i class="icon-phone"></i>');
                            $( "#dial" ).removeAttr('disabled');
                            $( "#dial" ).toggleClass( "incall", false );
                            $( "#dial" ).toggleClass( "disabled", false );
                        }, 2500);
                    },
    'started':    function(e){
                        // Start stopwatch
                        stopwatch.startStop();
                        $( "#dial" ).toggleClass( "incall", true );
                        $( "#dial" ).attr('disabled', 'disabled');
                    },
    'ended':      function(e){
                        // Stop stopwatch
                        stopwatch.startStop();

                        $("#dial").html('Call Ended');
                        $( "#hangup" ).toggleClass( "disabled", true );
                        $( "#mute" ).toggleClass( "disabled", true );
                        timeout = setTimeout(function() {
                                $( "#dial" ).toggleClass( "incall", false );
                                $( "#dial" ).toggleClass( "disabled", false );
                                $( "#dial" ).removeAttr('disabled');
                            }, 2000);
                        timeout = setTimeout(function() {
                                $("#dial").html('<i class="icon-phone"></i>');
                            }, 2500);
                    }
};

/** Make call Event **/
var callTimer;
function makeCall(){
        window.clearTimeout(callTimer);
        $( "#dial" ).html('<i id="phone-dial" class="icon-phone"></i> Dialing');
        voxbone.WebRTC.call(document.getElementById("number").value);
        $( "#phone-dial" ).toggleClass( "spin", true );
        $( "#dial" ).toggleClass( "disabled", true );
        $( "#dial" ).attr('disabled', 'disabled');
        $( "#hangup" ).toggleClass( "disabled", true );
        $( "#mute" ).toggleClass( "disabled", true );
};

// Terminate call when page refreshed/exited
// window.onbeforeunload=function(e){
//     rtcSession.terminate();
// }

/** This part is required as it handle Voxbone WebRTC initialization **/
function init(){
    // Set the webrtc auth server url (url below it the default one)
    voxbone.WebRTC.authServerURL = "https://webrtc.voxbone.com/rest/authentication/createToken";

    // Force the preferedPop to TEST.
    //This can be usefull if you need  to get your webrtc calls troubleshooted
    //If this is not set, a ping to each pop will be issued to determine which is the most optimal for the user
    //Default is to use the ping mechanism to determine the preferedPop.
    //voxbone.WebRTC.preferedPop = 'TEST';

    // set custom event handlers
    voxbone.WebRTC.customEventHandler = eventHandlers;

    //Set the caller-id, domain name gets automatically stripped off
    //Note that It must be a valid sip uri.
    //Default value is: voxrtc@voxbone.com
    //voxbone.WebRTC.configuration.uri = "caller-id@voxbone.com";

    //Bootstrap Voxbone WebRTC javascript object
    voxbone.WebRTC.init(voxrtc_config);

    /** Parse through Email footer url for Number value to call **/
    function getURLParameter(name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
        }
    var number = getURLParameter('number');
    document.getElementById('number').value = '+'+number;

    /** Additional Parameters for profile name **/
    // var firstname = getURLParameter('firstname');
    // var lastname = getURLParameter('lastname');
    // document.getElementById('firstname').value = firstname + ' ' + lastname;

    /** Onload Wait for Auth then Make call **/
    callTimer = window.setInterval(function(){makeCall()},1000);

    /** Onload disable buttons **/
    $( "#dial" ).toggleClass( "disabled", true );
    $( "#dial" ).attr('disabled', 'disabled');
    $( "#hangup" ).toggleClass( "disabled", true );
    $( "#mute" ).toggleClass( "disabled", true );
};

/** Optional part, only use to play with mute **/
function toggleMute(){
    var button = document.getElementById("mute");
    if( voxbone.WebRTC.isMuted ){
        voxbone.WebRTC.unmute();
        button.value = "mute";
        $( "#mute" ).toggleClass( "muted", false );

    }else{
        voxbone.WebRTC.mute();
        button.value = "unmute";
        $( "#mute" ).toggleClass( "muted", true );

    }
}
/** Call timer **/
var stopwatch = new Stopwatch(function(runtime) {
   // format time as m:ss
   var minutes = Math.floor(runtime / 60000);
   var seconds = Math.floor(runtime % 60000 / 1000);
   var displayText = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
   $("#dial").html("In Call " + displayText);
});