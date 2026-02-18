pipeline {
    agent any

    tools {
        nodejs 'NodeJS'   // Name configured in Jenkins Global Tool Configuration
    }

    environment {
        NODE_ENV = 'production'
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/veerendrabijib/My_Newproject.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Start App (Optional)') {
            steps {
                sh 'npm start'
            }
        }
    }

    post {
        success {
            echo 'Node build completed successfully!'
        }
        failure {
            echo 'Node build failed!'
        }
    }
}
