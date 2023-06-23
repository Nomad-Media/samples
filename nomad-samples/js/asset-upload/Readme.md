# Asset Uploads Javascript
Learning to user the Nomad API asset/upload path to update an asset in Javascript

## Asset Upload API Sample Code

This walk through outlines how to use the sample code for the asset API process that Nomad provides using JavaScript.

## Prerequisites

- Visual Studio Code or similar code editor

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).
> 
> You can download Live Server [here](https://ritwickdey.github.io/vscode-live-server/).

## Step 1

Open the folder  samples/nomad-samples/js/asset-upload. You should see this:

![](https://files.readme.io/a6d6e56-image.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

![](https://files.readme.io/9641cbb-image.png)

## Step 3

In order to run the Nomad API calls, you need to change your port to port 4200. First go to settings (ctrl+,). Then look up port attributes.

![](https://files.readme.io/7ca4a72-settings.png)

Click on "Edit in settings.json" and change liveServer.settings.port to 4200. Save your changes.

![](https://files.readme.io/199b2b4-liveserver.png)

## Step 4

On the Explorer tab on the left, right-click on asset-uploads.html and click "Open with Live Server".

![](https://files.readme.io/e9af95e-image.png)

This will redirect you to a browser with the html page.

## Step 5

Replace the localhost address (127.0.0.1) to "localhost". If done correctly, the website should remain after the change.

## Step 6

To use any of the API calls here, you need to input your authentication token. You can find out how to get your authentication token [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Once you enter your authentication token into the field and click submit, it will update the token in the program so that you can use the other functions.

![](https://files.readme.io/989d36b-image.png)

## Step 7

Before you start uploading your asset, you need to add your asset into the asset-upload directory. For this example, I am going to upload the Nomad icon that is already in the directory.

## Step 8

To start the asset upload, under "Start Asset Upload" enter the name, upload overwrite option, file, related content id, and whether to use multi thread upload or not. If you don't enter a name, the name of the file is used instead. Replace replaces an existing asset, continue continues the upload of an asset that is currently uploading, and cancel cancels the upload of an asset that is uploading.

![](https://files.readme.io/281c773-image.png)

![](https://files.readme.io/ddae26e-image.png)
