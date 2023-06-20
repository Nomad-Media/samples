# Media Api Javascript
Learning to user the Nomad API portal/search and media/form paths to update a user in Javascript

## Portal/Search and Media/Form API Sample Code

This walkthrough outlines how to use the sample code for the portal/search and media/form API process that Nomad provides using Javascript.

## Prerequisites

- Visual Studio Code or similar code editor

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).
> 
> You can download Live Server [here](https://ritwickdey.github.io/vscode-live-server/).

## Step 1

Open the folder  samples/nomad-samples/js/media-api. You should see this:

![](https://files.readme.io/a2cbcd1-image.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

![](https://files.readme.io/77ad003-image.png)

## Step 3

In order to run the Nomad API calls, you need to change your port to port 4200. First go to settings (ctrl+,). Then look up port attributes.

![](https://files.readme.io/7ca4a72-settings.png)

Click on "Edit in settings.json" and change liveServer.settings.port to 4200. Save your changes.

![](https://files.readme.io/199b2b4-liveserver.png)

## Step 4

On the Explorer tab on the left, right-click on account-register.html and click "Open with Live Server".

![](https://files.readme.io/4f6992a-image.png)

This will redirect you to a browser with the html page.

![](https://files.readme.io/6f8b4b5-image.png)

## Step 5

Replace the localhost address (127.0.0.1) to "localhost". If done correctly, the website should remain after the change.

![](https://files.readme.io/c80f533-mediaweb.png)

![](https://files.readme.io/c9e6426-medials.png)

## Step 6

To use any of the API calls here, you need to input your authentication token. You can find out how to get your authentication token [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Once you enter your authentication token into the field and click submit, it will update the token in the program so that you can use the other functions.

![](https://files.readme.io/2698706-image.png)

## Step 7

To use content search, you can use Filters to filter your search by adding filters, where you search for a field name and use an operator, e.g equals, and a value. Click add filter to add filters, and you can enter as many filters as you want.

![](https://files.readme.io/7522e5d-image.png)

![](https://files.readme.io/00d3dbf-image.png)

## Step 8

To search for media, use a search query and/or ids to filter the search. You can sort the fields of the result by entering you want the field you want to sort by and choosing ascending/descending to choose the order the sorted field gets sorted by.

![](https://files.readme.io/c382f96-image.png)

![](https://files.readme.io/6f13f01-image.png)

## Step 9

Before you make a form, you need to create the content definition where you want to post records too first. Follow the instructions [here](doc:content-definitions) on how to create a content definition and find its ID. To make a form, enter the id of the content definition you want to use, the first and last name, whether you want it to be active or not, the start date, the lookup id, and the description.

![](https://files.readme.io/ed8d475-image.png)
