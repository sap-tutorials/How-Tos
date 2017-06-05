---
title: How to setup the SAP Vora developer edition virtual machine
description: Download and install the SAP Vora 1.4 developer edition packaged as a virtual machine appliance
primary_tag: products>sap-vora
tags: [  tutorial>how-to, tutorial>beginner, products>sap-vora ]
---
## Prerequisites  
 - **Software required:**
   - Personal computer with a compatible hypervisor, like VMware Workstation Player

## Next Steps
 - [View all How-Tos](http://www.sap.com/developer/tutorial-navigator.how-to.html)

This How-to details the procedure to download, install and verify SAP Vora version 1.4 developer edition packaged as a virtual machine appliance. SAP Vora, developer edition, is covered by the Developer License Agreement, which you will need to accept in order to be able to get access to it.

>SAP Vora is a software working in the **distributed environment**, i.e. the one that usually consists of at least several computing nodes. But in case of the **developer edition** the SAP Vora software has been modified to allow you to practice with a single node instance.

Refer to the last section of this How-to for most common troubleshooting activities. If solution is not available there, then:
 - Post a question on [SAP Community Answers](https://answers.sap.com/tags/73555000100800000134) if you have SAP Community account,
 - Post a question on [Stack Overflow](https://stackoverflow.com/questions/tagged/vora) if you have an account there,
 - Open an internal ticket in SAP Customer Support System using `HAN-VO` component if you are an SAP employee.

### Time to Complete
**35 Min**.

---



[ACCORDION-BEGIN [Step 1: ](Download the OVA File)]

Sign up for the free virtual machine image (the `.ova` file) of SAP Vora 1.4, developer edition from the SAP Store:

https://store.sap.com/sap/cp/ui/resources/store/html/SolutionDetails.html?sap-language=EN&pid=0000014484

You need to have free registration at SAP Store. Once the product is requested you will receive an e-mail with the link to download an archive file with `.ova` file in it. The size of an archive file is about 2GB.

[DONE]
[ACCORDION-END]


[ACCORDION-BEGIN [Step 2: ](Install a hypervisor)]

VMware Workstation Player is a hypervisor compatible with SAP Vora 1.4, developer edition. You can install any supported hypervisor, but examples in this how-to use VMware Workstation Player.

Download VMware Workstation Player from <http://www.vmware.com>, run the installer and register when prompted.

>Ensure you are downloading the correct version for your development machine.


[DONE]
[ACCORDION-END]



[ACCORDION-BEGIN [Step 3: ](Import the downloaded OVA file)]

Open the VMware Workstation Player and in the menu choose **`Player > File > Open`**, select the SAP Vora OVA file and click **Open**, then click **Import**.

The import process will take a few minutes.

[DONE]
[ACCORDION-END]


[ACCORDION-BEGIN [Step 4: ](Start the virtual machine)]

Choose **Play virtual machine**. After some time you will see the login screen. Enter the credentials below and click **Log In**.

Use following password for the first logon:

|Field Name     | Value                            |
|---------------|----------------------------------|
| **user name** | `vora`                           |
| **password**  | `VDEVora1`                       |

The first time you login as user `vora` you are asked to change your password.

![First logon](vora14ovasetup01.jpg)

[DONE]
[ACCORDION-END]


[ACCORDION-BEGIN [Step 5: ](Reset default passwords)]

For security reasons, you should change the default passwords for `root` user.

To do this, open a terminal in the virtual machine and:
- Execute  `su`  and type the default password for the `root` user: `VDEVora1`
- You will be asked to enter and retype the new password for `root` user
- Execute  `exit`  so you're again acting as user `vora`.

![root password change](vora14ovasetup02.jpg)

[DONE]
[ACCORDION-END]


[ACCORDION-BEGIN [Step 6: ](Make a note of your IP address)]

You need to know your IP address to connect to Vora services. In the terminal execute the command below:

```bash
/sbin/ifconfig eth0
```

Note the IP address after `inet addr:`. It is referred to as `IP_ADDRESS` in the rest of this document.


[DONE]
[ACCORDION-END]


[ACCORDION-BEGIN [Step 7: ](Open SAP Vora Manager)]

Start your web browser. Open the Vora Manager at `http://IP_ADDRESS:19000`, log in with the user `admin` and the password `admin`. Choose the **Services** tab.

You should see that all SAP Vora services have a green check mark, indicating that they have been started and are running correctly.

![Vora Services](vora14ovasetup03.jpg)

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 8: ](Open SAP Vora Tools)]

Open the SAP Vora Tools web application from `http://IP_ADDRESS:9225`

The user is `admin` and the password is `admin`.

![Vora Tools](vora14ovasetup04.jpg)

[DONE]
[ACCORDION-END]


[ACCORDION-BEGIN [Step 9: ](Using Spark shell)]

You can open the Spark shell and try out some Scala code that uses Vora. For that run `/opt/vora/lib/vora-spark/bin/start-spark-shell.sh` from OS level.

[DONE]
[ACCORDION-END]


[ACCORDION-BEGIN [Step 10: ](Install the VMware tools - optional)]

VMware Tools is a suite of utilities that enhances the performance of the virtual machine's guest operating system and improves management of the virtual machine. For more information please check official [VMware documentation](https://pubs.vmware.com/workstation-12/index.jsp#com.vmware.ws.using.doc/GUID-6F26D7EF-8D29-46E9-A48E-0BCBB138D333.html).

If your VM doesn't have CD/DVD yet, you have to add it first:
 - Edit virtual machine settings (`Ctrl-D`) -> Add... (not possible if VM is suspended)
 - Choose CD/DVD Drive -> Next
 - Use physical drive -> Next
 - Finish


Select **`Player > Manage > Install VMware Tools`**, then open the terminal and execute the following:

```bash
sudo su
mkdir -p /mnt/cdrom
mount -t iso9660 -o ro /dev/cdrom /mnt/cdrom
cp /mnt/cdrom/VMwareTools* ~
cd ~
tar -xf VMwareTools*
sudo ./vmware-tools-distrib/vmware-install.pl --default
```

The installation process will take a few minutes. It will use default settings with no further user input required.

[DONE]
[ACCORDION-END]


[ACCORDION-BEGIN [Step 11: ](Share the folder from the host system - optional)]

Shared folder allows you to exchange files between host and guest operating systems. The below procedure may not work for all combinations of operating systems and virtual machine players. Please refer to the vendor's documentation for your specific setup.

Execute `vmhgfs-fuse /mnt/hgfs/`

Select **`Player > Manage > Virtual Machine Settings > Options > Shared Folders`**.

Change **Folder sharing** to `Always enabled` and click **Add**. In the wizard browse the host system folder you want to share with your VM and provide the name under which it will be visible.

In the example `C:\Users\I076835\Documents\Virtual Machines\Shared with VMs` is shared as `shared_from_host`
![Wizard](voraovasetup01.jpg)

Now you can see shared folder from the host machine under `/mnt/hgfs/`path.

![Shared folder](voraovasetup02.jpg)

For example if you want to copy some files with data from your host machine to `HDFS` storage backend in the VM use:

```bash
hdfs dfs -put /mnt/hgfs/shared_folder/some_file /user/vora/
```

[DONE]
[ACCORDION-END]


[ACCORDION-BEGIN [Step 12: ](Check out that all Vora services are running)]

- Open a browser and go to the Vora Manager at http://IP_ADDRESS:19000
- Login with the user 'admin' and the password 'admin'
- Click on the tab 'Services'
- You should see all services in the state running with a green check mark

[DONE]
[ACCORDION-END]


[ACCORDION-BEGIN [Step 13: ](Run the examples)]

SAP Vora comes with some examples that you can run and examine.

You can run the examples by executing ```/etc/vora/run_examples.sh hdfs```.
Ignore any "Address already in use" error messages.

You can scroll up with SHIFT+PAGE-UP to see the full output. It is also convenient to write the output of into a file to examine the results later: ```/etc/vora/run_examples.sh hdfs > output_from_examples.log```.

You can also look at the source code which is at ```/opt/vora/lib/vora-spark/examples```.
The examples source code can also be copied and pasted into spark-shell so they can be
executed step by step.

To check if everything works you can also run the examples one by one and check if the output
matches the expectations.

- Find the jar file with the Vora examples: ```export DATASOURCE_DIST=/opt/vora/lib/vora-spark/lib/spark-sap-datasources-*-assembly.jar```
- Copy the test data to HDFS: ```/opt/spark/bin/spark-submit --class com.sap.spark.vora.examples.tools.CopyExampleFilesToHdfs $DATASOURCE_DIST```
- When ```echo $?``` returns ```0``` you were successful

Now you can run the single examples and check the output. Ignore all the Spark debug output about starting and finishing jobs.
If the expected snippet occurs in the output means, that the example ran successful.  

`LoadDataIntoVora`: ```/opt/spark/bin/spark-submit --class com.sap.spark.vora.examples.LoadDataIntoVora $DATASOURCE_DIST```
This is expected to be outputted twice:

```sql
+-----------------+--------+------+-------+-------+
|         CARRNAME|AIRPFROM|AIRPTO|DEPTIME|ARRTIME|
+-----------------+--------+------+-------+-------+
|American Airlines|     JFK|   SFO| 133000| 163100|
|American Airlines|     JFK|   SFO| 110000| 140100|
|  United Airlines|     JFK|   SFO| 144500| 175500|
|  United Airlines|     JFK|   FRA| 162000| 054500|
|   Delta Airlines|     JFK|   SFO| 171500| 203700|
|   Delta Airlines|     JFK|   FRA| 193500| 093000|
|   Delta Airlines|     JFK|   SFO| 171500| 203700|
|        Lufthansa|     JFK|   FRA| 183000| 074500|
+-----------------+--------+------+-------+-------+
```

`HashPartitioning`: ```/opt/spark/bin/spark-submit --class com.sap.spark.vora.examples.HashPartitioning $DATASOURCE_DIST```
This is the expected output:
```sql
+-----------------+--------+------+--------+-------+-------+
|         CARRNAME|AIRPFROM|AIRPTO|DISTANCE|DEPTIME|ARRTIME|
+-----------------+--------+------+--------+-------+-------+
|American Airlines|     JFK|   SFO|  0.0000| 133000| 163100|
|American Airlines|     JFK|   SFO|  2.5720| 110000| 140100|
|   Delta Airlines|     JFK|   SFO|  0.0000| 171500| 203700|
|   Delta Airlines|     JFK|   FRA|  3.8510| 193500| 093000|
|   Delta Airlines|     JFK|   SFO|  2.5720| 171500| 203700|
|        Lufthansa|     JFK|   FRA|  6.1620| 183000| 074500|
|  United Airlines|     JFK|   SFO|  0.0000| 144500| 175500|
|  United Airlines|     JFK|   FRA|  6.1620| 162000| 054500|
+-----------------+--------+------+--------+-------+-------+
```

`GraphEngine`: ```/opt/spark/bin/spark-submit --class com.sap.spark.vora.examples.GraphEngine $DATASOURCE_DIST```
This is the expected output:
```sql
+--------------+
|      CITYFROM|
+--------------+
|      NEW YORK|
| SAN FRANCISCO|
|FRANKFURT/MAIN|
|FRANKFURT/MAIN|
|      NEW YORK|
| SAN FRANCISCO|
|     FRANKFURT|
|     FRANKFURT|
|     FRANKFURT|
| SAN FRANCISCO|
|     FRANKFURT|
|        BERLIN|
|        BERLIN|
|     FRANKFURT|
|     FRANKFURT|
|        BERLIN|
|           ROM|
|     FRANKFURT|
|     FRANKFURT|
|      NEW YORK|
+--------------+
```

`DocStoreEngine`: ```/opt/spark/bin/spark-submit --class com.sap.spark.vora.examples.DocStoreEngine $DATASOURCE_DIST```
This is the expected output:
```sql
+--------------------+
|             COLUMN1|
+--------------------+
|{"cn": "American ...|
|{"cn": "British A...|
|{"cn": "Air Berlin"}|
|{"cn": "Northwest...|
|     {"cn": "Swiss"}|
|{"cn": "Air Canada"}|
|{"cn": "Air Pacif...|
| {"cn": "Lufthansa"}|
|{"cn": "Qantas Ai...|
|{"cn": "United Ai...|
|{"cn": "Air France"}|
|{"cn": "Continent...|
| {"cn": "Lauda Air"}|
|{"cn": "South Afr...|
|  {"cn": "Alitalia"}|
|{"cn": "Delta Air...|
|{"cn": "Japan Air...|
|{"cn": "Singapore...|
+--------------------+
```

`TimeSeriesEngine`: ```/opt/spark/bin/spark-submit --class com.sap.spark.vora.examples.TimeSeriesEngine $DATASOURCE_DIST```
This is the expected output:
```sql
+--------------------+------+
|                  TS|CONNID|
+--------------------+------+
|2015-01-01 09:00:...|  null|
|2015-01-01 10:00:...|  null|
|2015-01-01 11:00:...|  null|
|2015-01-01 12:00:...|  null|
|2015-01-01 13:00:...|  null|
|2015-01-01 14:00:...|  null|
|2015-01-01 15:00:...|  null|
|2015-01-01 16:00:...|  null|
|2015-01-01 17:00:...|  null|
|2015-01-01 18:00:...|  null|
|2015-01-01 19:00:...|  null|
|2015-01-01 20:00:...|  null|
|2015-01-01 21:00:...|  null|
|2015-01-01 22:00:...|  null|
|2015-01-01 23:00:...|  null|
|2015-01-02 00:00:...|  null|
|2015-01-02 01:00:...|  null|
|2015-01-02 02:00:...|  null|
|2015-01-02 03:00:...|  null|
|2015-01-02 04:00:...|  null|
+--------------------+------+
```

`DiskEngine`: ```/opt/spark/bin/spark-submit --class com.sap.spark.vora.examples.DiskEngine $DATASOURCE_DIST```
This is the expected output:
```sql
+------+
|carrid|
+------+
|    AC|
|    AF|
|    LH|
|    LH|
|    LH|
|    SQ|
|    LH|
|    AZ|
|    LH|
|    UA|
|    AZ|
|    LH|
|    QF|
|    SQ|
|    SQ|
|    LH|
|    JL|
|    JL|
|    LH|
|    UA|
+------+
```

[DONE]
[ACCORDION-END]


[ACCORDION-BEGIN [Step 14: ](Use the Vora Tools)]

Vora Tools is the front end to Vora, where you can execute SQL statements.
We will create a small table and run queries on it.

- Create a csv file with dummy data
```bash
su vora
cd
echo "11, peter" >> t1.csv
echo "32, paul " >> t1.csv
echo "66, mary" >> t1.csv
echo "3, vora" >> t1.csv
```
- Copy the file to HDFS
    - ```hdfs dfs -put t1.csv /user/vora/t1.csv```
    - Ignore the warning ```Unable to load native-hadoop library for your platform...using builtin-java classes where applicable```
    - You can list the directory contents to check if the copying worked: ```hdfs dfs -ls /user/vora```
- Open up the Vora tools at `http://IP_ADDRESS:9225` and choose the SQL tab
- You can execute some commands in the text fields

```SQL
CREATE TABLE t1 (age INT, name STRING) USING com.sap.spark.vora OPTIONS (files "/user/vora/t1.csv")";
SHOW TABLES;
SELECT * FROM t1;
```


[DONE]
[ACCORDION-END]


[ACCORDION-BEGIN [Step 15: ](Use Apache Zeppelin)]

The SAP Vora, developer edition comes also with an installation of Apache Zeppelin 0.6.0 and some example notebooks.
The example notebooks show ways to connect and communicate with various Vora engines.

To play with the notebooks:

- Open up Apache Zeppelin at `http://IP_ADDRESS:9099`
- You will see a few notebooks which focus on different Vora topics such as SAP Vora Tutorial, Tables and Views, Document Store, Disk Engine, Graph Engine, Time Series, etc.
- You can execute the paragraphs in the notebooks by clicking the blue arrow on the right.
- The SAP Vora Tutorial notebook will give you a little tutorial introducing Vora.
    - "Execute the Vora Examples" will execute a shell script that executes all the examples.
    - Start "Show the tables" which will connect via JDBC to Vora and show all tables currently known to Vora. Again click the blue arrow to start.
    - "Query tables in Vora" will also use JDBC to do simple SQL querying on Vora tables.
        - Bear in mind that you must first register all tables with the "`%jdbc` register all tables..." paragraph so that the table SCUSTOM is known to the Spark context.
    - "Usage of the `SapSQLContext` in Spark" shows how you can write Scala code and access Vora programmatically.
- In order to play with notebooks other than SAP Vora Tutorial, run the `0_Data` notebook first to make sure you have required tables.

[DONE]
[ACCORDION-END]


[ACCORDION-BEGIN [Step 16: ](SAP Vora documentation)]

There is also the SAP Vora documentation, which is just about running Vora and not about the developer edition. This documentation is useful but doesn't apply to the developer edition in all cases, as it is targeted to a cluster installation of Vora and not a single-node VM setup.

- Overview: http://help.sap.com/hana_vora_re
- Admin guide:  http://help.sap.com/Download/Multimedia/hana_vora/SAP_HANA_Vora_Installation_Admin_Guide_1.3_en.pdf
- Developer guide: http://help.sap.com/saphelp_hanavora/helpdata/en/88/07408b92b4489cb2d0c53698ff420e/frameset.htm


[DONE]
[ACCORDION-END]


[ACCORDION-BEGIN [Step 17: ](Installing updates)]

The developer edition is not meant to be in a productive use case, but still you may want to get important security updates.
You can get a registration code from SUSE that is valid for 60 days and use it to get updates.

- Create an account at the SUSE Partner Portal: https://partner.suse.com/?eid=register_SUSE
- Wait for the confirmation via e-mail
- Download "`SUSE Linux Enterprise for SAP Applications 12 SP1 for x86_64`"
    - Go to https://www.suse.com/products/sles-for-sap/
    - Choose "60 Day Free Trial"
    - Choose "SUSE Linux Enterprise Server for SAP Applications 12 SP1" (AMD64/Intel 64)
    - Log into your SUSE Partner account
    - You will get a registration code: Note it down.
    - You don't actually need to download the distribution.
- You can also see the registration code in "Subscriptions" when you log into your account at https://partner.suse.com/
- Run the updates
    - Start Yast: ```sudo /sbin/yast```
    - Choose Software -> Online Update  
    - "Run configuration workflow now" => Choose Yes
    - Mark "Registration Code"
    - Hit F10 for "Next"
    - When asked about opening a web browser, hit "Continue"
    - A text web browser will open. You can navigate with TAB and ENTER. Enter the e-mail you used for registration at http://suse.com and the registration code. With TAB move to "Submit" and hit ENTER.
    - In the next screen just type "Q"
    - You will end up in a screen where you can choose which updates you want to install.
        - Move up and down in the list with the CURSOR keys. Hit SPACE to toggle installation. Move with TAB to "Accept" and hit ENTER to install the chosen updates.
        - Once done, you can move to "Abort" and leave the update menu.

[DONE]
[ACCORDION-END]


[ACCORDION-BEGIN [Step 18: ](Troubleshooting)]

_My computer freezes when I start up Vora in the VM_

Try to lower the used RAM for the VM. If your machine has 8GB and the VM uses 8GB, your machine will run out of resources.
In VMware Workstation Player, this setting can only be changed the VM is turned off.

_The Vora tools are stuck and I only see the rotating flower_

Try using a more modern browser on your host machine.

_My mouse can't escape from the VM_

Usually you need to press ALT+CTRL to activate the host mouse again.

_The Vora manager doesn't start, I can't connect to `http://IP_ADDRESS:19000/` site_

This might be a network problem. Try removing cache files and restart the engine:
- ```sudo rm -rf /var/local/vora/discovery```
- ```sudo rm -rf /var/local/vora/scheduler```
- ```sudo /sbin/shutdown now -r```

_I see an error message about a "`native-hadoop library`" and my query is failing_

If you mean ```Unable to load native-hadoop library for your platform...using builtin-java classes where applicable``` your query
fails because of a different reason. You can ignore this message. The library for HDFS can either be written in Java (used in the developer edition) or native (not used in the developer edition). Hadoop is just a little too verbose here.

_I can't execute the first statement in the Time-Series Zeppelin notebook_

This is an error that only occurs in the first 1.4 version of the developer edition.
Although it seems it doesn't work, the ```CREATE PARTITION FUNCTION PF_TS2``` is usually executed successfully. You can check if it has worked, if the next command ```CREATE PARTITION SCHEME``` can be executed successfully, as the creation of the partition scheme depends on a successful execution of the creation of the partition function.
You can then go on executing the other paragraphs of this notebook.

_The Zeppelin paragraphs stay in status pending forever_
Check the logs in ```/opt/zeppelin/logs```. Sometimes it helps to restart Zeppelin with ```/opt/zeppelin/bin/zeppelin-daemon.sh restart```.

_Official SAP Vora Troubleshooting Guide_
Find it at [SAP Vora documentation](https://help.sap.com/viewer/p/SAP_VORA) page

_If solution is not available above_
 - Post a question on [SAP Community Answers](https://answers.sap.com/tags/73555000100800000134) if you have SAP Community account,
 - Post a question on [Stack Overflow](https://stackoverflow.com/questions/tagged/vora) if you have an account there,
 - Open an internal ticket in SAP Customer Support System using `HAN-VO` component if you are an SAP employee.

[DONE]
[ACCORDION-END]

## Next Steps
 - [View all How-Tos](http://www.sap.com/developer/tutorial-navigator.how-to.html)
