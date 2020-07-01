# Complete Setup Guide
1. Download npm from [this](https://www.npmjs.com/get-npm) if not already
2. Download this Repo and go to the local folder.
3. Open <b> 2 </b> terminal windows and go to FrontEnd and BackEnd folders, respectively.
4. (In <b> BackEnd </b> terminal) create the a virtual environment using the template code `pip install --upgrade virtualenv`, then `virtualenv -p python3 venv`
5. (In <b> BackEnd </b> terminal) start the created environment with      `source venv/bin/activate `
6. (In <b> BackEnd </b> terminal) download libraries through `pip install -r requirements.txt`
7. (In <b> BackEnd </b> terminal) run backend by `python main.py`
8. (In <b> FrontEnd </b> terminal) download webpack server `npm i webpack-dev-server`
9. (In <b> FrontEnd </b> terminal) download other packages by `npm install`
10. (In <b> FrontEnd </b> terminal) run the server by `npm run start`

# Potential Errata: 

<b> E1 </b>

1. If receiving errors from chat section: try new API key and secret(will be updated regularly):

    Key: 57tcrkskk54w 

    Secret: jp592pew7pst9jt2w5v3zz6ytpb8j7euq7mfakp5ezxn9j4s2a2e7xch35vk9dgn

2. How to update: 

    a. Update the <b> ChatApp.js </b> in the components file(only key needed) from FrontEnd folder

    b. Update the <b> authentification.py </b> from BackEnd folder(can be found in the beginning of the code). 
    
<b> E2 </b>

During some unknown circumstances (different machines, preexisting node_modules), there might be this weird behavior of webpack keeping recompiling. 

If this happens: go to [This Issue](https://github.com/Yizong98/Housing_Proj/issues/18)
