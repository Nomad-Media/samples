# Media API Python
Learning to use the Nomad API portal/search and media/form paths to update a user in Javascript

## Portal/Search and Media/Form API Sample Code

This walk-through outlines how to use the sample code for the portal/search and media/form API process that Nomad provides using Python.

## Prerequisites

- Visual Studio Code or similar code editor

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).

## Step 1

Open the folder  samples/nomad-samples/python/media_api. You should see this:

![](https://files.readme.io/63f49a9-image.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above. 

![](https://files.readme.io/fc089a0-image.png)

Go to media_api.py and run the code. It should ask for your authentication token. To find out how to generate you authentication token go [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Enter your authentication token into the terminal.

![](https://files.readme.io/50d5c2f-image.png)

## Step 3

To perform a content search, enter content. For the fields of the search enter the field name, operator, and value. Add as many fields as you want by entering y when asked if you want to add another field. Then enter the field names that you want to display separated by a comma, and the name and order of the field you want to sort by.

![](https://files.readme.io/d240185-image.png)

## Step 4

To perform a media search, enter media. Enter the search query you want to use, the ids you want to search for, and the sort field and order you want to sort by.

![](https://files.readme.io/c9af533-image.png)

## Step 5

Before you make a form, you need to create the content definition where you want to post records too first. Follow the instructions [here](doc:content-definitions) on how to create a content definition and find its ID. To make a form enter form. Then enter the id of the content definition you want to use, the first and last name, whether you want it to be active or not, the start date, the lookup id, and the description.

![](https://files.readme.io/993c19e-image.png)
