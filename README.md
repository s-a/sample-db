# Sample DB
A collection of open source samples and loops in wave format
[<img src="https://travis-ci.org/s-a/open-sample-db.png" />](https://travis-ci.org/s-a/open-sample-db "Build state")


# Collaborate
Feel free to add your sounds :O)  
***If you are sending a pull request you confirm that each audio material file was created by yourself!***  
To do this you need [NodeJs](http://nodejs.org/). After installation goto to the repositiory directory and type ```npm install```.

## Contributing
1. [Fork it!](https://github.com/s-a/open-sample-db/fork)
2. Create your feature branch: `git checkout -b my-new-feature`
3. Add your samples to a subfolder
4. Run ```node bundle.js```
5. Run ```npm test```
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request XD


# Conventions
 - All sample audio files have to be saved in [WAVE format](http://en.wikipedia.org/wiki/WAV). 
 - All sample audio filenames have to be lower cased.
 - There is no naming convension obligation but if you want give further informations about a ```.wav``` file follow this filename structure to define beats per minute and sample length:
   - ```[describing-file-name]_[108bpm]_[4bars].wav```
 - All additional collections have to contain a ```package.json``` file which describes the colletion.  Take a look at this [package.json](/beatproducer-drum-loops-pack-1/package.json) file to create your own.  



# License
By default all samples are published under MIT and GLP license. If you want a diffent license model enter it into the ```license``` field in your ```package.json```. The license permission inherits to nested subfolders.  