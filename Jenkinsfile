pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/veerendrabijib/My_Newproject.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('angular/my-project17') {
                    bat 'npm install'
                }
            }
        }

        stage('Start App') {
            steps {
               
                    bat 'npm run start'
                
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
