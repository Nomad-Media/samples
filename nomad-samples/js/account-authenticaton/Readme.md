## Account Authentication Sample Code

This walkthrough outlines how to use the sample code for authentication process that Nomad provides using Python.

## Prerequisites

- Visual Studio Code or similar code editor
- Live Server or similar local web development server 

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).
> 
> You can download Live Server [here](https://ritwickdey.github.io/vscode-live-server/).

## Step 1

Download the Nomad Registration from [here](https://download-directory.github.io/?url=https://github.com/Nomad-Media/samples/tree/main/nomad-samples/js/account-authenticaton) and unzip it. Once unzipped you should see this:

![](https://files.readme.io/efea088-authdirjs.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

![](https://files.readme.io/43239b0-authvsdirjs.png)

## Step 3

In order to run the Nomad API calls, you need to change your port to port 4200. First go to settings (ctrl+,). Then look up port attributes.

![](https://files.readme.io/7ca4a72-settings.png)

Click on "Edit in settings.json" and change liveServer.settings.port to 4200. Save your changes.

![](https://files.readme.io/199b2b4-liveserver.png)

## Step 4

On the Explorer tab on the left, right-click on account-register.html and click "Open with Live Server".

![](https://files.readme.io/58cbd20-lsauthjs.png)

This will redirect you to a browser with the html page.

![](https://files.readme.io/7766ef2-authweb.png)

## Step 5

Replace the localhost address (127.0.0.1) to "localhost". If done correctly, the website should remain after the change.

![](https://files.readme.io/68c64df-authweb.png)

![](https://files.readme.io/1d7c930-authwebls.png)

## Step 6

Enter your Username and Password and click login. If your credentials are correct, you will receive a token.

![](https://files.readme.io/5dc7eec-image.png)

## Step 7

If you forgot your password, enter your email under "Enter Username" under "Forgot Password". You should get emailed a 6 digit code.

![](https://files.readme.io/e95dbba-email.png)

 Enter your code into "Enter Code" under "Reset Password" and your password will be reset.
