# Json-Transformation
### Json-transformation is a project with the help of which we can convert one Json structured file to the other Json structured file. 
### It can also used to generate the code to convert one json structured file to some other json structure.


We developer have to use a lot of **APIs** and we usually get a *Json* file back/ We spend a lot of time with the json files for our diffrent projects . But in allmost all the cases we never get the **Json file Structed the way we want**.

There are libraries available to convert one json file to other such as JQ, JSONATA, JOLT but *they are not as straight forward as this project*. To use those libraries we need to go through their long documentations and know how to use them. Even after reading the documentation *we have to spend a good amount of time to write a code to convert one json structured file to the desired json structure.* 

Therefore to *reduce the time and effort* we usually spend reading the documentation and write the required code, Json-Transformation took care of all of that by itself. **We just need to tell/write what to do and Json-transformation will** ***generate the required code, excute it*** **and will give us the json file structured the way we want**.

If we just want *to get the simple javascript code to convert one json structured file to other json structured file* but not the converted json then we just *have to make a call to its api only*.



# SetUP on Local env.
1. Fork the repo and clone all the files.
2. Now open a terminal ,run the follwing commands and close this terminal.
    i) cd JSON-Transformation
    ii) cd app
    iii) npm i
    iv) cd ..
    v) cd app_ui
    vi) npm i
3. Now open 2 diffrent terminals simultaneously.
4. In First terminal, run the follwing commands.
   i) cd app
   ii) node server.js
5. In Second terminal, run the follwing commands.
   i) cd app_ui
   ii) npm start.
6. Now open your browser and visit localhost:3000.
###### All done, now you should be able to see the webpage of our website.




# How to use the app.
1. There are sample source.json and mapping.csv available for you already in json-transformation/app/controllers/uploads.
2. On your browser under source file add source.json
3. Under target file add target.csv
4. Now submit the form.
5. You should be able to see the generated converting code and target json on your screen.
### If you just want to get the code needed to transform one Json structured file to other with only mapping.csv then you have to use its API only.
