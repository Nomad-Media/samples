# Video Tracking Javascript
Learning to use the Nomad API asset/tracking paths to update a user in Javascript

## Asset/Tracking API Sample Code

This walk-through outlines how to use the sample code for the portal/search and media/form API process that Nomad provides using JavaScript.

## Prerequisites

- Visual Studio Code or similar code editor

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).
> 
> You can download Live Server [here](https://ritwickdey.github.io/vscode-live-server/).

## Step 1

Open the folder  samples/nomad-samples/js/video-tracking. You should see this:

![](https://files.readme.io/a6b24fa-image.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

![](https://files.readme.io/564c730-image.png)

## Step 3

In order to run the Nomad API calls, you need to change your port to port 4200. First go to settings (ctrl+,). Then look up port attributes.

![](https://files.readme.io/7ca4a72-settings.png)

Click on "Edit in settings.json" and change liveServer.settings.port to 4200. Save your changes.

![](https://files.readme.io/199b2b4-liveserver.png)

## Step 4

On the Explorer tab on the left, right-click on account-register.html and click "Open with Live Server".

![](https://files.readme.io/22cfc1a-image.png)

This will redirect you to a browser with the html page.

![](https://files.readme.io/857b816-image.png)

## Step 5

Replace the localhost address (127.0.0.1) to "localhost". If done correctly, the website should remain after the change.

![](https://files.readme.io/3883009-videotrackingweb.png)

![](https://files.readme.io/4b3a6c6-videotrackinglh.png)

## Step 6

To use any of the API calls here, you need to input your authentication token. You can find out how to get your authentication token [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Once you enter your authentication token into the field and click submit, it will update the token in the program so that you can use the other functions.

![](https://files.readme.io/2ede52f-image.png)

## Step 7

To send the tracking data for the current seconds in the video player, enter the asset id for the video the user is watching you want to track, 0 for the tracking event and 120 for the seconds which is used for how often to send the video beacon progress tracking data.

![](https://files.readme.io/848d9c5-image.png)

![](https://files.readme.io/45af5b5-image.png)

## Step 8

To send the tracking data for the quartile in the video player for the current asset the user is watching, enter the asset id of the video the user is watching, the quartile you want to track under tracking events, and leave seconds blank.

![](https://files.readme.io/18b4749-image.png)

![](https://files.readme.io/45af5b5-image.png)

## Step 9

To hide a user's video tracking data, enter the asset id for the video they want removed from their watch-list, and 5 for the tracking event.

![](https://files.readme.io/2ee4776-image.png)

![](https://files.readme.io/45af5b5-image.png)
