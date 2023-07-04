## ContentGroups API Sample Code

This walkthrough outlines how to use the sample code for the content group API process that Nomad provides using Javascript

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).
> 
> You can download Live Server [here](https://ritwickdey.github.io/vscode-live-server/).

## Step 1

Open the folder samples/nomad-samples/js/content-groups. You should see this:

![](https://files.readme.io/f893270-image.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

![](https://files.readme.io/c4fd057-image.png)

## Step 3

In order to run the Nomad API calls, you need to change your port to port 4200. First go to settings (ctrl+,). Then look up port attributes.

![](https://files.readme.io/7ca4a72-settings.png)

Click on "Edit in settings.json" and change liveServer.settings.port to 4200. Save your changes.

![](https://files.readme.io/199b2b4-liveserver.png)

## Step 4

On the Explorer tab on the left, right-click on content-groups.html and click "Open with Live Server".

![](https://files.readme.io/2e7c7e8-contentgroupls.png)

This will redirect you to a browser with the html page.

![](https://files.readme.io/a6f01bd-image.png)

## Step 5

Replace the localhost address (127.0.0.1) to "localhost". If done correctly, the website should remain after the change.

![](https://files.readme.io/60ced4b-contentgroupweb.png)

![](https://files.readme.io/c360c2b-contentgrouplh.png)

## Step 6

To use any of the API calls here, you need to input your authentication token. You can find out how to get your authentication token [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Once you enter your authentication token into the field and click submit, it will update the token in the program so that you can use the other functions.

![](https://files.readme.io/01ac6d3-image.png)

## Step 7

To get all of the current content groups, all you need to do is click the submit button under Get Content Groups. Once you click submit, you will get a list of current content groups.

![](https://files.readme.io/9ac03ee-image.png)

## Step 8

To create an content group, enter a name, or an id, and any contents you have.

![](https://files.readme.io/ba60680-image.png)

## Step 9

To add contents to your content group, enter the id of the content group you want to add the contents to under "Content Group Id:". Then input the content ids of the contents you want to add to the content group under "Content Ids" and click submit. Separate the values by a comma with no space after the comma.

![](https://files.readme.io/8ad40e3-image.png)

![](https://files.readme.io/32aa396-image.png)

## Step 10

To remove contents from your content group, enter the id of the content group you want to remove the contents from under "Content Group Id:". Then input the content ids of the contents you want to remove from the content group under "Content Ids" and click submit. Separate the values by a comma with no space after the comma.

![](https://files.readme.io/013ba80-image.png)

![](https://files.readme.io/fc207b7-image.png)

## Step 11

To rename your content group, enter the id of the content group you want to rename the contents from under "Content Group Id:". Then enter the new name for the content group and click submit.

![](https://files.readme.io/a84be63-image.png)

![](https://files.readme.io/fe90f45-image.png)

## Step 12

To delete your content group, enter the id of the content group you want to delete under "Content Group Id:". Then click submit.

![](https://files.readme.io/42b3a00-image.png)
