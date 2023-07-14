# Video Tracking Python
Learning to use the Nomad API asset/tracking paths to track videos in Javascript

## Asset/Tracking API Sample Code

This walk-through outlines how to use the sample code for the asset/tracking API process that Nomad provides using Python.

## Prerequisites

- Visual Studio Code or similar code editor

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).

## Step 1

Download the code sample from [here](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FNomad-Media%2Fsamples%2Ftree%2Fmain%2Fnomad-samples%2Fpython%2Fvideo_compare_api) and unzip it. Once unzipped you should see this:

![](https://files.readme.io/0361cf3-image.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

![](https://files.readme.io/5dd144d-image.png)

Go to media_api.py and run the code. It should ask for your authentication token. To find out how to generate you authentication token go [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Enter your authentication token into the terminal.

![](https://files.readme.io/78fabc0-image.png)

## Step 3

To send the tracking data for the current seconds in the video player, enter seconds. Then enter the asset id for the video the user is watching you want to track and the number of seconds you want to use for how often to send the video beacon progress tracking data.

![](https://files.readme.io/6cc9e56-image.png)

## Step 4

To send the tracking data for the quartile in the video player for the current asset the user is watching, enter quartile. Then enter the asset id of the video the user is watching, the quartile you want to track under tracking events.

![](https://files.readme.io/f90f784-image.png)

## Step 5

To hide a user's video tracking data, enter hidden. Then enter the asset id for the video they want removed from their watch-list.

![](https://files.readme.io/0fb7fba-image.png)
