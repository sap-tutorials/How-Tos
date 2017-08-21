---
title: SAP HANA 2.0, express edition Troubleshooting
description: Troubleshoot common installation issues.
primary_tag: products>sap-hana\, express-edition
tags: [  tutorial>beginner, tutorial>how-to, products>sap-hana\,-express-edition  ]
---
## Prerequisites  
- **Setup:** You are following the instructions to install SAP HANA 2.0, express edition in the [Installing SAP HANA 2.0, express edition (Binary Installer Method)](http://www.sap.com/developer/tutorials/hxe-ua-installing-binary.html) tutorial or [Installing SAP HANA 2.0, express edition (Virtual Machine Method)](http://www.sap.com/developer/tutorials/hxe-ua-installing-vm-image.html) tutorial.

## Next Steps
- [View similar How-Tos](http://www.sap.com/developer/tutorials.html) or [View all How-Tos](http://www.sap.com/developer/tutorials.html)


## How-To Details
Perform these steps to resolve issues when installing SAP HANA 2.0, express edition.

### Time to Complete
**20 Min**.

---

[ACCORDION-BEGIN [Issue &#151; ](HDB Daemon not Running)]

You are installing SAP HANA, express edition on a Linux server using `hdblcm`. You receive this error:  

**Cannot start system.  
Start instance 00 on host '`hxehost.localdomain.com`' failed.  
FAIL: process `hdbdaemon` HDB Daemon not running.**

### Solution

Use `zypper` to check the `util-linux`, `util-linux-systemd` and `uuidd` packages to make sure they are at these versions:  

`zypper info util-linux util-linux-systemd uuidd`

The results need to show that you have at least the following versions installed:
`util-linux`: `util-linux-2.25-22.1`  
`uuidd` : `uuidd-2.25-22`  
`util-linux-systemd`: 2.25-22.1  

If you are missing any of the packages, or if the versions are outdated, install them using the `zypper` install command.

Check that socket activation is enabled and started. In a shell enter:

`systemctl` status `uuidd.socket`

If the status is inactive, start socket activation:

`systemctl` start `uuidd.socket`


[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Issue &#151; ](Virtual Machine: Checking Resource Usage)]

You are having memory issues on your VM and want to check resource usage.

### Solution

If you have HANA studio, right-click on the system and select **Configuration and Monitoring > Open Administration** and check the Overview and Landscape tabs for anything in red.

If you don't have HANA Studio, run the following queries in `hdbsql` to view SAP HANA resource usage:

`select service_name, round(effective_allocation_limit/1024/1024/1024, 1) as MemLimit, round(total_memory_used_size/1024/1024/1024,1) as MemUsed from m_service_memory;`

If the `MemUsed` is close to the `MemLimit`, you may encounter problems allocating memory.

Alternatively, you can run the Linux `free` command at the command line to see free resources:

`free -g`

The key number is in the second row (-/+ buffers/cache) in the **free** column. If this number is low, (e.g. 0 GB) you may have run out of memory when performing your recent operation.

You can also run the following command to see if you are running out of disk space on the VM's `filesystem`:  

`df -h`

Look for the **Use%** for the `/dev/sda1 filesystem`. If it is down to just a few GB, you may have run out of disk space when performing your recent operation.


[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Issue &#151;](SAP HANA XS Applications Run Error)]

You are trying to run a SAP HANA service on your SAP HANA 2.0, express edition installation and are receiving an error.

### Solution

Log in to your SAP HANA 2.0, express edition installation as `hxeadm`.

```
sudo su -l <sid>adm
```

Check which services are enabled on your machine:

```
xs apps
```

This operation may take 1-2 minutes to return the list of apps. You should see the following:

![XS Apps](hxe_xsa_webide.PNG)

If the service you're trying to use is shown as `STOPPED`, start it:

```
xs start <app>
```

It may take a few minutes for the system to get started. Run `xs apps` again to see if the app has started and that under `instances` the app shows `1/1`.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Issue &#151;](Download Manager Shows Error)]

Error: `Failed to concatenate downloaded files`

You are downloading packages using the Download Manager. The Status area and Progress Detail area show the error `Failed to concatenate downloaded files`.

### Solution

Check the log file for details. The log file is in the Temp directory:

Linux: **`/tmp/hxedm[yymmdd].log`**

Windows: **`%TEMP%\hxedm_[yymmdd].log`**

If the log indicates a simple issue such as lack of disk space or file permissions, fix the problem and download again.

If the problem is less obvious, do the following:

Go to the **Save directory**. Delete all downloaded files, including incomplete download files. Download again.

or

Change the **Save directory**. Download again.     

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Issue &#151;](Locate Download Manager Log File)]

You are downloading packages using the Download Manager when you terminate Download Manager before download completes, or Download Manager quits unexpectedly.

### Solution

Check the log file for details. The log file is in the Temp directory:

Linux: **`/tmp/hxedm[yymmdd].log`**

Windows: **`%TEMP%\hxedm_[yymmdd].log`**

[DONE]
[ACCORDION-END]


## Next Steps
- [View similar How-Tos](http://www.sap.com/developer/tutorials.html) or [View all How-Tos](http://www.sap.com/developer/tutorials.html)
