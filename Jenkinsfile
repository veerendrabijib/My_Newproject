pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/veerendrabijib/My_Newproject.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('node') {
                    bat 'npm install'
                }
            }          
        }

        stage('Start App') {
            steps {
                dir('node') {
                    bat 'npm run start'
                }
            }
        }
    }
    post {
        success {
            echo "🎉 Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}
