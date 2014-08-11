MailRTC
===================
This app is based on Voxbone’s powerful WebRTC Demo and let’s you add a Click2Call button in your email signature.

The plain WebRTC demo can be found here: https://github.com/voxbone/webrtc-auth-servlet

Blog post on full step-by-step guide available here: http://blog.voxbone.com/mailRTC

Usage & Recipe
===================
**Pre-requisite to run this demo app:**

- A Voxbone account
- A DID or test DID that is WebRTC enabled (through the Voxbone customer portal)
- A Voxbone WebRTC generated secret key
- Maven installed on your machine (For this demo, I used a mac and installed Maven with Homebrew)

**Step 1: The Package**

1. Fork and download this repository.

2. Structure:
    - src/main/Java: Voxbone’s webRTC servlet (Don’t touch unless you know what you’re doing)
    - src/main/WebAPP
        * JS: Call.js with the different event handlers and bootstrapping of Voxbone’s webRTC javascript object
        * Web-Inf: holed voxbone.properties to configure your credentials
        * index.jsp: links to the Voxbone javascript objects, front-end
        * CSS: play with it all you want
        * email-footer.html: click2call button to add in your email footer that opens the url with the DID parameters.
    - pom.xml: Maven plugin configs

**Step 2: Add Your Credentials**

In order to configure the app with your own credentials, you have 2 different approach:

1) using the voxbone.properties file ( this is default )
simply navigate to src/main/webapp/WEB-INF/ and edit voxbone.properties.
In this file, you can simply set the following 2 properties:

```
#voxbone webrtc username
com.voxbone.webrtc.auth.username=username
#voxbone webrtc secret
com.voxbone.webrtc.auth.secret=secret
```

2) Using the web.xml file.
In order to do that, first unset the config file by deleting the following:

```
        <init-param>
            <param-name>com.voxbone.webrtc.config_file</param-name>
            <param-value>/WEB-INF/voxbone.properties</param-value>
        </init-param>
```

Then uncomment and set the init param below

```
        <init-param>
            <description>Username used to authenticate</description>
            <param-name>com.voxbone.webrtc.auth.username</param-name>
            <param-value>username</param-value>
        </init-param>
```

```
        <init-param>
            <description>Secret key used to authenticate</description>
            <param-name>com.voxbone.webrtc.auth.secret</param-name>
            <param-value><![CDATA[secret]]></param-value>
        </init-param>
```

Where username is your Voxbone username and secret is the WebRTC secret password you defined for your voxbone account.

Please note that you shouldn't delete the ```<![CDATA[ ... ]]>```  tag as it allows you to input special character for your password.
just replace "secret" by your actual webrtc password.
CDATA is required to allow special character to be set within an xml file (such  like web.xml)


**Step 3: Add Your DID Number**

In email-footer.html, change the value of the number inside the ```<a>``` tag to match the webRTC-enabled DID you will be using. Use the E164 format without the “+”. Don’t forget to change the url to match the one you will be using in production (keep this one to test locally).

Example: (I’m using a Belgian DID )

```<a href="http://localhost:8080/?number=32xxxxxxxx">Click2Call</a>```

**Step 4: Create Your Email Signature**

Add email-footer.html into your email signature. Quick Gmail tutorial here: http://mydesignpad.com/how-to-install-html-email-signature-for-google-gmail/

**Step 5: Run the Server**

cd into the root directory and run the command:
```mvn clean tomcat7:run```

**Step 6: Launch the App**

Start creating a new email and click on your signature’s Click2Call button. This will open http://localhost:8080/?number=32xxxxxxxx and launch the call directly.

Or access your demo directly by typing http://localhost:8080/?number=32xxxxxxxx in your browser.

**Additional Quick Configs:**

- You can change the email-footer <a> tag’s href to also add your name as a value and pass it into the first name and last name fields in index.jsf

- You can add your own picture under the profile <img> tag in index.jsf

- You can decide not to have the call launch automatically as the window loads by removing the callTimer variable, it’s interval, and it’s occurrence in the makeCall function. Basically remove these 3 lines:

`````
    var callTimer;
    callTimer = window.setInterval(function(){makeCall()},1000);
    window.clearTimeout(callTimer);

`````

- By uncommenting  ```//voxbone.WebRTC.configuration.uri = "caller-id@voxbone.com”;``` you can set your chosen caller-id and it will be reflected in your CDRs

- Enable the input element for the phone number so you can manually change the DID to be called.

- WebRTC is extremely flexible and our framework allows for full playability, play around with the other demos and let us know what you’ve built!

Compatibility
=============

**Desktop**

- Firefox 3+
- Chrome 4+
- Opera 9+

**Mobile**

- Opera Mobile 10+
- Chrome for Android 18+
- Firefox for Android 15+