pipeline {
    environment {
        BACKEND_IMAGE = "vlwli99/backend"
        FRONTEND_IMAGE = "vlwli99/frontend"
        NGINX_IMAGE = "vlwli99/nginx"
        dockerImage = ''
    }

    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Backend') {
            when {
                changeset "**/backend/**"
            }
            steps {
                dir("./backend") {
                    sh "chmod +x ./gradlew"
                    sh "./gradlew clean build -x test"
                }
            }
        }
        
        stage('Build Frontend') {
            when {
                changeset "**/frontend/**"
            }
            steps {
                dir("./frontend") {
                    sh "npm install"
                    sh "npm run build"
                }
            }
        }
        
        stage('Build Images') {
            when {
                anyOf {
                    changeset "**/backend/**"
                    changeset "**/frontend/**"
                    changeset "**/nginx/**"
                }
            }
            steps {
                script {
                    // Backend 이미지 빌드
                    if (sh(script: "git diff HEAD~1 --name-only | grep '^backend/'", returnStatus: true) == 0) {
                        dir("./backend") {
                            sh "docker build -t ${BACKEND_IMAGE}:latest ."
                        }
                    }
                    
                    // Frontend 이미지 빌드
                    if (sh(script: "git diff HEAD~1 --name-only | grep '^frontend/'", returnStatus: true) == 0) {
                        dir("./frontend") {
                            sh "docker build -t ${FRONTEND_IMAGE}:latest ."
                        }
                    }
                    
                    // Nginx 이미지 빌드
                    if (sh(script: "git diff HEAD~1 --name-only | grep '^nginx/'", returnStatus: true) == 0) {
                        dir("./nginx") {
                            sh "docker build -t ${NGINX_IMAGE}:latest ."
                        }
                    }
                }
            }
        }

        stage('DockerHub Login') {
            when {
                anyOf {
                    changeset "**/backend/**"
                    changeset "**/frontend/**"
                    changeset "**/nginx/**"
                }
            }
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-token-access', usernameVariable: 'DOCKERHUB_ID', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        sh """
                            set +x
                            echo \$DOCKERHUB_PASSWORD | docker login -u \$DOCKERHUB_ID --password-stdin
                            set -x
                        """
                    }
                }
            }
        }

        stage('Push Images') {
            when {
                anyOf {
                    changeset "**/backend/**"
                    changeset "**/frontend/**"
                    changeset "**/nginx/**"
                }
            }
            steps {
                script {
                    // 변경된 이미지만 Push
                    if (sh(script: "git diff HEAD~1 --name-only | grep '^backend/'", returnStatus: true) == 0) {
                        sh "docker push ${BACKEND_IMAGE}:latest"
                    }
                    
                    if (sh(script: "git diff HEAD~1 --name-only | grep '^frontend/'", returnStatus: true) == 0) {
                        sh "docker push ${FRONTEND_IMAGE}:latest"
                    }
                    
                    if (sh(script: "git diff HEAD~1 --name-only | grep '^nginx/'", returnStatus: true) == 0) {
                        sh "docker push ${NGINX_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Clean Images') {
            when {
                anyOf {
                    changeset "**/backend/**"
                    changeset "**/frontend/**"
                    changeset "**/nginx/**"
                }
            }
            steps {
                script {
                    def imageNames = [
                        "vlwli99/backend",
                        "vlwli99/frontend",
                        "vlwli99/nginx",
                        "redis:alpine"
                    ]

                    imageNames.each { imageName ->
                        def imageIds = sh(script: "docker images -q ${imageName}", returnStdout: true).trim().split()
                        imageIds.each { id ->
                            if (id) {
                                sh "docker rmi ${id} || true"
                            }
                        }
                    }

                    sh 'docker image prune -f --filter until=1h'
                }
            }
        }

        stage('Pull Images') {
            when {
                anyOf {
                    changeset "**/backend/**"
                    changeset "**/frontend/**"
                    changeset "**/nginx/**"
                    changeset "docker-compose.yml"
                }
            }
            steps {
                script {
                    sh "docker-compose pull"
                }
            }
        }

        stage('Down Containers') {
            when {
                anyOf {
                    changeset "**/backend/**"
                    changeset "**/frontend/**"
                    changeset "**/nginx/**"
                    changeset "docker-compose.yml"
                }
            }
            steps {
                script {
                    echo "Bringing down containers..."
                    sh "docker-compose down --remove-orphans --volumes || true"

                    echo "Forcing container stop and removal..."
                    sh "docker-compose rm -fsv || true"

                    echo "Cleaning up unused Docker resources..."
                    retry(3) {
                        sleep time: 10, unit: 'SECONDS'
                        sh "docker system prune -af --volumes || true"
                    }
                }
            }
        }

        stage('Up Containers') {
            when {
                anyOf {
                    changeset "**/backend/**"
                    changeset "**/frontend/**"
                    changeset "**/nginx/**"
                    changeset "docker-compose.yml"
                }
            }
            steps {
                script {
                    sh "docker-compose up -d"
                }
            }
        }
    }
    
    post {
        always {
            sh 'docker logout || true'
            echo "=== Pipeline Finished ==="
        }
        success {
            echo "✅ Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}