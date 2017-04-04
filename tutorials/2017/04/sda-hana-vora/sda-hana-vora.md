---
title: How to connect SAP HANA, express edition and SAP Vora, developer edition
description: How to configure SAP HANA, express edition and SAP Vora, developer edition to work together with the SAP HANA Spark Controller
primary_tag: products>sap-hana-vora
tags: [  tutorial>how-to, topic>big-data, products>sap-hana, products>sap-hana\,-express-edition, products>sap-hana-vora ]
---
## Prerequisites  
 - XXXXXXXX

## Next Steps
 - [View all How-Tos](http://www.sap.com/developer/tutorial-navigator.how-to.html)


## How-To Details
Provides instruction on how to install and configure SAP HANA, express edition, SAP Vora and the SAP HANA Spark Controller.

### Time to Complete
**45 Min**.

[ACCORDION-BEGIN [Step 1: ](Installing SAP HANA, express edition)]

The goal here is to :

  - have the environment locally running
  - consuming a minimal amount of resources
  - not run a full installation process

To achieve that we will use the "server only" virtual machine option available with SAP HANA, express edition and reuse existing tutorials to guide you during the setup.

The version used here is 2.0 SPS0.

However, we will need to apply a few additional steps to setup the environment for our scenario.

The following tutorial will guide you with the download & installation instructions:

  - [Installing SAP HANA 2.0, express edition(Virtual Machine Method)](http://www.sap.com/developer/tutorials/hxe-ua-installing-vm-image.html)

But before going to the next tutorial "Start Using SAP HANA 2.0, express edition (Virtual Machine Method)", we will need to adjust the network settings.

By default, virtual machine are configured for "Host-only" access, which will prevent virtual machines to see each other.

Therefore, you will need to edit your virtual machine network settings.

If you are using `VMWare`, go to "Virtual Machine Setting" > "Hardware" > "Network Adapter" and select "NAT", and save your changes.

If you are using `VirtualBox`, go to "Settings" > "Network" and select "NAT", and save your changes.

Now, you can move to [Start Using SAP HANA 2.0, express edition (Virtual Machine Method)](http://www.sap.com/developer/tutorials/hxe-ua-getting-started-vm.html).

At the end of this tutorial, you should notice that the IP address you will register in the hosts file will start with "192.168".

Make a note of the IP address, which I will reference as <IP_HANA>.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 2: ](Installing SAP Vora, developer edition)]

The goal here is to :

- have the environment locally running
- not run a full installation process

To achieve that we will use the "SAP Vora, developer edition on premise", express edition and reuse existing tutorials to guide you during the setup.
The version used here is 1.3.

To install SAP Vora, developer edition on-premise, I have also used existing tutorials.

Again, we will need to adjust a few steps to setup the environment for our scenario.

The following tutorial will guide you with the download & installation instructions:

  - [How to setup the SAP Vora developer edition virtual machine](https://www.sap.com/developer/how-tos/2017/02/vora-ova-install.html)

In step 4, instead of selecting the "Host-only" option, you should choose "NAT".

Make a note of the IP address, which I will reference as <IP_VORA>.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 3: ](Install the SAP HANA Spark controller)]

>Note: This is to be done on the SAP Vora virtual machine.

There are multiple options to connect SAP HANA to SAP Vora.

The one that was picked here is via the SAP HANA Spark controller which needs to be installed on the SAP Vora side.

The other option would have been to use the HANA Wire protocol.

But for the moment it only supports the SAP Vora "disk engine" (`com.sap.spark.engines.disk`), and not "in-memory engine" (`com.sap.spark.vora`).

So, the first thing you will need to do is to get the SAP HANA Spark controller from the [SAP Software Downloads]( https://launchpad.support.sap.com/#/softwarecenter) (make sure you pick version 2.0).

Once downloaded, you can now transfer the **`sap.hana.spark.controller-2.0.0-1.noarch.rpm`** file included in the downloaded zip to your SAP Vora virtual machine (and easiest way is to use the virtual machine shared folders functionality).

You can the follow the steps in the "[Set up Spark Controller Manually](https://help.sap.com/viewer/2cfbc5cf2bc14f028cfbe2a2bba60a50/2.0.00/en-US/aca0ca45d96b4fc2a21c11c7e8e48a42.html)" documentation (if the link is broken, please search for "SAP HANA Administration Guide >  Data Provisioning > SAP HANA Hadoop Integration > Using SAP HANA Spark Controller").

A few tips to avoid you losing some "hair" during the install:

  - Hadoop HDFS was setup using the "root" user.

    So, in step 5, you will have to run the **`hdfs dfs`** command using `sudo`, else you will get some permission errors

    ```Bash
sudo hdfs dfs -mkdir /user/hanaes;
sudo hdfs dfs -chown hanaes:hdfs /user/hanaes;
sudo hdfs dfs -chmod 744 /user/hanaes;
    ```
  - You need to set a password for the **`hanaes`** user

    ```Bash
sudo passwd hanaes
    ```

   - You don't need to confirm the "Meta Store" connection

   - The "Spark Controller Environment Variables" should be set like this in the **`/usr/sap/spark/controller/conf/hana_hadoop-env.sh`** file:

    ```Bash
export JAVA_HOME=/usr/java/sapjvm_8.1.009
export HADOOP_HOME=/opt/hadoop-2.7.3
export HADOOP_CONF_DIR=/opt/hadoop-2.7.3/etc/hadoop/
export HANAES_LOG_DIR=/var/log/hanaes
export HANA_SPARK_ASSEMBLY_JAR=/opt/spark/lib/spark-assembly-1.6.1-hadoop2.6.0.jar
export HANA_SPARK_ADDITIONAL_JARS=/opt/vora/lib/vora-spark/lib/spark-sap-datasources-1.3.103-assembly.jar
    ```

   - For the **`Configure hanaes-site.xml`**, here was my configuration:

    ```xml
<configuration>
  <property>
    <name>sap.hana.es.server.port</name>
    <value>7860</value>
    <final>true</final>
    <description>Port of the host for HANA</description>
  </property>
  <property>
    <name>spark.executor.memory</name>
    <value>2g</value>
    <final>true</final>
    <description>Memory size of yarn executors</description>
  </property>
  <property>
    <name>spark.executor.instances</name>
    <value>10</value>
    <final>true</final>
    <description>Number of yarn executors</description>
  </property>
  <property>
    <name>sap.hana.proc.security.disabled</name>
    <value>true</value>
    <final>true</final>
  </property>
  <property>
    <name>sap.hana.hadoop.datastore</name>
    <value>vora</value>
    <final>true</final>
  </property>
</configuration>
    ```

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 4: ](Starting the SAP HANA Spark controller)]

Before starting the SAP HANA Spark Controller, you will need to start the Hadoop YARN Node and Resource manager.

In you terminal console, you will first switch to root.

```Bash
su - root
```

Then run the following commands:

```Bash
export HADOOP_CONF_DIR=/opt/hadoop-2.7.3/etc/hadoop
export JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:/bin/java::")

source /opt/hadoop-2.7.3/etc/hadoop/hadoop-env.sh

nohup /opt/hadoop-2.7.3/bin/yarn resourcemanager 2>&1 > /opt/hadoop-2.7.3/logs/resourcemanager.log &
nohup /opt/hadoop-2.7.3/bin/yarn nodemanager     2>&1 > /opt/hadoop-2.7.3/logs/nodemanager.log &
```

then you can switch to the `hanaes` user:

```Bash
su - hanaes
```

Then run the following commands:

```Bash
cd /usr/sap/spark/controller/bin
./hanaes start
```

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 5: ](Network Configuration - Local machine)]

Now, from your local machine you should be able to ping both machines from a command prompt by running:

```Bash
ping <IP_HANA>
ping <IP_VORA>
```

If you have administrator privileges you can even add then to your host file and then reference them using a name instead of an IP address.

To do so edit the following file using Notepad but "As an Administrator" : **`C:\Windows\System32\drivers\etc\hosts`**

And add the following entries:

```Bash
<IP_HANA>   host-hana
<IP_VORA>   host-vora
```

You can pick whatever name you want for `host-hana` & `host-vora`.

You should now be able to ping using this new "logical" host names from your host and your system will translate the "logical" name into the IP address.

Let's now make each machine see each other.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 6: ](Network Configuration - SAP HANA)]
From the SAP HANA host, edit the **`/etc/hosts`** file on each virtual machine with **`vi`** and **`sudo`** using the following command:

```Bash
sudo vi /etc/hosts
```

And add the following entry:

```Bash
<IP_VORA>   host-vora
```

You should now be able to ping the SAP Vora machine using this new "logical" host name from the SAP HANA host.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 7: ](Network Configuration - SAP Vora)]

From the SAP Vora host,  edit the **`/etc/hosts`** file on each virtual machine with **`vi`** and **`sudo`** using the following command:

```Bash
sudo vi /etc/hosts
```

And add the following entry:

```Bash
<IP_HANA>   host-hana
```

You should now be able to ping the SAP HANA machine using this new "logical" host name from the SAP Vora host.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 8: ](Verify your SAP HANA installation)]

In the [How to download and install the HANA Eclipse plugin](https://www.sap.com/developer/how-tos/2016/09/hxe-howto-eclipse.html) tutorial, you will find instructions regarding how to install and configure the HANA Eclipse plugin, so you will be able to connect to you HANA system.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 9: ](Verify your SAP Vora installation)]

You can check the following link to verify that all your process are running:

- Hadoop DFS Health page :

    http://host-vora:50070/dfshealth.html#tab-overview

- Hadoop Node and Resource manager endpoint

    http://host-vora:8032/
    http://host-vora:8040/

- SAP Vora manager

    http://host-vora:19000/vora-manager/web/

- SAP Vora tools

    http://host-vora:9225/web/

You can also run the following command

```Bash
netstat -ano | grep LISTEN | grep -e "7860" -e "8032" -e "8040" -e "9099" -e "9225" -e "19000" -e "50070"
```

This should return 7 entries.

[DONE]
[ACCORDION-END]

## Next Steps
 - [View all How-Tos](http://www.sap.com/developer/tutorial-navigator.how-to.html)
