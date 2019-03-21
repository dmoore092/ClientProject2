#update packages
apt-get update
apt-get upgrade

#install git
apt-get install -y git

#Apache2
apt-get install -y apache2
a2enmod rewrite


#add php repo
apt-add-repository ppa:ondrej/php
apt-get update

#install php
apt-get install -y php7.2

#more apache
#apt-get install -y libapache2-mod-php7.2
#service apache2 restart

#apt-get install - y php7.2-common
#apt-get install - y php7.2-mcrypt
#apt-get install - y php7.2-zip
