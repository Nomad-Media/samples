# Event Instance Scheduler Javascript
Learning to user the Nomad API content path to create, update, and delete instances in Javascript

## Event Instance API Sample Code

This walkthrough outlines how to use the sample code for the content API process that Nomad provides using JavaScript.

## Prerequisites

- Visual Studio Code or similar code editor

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).
> 
> You can download Live Server [here](https://ritwickdey.github.io/vscode-live-server/).

## Step 1

Open the folder  samples/nomad-samples/js/event-instance-scheduler. You should see this:

![](https://files.readme.io/33e6487-image.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

![](https://files.readme.io/d1d2f7b-image.png)

## Step 3

In order to run the Nomad API calls, you need to change your port to port 4200. First go to settings (ctrl+,). Then look up port attributes.

![](https://files.readme.io/7ca4a72-settings.png)

Click on "Edit in settings.json" and change liveServer.settings.port to 4200. Save your changes.

![](https://files.readme.io/199b2b4-liveserver.png)

## Step 4

On the Explorer tab on the left, right-click on account-register.html and click "Open with Live Server".

![](https://files.readme.io/2ea3a1f-image.png)

This will redirect you to a browser with the html page.

![](https://files.readme.io/285b866-image.png)

## Step 5

Replace the localhost address (127.0.0.1) to "localhost". If done correctly, the website should remain after the change.

![](https://files.readme.io/b931255-eventinstanceweb.png)

![](https://files.readme.io/ce02634-eventinstancelh.png)

## Step 6

To use any of the API calls here, you need to input your authentication token. You can find out how to get your authentication token [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Once you enter your authentication token into the field and click submit, it will update the token in the program so that you can use the other functions.

![](https://files.readme.io/0833290-image.png)

## Step 7

To create an instance, fill at minimum all of the required fields. If you don't insert a slate video id, the default one will be used. If you want to update an instance, you need to fill in the content id of the instance you want to update in addition to at least the required fields. You can only enter either a primary live stream input or a primary live steam url. If you select "Override Series Default" to false, you only need to enter the id, the content definition id, the instance name, the start and end datetime, and primary stream input/url.

![](https://files.readme.io/a00e12c-image.png)

![](https://files.readme.io/b57f411-image.png)

## Step 8

To delete an instance, you need the content id, and the content definition id.

![](https://files.readme.io/6fc0429-image.png)
