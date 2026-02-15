pipeline {
    environment {
        BACKEND_IMAGE = "vlwli99/backend"
        FRONTEND_IMAGE = "vlwli99/frontend"
        NGINX_IMAGE = "vlwli99/nginx"
        REDIS_IMAGE = "vlwli99/redis"
        dockerImage = ''
    }

    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(
                        branches: [[name: '*/develop']],
                        extensions: [submodule(parentCredentials: true, recursiveSubmodules: true, trackingSubmodules: true)],
                        userRemoteConfigs: [[credentialsId: 'github-token-access', url: 'https://github.com/Sseumsseumi/sseumsseumi']]
                )
            }
        }

        stage('Move Config Files') {
            steps {
                sh '''
                    echo "=== 워크스페이스 루트 확인 ==="
                    ls -al

                    echo "=== config 폴더 확인 ==="
                    ls -al config/

                    echo "=== application.yml 복사 ==="
                    cp config/back/application.yml backend/src/main/resources/application.yml

                    echo "=== 복사 결과 확인 ==="
                    ls -al backend/src/main/resources/

                    echo "=== .env 복사 ==="
                    cp config/back/.env .env

                    echo "=== .env 복사 결과 ==="
                    ls -al .env
                '''
            }
        }
        
        // 빌드 전 메모리 확보
        stage('Stop Containers Before Build') {
            when {
                anyOf {
                    changeset "**/backend/**"
                    changeset "**/frontend/**"
                    changeset "**/nginx/**"
                    changeset "**/redis/**"
                }
            }
            steps {
                sh """
                    echo "=== 메모리 확보를 위해 컨테이너 중지 ==="
                    docker stop nginx frontend backend redis || true
                    
                    echo "=== 빌드 전 메모리 상태 ==="
                    free -h
                """
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
                    changeset "**/redis/**"
                }
            }
            steps {
                script {
                    // 빌드 전 캐시 정리
                    sh "docker builder prune -f || true"

                    def changedFiles = sh(
                        script: "git diff --name-only \${GIT_PREVIOUS_COMMIT} \${GIT_COMMIT} 2>/dev/null || git diff HEAD~1 --name-only 2>/dev/null || echo ''",
                        returnStdout: true
                    ).trim()

                    if (changedFiles.contains('backend/')) {
                        dir("./backend") {
                            sh "docker build -t ${BACKEND_IMAGE}:latest ."
                        }
                        sh "free -h"
                    }
                    if (changedFiles.contains('frontend/')) {
                        dir("./frontend") {
                            sh "docker build -t ${FRONTEND_IMAGE}:latest ."
                        }
                        sh "free -h"
                    }
                    if (changedFiles.contains('nginx/')) {
                        dir("./nginx") {
                            sh "docker build -t ${NGINX_IMAGE}:latest ."
                        }
                    }
                    if (changedFiles.contains('redis/')) {
                        dir("./redis") {
                            sh "docker build -t ${REDIS_IMAGE}:latest ."
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
                    changeset "**/redis/**"
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
                    changeset "**/redis/**"
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

                    if (sh(script: "git diff HEAD~1 --name-only | grep '^redis/'", returnStatus: true) == 0) {
                        sh "docker push ${REDIS_IMAGE}:latest"
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
                    changeset "**/redis/**"
                }
            }
            steps {
                script {
                    def imageNames = [
                        "vlwli99/backend",
                        "vlwli99/frontend",
                        "vlwli99/nginx",
                        "vlwli99/redis"
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
                    changeset "**/redis/**"
                    changeset "docker-compose.yml"
                }
            }
            steps {
                script {
                    sh "docker compose pull"
                }
            }
        }

        stage('Down Containers') {
            when {
                anyOf {
                    changeset "**/backend/**"
                    changeset "**/frontend/**"
                    changeset "**/nginx/**"
                    changeset "**/redis/**"
                    changeset "docker-compose.yml"
                }
            }
            steps {
                script {
                    echo "Bringing down containers..."

                    // 명시적으로 모든 컨테이너 중지 및 제거
                    sh """
                        docker stop nginx frontend backend redis || true
                        docker rm nginx frontend backend redis || true
                    """

                    echo "Cleaning up unused Docker resources..."
                    sh "docker image prune -f"
                }
            }
        }

        stage('Up Containers') {
            when {
                anyOf {
                    changeset "**/backend/**"
                    changeset "**/frontend/**"
                    changeset "**/nginx/**"
                    changeset "**/redis/**"
                    changeset "docker-compose.yml"
                }
            }
            steps {
                script {
                    sh "docker compose up -d"
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