# Event Instance Scheduler Python
Learning to user the Nomad API content path to create, update, and delete instances in Python

## Event Instance API Sample Code

This walkthrough outlines how to use the sample code for the content API process that Nomad provides using Python.

## Prerequisites

- Visual Studio Code or similar code editor

> 📘 Note
> 
> You can download Visual Studio code [here](https://code.visualstudio.com/).

## Step 1

Download the code sample from [here](https://download-directory.github.io/?url=https://github.com/Nomad-Media/samples/tree/main/nomad-samples/python/event_instance_scheduler) and unzip it. Once unzipped you should see this:

![](https://files.readme.io/cf9a948-image.png)

## Step 2

Open the folder in vscode. You should see the same file contents as above.

![](https://files.readme.io/cfcfddd-image.png)

Go to event_instance.py and run the code.  It will prompt you for your authentication token. To find out how to generate you authentication token go [here](https://github.com/Nomad-Media/samples/blob/main/nomad-samples/js/account-authenticaton/Readme.md). Enter your authentication token into the terminal.

![](https://files.readme.io/52e05c7-image.png)


## Step 3:

To create/update an instance enter create/update. Then you will be asked for a series of inputs. If you don't insert a slate video id, the default one will be used. If you want to update an instance, you need to fill in the content id of the instance you want to update. For the live series A and primary live stream url, you only enter one or the other. If you are going to create an instance using a series and don't override the series, you only need to enter the id, content definition id, instance name, start and end datetime, disabled, and the primary live stream url along with the slate description and id. If you are updating an instance, then you need to enter the content id. Otherwise enter at minimum the values that aren't marked optional.

![image](https://github.com/Nomad-Media/samples/assets/47163171/7fa87cc8-138a-4b69-858a-5c58e9817eb6)

![image](https://github.com/Nomad-Media/samples/assets/47163171/d35642cc-d590-46e9-880e-14d267be3ae9)

## Step 4

To delete an instance, enter delete. Then input the content id and the content definition of the instance that you want to delete.

![](https://files.readme.io/55b10e0-image.png)
