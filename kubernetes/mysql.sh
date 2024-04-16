#!/bin/bash

sudo su -c "kubectl scale -n default deployment mysql --replicas=0"
sleep 7
sudo su -c "kubectl delete pvc mysql-pvc"
sleep 7
sudo su -c "kubectl delete pv mysql-pv"
sleep 7
sudo su -c "kubectl apply -f mysql-pv-pvc.yml"
sleep 7
sudo su -c "kubectl scale -n default deployment mysql --replicas=1"
sleep 7
sudo su -c "kubectl scale -n default deployment backend-blue --replicas=0"
sleep 7
sudo su -c "kubectl scale -n default deployment backend-blue --replicas=1"
sleep 7
sudo su -c "kubectl scale -n default deployment backend-green --replicas=0"
sleep 7
sudo su -c "kubectl scale -n default deployment backend-green --replicas=1"