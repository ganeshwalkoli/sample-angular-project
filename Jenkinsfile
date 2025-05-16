pipeline {
  agent {
    kubernetes {
      label 'kaniko-angular-build'
      defaultContainer 'nodejs'

      yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: kaniko-angular-build
spec:
  containers:
  - name: nodejs
    image: node:16
    command:
    - cat
    tty: true
  - name: kaniko
    image: gcr.io/kaniko-project/executor:latest
    command:
    - cat
    tty: true
    volumeMounts:
    - name: kaniko-secret
      mountPath: /kaniko/.docker
  volumes:
  - name: kaniko-secret
    secret:
      secretName: regcred
"""
    }
  }

  environment {
    IMAGE = "your-registry/angular-frontend:latest"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Angular App') {
      steps {
        container('nodejs') {
          sh '''
            npm install
            npm run build -- --output-path=dist
          '''
        }
      }
    }

    stage('Build & Push Docker Image') {
      steps {
        container('kaniko') {
          sh '''
            /kaniko/executor --dockerfile=Dockerfile --context=dir://./ --destination=${IMAGE} --cleanup
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        container('nodejs') {
          withKubeConfig([credentialsId: 'kubeconfig-credential-id']) {
            sh '''
              kubectl apply -f k8s/deployment.yaml
              kubectl apply -f k8s/service.yaml
            '''
          }
        }
      }
    }
  }
}

