---
title: How to download and install the HANA Eclipse plugin
description: Provide details on the install the HANA Eclipse Plugin and setup for using Eclipse to connect to HANAExpress.
tags: [  tutorial>beginner, products>sap-hana, express-edition ]
---
## Prerequisites  
 - Proficiency: beginner
 - Setup: Eclipse Mars or Neon version are expected to be installed and running before starting this tutorial to add the HANA Plugin.

## Next Steps
 - [Go to tutorials](http://go.sap.com/developer/tutorials.html)

## How-To Details
Provides instruction on how to install and update the SAP HANA Tools plugin for Eclipse and connect `HANAExpress`.

### Time to Complete
**10 Min**.

---

1. In Eclipse, choose in the menu bar Help > Install New Software...
3. Select SAP Development Tools for Eclipse
  - Neon (4.6), add the URL https://tools.hana.ondemand.com/neon/
  - Mars (4.5), add the URL https://tools.hana.ondemand.com/mars/
4. Press Enter to display the available features.
5. Select the desired features and choose Next.
6. On the next wizard page, you get an overview of the features to be installed. Choose Next.
7. Confirm the license agreements and select Finish to start the installation. (Depending on the features chosen the installation may take up to 10 minutes.)
1. Restart Eclipse as prescribed after adding HANA Plugin.
8. Change perspective to SAP HANA Administrative Console Window > Perspective > SAP HANA Administrative Console

    ![image 1](4.png)

9. Add your `HANAExpress` Add System > Specify System
  - Hostname: `HANAExpress` Hostname (use `/sbin/ifconfig` to find IP address of host)
  - Instance number: 00
  - Mode: Multiple containers
  - Select "System database"
  - Description: `HANAExpress` Edition

  ![image 1](1.png)

1. Connection Properties:
- Authentication by database user:
    - User Name: SYSTEM
    - Password: `password`
    *** (Note - you might be asked to change the SYSTEM user password if this is the first login) ***
- Enable SAP start service Connection
- Finish

  ![image 1](2.png)

1. Confirm connection:

  ![image 1](3.png)
## Next Steps
 - [View similar How-Tos](http://go.sap.com/developer/tutorials.html) or [View all How-Tos](http://go.sap.com/developer/tutorials.html)
