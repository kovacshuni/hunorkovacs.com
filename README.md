hunorkovacs.com Personal Website
===============

This is a minimalistic, animated personal HTML website. It was built for being deployed to a Google Appengine server.
There is no complicated back-end Java app logic or any database below, it's just a few static pages and redirects.

The website is a 5 page comic book, a story about an amnesiac person (which should be me) searching for his identity. Now don't start to think about me as a deep-souled melancolic or childish comic book-nerd, i just didn't want to write a personal website where i write my own biography, i found that boring so just here's something else.

Visuals and scripts were used from Spawn and Max Payne graphic novels. Please refer to the policies.html for licences or copyrights.
My name is Hunor Kovács, find me at kovacshuni@yahoo.com .

Requirements
-------------------------

1. [Java Developement Kit] [1]
2. [Apache Maven] [2]
3. [Google Appengine] [3] (its Java Runtime Environment)
4. [Jetty webserver] [4] [optional]

  [1]: http://www.oracle.com/technetwork/java/javase/downloads/index.html "Java Developement Kit"
  [2]: http://maven.apache.org/download.cgi "Apache Maven"
  [3]: https://developers.google.com/appengine/docs/java/ "Google Appengine"
  [4]: http://www.eclipse.org/jetty/ "Jetty webserver"

Setup and Run
-------------------------

1. Clone the project.

2. Build with Maven:
mvn clean install

2. Start the Google Appengine webserver
appengine-java-sdk\bin\dev_appserver.cmd hunorkovacs.com-1.0-SNAPSHOT.war

You could also just install the Google Appengine plugin in your favorite dev. environment tool like Eclipse or IntelliJ IDEA and hit the run button.

