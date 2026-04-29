pipeline {
    agent any

    environment {
        IMAGE = "vikamsakethgarre/srm-parking:v1"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/GarreVikramSaketh/SRM-PARKING.git'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t $IMAGE .'
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker push $IMAGE
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '/opt/homebrew/bin/kubectl apply -f deployment.yaml'
            }
        }
    }
}