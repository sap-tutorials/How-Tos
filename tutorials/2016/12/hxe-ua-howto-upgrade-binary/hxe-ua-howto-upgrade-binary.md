---
title: How to Upgrade to SAP HANA 2.0, express edition (Binary Installer)
description: Upgrade your SAP HANA, express edition installation from 1.0 to 2.0.
tags: [  tutorial>beginner, tutorial>how-to, products>sap-hana\,-express-edition ]
---
## Prerequisites
 - You have installed SAP HANA 1.0, express edition.

 - You have completed the [Start Using SAP HANA, express edition](http://www.sap.com/developer/tutorials/hxe-ua-getting-started-binary.html) tutorial and have successfully installed the SAP HANA Eclipse plugin.

## Next Steps
 - [View similar How-Tos](http://www.sap.com/developer/tutorials.html) or [View all How-Tos](http://www.sap.com/developer/tutorials.html)

## How-To Details

If you wish to upgrade your SAP HANA, express edition installation from 1.0 to 2.0 without losing any data, follow this installation.

This installation assumes you have installed SAP HANA 1.0, express edition using the binary installer. To upgrade the SAP HANA 1.0, express edition virtual machine, see [How to Upgrade to SAP HANA 2.0, express edition (Virtual Machine)](http://www.sap.com/developer/how-tos/2016/12/hxe-ua-howto-upgrade-vm.html).

## Time to Complete
**45-60 Min**.

---

### Download SAP HANA 2.0, express edition Install Files

1. Register for your SAP HANA 2.0, express edition installation and download the Download Manager. For instructions on downloading and running the Download Manager, see [Installing SAP HANA 2.0, express edition (Binary Installer Method)](http://www.sap.com/developer/tutorials/hxe-ua-installing-binary.html).

2. In Download Manager, in the **Image** pull-down, select **Binary Installer**.
    ![Download Manager](HXE_download_manager.png)

3. Click **Browse** and select a directory where your downloads will be saved.

4. Select one or more of the following packages:  

    - **Server only installer** - Downloads **`hxe.tgz`**; the SAP HANA 2.0, express edition server with Application Function Library.  

    - **Applications** - Downloads optional package **`hxexsa.tgz`**; XSA, Web IDE, SAP HANA cockpit, and EA Designer.  

    - **Clients** - Downloads a zip file containing four compressed client-tools bundles. Use the client packages to access developed express edition applications from a client PC. See <!-- [How to Install the SAP HANA 2.0, express edition Clients] (http://www.sap.com/developer/how-tos/hxe-ua-howto-installing-clients.html) --> for installation steps.

        - **`hdb_client_linux.tgz`** - Reduced HANA client for Linux 64 bit. Contains the HANA client package, drivers, and required licenses.

        - **`hdb_client_windows.zip`** - Reduced HANA client for Windows 64 bit. Contains the HANA client package, drivers, and required licenses.

        - **`xs.onpremise.runtime.client_linuxx86_64.zip`** - Command-line tools for Linux that enable access to (and control of) the SAP HANA XS advanced run-time environment.

        - **`xs.onpremise.runtime.client_ntamd64.zip`** - Command-line tools for Windows that enable access to (and control of) the SAP HANA XS advanced run-time environment.

     >**Tip:** After you develop an application using SAP HANA, express edition, install Download Manager to a client machine and download the *clients only* to that client machine. You can then use the clients to connect to -- and test -- your HANA application, emulating a customer.  

    - **Text analysis files for additional languages** - For languages other than English and German, these files are required for the HANA Text Analysis function. (The text analysis files for English and German are already included in the **Server only** and **Server + applications** packages.)

5. Click the **Download** button.

### Back Up Your Current SAP HANA 1.0, express edition Files

1. In the SAP HANA Administration Console in Eclipse, open the context menu for your system and select _Backup and Recovery > Back Up System Database..._

2. Perform a **Complete Data Backup**.

3. If you are installing SAP HANA, express edition 2.0 on the same host, uninstall your 1.0 installation.

    If you are installing on a different host, copy the backup folder to the new host.

### Install SAP HANA, express edition

1. Navigate to the directory where you wish to extract the installation files.

2. Extract the contents of `hxe.tgz`, and `hxexsa.tgz` if you are also installing applications:

    `tar -xvzf <download_path>/hxe.tgz`
    `tar -xvzf <download_path>/hxexsa.tgz`

    >**Tip**
    > Run the tar command from the command shell as shown, rather than using a GUI-based extraction tool.

3. Navigate to the directory where you extracted the files and run `./setup_hxe.sh` as the root user:

    `cd <extracted_path>`
    `sudo ./setup_hxe.sh`

4. Follow the prompts to configure your installation.

    >**Note**
    > The master password you specify during installation is used for the `<sid>adm`,  `sapadm` OS users, the telemetry technical user, and the SYSTEM user. If you are installing the Applications package, this password is also used for the `XSA_ADMIN`, `XSA_DEV`, and `XSA_SHINE` users.

Installation of SAP HANA 2.0, express edition will take some time. Installation is successful when your command line reads `SAP HANA Express Edition System installed`.

### Restore Your Backup

1. On the SAP HANA 2.0, express edition host, open a terminal and log in as the `<sid>adm` user:

    `su -l <sid>adm`

2. Recover the database from your backup:

    `HDBSettings.sh recoverSys.py --command="RECOVER DATA USING FILE ('<path-to-backup-folder>') CLEAR LOG"`

    For example:

    `HDBSettings.sh recoverSys.py --command="RECOVER DATA USING FILE ('/hana/backup_hxe/backup/data/SYSTEMDB/BK_SP12') CLEAR LOG"`

3. Restart the system:

    `HDB stop && HDB start`
