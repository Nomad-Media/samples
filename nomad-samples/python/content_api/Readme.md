# Content API Python
Learning to use the Nomad API contetnGroups path to work with content groups in Python

## Content API Sample Code

This walkthrough outlines how to use the sample code for the content API process that Nomad provides using Python.

## Prerequisites

- Visual Studio Code or similar code editor

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).

## Step 1

Download the code sample from [here](https://download-directory.github.io/?url=https://github.com/Nomad-Media/samples/tree/main/nomad-samples/python/content_api) and unzip it. Once unzipped you should see this:

![](https://files.readme.io/2ee56c8-image.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

![](https://files.readme.io/127bc97-image.png)

Go to content.py and run the code. It will prompt you for your authentication token. To find out how to generate you authentication token go [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Enter your authentication token into the terminal.

## Step 3

To create content, enter the content definition id you want to create the content in. This will create a new blank content in your content definition.

![](https://files.readme.io/70caf23-image.png)

## Step 4

To add/update information to your content, enter update when prompted. Then enter the content definition id of the content you want to update, the id of the content you want to update, and the fields you want to update

![](https://files.readme.io/bff0e06-image.png)

## Step 5

To delete content, enter delete when prompted. Then enter the content definition id of the content you wand to delete and the id of the content you want to delete.

![](https://files.readme.io/b8a41ca-image.png)
