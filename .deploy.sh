cd /Users/[path/to/your/react/project/root/directory] 
echo “Building React Project …” 
npm run build  
echo “Connecting to AWS VM and copying contents of build folder to /var/www/html/ …” 
scp -i "frontend.pem" -r build/* ubuntu@ec2-54-206-125-214.ap-southeast-2.compute.amazonaws.com:/var/www/html
echo “Done …” 