
var job = {
    "name":"ls",
    "command":"ls -ale $directory",
    "comments":"file list up",
    "_id":"535618cee62f69eb82949978",
    "__v":0,
    "files":[""],
    "arguments":[
        {
            "name":"$directory",
            "description":"located folder"
        }
    ]
};

var task = {
    "jobId": "ls",
    "creator": "It's me.",
    "_id": "53562d198d021f7cabb49f97",
    "__v": 0,
    "arguments":[
        {
            "name":"$directory",
            "value":"TestFolder"
        }
    ]
};
