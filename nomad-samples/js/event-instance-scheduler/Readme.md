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

![image](https://github.com/Nomad-Media/samples/assets/47163171/5253486a-5253-4fb7-87e5-d8ae362ce5db)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

![](https://files.readme.io/d1d2f7b-image.png)

## Step 3

In order to run the Nomad API calls, you need to change your port to port 4200. First go to settings (ctrl+,). Then look up port attributes.

![](https://files.readme.io/7ca4a72-settings.png)

Click on "Edit in settings.json" and change liveServer.settings.port to 4200. Save your changes.

![](https://files.readme.io/199b2b4-liveserver.png)

## Step 4

On the Explorer tab on the left, right-click on event-instance-scheduler.html and click "Open with Live Server".

![](https://files.readme.io/2ea3a1f-image.png)

This will redirect you to a browser with the html page.

![](https://files.readme.io/aed0900-image.png)

## Step 5

Replace the localhost address (127.0.0.1) to "localhost". If done correctly, the website should remain after the change.

![](https://files.readme.io/86db6ff-eventinstanceweb.png)

![](https://files.readme.io/53a3ba4-eventinstancelh.png)

## Step 6

To use any of the API calls here, you need to input your authentication token. You can find out how to get your authentication token [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Once you enter your authentication token into the field and click submit, it will update the token in the program so that you can use the other functions.

![](https://files.readme.io/0833290-image.png)

## Step 7

To create an instance, fill at minimum all of the required fields. If you don't insert a slate video id, the default one will be used. If you want to update an instance, you need to fill in the content id of the instance you want to update in addition to at least the required fields. You can only enter either a primary live stream input or a primary live steam url. If you want to have recurring instances, put true for recurring. You will see that a couple of fields have changed and some have been added. Enter the start and end time, and the days that you want to have the instance recur. If you want to use an existing series to populate the fields, Put yes for "Do you want to use an existing series". Then all you have to do is enter the series description and id. If you want to use a series, but put in your own values for the other fields, put false for "Override Series Details".

![](https://files.readme.io/e6405d6-image.png)

*Default output*

![](https://files.readme.io/0452932-image.png)

*Recurring equals True*

![](https://files.readme.io/30e4455-image.png)

*Existing series equals Yes*


![](https://files.readme.io/b57f411-image.png)

## Step 8

To delete an instance, you need the content id, and the content definition id.

![](https://files.readme.io/6fc0429-image.png)

![](https://files.readme.io/6fc0429-image.png)
