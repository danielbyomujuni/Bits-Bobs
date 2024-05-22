# Java Pipeline Template Documentation

## Introduction
This GitLab CI/CD pipeline template is designed for building and testing Java projects using Gradle. It includes stages for building, testing, and potentially deploying the Java application. The template utilizes the `java:8-jdk` Docker image as the base environment for Java development.

## Pipeline Configuration

### Default Configuration
- **Image:** `openjdk:21`
  - The Docker image used as the base environment for Java development.

### Stages
1. **Build:** Compiles the Java code and creates executable artifacts.
2. **Test:** Executes unit tests to verify the correctness of the code.
3. **Deploy:** (Not implemented in the provided template)

### Before Script
- **Gradle User Home:** Sets the Gradle user home directory to the current working directory to store Gradle cache and wrapper files.

### Cache
- **Paths:**
  - `.gradle/wrapper`: Caches Gradle wrapper files.
  - `.gradle/caches`: Caches Gradle dependency cache.
- The cache configuration helps speed up subsequent builds by storing Gradle dependencies and wrapper files locally.

### Jobs
#### Build
- **Stage:** `build`
- **Script:**
  - Executes `./gradlew assemble` to compile the Java code and create executable artifacts.
- **Artifacts:**
  - Specifies the paths to the generated JAR files to be stored as artifacts.
  - Sets expiration for artifacts to 1 week.
- **Only:**
  - Limits the job to run only on the `master` branch.

#### Test
- **Stage:** `test`
- **Script:**
  - Executes `./gradlew check` to run unit tests and perform static code analysis.

### After Script
- Displays a message indicating the end of the CI process.

## Usage
To use this pipeline template, integrate it into your GitLab CI/CD configuration file (`gitlab-ci.yml`). Customize the stages, jobs, and scripts as necessary for your Java project.

```yaml
image: openjdk:21

stages:
  - build
  - test
  - deploy

before_script:
  - export GRADLE_USER_HOME=`pwd`/.gradle

cache:
  paths:
    - .gradle/wrapper
    - .gradle/caches

build:
  stage: build
  script:
    - ./gradlew assemble
  artifacts:
    paths:
      - build/libs/*.jar
    expire_in: 1 week
  only:
    - master

test:
  stage: test
  script:
    - ./gradlew check

after_script:
  - echo "End CI"
```

## Notes
- Ensure that your Java project structure and Gradle configuration match the assumptions made in this template.
- Customize the script sections (`./gradlew assemble` and `./gradlew check`) as needed to fit your project's build and test requirements.
- Implement the `deploy` stage with appropriate deployment tasks if needed for your project.
