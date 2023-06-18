# Content Admin API JavaScript
Learning to user the Nomad API content and contentDefinition path to update a user in Javascript

## Admin and Content Definition API Sample Code

This walkthrough outlines how to use the sample code for the admin and contentDefinition API process that Nomad provides using JavaScript.

## Prerequisites

- Visual Studio Code or similar code editor

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).
> 
> You can download Live Server [here](https://ritwickdey.github.io/vscode-live-server/).

## Step 1

Open the folder  samples/nomad-samples/python/content-admin. You should see this:

![](https://files.readme.io/31bc0f2-image.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

![](https://files.readme.io/dacf562-image.png)

## Step 3

In order to run the Nomad API calls, you need to change your port to port 4200. First go to settings (ctrl+,). Then look up port attributes.

![](https://files.readme.io/7ca4a72-settings.png)

Click on "Edit in settings.json" and change liveServer.settings.port to 4200. Save your changes.

![](https://files.readme.io/199b2b4-liveserver.png)

## Step 4

On the Explorer tab on the left, right-click on account-register.html and click "Open with Live Server".

![](https://files.readme.io/f443433-contentadminls.png)

This will redirect you to a browser with the html page.

## Step 5

Replace the localhost address (127.0.0.1) to "localhost". If done correctly, the website should remain after the change.

## Step 6

To use any of the API calls here, you need to input your authentication token. You can find out how to get your authentication token [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Once you enter your authentication token into the field and click submit, it will update the token in the program so that you can use the other functions.

![](https://files.readme.io/4d998e9-image.png)

## Step 7

To add a tag or collection, choose whether you want a tag or collection, enter the content id for the content you want to add you tag/collection to, the tag id for the tag (optional), the content type you are trying to add the tag/collection to, and the name of your tag/collection, and whether you want to create a new tag, or use an existing tag/collection. Create New can only be false for tags, and you need to enter the tag id for the tag you want to use. Once you are done filling all of the fields, click submit.

![](https://files.readme.io/81877c2-image.png)

![](https://files.readme.io/3d9451d-image.png)

## Step 8

To remove a tag or collection, choose if the property you want to delete is a tag or collection under "Tag or Collection". Then fill out the rest of the fields with the content id, tag id, and content definition of your content. Once you are done filling all of the fields, click submit.

![](https://files.readme.io/dec19f7-image.png)

![](https://files.readme.io/7caa9f9-image.png)

## Step 9

To add related content to your content, enter the content id of your content, the content id of your related content, and the content definition of your content. Once you are done filling all of the fields, click submit.

![](https://files.readme.io/fe41a10-image.png)

![](https://files.readme.io/3adf96f-image.png)

## Step 10

To delete related content to your content, enter the content id of your content, the content id of your related content, and the content definition of your content. Once you are done filling all of the fields, click submit.

![](https://files.readme.io/59b22d0-image.png)

![](https://files.readme.io/805a1f8-image.png)

## Step 11

To add a custom property, enter the asset id of you asset, the display name of the asset, the names of your custom properties, and the values of the custom properties. Once you are done filling all of the fields, click submit.

![](https://files.readme.io/dc678d5-image.png)

![](https://files.readme.io/f534145-image.png)

## Step 12

To create a content definition, click submit under "Create Content Definition".

![](https://files.readme.io/1758110-image.png)

![](https://files.readme.io/39f8563-image.png)

## Step 12

To update a content definition,
