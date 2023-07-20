# Content Groups API Javascript
Learning to user the Nomad API contentGroup path to update a user in Javascript

## Content Groups API Sample Code

This walkthrough outlines how to use the sample code for the content group API process that Nomad provides using Python

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).
> 
> You can download Live Server [here](https://ritwickdey.github.io/vscode-live-server/).

## Step 1

Open the folder samples/nomad-samples/js/content-groups. You should see this:

![](https://files.readme.io/c93eb17-image.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

![](https://files.readme.io/4056c16-image.png)

## Step 3

In order to run the Nomad API calls, you need to change your port to port 4200. First go to settings (ctrl+,). Then look up port attributes.

![](https://files.readme.io/7ca4a72-settings.png)

Click on "Edit in settings.json" and change liveServer.settings.port to 4200. Save your changes.

![](https://files.readme.io/199b2b4-liveserver.png)

## Step 4

On the Explorer tab on the left, right-click on asset-group.html and click "Open with Live Server".

![](https://files.readme.io/2e7c7e8-assetgroupls.png)

This will redirect you to a browser with the html page.

![](https://files.readme.io/345da69-image.png)

## Step 5

Replace the localhost address (127.0.0.1) to "localhost". If done correctly, the website should remain after the change.

![](https://files.readme.io/5c06abb-contentadminweb.png)

![](https://files.readme.io/f84c0d2-contentgroupls.png)

## Step 6

To use any of the API calls here, you need to input your authentication token. You can find out how to get your authentication token [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Once you enter your authentication token into the field and click submit, it will update the token in the program so that you can use the other functions.

![](https://files.readme.io/218e065-image.png)

## Step 7

To get a specific content group,  enter the content group id of the content group you want to get under Get Content Group . You can only see a content group if you are the owner, or have been shared the content group.

![](https://files.readme.io/6dddbbf-image.png)

![](https://files.readme.io/3e9859b-image.png)

## Step 8

To get all of the current asset groups, all you need to do is click the submit button under Get Asset Groups. Once you click submit, you will get a list of current asset groups.

![](https://files.readme.io/de3241d-image.png)

![](https://files.readme.io/c3b8b2d-image.png)

## Step 8

To create a content group, enter a name. If you don't enter a name, the name will default to My Collection.

![](https://files.readme.io/2282465-image.png)

![](https://files.readme.io/0b65435-image.png)

## Step 9

To add content to your content group, enter the id of the content group you want to add the content to under Content Group Id. Then input the content ids of the assets you want to add to the asset group under Content Ids and click submit. Separate the values by a comma with no space after the comma.

![](https://files.readme.io/605258c-image.png)

![](https://files.readme.io/2f239d7-image.png)

## Step 10

To remove content from your content group, enter the id of the content group you want to remove the assets from under Content Group Id. Then input the content id(s) of the content you want to remove from the content group under Content Ids and click submit. Separate the values by a comma with no space after the comma.

![](https://files.readme.io/8df246e-image.png)

![](https://files.readme.io/39e85a5-image.png)

## Step 11

To rename your asset group, enter the id of the asset group you want to rename the assets from under "Asset Group Id:". Then enter the new name for the asset group and click submit.

![](https://files.readme.io/65e529c-image.png)

![](https://files.readme.io/f9c5bef-image.png)

## Step 12

To delete your content group, enter the id of the content group you want to delete under Content Group Id. Then click submit.

![](https://files.readme.io/9bcd051-image.png)

![](https://files.readme.io/0308b1c-image.png)
