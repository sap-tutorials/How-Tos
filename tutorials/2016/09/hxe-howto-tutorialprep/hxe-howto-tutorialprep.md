---
title: How to prepare HANA, express edition environment for tutorials
description: This how-to shows you how to prepare your HANA, express edition for executing the other Tutorials.
tags: [  tutorial>beginner, products>sap-hana-express-edition ]
---
## Prerequisites  
 - Proficiency: beginner
 - Setup: This tutorial provides the details on creating required users for other `HANA, express edition` "Tutorials"

## Next Steps
 - [Go to tutorials](http://go.sap.com/developer/tutorials.html)

## How-To Details
The HANA, express edition "Tutorials" reference a set of users. This set of instructions assures all required users and passwords are available and correct before attempting the other `HANA, express edition` "Tutorials".

The passwords referred to in the "Tutorials" will not match the passwords chosen by the user. For example, any reference to the password `"HANARocks2016"` should be replaced by the user provided password (see below).
### Time to Complete
**5 Min**.

---

1. Review default system configuration for `HANA, express edition`:

    - System Host: `hxehost`
    - SID: `HXE`
    - System Instance Number: `00`
    - XSA Organization: `HANAExpress`
    - XSA SPACE: `SAP`
    - ALL passwords: `user defined (referred to as "HANAROCKS2016" in "Tutorials")`


1. Create `WORKSHOP_01` user for `Hana, express edition` "How-To" tutorials:

    Login to `HANA` as `hxeadm`  (you may need to change system password if not already done) and create `WORKSHOP_01` user:

    % `sudo su -` `hxeadm`

    % `xs login -u` `xsa_admin` `-p <password>`

    % `hdbsql -i 00 -n localhost:30013 -u SYSTEM -p` `<SYSTEM user password>` `"CREATE USER WORKSHOP_01 PASSWORD` `<password>` `NO FORCE_FIRST_PASSWORD_CHANGE SET PARAMETER XS_RC_XS_CONTROLLER_USER = 'XS_CONTROLLER_USER' , XS_RC_DEVX_DEVELOPER = 'DEVX_DEVELOPER', XS_RC_XS_AUTHORIZATION_ADMIN = 'XS_AUTHORIZATION_ADMIN'"`

1. Add XSA "space role" for workshop user:

   % `xs set-space-role WORKSHOP_01 HANAExpress SAP SpaceDeveloper`

1. Verify the new `WORKSHOP_01` user can connect to `HANA, express edition`:

    % `hdbsql -u WORKSHOP_01 -p <password> -d SystemDB`

    Expected result:

    ![image 1](1.png)

1. Verify the `WORKSHOP_01` user can connect to XSA:

    % `xs login -u WORKSHOP_01 -p <password>`

    Expected result:

    ![image 1](2.png)

## Next Steps
 - [View similar How-Tos](http://go.sap.com/developer/tutorials.html) or [View all How-Tos](http://go.sap.com/developer/tutorials.html)
