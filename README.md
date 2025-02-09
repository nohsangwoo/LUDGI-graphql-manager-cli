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

# **Ludgi CLI**

**Ludgi CLI** is a powerful, intuitive, and developer-friendly Command Line Interface (CLI) tool designed for managing GraphQL resources with ease. Whether you're working on a small project or a large-scale application, **Ludgi CLI** provides the tools you need to streamline your GraphQL workflow.


---

## **Project-Specific Notice**  

**Important:**  
The [Ludgi Next.js Project](https://github.com/nohsangwoo/ludgi-nextjs) is a **reference project** that demonstrates various ways to utilize GraphQL-related modules. It serves as an example of how to integrate different approaches, and a dedicated course covering these use cases is currently in development.  

If you want to use GraphQL purely with CLI-based integration, refer to the [Ludgi-GraphX](https://github.com/nohsangwoo/Ludgi-GraphX) project. This project is specifically designed for setting up a new GraphQL project using GraphQL CLI, making it a suitable starting point for CLI-based GraphQL development.

---

## **Installation**

To get started, install Ludgi CLI as a development dependency:

```bash
npm install ludgi-cli --save-dev
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

