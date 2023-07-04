# Content Admin API Python
Learning to use the Nomad API content and contentDefinition path to work with tags/collections, related content, custom properties, and content defintions in Python

## Admin and Content Definition API Sample Code

This walkthrough outlines how to use the sample code for the content and contentDefinition API process that Nomad provides using Javascript.

## Prerequisites

- Visual Studio Code or similar code editor

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).

## Step 1

Open the folder  samples/nomad-samples/python/content_admin_api. You should see this:

![](https://files.readme.io/a15d15c-image.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

![](https://files.readme.io/c5426df-image.png)

Go to content_admin.py and run the code. It should ask for your authentication token. To find out how to generate you authentication token go [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Enter your authentication token into the terminal.

![](https://files.readme.io/b87e81d-image.png)

## Step 3

To add a tag or collection, enter "add tag/collection" into the terminal. Then you will be prompted to input whether you want to add a tag or collection, the content id, the content definition, the name, the tag id, and whether you want to make a new tag/collection or use an existing tag. New can only be false for tags.

![](https://files.readme.io/94137e1-image.png)

## Step 4

To remove a tag or collection enter "remove tag/collection. Then you will be prompted to input whether you want to delete a tag or collection, the content id, the content definition, and the tag id. The tag id is optional if you are deleting a collection.

![](https://files.readme.io/62457e7-image.png)

## Step 5

To add a related content to an existing content, enter "add related". Then you will be prompted to input the content id, the content id for the related content, and the content definition.

![](https://files.readme.io/c0e5145-image.png)

## Step 6

To delete a related content to an existing content, enter "delete related". Then you will be prompted to input the content id, the content id for the related content, and the content definition.

![](https://files.readme.io/9db4059-image.png)

## Step 7

To add a custom property to an asset, enter "add custom". Then you will be prompted to input the asset id, the display name, and the property name and value for each property you want to add.

![](https://files.readme.io/f4d141f-image.png)

## Step 8

To add a content definition, enter "create def".
