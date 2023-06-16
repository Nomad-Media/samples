# Account Updates
Learning to user the Nomad API account path to update a user in Javascript

## Account Updates Sample Code

This walkthrough outlines how to use the sample code for account update process that Nomad provides using Python.

## Prerequisites

- Visual Studio Code or similar code editor
- Live Server or similar local web development server 

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).
> 
> You can download Live Server [here](https://ritwickdey.github.io/vscode-live-server/).

## Step 1

Open the folder samples/nomad-samples/js/account-updates. You should see this:

![](https://files.readme.io/012bc8b-image.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

![](https://files.readme.io/b49e755-image.png)

## Step 3

In order to run the Nomad API calls, you need to change your port to port 4200. First go to settings (ctrl+,). Then look up port attributes.

![](https://files.readme.io/7ca4a72-settings.png)

Click on "Edit in settings.json" and change liveServer.settings.port to 4200. Save your changes.

![](https://files.readme.io/199b2b4-liveserver.png)

## Step 4

On the Explorer tab on the left, right-click on account-register.html and click "Open with Live Server".

![](https://files.readme.io/65ce008-updatels.png)

This will redirect you to a browser with the html page.

![](https://files.readme.io/3867c30-image.png)

## Step 5

Replace the localhost address (127.0.0.1) to "localhost". If done correctly, the website should remain after the change.

![](https://files.readme.io/726a926-updateweb.png)

![](https://files.readme.io/4403706-updatelh.png)

## Step 6

To use any of the API calls here, you need to input your authentication token. You can find out how to get your authentication token [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Once you enter your authentication token into the field and click submit, it will update the token in the program so that you can use the other functions.

![](https://files.readme.io/e91d7b0-image.png)

## Step 7

To update the user, enter the desired email, first name, last name, and/or phone number and click update. 

## Step 8

To change your email, enter the new email you want to use under "Change Email" and click submit.

![](https://files.readme.io/a01e634-image.png)

## Step 9

To change your password, enter the new password you want to use under "Change Password" and click submit.
