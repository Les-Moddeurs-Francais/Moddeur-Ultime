pipeline {
  agent { label "linux" }
  stages {
    stage("build") {
      steps {
        sh """
          docker build -t moddeur_ultime .
        """
      }
    }
    stage("run") {
      steps {
        sh """
          docker run --rm moddeur_ultime
        """
      }
    }
  }
}
