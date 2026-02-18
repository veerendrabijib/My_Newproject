pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/veerendrabijib/My_Newproject.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('node') {
                    bat 'npm install'
                }
            }          
        }

        stage('Build') {
            steps {
                bat 'npm run start'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }
    }
}
