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
                dir('angular/my-project17') {
                    bat 'npm install'
                }
            }          
        }

        stage('Build') {
            steps {
                bat 'npm run start'
            }
        }
       
    }
    
}
