# BaseCommand.cpp Documentation

![C++](https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white)

The `BaseCommand.cpp` file contains the implementation of the `BaseCommand` class, providing a method for handling incorrect command usage.

## Contents:

```cpp
//
// Created by Daniel Byomujuni on 10/8/23.
//

#include "BaseCommand.h"
#include <iostream>

void BaseCommand::incorrectUsage(std::string usage) {
    std::cout << "Usage: " << usage << std::endl;
}
```

## Description:

This file implements the `BaseCommand` class, which serves as a base class for handling command-related functionalities. It defines a method `incorrectUsage` that outputs a message indicating the correct usage of a command.

## Methods:

### `incorrectUsage(std::string usage)`

Prints an error message indicating the correct usage of a command.

#### Parameters:

- `usage`: A string representing the correct usage of the command.

#### Example:

```cpp
BaseCommand baseCommand;
baseCommand.incorrectUsage("mangamanager --help");
```

---

# BaseCommand.h Documentation

The `BaseCommand.h` file declares the `BaseCommand` class, providing a base structure for command implementations.

## Contents:

```cpp
//
// Created by Daniel Byomujuni on 10/8/23.
//

#ifndef MANGAMANAGER_BASECOMMAND_H
#define MANGAMANAGER_BASECOMMAND_H

#include <string>
#include <iostream>
#include <vector>

class BaseCommand {
public:
    void incorrectUsage(std::string usage);
    virtual int execute(std::vector<std::string> args)  { std::cout << "unimplemented\n"; }
};

#endif //MANGAMANAGER_BASECOMMAND_H
```

## Description:

This file declares the `BaseCommand` class, defining a method `incorrectUsage` and a virtual method `execute`. The `BaseCommand` class serves as a base class for specific command implementations.

## Methods:

### `incorrectUsage(std::string usage)`

Declares the method for handling incorrect command usage.

#### Parameters:

- `usage`: A string representing the correct usage of the command.

#### Example:

```cpp
BaseCommand baseCommand;
baseCommand.incorrectUsage("mangamanager --help");
```

### `virtual int execute(std::vector<std::string> args)`

Declares the virtual method for executing a command. This method is intended to be overridden by derived classes.

#### Parameters:

- `args`: A vector of strings representing the command arguments.

#### Example:

```cpp
class CustomCommand : public BaseCommand {
public:
    int execute(std::vector<std::string> args) override {
        // Custom command implementation
        return 0;
    }
};
```

---

# BaseCommandManager.cpp Documentation

The `BaseCommandManager.cpp` file implements the `BaseCommandManager` class, responsible for managing commands and executing them.

## Contents:

```cpp
//
// Created by Daniel Byomujuni on 1/15/24.
//

#include "BaseCommandManager.h"

void BaseCommandManager::addCommand(std::string alias, BaseCommand *cmd) {
    this->commands.insert({alias, cmd});
}

int BaseCommandManager::runCommand(std::string cmd, std::vector<std::string> args) {
    if (this->commands[cmd] == NULL) {
        printf("mangamanager: unknown command: %s\n", cmd.c_str());
        printf("Try 'mangamanager --help' for more information\n");
        return -1;
    }
    return this->commands[cmd]->execute(args);
}
```

## Description:

This file implements the `BaseCommandManager` class, which manages commands and executes them based on user input.

## Methods:

### `addCommand(std::string alias, BaseCommand *cmd)`

Adds a command to the manager with a specified alias.

#### Parameters:

- `alias`: A string representing the alias of the command.
- `cmd`: A pointer to the `BaseCommand` object to be added.

#### Example:

```cpp
BaseCommandManager commandManager;
BaseCommand* customCommand = new CustomCommand();
commandManager.addCommand("custom", customCommand);
```

### `runCommand(std::string cmd, std::vector<std::string> args)`

Runs a command based on the provided alias and arguments.

#### Parameters:

- `cmd`: A string representing the alias of the command to be executed.
- `args`: A vector of strings representing the command arguments.

#### Returns:

An integer indicating the result of the command execution.

#### Example:

```cpp
BaseCommandManager commandManager;
std::vector<std::string> commandArgs = {"arg1", "arg2"};
int result = commandManager.runCommand("custom", commandArgs);
```

---

# BaseCommandManager.h Documentation

The `BaseCommandManager.h` file declares the `BaseCommandManager` class, responsible for managing commands and executing them.

## Contents:

```cpp
//
// Created by Daniel Byomujuni on 1/15/24.
//

#ifndef MANGAMANAGER_BASECOMMANDMANAGER_H
#define MANGAMANAGER_BASECOMMANDMANAGER_H

#include <map>
#include <string>
#include "BaseCommand.h"

class BaseCommandManager {
    std::map<std::string, BaseCommand* > commands;
public:
    virtual void registerCommands() { std::cout << "unimplemented\n"; }
    void addCommand(std::string alias, BaseCommand *cmd);
    int runCommand(std::string cmd, std::vector<std::string> args);
};

#endif //MANGAMANAGER_BASECOMMANDMANAGER_H
```

## Description:

This file declares the `BaseCommandManager` class, which manages commands and executes them based on user input. It also declares methods for adding commands and running commands.

## Methods:

### `virtual void registerCommands()`

Declares the virtual method for registering commands. This method is intended to be overridden by derived classes.

#### Example:

```cpp
class CustomCommandManager : public BaseCommandManager {
public:
    void registerCommands() override {
        // Register custom commands
    }
};
```

### `addCommand(std::string alias, BaseCommand *cmd)`

Declares the method for adding a command to the manager with a specified alias.

#### Parameters:

- `alias`: A string representing the alias of the command.
- `cmd`: A pointer to the `BaseCommand` object to be added.

#### Example:

```cpp
BaseCommandManager commandManager;
BaseCommand* customCommand = new CustomCommand();
commandManager.addCommand("custom", customCommand);
```

### `int runCommand(std::string cmd, std::vector<std::string> args)`

Declares the method for running a command based on the provided alias and arguments.

#### Parameters:

- `cmd`: A string representing the alias of the command to be executed.
- `args`: A vector of strings representing the command arguments.

#### Returns:

An integer indicating the result of the command execution.

#### Example:

```cpp
BaseCommandManager commandManager;
std::vector<std::string> commandArgs = {"arg1", "arg2"};
int result = commandManager.runCommand("custom", commandArgs);
```

---

This documentation provides an overview of the purpose and functionality of each file, including class descriptions, methods, and examples of usage.
