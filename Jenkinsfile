pipeline {
  agent any
  stages {
    stage("build") {
      steps {
        sh """
          docker build -t hello_there .
        """
      }
    }
    stage("run") {
      steps {
        sh """
          docker run --rm hello_there -e DISCORD_TOKEN=${env.DISCORD_TOKEN}
        """
      }
    }
  }
}
