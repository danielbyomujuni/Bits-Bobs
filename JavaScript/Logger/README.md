## Log Class Documentation

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

The `Log` class provides a simple logging utility for Node.js applications, allowing developers to output log messages to the console and optionally save them to a log file.

### Class Signature:

```typescript
export class Log
```

### Static Properties:

- `logFile`: A static property holding the path to the log file directory. Default is an empty string.
- `showStdOut`: A static property indicating whether log messages should be displayed in the console. Default is `true`.

### Static Methods:

#### `setStdOutVisibility(on: boolean)`

Sets the visibility of log messages in the console.

- `on`: A boolean value indicating whether to display log messages in the console.

#### `setLogFile(path: string)`

Sets the directory path for log files.

- `path`: A string representing the directory path for log files.

#### `info(message: string)`

Logs an information message.

- `message`: The message to be logged.

#### `error(message: string)`

Logs an error message.

- `message`: The error message to be logged.

#### `warning(message: string)`

Logs a warning message.

- `message`: The warning message to be logged.

#### `debug(message: string)`

Logs a debug message.

- `message`: The debug message to be logged.

#### `sql(message: string, success: boolean)`

Logs a SQL-related message.

- `message`: The SQL message to be logged.
- `success`: A boolean indicating whether the SQL operation was successful.

### Private Methods:

#### `zeroPad(num: number, places: number): string`

Pads a number with leading zeros.

- `num`: The number to be zero-padded.
- `places`: The desired length of the resulting string.

#### `log(colorCode: string, status: string, message: string)`

Logs a message with the specified color code, status, and content.

- `colorCode`: ANSI color code for styling the console output.
- `status`: The status label for the log message (e.g., INFO, ERR).
- `message`: The content of the log message.

### Example Usage:

```typescript
import { Log } from "./Log";

Log.setStdOutVisibility(true);
Log.setLogFile("/path/to/logs");

Log.info("Application started");
Log.warning("This is a warning message");
Log.error("An error occurred");
Log.debug("Debugging information");
Log.sql("SELECT * FROM table", true);
```

### Notes:

- The `Log` class uses ANSI color codes for styling console output. Colors may not be supported in all environments.
- Log messages are formatted with a timestamp and can be directed to both the console and a log file.
- The default log file format is "log-{day}-{month}-{year}.txt". The log file is appended with new log entries.

### Recommendations:

- Use the `Log` class for basic logging in Node.js applications.
- Consider customizing the log file format or extending the class for more advanced logging requirements.
- Be cautious when using colored output in environments that do not support ANSI escape codes.

### Potential Enhancements:

- Add support for custom log file naming conventions.
- Allow customization of timestamp formats.
- Implement log rotation to manage log file sizes.

### Conclusion:

The `Log` class provides a straightforward logging solution for Node.js applications, offering flexibility in configuring log output to the console and log files. Developers can easily integrate this utility for basic logging needs while having the option to extend or modify the class based on specific requirements.
