```markdown
# GitLab CI/CD Pipeline Documentation

## Introduction
This GitLab CI/CD pipeline automates the process of building a Docker container using a Dockerfile and deploying it to a server via SSH. The pipeline consists of two stages: `build` and `deploy`.

## Pipeline Stages

### Build Stage
The `build` stage is responsible for building the Docker container using Kaniko.

#### Job: `build-container`
- **Stage:** `build`
- **Conditions:** Runs only on the `main` branch.
- **Image:** `gcr.io/kaniko-project/executor:v1.14.0-debug`
- **Tags:** `build-container`
- **Script:**
  - Executes Kaniko with the necessary parameters to build the Docker container from the Dockerfile.
  ```
  /kaniko/executor --context "${CI_PROJECT_DIR}" --dockerfile "${CI_PROJECT_DIR}/Dockerfile" --destination "${CI_REGISTRY_IMAGE}"
  ```

### Deploy Stage
The `deploy` stage deploys the built Docker container to the server using SSH.

#### Job: `deploy-container`
- **Stage:** `deploy`
- **Conditions:** Runs only on the `main` branch.
- **Image:** `debian:latest`
- **Dependencies:** Depends on the successful completion of the `build-container` job.
- **Before Script:**
  - Installs `openssh-client`.
  - Starts `ssh-agent` and adds the SSH private key.
  - Sets up SSH configuration.
- **Script:**
  - SSHs into the server and executes commands to pull the Docker image and start the container.
  ```
  ssh -oStrictHostKeyChecking=no $SSH_USER@$SSH_HOST "cd path/to/docker-compose.yml; sudo docker compose pull; sudo docker compose up -d; exit"
  ```

## Docker Compose Configuration
The provided Docker Compose file defines a service called `homepage` with configurations for the deployed container.

### Service: `homepage`
- **Container Name:** `<container_name>`
- **Restart Policy:** Always
- **Image:** `<gitlab-registry_url>/<namespace>/<repo>:latest`
- **Ports Mapping:** Maps `<external_port>` to `<internal_port>`

## Notes
- Ensure that necessary environment variables such as `CI_PROJECT_DIR`, `CI_REGISTRY_IMAGE`, `SSH_PRIVATE_KEY`, `SSH_USER`, and `SSH_HOST` are properly configured in the GitLab CI/CD settings.
- Modify the placeholders `<container_name>`, `<gitlab-registry_url>`, `<namespace>`, `<repo>`, `<external_port>`, and `<internal_port>` in the Docker Compose file according to your project requirements.
- Adjust the SSH commands in the `deploy-container` job script to match your deployment setup.
```
