---
title: SAP HANA, express edition Troubleshooting
description: Troubleshoot common installation issues.
tags: [  tutorial>beginner, topic>HXE, products>sap-hana,-express-edition ]
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
7.	Retry your server-only installation.

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


## Next Steps
 - [View similar How-Tos](http://go.sap.com/developer/tutorials.html) or [View all How-Tos](http://go.sap.com/developer/tutorials.html)
