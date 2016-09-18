---
title: How to download and install the HANA Eclipse plugin
description: Provide details on the install the HANA Eclipse Plugin and setup for using Eclipse to connect to HANAExpress.
tags: [  tutorial>beginner, products>sap-hana, express-edition ]
---
## Prerequisites  
 - Proficiency: beginner
 - Setup: Eclipse Mars or Neon version are expected to be installed and running before starting this tutorial to add the HANA Plugin.

## Next Steps
 - Go to the [`SAP HANA, express edition tutorials page`](http://go.sap.com/developer/topics/sap-hana-express.tutorials.html)

## How-To Details
Provides instruction on how to install and update the SAP HANA Tools plugin for Eclipse and connect `HANAExpress`.

### Time to Complete
**10 Min**.

---

1. In Eclipse, choose in the menu bar **Help > Install New Software...**

2. Select **SAP Development Tools for Eclipse**
    - Neon (4.6), add the URL `https://tools.hana.ondemand.com/neon/`
    - Mars (4.5), add the URL `https://tools.hana.ondemand.com/mars/`

3. Press **Enter** to display the available features.

4. Select the desired features and choose **Next**.

5. On the next wizard page, you get an overview of the features to be installed. Choose **Next**.

6. Confirm the license agreements and select **Finish** to start the installation. (Depending on the features chosen the installation may take up to 10 minutes.)

7. Restart Eclipse as prescribed after adding the HANA Plugin.

8. Change perspective to SAP HANA Administrative Console **Window > Perspective > SAP HANA Administrative Console**

    ![image 1](4.png)

9. Add your `HANAExpress` **Add System > Specify System**

    Field Name       | Value
    :-------------   | :-------------
    Hostname         | `HANAExpress` Hostname (use `/sbin/ifconfig` to find IP address of host)
    Instance number  | `00`
    Mode             | `Multiple containers`
    Select           | `System database`
    Description      | `HANAExpress Edition`

    ![image 1](1.png)

10. Connection Properties: 

    - Select `Authentication by database user`
    - User Name: `SYSTEM`
    - Password: `password` 

      > (Note - you might be asked to change the SYSTEM user password if this is the first login)
      
    - Enable SAP start service Connection
    - Click **Finish**

    ![image 1](2.png)

1. Confirm connection:

    ![image 1](3.png)

## Next Steps
 - Go to the [`SAP HANA, express edition tutorials page`](http://go.sap.com/developer/topics/sap-hana-express.tutorials.html)
