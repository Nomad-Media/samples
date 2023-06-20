## AssetGroups API Sample Code

This walkthrough outlines how to use the sample code for the asset group API process that Nomad provides using Javascript

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).
> 
> You can download Live Server [here](https://ritwickdey.github.io/vscode-live-server/).

## Step 1

Open the folder samples/nomad-samples/js/asset-groups. You should see this:

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

On the Explorer tab on the left, right-click on asset-groups.html and click "Open with Live Server".

![](https://files.readme.io/2e7c7e8-assetgroupls.png)

This will redirect you to a browser with the html page.

![](https://files.readme.io/a6f01bd-image.png)

## Step 5

Replace the localhost address (127.0.0.1) to "localhost". If done correctly, the website should remain after the change.

![](https://files.readme.io/60ced4b-assetgroupweb.png)

![](https://files.readme.io/c360c2b-assetgrouplh.png)

## Step 6

To use any of the API calls here, you need to input your authentication token. You can find out how to get your authentication token [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Once you enter your authentication token into the field and click submit, it will update the token in the program so that you can use the other functions.

![](https://files.readme.io/01ac6d3-image.png)

## Step 7

To get all of the current asset groups, all you need to do is click the submit button under Get Asset Groups. Once you click submit, you will get a list of current asset groups.

![](https://files.readme.io/9ac03ee-image.png)

## Step 8

To create an asset group, enter a name, or an id, and any assets you have.

![](https://files.readme.io/ba60680-image.png)

## Step 9

To add assets to your asset group, enter the id of the asset group you want to add the assets to under "Asset Group Id:". Then input the asset ids of the assets you want to add to the asset group under "Asset Ids" and click submit. Separate the values by a comma with no space after the comma.

![](https://files.readme.io/8ad40e3-image.png)

![](https://files.readme.io/32aa396-image.png)

## Step 10

To remove assets from your asset group, enter the id of the asset group you want to remove the assets from under "Asset Group Id:". Then input the asset ids of the assets you want to remove from the asset group under "Asset Ids" and click submit. Separate the values by a comma with no space after the comma.

![](https://files.readme.io/013ba80-image.png)

![](https://files.readme.io/fc207b7-image.png)

## Step 11

To rename your asset group, enter the id of the asset group you want to rename the assets from under "Asset Group Id:". Then enter the new name for the asset group and click submit.

![](https://files.readme.io/a84be63-image.png)

![](https://files.readme.io/fe90f45-image.png)

## Step 12

To delete your asset group, enter the id of the asset group you want to delete under "Asset Group Id:". Then click submit.

![](https://files.readme.io/42b3a00-image.png)
