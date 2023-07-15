# Content Groups API
Learning to use the Nomad API contentGroups path to work with content groups in Python

## Content Groups API Sample Code

This walkthrough outlines how to use the sample code for the content group API process that Nomad provides using Python.

## Prerequisites

- Visual Studio Code or similar code editor

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).

## Step 1

Download the code sample from [here](https://download-directory.github.io/?url=https://github.com/Nomad-Media/samples/tree/main/nomad-samples/python/content_groups) and unzip it. Once unzipped you should see this:

![](https://files.readme.io/9bb3331-image.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

Go to content_groups.py and run the code. It should ask for your authentication token. To find out how to generate you authentication token go [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Enter your authentication token into the terminal.

![](https://files.readme.io/a58a950-image.png)

## Step 3

To get a specific content group, enter get group into the terminal. It will then prompt you for the content group id of the content group you want to get. You can only see a content group if you are the owner, or have been shared the content group.

![](https://files.readme.io/c7deb16-image.png)

## Step 4

To get your content groups and the content groups shared with you, enter get groups into the terminal. You can only see a content group if you are the owner, or have been shared the content group.

![](https://files.readme.io/9455b94-image.png)

## Step 5

To create a content group, enter create into the terminal. Then you will be prompt to input a content group name.

![](https://files.readme.io/260c68b-image.png)

## Step 6

To add content to a content group, enter add into the terminal. Then you will be prompted for a content group id and content ids.

![](https://files.readme.io/d76793f-image.png)

## Step 7

To remove content from a content group, enter remove into the terminal. Then you will be prompted for an content group id and content ids.

![](https://files.readme.io/cbbab0e-image.png)

## Step 8

To rename  group, enter rename into the terminal. Then you will be prompted for an content group id and a new name for the content group.

![](https://files.readme.io/9fd5dac-image.png)

## Step 9

To start sharing a content group with another user, enter start sharing into the terminal. Then enter the content group id for the content. You will then be asked for the user id of the user you want to share the content with. When you enter the user id, you will be prompted if you want to enter another user id. Enter y to keep on entering user ids and n to continue.

![](https://files.readme.io/4fd023f-image.png)

## Step 10

To stop sharing a content group with another user, enter stop sharing into the terminal. Then enter the content group id for the content. You will then be asked for the user id of the user you want to stop sharing the content with. When you enter the user id, you will be prompted if you want to enter another user id. Enter y to keep on entering user ids and n to continue.

![](https://files.readme.io/f5ea060-image.png)

## Step 11

To get the portal groups, enter get portal into the terminal.

![](https://files.readme.io/bd3a9a7-image.png)

## Step 12

To delete an content group, enter delete into the terminal. Then you will be prompted for the content group id for the content group you want to delete.

![](https://files.readme.io/2766dcf-image.png)
