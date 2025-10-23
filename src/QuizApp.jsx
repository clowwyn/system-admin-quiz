import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, AlertCircle } from 'lucide-react';

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [isRetakeWrong, setIsRetakeWrong] = useState(false);

  const questions = [
    // WEEK 2 - PRINCIPLES OF SYSTEM ADMINISTRATION (15 questions)
    {
      id: 1,
      question: "_______ is the management, maintenance, and operation of computer systems and networks including hardware, software, security, and user support.",
      options: ["System Administration", "Network Management", "Database Administration", "Cloud Computing"],
      correct: 0,
      explanation: "System Administration encompasses all aspects of managing computer systems and networks."
    },
    {
      id: 2,
      question: "Which of the following is NOT a primary importance of System Administration?",
      options: ["System Reliability", "Marketing Strategy", "Security", "Performance Optimization"],
      correct: 1,
      explanation: "Marketing Strategy is not part of system administration. The key importance areas are reliability, security, performance, and user support."
    },
    {
      id: 3,
      question: "A system administrator needs to prevent data loss in case of hardware failure. Their primary responsibility is to _______.",
      options: ["Update software", "Back up data regularly", "Monitor network traffic", "Install antivirus"],
      correct: 1,
      explanation: "Backing up data is critical to prevent data loss and ensure business continuity."
    },
    {
      id: 4,
      question: "The role of installing and configuring systems, monitoring performance, and ensuring security belongs to a _______.",
      options: ["Database Administrator", "System Administrator", "Web Developer", "Network Architect"],
      correct: 1,
      explanation: "These are core responsibilities of a System Administrator."
    },
    {
      id: 5,
      question: "One of the biggest challenges in system administration is _______, which includes cyberattacks and malware threats.",
      options: ["Documentation", "Security Threats", "User Training", "Budget Planning"],
      correct: 1,
      explanation: "Security threats like cyberattacks are a major challenge for system administrators."
    },
    {
      id: 6,
      question: "A company experiences frequent system failures that disrupt business operations. This challenge is known as _______.",
      options: ["Downtime", "Scalability", "Compliance", "Documentation"],
      correct: 0,
      explanation: "Downtime refers to system failures that interrupt normal operations."
    },
    {
      id: 7,
      question: "_______ refers to the challenge of integrating old technology with new systems in system administration.",
      options: ["Cloud Migration", "Legacy Systems", "Virtualization", "Automation"],
      correct: 1,
      explanation: "Legacy Systems present compatibility challenges when integrating with modern technology."
    },
    {
      id: 8,
      question: "The challenge of ensuring an organization follows industry regulations and standards is called _______.",
      options: ["Change Management", "Compliance Requirements", "Resource Constraints", "Skill Development"],
      correct: 1,
      explanation: "Compliance Requirements involve adhering to industry rules and regulations."
    },
    {
      id: 9,
      question: "A sysadmin must constantly learn new technologies and update their skills. This challenge is known as _______.",
      options: ["Workload Management", "Skill Development", "Documentation", "Change Management"],
      correct: 1,
      explanation: "Continuous Skill Development is necessary due to rapidly evolving technology."
    },
    {
      id: 10,
      question: "Managing limited budget and insufficient manpower is an example of _______ in system administration.",
      options: ["Security Threats", "Resource Constraints", "Complex Systems", "User Support"],
      correct: 1,
      explanation: "Resource Constraints refer to limitations in budget, staff, and equipment."
    },
    {
      id: 11,
      question: "The challenge of supporting users with varying levels of technical expertise is part of _______.",
      options: ["Performance Monitoring", "User Support", "Security Management", "Backup Operations"],
      correct: 1,
      explanation: "User Support involves assisting people with different technical skill levels."
    },
    {
      id: 12,
      question: "_______ is the risk of introducing errors when implementing new systems or updates.",
      options: ["Compliance", "Change Management", "Documentation", "Scalability"],
      correct: 1,
      explanation: "Change Management deals with risks associated with system changes and updates."
    },
    {
      id: 13,
      question: "A company is rapidly growing and needs to expand its IT infrastructure. This is a _______ challenge.",
      options: ["Downtime", "Legacy Systems", "Scaling Infrastructure", "User Support"],
      correct: 2,
      explanation: "Scaling Infrastructure is the challenge of expanding systems to match organizational growth."
    },
    {
      id: 14,
      question: "Creating detailed records of system configurations and procedures is time-consuming but vital. This refers to _______.",
      options: ["Monitoring", "Documentation", "Troubleshooting", "Automation"],
      correct: 1,
      explanation: "Documentation is essential but time-consuming work in system administration."
    },
    {
      id: 15,
      question: "Heavy workloads, on-call responsibilities, and stress can lead to _______ among system administrators.",
      options: ["Skill Development", "Resource Constraints", "Workload & Burnout", "Complex Systems"],
      correct: 2,
      explanation: "Workload & Burnout result from excessive demands on system administrators."
    },

    // WEEK 2 - WINDOWS ADMINISTRATION TOOLS (15 questions)
    {
      id: 16,
      question: "_______ are Microsoft utilities designed for managing, configuring, and troubleshooting Windows systems.",
      options: ["Linux Tools", "Windows Administration Tools", "Database Tools", "Development Tools"],
      correct: 1,
      explanation: "Windows Administration Tools are Microsoft's suite for system management."
    },
    {
      id: 17,
      question: "The importance of Windows Administration Tools includes centralized management, automation, and _______.",
      options: ["Game Development", "Remote Management", "Video Editing", "Graphic Design"],
      correct: 1,
      explanation: "Remote Management is a key benefit of Windows Administration Tools."
    },
    {
      id: 18,
      question: "ADUC (Active Directory Users & Computers) is a _______ tool used to manage users and computers in Active Directory.",
      options: ["Command-line", "GUI", "PowerShell", "Web-based"],
      correct: 1,
      explanation: "ADUC (Active Directory Users & Computers) is the primary GUI tool for AD management."
    },
    {
      id: 19,
      question: "GPMC (Group Policy Management Console) is the tool used to create, edit, and manage _______.",
      options: ["User accounts", "Group Policy Objects", "Network settings", "File permissions"],
      correct: 1,
      explanation: "GPMC (Group Policy Management Console) is used for GPO administration."
    },
    {
      id: 20,
      question: "WMIC (Windows Management Instrumentation Command-line) is a _______ tool that provides access to system information.",
      options: ["GUI", "Command-line", "Web-based", "Mobile"],
      correct: 1,
      explanation: "WMIC (Windows Management Instrumentation Command-line) accesses system information via command line."
    },
    {
      id: 21,
      question: "The command-line tool used to configure network settings in Windows is _______.",
      options: ["PowerShell", "Netsh", "CMD", "WMIC"],
      correct: 1,
      explanation: "Netsh (Network Shell) is used for network configuration."
    },
    {
      id: 22,
      question: "SFC (System File Checker) is the tool that scans and repairs corrupted _______.",
      options: ["User files", "Windows system files", "Network connections", "Registry entries"],
      correct: 1,
      explanation: "SFC (System File Checker) verifies and repairs system file integrity."
    },
    {
      id: 23,
      question: "An admin needs to manage servers remotely from their workstation. They should use _______.",
      options: ["Local Console", "Remote Desktop Connection", "FTP Client", "Web Browser"],
      correct: 1,
      explanation: "Remote Desktop Connection enables remote server management."
    },
    {
      id: 24,
      question: "RSAT (Remote Server Administration Tools) allow managing Windows servers from a _______ computer.",
      options: ["Local", "Remote", "Virtual", "Mobile"],
      correct: 1,
      explanation: "RSAT (Remote Server Administration Tools) provides tools for remote Windows server management."
    },
    {
      id: 25,
      question: "WinRM (Windows Remote Management) enables remote _______ and script execution on Windows systems.",
      options: ["File transfer", "Command execution", "Desktop viewing", "Printing"],
      correct: 1,
      explanation: "WinRM (Windows Remote Management) enables remote command execution."
    },
    {
      id: 26,
      question: "PowerShell ISE (Integrated Scripting Environment) is an interactive _______ environment for PowerShell development.",
      options: ["Testing", "Scripting", "Debugging", "Deployment"],
      correct: 1,
      explanation: "PowerShell ISE (Integrated Scripting Environment) is designed for PowerShell scripting."
    },
    {
      id: 27,
      question: "PowerShell DSC (Desired State Configuration) allows administrators to define and maintain consistent _______.",
      options: ["User accounts", "Server configurations", "Network routes", "Email settings"],
      correct: 1,
      explanation: "PowerShell DSC (Desired State Configuration) maintains consistent configurations."
    },
    {
      id: 28,
      question: "An admin wants to execute PowerShell commands on multiple remote computers simultaneously. They should use _______.",
      options: ["PowerShell ISE", "PowerShell Remoting", "CMD", "Remote Desktop"],
      correct: 1,
      explanation: "PowerShell Remoting enables executing commands on multiple remote systems."
    },
    {
      id: 29,
      question: "The benefit of Windows Administration Tools that reduces manual errors through scripts is _______.",
      options: ["Real-time Monitoring", "Automation", "Event Logging", "Remote Access"],
      correct: 1,
      explanation: "Automation through scripts reduces manual work and errors."
    },
    {
      id: 30,
      question: "_______ in Windows Administration Tools provides a centralized view of system health and performance metrics.",
      options: ["Batch Operations", "Centralized Dashboard", "User Access Control", "Patch Management"],
      correct: 1,
      explanation: "A Centralized Dashboard offers unified visibility into system status."
    },

    // WEEK 2 - VIRTUAL LABORATORY ENVIRONMENT (10 questions)
    {
      id: 31,
      question: "_______ reduces the need for physical hardware, resulting in cost savings.",
      options: ["Cloud Computing", "Virtualization", "Networking", "Programming"],
      correct: 1,
      explanation: "Virtualization allows running multiple VMs on one physical server, reducing hardware costs."
    },
    {
      id: 32,
      question: "_______ is free, open-source virtualization software that supports Windows, Linux, macOS, and Solaris.",
      options: ["VMware Workstation", "Oracle VirtualBox", "Hyper-V", "Parallels"],
      correct: 1,
      explanation: "Oracle VirtualBox is the free, open-source virtualization solution."
    },
    {
      id: 33,
      question: "The minimum RAM requirement for running VirtualBox is _______, though 4GB or more is recommended.",
      options: ["512 MB", "1 GB", "2 GB", "8 GB"],
      correct: 2,
      explanation: "VirtualBox requires at least 2 GB of RAM, but 4 GB or more is better for performance."
    },
    {
      id: 34,
      question: "VirtualBox requires approximately _______ of disk space for the application itself.",
      options: ["50 MB", "100 MB", "200 MB", "500 MB"],
      correct: 2,
      explanation: "VirtualBox needs about 200 MB for installation, plus space for VMs."
    },
    {
      id: 35,
      question: "In NAT (Network Address Translation) networking mode, the VM shares the host's IP address and can access the internet but is invisible to other network devices.",
      options: ["True", "False", "Only on Windows", "Only on Linux"],
      correct: 0,
      explanation: "NAT (Network Address Translation) mode allows internet access while keeping the VM hidden from the network."
    },
    {
      id: 36,
      question: "A VM configured in _______ mode acts as a separate device on the network with its own IP address.",
      options: ["NAT", "Bridged", "Internal", "Host-Only"],
      correct: 1,
      explanation: "Bridged mode makes the VM appear as an independent device on the physical network."
    },
    {
      id: 37,
      question: "_______ networking mode allows VMs to communicate with each other but provides no external network access.",
      options: ["NAT", "Bridged", "Internal", "Host-Only"],
      correct: 2,
      explanation: "Internal mode creates an isolated network for VM-to-VM communication only."
    },
    {
      id: 38,
      question: "In _______ mode, VMs can communicate with the host but have no internet access.",
      options: ["NAT", "Bridged", "Internal", "Host-Only"],
      correct: 3,
      explanation: "Host-Only mode enables host-VM communication without internet connectivity."
    },
    {
      id: 39,
      question: "_______ is similar to NAT but allows VM-to-VM communication within the same network.",
      options: ["Bridged", "Internal", "Host-Only", "NAT Network"],
      correct: 3,
      explanation: "NAT Network combines NAT's internet access with VM-to-VM communication."
    },
    {
      id: 40,
      question: "A _______ saves the exact state of a VM at a specific point in time for rollback purposes.",
      options: ["Clone", "Snapshot", "Backup", "Template"],
      correct: 1,
      explanation: "Snapshots capture VM state for easy restoration."
    },
    {
      id: 41,
      question: "_______ creates an exact duplicate of a VM, useful for testing and parallel development.",
      options: ["Snapshot", "Cloning", "Backup", "Migration"],
      correct: 1,
      explanation: "Cloning duplicates an entire VM for various purposes."
    },

    // WEEK 3 - GLOBAL SERVER OS STATISTICS (12 questions)
    {
      id: 42,
      question: "_______ are designed to manage servers, handling file sharing, databases, networking, and resource management.",
      options: ["Desktop Operating Systems", "Server Operating Systems", "Mobile Operating Systems", "Embedded Systems"],
      correct: 1,
      explanation: "Server Operating Systems are specialized for server management tasks."
    },
    {
      id: 43,
      question: "_______ is dominant in enterprises and integrates well with Microsoft applications like Exchange and SharePoint.",
      options: ["Linux", "Windows Server", "UNIX", "FreeBSD"],
      correct: 1,
      explanation: "Windows Server is widely used in enterprise environments with Microsoft ecosystems."
    },
    {
      id: 44,
      question: "_______ is an open-source server OS known for stability, flexibility, and security.",
      options: ["Windows Server", "Linux", "macOS Server", "IBM i"],
      correct: 1,
      explanation: "Linux is the popular open-source choice for servers."
    },
    {
      id: 45,
      question: "The main disadvantage of Windows Server compared to Linux is _______.",
      options: ["Poor security", "Expensive licenses", "Limited software support", "Unstable performance"],
      correct: 1,
      explanation: "Windows Server requires costly licensing, unlike free Linux distributions."
    },
    {
      id: 46,
      question: "The main disadvantage of Linux compared to Windows Server is _______.",
      options: ["High cost", "Poor security", "Steeper learning curve", "Limited scalability"],
      correct: 2,
      explanation: "Linux has a steeper learning curve, especially for those familiar with Windows."
    },
    {
      id: 47,
      question: "In the healthcare industry, Windows Server is used primarily for managing EHRs (Electronic Health Records) and _______ compliance.",
      options: ["GDPR", "HIPAA", "SOX", "PCI-DSS"],
      correct: 1,
      explanation: "Healthcare uses Windows Server for Electronic Health Records (EHRs) and HIPAA compliance."
    },
    {
      id: 48,
      question: "Windows Server is preferred in enterprise environments mainly because of integration with _______.",
      options: ["Linux tools", "Microsoft applications", "Apple devices", "Android systems"],
      correct: 1,
      explanation: "Windows Server integrates seamlessly with Microsoft's enterprise applications."
    },
    {
      id: 49,
      question: "The region with the highest Windows Server adoption is _______.",
      options: ["Asia", "Africa", "North America", "South America"],
      correct: 2,
      explanation: "North America, especially the U.S., has the highest Windows Server adoption."
    },
    {
      id: 50,
      question: "_______ protects the integrity of the operating system during the boot process.",
      options: ["Windows Firewall", "Secure Boot", "Windows Defender", "AppLocker"],
      correct: 1,
      explanation: "Secure Boot ensures only trusted software loads during startup."
    },
    {
      id: 51,
      question: "_______ provides built-in malware protection in Windows Server.",
      options: ["AppLocker", "Windows Defender", "IPsec", "Active Directory"],
      correct: 1,
      explanation: "Windows Defender offers integrated antimalware protection."
    },
    {
      id: 52,
      question: "_______ controls which applications can run on Windows systems for enhanced security.",
      options: ["Windows Firewall", "Windows Defender", "AppLocker", "Secure Boot"],
      correct: 2,
      explanation: "AppLocker restricts application execution based on policies."
    },
    {
      id: 53,
      question: "_______ is known for stability and scalability but has expensive licensing and declining support.",
      options: ["Linux", "Windows Server", "UNIX", "FreeBSD"],
      correct: 2,
      explanation: "UNIX is reliable but faces declining support and high costs."
    },

    // WEEK 3 - WINDOWS CONSUMER OS (13 questions)
    {
      id: 54,
      question: "The first Windows version with a graphical user interface was released in _______.",
      options: ["1981", "1985", "1990", "1995"],
      correct: 1,
      explanation: "Windows 1.0 was released in 1985 as the first GUI version."
    },
    {
      id: 55,
      question: "_______ introduced the iconic Start Menu and Plug & Play functionality.",
      options: ["Windows 3.1", "Windows 95", "Windows 98", "Windows XP"],
      correct: 1,
      explanation: "Windows 95 revolutionized Windows with the Start Menu and Plug & Play."
    },
    {
      id: 56,
      question: "Released in 2001, _______ was built on the NT Kernel and became widely adopted for its stability.",
      options: ["Windows 2000", "Windows XP", "Windows Vista", "Windows 7"],
      correct: 1,
      explanation: "Windows XP was a milestone release known for stability and widespread use."
    },
    {
      id: 57,
      question: "_______ introduced improved UI, Libraries for file organization, and HomeGroup sharing in 2009.",
      options: ["Windows Vista", "Windows 7", "Windows 8", "Windows 10"],
      correct: 1,
      explanation: "Windows 7 improved on Vista with better performance and features."
    },
    {
      id: 58,
      question: "Released in 2015, _______ brought back the Start Menu with Live Tiles and introduced Cortana.",
      options: ["Windows 8.1", "Windows 10", "Windows 11", "Windows Server"],
      correct: 1,
      explanation: "Windows 10 combined the best of Windows 7 and 8 with new features."
    },
    {
      id: 59,
      question: "Windows 10 support will end in _______.",
      options: ["October 2023", "October 2024", "October 2025", "October 2026"],
      correct: 2,
      explanation: "Windows 10 support ends in October 2025."
    },
    {
      id: 60,
      question: "_______ features a centered Start Menu, Snap Layouts, and requires TPM 2.0.",
      options: ["Windows 10", "Windows 11", "Windows Server 2022", "Windows 8"],
      correct: 1,
      explanation: "Windows 11 introduced a modern centered interface with strict security requirements."
    },
    {
      id: 61,
      question: "Windows 95 introduced _______, allowing filenames up to 255 characters.",
      options: ["Short Filenames", "Long Filenames", "Extended Filenames", "Unicode Names"],
      correct: 1,
      explanation: "Long Filenames was a major improvement in Windows 95."
    },
    {
      id: 62,
      question: "Windows XP introduced _______, allowing multiple users to be logged in simultaneously.",
      options: ["User Profiles", "Fast User Switching", "Guest Mode", "Safe Mode"],
      correct: 1,
      explanation: "Fast User Switching enabled multiple concurrent user sessions."
    },
    {
      id: 63,
      question: "_______ in Windows XP allows older applications to run in compatibility mode.",
      options: ["Virtual Machine", "Compatibility Mode", "Safe Mode", "Legacy Support"],
      correct: 1,
      explanation: "Compatibility Mode helps run older software on newer Windows versions."
    },
    {
      id: 64,
      question: "Windows 7 introduced _______, which allows quick window resizing by dragging to screen edges.",
      options: ["Snap Assist", "Aero Snap", "Window Manager", "Tile Mode"],
      correct: 1,
      explanation: "Aero Snap simplified window management with edge snapping."
    },
    {
      id: 65,
      question: "The _______ in Windows 7 provides centralized management of system updates and security alerts.",
      options: ["Control Panel", "Action Center", "Task Manager", "System Settings"],
      correct: 1,
      explanation: "Action Center consolidated notifications and maintenance messages."
    },
    {
      id: 66,
      question: "Windows 11 supports _______, allowing Android applications to run natively.",
      options: ["iOS Apps", "Android App Support", "Linux Applications", "macOS Apps"],
      correct: 1,
      explanation: "Windows 11 added support for running Android applications."
    },

    // WEEK 4 - BASICS OF ACTIVE DIRECTORY (15 questions)
    {
      id: 67,
      question: "AD (Active Directory) is a centralized database that manages network resources in a hierarchical structure.",
      options: ["True", "False", "Only in Windows Server", "Only in Linux"],
      correct: 0,
      explanation: "AD (Active Directory) provides centralized management of network resources."
    },
    {
      id: 68,
      question: "SSO (Single Sign-On) is the feature that allows users to access multiple systems with one set of credentials.",
      options: ["True", "False", "Only in Active Directory", "Only in cloud services"],
      correct: 0,
      explanation: "SSO (Single Sign-On) enables one login for multiple resources."
    },
    {
      id: 69,
      question: "_______ in Active Directory verifies user identity before granting access.",
      options: ["Authorization", "Authentication", "Accounting", "Auditing"],
      correct: 1,
      explanation: "Authentication is the process of verifying who the user is."
    },
    {
      id: 70,
      question: "_______ determines what resources an authenticated user can access.",
      options: ["Authentication", "Authorization", "Accounting", "Auditing"],
      correct: 1,
      explanation: "Authorization controls access permissions after authentication."
    },
    {
      id: 71,
      question: "_______ are servers that store and replicate Active Directory data.",
      options: ["File Servers", "Domain Controllers", "Web Servers", "Print Servers"],
      correct: 1,
      explanation: "Domain Controllers are the core servers managing AD data."
    },
    {
      id: 72,
      question: "A _______ is a logical grouping of objects that share a single database in Active Directory.",
      options: ["Forest", "Domain", "Tree", "Site"],
      correct: 1,
      explanation: "A Domain is the basic unit of organization in Active Directory."
    },
    {
      id: 73,
      question: "OUs (Organizational Units) are containers used to organize objects for delegation and applying group policies.",
      options: ["True", "False", "Only in large networks", "Only in small networks"],
      correct: 0,
      explanation: "OUs (Organizational Units) help organize and manage AD objects."
    },
    {
      id: 74,
      question: "A _______ is a collection of domains that share a common schema and global catalog.",
      options: ["Tree", "Forest", "Site", "OU"],
      correct: 1,
      explanation: "A Forest is the top-level container in Active Directory structure."
    },
    {
      id: 75,
      question: "A collection of domains with the same namespace forms a _______.",
      options: ["Forest", "Tree", "Site", "Domain"],
      correct: 1,
      explanation: "A Tree is a hierarchical collection of domains sharing a namespace."
    },
    {
      id: 76,
      question: "_______ groups are used to assign permissions to resources.",
      options: ["Distribution", "Security", "Universal", "Contact"],
      correct: 1,
      explanation: "Security Groups control access permissions in Active Directory."
    },
    {
      id: 77,
      question: "_______ groups are used primarily for email distribution lists.",
      options: ["Security", "Distribution", "Universal", "Global"],
      correct: 1,
      explanation: "Distribution Groups are used for sending emails to multiple recipients."
    },
    {
      id: 78,
      question: "Group Policies can enforce settings like password policies, software installation, and _______.",
      options: ["Hardware configuration", "Desktop wallpaper", "Network speed", "Disk capacity"],
      correct: 1,
      explanation: "Group Policies can control desktop appearance including wallpaper."
    },
    {
      id: 79,
      question: "In a _______ trust, Domain A trusts Domain B, but Domain B does not trust Domain A.",
      options: ["Two-Way Trust", "One-Way Trust", "Forest Trust", "Shortcut Trust"],
      correct: 1,
      explanation: "One-Way Trust allows access in only one direction."
    },
    {
      id: 80,
      question: "A _______ trust allows mutual resource sharing between two domains.",
      options: ["One-Way Trust", "Two-Way Trust", "External Trust", "Realm Trust"],
      correct: 1,
      explanation: "Two-Way Trust enables bidirectional resource access."
    },
    {
      id: 81,
      question: "An _______ trust is established between domains in different forests.",
      options: ["Internal", "External", "Shortcut", "Parent-Child"],
      correct: 1,
      explanation: "External Trust connects domains across different forests."
    },

    // WEEK 5 - DNS AND DHCP (12 questions)
    {
      id: 82,
      question: "DNS (Domain Name System) translates human-readable domain names into _______.",
      options: ["MAC addresses", "IP addresses", "Port numbers", "Hostnames"],
      correct: 1,
      explanation: "DNS (Domain Name System) resolves names to IP addresses."
    },
    {
      id: 83,
      question: "DNS is often described as the internet's _______.",
      options: ["Router", "Phonebook", "Firewall", "Gateway"],
      correct: 1,
      explanation: "DNS acts like a phonebook, looking up IP addresses for domain names."
    },
    {
      id: 84,
      question: "DHCP (Dynamic Host Configuration Protocol) automatically assigns _______ and network configurations to devices.",
      options: ["MAC addresses", "IP addresses", "Port numbers", "Domain names"],
      correct: 1,
      explanation: "DHCP (Dynamic Host Configuration Protocol) automates IP assignment."
    },
    {
      id: 85,
      question: "DNS provides _______ by distributing traffic across multiple servers.",
      options: ["Encryption", "Load Balancing", "Compression", "Caching"],
      correct: 1,
      explanation: "DNS can distribute traffic for better performance and reliability."
    },
    {
      id: 86,
      question: "DNSSEC (DNS Security Extensions) prevents DNS spoofing and phishing attacks through _______.",
      options: ["Passwords", "Cryptographic signatures", "Firewalls", "Antivirus"],
      correct: 1,
      explanation: "DNSSEC (DNS Security Extensions) adds security to DNS through digital signatures."
    },
    {
      id: 87,
      question: "_______ records in DNS specify mail servers for email routing.",
      options: ["A Records", "CNAME Records", "MX Records", "TXT Records"],
      correct: 2,
      explanation: "MX (Mail Exchange) records direct email to the correct mail servers."
    },
    {
      id: 88,
      question: "DHCP assigns four essential network settings: IP address, subnet mask, gateway, and _______.",
      options: ["MAC address", "DNS server", "Hostname", "Port number"],
      correct: 1,
      explanation: "DHCP provides IP, subnet mask, gateway, and DNS server information."
    },
    {
      id: 89,
      question: "DHCP prevents _______ by tracking which IP addresses are already assigned.",
      options: ["Hacking", "Duplicate IP conflicts", "DNS errors", "Network congestion"],
      correct: 1,
      explanation: "DHCP manages IP allocation to avoid address conflicts."
    },
    {
      id: 90,
      question: "DNS operates in a _______ structure with root, TLD, and authoritative servers.",
      options: ["Flat", "Hierarchical", "Mesh", "Ring"],
      correct: 1,
      explanation: "DNS uses a hierarchical query system for name resolution."
    },
    {
      id: 91,
      question: "DHCP uses a _______ process to temporarily assign IP addresses to devices.",
      options: ["Permanent assignment", "Dynamic leasing", "Static allocation", "Random selection"],
      correct: 1,
      explanation: "DHCP leases IP addresses for a specific time period."
    },
    {
      id: 92,
      question: "DNS is a _______ service, while DHCP is a _______ service.",
      options: ["Configuration / Name resolution", "Name resolution / Configuration", "Security / Routing", "Routing / Security"],
      correct: 1,
      explanation: "DNS resolves names, while DHCP configures network settings."
    },
    {
      id: 93,
      question: "Without DNS, users would need to remember _______ to access websites.",
      options: ["Domain names", "IP addresses", "Port numbers", "MAC addresses"],
      correct: 1,
      explanation: "DNS allows using domain names instead of numeric IP addresses."
    },

    // WEEK 6 - AD OBJECTS MANAGEMENT (8 questions)
    {
      id: 94,
      question: "_______ objects represent individual people with login credentials and permissions in Active Directory.",
      options: ["Computer", "User", "Group", "Contact"],
      correct: 1,
      explanation: "User Objects represent people who can log into the network."
    },
    {
      id: 95,
      question: "_______ objects are collections of users or computers for easier permission management.",
      options: ["OU", "Group", "Domain", "Container"],
      correct: 1,
      explanation: "Group Objects simplify permission assignment to multiple users."
    },
    {
      id: 96,
      question: "_______ objects represent devices connected to the Active Directory network.",
      options: ["User", "Printer", "Computer", "Contact"],
      correct: 2,
      explanation: "Computer Objects represent networked devices in AD."
    },
    {
      id: 97,
      question: "_______ objects represent shared network printers in Active Directory.",
      options: ["Device", "Printer", "Share", "Resource"],
      correct: 1,
      explanation: "Printer Objects allow centralized management of network printers."
    },
    {
      id: 98,
      question: "_______ objects represent external contacts or vendors who don't have network access.",
      options: ["Guest", "Contact", "External User", "Visitor"],
      correct: 1,
      explanation: "Contact Objects store information about external people without giving them access."
    },
    {
      id: 99,
      question: "When creating a user in AD, you must assign a username, password, and _______.",
      options: ["MAC address", "Group membership", "IP address", "Computer name"],
      correct: 1,
      explanation: "Users need username, password, and group assignments."
    },
    {
      id: 100,
      question: "The AD Recycle Bin (Active Directory Recycle Bin) feature allows recovery of accidentally deleted _______.",
      options: ["Files", "AD objects", "Emails", "Registry keys"],
      correct: 1,
      explanation: "AD (Active Directory) Recycle Bin enables recovery of deleted objects without full backup restoration."
    },
    {
      id: 101,
      question: "When modifying user objects, administrators can change passwords, contact information, and _______.",
      options: ["Computer hardware", "Network speed", "Group membership", "IP addresses"],
      correct: 2,
      explanation: "Admins can modify user properties including group assignments."
    },

    // WEEK 7 - GROUP POLICY OBJECTS (12 questions)
    {
      id: 102,
      question: "GPOs (Group Policy Objects) are collections of configuration settings that control user and computer behavior in _______.",
      options: ["Linux systems", "Active Directory", "Cloud platforms", "Mobile devices"],
      correct: 1,
      explanation: "GPOs (Group Policy Objects) define settings for AD environments."
    },
    {
      id: 103,
      question: "GPOs provide _______ by managing all settings from a single location.",
      options: ["Distributed Control", "Centralized Management", "Manual Configuration", "Local Administration"],
      correct: 1,
      explanation: "GPOs enable centralized control of all network settings."
    },
    {
      id: 104,
      question: "GPOs help enforce _______ by applying password rules, firewall configs, and lockout policies.",
      options: ["User Training", "Security Enforcement", "Network Speed", "Disk Quotas"],
      correct: 1,
      explanation: "GPOs are crucial for enforcing security policies consistently."
    },
    {
      id: 105,
      question: "GPOs ensure _______ by maintaining uniform configurations across devices.",
      options: ["Diversity", "Consistency", "Complexity", "Randomness"],
      correct: 1,
      explanation: "GPOs prevent configuration drift by enforcing consistent settings."
    },
    {
      id: 106,
      question: "GPOs support _______ by automatically deploying applications across the network.",
      options: ["Manual Installation", "Software Deployment", "Hardware Upgrades", "User Training"],
      correct: 1,
      explanation: "GPOs can automatically install and update software organization-wide."
    },
    {
      id: 107,
      question: "GPMC (Group Policy Management Console) is the primary tool for creating, editing, and managing _______.",
      options: ["User accounts", "GPOs", "Network settings", "File shares"],
      correct: 1,
      explanation: "GPMC (Group Policy Management Console) is the main interface for GPO administration."
    },
    {
      id: 108,
      question: "The PowerShell cmdlet to create a new GPO is _______.",
      options: ["Create-GPO", "New-GPO", "Add-GPO", "Make-GPO"],
      correct: 1,
      explanation: "New-GPO is the PowerShell command for creating GPOs."
    },
    {
      id: 109,
      question: "The PowerShell cmdlet to retrieve GPO information is _______.",
      options: ["Show-GPO", "Get-GPO", "Read-GPO", "Find-GPO"],
      correct: 1,
      explanation: "Get-GPO retrieves information about existing GPOs."
    },
    {
      id: 110,
      question: "To apply policy updates immediately, administrators use the cmdlet _______.",
      options: ["Update-GPO", "Invoke-GPUpdate", "Apply-GPO", "Refresh-GPO"],
      correct: 1,
      explanation: "Invoke-GPUpdate forces immediate policy application."
    },
    {
      id: 111,
      question: "_______ is a third-party tool that tracks GPO changes and generates reports.",
      options: ["Netwrix Group Policy Change Reporter", "Windows Admin Center", "Active Directory Admin", "Policy Manager Pro"],
      correct: 0,
      explanation: "Netwrix tracks and reports on GPO modifications."
    },
    {
      id: 112,
      question: "_______ provides advanced application and preference management through GPO.",
      options: ["Specops Gpupdate", "PolicyPak", "ManageEngine", "Netwrix"],
      correct: 1,
      explanation: "PolicyPak extends GPO capabilities for application management."
    },
    {
      id: 113,
      question: "GPOs can restrict _______ to limit which programs users can run.",
      options: ["Network access", "Application use", "File access", "Printer use"],
      correct: 1,
      explanation: "GPOs can control which applications users are allowed to execute."
    },

    // WEEK 8 - FILE SHARING SERVICES (14 questions)
    {
      id: 114,
      question: "_______ enable collaboration and data exchange by allowing users to access files over networks.",
      options: ["Email Services", "File Sharing Services", "Web Services", "Database Services"],
      correct: 1,
      explanation: "File Sharing Services facilitate collaborative file access and storage."
    },
    {
      id: 115,
      question: "File sharing services ensure data _______ and security while promoting collaboration.",
      options: ["Deletion", "Integrity", "Fragmentation", "Duplication"],
      correct: 1,
      explanation: "File sharing services maintain data integrity and protect information."
    },
    {
      id: 116,
      question: "_______ stores data on remote servers managed by third parties and is accessible globally.",
      options: ["Local Storage", "Cloud Storage", "Network Storage", "Direct Storage"],
      correct: 1,
      explanation: "Cloud Storage provides internet-accessible file storage."
    },
    {
      id: 117,
      question: "Google Drive, Dropbox, and OneDrive are examples of _______.",
      options: ["FTP Servers", "Cloud Storage", "NAS Devices", "Distributed Systems"],
      correct: 1,
      explanation: "These are popular cloud storage platforms."
    },
    {
      id: 118,
      question: "NAS (Network-Attached Storage) is a local storage server accessed by multiple users on a _______.",
      options: ["WAN", "LAN", "Internet", "Cloud"],
      correct: 1,
      explanation: "NAS (Network-Attached Storage) provides shared storage on local networks."
    },
    {
      id: 119,
      question: "Synology NAS and QNAP are examples of _______ devices.",
      options: ["Cloud Storage", "Network-Attached Storage", "FTP Servers", "Web Servers"],
      correct: 1,
      explanation: "These are popular NAS hardware manufacturers."
    },
    {
      id: 120,
      question: "FTP (File Transfer Protocol) is a standard protocol for transferring files between _______.",
      options: ["Servers only", "Client and server", "Databases", "Email systems"],
      correct: 1,
      explanation: "FTP (File Transfer Protocol) is designed for file transfers between client and server."
    },
    {
      id: 121,
      question: "_______ stores data across multiple servers for scalability and fault tolerance.",
      options: ["Local File System", "Distributed File System", "Single Server Storage", "Direct Attached Storage"],
      correct: 1,
      explanation: "Distributed File Systems spread data across multiple servers."
    },
    {
      id: 122,
      question: "HDFS and GlusterFS are examples of _______.",
      options: ["Cloud Storage", "FTP Servers", "Distributed File Systems", "NAS Devices"],
      correct: 2,
      explanation: "These are distributed file system implementations."
    },
    {
      id: 123,
      question: "SMB (Server Message Block) is a protocol developed by Microsoft for file and printer sharing in _______.",
      options: ["Linux", "Windows", "macOS", "Unix"],
      correct: 1,
      explanation: "SMB (Server Message Block) is Microsoft's file sharing protocol."
    },
    {
      id: 124,
      question: "NFS (Network File System) was developed by Sun Microsystems for _______ file sharing.",
      options: ["Windows", "Unix/Linux", "macOS", "Mobile"],
      correct: 1,
      explanation: "NFS (Network File System) is the Unix/Linux standard."
    },
    {
      id: 125,
      question: "SMB uses _______ for authentication in Windows environments.",
      options: ["Plain text", "NTLM/Kerberos", "SSH keys", "Certificates only"],
      correct: 1,
      explanation: "SMB uses NTLM or Kerberos for secure authentication."
    },
    {
      id: 126,
      question: "NFS traditionally uses _______ authentication, though NFSv4 added stronger options.",
      options: ["Kerberos-based", "Host-based", "Certificate-based", "Biometric"],
      correct: 1,
      explanation: "Classic NFS uses host-based authentication."
    },
    {
      id: 127,
      question: "_______ adds encryption and authentication features to NFS.",
      options: ["NFSv2", "NFSv3", "NFSv4", "NFSv1"],
      correct: 2,
      explanation: "NFSv4 introduced significant security improvements."
    },

    // WEEK 9 - WEB SERVICES (16 questions)
    {
      id: 128,
      question: "_______ are software systems that allow communication between applications over networks.",
      options: ["Database Systems", "Web Services", "Operating Systems", "File Systems"],
      correct: 1,
      explanation: "Web Services enable cross-application communication."
    },
    {
      id: 129,
      question: "Web Services use HTTP, XML, SOAP, and APIs to exchange _______.",
      options: ["Hardware", "Data", "Power", "Users"],
      correct: 1,
      explanation: "Web Services commonly use APIs (Application Programming Interfaces) for data exchange."
    },
    {
      id: 130,
      question: "_______ allows web services to connect applications built in different programming languages.",
      options: ["Compatibility", "Interoperability", "Scalability", "Reliability"],
      correct: 1,
      explanation: "Interoperability enables cross-platform and cross-language communication."
    },
    {
      id: 131,
      question: "Web services support _______ by handling large numbers of users efficiently.",
      options: ["Interoperability", "Scalability", "Simplicity", "Isolation"],
      correct: 1,
      explanation: "Scalability allows web services to grow with demand."
    },
    {
      id: 132,
      question: "_______ APIs use standard HTTP methods like GET, POST, PUT, and DELETE.",
      options: ["SOAP", "RESTful", "GraphQL", "RPC"],
      correct: 1,
      explanation: "RESTful APIs use standard HTTP verbs for operations."
    },
    {
      id: 133,
      question: "RESTful APIs use standard HTTP methods like GET, POST, PUT, and _______.",
      options: ["CONNECT", "DELETE", "TRACE", "OPTIONS"],
      correct: 1,
      explanation: "RESTful APIs (Representational State Transfer) use standard HTTP verbs for operations."
    },
    {
      id: 134,
      question: "SOAP (Simple Object Access Protocol) is an _______ protocol for structured enterprise applications.",
      options: ["HTML-based", "XML-based", "JSON-based", "Plain text"],
      correct: 1,
      explanation: "SOAP (Simple Object Access Protocol) uses XML for message exchange in enterprise systems."
    },
    {
      id: 135,
      question: "Instagram API and GitHub API are examples of _______ APIs.",
      options: ["SOAP", "RESTful", "XML-RPC", "CORBA"],
      correct: 1,
      explanation: "These are popular RESTful API implementations."
    },
    {
      id: 136,
      question: "EC2, S3, and RDS are services provided by AWS (Amazon Web Services).",
      options: ["True", "False", "Only EC2 and S3", "Only in specific regions"],
      correct: 0,
      explanation: "These are core AWS (Amazon Web Services) service offerings."
    },
    {
      id: 137,
      question: "_______ is a cloud platform offering hosting, storage, and database services.",
      options: ["Facebook", "Amazon Web Services (AWS)", "Twitter", "LinkedIn"],
      correct: 1,
      explanation: "AWS is Amazon's comprehensive cloud services platform."
    },
    {
      id: 138,
      question: "_______ integrates mapping and geolocation functionality into applications.",
      options: ["Facebook API", "Google Maps API", "Twitter API", "Instagram API"],
      correct: 1,
      explanation: "Google Maps API provides mapping and location services."
    },
    {
      id: 139,
      question: "A _______ hosts and delivers web content to clients through HTTP/HTTPS.",
      options: ["Database Server", "Web Server", "File Server", "Mail Server"],
      correct: 1,
      explanation: "Web Servers handle HTTP requests and serve web content."
    },
    {
      id: 140,
      question: "Web servers provide security through SSL/TLS (Secure Sockets Layer/Transport Layer Security) encryption protocols.",
      options: ["True", "False", "Only HTTPS servers", "Only Apache servers"],
      correct: 0,
      explanation: "SSL/TLS (Secure Sockets Layer/Transport Layer Security) protocols secure web server communications."
    },
    {
      id: 141,
      question: "Web servers handle HTTP requests like _______.",
      options: ["CONNECT and TRACE", "GET and POST", "PUSH and PULL", "READ and WRITE"],
      correct: 1,
      explanation: "GET and POST are the most common HTTP methods."
    },
    {
      id: 142,
      question: "_______ is an open-source, reliable, and modular web server.",
      options: ["IIS", "Apache HTTP Server", "Tomcat", "WebLogic"],
      correct: 1,
      explanation: "Apache is one of the most popular open-source web servers."
    },
    {
      id: 143,
      question: "_______ is a high-performance web server that handles large concurrent connections efficiently.",
      options: ["Apache", "Nginx", "IIS", "Lighttpd"],
      correct: 1,
      explanation: "Nginx is known for excellent performance with many simultaneous connections."
    },
    {
      id: 144,
      question: "Microsoft IIS (Internet Information Services) is a Windows-based web server for _______ applications.",
      options: ["Java and PHP", ".NET and ASP", "Python and Ruby", "Node.js and Go"],
      correct: 1,
      explanation: "IIS (Internet Information Services) is Microsoft's web server for .NET and ASP applications."
    }
  ];

  // Shuffle array function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Shuffle options for a question
  const shuffleQuestion = (question) => {
    const options = [...question.options];
    const correctAnswer = options[question.correct];
    
    const shuffled = shuffleArray(options);
    const newCorrectIndex = shuffled.indexOf(correctAnswer);
    
    return {
      ...question,
      options: shuffled,
      correct: newCorrectIndex
    };
  };

  // Initialize shuffled questions on mount
  useEffect(() => {
    const shuffled = questions.map(q => shuffleQuestion(q));
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswer = (optionIndex) => {
    setAnswers({...answers, [currentQuestion]: optionIndex});
  };

  const handleNext = () => {
    if (showResults) {
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowResults(false);
      } else {
        setQuizComplete(true);
      }
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setQuizComplete(false);
    setIsRetakeWrong(false);
    const shuffled = questions.map(q => shuffleQuestion(q));
    setShuffledQuestions(shuffled);
  };

  const handleRetakeWrong = () => {
    const wrongQuestions = shuffledQuestions.filter((q, index) => 
      answers[index] !== undefined && answers[index] !== q.correct
    );
    
    if (wrongQuestions.length === 0) {
      alert("You got all questions correct! No questions to retake.");
      return;
    }
    
    const reshuffled = wrongQuestions.map(q => shuffleQuestion(q));
    setShuffledQuestions(reshuffled);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setQuizComplete(false);
    setIsRetakeWrong(true);
  };

  const calculateScore = () => {
    let correct = 0;
    shuffledQuestions.forEach((q, index) => {
      if (answers[index] === q.correct) correct++;
    });
    return correct;
  };

  // Show loading state while questions are being shuffled
  if (shuffledQuestions.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading quiz...</div>
      </div>
    );
  }

  if (quizComplete) {
    const score = calculateScore();
    const percentage = ((score / shuffledQuestions.length) * 100).toFixed(1);
    const wrongCount = shuffledQuestions.length - score;
    
    return (
      <div className="completion-container">
        <div className="completion-card">
          <h1 className="completion-title">
            {isRetakeWrong ? "Retake Complete! 🔄" : "Quiz Complete! 🎉"}
          </h1>
          <div className="completion-score">
            {score}/{shuffledQuestions.length}
          </div>
          <p className="completion-percentage">Your Score: {percentage}%</p>
          <p className="completion-message">
            {percentage >= 90 ? "Outstanding! Expert Level! 🌟" : 
             percentage >= 80 ? "Excellent! Great job! 👏" :
             percentage >= 70 ? "Good! Keep it up! 💪" :
             percentage >= 60 ? "Fair! Review the materials! 📚" :
             "Keep studying! Practice makes perfect! 💡"}
          </p>
          
          {wrongCount > 0 && (
            <div className="wrong-answers-alert">
              <div className="wrong-answers-header">
                <AlertCircle size={20} />
                <span>You missed {wrongCount} question{wrongCount > 1 ? 's' : ''}</span>
              </div>
              <p className="wrong-answers-text">Want to practice just the questions you got wrong?</p>
            </div>
          )}

          <div className="completion-buttons">
            <button
              onClick={handleRestart}
              className="restart-button"
            >
              <RotateCcw size={20} />
              Retake Full Quiz
            </button>
            
            {wrongCount > 0 && (
              <button
                onClick={handleRetakeWrong}
                className="retake-wrong-button"
              >
                <AlertCircle size={20} />
                Practice Wrong Answers ({wrongCount})
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const question = shuffledQuestions[currentQuestion];
  const userAnswer = answers[currentQuestion];
  const isAnswered = userAnswer !== undefined;

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        {/* Header */}
        <div className="quiz-header">
          <div className="quiz-progress-info">
            <span className="question-badge">
              Question {currentQuestion + 1} of {shuffledQuestions.length}
              {isRetakeWrong && " (Wrong Answers)"}
            </span>
            <span className="score-text">
              Score: {calculateScore()}/{currentQuestion + (showResults ? 1 : 0)}
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%`}}
            />
          </div>
        </div>

        {/* Question */}
        <div className="question-section">
          <h2 className="question-text">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="options-container">
          {question.options.map((option, index) => {
            const isSelected = userAnswer === index;
            const isCorrect = index === question.correct;
            const showCorrect = showResults && isCorrect;
            const showIncorrect = showResults && isSelected && !isCorrect;

            let buttonClass = 'option-button';
            if (showCorrect) buttonClass += ' correct';
            else if (showIncorrect) buttonClass += ' incorrect';
            else if (isSelected) buttonClass += ' selected';

            return (
              <button
                key={index}
                onClick={() => !showResults && handleAnswer(index)}
                disabled={showResults}
                className={buttonClass}
              >
                <span className="option-text">
                  {option}
                </span>
                {showCorrect && <CheckCircle color="#10b981" size={24} />}
                {showIncorrect && <XCircle color="#ef4444" size={24} />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResults && (
          <div className={`explanation-box ${
            userAnswer === question.correct ? 'correct' : 'incorrect'
          }`}>
            <h3 className="explanation-title">
              {userAnswer === question.correct ? '✓ Correct!' : '✗ Incorrect'}
            </h3>
            <p className="explanation-text">{question.explanation}</p>
          </div>
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`next-button ${isAnswered ? 'enabled' : 'disabled'}`}
        >
          {showResults ? (
            currentQuestion < shuffledQuestions.length - 1 ? 'Next Question' : 'View Results'
          ) : (
            'Check Answer'
          )}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuizApp;