import fs from "node:fs";

export class Log {
  private static zeroPad(num: number, places: number) {
    return String(num).padStart(places, "0");
  }

  private static logFile = "";
  private static showStdOut = true;

  private static log(
    colorCode: string,
    status: string,
    message: string
  ) {
    const date = new Date();


    const formatedLog = `[${status}] ${Log.zeroPad(date.getMilliseconds(), 2)}:${Log.zeroPad(date.getMinutes(), 2)}:${Log.zeroPad(date.getHours(), 2)}:${Log.zeroPad(
      date.getDate(),
      2
    )}:${Log.zeroPad(date.getMonth(), 2)}:${Log.zeroPad(
      date.getFullYear(),
      2
    )}; ${message}`;


    if (Log.logFile != "") {
      fs.appendFile(
        `${Log.logFile}/log-${date.getDate()}-${date.getMonth()}-${date.getFullYear()}.txt`,
        formatedLog + "\n",
        function (err: any) { }
      );
    }
    if (Log.showStdOut) {
      console.log(colorCode + formatedLog);
    }
  }

  public static setStdOutVisablity(on: boolean) {
    Log.showStdOut = on;
  }

  public static setLogFile(path: string) {
    Log.logFile = path;
  }

  public static info(message: string) {
    Log.log(
      "\x1b[37m",
      "INFO",
      message,
    );
  }

  public static error(message: string) {
    Log.log(
      "\x1b[0;31m",
      "ERR",
      message,
    );
  }

  public static warning(message: string) {
    Log.log(
      "\x1b[0;33m",
      "WARN",
      message,
    );
  }

  public static debug(message: string) {
    Log.log(
      "\x1b[35m",
      "DEBUG",
      message,
    );
  }

  public static sql(message: string, success) {
    Log.log(
      "\x1b[33m",
      "MYSQL",
      `[${success ? "PASS" : "FAIL"}] ` + message,
    );
  }
}
