# Creating a RESTful API with Node.js
This repository accompanies my YouTube video series on building a RESTful API with Node.js: [https://github.com/academind/node-restful-api-tutorial.git](https://github.com/academind/node-restful-api-tutorial.git)

## Usage
Check out the branch you're interested in (i.e. which belongs to the video in my series you just watched), ```git clone``` it and thereafter run ```npm install```.

Make sure to also add your Mongo Atlas Admin Username to a nodemon.json file (which you have to create).

```
{
    "env": {
        "MONGO_ATLAS_PW": "YOUR_MONGO_USER_PW"
    }
}
```
#### Build images
docker build -t serdar/node-web-app .
*docker run -p 3000:3000 serdar/node-web-app

#### Start With Docker
first change >

mongoose.connect(

  "mongodb://mongo:27017",
  
  {

    useMongoClient: true
  
  }
);

then > docker-compose up