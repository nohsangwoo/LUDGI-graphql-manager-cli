```
██╗     ██╗   ██╗██████╗  ██████╗ ██╗
██║     ██║   ██║██╔══██╗██╔════╝ ██║
██║     ██║   ██║██║  ██║██║  ███╗██║
██║     ██║   ██║██║  ██║██║   ██║██║
███████╗╚██████╔╝██████╔╝╚██████╔╝██║
╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝
Manage your GraphQL resources effortlessly with Ludgi CLI
```

---
---

# **Ludgi CLI**

**Ludgi CLI** is a powerful, intuitive, and developer-friendly Command Line Interface (CLI) tool designed for managing GraphQL resources with ease. Whether you're working on a small project or a large-scale application, **Ludgi CLI** provides the tools you need to streamline your GraphQL workflow.

---

## **Project-Specific Notice**

**Important:** Ludgi CLI is specifically designed to work exclusively with the [Ludgi Next.js Project](https://github.com/nohsangwoo/ludgi-nextjs). This means all functionalities and commands are tailored to integrate seamlessly within this project. If you attempt to use Ludgi CLI outside of this project, it will not function as expected.

---

## **Installation**

To get started, install Ludgi CLI as a development dependency:

```bash
npm install ludgi --save-dev
```

---

## **Features**

- **Auto-Generate GraphQL Queries & Mutations**: Create resources with a single command.
- **Comprehensive Resource Management**: List, delete, or modify your queries and mutations effortlessly.
- **Interactive CLI Options**: Access a user-friendly interface with help and version commands.

---

## **Usage**

Ludgi CLI commands are simple yet powerful. Below are the key commands to help you navigate the tool.

### **Display Version**
```bash
npx ludgi-cli -V
```
Outputs the current version of the Ludgi CLI.

---

### **Display Help**
```bash
npx ludgi-cli -h
```
Displays a comprehensive list of available commands and their usage.

---

### **Generate a Query or Mutation**
```bash
npx ludgi-cli -n <name>
```
Generates a new GraphQL query or mutation file with the specified name.

**Example:**
```bash
npx ludgi-cli -n getUserProfile
```

---

### **List All Queries & Mutations**
```bash
npx ludgi-cli -l
```
Lists all existing GraphQL queries and mutations in your project.

---

### **Delete a Query or Mutation**
```bash
npx ludgi-cli -d
```
Deletes a specified GraphQL query or mutation.

---

## **Animated Workflow**

When you execute a command, **Ludgi CLI** provides an elegant, animated output, enhancing the user experience. For example:

- **Version Command (`-V`)**: Displays the version with a typewriter animation.
- **Help Command (`-h`)**: Dynamically highlights options as they are displayed.
- **Resource Management**: Displays a spinner animation during execution and a success banner on completion.

---

## **Why Ludgi CLI?**

- **Efficiency**: Speeds up your GraphQL resource management.
- **Consistency**: Ensures uniform resource naming and structure.
- **Developer-Friendly**: Designed with user experience at the forefront.

---

## **Example Workflow**

**Step 1: Install Ludgi CLI**
```bash
npm install ludgi --save-dev
```

**Step 2: Create a Query**
```bash
npx ludgi-cli -n <name>
# usage: npx ludgi-cli -n getUserProfile
```

**Step 3: List All Resources**
```bash
npx ludgi-cli -l
```

**Step 4: Delete a Resource**
```bash
npx ludgi-cli -d
```

---

## **Get Started Today!**

Simplify your GraphQL development process with **Ludgi CLI**. Install now and take your workflow to the next level.

```bash
npm install ludgi --save-dev
```

