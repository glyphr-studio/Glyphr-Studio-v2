# GSv2 has been suspended
We were looking into completely re-writing Glyphr Studio on a JavaScript framework, using lots of libraries... Essentially, the new stuff was
taking too much time to create, and no real new end-user value was being introduced.  So, we've chalked it up to an interesting investigation, 
and focusing on developing against the current Glyphr Studio code base.

We'll leave the code here in case we want to pick it back up in the future.

## Developer Setup
Clone the repository, install dependencies and tell webpack to compile the project and start watching for changes (this can take a while):
```
git clone https://github.com/glyphr-studio/Glyphr-Studio-2.git && cd Glyphr-Studio-2 && npm install && bower install && npm run compile-commons && webpack -w
```

When developing, make sure `webpack -w` is running.

## License
 Copyright (C) 2010 - 2017 Matthew LaGrandeur, released under
 [GPL 3.0](https://github.com/mattlag/Glyphr-Studio/blob/master/LICENSE-gpl-3.0.txt)
