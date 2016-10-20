---
title: SAP HANA, express edition Troubleshooting
description: Troubleshoot common installation issues.
tags: [  tutorial>beginner, tutorial>how-to, products>sap-hana\,-express-edition ]
---
## Prerequisites  
 - **Setup:** You are following the instructions to install the binary version of SAP HANA, express edition in the [Installing Binary](http://go.sap.com/developer/tutorials/hxe-ua-installing-binary.html) tutorial.

## Next Steps
 - [View similar How-Tos](http://go.sap.com/developer/tutorials.html) or [View all How-Tos](http://go.sap.com/developer/tutorials.html)


## How-To Details
Perform these steps to resolve issues when installing SAP HANA, express edition.

### Time to Complete
**20 Min**.

---

### Installation fails with error “Cannot load `libssl.so.0.9.8`”
#### Issue
You are installing SAP HANA, express edition on a Linux server using `hdblcm`. You receive this error:  
**Installation of SAP HANA Database failed.**  
  **Installation failed.**  
    **unhandled exception. Cannot load  `libssl.so.0.9.8`**

#### Solution
You need to downgrade your OpenSSL to version 0.9.8.  
`libopenssl` version 0.9.8 is provided in Legacy Module 12 `x86_64` of SUSE Linux Enterprise Server for SAP Applications 12 SP1.

You need to be registered on the SUSE site before you can download the legacy module. If you haven’t already registered, you will be prompted to register during the download.   
1.	Go to **`YaST` > Add-on Product**.
2.	Click the **Add** button.
3.	Under Add-on Product, select **Extensions and Modules from Registration Server**.
If you haven’t registered already, register to continue.
4.	From the Available Extensions and Modules list, select **Legacy Module 12 `x86_64`**.
5.	Agree to the license terms and accept the remaining installation prompts.
6.	Restart your Linux server.
7.	Completely uninstall SAP HANA, express edition (including XSA, if installed).
8.  Reinstall SAP HANA, express edition and restart.


### HDB Daemon not Running
#### Issue
You are installing SAP HANA, express edition on a Linux server using `hdblcm`. You receive this error:  
**Cannot start system.  
  Start instance 00 on host ‘`hxehost.localdomain.com`’ failed.  
    FAIL: process `hdbdaemon` HDB Daemon not running.**

#### Solution
1.	Use `zypper` to check the `util-linux`, `util-linux-systemd` and `uuidd` packages to make sure they are at these versions:  

    `zypper info util-linux util-linux-systemd uuidd`

    The results need to show that you have at least the following versions installed:
    `util-linux`: `util-linux-2.25-22.1`  
    `uuidd` : `uuidd-2.25-22`  
    `util-linux-systemd`: 2.25-22.1  

2.	If you are missing any of the packages, or if the versions are outdated, install them using the `zypper` install command.
3.	Check that socket activation is enabled and started. In a shell enter:
`systemctl` status `uuidd.socket`
4.	If the status is inactive, start socket activation:
`systemctl` start `uuidd.socket`

### Download Manager Internal Error: "downloaded size does not match content length"
#### Issue
You are downloading packages using Download Manager. The download fails. The Download Manager log file displays this error message:
*Internal error: downloaded size does not match content length*
The Download Manager log file is located at `/tmp/hxedm_[yymmdd].log` on Linux and `%TEMP%\hxedm_[yymmdd].log` on Windows.

#### Solution
Either the file on the download server changed since your last download session, or partial download files from your previous download session are corrupted.
Delete `*.001` to `*.008` files in your download directory and run the Download Manager again.

### Download Manager Error Message: "Failed to verify {0} checksum"
#### Issue
You are downloading packages using Download Manager. The download fails and this error displays:
*Failed to verify {0} checksum*

#### Solution
Either the file on the download server changed since your last download session, or the download file is inaccessible/corrupted.
Delete the download file and/or <filename>.00* in the download directory and run the Download Manager again.

### Download Manager Error Message: "Failed to join downloaded files"
#### Issue
You are downloading packages using Download Manager. The download fails and this error displays:
*Failed to join download files*

#### Solution
Download manager failed to assemble the download file. This might be because of lack of disk space in the download directory.
In Linux, run:
**`cat <file_name>.001 <file_name>.002 <file_name>.003 .... <filename>.008 > <final_filename>`**

>**Example**
>`cat hxe.001 hxe.002 hxe.003 hxe.004 hxe.005 hxe.006 hxe.07 hxe.008 > hxe.tgz`

In Windows, run:
**`type <file_name>.001 <file_name>.002 <file_name>.003 .... <filename>.008 > <final_filename>`**

>**Example**
>`type hxe.001 hxe.002 hxe.003 hxe.004 hxe.005 hxe.006 hxe.007 hxe.008 > hxe.tgz`

### Virtual Machine: Checking Resource Usage
#### Issue
You are having memory issues on your VM and want to check resource usage.

#### Solution
If you have HANA studio, right-click on the system and select **Configuration and Monitoring > Open Administration** and check the Overview and Landscape tabs for anything in red.

If you don't have HANA Studio, run the following queries in `hdbsql` to view SAP HANA resource usage:

`select service_name, round(effective_allocation_limit/1024/1024/1024, 1) as MemLimit, round(total_memory_used_size/1024/1024/1024,1) as MemUsed from m_service_memory;`

If the `MemUsed` is close to the `MemLimit`, you may encounter problems allocating memory.

Alternatively, you can run the Linux `free` command at the command line to see free resources:

`free -g`

The key number is in the second row (-/+ buffers/cache) in the **free** column. If this number is low, (e.g. 1 GB) you may have run out of memory when performing your recent operation.

You can also run the following command to see if you are running out of disk space on the VM's `filesystem`:  

`df -h`

Look for the **Use%** for the `/dev/sda1 filesystem`. If it is down to just a few GB, you may have run out of disk space when performing your recent operation.


## Next Steps
 - [View similar How-Tos](http://go.sap.com/developer/tutorials.html) or [View all How-Tos](http://go.sap.com/developer/tutorials.html)
