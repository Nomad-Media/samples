# AssetGroups API
Learning to use the Nomad API assetGroup path to work with asset groups in Python

## AssetGroups API Sample Code

This walkthrough outlines how to use the sample code for the asset group API process that Nomad provides using Python.

## Prerequisites

- Visual Studio Code or similar code editor

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).

## Step 1

Open the folder  samples/nomad-samples/python/asset-groups. You should see this:

![](https://files.readme.io/408e073-image.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

![](https://files.readme.io/4544857-image.png)

Go to asset_groups.py and run the code. It should ask for your authentication token. To find out how to generate you authentication token go [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Enter your authentication token into the terminal.

![](https://files.readme.io/8d8717a-image.png)

## Step 3

To get your existing asset groups enter get into the terminal.

![](https://files.readme.io/c27821e-image.png)

## Step 4

To create an asset group, enter create into the terminal. Then you will be prompt to input an asset group id, an asset group name, and assets. You need to enter at least a name, or an id.

![](https://files.readme.io/ef7fe90-image.png)

## Step 5

To add an asset to an asset group, enter add into the terminal. Then you will be prompted for an asset group id and asset ids.

![](https://files.readme.io/7b06281-image.png)

## Step 6

To remove an asset from an asset group, enter remove into the terminal. Then you will be prompted for an asset group id and asset ids.

![](https://files.readme.io/d38de49-image.png)

## Step 7

To rename an asset group, enter rename into the terminal. Then you will be prompted for an asset group id and a new name for the asset group.

![](https://files.readme.io/6299f7c-image.png)

## Step 8

To delete an asset group, enter delete into the terminal. Then you will be prompted for the asset group id for the asset group you want to delete.
