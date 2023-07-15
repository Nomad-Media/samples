## Asset Uploads Python
Learning to user the Nomad API asset/upload path to update an asset in Python

## Asset Upload API Sample Code

This walk through outlines how to use the sample code for the asset API process that Nomad provides using Python.

## Prerequisites

Visual Studio Code or similar code editor

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).

## Step 1

Download the code sample from [here](https://download-directory.github.io/?url=https://github.com/Nomad-Media/samples/tree/main/nomad-samples/python/asset_upload) and unzip it. Once unzipped you should see this:

![](https://files.readme.io/d64022a-image.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

Go to asset_uploads.py and run the code. It will prompt you for your authentication token. To find out how to generate you authentication token go [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Enter your authentication token into the terminal.

![](https://files.readme.io/714f754-image.png)

## Step 3

To upload a file, first enter the display name for your asset. If you leave it blank, it will default to the name of your file. Then, enter the upload overwrite option you want to select. Replace replaces an existing asset, continue continues the upload of an asset that is currently uploading, and cancel cancels the upload of an asset that is uploading. Then, enter the file path, related content id you want to add to the asset, and whether or not you want to use multi-thread upload.

![](https://files.readme.io/5c0eb7b-image.png)

![](https://files.readme.io/d66f35c-image.png)
