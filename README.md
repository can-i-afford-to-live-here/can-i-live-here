# Can I afford to live here

Is the question that this application will try to answer 

## Getting started

#### Install WSL
If using windows download install [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install) on your machine

#### Git installation and github configuration

1. Start WSL terminal and run the command ```sudo apt install git```
2. Use the command ```git --version``` to see if git has been installed properly
3. Create an account on github
4. Add a [SSH key](https://docs.github.com/en/enterprise-server@3.0/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) to your github account
5. Find the command to clone the repository and run that command

#### Set up Vue

Vue JS will be the client side framework used in this project. 

1. Install the nvm command with ```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash```
2. ```cd``` to the client directory and run ```npm i``` 
3. Run ```npm run serve``` to start the app

#### Set up .net core

.net core will be the server side framework used in this project.

1. Install the .net 6 packages with ```wget https://packages.microsoft.com/config/ubuntu/21.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb; sudo dpkg -i packages-microsoft-prod.deb; rm packages-microsoft-prod.deb```
2. Install the .net sdk and runtime with ```sudo apt-get update; sudo apt-get install -y apt-transport-https && sudo apt-get update && sudo apt-get install -y dotnet-sdk-6.0; sudo apt-get install -y apt-transport-https && sudo apt-get update && sudo apt-get install -y aspnetcore-runtime-6.0``` 
3. ```cd``` to the ```server/src directory``` and run ```dotnet restore``` 
4. Run ```dotnet run``` to start the app
