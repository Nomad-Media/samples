## Account Registration Sample Code

This walkthrough outlines how to use the sample code for registration process that Nomad provides using Javascript.

## Prerequisites

- Visual Studio Code or similar code editor
- Live Server or similar local web development server 

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).
> 
> You can download Live Server [here](https://ritwickdey.github.io/vscode-live-server/).

## Step 1

Open the folder samples/nomad-samples/js/account-registration. You should see this:

![](https://files.readme.io/e34fb25-registration.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

![](https://files.readme.io/1df136e-registrationvs.png)

## Step 3

In order to run the Nomad API calls, you need to change your port to port 4200. First go to settings (ctrl+,). Then look up port attributes.

![](https://files.readme.io/7ca4a72-settings.png)

Click on "Edit in settings.json" and change liveServer.settings.port to 4200. Save your changes.

![](https://files.readme.io/199b2b4-liveserver.png)

## Step 4

On the Explorer tab on the left, right-click on account-register.html and click "Open with Live Server".

![](https://files.readme.io/582bea0-regls.png)

This will redirect you to a browser with the html page.

![](https://files.readme.io/706add9-regweb.png)

## Step 5

Replace the localhost address (127.0.0.1) to "localhost". If done correctly, the website should remain after the change.

![](https://files.readme.io/2c06ebb-regweb.png)

![](https://files.readme.io/e7db941-regwebl.png)

## Step 6

For the inputs, you first need to enter your email into "Email" and click the "Register" button. Check your email to see if you received a code from Nomad. If you did not, press the resend code button, and another code will be sent to you.

![](https://files.readme.io/e95dbba-email.png)

Type the code into the "Enter Code" and click "Submit". If done correctly, you should get a message in the console saying "Account now verified".
