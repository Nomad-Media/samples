# Content API Javascript
Learning to use the Nomad API contetnGroups path to work with content groups in Javascript

## Content API Sample Code

This walkthrough outlines how to use the sample code for the content API process that Nomad provides using Javascript.

## Prerequisites

- Visual Studio Code or similar code editor

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).
> 
> You can download Live Server [here](https://ritwickdey.github.io/vscode-live-server/).

## Step 1

Download the code sample from [here](https://download-directory.github.io/?url=https://github.com/Nomad-Media/samples/tree/main/nomad-samples/js/content-api) and unzip it. Once unzipped you should see this:

![](https://files.readme.io/a1bf763-image.png)



## Step 2

Open the folder in vscode. You should see the same file contents as above.

![](https://files.readme.io/0a26f9a-image.png)

## Step 3

In order to run the Nomad API calls, you need to change your port to port 4200. First go to settings (ctrl+,). Then look up port attributes.

![](https://files.readme.io/7ca4a72-settings.png)

Click on "Edit in settings.json" and change liveServer.settings.port to 4200. Save your changes.

![](https://files.readme.io/199b2b4-liveserver.png)

## Step 4

On the Explorer tab on the left, right-click on contents.html and click "Open with Live Server".

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/cf9f141-contentadminls.png",
        null,
        ""
      ],
      "align": "left"
    }
  ]
}
[/block]

This will redirect you to a browser with the html page.

![](https://files.readme.io/28c9314-image.png)

## Step 5

Replace the localhost address (127.0.0.1) to "localhost". If done correctly, the website should remain after the change.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b42b99b-content.png",
        null,
        null
      ],
      "align": "center"
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/117ca25-contentlh.png",
        null,
        null
      ],
      "align": "center"
    }
  ]
}
[/block]

## Step 6

To use any of the API calls here, you need to input your authentication token. You can find out how to get your authentication token [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Once you enter your authentication token into the field and click submit, it will update the token in the program so that you can use the other functions.

![](https://files.readme.io/585de92-image.png)

## Step 7

To create content, enter the id of the content definition you want to add the content to. This will create a new blank content in your content definition.

![](https://files.readme.io/0dd25fc-image.png)

![](https://files.readme.io/92d1622-image.png)

## Step 8

To update content, enter the id of the content definition you want to update the content to, the id of the content you want to update, and the properties (in json).

![](https://files.readme.io/20fcc5e-image.png)

![](https://files.readme.io/876a488-image.png)

## Step 9

To delete content, enter the id of the content definition the content is in and the id of the content.

![](https://files.readme.io/b601ba2-image.png)

![](https://files.readme.io/2976c42-image.png)
