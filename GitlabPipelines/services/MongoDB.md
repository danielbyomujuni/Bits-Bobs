# GitLab Pipeline Testing With Mongodb Documentation

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white

## Introduction
This GitLab CI/CD pipeline snippet defines a testing stage (`testing`) for running application tests. It utilizes a specific Docker image and sets up a MongoDB service for testing purposes. Additionally, it configures environment variables required for MongoDB initialization.

## Pipeline Configuration

### Stage: `testing`
- **Description:** The testing stage where application tests are executed.
- **Image:** `<image:version>`
  - The Docker image used for running the tests.
- **Dependencies:** Depends on the successful completion of the `build` stage.
- **Services:**
  - `mongo:latest`
    - MongoDB service container with the latest version.
- **Variables:**
  - `MONGO_INITDB_ROOT_USERNAME`: `<root_user>`
    - MongoDB root username for initialization.
  - `MONGO_INITDB_ROOT_PASSWORD`: `<root_password>`
    - MongoDB root password for initialization.
  - `MONGO_INITDB_DATABASE`: `<inital database>`
    - Initial database name for MongoDB.
- **Script:**
  - Executes the application tests.
  ```
  # Application Test
  ```

## Usage
To use this pipeline snippet, integrate it into your GitLab CI/CD configuration file (`gitlab-ci.yml`). Modify placeholders such as `<image:version>`, `<root_user>`, `<root_password>`, and `<initial database>` according to your project requirements.

```yaml
test:
  stage: testing
  image: <image:version>
  needs:
    - build
  services:
    - mongo:latest
  variables:
    MONGO_INITDB_ROOT_USERNAME: <root_user>
    MONGO_INITDB_ROOT_PASSWORD: <root_password>
    MONGO_INITDB_DATABASE: <initial database>
  script:
    # Application Test
```

## Notes
- Ensure that the Docker image specified contains the necessary dependencies for running application tests.
- Modify MongoDB-related variables (`MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD`, `MONGO_INITDB_DATABASE`) as per your MongoDB setup.
- Update the script section to include appropriate commands for running your application tests.
