# logr
Bunyan Logger instance ready to use

# INSTALL

    npm install --save "git+ssh://git@github.com:danielsan/logr.git"

It might create and entry in your ```packages.json``` like this:

    "logr": "ssh://git@github.com:danielsan/logr.git"

Some versions of npm might not understand that when you run npm install
in your project. If that is the case you will need to mannually change
your entry adding the **git+** before the **ssh://**. Like this:

    "logr": "git+ssh://git@github.com:danielsan/logr.git"

